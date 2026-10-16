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

namespace local_servicemanager;

use local_servicemanager\health\inspector;
use local_servicemanager\health\status_summary;

/**
 * Tests for what a health check says it found, which is shown on the pages of the plugin and in the report it mails.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\health\status_summary
 * @covers     \local_servicemanager\health\inspector
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class status_summary_test extends \advanced_testcase {
    /**
     * Change strings of the plugin as a site does in its language customisation.
     *
     * @param array $strings The texts, by identifier.
     */
    private function customise_strings(array $strings): void {
        global $CFG;

        $dir = $CFG->langlocalroot . '/en_local';
        make_writable_directory($dir);
        $lines = ["<?php"];
        foreach ($strings as $key => $text) {
            $lines[] = '$string[' . var_export($key, true) . '] = ' . var_export($text, true) . ';';
        }
        file_put_contents($dir . '/local_servicemanager.php', implode("\n", $lines) . "\n");
        get_string_manager()->reset_caches(true);
    }

    /**
     * What each check found is said in English as it was before the texts became strings.
     */
    public function test_the_findings_are_said_as_before(): void {
        $this->resetAfterTest();

        $this->assertSame('All checks passed', status_summary::describe([]));
        $this->assertSame(
            'Missing functions: a_function, b_function; User is suspended; Service issue: Service deleted; Token expired',
            status_summary::describe([
                'functions' => ['missing' => ['a_function', 'b_function']],
                'user' => ['valid' => true, 'suspended' => true],
                'service' => ['exists' => false, 'error' => 'Service deleted'],
                'token' => ['exists' => true, 'valid' => false],
            ])
        );
        $this->assertSame('User issue: unknown', status_summary::describe(['user' => ['valid' => false]]));
    }

    /**
     * What a check found is said with the strings of the plugin, so a site can translate it.
     */
    public function test_the_findings_are_said_with_strings(): void {
        $this->resetAfterTest();
        $this->customise_strings([
            'health_msg_all_passed' => 'Todo en orden',
            'health_msg_service_disabled' => 'El servicio está desactivado',
            'health_msg_user_issue' => 'Problema del usuario: {$a}',
            'health_msg_unknown' => 'desconocido',
        ]);

        $this->assertSame('Todo en orden', status_summary::describe([]));
        $this->assertSame(
            'El servicio está desactivado',
            status_summary::describe(['service' => ['exists' => true, 'enabled' => false]])
        );
        $this->assertSame('Problema del usuario: desconocido', status_summary::describe(['user' => ['valid' => false]]));
    }

    /**
     * What the inspector finds wrong with the parts of a schema is said with the strings of the plugin too.
     */
    public function test_the_inspector_says_what_is_wrong_with_strings(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();
        $yaml = "meta:\n  id: \"summary.test\"\n  name: \"Summary test\"\n  version: \"1.0.0\"\n" .
            "definition:\n  functions:\n    - core_webservice_get_site_info\n";
        $manager = new schema\manager();
        $schema = $manager->get_schema($manager->create_schema($yaml)['id']);
        $DB->delete_records('external_services', ['id' => $schema->serviceid]);
        $this->customise_strings([
            'health_msg_service_deleted' => 'Servicio borrado',
            'health_msg_service_issue' => 'Servicio: {$a}',
            'health_msg_yaml_invalid' => 'YAML ilegible: {$a}',
        ]);

        $this->assertSame('Servicio: Servicio borrado', (new inspector())->inspect($schema)['message']);

        // A YAML that cannot be read, as the yaml extension says of one; the reader that comes with the plugin reads anything.
        $unreadable = new class extends inspector {
            /**
             * An inspector whose reader of the YAML refuses it.
             */
            public function __construct() {
                parent::__construct();
                $this->parser = new class extends schema\yaml_parser {
                    /**
                     * Refuse the YAML.
                     *
                     * @param string $content YAML content
                     * @return array|null
                     */
                    public function parse_stored(string $content): ?array {
                        throw new \moodle_exception('error_invalid_yaml', 'local_servicemanager', '', 'line 1');
                    }
                };
            }
        };
        $this->assertStringStartsWith('YAML ilegible: ', $unreadable->inspect($schema)['message']);
    }
}
