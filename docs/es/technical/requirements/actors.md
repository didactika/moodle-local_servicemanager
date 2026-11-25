---
id: ACT
status: draft
origin: code
sourceOfTruth: code
---

# Actores

| Actor | Tipo | Objetivo | Casos de uso |
| --- | --- | --- | --- |
| Responsable | Primario | Describir los servicios que da el sitio y mantenerlos al día. Tiene `local/servicemanager:manage` para cambiar esquemas y `local/servicemanager:view` para leerlos. | [UC-001](./use-cases/createSchema/README.md), [UC-002](./use-cases/updateSchema/README.md), [UC-003](./use-cases/rollbackSchema/README.md) |
| Planificador de Moodle | Sistema | Ejecutar la comprobación de salud, la limpieza de registros y la limpieza de versiones según su calendario. | [UC-004](./use-cases/checkHealth/README.md) |
| Moodle | Secundario | Aporta usuarios, roles, servicios externos, tokens, tareas programadas y mensajería. | todos |
