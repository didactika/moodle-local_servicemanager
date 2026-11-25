---
id: ACT
status: draft
origin: code
sourceOfTruth: code
---

# Actors

| Actor | Type | Goal | Use cases |
| --- | --- | --- | --- |
| Maintainer | Primary | Describe the services the site gives and keep them in line. Holds `local/servicemanager:manage` to change schemas and `local/servicemanager:view` to read them. | [UC-001](./use-cases/createSchema/README.md), [UC-002](./use-cases/updateSchema/README.md), [UC-003](./use-cases/rollbackSchema/README.md) |
| Moodle scheduler | System | Run the health check, the cleaning of logs and the cleaning of versions on their schedule. | [UC-004](./use-cases/checkHealth/README.md) |
| Moodle | Secondary | Provides users, roles, external services, tokens, scheduled tasks and messaging. | all |
