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

defined('MOODLE_INTERNAL') || die();

$functions = [
    'local_serviceschema_get_schemas' => [
        'classname' => 'local_serviceschema_external',
        'methodname' => 'get_schemas',
        'classpath' => 'local/serviceschema/externallib.php',
        'description' => 'Get all service schemas.',
        'type' => 'read',
        'ajax' => true,
        'capabilities' => 'local/serviceschema:view',
    ],
    'local_serviceschema_get_schema' => [
        'classname' => 'local_serviceschema_external',
        'methodname' => 'get_schema',
        'classpath' => 'local/serviceschema/externallib.php',
        'description' => 'Get a single service schema by ID.',
        'type' => 'read',
        'ajax' => true,
        'capabilities' => 'local/serviceschema:view',
    ],
    'local_serviceschema_create_schema' => [
        'classname' => 'local_serviceschema_external',
        'methodname' => 'create_schema',
        'classpath' => 'local/serviceschema/externallib.php',
        'description' => 'Create a new service schema.',
        'type' => 'write',
        'ajax' => true,
        'capabilities' => 'local/serviceschema:manage',
    ],
    'local_serviceschema_update_schema' => [
        'classname' => 'local_serviceschema_external',
        'methodname' => 'update_schema',
        'classpath' => 'local/serviceschema/externallib.php',
        'description' => 'Update an existing service schema.',
        'type' => 'write',
        'ajax' => true,
        'capabilities' => 'local/serviceschema:manage',
    ],
    'local_serviceschema_delete_schema' => [
        'classname' => 'local_serviceschema_external',
        'methodname' => 'delete_schema',
        'classpath' => 'local/serviceschema/externallib.php',
        'description' => 'Delete a service schema.',
        'type' => 'write',
        'ajax' => true,
        'capabilities' => 'local/serviceschema:manage',
    ],
];

$services = [
    'ServiceSchema Manager' => [
        'functions' => [
            'local_serviceschema_get_schemas',
            'local_serviceschema_get_schema',
            'local_serviceschema_create_schema',
            'local_serviceschema_update_schema',
            'local_serviceschema_delete_schema',
        ],
        'restrictedusers' => 0,
        'enabled' => 1,
        'shortname' => 'serviceschema_manager',
    ],
];
