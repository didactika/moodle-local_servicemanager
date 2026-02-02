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
 * Schema documentation page
 *
 * @package    local_serviceschema
 * @author     Hector Arrechea <hector.arrechea@ct.uneatlantico.es>
 * @copyright  2026 ADSDR
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(__DIR__ . '/../../../config.php');

require_login();
require_capability('local/serviceschema:view', context_system::instance());

$returnurl = optional_param('returnurl', '', PARAM_LOCALURL);

$PAGE->set_url(new moodle_url('/local/serviceschema/pages/documentation.php'));
$PAGE->set_context(context_system::instance());
$PAGE->set_title(get_string('pluginname', 'local_serviceschema') . ' - ' . get_string('documentation', 'local_serviceschema'));
$PAGE->set_heading(get_string('documentation', 'local_serviceschema'));
$PAGE->set_pagelayout('admin');

// Navigation.
$PAGE->navbar->add(get_string('pluginname', 'local_serviceschema'), new moodle_url('/local/serviceschema/pages/dashboard.php'));
$PAGE->navbar->add(get_string('documentation', 'local_serviceschema'));

echo $OUTPUT->header();

// Back button.
$backurl = !empty($returnurl) ? $returnurl : new moodle_url('/local/serviceschema/pages/dashboard.php');
echo html_writer::start_div('mb-4');
echo html_writer::link($backurl, html_writer::tag('i', '', ['class' => 'fa fa-arrow-left mr-2']) . get_string('back'), ['class' => 'btn btn-secondary']);
echo html_writer::end_div();

// Documentation content.
echo html_writer::start_div('card');
echo html_writer::start_div('card-header bg-primary text-white');
echo html_writer::tag('h4', html_writer::tag('i', '', ['class' => 'fa fa-book mr-2']) . get_string('schema_reference', 'local_serviceschema'), ['class' => 'mb-0']);
echo html_writer::end_div();

echo html_writer::start_div('card-body');

// Quick links.
echo html_writer::tag('h5', get_string('quick_links', 'local_serviceschema'), ['class' => 'mb-3']);
echo html_writer::start_tag('ul', ['class' => 'list-unstyled mb-4']);
echo html_writer::tag('li', html_writer::link('#structure', html_writer::tag('i', '', ['class' => 'fa fa-chevron-right mr-2']) . get_string('doc_structure', 'local_serviceschema')));
echo html_writer::tag('li', html_writer::link('#meta', html_writer::tag('i', '', ['class' => 'fa fa-chevron-right mr-2']) . get_string('doc_meta', 'local_serviceschema')));
echo html_writer::tag('li', html_writer::link('#definition', html_writer::tag('i', '', ['class' => 'fa fa-chevron-right mr-2']) . get_string('doc_definition', 'local_serviceschema')));
echo html_writer::tag('li', html_writer::link('#naming', html_writer::tag('i', '', ['class' => 'fa fa-chevron-right mr-2']) . get_string('doc_naming', 'local_serviceschema')));
echo html_writer::tag('li', html_writer::link('#example', html_writer::tag('i', '', ['class' => 'fa fa-chevron-right mr-2']) . get_string('doc_example', 'local_serviceschema')));
echo html_writer::end_tag('ul');

// Download example button.
$downloadurl = new moodle_url('/local/serviceschema/pages/download_example.php');
echo html_writer::start_div('alert alert-success mb-4');
echo html_writer::tag('i', '', ['class' => 'fa fa-download mr-2']);
echo html_writer::link($downloadurl, get_string('download_example', 'local_serviceschema'), ['class' => 'alert-link']);
echo ' - ' . get_string('download_example_desc', 'local_serviceschema');
echo html_writer::end_div();

// Structure section.
echo html_writer::tag('h4', get_string('doc_structure', 'local_serviceschema'), ['id' => 'structure', 'class' => 'mt-4 mb-3 text-primary']);
echo html_writer::tag('p', get_string('doc_structure_desc', 'local_serviceschema'));

$structureCode = <<<'YAML'
meta:
  id: "example.service"           # Required: Unique identifier
  name: "Example Service"         # Required: Display name
  version: "1.0.0"               # Required: Version number
  maintainer: "Your Name"         # Optional: Maintainer
  description: "Description"      # Optional: Description

requirements:                     # Optional
  plugins:
    - mod_forum

definition:
  functions:                      # Required: Web service functions
    - core_user_get_users
    - name: core_course_get_courses
      critical: true
  
  extra_capabilities:             # Optional: Additional capabilities
    - moodle/user:viewdetails
  
  additional_users:               # Optional: Users to authorize
    - admin@example.com
YAML;

echo html_writer::tag('pre', html_writer::tag('code', s($structureCode)), ['class' => 'bg-light p-3 rounded']);

// Meta section.
echo html_writer::tag('h4', get_string('doc_meta', 'local_serviceschema'), ['id' => 'meta', 'class' => 'mt-4 mb-3 text-primary']);

