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

use core\output\react_component_renderable;

/**
 * The reference of the YAML format of a schema, with an example to download.
 *
 * The page is drawn by the React component local_servicemanager/Documentation.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class documentation_page implements react_component_renderable, \renderable {
    /** @var string The structure of a schema, as the page shows it. */
    private const STRUCTURE = <<<'YAML'
meta:
  id: "example.service"           # Required: Unique identifier
  name: "Example Service"         # Required: Display name
  version: "1.0.0"               # Required: Version number
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
     * The React component that draws the documentation.
     *
     * @return string Name of the component inside the plugin.
     */
    #[\Override]
    public function get_react_component_name(): string {
        return 'local_servicemanager/Documentation';
    }

    /**
     * The text and the examples of the page.
     *
     * @param \renderer_base $renderer Renderer.
     * @return \stdClass Properties of the component.
     */
    #[\Override]
    public function get_react_component_props(\renderer_base $renderer): \stdClass {
        return (object) [
            'strings' => page_text::strings(),
            'backUrl' => $this->backurl,
            'downloadUrl' => (new \moodle_url('/local/servicemanager/pages/download_example.php'))->out(false),
            'structureCode' => self::STRUCTURE,
            'functionCode' => self::FUNCTIONS,
        ];
    }
}
