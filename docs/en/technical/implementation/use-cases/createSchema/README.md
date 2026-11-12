---
id: UC-001
name: createSchema
title: Create a schema
status: draft
origin: code
sourceOfTruth: code
---

# UC-001 Create a schema — implementation

| Overview | Requirements | Analysis | Design | Implementation | Tests |
| --- | --- | --- | --- | --- | --- |
| [Use cases](../../../requirements/use-case-overview.svg) | [Requirements](../../../requirements/use-cases/createSchema/README.md) | [Analysis](../../../analysis/use-cases/createSchema/README.md) | [Design](../../../design/use-cases/createSchema/README.md) | **Implementation** | [Tests](../../../implementation/use-cases/createSchema/README.md#tests) |

Design: [README](../../../design/use-cases/createSchema/README.md)

## Code

| Element | Kind | Location | Verified |
| --- | --- | --- | --- |
| `manager::store_new_schema` | service | `classes/schema/manager.php:265` | yes |
| `provisioner::provision` | service | `classes/schema/provisioner.php:81` | yes |
| `validator::validate` | validation | `classes/schema/validator.php:53` | yes |
| Guided form | form | `classes/form/guided_schema_form.php` | yes |

## Tests

| Test | Covers | Location |
| --- | --- | --- |
| Creating a schema and what it provisions | main flow, RN-003 | `tests/manager_test.php` |
| Validation of schemas | A1, RN-001, RN-002 | `tests/validator_test.php` |
| Guided form | main flow | `tests/guided_schema_form_test.php` |
