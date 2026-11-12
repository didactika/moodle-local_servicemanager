---
title: Inicio rápido
summary: Active los servicios web y cree un servicio con su propio usuario, rol y token en cinco minutos.
order: 20
---

## Antes de empezar

1. En **Administración del sitio → Servidor → Servicios web → Resumen**, active los servicios web y active un protocolo (REST es el habitual). El panel muestra el estado de los servicios del sitio, y de cada protocolo, junto a su título, de modo que puede comprobarlo allí.
2. Su cuenta necesita la capacidad `local/servicemanager:manage` (un administrador la tiene) para crear esquemas, y `local/servicemanager:view` para verlos.

## Cree el esquema

1. Abra **Administración del sitio → Servidor → Web Service Manager → Panel**.
2. Pulse el **+** azul redondo (**Nuevo esquema**).
3. En **Formulario guiado**, complete:
   - **ID del esquema**: un nombre corto que no cambia, como `crm.sync`.
   - **Nombre**, y la **Versión** si desea una (si se deja vacía es 1.0.0 y el plugin la sube por usted más adelante).
   - **Funciones requeridas**: empiece a escribir, por ejemplo `core_user`, y elija entre las sugerencias.
4. Deje activada la opción **Generar token automáticamente** y pulse **Crear esquema**.

![El formulario guiado](asset:create-guided.webp)

## Copie el token

Se abre la página del esquema con un recuadro verde que contiene el token. **Cópielo ahora: se muestra una sola vez.** Si lo pierde, la [página del esquema](page:guides/schema-page) tiene un botón con una llave que crea uno nuevo: pide confirmación en una ventana y muestra allí mismo el nuevo token, pequeño y con un botón para copiarlo.

## Qué se creó

En la página del esquema, **Recursos aprovisionados** lista el usuario del servicio, el rol y el servicio externo, con un enlace a cada uno. El rol tiene solo las capacidades que necesitan las funciones que eligió. Llame al servicio con el token:

```bash
curl "https://su.moodle/webservice/rest/server.php" \
  -d wstoken=SU_TOKEN -d wsfunction=core_webservice_get_site_info -d moodlewsrestformat=json
```
