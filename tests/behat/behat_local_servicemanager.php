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

/**
 * Behat context for local_servicemanager
 *
 * @package    local_servicemanager
 * @category   test
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(__DIR__ . '/../../../../lib/behat/behat_base.php');

use Behat\Gherkin\Node\TableNode;

/**
 * Local servicemanager behat context class.
 */
class behat_local_servicemanager extends behat_base {
    /**
     * Create a schema for testing.
     *
     * @Given I have uploaded a schema with id :schemaid
     * @param string $schemaid The schema ID.
     */
    public function i_have_uploaded_a_schema_with_id($schemaid) {
        $yaml = <<<YAML
meta:
  id: "{$schemaid}"
  name: "Test Service"
  version: "1.0.0"
definition:
  functions:
    - core_webservice_get_site_info
YAML;

        $manager = new \local_servicemanager\schema\manager();
        $manager->create_schema($yaml);
    }

    /**
     * Give a schema a second version, which is what the history and the comparison have to show.
     *
     * The new version is the next minor one, with another description, one more function, and the first of them is now optional.
     *
     * @Given the schema :schemaid has a second version
     * @param string $schemaid The schema ID.
     */
    public function the_schema_has_a_second_version($schemaid) {
        global $DB;

        $record = $DB->get_record('local_servicemanager_schemas', ['schema_id' => $schemaid], '*', MUST_EXIST);
        [$major, $minor] = array_map('intval', explode('.', $record->version) + [0, 0]);
        $version = $major . '.' . ($minor + 1) . '.0';
        $yaml = <<<YAML
meta:
  id: "{$schemaid}"
  name: "{$record->name}"
  version: "{$version}"
  description: "Now it also reads users."
definition:
  functions:
    - name: core_webservice_get_site_info
      critical: false
    - core_user_get_users
YAML;
        (new \local_servicemanager\schema\manager())->update_schema($record->id, $yaml);
    }

    /**
     * Open the history of a schema.
     *
     * @Given I am on the history page of the schema :schemaid
     * @param string $schemaid The schema ID.
     */
    public function i_am_on_the_history_page_of_the_schema($schemaid) {
        global $DB;

        $record = $DB->get_record('local_servicemanager_schemas', ['schema_id' => $schemaid], '*', MUST_EXIST);
        $this->getSession()->visit($this->locate_path('/local/servicemanager/pages/history.php?id=' . $record->id));
    }

    /**
     * Create multiple schemas for testing.
     *
     * @Given the following schemas exist:
     * @param TableNode $data
     */
    public function the_following_schemas_exist(TableNode $data) {
        $manager = new \local_servicemanager\schema\manager();

        foreach ($data->getHash() as $row) {
            $yaml = <<<YAML
meta:
  id: "{$row['id']}"
  name: "{$row['name']}"
  version: "{$row['version']}"
definition:
  functions:
    - core_webservice_get_site_info
YAML;
            $manager->create_schema($yaml);
        }
    }

    /**
     * Check schema exists with given ID.
     *
     * @Then a schema with id :schemaid should exist
     * @param string $schemaid
     */
    public function a_schema_with_id_should_exist($schemaid) {
        global $DB;

        $exists = $DB->record_exists('local_servicemanager_schemas', ['schema_id' => $schemaid]);
        if (!$exists) {
            throw new Exception("Schema with ID '{$schemaid}' does not exist");
        }
    }

    /**
     * Check schema does not exist with given ID.
     *
     * @Then a schema with id :schemaid should not exist
     * @param string $schemaid
     */
    public function a_schema_with_id_should_not_exist($schemaid) {
        global $DB;

        $exists = $DB->record_exists('local_servicemanager_schemas', ['schema_id' => $schemaid]);
        if ($exists) {
            throw new Exception("Schema with ID '{$schemaid}' still exists");
        }
    }

    /**
     * Open a page of the plugin.
     *
     * @Given I open the page :page of the plugin
     * @param string $page File of the page, such as documentation.php.
     */
    public function i_open_the_page_of_the_plugin($page) {
        $this->getSession()->visit($this->locate_path('/local/servicemanager/pages/' . $page));
    }

