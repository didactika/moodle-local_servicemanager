---
title: Servicios web del plugin
summary: Cree y actualice esquemas desde scripts y canalizaciones, sin la interfaz.
order: 30
---

El plugin tiene servicios web propios, para scripts y canalizaciones que crean o actualizan esquemas sin la interfaz. Están en el servicio externo `ws_servicemanager`; autorice a un usuario que tenga `local/servicemanager:manage` y llame a:

| Función | Tipo | Qué hace |
|---|---|---|
| `local_servicemanager_get_schemas` | lectura | Lista los esquemas. |
| `local_servicemanager_get_schema` | lectura | Un esquema, por ID. |
| `local_servicemanager_create_schema` | escritura | Crea un esquema a partir de YAML. |
| `local_servicemanager_update_schema` | escritura | Actualiza un esquema con YAML nuevo. |
| `local_servicemanager_delete_schema` | escritura | Elimina un esquema y lo que creó. |
| `local_servicemanager_get_version` | lectura | El YAML de una versión de un esquema. |
| `local_servicemanager_get_suggestions` | lectura | Las sugerencias de los campos del formulario guiado. |
