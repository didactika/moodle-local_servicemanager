---
id: UC-002
name: updateSchema
title: Actualizar un esquema
status: draft
origin: code
sourceOfTruth: code
---

# UC-002 Actualizar un esquema — implementación

| Resumen | Requisitos | Análisis | Diseño | Implementación | Pruebas |
| --- | --- | --- | --- | --- | --- |
| [Casos de uso](../../../requirements/use-case-overview.svg) | [Requisitos](../../../requirements/use-cases/updateSchema/README.md) | [Análisis](../../../analysis/use-cases/updateSchema/README.md) | [Diseño](../../../design/use-cases/updateSchema/README.md) | **Implementación** | [Pruebas](../../../implementation/use-cases/updateSchema/README.md#pruebas) |

Diseño: [README](../../../design/use-cases/updateSchema/README.md)

## Código

| Elemento | Tipo | Ubicación | Verificado |
| --- | --- | --- | --- |
| `manager::apply_update` | servicio | `classes/schema/manager.php:310` | sí |
| `version_resolver::resolve` | servicio | `classes/schema/version_resolver.php:94` | sí |
| `provisioner::reconcile` | servicio | `classes/schema/provisioner.php:134` | sí |

## Pruebas

| Prueba | Cubre | Ubicación |
| --- | --- | --- |
| Actualizar un esquema y su versión | flujo principal, RN-004 | `tests/manager_update_test.php` |
| Cálculo de la versión | A3, RN-004 | `tests/version_resolver_test.php` |
| Resumen de lo que cambió | flujo principal | `tests/version_summary_test.php` |
