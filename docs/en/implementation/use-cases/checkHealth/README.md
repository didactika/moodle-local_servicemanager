---
id: UC-004
name: checkHealth
title: Check the health of the schemas
status: draft
origin: code
sourceOfTruth: code
---

# UC-004 Check the health of the schemas — implementation

| Overview | Requirements | Analysis | Design | Implementation | Tests |
| --- | --- | --- | --- | --- | --- |
| [Use cases](../../../requirements/use-case-overview.svg) | [Requirements](../../../requirements/use-cases/checkHealth/README.md) | [Analysis](../../../analysis/use-cases/checkHealth/README.md) | [Design](../../../design/use-cases/checkHealth/README.md) | **Implementation** | [Tests](../../../implementation/use-cases/checkHealth/README.md#tests) |

Design: [README](../../../design/use-cases/checkHealth/README.md)

## Code

| Element | Kind | Location | Verified |
| --- | --- | --- | --- |
| `health_check::execute` | task | `classes/task/health_check.php:48` | yes |
| `inspector::inspect` | service | `classes/health/inspector.php:76` | yes |
| Task definitions | config | `db/tasks.php` | yes |

## Tests

| Test | Covers | Location |
| --- | --- | --- |
| Status of the checks | main flow, RN-008 | `tests/status_summary_test.php` |
| Retention of the logs | main flow | `tests/log_retention_test.php` |
| The health page | main flow | `tests/health_page_test.php` |
