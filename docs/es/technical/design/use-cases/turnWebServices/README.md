---
id: UC-005
name: turnWebServices
title: Activar o desactivar los servicios web y sus protocolos
actor: Administrator
package: Administration
status: draft
origin: code
sourceOfTruth: code
requirement: RF-008
includes:
extends:
---

# UC-005 Activar o desactivar los servicios web y sus protocolos

| Vista general | Requisitos | Análisis | Diseño | Implementación | Pruebas |
| --- | --- | --- | --- | --- | --- |
| [Casos de uso](../../../requirements/use-case-overview.svg) | [Requisitos](../../../requirements/use-cases/turnWebServices/README.md) | [Análisis](../../../analysis/use-cases/turnWebServices/README.md) | **Diseño** | [Implementación](../../../implementation/use-cases/turnWebServices/README.md) | [Pruebas](../../../implementation/use-cases/turnWebServices/README.md#tests) |

## Elementos

| Elemento de diseño | Tipo | Destino en el código |
| --- | --- | --- |
| `set_web_services` | servicio web (AJAX) | `classes/external/set_web_services.php` |
| `web_services::apply` | servicio | `classes/local/web_services.php` |
| `pages/web_services.php` | página, para un navegador sin script | `pages/web_services.php` |
| `admin_write_settings` | servicio de Moodle | `lib/adminlib.php` |
| `webservice::enable_plugin` | servicio de Moodle | `lib/classes/plugininfo/webservice.php` |
| `ws_status::describe` | modelo de vista | `classes/output/ws_status.php` |

## Secuencia

![Secuencia](./sequence.svg)

## Contratos

| Operación | Entrada | Salida | Errores |
| --- | --- | --- | --- |
| `local_servicemanager_set_web_services` | `enable` y `protocol` opcional (y `returnurl` en Moodle 4.x) | un mensaje y el estado nuevo (la franja dibujada de nuevo en Moodle 4.x) | sin capacidad, un protocolo que no está instalado |
| POST `pages/web_services.php` | `sesskey`, `enable`, `protocol` y `returnurl` opcionales | la página pedida, con un mensaje | sin capacidad, una clave de sesión errónea, un protocolo que no está instalado |

## Datos afectados

| Tabla o entidad | Operación |
| --- | --- |
| `config` (`enablewebservices`, `webserviceprotocols`) | actualización |
| `config_log` | inserción |
