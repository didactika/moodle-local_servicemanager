---
title: Importar y exportar
summary: Mueva esquemas entre sitios con archivos y paquetes comprimidos.
order: 60
---

## Importar

Desde el panel, la flecha verde (**Importar esquemas**) abre la página de importación.

![Importar](asset:import.webp)

Elija un archivo en **Archivo a importar**:

- un archivo `.yaml` o `.yml` con un esquema, o
- un `.zip` con varios (cada uno, un archivo YAML).

**Generar token automáticamente** crea un token por cada esquema que se crea. **Cuando el ID del esquema ya existe** dice qué hacer con un esquema cuyo ID ya está en el sitio:

| Opción | Qué ocurre |
|---|---|
| **Omitir (conservar el existente)** | El esquema del sitio se deja como está. |
| **Sobrescribir (reemplazar el existente)** | El esquema del sitio se actualiza con el archivo (la versión debe seguir las [reglas de las versiones](page:guides/versions-and-comparison#de-dónde-sale-el-número-de-versión)). |
| **Renombrar (añadir el sufijo .imported)** | El archivo se crea como un esquema nuevo, con `.imported` añadido a su ID. |

Cuando termina, una página le dice, esquema por esquema, qué se **creó o actualizó**, qué se **dejó como estaba** y qué **falló**, y por qué. Un esquema que falla no detiene a los demás.

## Exportar

| Dónde | Qué exporta |
|---|---|
| El icono de descarga de la página del esquema, o **Exportar** en los tres puntos de una fila | Un esquema, como un archivo YAML. |
| El icono de archivo del panel (**Exportar todo**) | Todos los esquemas, en un ZIP. |
| **Exportar** en la barra flotante | Los esquemas que eligió, en un ZIP. |

Los archivos exportados son el YAML que está guardado, así que pueden importarse en otro sitio, subirse a un repositorio o usarse para crear el mismo servicio en cada entorno.

## Archivo de ejemplo

La página de [referencia YAML](page:reference/yaml) del plugin tiene un botón **Descargar ejemplo** con un archivo que contiene todas las secciones.