    /**
     * Give a schema a role section, so that the page of the schema has something to show about it.
     *
     * @Given the schema :schemaid has a role section
     * @param string $schemaid Id of the schema.
     */
    public function the_schema_has_a_role_section($schemaid) {
        global $DB;

        $record = $DB->get_record('local_servicemanager_schemas', ['schema_id' => $schemaid], '*', MUST_EXIST);
        [$major, $minor] = array_map('intval', explode('.', $record->version) + [0, 0]);
        $version = $major . '.' . ($minor + 1) . '.0';
        $yaml = <<<YAML
meta:
  id: "{$schemaid}"
  name: "{$record->name}"
  version: "{$version}"
definition:
  functions:
    - core_webservice_get_site_info
    - core_user_get_users
  extra_capabilities:
    - moodle/user:viewdetails
role:
  context_levels:
    - course
  permissions:
    prevent:
      - moodle/user:delete
    prohibit:
      - moodle/site:config
  allow_assign:
    - student
  allow_view:
    - student
    - editingteacher
YAML;
        (new \local_servicemanager\schema\manager())->update_schema($record->id, $yaml);
    }

    /**
     * Give a schema more extra capabilities than the page shows before its button.
     *
     * @Given the schema :schemaid has many extra capabilities
     * @param string $schemaid Id of the schema.
     */
    public function the_schema_has_many_extra_capabilities($schemaid) {
        global $DB;

        $record = $DB->get_record('local_servicemanager_schemas', ['schema_id' => $schemaid], '*', MUST_EXIST);
        [$major, $minor] = array_map('intval', explode('.', $record->version) + [0, 0]);
        $version = $major . '.' . ($minor + 1) . '.0';
        $capabilities = [
            'moodle/user:viewdetails', 'moodle/user:update', 'moodle/user:create', 'moodle/user:delete', 'moodle/course:view',
            'moodle/course:update', 'moodle/course:create', 'moodle/course:delete', 'moodle/category:manage', 'moodle/role:assign',
        ];
        $list = implode("\n", array_map(static fn(string $capability) => '    - ' . $capability, $capabilities));
        $yaml = "meta:\n  id: \"{$schemaid}\"\n  name: \"{$record->name}\"\n  version: \"{$version}\"\n" .
            "definition:\n  functions:\n    - core_webservice_get_site_info\n  extra_capabilities:\n{$list}\n";
        (new \local_servicemanager\schema\manager())->update_schema($record->id, $yaml);
    }

    /**
     * Give a schema health checks whose status goes healthy, warning, critical, from the newest one back, a day apart.
     *
     * @Given the schema :schemaid has :count health checks
     * @param string $schemaid Id of the schema.
     * @param int $count How many checks.
     */
    public function the_schema_has_health_checks($schemaid, $count) {
        global $DB;

        $id = $DB->get_field('local_servicemanager_schemas', 'id', ['schema_id' => $schemaid], MUST_EXIST);
        $statuses = ['healthy', 'warning', 'critical'];
        for ($i = 0; $i < (int) $count; $i++) {
            $status = $statuses[$i % 3];
            $DB->insert_record('local_servicemanager_logs', (object) [
                'schemaid' => $id,
                'status' => $status,
                'message' => $status === 'healthy' ? 'All checks passed' : 'Service: disabled; Token: expired',
                'details' => '{}',
                'timecreated' => time() - $i * DAYSECS,
            ]);
        }
    }

    /**
     * Open the health checks of a schema.
     *
     * @Given I am on the health checks page of the schema :schemaid
     * @param string $schemaid Id of the schema.
     */
    public function i_am_on_the_health_checks_page_of_the_schema($schemaid) {
        global $DB;

        $id = $DB->get_field('local_servicemanager_schemas', 'id', ['schema_id' => $schemaid], MUST_EXIST);
        $this->getSession()->visit($this->locate_path('/local/servicemanager/pages/health.php?id=' . $id));
    }

}
