---
id: UC-005
name: turnWebServices
title: Turn the web services and their protocols on or off
actor: Administrator
package: Administration
status: draft
origin: code
sourceOfTruth: code
requirement: RF-008
includes:
extends:
---

# UC-005 Turn the web services and their protocols on or off

| Overview | Requirements | Analysis | Design | Implementation | Tests |
| --- | --- | --- | --- | --- | --- |
| [Use cases](../../../requirements/use-case-overview.svg) | [Requirements](../../../requirements/use-cases/turnWebServices/README.md) | [Analysis](../../../analysis/use-cases/turnWebServices/README.md) | [Design](../../../design/use-cases/turnWebServices/README.md) | **Implementation** | [Tests](../../../implementation/use-cases/turnWebServices/README.md#tests) |

## Code

| Element | Kind | Location | Verified |
| --- | --- | --- | --- |
| Web services page | page | `pages/web_services.php` | yes |
| State of the web services | view model | `classes/output/ws_status.php` | yes |
| Summary of the dashboard | template / component | `templates/dashboard.mustache`, `js/esm/src/components/dashboard/Summary.tsx` | yes |

## Tests

| Test | Covers | Location |
| --- | --- | --- |
| The web services and their protocols are turned on and off from the dashboard | main flow, A1 | `tests/behat/dashboard.feature` |
| State of the web services | the state shown | `tests/ws_status_test.php` |
