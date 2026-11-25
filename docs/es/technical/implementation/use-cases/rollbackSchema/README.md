---
id: UC-003
name: rollbackSchema
title: Deshacer hasta una versión
status: draft
origin: code
sourceOfTruth: code
---

# UC-003 Deshacer hasta una versión — implementación

| Resumen | Requisitos | Análisis | Diseño | Implementación | Pruebas |
| --- | --- | --- | --- | --- | --- |
| [Casos de uso](../../../requirements/use-case-overview.svg) | [Requisitos](../../../requirements/use-cases/rollbackSchema/README.md) | [Análisis](../../../analysis/use-cases/rollbackSchema/README.md) | [Diseño](../../../design/use-cases/rollbackSchema/README.md) | **Implementación** | [Pruebas](../../../implementation/use-cases/rollbackSchema/README.md#pruebas) |

Diseño: [README](../../../design/use-cases/rollbackSchema/README.md)

## Código

| Elemento | Tipo | Ubicación | Verificado |
| --- | --- | --- | --- |
| `history_manager::rollback` | servicio | `classes/schema/history_manager.php:129` | sí |
| `manager::apply_update` (modo retroceso) | servicio | `classes/schema/manager.php:310` | sí |

## Pruebas

| Prueba | Cubre | Ubicación |
| --- | --- | --- |
| Deshacer y la copia de seguridad | flujo principal, RN-006 | `tests/manager_update_test.php` |
| Acciones de la página del esquema | flujo principal | `tests/external_actions_test.php` |
