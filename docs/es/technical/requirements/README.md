---
id: REQ
status: draft
origin: code
sourceOfTruth: code
---

# Requisitos

## Índice

- [Actores](./actors.md)
- [Catálogo de requisitos](./requirements.md)

## Casos de uso

<!-- rup-flow:use-cases:start -->

| ID | Use case | Actor | Package | Requirement | Analysis | Design | Implementation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| UC-001 | [Create a schema](./use-cases/createSchema/README.md) | Maintainer | Schemas | RF-001 | [card](../analysis/use-cases/createSchema/README.md) | [card](../design/use-cases/createSchema/README.md) | [card](../implementation/use-cases/createSchema/README.md) |
| UC-002 | [Update a schema](./use-cases/updateSchema/README.md) | Maintainer | Schemas | RF-002 | [card](../analysis/use-cases/updateSchema/README.md) | [card](../design/use-cases/updateSchema/README.md) | [card](../implementation/use-cases/updateSchema/README.md) |
| UC-003 | [Roll back a schema](./use-cases/rollbackSchema/README.md) | Maintainer | Schemas | RF-003 | [card](../analysis/use-cases/rollbackSchema/README.md) | [card](../design/use-cases/rollbackSchema/README.md) | [card](../implementation/use-cases/rollbackSchema/README.md) |
| UC-004 | [Check the health of the schemas](./use-cases/checkHealth/README.md) | System | Health | RF-004 | [card](../analysis/use-cases/checkHealth/README.md) | [card](../design/use-cases/checkHealth/README.md) | [card](../implementation/use-cases/checkHealth/README.md) |

### Use-case diagram

![Use cases](./use-case-overview.svg)

### By actor

#### Maintainer

![Maintainer](./use-cases-maintainer.svg)

#### System

![System](./use-cases-system.svg)

<!-- rup-flow:use-cases:end -->

## Convenciones

- `specification.puml` es la fuente de verdad del comportamiento de un caso de uso: un diagrama de estados con la conversación Actor/Sistema.
- `wireframes.puml` es el prototipo de la interfaz, aunque tenga una sola pantalla.
- Cada carpeta de caso de uso tiene `README.md`, `specification.puml` y `wireframes.puml`.
