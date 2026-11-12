---
title: Referencia YAML
summary: Cada campo de un esquema, las reglas, las capacidades y los nombres de lo que se crea.
order: 10
---

Este documento describe el formato de esquema YAML que usa el plugin Web Service Manager. La misma referencia está dentro del plugin, en el menú **Documentación** del panel.

## Estructura del esquema

Un archivo YAML de esquema de servicio debe contener las siguientes secciones:

```yaml
meta:
  id: "example.service"           # Obligatorio: identificador único (solo letras, números y puntos; máximo 50 caracteres)
  name: "Example Service"         # Obligatorio: nombre visible (debe ser único entre todos los esquemas)
  version: "1.0.0"               # Opcional: número de versión (1.0.0 si se omite; el plugin la sube cuando no es más alta tras un cambio)
  maintainer: "Su nombre"         # Opcional: responsable
  description: "Descripción"      # Opcional: descripción del servicio

requirements:                     # Sección opcional
  plugins:                        # Lista de plugins requeridos
    - mod_forum
    - mod_assign
  download_files: false           # Permitir descargas de archivos con este servicio (por defecto: false)
  upload_files: false             # Permitir subidas de archivos con este servicio (por defecto: false)

definition:
  functions:                      # Obligatorio: lista de funciones de servicio web
    - core_user_get_users
    - name: core_course_get_courses
      critical: true              # Por defecto: true (bloquea la creación si falta)
    - name: mod_forum_get_forums
      critical: false             # No crítica: solo avisa, la creación continúa

  extra_capabilities:             # Opcional: capacidades adicionales que asignar
    - moodle/user:viewdetails     # webservice/rest:use y webservice/soap:use se añaden siempre automáticamente
    - moodle/course:view

  additional_users:               # Opcional: usuarios adicionales que autorizar
    - admin@example.com
    - teacher@example.com

role:                             # Sección opcional: lo que puede hacer el rol del esquema
  context_levels:                 # Dónde puede asignarse el rol además de en todo el sitio
    - category
    - course
  permissions:                    # Capacidades que no se permiten sin más
    prevent:                      # No se dan, aunque otro rol pudiera darlas
      - moodle/user:delete
    prohibit:                     # Nunca se dan, sea lo que sea lo que tenga el rol
      - moodle/site:config
  allow_assign:                   # Roles que puede dar a otras personas
    - student
  allow_override:                 # Roles cuyos permisos puede anular
    - student
  allow_switch:                   # Roles a los que puede cambiar
    - student
  allow_view:                     # Roles cuyos miembros puede ver
    - student
    - editingteacher
```

## Referencia de campos

### meta (Obligatorio)

| Campo | Obligatorio | Descripción |
|-------|:-----------:|-------------|
| `id` | ✅ | Identificador único. Solo se permiten letras, números y puntos (.). Máximo 50 caracteres. Ejemplo: `myapp.users` |
| `name` | ✅ | Nombre legible del servicio. Debe ser único entre todos los esquemas. |
| `version` | | Cadena de versión (se recomienda el versionado semántico). Opcional: un esquema nuevo sin ella empieza en `1.0.0`. Cuando la definición cambia y la versión falta, ya se usó o es más baja que alguna que el esquema ha tenido, el plugin guarda la más alta más 1 en el último número. Las ediciones que solo tocan metadatos (nombre, responsable, descripción) conservan la versión. |
| `maintainer` | ❌ | Persona o equipo responsable del esquema. |
| `description` | ❌ | Descripción breve del propósito del servicio. |

### requirements (Opcional)

| Campo | Obligatorio | Descripción |
|-------|:-----------:|-------------|
| `plugins` | ❌ | Lista de plugins que deben estar instalados. Se muestra un aviso si falta alguno, pero la creación del esquema no se bloquea. |
| `download_files` | ❌ | Booleano. Si es `true`, los consumidores de este servicio pueden descargar archivos mediante `webservice/pluginfile.php`. Por defecto `false`. |
| `upload_files` | ❌ | Booleano. Si es `true`, los consumidores de este servicio pueden subir archivos mediante `webservice/upload.php`. Por defecto `false`. |

### definition (Obligatorio)

| Campo | Obligatorio | Descripción |
|-------|:-----------:|-------------|
| `functions` | ✅ | Lista de nombres de funciones de servicio web que incluir en el servicio. |
| `extra_capabilities` | ❌ | Capacidades de Moodle adicionales que asignar al rol del servicio, además de las derivadas de las funciones. `webservice/rest:use` y `webservice/soap:use` se incluyen siempre automáticamente. |
| `additional_users` | ❌ | Direcciones de correo de usuarios existentes de Moodle que también se autorizan para este servicio. Si no se encuentra un correo, se muestra un aviso y la creación continúa. |

### role (Opcional)

Lo que puede hacer el rol que se crea para el esquema, además de las capacidades que necesitan sus funciones. Los roles se nombran por su **nombre corto** (`student`, `editingteacher`, `manager`), como los nombra Moodle en el código.

