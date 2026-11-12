---
id: UC-002
name: updateSchema
title: Update a schema
status: draft
origin: code
sourceOfTruth: code
---

# UC-002 Update a schema — implementation

| Overview | Requirements | Analysis | Design | Implementation | Tests |
| --- | --- | --- | --- | --- | --- |
| [Use cases](../../../requirements/use-case-overview.svg) | [Requirements](../../../requirements/use-cases/updateSchema/README.md) | [Analysis](../../../analysis/use-cases/updateSchema/README.md) | [Design](../../../design/use-cases/updateSchema/README.md) | **Implementation** | [Tests](../../../implementation/use-cases/updateSchema/README.md#tests) |

Design: [README](../../../design/use-cases/updateSchema/README.md)

## Code

| Element | Kind | Location | Verified |
| --- | --- | --- | --- |
| `manager::apply_update` | service | `classes/schema/manager.php:310` | yes |
| `version_resolver::resolve` | service | `classes/schema/version_resolver.php:94` | yes |
| `provisioner::reconcile` | service | `classes/schema/provisioner.php:134` | yes |

## Tests

| Test | Covers | Location |
| --- | --- | --- |
| Updating a schema and its version | main flow, RN-004 | `tests/manager_update_test.php` |
| Resolving the version | A3, RN-004 | `tests/version_resolver_test.php` |
| Summary of what changed | main flow | `tests/version_summary_test.php` |
