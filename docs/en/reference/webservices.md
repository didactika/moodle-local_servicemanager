---
title: Web services of the plugin
summary: Create and update schemas from scripts and pipelines, without the interface.
order: 30
---

The plugin has web services of its own, for scripts and pipelines that create or update schemas without the interface. They are in
the external service `ws_servicemanager`; authorise a user that has `local/servicemanager:manage` and call:

| Function | Type | What it does |
|---|---|---|
| `local_servicemanager_get_schemas` | read | List the schemas. |
| `local_servicemanager_get_schema` | read | One schema, by ID. |
| `local_servicemanager_create_schema` | write | Create a schema from YAML. |
| `local_servicemanager_update_schema` | write | Update a schema with new YAML. |
| `local_servicemanager_delete_schema` | write | Delete a schema and what it created. |
| `local_servicemanager_get_version` | read | The YAML of one version of a schema. |
| `local_servicemanager_get_suggestions` | read | The suggestions of the fields of the guided form. |
