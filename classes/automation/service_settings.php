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

namespace local_servicemanager\automation;

/**
 * File transfer permissions for a provisioned external service.
 *
 * Both flags come from the same YAML section and are always written to the same
 * record, so they travel as one value. Passed separately they were two optional
 * booleans of the same type in a row, which a caller can silently swap.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class service_settings {
    /** @var bool Whether the service may download files. */
    protected $downloadfiles;

    /** @var bool Whether the service may upload files. */
    protected $uploadfiles;

    /**
     * Constructor
     *
     * @param bool $downloadfiles Whether the service may download files
     * @param bool $uploadfiles Whether the service may upload files
     */
    public function __construct(bool $downloadfiles, bool $uploadfiles) {
        $this->downloadfiles = $downloadfiles;
        $this->uploadfiles = $uploadfiles;
    }

    /**
     * Build from the array yaml_parser::extract_service_settings() returns.
     *
     * @param array $settings ['download_files' => bool, 'upload_files' => bool]
     * @return self
     */
    public static function from_array(array $settings): self {
        return new self(
            !empty($settings['download_files']),
            !empty($settings['upload_files'])
        );
    }

    /**
     * Settings for a service that transfers no files, which is the default.
     *
     * @return self
     */
    public static function none(): self {
        return new self(false, false);
    }

    /**
     * Whether the service may download files.
     *
     * @return bool
     */
    public function downloads_files(): bool {
        return $this->downloadfiles;
    }

    /**
     * Whether the service may upload files.
     *
     * @return bool
     */
    public function uploads_files(): bool {
        return $this->uploadfiles;
    }
}
