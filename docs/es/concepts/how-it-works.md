---
title: Cómo un esquema se convierte en un servicio
summary: Qué es un esquema, qué crea el plugin a partir de él y cómo mantiene ambos al día.
order: 10
---

## Un esquema es una sala cerrada

Un esquema es un archivo YAML que dice lo que necesita un consumidor de su Moodle: las funciones que llama, las capacidades adicionales que requiere y, si lo desea, lo que puede hacer su rol. Por cada esquema el plugin crea, y mantiene al día:

| Qué | Para qué existe |
|---|---|
| Un **usuario de servicio** | La identidad con la que el consumidor llama a Moodle. |
| Un **rol** | Solo tiene las capacidades que necesitan las funciones, más las que usted añada. |
| Un **servicio externo** | La lista de funciones que el consumidor puede llamar. |
| Un **token** | Lo que el consumidor envía en cada llamada. Se muestra una sola vez, cuando se crea. |

Cada esquema tiene su propio usuario, rol, servicio y token, así que un token filtrado o un consumidor que se comporta mal solo alcanza lo que su esquema declara.

## Lo que usted escribe y lo que el plugin calcula

Usted lista las funciones. Nunca lista las capacidades que necesita cada función: el plugin las lee de las declaraciones de las funciones de servicio web de Moodle y se las da al rol. Las capacidades que las funciones no implican van en `extra_capabilities`, y la sección `role` dice dónde puede asignarse el rol y qué roles puede asignar, anular, cambiar y ver. [La referencia YAML](page:reference/yaml) describe cada campo.

## La vida de un esquema

| Paso | Qué hace el plugin |
|---|---|
| **Crear** | Crea el usuario, el rol, el servicio y, si lo pide, el token. Una función que falta bloquea la creación si es crítica y solo avisa si no lo es. |
| **Editar** | Pone todo al día con el nuevo YAML: lo que añadió se crea y lo que quitó se retira. Un cambio de la definición guarda una nueva [versión](page:guides/versions-and-comparison). |
| **Deshabilitar** | Suspende el usuario del servicio y el servicio. No se elimina nada. |
| **Habilitar** | Los devuelve. |
| **Deshacer** | Devuelve el esquema a una versión anterior, después de conservar el estado que deja. |
| **Eliminar** | Elimina el esquema y todo lo que creó: el usuario, el rol, el servicio y el token. |

## Sigue vigilando

Una tarea programada comprueba cada esquema y lo deja **Correcto**, **Con avisos** o **Crítico**: si lo que creó sigue ahí y funciona, y si este Moodle sigue teniendo las funciones. El resultado se escribe en el registro de la página del esquema y, si lo configura, se envía por correo. Véase [permisos, ajustes y comprobación de salud](page:reference/settings).

## Los nombres de lo que se crea

El usuario, el rol y el servicio toman su nombre del ID y del nombre del esquema, así que ambos deben ser únicos. Los patrones están en la [referencia YAML](page:reference/yaml#convenciones-de-nombres).
