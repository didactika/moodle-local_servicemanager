# Changelog

All notable changes to the Web Service Manager plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.3] - 2026-10-05

### Changed

- Declared Moodle 5.3 support.
- File access badges on the schema requirements card now show a tooltip stating whether file download/upload is enabled or disabled, instead of relying on colour alone.

### Fixed

- Use `\core\user::create_user()` on Moodle 5.3+ instead of the deprecated `user_create_user()` (MDL-82650), falling back on older versions.
- The fallback YAML parser (used when the PHP yaml extension is missing) now rejects inconsistently indented lines with an error naming the line, as the extension does, instead of silently dropping or moving them. A mis-indented list such as `extra_capabilities` or `additional_users` can no longer be saved with its items lost. Schemas already stored with such indentation are still read as before, so they can be viewed, health-checked and replaced with corrected YAML.
- Removed an `extra_capabilities` mis-indentation warning, which wrongly flagged an empty `extra_capabilities:` key and marked the schema as `warning`. Both parsers now reject the mis-indentation it guarded against.

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

[Unreleased]: https://github.com/didactika/moodle-local_servicemanager/compare/v1.0.3...HEAD
[1.0.3]: https://github.com/didactika/moodle-local_servicemanager/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/didactika/moodle-local_servicemanager/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/didactika/moodle-local_servicemanager/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/didactika/moodle-local_servicemanager/releases/tag/v1.0.0
