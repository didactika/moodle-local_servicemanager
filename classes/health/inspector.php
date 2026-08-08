<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

namespace local_servicemanager\health;

use local_servicemanager\schema\yaml_parser;
use local_servicemanager\automation\user_manager;
use local_servicemanager\automation\service_manager;
use local_servicemanager\automation\token_manager;
use local_servicemanager\automation\capability_calculator;

/**
 * Works out whether a schema is still in working order.
 *
 * Four things can rot independently: the functions it declares, its service
 * user, its external service and its token. Each is checked on its own and
 * reports the worst state it can justify; the schema takes the worst of the
 * four.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class inspector {
    /** Health levels, least severe first. */
    const LEVELS = ['healthy', 'warning', 'critical'];

    /** @var yaml_parser */
    protected $parser;

    /** @var user_manager */
    protected $usermanager;

    /** @var service_manager */
    protected $servicemanager;

    /** @var token_manager */
    protected $tokenmanager;

    /** @var capability_calculator */
    protected $capcalc;

    /**
     * Constructor
     */
    public function __construct() {
        $this->parser = new yaml_parser();
        $this->usermanager = new user_manager();
        $this->servicemanager = new service_manager();
        $this->tokenmanager = new token_manager();
        $this->capcalc = new capability_calculator();
    }

    /**
     * Check a single schema's health
     *
     * @param \stdClass $schema Schema record
     * @return array ['status' => string, 'message' => string, 'details' => array]
     */
    public function inspect(\stdClass $schema): array {
        try {
            $yamldata = $this->parser->parse($schema->yaml_content);
            $functions = $this->parser->extract_functions($yamldata);
        } catch (\Exception $e) {
            return [
                'status' => 'critical',
                'message' => 'Failed to parse YAML: ' . $e->getMessage(),
                'details' => [],
            ];
        }

        $details = [];
        $status = self::LEVELS[0];

        foreach ($this->run_checks($schema, $functions) as $area => $check) {
            $details[$area] = $check['details'];
            $status = $this->worst_of($status, $check['status']);
        }

        return [
            'status' => $status,
            'message' => status_summary::describe($details),
            'details' => $details,
        ];
    }

    /**
     * Every check, keyed by the name it appears under in the details.
     *
     * @param \stdClass $schema Schema record
     * @param array $functions Functions the schema declares
     * @return array
     */
    protected function run_checks(\stdClass $schema, array $functions): array {
        return [
            'functions' => $this->check_functions($functions),
            'user' => $this->check_user($schema),
            'service' => $this->check_service($schema),
            'token' => $this->check_token($schema),
        ];
    }

    /**
     * The more severe of two health levels.
     *
     * @param string $status Level so far
     * @param string $candidate Level a check reported
     * @return string
     */
    protected function worst_of(string $status, string $candidate): string {
        return array_search($candidate, self::LEVELS) > array_search($status, self::LEVELS)
            ? $candidate
            : $status;
    }

    /**
     * Check that the declared functions still exist.
     *
     * @param array $functions Functions the schema declares
     * @return array ['details' => array, 'status' => string]
     */
    protected function check_functions(array $functions): array {
        $details = $this->count_missing_functions($functions);

        $status = self::LEVELS[0];
        if ($details['critical_missing'] > 0) {
            $status = 'critical';
        } else if ($details['noncritical_missing'] > 0) {
            $status = 'warning';
        }

        return ['details' => $details, 'status' => $status];
    }

    /**
     * Check that the service user exists and is usable.
     *
     * @param \stdClass $schema Schema record
     * @return array ['details' => array, 'status' => string]
     */
    protected function check_user(\stdClass $schema): array {
        if (!$schema->userid) {
            return [
                'details' => ['valid' => false, 'error' => 'No user ID'],
                'status' => 'critical',
            ];
        }

        $details = $this->check_user_valid($schema->userid);
        if (!$details['valid']) {
            return ['details' => $details, 'status' => 'critical'];
        }

        return ['details' => $details, 'status' => $details['suspended'] ? 'warning' : self::LEVELS[0]];
    }

    /**
     * Check that the external service exists and is enabled.
     *
     * @param \stdClass $schema Schema record
     * @return array ['details' => array, 'status' => string]
     */
    protected function check_service(\stdClass $schema): array {
        if (!$schema->serviceid) {
            return [
                'details' => ['exists' => false, 'error' => 'No service ID'],
                'status' => 'critical',
            ];
        }

        $details = $this->check_service_valid($schema->serviceid);
        if (!$details['exists']) {
            return ['details' => $details, 'status' => 'critical'];
        }

        return ['details' => $details, 'status' => $details['enabled'] ? self::LEVELS[0] : 'warning'];
    }

    /**
     * Check the token, if the schema has one.
     *
     * A schema with no token is not faulty: tokens are optional at creation.
     *
     * @param \stdClass $schema Schema record
     * @return array ['details' => array, 'status' => string]
     */
    protected function check_token(\stdClass $schema): array {
        if (!$schema->tokenid) {
            return [
                'details' => ['exists' => false, 'info' => 'No token generated'],
                'status' => self::LEVELS[0],
            ];
        }

        $details = $this->check_token_valid($schema->tokenid);
        if (!$details['exists']) {
            return ['details' => $details, 'status' => 'critical'];
        }

        return ['details' => $details, 'status' => $details['valid'] ? self::LEVELS[0] : 'warning'];
    }

    /**
     * Count how many declared functions Moodle does not have
     *
     * @param array $functions Functions to check
     * @return array
     */
    protected function count_missing_functions(array $functions): array {
        $criticalmissing = 0;
        $noncriticalmissing = 0;
        $missing = [];

        foreach ($functions as $func) {
            $functionname = is_array($func) ? $func['name'] : $func;
            $critical = is_array($func) ? ($func['critical'] ?? true) : true;

            if ($this->capcalc->function_exists($functionname)) {
                continue;
            }

            $missing[] = $functionname;
            if ($critical) {
                $criticalmissing++;
            } else {
                $noncriticalmissing++;
            }
        }

        return [
            'total' => count($functions),
            'critical_missing' => $criticalmissing,
            'noncritical_missing' => $noncriticalmissing,
            'missing' => $missing,
        ];
    }

    /**
     * Check if user is valid
     *
     * @param int $userid User ID
     * @return array
     */
    protected function check_user_valid(int $userid): array {
        if (!$this->usermanager->user_exists($userid)) {
            return ['valid' => false, 'error' => 'User deleted'];
        }

        return [
            'valid' => true,
            'exists' => true,
            'suspended' => $this->usermanager->is_suspended($userid),
        ];
    }

    /**
     * Check if service is valid
     *
     * @param int $serviceid Service ID
     * @return array
     */
    protected function check_service_valid(int $serviceid): array {
        if (!$this->servicemanager->service_exists($serviceid)) {
            return ['exists' => false, 'error' => 'Service deleted'];
        }

        return [
            'exists' => true,
            'enabled' => $this->servicemanager->is_enabled($serviceid),
        ];
    }

    /**
     * Check if token is valid
     *
     * @param int $tokenid Token ID
     * @return array
     */
    protected function check_token_valid(int $tokenid): array {
        if (!$this->tokenmanager->token_exists($tokenid)) {
            return ['exists' => false, 'error' => 'Token deleted'];
        }

        return [
            'exists' => true,
            'valid' => $this->tokenmanager->is_token_valid($tokenid),
            'last_access' => $this->tokenmanager->get_last_access($tokenid),
        ];
    }
}
