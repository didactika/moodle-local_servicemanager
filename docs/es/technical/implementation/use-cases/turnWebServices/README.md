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
| [Casos de uso](../../../requirements/use-case-overview.svg) | [Requisitos](../../../requirements/use-cases/turnWebServices/README.md) | [Análisis](../../../analysis/use-cases/turnWebServices/README.md) | [Diseño](../../../design/use-cases/turnWebServices/README.md) | **Implementación** | [Pruebas](../../../implementation/use-cases/turnWebServices/README.md#tests) |

## Código

| Elemento | Tipo | Ubicación | Verificado |
| --- | --- | --- | --- |
| Servicio web que los activa o desactiva | función externa | `classes/external/set_web_services.php` | sí |
| El cambio, como lo escribe la administración | servicio | `classes/local/web_services.php` | sí |
| Página de servicios web, para un navegador sin script | página | `pages/web_services.php` | sí |
| Estado de los servicios web | modelo de vista | `classes/output/ws_status.php` | sí |
| Resumen del panel | plantilla / componente | `templates/ws_status.mustache`, `amd/src/dashboard.js`, `js/esm/src/components/dashboard/Summary.tsx` | sí |

## Pruebas

| Prueba | Cubre | Ubicación |
| --- | --- | --- |
| Los servicios web y sus protocolos se activan y desactivan desde el panel | flujo principal, A1 | `tests/behat/dashboard.feature` |
| Estado de los servicios web | el estado mostrado | `tests/ws_status_test.php` |
