# Changelog

All notable changes to the Service Schema Manager plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-02-02

### Added

- **Import/Export functionality**
  - Export single schema as YAML file
  - Export all schemas as ZIP archive with manifest
  - Import YAML files or ZIP archives
  - Conflict handling options: skip, overwrite, or rename

- **Bulk operations**
  - Select multiple schemas with checkboxes
  - Bulk enable/disable schemas
  - Bulk delete with confirmation
  - Bulk export selected schemas

- **Schema versioning and rollback**
  - New `local_serviceschema_history` database table
  - Automatic version snapshots on schema updates
  - Version history page with timeline view
  - Rollback to any previous version
  - Rollback to any previous version
  - Pre-rollback backup creation (smart redundancy check)
  - "View Detail" for historical versions

### Changed

- CSS styles now properly scoped under `.serviceschema-*` classes
- Dashboard redesigned with import/export buttons and bulk actions
- Individual schema rows now include export and history buttons

### Fixed

- Copy token button styles now properly scoped
- Improved CSS specificity to prevent style leakage

---

## [1.0.0] - 2026-02-02

### Added

- Initial release of Service Schema Manager
- YAML schema parsing with native PHP `yaml_parse()` or fallback parser
- Automatic creation of service users with `ws.{id}` pattern
- Automatic creation of system roles with `ws_{id}` pattern
- Automatic creation of external services with function mapping
- Capability calculation from web service functions
- Token generation and regeneration
- In-Moodle YAML editor for schema modifications
- Dashboard with schema listing and status indicators
- Detailed view page with function status and health logs
- Scheduled health check task (daily)
- Scheduled log cleanup task
- Email notifications for health alerts
- Configurable notification recipients
- Multi-language support:
  - English (en)
  - Spanish (es)
  - Portuguese (pt)
  - Italian (it)
  - French (fr)
- Interactive documentation page
- Example YAML file download
- Comprehensive README with installation guide

### Security

- Tokens displayed only once after generation
- Service users use non-routable email addresses
- Services restricted to authorized users by default
- Role capabilities automatically calculated from functions

### Requirements

- Moodle 4.5 or later
- PHP 8.1 or later

## [Unreleased]

### Planned

- API endpoint for programmatic management
- Webhook notifications
- Schema comparison view
- Scheduled schema validation
