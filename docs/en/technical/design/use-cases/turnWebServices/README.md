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
| [Use cases](../../../requirements/use-case-overview.svg) | [Requirements](../../../requirements/use-cases/turnWebServices/README.md) | [Analysis](../../../analysis/use-cases/turnWebServices/README.md) | **Design** | [Implementation](../../../implementation/use-cases/turnWebServices/README.md) | [Tests](../../../implementation/use-cases/turnWebServices/README.md#tests) |

## Elements

| Design element | Kind | Code target |
| --- | --- | --- |
| `pages/web_services.php` | page | `pages/web_services.php` |
| `admin_write_settings` | service of Moodle | `lib/adminlib.php` |
| `webservice::enable_plugin` | service of Moodle | `lib/classes/plugininfo/webservice.php` |
| `ws_status::describe` | view model | `classes/output/ws_status.php` |

## Sequence

![Sequence](./sequence.svg)

## Contracts

| Operation | Input | Output | Errors |
| --- | --- | --- | --- |
| POST `pages/web_services.php` | `sesskey`, `enable`, optional `protocol` and `returnurl` | the page asked for, with a message | no capability, a wrong session key, a protocol that is not installed |

## Data touched

| Table or entity | Operation |
| --- | --- |
| `config` (`enablewebservices`, `webserviceprotocols`) | update |
| `config_log` | insert |
