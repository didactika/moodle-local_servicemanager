---
id: MAP
status: draft
origin: code
sourceOfTruth: code
---

# Code map

| Model element | Kind | Code location | Verified |
| --- | --- | --- | --- |
| Schema, SchemaVersion, HealthLog | tables | `db/install.xml` | yes |
| Creation, update, deletion of a schema | methods | `classes/schema/manager.php` | yes |
| Validation of a schema | class | `classes/schema/validator.php` | yes |
| Role section | class | `classes/schema/role_section_validator.php` | yes |
| Version of a change | classes | `classes/schema/version_resolver.php`, `classes/schema/version_policy.php` | yes |
| ServiceUser | class | `classes/automation/user_manager.php` | yes |
| ServiceRole, Capability, RoleSettings | classes | `classes/automation/role_manager.php`, `classes/automation/role_settings.php` | yes |
| ExternalService, WebServiceFunction | class | `classes/automation/service_manager.php` | yes |
| Token | class | `classes/automation/token_manager.php` | yes |
| Derived capabilities | class | `classes/automation/capability_calculator.php` | yes |
| Provisioning | class | `classes/schema/provisioner.php` | yes |
| History, rollback, comparison | classes | `classes/schema/history_manager.php`, `classes/schema/line_diff.php`, `classes/schema/version_summary.php` | yes |
| Import and export | class | `classes/schema/importer.php` | yes |
| Health check | classes | `classes/health/inspector.php`, `classes/task/health_check.php` | yes |
| Notification of the report | class | `classes/notification/manager.php` | yes |
| Capabilities of the plugin | file | `db/access.php` | yes |
| Web services | file | `db/services.php` | yes |
| Scheduled tasks | file | `db/tasks.php` | yes |
| Privacy | class | `classes/privacy/provider.php` | yes |
