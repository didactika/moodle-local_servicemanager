# Changelog

All notable changes to the Web Service Manager plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2026-09-06

### Fixed

- Restored the standard Moodle `user_created` event when provisioning service users (#26).
- Added the missing `cachedef_newtoken` language string (#24).
- Made the naming-convention table labels in the schema documentation translatable (#25).

### Added

- Regression coverage for user creation, role creation, role assignment, and schema provisioning events (#26).

## [1.0.1] - 2026-07-14

Maintenance release: an upgrade bug fix and Moodle plugin-directory compliance.

### Added

- Privacy (GDPR) provider implementing the Moodle Privacy API.
- GitHub Actions CI (moodle-plugin-ci) and automated, cleanly-packaged releases.

### Changed

- Web service functions moved from `externallib.php` to per-function classes in `classes/external/`.
- Schema import logic extracted into a dedicated `importer` class.
- Freshly generated tokens stored via the Cache API (`MODE_SESSION`) instead of `$SESSION`.

### Fixed

- Provisioned services and tokens are no longer removed on plugin upgrade.
- Added missing language strings and replaced hard-coded user-facing text with `get_string()`.

## [1.0.0] - 2026-06-25

Initial release.

### Added

- YAML-driven provisioning: an isolated user, role, external service, capabilities, and token per schema.
- Automatic capability resolution from each function's Moodle declaration.
- Dashboard with schema listing, detail view, and in-browser YAML editor with live validation.
- Import/export of schemas as YAML or ZIP, with conflict handling.
- Bulk enable/disable, delete, and export.
- Schema versioning with history, diff, and rollback.
- Scheduled health checks with email notifications and log cleanup.
- REST API (`local_servicemanager_*`) for managing schemas programmatically.

### Security

- Tokens shown only once; service users use non-routable emails; services restricted to authorized users; least-privilege roles.

[Unreleased]: https://github.com/didactika/moodle-local_servicemanager/compare/v1.0.2...HEAD
[1.0.2]: https://github.com/didactika/moodle-local_servicemanager/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/didactika/moodle-local_servicemanager/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/didactika/moodle-local_servicemanager/releases/tag/v1.0.0
