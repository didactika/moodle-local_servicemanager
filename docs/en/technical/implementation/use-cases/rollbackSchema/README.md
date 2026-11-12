---
id: UC-003
name: rollbackSchema
title: Roll back a schema
status: draft
origin: code
sourceOfTruth: code
---

# UC-003 Roll back a schema — implementation

| Overview | Requirements | Analysis | Design | Implementation | Tests |
| --- | --- | --- | --- | --- | --- |
| [Use cases](../../../requirements/use-case-overview.svg) | [Requirements](../../../requirements/use-cases/rollbackSchema/README.md) | [Analysis](../../../analysis/use-cases/rollbackSchema/README.md) | [Design](../../../design/use-cases/rollbackSchema/README.md) | **Implementation** | [Tests](../../../implementation/use-cases/rollbackSchema/README.md#tests) |

Design: [README](../../../design/use-cases/rollbackSchema/README.md)

## Code

| Element | Kind | Location | Verified |
| --- | --- | --- | --- |
| `history_manager::rollback` | service | `classes/schema/history_manager.php:129` | yes |
| `manager::apply_update` (rollback mode) | service | `classes/schema/manager.php:310` | yes |

## Tests

| Test | Covers | Location |
| --- | --- | --- |
| Rolling back and the backup | main flow, RN-006 | `tests/manager_update_test.php` |
| Actions of the schema page | main flow | `tests/external_actions_test.php` |
