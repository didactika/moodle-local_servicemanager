---
id: UC-004
name: checkHealth
title: Comprobar la salud de los esquemas
status: draft
origin: code
sourceOfTruth: code
---

# UC-004 Comprobar la salud de los esquemas — implementación

| Resumen | Requisitos | Análisis | Diseño | Implementación | Pruebas |
| --- | --- | --- | --- | --- | --- |
| [Casos de uso](../../../requirements/use-case-overview.svg) | [Requisitos](../../../requirements/use-cases/checkHealth/README.md) | [Análisis](../../../analysis/use-cases/checkHealth/README.md) | [Diseño](../../../design/use-cases/checkHealth/README.md) | **Implementación** | [Pruebas](../../../implementation/use-cases/checkHealth/README.md#pruebas) |

Diseño: [README](../../../design/use-cases/checkHealth/README.md)

## Código

| Elemento | Tipo | Ubicación | Verificado |
| --- | --- | --- | --- |
| `health_check::execute` | tarea | `classes/task/health_check.php:48` | sí |
| `inspector::inspect` | servicio | `classes/health/inspector.php:76` | sí |
| Definición de tareas | configuración | `db/tasks.php` | sí |

## Pruebas

| Prueba | Cubre | Ubicación |
| --- | --- | --- |
| Estado de las comprobaciones | flujo principal, RN-008 | `tests/status_summary_test.php` |
| Retención de los registros | flujo principal | `tests/log_retention_test.php` |
| La página de salud | flujo principal | `tests/health_page_test.php` |
