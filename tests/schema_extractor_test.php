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

use local_servicemanager\schema\schema_extractor;

/**
 * Unit tests for what is taken from each section of a parsed schema.
 *
 * @package    local_servicemanager
 * @category   test
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @covers     \local_servicemanager\schema\schema_extractor
 */
final class schema_extractor_test extends \advanced_testcase {
    /**
     * Test extracting meta information.
     */
    public function test_get_meta(): void {
        $yaml = <<<YAML
meta:
  id: "test.service"
  name: "Test Service"
  version: "2.0.0"
  maintainer: "Test Team"
  description: "A test service"
definition:
  functions:
    - core_user_get_users
YAML;

        $parser = new \local_servicemanager\schema\yaml_parser();
        $data = $parser->parse($yaml);
        $meta = schema_extractor::meta($data);

        $this->assertEquals('test.service', $meta['id']);
        $this->assertEquals('Test Service', $meta['name']);
        $this->assertEquals('2.0.0', $meta['version']);
        $this->assertEquals('Test Team', $meta['maintainer']);
        $this->assertEquals('A test service', $meta['description']);
    }

    /**
     * Test extracting functions list.
     */
    public function test_get_functions(): void {
        $yaml = <<<YAML
meta:
  id: "test.service"
  name: "Test Service"
  version: "1.0.0"
definition:
  functions:
    - core_user_get_users
    - name: core_course_get_courses
      critical: true
    - name: mod_forum_get_forums
      critical: false
YAML;

        $parser = new \local_servicemanager\schema\yaml_parser();
        $data = $parser->parse($yaml);
        $functions = schema_extractor::functions($data);

        $this->assertCount(3, $functions);

        // Simple format should default to critical=true.
        $this->assertEquals('core_user_get_users', $functions[0]['name']);
        $this->assertTrue($functions[0]['critical']);

        // Extended format with critical=true.
        $this->assertEquals('core_course_get_courses', $functions[1]['name']);
        $this->assertTrue($functions[1]['critical']);

        // Extended format with critical=false.
        $this->assertEquals('mod_forum_get_forums', $functions[2]['name']);
        $this->assertFalse($functions[2]['critical']);
    }

    /**
     * Test extracting extra capabilities.
     */
    public function test_get_extra_capabilities(): void {
        $yaml = <<<YAML
meta:
  id: "test.service"
  name: "Test Service"
  version: "1.0.0"
definition:
  functions:
    - core_user_get_users
  extra_capabilities:
    - moodle/user:viewdetails
    - moodle/course:view
YAML;

        $parser = new \local_servicemanager\schema\yaml_parser();
        $data = $parser->parse($yaml);
        $caps = schema_extractor::extra_capabilities($data);

        $this->assertCount(2, $caps);
        $this->assertContains('moodle/user:viewdetails', $caps);
        $this->assertContains('moodle/course:view', $caps);
    }
}
