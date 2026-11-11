---
title: La página del esquema
summary: Todo lo que un esquema es y ha creado, y su estado, en una sola página.
order: 40
---

La página de un esquema es donde ve todo lo que el esquema es y ha creado, y donde cambia su estado sin salir de ella. Se abre desde el nombre o el ojo de un esquema en el [panel](page:guides/dashboard).

![Un esquema, con sus partes numeradas](asset:schema-marked.webp)

| # | Parte | Para qué sirve |
|---|---|---|
| 1 | [Estado de los servicios web](#1-estado-de-los-servicios-web) | La misma línea que en el panel, con los botones para activar lo que está apagado. |
| 2 | [Información del esquema](#2-información-del-esquema) | La descripción, la versión, las fechas y si está habilitado. |
| 3 | [Las acciones](#3-las-acciones) | Editar, historial, exportar, deshabilitar y eliminar, como iconos redondos. |
| 4 | [Acceso y requisitos, y Rol](#4-acceso-y-requisitos) | Las listas: token, acceso a archivos, plugins, capacidades y el rol. |
| 5 | [Funciones](#5-funciones) | Lo que el servicio puede llamar. |

## 1. Estado de los servicios web

A la derecha del título, al mismo nivel que en el panel, ve si los servicios web están **Operativos**, **Deshabilitados** o con **Aviso**, cada protocolo y el botón **Activar servicios web** o **Activar un protocolo** cuando algo está apagado. Un esquema puede ser perfecto y no responder si el sitio tiene los servicios web apagados; esto se lo dice.

## 2. Información del esquema

La columna principal, a la izquierda, tiene la información del esquema, sus funciones y lo que creó. Empieza con la descripción y, en una fila, la versión, cuándo se creó y se modificó por última vez y si está habilitado (y el responsable, si el esquema lo tiene).

## 3. Las acciones

A la derecha del título de **Información del esquema** están las acciones, como iconos redondos:

| Icono | Qué hace |
|---|---|
| Lápiz | **Editar**: el [formulario](page:guides/edit-a-schema), ya relleno. |
| Reloj | **Historial de versiones**: el [historial](page:guides/versions-and-comparison). |
| Descarga | **Exportar** este esquema como un archivo YAML. |
| Interruptor | **Deshabilitar** o **Habilitar**. Un esquema deshabilitado suspende su usuario de servicio y su servicio. La página cambia donde está y lo dice con un mensaje; no se recarga. |
| Papelera | **Eliminar**: quita el esquema y todo lo que creó. Pide confirmación en una ventana. |

## 4. Acceso y requisitos

La columna de la derecha tiene el acceso y el rol: lo que son listas.

El **Token** (activo o ninguno) con un botón que crea uno, o uno nuevo. Una ventana pide confirmación, el token aparece allí mismo, pequeño, con un botón para copiarlo, y se muestra una sola vez; un token nuevo hace que el anterior deje de funcionar. Después el **Acceso a archivos** (descarga y subida), los **Plugins requeridos** (con un aviso para el que no está instalado) y las **Capacidades adicionales**, como etiquetas. Cuando hay más de ocho, se muestran las primeras y un botón `+N` abre todas en una ventana con desplazamiento y búsqueda.

### Rol

Cuando el esquema dice lo que puede hacer el rol, una tarjeta lista, cada cosa en su propio bloque con cuántas hay, dónde puede asignarse el rol y qué roles puede asignar, anular, cambiar y ver, y de qué capacidades se le priva o se le prohíben. Una lista larga muestra las primeras etiquetas y un botón `+N` que abre todas.

![Un esquema con un rol](asset:schema-role.webp)

## 5. Funciones

Cada función tiene un icono (una pluma para las que escriben, un ojo para las que leen), su nombre, **Lectura** o **Escritura**, **Crítica** si el esquema la necesita, lo que Moodle dice que hace, y una insignia si este Moodle no la tiene. Con ocho funciones o más, aparece un cuadro de búsqueda sobre la lista.

Pulse **N capacidades** para ver, en una ventana, las capacidades que debe tener quien llame a la función. La ventana tiene un título fijo y un pie fijo, y la lista se desplaza entre ambos.

![Las capacidades de una función](asset:schema-capabilities.webp)

## Recursos aprovisionados

A la izquierda, bajo las funciones: el **usuario del servicio**, el **rol del servicio** y el **servicio externo**, cada uno con un enlace a su página en Moodle, su nombre y su identificador. Los identificadores (en todo el plugin) se muestran en una etiqueta pequeña con un icono de huella.

## Comprobación de salud

El registro de las comprobaciones de salud programadas (véase [permisos, ajustes y comprobación de salud](page:reference/settings)), que puede filtrar por estado.

## Ventanas

Las preguntas (eliminar, crear un token, deshacer) y las listas largas se abren en una ventana sobre la página. Se cierra con la cruz redonda de arriba a la derecha, con su botón o con **Esc**. Su título y sus botones se quedan en su sitio, y lo que hay entre ellos se desplaza. Una pregunta nombra de qué trata y su botón principal dice lo que hará.
