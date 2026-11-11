---
title: Permisos, ajustes y comprobación de salud
summary: Quién puede ver y cambiar esquemas, cada ajuste y las comprobaciones programadas.
order: 20
---

## Permisos

| Capacidad | Quién la tiene por defecto | Qué permite |
|---|---|---|
| `local/servicemanager:view` | Gestores | Ver el panel, los esquemas, su historial y la comparación. |
| `local/servicemanager:manage` | Gestores | Crear, editar, habilitar, deshabilitar, eliminar e importar esquemas, crear tokens y deshacer versiones. |

Los botones que cambian algo no aparecen para quien solo puede ver.

## Ajustes

Están en **Administración del sitio → Servidor → Web Service Manager → Ajustes**.

| Ajuste | Qué hace |
|---|---|
| **Correos de notificación** | Direcciones (separadas por comas) que reciben el informe de la comprobación de salud. |
| **Notificar también a los administradores del sitio** | Lo envía también a los administradores. |
| **Nivel de notificación** | El estado menos grave que envía una notificación: todos, aviso o crítico. |
| **Habilitar la comprobación de salud** | Ejecuta la comprobación de salud programada de los esquemas. |
| **Habilitar la limpieza** y **Retención de registros (días)** | Eliminan los registros de las comprobaciones de salud más antiguos que los días indicados (30 por defecto). |
| **Habilitar la retención de versiones** y **Máximo de versiones por esquema** | Conservan solo las últimas versiones de cada esquema en el historial, eliminando primero las más antiguas. |

## La comprobación de salud

Una tarea programada recorre todos los esquemas y comprueba que lo que aprovisionaron sigue ahí y funciona: las funciones (y si este Moodle sigue teniéndolas), el usuario del servicio, el servicio y el token. Cada esquema queda como **Correcto**, **Con avisos** (falta algo que no es crítico) o **Crítico** (falta algo que necesita), y el resultado se escribe en el registro de su página. Las tareas del plugin (la comprobación de salud, la validación, la limpieza de registros y la limpieza de versiones) están en **Administración del sitio → Servidor → Tareas programadas**.
