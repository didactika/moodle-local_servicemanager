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

use local_servicemanager\schema\history_manager;

/**
 * The versions of a schema as the history shows them: who made each, when, why, and whether it can be rolled back to.
 *
 * The page of the history and the web service function that rolls a schema back both need them, so they are described here once.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class version_rows {
    /**
     * The versions of a schema, the newest first.
     *
     * @param \stdClass $schema The schema record.
     * @param \moodle_page $page The page, to find the picture of the person who made each version.
     * @return array[] One entry for each version.
     */
    public static function describe(\stdClass $schema, \moodle_page $page): array {
        $rows = [];
        foreach ((new history_manager())->list_versions((int) $schema->id) as $record) {
            $user = new \stdClass();
            $user->id = $record->changedby;
            $fields = [
                'firstname', 'lastname', 'middlename', 'alternatename', 'firstnamephonetic', 'lastnamephonetic', 'picture', 'email',
                'imagealt',
            ];
            foreach ($fields as $field) {
                $user->$field = $record->$field;
            }
            $picture = new \user_picture($user);
            $picture->size = 1;
            $name = fullname($user);
            $reason = $record->change_reason ? format_string($record->change_reason) : '';
            $current = $record->version === $schema->version;
            $rows[] = [
                'id' => (int) $record->id,
                'version' => (string) $record->version,
                'username' => $name,
                'userpicture' => $picture->get_url($page)->out(false),
                'date' => userdate($record->timecreated, get_string('strftimedatetimeshort')),
                'at' => (int) $record->timecreated,
                'reason' => $reason,
                'iscurrent' => $current,
                // A version that is the one the schema has now cannot be rolled back to.
                'canrollback' => !$current,
                'text' => $record->version . ' ' . $name . ' ' . $reason,
                'viewurl' => (new \moodle_url('/local/servicemanager/pages/view_history.php', ['historyid' => $record->id]))->out(false),
            ];
        }
        return $rows;
    }
}
