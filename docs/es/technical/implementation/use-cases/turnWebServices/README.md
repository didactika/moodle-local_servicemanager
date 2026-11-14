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
| Página de servicios web | página | `pages/web_services.php` | sí |
| Estado de los servicios web | modelo de vista | `classes/output/ws_status.php` | sí |
| Resumen del panel | plantilla / componente | `templates/dashboard.mustache`, `js/esm/src/components/dashboard/Summary.tsx` | sí |

## Pruebas

| Prueba | Cubre | Ubicación |
| --- | --- | --- |
| Los servicios web y sus protocolos se activan y desactivan desde el panel | flujo principal, A1 | `tests/behat/dashboard.feature` |
| Estado de los servicios web | el estado mostrado | `tests/ws_status_test.php` |
