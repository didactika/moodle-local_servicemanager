---
id: RQ
status: draft
origin: code
sourceOfTruth: code
---

# Catálogo de requisitos

## Funcionales

| ID | Requisito | Prioridad | Origen | Casos de uso |
| --- | --- | --- | --- | --- |
| RF-001 | Un responsable puede crear un servicio a partir de un esquema escrito en un formulario guiado o en YAML, con su usuario, rol, servicio externo y, si se pide, token. | Debe | `schema\manager::create_schema_with_token` | UC-001 |
| RF-002 | Un responsable puede cambiar un esquema y el plugin pone al día todo lo que creó, conservando cada versión. | Debe | `schema\manager::update_schema` | UC-002 |
| RF-003 | Un responsable puede devolver un esquema a una versión anterior sin perder el estado que deja. | Debería | `history_manager::rollback` | UC-003 |
| RF-004 | El plugin comprueba según un calendario que lo que creó cada esquema sigue ahí y funciona, e informa. | Debería | `task\health_check` | UC-004 |
| RF-005 | Un responsable puede habilitar, deshabilitar, eliminar, importar y exportar esquemas, de uno en uno o varios a la vez. | Debe | `external\set_enabled`, `schema\importer` | |
| RF-006 | Un responsable puede comparar dos versiones de un esquema, línea a línea y por lo que cambió. | Podría | `schema\line_diff`, `schema\version_summary` | |
| RF-007 | El plugin ofrece servicios web propios para crear y actualizar esquemas desde scripts. | Podría | `db/services.php` | UC-001, UC-002 |

## No funcionales

| ID | Atributo de calidad | Requisito | Medida | Prioridad |
| --- | --- | --- | --- | --- |
| RNF-001 | Seguridad | Cada consumidor alcanza solo lo que declara su esquema: su propio usuario, rol, servicio y token. | un conjunto de recursos por esquema | Debe |
| RNF-002 | Integridad | Crear un servicio es todo o nada. | `provisioner::discard` cuando falla una parte | Debe |
| RNF-003 | Seguridad | Cambiar y leer esquemas exige capacidades propias, dadas a los gestores. | `local/servicemanager:manage` y `:view` | Debe |
| RNF-004 | Privacidad | El plugin guarda quién cambió una versión e implementa la API de privacidad. | `classes/privacy/provider.php` | Debe |
| RNF-005 | Compatibilidad | El mismo comportamiento en Moodle 4.0 a 5.2 y en 5.3. | dos líneas del plugin | Debe |

## Reglas de negocio

Las reglas viven en el [diccionario del modelo de dominio](../domain/README.md#reglas-de-negocio). Las que cambian el comportamiento se repiten aquí con su ID.
