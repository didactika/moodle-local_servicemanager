---
title: Solución de problemas
summary: Qué comprobar, error por error.
order: 90
---

## Los campos que sugieren al escribir fallan con «invalidrecord»

El error menciona `local_servicemanager_get_suggestions` en `external_functions`. El plugin se actualizó sin ejecutar la actualización, así que Moodle no conoce sus nuevas funciones de servicio web. Abra **Administración del sitio → Notificaciones**, o ejecute `php admin/cli/upgrade.php`.

## «Servicios web: Deshabilitados» en el panel

Los servicios web del sitio están apagados. Actívelos en **Administración del sitio → Servidor → Servicios web → Resumen**. Si el panel dice **Aviso**, están activos pero no hay ningún protocolo activo.

## El esquema se creó, con avisos

Un **Aviso** no es un error. Los habituales son una función que este Moodle no tiene (un plugin que no está instalado) y una capacidad que no conoce. El esquema funciona con lo que existe; instale el plugin y el aviso desaparece en la siguiente comprobación de salud.

## «Ya existe un esquema con el ID …» o «con el nombre …»

El ID y el nombre de un esquema son únicos. Cuando edita un esquema, su propio ID y su propio nombre no son un conflicto.

## «No se permite cambiar el ID del esquema»

El ID de un esquema no puede cambiar. Cree un esquema nuevo con el nuevo ID y elimine el antiguo.

## La versión no es la que escribí

Cuando cambia la definición de un esquema y la versión está vacía, ya se usó o es más baja que alguna que el esquema ha tenido, el plugin guarda la siguiente (el último número más 1) y lo dice en un mensaje en la parte superior de la página. No es un error: escriba usted una versión más alta si quiere una concreta. Véase [versiones y comparación](page:guides/versions-and-comparison#de-dónde-sale-el-número-de-versión).

## El token no funciona

Un token se muestra una sola vez. Si se perdió, o generó uno nuevo, el antiguo ya no funciona: pulse el icono de llave o de recarga en **Acceso y requisitos** de la página del esquema. Compruebe también que el esquema está habilitado: un esquema deshabilitado suspende su usuario.

## Una función devuelve «excepción de control de acceso»

El rol tiene solo las capacidades que necesitan las funciones. Pulse **N capacidades** en la función para verlas, y añada lo que falte en **Capacidades adicionales**. Para las funciones que asignan, anulan, cambian o ven roles, el rol necesita además la [sección `role`](page:reference/yaml#role-opcional).

## La importación no acepta un archivo

Acepta `.yaml`, `.yml` y `.zip`. Un ZIP debe tener los archivos YAML dentro, no una carpeta de ellos anidada más de una vez.
