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

namespace local_servicemanager\external;

use core_external\external_api;
use core_external\external_function_parameters;
use core_external\external_single_structure;
use core_external\external_value;
use local_servicemanager\local\web_services;
use local_servicemanager\output\ws_status;

// The classes below extend those of core_external, which Moodle 4.0 and 4.1 only have under their old names.
// phpcs:ignore moodle.Files.MoodleInternal.MoodleInternalGlobalState
\local_servicemanager\compat\external_aliases::register();

/**
 * External web service function: turn the web services of the site, or one of their protocols, on or off from the dashboard,
 * without reloading it. The setting is written the way the administration writes it, so the change is kept in the log of the
 * configuration and every callback of the setting runs. It returns the strip of the state drawn again.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class set_web_services extends external_api {
    /**
     * Describe the parameters.
     *
     * @return external_function_parameters
     */
    public static function execute_parameters(): external_function_parameters {
        return new external_function_parameters([
            'enable' => new external_value(PARAM_BOOL, 'Whether to turn it on'),
            'protocol' => new external_value(
                PARAM_PLUGIN,
                'The protocol, or empty for the web services of the site',
                VALUE_DEFAULT,
                ''
            ),
            'returnurl' => new external_value(PARAM_LOCALURL, 'The page the strip is shown on', VALUE_DEFAULT, ''),
        ]);
    }

    /**
     * Turn the web services, or one protocol, on or off.
     *
     * @param bool $enable Whether to turn it on.
     * @param string $protocol The protocol, or empty for the web services of the site.
     * @param string $returnurl The page the strip is shown on.
     * @return array What was done, and the strip of the state drawn again.
     */
    public static function execute(bool $enable, string $protocol = '', string $returnurl = ''): array {
        global $OUTPUT;

        ['enable' => $enable, 'protocol' => $protocol, 'returnurl' => $returnurl] = self::validate_parameters(
            self::execute_parameters(),
            ['enable' => $enable, 'protocol' => $protocol, 'returnurl' => $returnurl]
        );

        $context = \context_system::instance();
        self::validate_context($context);
        require_capability('moodle/site:config', $context);

        $message = web_services::apply($enable, $protocol);
        $status = ws_status::describe(has_capability('local/servicemanager:manage', $context));
        if ($returnurl !== '') {
            $status['returnurl'] = (new \moodle_url($returnurl))->out(false);
        }
        return [
            'message' => $message,
            'html' => $OUTPUT->render_from_template('local_servicemanager/ws_status', $status),
        ];
    }

    /**
     * Describe the return value.
     *
     * @return external_single_structure
     */
    public static function execute_returns(): external_single_structure {
        return new external_single_structure([
            'message' => new external_value(PARAM_TEXT, 'What was done'),
            'html' => new external_value(PARAM_RAW, 'The strip of the state of the web services, drawn again'),
        ]);
    }
}
