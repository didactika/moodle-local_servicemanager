---
id: UC-001
name: createSchema
title: Crear un esquema
status: draft
origin: code
sourceOfTruth: code
---

# UC-001 Crear un esquema — implementación

| Resumen | Requisitos | Análisis | Diseño | Implementación | Pruebas |
| --- | --- | --- | --- | --- | --- |
| [Casos de uso](../../../requirements/use-case-overview.svg) | [Requisitos](../../../requirements/use-cases/createSchema/README.md) | [Análisis](../../../analysis/use-cases/createSchema/README.md) | [Diseño](../../../design/use-cases/createSchema/README.md) | **Implementación** | [Pruebas](../../../implementation/use-cases/createSchema/README.md#pruebas) |

Diseño: [README](../../../design/use-cases/createSchema/README.md)

## Código

| Elemento | Tipo | Ubicación | Verificado |
| --- | --- | --- | --- |
| `manager::store_new_schema` | servicio | `classes/schema/manager.php:265` | sí |
| `provisioner::provision` | servicio | `classes/schema/provisioner.php:81` | sí |
| `validator::validate` | validación | `classes/schema/validator.php:53` | sí |
| Formulario guiado | formulario | `classes/form/guided_schema_form.php` | sí |

## Pruebas

| Prueba | Cubre | Ubicación |
| --- | --- | --- |
| Crear un esquema y lo que aprovisiona | flujo principal, RN-003 | `tests/manager_test.php` |
| Validación de esquemas | A1, RN-001, RN-002 | `tests/validator_test.php` |
| Formulario guiado | flujo principal | `tests/guided_schema_form_test.php` |
