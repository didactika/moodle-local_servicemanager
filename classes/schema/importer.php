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
 * Imports service schemas from YAML content.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class importer {
    /** @var manager */
    protected $manager;

    /** @var validator */
    protected $validator;

    /**
     * Constructor.
     *
     * @param manager|null $manager Schema manager (created if not supplied).
     * @param validator|null $validator Schema validator (created if not supplied).
     */
    public function __construct(?manager $manager = null, ?validator $validator = null) {
        $this->manager = $manager ?? new manager();
        $this->validator = $validator ?? new validator();
    }

    /**
     * Get an empty result totals structure.
     *
     * @return array Result with imported, skipped, errors, warnings and items, which has a row for each schema that was read:
     *     its id, its name, what became of it (imported, updated, skipped or failed) and what went wrong or was noted.
     */
    public static function empty_result(): array {
        return ['imported' => 0, 'skipped' => 0, 'errors' => [], 'warnings' => [], 'items' => []];
    }

    /**
     * A row of the items of a result.
     *
     * @param string $id Id of the schema.
     * @param string $name Name of the schema.
     * @param string $status What became of it: imported, updated, skipped or failed.
     * @param string[] $messages What went wrong or was noted.
     * @return array The row.
     */
    private static function item(string $id, string $name, string $status, array $messages = []): array {
        return ['id' => $id, 'name' => $name, 'status' => $status, 'messages' => array_values($messages)];
    }

    /**
     * Import a single schema from YAML content.
     *
     * @param string $yamlcontent YAML content.
     * @param string $conflictaction Conflict action: skip, overwrite, rename.
     * @return array Result with imported, skipped, errors, warnings.
     */
    public function import_single(string $yamlcontent, string $conflictaction): array {
        $seen = ['id' => null, 'name' => ''];

        try {
            return $this->import_seen($yamlcontent, $conflictaction, $seen);
        } catch (\Throwable $e) {
            $result = self::empty_result();
            $result['errors'][] = ($seen['id'] ?? '?') . ': ' . $e->getMessage();
            $result['items'][] = self::item((string) ($seen['id'] ?? ''), $seen['name'], 'failed', [$e->getMessage()]);
            return $result;
        }
    }

    /**
     * Import a schema, telling what was read of it before anything went wrong.
     *
     * @param string $yamlcontent YAML content.
     * @param string $conflictaction Conflict action: skip, overwrite, rename.
     * @param array $seen The id and the name of the schema, filled in as soon as they are read.
     * @return array Result with imported, skipped, errors, warnings.
     */
    private function import_seen(string $yamlcontent, string $conflictaction, array &$seen): array {
        global $DB;

        $parser = new yaml_parser();
        $data = $parser->parse($yamlcontent);
        if ($data === null) {
            return self::failure('', '', get_string('import_error_invalid_yaml', 'local_servicemanager'));
        }
        $meta = schema_extractor::meta($data);
        $schemaid = $meta['id'] ?? null;
        $name = (string) ($meta['name'] ?? '');
        $seen = ['id' => $schemaid, 'name' => $name];
        if (!$schemaid) {
            return self::failure('', $name, get_string('import_error_no_id', 'local_servicemanager'));
        }

        $existing = $DB->get_record('local_servicemanager_schemas', ['schema_id' => $schemaid]);
        $newid = null;
        if ($existing) {
            $conflict = $this->resolve_conflict($conflictaction, $existing, $yamlcontent, $schemaid, $name);
            if (isset($conflict['result'])) {
                return $conflict['result'];
            }
            [$yamlcontent, $newid] = [$conflict['yaml'], $conflict['newid']];
        }

        // Validate content. For rename, exclude the original schema from name/ID uniqueness checks.
        $validation = $this->validator->validate_content($yamlcontent, $existing->id ?? null);
        if (!empty($validation['errors'])) {
            $result = self::empty_result();
            $result['errors'] = array_merge($result['errors'], $validation['errors']);
            $result['items'][] = self::item($schemaid, $name, 'failed', $validation['errors']);
            return $result;
        }

        $created = $this->manager->create_schema($yamlcontent);
        $result = self::empty_result();
        $result['imported']++;
        $result['warnings'] = array_merge($result['warnings'], $created['warnings']);
        $result['items'][] = self::item($newid ?? $schemaid, $name, 'imported', $created['warnings']);
        return $result;
    }

    /**
     * A result that says one schema could not be imported.
     *
     * @param string $schemaid Id of the schema, when it is known.
     * @param string $name Name of the schema.
     * @param string $message What went wrong.
     * @return array The result.
     */
    private static function failure(string $schemaid, string $name, string $message): array {
        $result = self::empty_result();
        $result['errors'][] = $message;
        $result['items'][] = self::item($schemaid, $name, 'failed', [$message]);
        return $result;
    }

    /**
     * What to do with a schema whose id is already in use.
     *
     * @param string $action What the person chose: skip, overwrite or rename.
     * @param \stdClass $existing The schema that has the id.
     * @param string $yamlcontent The YAML that is being imported.
     * @param string $schemaid Its id.
     * @param string $name Its name.
     * @return array A result when the import is over, and otherwise the YAML to go on with and the new id it has.
     */
    private function resolve_conflict(
        string $action,
        \stdClass $existing,
        string $yamlcontent,
        string $schemaid,
        string $name
    ): array {
        if ($action === 'skip') {
            $result = self::empty_result();
            $result['skipped']++;
            $result['items'][] = self::item($schemaid, $name, 'skipped');
            return ['result' => $result];
        }
        if ($action === 'overwrite') {
            $updated = $this->manager->update_schema($existing->id, $yamlcontent);
            $result = self::empty_result();
            $result['imported']++;
            $result['warnings'] = array_merge($result['warnings'], $updated['warnings']);
            $result['items'][] = self::item($schemaid, $name, 'updated', $updated['warnings']);
            return ['result' => $result];
        }
        if ($action === 'rename') {
            $newid = $this->free_id($schemaid);
            $yaml = preg_replace(
                '/^(\s*id:\s*["\']?)' . preg_quote($schemaid, '/') . '(["\']?\s*)$/m',
                '${1}' . $newid . '${2}',
                $yamlcontent
            );
            return ['yaml' => $yaml, 'newid' => $newid];
        }
        return ['yaml' => $yamlcontent, 'newid' => null];
    }

    /**
     * An id that no schema has, made from the one that is taken.
     *
     * @param string $schemaid The id that is taken.
     * @return string The new id.
     */
    private function free_id(string $schemaid): string {
        global $DB;

        $base = $schemaid . '.imported';
        $newid = $base;
        for ($counter = 1; $DB->record_exists('local_servicemanager_schemas', ['schema_id' => $newid]); $counter++) {
            $newid = $base . $counter;
        }
        return $newid;
    }

    /**
     * Merge a single import result into running totals.
     *
     * @param array $totals Total results (modified in place).
     * @param array $result Single import result.
     */
    public function merge_result(array &$totals, array $result): void {
        $totals['imported'] += $result['imported'];
        $totals['skipped'] += $result['skipped'];
        $totals['errors'] = array_merge($totals['errors'], $result['errors']);
        $totals['warnings'] = array_merge($totals['warnings'], $result['warnings']);
        $totals['items'] = array_merge($totals['items'] ?? [], $result['items'] ?? []);
    }
}
