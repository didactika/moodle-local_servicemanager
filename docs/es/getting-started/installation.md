---
title: Instalación
summary: Requisitos, cómo instalar el plugin, cómo actualizarlo y cómo quitarlo.
order: 10
---

## Requisitos

| Moodle | Rama | Releases |
|---|---|---|
| 4.0 a 5.2 | `MOODLE_400_STABLE` | `X.Y.Z-m400` |
| 5.3 | `main` | `X.Y.Z-m503` |

Ambas líneas se ven igual y hacen lo mismo. La línea 5.3 sigue los modos de color de Moodle, también el oscuro.

## Instalar

Descargue el ZIP de la release que corresponde a su Moodle, vaya a **Administración del sitio > Extensiones > Instalar plugins**, suba el archivo y siga las indicaciones. El plugin también puede instalarse desde el directorio de plugins de Moodle.

Para instalarlo desde Git, coloque el plugin en `local/servicemanager` (en `public/local/servicemanager` en Moodle 5.3, que sirve su código desde la carpeta `public`) y ejecute:

```bash
php admin/cli/upgrade.php
```

## Quién puede usarlo

| Capacidad | Quién la tiene por defecto | Qué permite |
|---|---|---|
| `local/servicemanager:view` | Gestores | Ver el panel, los esquemas, su historial y la comparación. |
| `local/servicemanager:manage` | Gestores | Crear, editar, habilitar, deshabilitar, eliminar e importar esquemas, crear tokens y deshacer versiones. |

El siguiente paso es el [inicio rápido](page:getting-started/quick-start).

## Actualizar

Después de actualizar el código, abra **Administración del sitio > Notificaciones** (o ejecute `php admin/cli/upgrade.php`). Moodle registra las funciones de servicio web del plugin cuando cambia su versión, así que omitir la actualización hace que fallen los campos que sugieren mientras se escribe.

## Desinstalar

Al desinstalar el plugin se eliminan antes todos los esquemas y, con cada uno, su usuario de servicio, su rol, su servicio y su token.
