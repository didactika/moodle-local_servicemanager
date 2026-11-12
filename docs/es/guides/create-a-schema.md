---
title: Crear un esquema
summary: El formulario guiado con sugerencias mientras escribe, y el editor YAML.
order: 20
---

**Nuevo esquema** tiene dos pestañas: un **Formulario guiado**, que pregunta cada cosa por turno, y un **Editor YAML**, donde escribe o pega el archivo. Ambos terminan en el mismo YAML y pasan por las mismas comprobaciones.

## El formulario guiado

![El formulario guiado](asset:create-guided.webp)

| Sección | Qué se completa |
|---|---|
| **Identidad** | **ID del esquema** (letras, números y puntos, no cambia después), **Nombre** (único), **Versión** (opcional: si está vacía el esquema empieza en 1.0.0), **Responsable** y **Descripción**. |
| **Funciones** | Las **funciones requeridas** bloquean la creación si este Moodle no las tiene; las **funciones opcionales** solo avisan. |
| **Acceso y requisitos** | **Capacidades adicionales**, **Usuarios adicionales**, **Plugins requeridos** y si el servicio puede descargar o subir archivos. |
| **Rol** | Dónde puede asignarse el rol y qué otros roles puede asignar, anular, cambiar y ver. Véase [la sección del rol](page:reference/yaml#role-opcional). |
| **Token** | **Generar token automáticamente** crea un token para el usuario del servicio y lo muestra una vez. |

### Sugerencias mientras escribe

Los campos de funciones, capacidades, plugins y usuarios buscan mientras escribe y muestran al menos diez coincidencias (más si las hay). Elija una con el ratón o con **Intro**. Un campo que admite texto libre, como las capacidades adicionales, también acepta lo que escriba aunque no esté en la lista: una capacidad de un plugin que aún no está instalado es solo un aviso.

### Revisar como YAML

**Revisar como YAML** lleva lo que ha completado al editor YAML, para que pueda añadir lo que el formulario no pregunta y seguir trabajando allí.

## El editor YAML

Escriba o pegue el YAML en **Contenido YAML**. La [referencia YAML](page:reference/yaml) describe cada campo. La página le dice qué está mal en el campo que lo tiene, antes de que se cree nada.

![El editor YAML](asset:create-yaml.webp)

## Qué ocurre al crearlo

El plugin crea el usuario del servicio, el rol con las capacidades que necesitan las funciones, el servicio externo con esas funciones y, si lo pidió, el token. Después abre la página del esquema. Un esquema que tiene avisos, por ejemplo una función que este Moodle no tiene, se crea y la página se lo dice.