$metaTable = html_writer::start_tag('table', ['class' => 'table table-bordered table-striped']);
$metaTable .= html_writer::start_tag('thead', ['class' => 'thead-light']);
$metaTable .= html_writer::tag('tr',
    html_writer::tag('th', get_string('field', 'local_serviceschema')) .
    html_writer::tag('th', get_string('required')) .
    html_writer::tag('th', get_string('description'))
);
$metaTable .= html_writer::end_tag('thead');
$metaTable .= html_writer::start_tag('tbody');
$metaTable .= html_writer::tag('tr',
    html_writer::tag('td', html_writer::tag('code', 'id')) .
    html_writer::tag('td', html_writer::tag('span', get_string('yes'), ['class' => 'badge badge-success'])) .
    html_writer::tag('td', get_string('doc_meta_id', 'local_serviceschema'))
);
$metaTable .= html_writer::tag('tr',
    html_writer::tag('td', html_writer::tag('code', 'name')) .
    html_writer::tag('td', html_writer::tag('span', get_string('yes'), ['class' => 'badge badge-success'])) .
    html_writer::tag('td', get_string('doc_meta_name', 'local_serviceschema'))
);
$metaTable .= html_writer::tag('tr',
    html_writer::tag('td', html_writer::tag('code', 'version')) .
    html_writer::tag('td', html_writer::tag('span', get_string('yes'), ['class' => 'badge badge-success'])) .
    html_writer::tag('td', get_string('doc_meta_version', 'local_serviceschema'))
);
$metaTable .= html_writer::tag('tr',
    html_writer::tag('td', html_writer::tag('code', 'maintainer')) .
    html_writer::tag('td', html_writer::tag('span', get_string('no'), ['class' => 'badge badge-secondary'])) .
    html_writer::tag('td', get_string('doc_meta_maintainer', 'local_serviceschema'))
);
$metaTable .= html_writer::tag('tr',
    html_writer::tag('td', html_writer::tag('code', 'description')) .
    html_writer::tag('td', html_writer::tag('span', get_string('no'), ['class' => 'badge badge-secondary'])) .
    html_writer::tag('td', get_string('doc_meta_description', 'local_serviceschema'))
);
$metaTable .= html_writer::end_tag('tbody');
$metaTable .= html_writer::end_tag('table');
echo $metaTable;

// Definition section.
echo html_writer::tag('h4', get_string('doc_definition', 'local_serviceschema'), ['id' => 'definition', 'class' => 'mt-4 mb-3 text-primary']);
echo html_writer::tag('p', get_string('doc_definition_desc', 'local_serviceschema'));

echo html_writer::tag('h5', get_string('functions', 'local_serviceschema'), ['class' => 'mt-3']);
echo html_writer::tag('p', get_string('doc_functions_desc', 'local_serviceschema'));

$funcCode = <<<'YAML'
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
echo html_writer::tag('pre', html_writer::tag('code', s($funcCode)), ['class' => 'bg-light p-3 rounded']);

// Naming conventions.
echo html_writer::tag('h4', get_string('doc_naming', 'local_serviceschema'), ['id' => 'naming', 'class' => 'mt-4 mb-3 text-primary']);

$namingTable = html_writer::start_tag('table', ['class' => 'table table-bordered table-striped']);
$namingTable .= html_writer::start_tag('thead', ['class' => 'thead-light']);
$namingTable .= html_writer::tag('tr',
    html_writer::tag('th', get_string('resource', 'local_serviceschema')) .
    html_writer::tag('th', get_string('pattern', 'local_serviceschema')) .
    html_writer::tag('th', get_string('doc_example_col', 'local_serviceschema'))
);
$namingTable .= html_writer::end_tag('thead');
$namingTable .= html_writer::start_tag('tbody');
$namingTable .= html_writer::tag('tr',
    html_writer::tag('td', 'Username') .
    html_writer::tag('td', html_writer::tag('code', 'ws.{id}')) .
    html_writer::tag('td', html_writer::tag('code', 'ws.example.service'))
);
$namingTable .= html_writer::tag('tr',
    html_writer::tag('td', 'Email') .
    html_writer::tag('td', html_writer::tag('code', 'ws.{id}@devnull.{domain}')) .
    html_writer::tag('td', html_writer::tag('code', 'ws.example.service@devnull.campus.edu'))
);
$namingTable .= html_writer::tag('tr',
    html_writer::tag('td', 'Role') .
    html_writer::tag('td', html_writer::tag('code', 'ws_{id}')) .
    html_writer::tag('td', html_writer::tag('code', 'ws_example_service'))
);
$namingTable .= html_writer::tag('tr',
    html_writer::tag('td', 'Service') .
    html_writer::tag('td', html_writer::tag('code', 'ws_{id}')) .
    html_writer::tag('td', html_writer::tag('code', 'ws_example_service'))
);
$namingTable .= html_writer::tag('tr',
    html_writer::tag('td', 'Token') .
    html_writer::tag('td', html_writer::tag('code', 'Token - {name}')) .
    html_writer::tag('td', html_writer::tag('code', 'Token - Example Service'))
);
$namingTable .= html_writer::end_tag('tbody');
$namingTable .= html_writer::end_tag('table');
echo $namingTable;

// Example section.
echo html_writer::tag('h4', get_string('doc_example', 'local_serviceschema'), ['id' => 'example', 'class' => 'mt-4 mb-3 text-primary']);
echo html_writer::start_div('alert alert-info');
echo html_writer::tag('i', '', ['class' => 'fa fa-lightbulb-o mr-2']);
echo html_writer::link($downloadurl, get_string('download_example', 'local_serviceschema'), ['class' => 'alert-link font-weight-bold']);
echo html_writer::end_div();

echo html_writer::end_div(); // card-body
echo html_writer::end_div(); // card

echo $OUTPUT->footer();
