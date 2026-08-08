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

use local_servicemanager\automation\service_settings;

/**
 * The parts of a parsed schema that provisioning needs.
 *
 * Creating a schema and updating one pull the same five things out of the same
 * parsed YAML. Reading them once, here, keeps that list in a single place.
 *
 * @package    local_servicemanager
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class schema_definition {
    /** @var array Meta section, with defaults applied. */
    protected $meta;

    /** @var array Functions with 'name' and 'critical' keys. */
    protected $functions;

    /** @var array Capabilities requested on top of the ones the functions imply. */
    protected $extracapabilities;

    /** @var array Email addresses to authorize besides the service user. */
    protected $additionalusers;

    /** @var service_settings File transfer permissions. */
    protected $settings;

    /**
     * Constructor
     *
     * @param array $meta Meta section
     * @param array $functions Functions
     * @param array $extracapabilities Extra capabilities
     * @param array $additionalusers Additional user emails
     * @param service_settings $settings File transfer permissions
     */
    public function __construct(
        array $meta,
        array $functions,
        array $extracapabilities,
        array $additionalusers,
        service_settings $settings
    ) {
        $this->meta = $meta;
        $this->functions = $functions;
        $this->extracapabilities = $extracapabilities;
        $this->additionalusers = $additionalusers;
        $this->settings = $settings;
    }

    /**
     * Read a definition out of parsed YAML data.
     *
     * @param yaml_parser $parser Parser used for the extraction
     * @param array $data Parsed YAML data
     * @return self
     */
    public static function from_data(yaml_parser $parser, array $data): self {
        return new self(
            $parser->extract_meta($data),
            $parser->extract_functions($data),
            $parser->extract_extra_capabilities($data),
            $parser->extract_additional_users($data),
            service_settings::from_array($parser->extract_service_settings($data))
        );
    }

    /**
     * Schema ID, for example "crm.integration".
     *
     * @return string
     */
    public function get_schema_id(): string {
        return (string) $this->meta['id'];
    }

    /**
     * Display name.
     *
     * @return string
     */
    public function get_name(): string {
        return (string) $this->meta['name'];
    }

    /**
     * Description.
     *
     * @return string
     */
    public function get_description(): string {
        return (string) $this->meta['description'];
    }

    /**
     * Declared version.
     *
     * @return string
     */
    public function get_version(): string {
        return (string) $this->meta['version'];
    }

    /**
     * Maintainer.
     *
     * @return string
     */
    public function get_maintainer(): string {
        return (string) $this->meta['maintainer'];
    }

    /**
     * Functions the service exposes.
     *
     * @return array
     */
    public function get_functions(): array {
        return $this->functions;
    }

    /**
     * Capabilities requested on top of the ones the functions imply.
     *
     * @return array
     */
    public function get_extra_capabilities(): array {
        return $this->extracapabilities;
    }

    /**
     * Email addresses to authorize besides the service user.
     *
     * @return array
     */
    public function get_additional_users(): array {
        return $this->additionalusers;
    }

    /**
     * File transfer permissions.
     *
     * @return service_settings
     */
    public function get_settings(): service_settings {
        return $this->settings;
    }
}
