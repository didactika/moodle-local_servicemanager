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

/**
 * Unit tests for schema manager creation, reading and removal.
 *
 * Updating a schema is covered separately in manager_update_test.
 *
 * @package    local_servicemanager
 * @category   test
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @covers     \local_servicemanager\schema\manager
 */
final class manager_test extends \advanced_testcase {
    /**
     * Get a valid YAML content for testing.
     *
     * @return string
     */
    private function get_valid_yaml(): string {
        return <<<YAML
meta:
  id: "test.service"
  name: "Test Service"
  version: "1.0.0"
definition:
  functions:
    - core_webservice_get_site_info
YAML;
    }

    /**
     * Test creating a schema from YAML content.
     */
    public function test_create_schema(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();

        $manager = new \local_servicemanager\schema\manager();
        $result = $manager->create_schema_with_token($this->get_valid_yaml());

        $this->assertArrayHasKey('id', $result);
        $this->assertArrayHasKey('token', $result);
        $this->assertNotEmpty($result['token']);

        // Verify database record.
        $schema = $DB->get_record('local_servicemanager_schemas', ['id' => $result['id']]);
        $this->assertNotFalse($schema);
        $this->assertEquals('test.service', $schema->schema_id);
        $this->assertEquals('Test Service', $schema->name);
    }

    /**
     * Test that creating without a token leaves no token behind.
     */
    public function test_create_schema_without_token(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();

        $manager = new \local_servicemanager\schema\manager();
        $result = $manager->create_schema($this->get_valid_yaml());

        $this->assertNull($result['token']);

        $schema = $DB->get_record('local_servicemanager_schemas', ['id' => $result['id']]);
        $this->assertEmpty($schema->tokenid);
    }

    /**
     * Test getting a schema by ID.
     */
    public function test_get_schema(): void {
        $this->resetAfterTest();
        $this->setAdminUser();

        $manager = new \local_servicemanager\schema\manager();
        $result = $manager->create_schema($this->get_valid_yaml());

        $schema = $manager->get_schema($result['id']);

        $this->assertNotNull($schema);
        $this->assertEquals('test.service', $schema->schema_id);
    }

    /**
     * Test getting all schemas.
     */
    public function test_get_all_schemas(): void {
        $this->resetAfterTest();
        $this->setAdminUser();

        $manager = new \local_servicemanager\schema\manager();

        // Initially empty.
        $schemas = $manager->get_all_schemas();
        $initialcount = count($schemas);

        // Create a schema.
        $manager->create_schema($this->get_valid_yaml());

        // Should have one more.
        $schemas = $manager->get_all_schemas();
        $this->assertCount($initialcount + 1, $schemas);
    }

    /**
     * Test deleting a schema.
     */
    public function test_delete_schema(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();

        $manager = new \local_servicemanager\schema\manager();
        $result = $manager->create_schema($this->get_valid_yaml());

        $this->assertNotFalse($DB->get_record('local_servicemanager_schemas', ['id' => $result['id']]));

        $manager->delete_schema($result['id']);

        $this->assertFalse($DB->get_record('local_servicemanager_schemas', ['id' => $result['id']]));
    }

    /**
     * Test enabling and disabling a schema.
     */
    public function test_enable_disable_schema(): void {
        global $DB;
        $this->resetAfterTest();
        $this->setAdminUser();

        $manager = new \local_servicemanager\schema\manager();
        $result = $manager->create_schema($this->get_valid_yaml());

        // Initially enabled.
        $schema = $DB->get_record('local_servicemanager_schemas', ['id' => $result['id']]);
        $this->assertEquals(1, $schema->enabled);

        // Disable.
        $manager->set_enabled($result['id'], false);
        $schema = $DB->get_record('local_servicemanager_schemas', ['id' => $result['id']]);
        $this->assertEquals(0, $schema->enabled);

        // Re-enable.
        $manager->set_enabled($result['id'], true);
        $schema = $DB->get_record('local_servicemanager_schemas', ['id' => $result['id']]);
        $this->assertEquals(1, $schema->enabled);
    }
}
