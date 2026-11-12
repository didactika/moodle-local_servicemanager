---
id: RQ
status: draft
origin: code
sourceOfTruth: code
---

# Requirements catalogue

## Functional

| ID | Requirement | Priority | Origin | Use cases |
| --- | --- | --- | --- | --- |
| RF-001 | A maintainer can create a service from a schema written in a guided form or in YAML, with its user, role, external service and, if asked, token. | Must | `schema\manager::create_schema_with_token` | UC-001 |
| RF-002 | A maintainer can change a schema and the plugin brings everything it created in line, keeping each version. | Must | `schema\manager::update_schema` | UC-002 |
| RF-003 | A maintainer can return a schema to an earlier version without losing the state it leaves. | Should | `history_manager::rollback` | UC-003 |
| RF-004 | The plugin checks on a schedule that what each schema created is still there and works, and reports. | Should | `task\health_check` | UC-004 |
| RF-005 | A maintainer can enable, disable, delete, import and export schemas, alone or several at once. | Must | `external\set_enabled`, `schema\importer` | |
| RF-006 | A maintainer can compare two versions of a schema, line by line and by what changed. | Could | `schema\line_diff`, `schema\version_summary` | |
| RF-007 | The plugin offers its own web services to create and update schemas from scripts. | Could | `db/services.php` | UC-001, UC-002 |

## Non-functional

| ID | Quality attribute | Requirement | Measure | Priority |
| --- | --- | --- | --- | --- |
| RNF-001 | Security | Each consumer reaches only what its schema declares: its own user, role, service and token. | one set of resources for each schema | Must |
| RNF-002 | Integrity | Creating a service is all or nothing. | `provisioner::discard` when a part fails | Must |
| RNF-003 | Security | Changing and reading schemas needs capabilities of their own, given to managers. | `local/servicemanager:manage` and `:view` | Must |
| RNF-004 | Privacy | The plugin keeps who changed a version and implements the Privacy API. | `classes/privacy/provider.php` | Must |
| RNF-005 | Compatibility | The same behaviour on Moodle 4.0 to 5.2 and on 5.3. | two lines of the plugin | Must |

## Business rules

Rules live in the [domain model dictionary](../domain/README.md#business-rules). Rules that change behaviour are repeated here with their ID.
