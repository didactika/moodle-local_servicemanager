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
use core_external\external_multiple_structure;
use core_external\external_single_structure;
use core_external\external_value;
use local_servicemanager\local\web_services;
use local_servicemanager\output\ws_status;

/**
 * External web service function: turn the web services of the site, or one of their protocols, on or off from the dashboard,
 * without reloading it. The setting is written the way the administration writes it, so the change is kept in the log of the
 * configuration and every callback of the setting runs.
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
        ]);
    }

    /**
     * Turn the web services, or one protocol, on or off.
     *
     * @param bool $enable Whether to turn it on.
     * @param string $protocol The protocol, or empty for the web services of the site.
     * @return array What was done, and the state of the web services now.
     */
    public static function execute(bool $enable, string $protocol = ''): array {
        ['enable' => $enable, 'protocol' => $protocol] = self::validate_parameters(
            self::execute_parameters(),
            ['enable' => $enable, 'protocol' => $protocol]
        );

        $context = \context_system::instance();
        self::validate_context($context);
        require_capability('moodle/site:config', $context);

        $message = web_services::apply($enable, $protocol);
        $status = ws_status::describe(has_capability('local/servicemanager:manage', $context));
        return ['message' => $message] + $status;
    }

    /**
     * Describe the return value.
     *
     * @return external_single_structure
     */
    public static function execute_returns(): external_single_structure {
        return new external_single_structure([
            'message' => new external_value(PARAM_TEXT, 'What was done'),
            'enabled' => new external_value(PARAM_BOOL, 'Whether the web services are turned on'),
            'canConfigure' => new external_value(PARAM_BOOL, 'Whether the person can change the configuration of the site'),
            'toggleUrl' => new external_value(PARAM_URL, 'Where a change is sent when the page has no script'),
            'returnUrl' => new external_value(PARAM_RAW, 'Where the page comes back after a change sent without script'),
            'level' => new external_value(PARAM_ALPHA, 'disabled, warning or operational'),
            'protocols' => new external_multiple_structure(new external_single_structure([
                'key' => new external_value(PARAM_PLUGIN, 'Name of the protocol'),
                'name' => new external_value(PARAM_TEXT, 'What the protocol is called'),
                'enabled' => new external_value(PARAM_BOOL, 'Whether it answers now'),
                'on' => new external_value(PARAM_BOOL, 'Whether it is turned on'),
            ])),
            'enabledProtocols' => new external_value(PARAM_INT, 'How many protocols answer now'),
            'overviewUrl' => new external_value(PARAM_RAW, 'The overview of the web services, or empty'),
            'fixUrl' => new external_value(PARAM_RAW, 'Where to turn on what is off, or empty'),
            'fixLabel' => new external_value(PARAM_TEXT, 'What that link says, or empty'),
            'protocolsUrl' => new external_value(PARAM_RAW, 'The page of the protocols, or empty'),
        ]);
    }
}
