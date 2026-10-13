# Changelog

All notable changes to the Web Service Manager plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0-m503] - 2026-10-14

The release is named after the delivery and the line (`-m` and the lowest Moodle version), and the version of the line is the date it was created and a counter.

First release of the Moodle 5.3 line, on `main`. The Moodle 4.0 to 5.2 line is on `MOODLE_400_STABLE` (2.0.0-m400).

### Added

- Guided form to create a schema, next to the YAML editor, with suggestions as you type (at least ten) for functions, plugins, users and capabilities.
- `role` section in the schema: where the role can be assigned, capabilities that are prevented or prohibited, and the roles it may assign, override, switch to and see. The role-allow matrices that `moodle/role:assign`, `review`, `override` and `switch` need are filled from it.
- Health summary on the dashboard (healthy, warning, critical) and the state of each web service protocol.
- Floating bar for bulk actions, a Documentation menu (reference of the format, this plugin's wiki and Moodle's documentation) and history one click away from each schema.
- Comparator with side by side and unified views, a summary of the changes and the YAML of each version loaded on demand.
- Moodle web service functions `local_servicemanager_get_version` and `local_servicemanager_get_suggestions`.
- The version of a schema is optional. A schema without one starts at 1.0.0; when the version that comes with a change was used already, or is lower than the ones the schema has had, the plugin saves the next one (the last number plus one) and says so, so a change is never refused for not raising the version.
- The page of a schema shows the state of the web services and the protocols, with the buttons to turn them on, as the dashboard does.

### Changed

- The mess detector of the pipeline reports nothing: the long methods of the form, of the YAML builder, of the parser and of the pages are split into methods that do one thing, what each section of a schema says is read by `schema_extractor`, the checks of the role by `role_section_validator`, the values of a YAML entry by `yaml_scalar`, and the listing with pagination that no page used any more is gone.
- Moodle Marketplace review: the nested element selectors and the classes of Moodle inside the styles are written with an explicit parent (`& .btn`), the email of the health report carries its styles on its elements and not in a `<style>` block, and the places that read the database inside a loop (the cleanup of old versions, the recipients of the notification, the users that a schema authorises, the capabilities of the functions and the schemas of an import) read it once.
- The source of every component carries the Moodle banner in the first comment, so the built files have it.
- Rolling back to a version asks in a window and changes the history where it is, without leaving the page, through the new function `local_servicemanager_rollback_schema`. A row that cannot be rolled back keeps the place of its button, so the buttons of the same kind are always in the same place.
- The comparison goes through its changes from a bar at the bottom with the arrows, which change it is and where; what changed is a card that folds, with each change as a small label.
- The search box and the button of the filters are pills; the search has one cross, not two.

- The history of a schema has compact rows, icon actions and a floating bar that appears only when a version is chosen to compare; the filters button and the search box take the same colour when they are on.
- The interface is written in React and TypeScript (ESM) and follows the colour modes of Moodle; colours come from Bootstrap variables, so themes can override them.
- Search filters as you type and the filters are asked for once.
- Errors and notifications are shown as dismissible messages next to what failed.
- Requires Moodle 5.3.

### Removed

- The classic AMD and Mustache interface on `main`; it continues on `MOODLE_400_STABLE`.

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
