---
title: Editar un esquema
summary: Cambie un esquema con el mismo formulario, y cómo sigue la versión.
order: 30
---

Pulse el lápiz de un esquema, en el panel o en su página. Se abre **el mismo formulario que crea un esquema, ya relleno**, con las dos pestañas: el formulario guiado y el editor YAML.

![Editar un esquema](asset:edit-guided.webp)

## Qué es diferente de crear

- El **ID del esquema** se muestra pero no se puede cambiar. Para usar otro ID, cree un esquema nuevo.
- No hay opción de token. El token se gestiona en la [página del esquema](page:guides/schema-page).
- El botón dice **Guardar cambios**, y **Cancelar** vuelve al esquema.

## Qué hace guardar

El plugin pone al día el usuario del servicio, el rol, el servicio y sus funciones con lo que escribió: lo que añadió se crea y lo que quitó se retira, incluido lo que el rol podía asignar, anular, cambiar y ver.

## La versión

Puede dejar la **Versión** vacía. Si cambia la **definición** (las funciones, las capacidades, los plugins, el acceso a archivos o el rol), el plugin guarda la siguiente versión por sí mismo: la más alta que ha tenido el esquema, sumando 1 al último número, y la página dice cuál usó. Si escribe una más alta, se conserva. Cambiar solo el nombre, el responsable o la descripción no cambia la versión. Cada versión nueva se conserva en el [historial](page:guides/versions-and-comparison), donde las reglas están en una tabla.

## Enlaces antiguos

`edit.php?id=…` sigue funcionando: abre este formulario.
