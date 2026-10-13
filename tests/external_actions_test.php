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

use local_servicemanager\external\regenerate_token;
use local_servicemanager\external\set_enabled;
use local_servicemanager\schema\manager;

/**
 * Tests for the web service functions that the schema page uses to change a schema without reloading.
 *
 * @package    local_servicemanager
 * @covers     \local_servicemanager\external\set_enabled
 * @covers     \local_servicemanager\external\regenerate_token
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
final class external_actions_test extends \advanced_testcase {
    /**
     * Create a schema.
     *
     * @return int Its id.
     */
    private function schema(): int {
        $yaml = "meta:\n  id: \"act.test\"\n  name: \"Act test\"\n  version: \"1.0.0\"\n" .
            "definition:\n  functions:\n    - core_webservice_get_site_info\n";
        return (new manager())->create_schema($yaml)['id'];
    }

    /**
     * A schema is disabled and enabled again without anything else changing.
     */
    public function test_a_schema_is_disabled_and_enabled(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();
        $id = $this->schema();

        $this->assertFalse(set_enabled::execute($id, false)['enabled']);
        $this->assertEquals(0, $DB->get_field('local_servicemanager_schemas', 'enabled', ['id' => $id]));
        $this->assertTrue(set_enabled::execute($id, true)['enabled']);
    }

    /**
     * A token is made for a schema that has none, and replaced for one that has it.
     */
    public function test_a_token_is_made_and_replaced(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();
        $id = $this->schema();

        $first = regenerate_token::execute($id)['token'];
        $second = regenerate_token::execute($id)['token'];

        $this->assertNotEmpty($first);
        $this->assertNotEquals($first, $second);
        $this->assertFalse($DB->record_exists('external_tokens', ['token' => $first]));
        $this->assertTrue($DB->record_exists('external_tokens', ['token' => $second]));
    }

    /**
     * Whoever cannot manage schemas cannot change them.
     */
    public function test_it_needs_the_capability_to_manage(): void {
        $this->resetAfterTest();
        $id = $this->schema();
        $this->setUser($this->getDataGenerator()->create_user());

        $this->expectException(\required_capability_exception::class);
        set_enabled::execute($id, false);
    }

    /**
     * A schema that does not exist is told so.
     */
    public function test_an_unknown_schema_is_refused(): void {
        $this->resetAfterTest();
        $this->setAdminUser();

        $this->expectException(\moodle_exception::class);
        regenerate_token::execute(999999);
    }
}
