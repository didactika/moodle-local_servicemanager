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

namespace local_servicemanager\output;

/**
 * The reference of the YAML format of a schema, with an example to download.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class documentation_page implements \renderable, \templatable {
    /** @var string The structure of a schema, as the page shows it. */
    private const STRUCTURE = <<<'YAML'
meta:
  id: "example.service"           # Required: Unique identifier
  name: "Example Service"         # Required: Display name
  version: "1.0.0"               # Optional: starts at 1.0.0 and goes up by itself
  maintainer: "Your Name"         # Optional: Maintainer
  description: "Description"      # Optional: Description

requirements:                     # Optional
  plugins:
    - mod_forum
  download_files: false           # Allow file downloads (default: false)
  upload_files: false             # Allow file uploads (default: false)

definition:
  functions:                      # Required: Web service functions
    - core_user_get_users
    - name: core_course_get_courses
      critical: true

  extra_capabilities:             # Optional: Additional capabilities
    - moodle/user:viewdetails

  additional_users:               # Optional: Users to authorize
    - admin@example.com

role:                             # Optional: what the role may do
  context_levels:                 # Besides the whole site
    - course
  permissions:
    prevent:
      - moodle/user:delete
    prohibit:
      - moodle/site:config
  allow_assign:                   # Roles it may assign
    - student
  allow_view:                     # Roles it may see
    - student
YAML;

    /** @var string The two ways to write the functions, as the page shows them. */
    private const FUNCTIONS = <<<'YAML'
# Simple format (critical: true by default)
functions:
  - core_user_get_users
  - core_course_get_courses

# Extended format
functions:
  - name: core_user_get_users
    critical: true    # Blocks creation if missing
  - name: mod_forum_get_forums
    critical: false   # Warning only if missing
YAML;

    /** @var array[] The fields of each section: name and whether it is required, with the string that says what it is for. */
    private const FIELDS = [
        'meta' => [
            ['id', true],
            ['name', true],
            ['version', false],
            ['maintainer', false],
            ['description', false],
        ],
        'requirements' => [
            ['plugins', false],
            ['download_files', false],
            ['upload_files', false],
        ],
        'role' => [
            ['context_levels', false],
            ['permissions', false],
            ['allow_assign', false],
            ['allow_override', false],
            ['allow_switch', false],
            ['allow_view', false],
        ],
    ];

    /** @var string[][] What each resource that a schema creates is called: the string that names it, its pattern and an example. */
    private const NAMING = [
        ['doc_naming_username', 'ws.{id}', 'ws.example.service'],
        ['doc_naming_displayname', 'User Webservice {name}', 'User Webservice Example Service'],
        ['doc_naming_email', 'ws.{id}@devnull.{domain}', 'ws.example.service@devnull.example.com'],
        ['doc_naming_role', 'ws_{id}', 'ws_example_service'],
        ['doc_naming_service', 'ws_{id}', 'ws_example_service'],
        ['doc_naming_token', 'Token - {name}', 'Token - Example Service'],
    ];

    /** @var string[] The sections of the page, in order. */
    private const SECTIONS = ['structure', 'meta', 'definition', 'role', 'naming', 'example'];

    /** @var string Where the person goes back to. */
    private string $backurl;

    /**
     * Create the page.
     *
     * @param string $backurl Where the person goes back to; the dashboard when empty.
     */
    public function __construct(string $backurl = '') {
        $this->backurl = $backurl !== '' ? $backurl
            : (new \moodle_url('/local/servicemanager/pages/dashboard.php'))->out(false);
    }

    /**
     * The text and the examples of the page.
     *
     * @param \renderer_base $output Renderer.
     * @return array The context of the template.
     */
    public function export_for_template(\renderer_base $output): array {
        unset($output);
        $links = [];
        foreach (self::SECTIONS as $section) {
            $links[] = ['id' => $section, 'label' => get_string('doc_' . $section, 'local_servicemanager')];
        }

        $tables = [];
        foreach (self::FIELDS as $name => $fields) {
            $rows = [];
            foreach ($fields as [$field, $required]) {
                $rows[] = [
                    'name' => $field,
                    'required' => $required,
                    'requiredlabel' => get_string($required ? 'yes' : 'no'),
                    'description' => get_string('doc_' . $name . '_' . $field, 'local_servicemanager'),
                ];
            }
            $tables[$name] = $rows;
        }

        $naming = [];
        foreach (self::NAMING as [$resource, $pattern, $example]) {
            $naming[] = [
                'resource' => get_string($resource, 'local_servicemanager'),
                'pattern' => $pattern,
                'example' => $example,
            ];
        }

        return [
            'backurl' => $this->backurl,
            'downloadurl' => (new \moodle_url('/local/servicemanager/pages/download_example.php'))->out(false),
            'links' => $links,
            'structure' => self::STRUCTURE,
            'functions' => self::FUNCTIONS,
            'meta' => $tables['meta'],
            'requirements' => $tables['requirements'],
            'role' => $tables['role'],
            'naming' => $naming,
        ];
    }
}
