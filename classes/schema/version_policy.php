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

namespace local_servicemanager\schema;

/**
 * The rules tying a schema's version number to its content.
 *
 * Changing what a service does must bump the version; changing only its
 * metadata must not. A rollback is the one case allowed to move the version
 * backwards, because the content it restores is genuinely an older one.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class version_policy {
    /**
     * Check the version of an ordinary edit.
     *
     * @param \stdClass $existing Stored schema record
     * @param string $newversion Version declared in the submitted YAML
     * @param bool $contentchanged Whether anything outside meta changed
     * @throws \moodle_exception If the version does not match the change
     */
    public function check_update(\stdClass $existing, string $newversion, bool $contentchanged): void {
        $this->check($existing, $newversion, $contentchanged, false);
    }

    /**
     * Check the version of a rollback, which may go backwards.
     *
     * @param \stdClass $existing Stored schema record
     * @param string $newversion Version declared in the restored YAML
     * @param bool $contentchanged Whether anything outside meta changed
     * @throws \moodle_exception If the version does not match the change
     */
    public function check_rollback(\stdClass $existing, string $newversion, bool $contentchanged): void {
        $this->check($existing, $newversion, $contentchanged, true);
    }

    /**
     * Shared rule set for both directions.
     *
     * @param \stdClass $existing Stored schema record
     * @param string $newversion Version declared in the submitted YAML
     * @param bool $contentchanged Whether anything outside meta changed
     * @param bool $isrollback Whether the version is allowed to go backwards
     * @throws \moodle_exception If the version does not match the change
     */
    private function check(
        \stdClass $existing,
        string $newversion,
        bool $contentchanged,
        bool $isrollback
    ): void {
        if (!$contentchanged) {
            // Metadata-only edit: the version identifies content that did not move.
            if ($newversion !== $existing->version && !$isrollback) {
                throw new \moodle_exception('error_version_change_forbidden', 'local_servicemanager');
            }
            return;
        }

        if ($newversion === $existing->version) {
            throw new \moodle_exception('error_version_change_required', 'local_servicemanager');
        }

        if (!$isrollback && version_compare($newversion, $existing->version, '<=')) {
            throw new \moodle_exception(
                'error_version_must_increment',
                'local_servicemanager',
                '',
                (object)['current' => $existing->version, 'new' => $newversion]
            );
        }
    }
}