| Campo | Obligatorio | Descripción |
|-------|:-----------:|-------------|
| `context_levels` | ❌ | Dónde puede asignarse el rol, además de en todo el sitio, donde siempre puede: `user`, `category`, `course`, `module` (una actividad) o `block`. |
| `permissions.allow` | ❌ | Capacidades que se dan al rol. Es lo mismo que `extra_capabilities`; use la que se lea mejor junto a los demás permisos. |
| `permissions.prevent` | ❌ | Capacidades que el rol no recibe, aunque otro rol que también tenga pudiera darlas. Un lugar más bajo aún puede permitirlas. |
| `permissions.prohibit` | ❌ | Capacidades que el rol nunca puede tener, esté donde esté y sea lo que sea lo que se le dé. |
| `allow_assign` | ❌ | Roles que el rol puede asignar a otras personas (*Permitir asignar roles*). |
| `allow_override` | ❌ | Roles cuyos permisos puede anular el rol (*Permitir anular roles*). |
| `allow_switch` | ❌ | Roles a los que puede cambiar el rol (*Permitir cambiar de rol*). |
| `allow_view` | ❌ | Roles cuyos nombres y miembros puede ver el rol (*Permitir ver roles*). |

Un rol que no existe es un error. Una capacidad que no existe es un aviso, porque puede pertenecer a un plugin que aún no está instalado. Todo lo que una versión del esquema ya no dice se retira del rol, de modo que el rol es siempre exactamente lo que describe el esquema. Un cambio en esta sección es un cambio de la definición, así que necesita una versión nueva.

## Formatos de función

Las funciones pueden especificarse de dos maneras:

**Formato simple** (por defecto `critical: true`):
```yaml
functions:
  - core_user_get_users
  - core_course_get_courses
```

**Formato extendido** (indicador crítico explícito):
```yaml
functions:
  - name: core_user_get_users
    critical: true    # La creación del esquema falla si falta esta función
  - name: mod_forum_get_forums
    critical: false   # Solo aviso: la creación continúa aunque falte
```

## Resolución de capacidades

Cuando se crea o actualiza un esquema, el plugin calcula automáticamente el conjunto completo de capacidades requeridas leyendo las declaraciones PHP de cada función de servicio web en el código de Moodle. Estas capacidades derivadas se combinan con las `extra_capabilities` listadas en el YAML. El conjunto final se asigna al rol dedicado del esquema. `webservice/rest:use` y `webservice/soap:use` se incluyen siempre, con independencia de las funciones definidas.

### Las capacidades `moodle/role:*`

Un puñado de capacidades **no bastan por sí solas**: concederlas no permite al servicio realizar la acción, porque Moodle las somete a una segunda capa, las *matrices de permisos de roles*, que dicen *sobre qué roles de destino* puede actuar un rol.

| Capacidad | Requiere también (matriz) | Clave de la sección `role` |
|-----------|---------------------------|-----------------------------|
| `moodle/role:assign` | Permitir asignar roles | `allow_assign` |
| `moodle/role:review` | Permitir ver roles | `allow_view` |
| `moodle/role:override` | Permitir anular roles | `allow_override` |
| `moodle/role:switch` | Permitir cambiar de rol | `allow_switch` |

El rol del servicio no tiene arquetipo, así que empieza sin nada en ninguna matriz. El plugin las rellena a partir de la sección `role`: con `moodle/role:assign` en `extra_capabilities` y `allow_assign: [student]`, una llamada a `core_role_assign_roles` puede asignar el rol de estudiante y ningún otro.

## Convenciones de nombres

Cuando se crea un esquema, se aprovisionan automáticamente los siguientes recursos:

| Recurso | Patrón | Ejemplo |
|---------|--------|---------|
| Nombre de usuario | `ws.{id}` | `ws.example.service` |
| Nombre visible | `User Webservice {name}` | `User Webservice Example Service` |
| Correo | `ws.{id}@devnull.{domain}` | `ws.example.service@devnull.campus.edu` |
| Nombre visible del rol | `Role for {name}` | `Role for Example Service` |
| Nombre corto del rol | `ws_{id}` (los puntos pasan a guiones bajos) | `ws_example_service` |
| Nombre corto del servicio | `ws_{id}` | `ws_example_service` |
| Nombre del token | `Token - {name}` | `Token - Example Service` |

El `{domain}` del correo es el dominio del sitio sin el subdominio inicial (por ejemplo `campus.example.com` → `example.com`).

## Reglas de validación

| Regla | Detalles |
|-------|----------|
| Formato del ID del esquema | Solo letras, números y puntos |
| Longitud del ID del esquema | Máximo 50 caracteres |
| Unicidad del ID del esquema | Cada ID de esquema debe ser único |
| Unicidad del nombre del esquema | Cada nombre de esquema debe ser único (de él salen los nombres del rol y del servicio, que tienen restricciones únicas en la base de datos) |
| Funciones críticas | Si falta una función crítica en la instalación de Moodle, el esquema no se puede crear |
| Funciones no críticas | Las funciones no críticas que faltan generan un aviso pero no bloquean la creación |
| Incremento de versión | Si la definición (funciones, capacidades o rol) cambia, el plugin sube la versión por sí mismo cuando no es más alta que las que ha tenido el esquema |
| Sección del rol | Solo se conocen `context_levels`, `permissions`, `allow_assign`, `allow_override`, `allow_switch` y `allow_view`; cada una debe ser una lista de nombres |
| Roles | Todo rol nombrado en la sección debe existir (error) |
| Capacidades en `permissions` | Una que este Moodle no conozca es un aviso |

## Archivos de ejemplo

Consulte la carpeta `examples/` del repositorio para ver archivos de ejemplo completos:

- `sample_schema.yaml`: ejemplo básico con todas las secciones y comentarios en línea.

## Descargar el ejemplo

[Descargar sample_schema.yaml](https://github.com/didactika/moodle-local_servicemanager/blob/main/examples/sample_schema.yaml)
