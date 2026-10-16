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

use local_servicemanager\external\create_schema;
use local_servicemanager\external\delete_schema;
use local_servicemanager\external\update_schema;

/**
 * Tests for the web service functions that create, update and delete schemas.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\external\create_schema
 * @covers     \local_servicemanager\external\update_schema
 * @covers     \local_servicemanager\external\delete_schema
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class external_crud_test extends \advanced_testcase {
    /**
     * The YAML of a schema.
     *
     * @param string $functions The functions, one in each line.
     * @return string The YAML.
     */
    private function yaml(string $functions = "    - core_webservice_get_site_info\n"): string {
        return "meta:\n  id: \"crud.test\"\n  name: \"Crud test\"\n  version: \"1.0.0\"\ndefinition:\n  functions:\n" . $functions;
    }

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
     * What the functions say they did is the same English as before, and it comes from the strings of the plugin.
     */
    public function test_what_the_functions_did_is_said_with_strings(): void {
        $this->resetAfterTest();
        $this->setAdminUser();

        $created = create_schema::execute($this->yaml(), false);
        $this->assertSame('Schema created successfully', $created['message']);

        $this->customise_strings([
            'ws_schema_updated' => 'Esquema actualizado',
            'ws_schema_deleted' => 'Esquema borrado',
        ]);
        $updated = update_schema::execute($created['id'], $this->yaml("    - core_webservice_get_site_info\n    - core_user_get_users\n"));
        $deleted = delete_schema::execute($created['id']);

        $this->assertSame('Esquema actualizado', $updated['message']);
        $this->assertSame('Esquema borrado', $deleted['message']);
    }

    /**
     * Deleting a schema that does not exist says so, rather than that it was deleted.
     */
    public function test_deleting_a_schema_that_does_not_exist_is_refused(): void {
        $this->resetAfterTest();
        $this->setAdminUser();

        $this->expectException(\moodle_exception::class);
        $this->expectExceptionMessage(get_string('schema_not_found', 'local_servicemanager'));
        delete_schema::execute(-1);
    }
}
