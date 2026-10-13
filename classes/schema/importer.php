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
        global $DB;

        $result = self::empty_result();
        $schemaid = null;
        $name = '';

        try {
            // Parse YAML first to get ID.
            $parser = new yaml_parser();
            $data = $parser->parse($yamlcontent);
            if ($data === null) {
                $message = get_string('import_error_invalid_yaml', 'local_servicemanager');
                $result['errors'][] = $message;
                $result['items'][] = self::item('', '', 'failed', [$message]);
                return $result;
            }
            $meta = $parser->extract_meta($data);
            $schemaid = $meta['id'] ?? null;
            $name = (string) ($meta['name'] ?? '');

            if (!$schemaid) {
                $message = get_string('import_error_no_id', 'local_servicemanager');
                $result['errors'][] = $message;
                $result['items'][] = self::item('', $name, 'failed', [$message]);
                return $result;
            }

            // Check for conflicts.
            $existing = $DB->get_record('local_servicemanager_schemas', ['schema_id' => $schemaid]);

            if ($existing) {
                switch ($conflictaction) {
                    case 'skip':
                        $result['skipped']++;
                        $result['items'][] = self::item($schemaid, $name, 'skipped');
                        return $result;

                    case 'overwrite':
                        // Update existing schema.
                        $updateresult = $this->manager->update_schema($existing->id, $yamlcontent);
                        $result['imported']++;
                        $result['warnings'] = array_merge($result['warnings'], $updateresult['warnings']);
                        $result['items'][] = self::item($schemaid, $name, 'updated', $updateresult['warnings']);
                        return $result;

                    case 'rename':
                        // Generate new ID.
                        $counter = 1;
                        $newidbase = $schemaid . '.imported';
                        $newid = $newidbase;
                        while ($DB->record_exists('local_servicemanager_schemas', ['schema_id' => $newid])) {
                            $newid = $newidbase . $counter;
                            $counter++;
                        }

                        // Update YAML content with new ID.
                        $yamlcontent = preg_replace(
                            '/^(\s*id:\s*["\']?)' . preg_quote($schemaid, '/') . '(["\']?\s*)$/m',
                            '${1}' . $newid . '${2}',
                            $yamlcontent
                        );
                        break;
                }
            }

            // Validate content. For rename, exclude the original schema from name/ID uniqueness checks.
            $validation = $this->validator->validate_content($yamlcontent, $existing->id ?? null);
            if (!empty($validation['errors'])) {
                $result['errors'] = array_merge($result['errors'], $validation['errors']);
                $result['items'][] = self::item($schemaid, $name, 'failed', $validation['errors']);
                return $result;
            }

            // Create schema.
            $createresult = $this->manager->create_schema($yamlcontent);
            $result['imported']++;
            $result['warnings'] = array_merge($result['warnings'], $createresult['warnings']);
            $result['items'][] = self::item($newid ?? $schemaid, $name, 'imported', $createresult['warnings']);
        } catch (\Throwable $e) {
            $message = ($schemaid ?? '?') . ': ' . $e->getMessage();
            $result['errors'][] = $message;
            $result['items'][] = self::item((string) ($schemaid ?? ''), $name, 'failed', [$e->getMessage()]);
        }

        return $result;
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
