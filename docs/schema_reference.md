# Service Schema YAML Reference

This document describes the YAML schema format used by the Web Service Manager plugin.

## Schema Structure

A service schema YAML file must contain the following sections:

```yaml
meta:
  id: "example.service"           # Required: Unique identifier (letters, numbers, dots only; max 50 chars)
  name: "Example Service"         # Required: Display name (must be unique across all schemas)
  version: "1.0.0"               # Optional: set by the plugin when it is missing or already used
  maintainer: "Your Name"         # Optional: Maintainer info
  description: "Description"      # Optional: Service description

requirements:                     # Optional section
  plugins:                        # List of required plugins
    - mod_forum
    - mod_assign
  download_files: false           # Allow file downloads via this service (default: false)
  upload_files: false             # Allow file uploads via this service (default: false)

definition:
  functions:                      # Required: List of web service functions
    - core_user_get_users
    - name: core_course_get_courses
      critical: true              # Default: true (blocks creation if missing)
    - name: mod_forum_get_forums
      critical: false             # Non-critical: warning only, creation continues

  extra_capabilities:             # Optional: Additional capabilities to assign
    - moodle/user:viewdetails     # webservice/rest:use and webservice/soap:use are always added automatically
    - moodle/course:view

  additional_users:               # Optional: Additional users to authorize
    - admin@example.com
    - teacher@example.com

role:                             # Optional section: what the role of the schema may do
  context_levels:                 # Where the role can be assigned besides the whole site
    - category
    - course
  permissions:                    # Capabilities that are not simply allowed
    prevent:                      # Not given, although another role could give them
      - moodle/user:delete
    prohibit:                     # Never given, whatever else the role has
      - moodle/site:config
  allow_assign:                   # Roles it may give to other people
    - student
  allow_override:                 # Roles whose permissions it may override
    - student
  allow_switch:                   # Roles it may switch to
    - student
  allow_view:                     # Roles whose members it may see
    - student
    - editingteacher
```

## Field Reference

### meta (Required)

| Field | Required | Description |
|-------|:--------:|-------------|
| `id` | ✅ | Unique identifier. Only letters, numbers, and dots (.) allowed. Max 50 characters. Example: `myapp.users` |
| `name` | ✅ | Human-readable name for the service. Must be unique across all schemas. |
| `version` | ❌ | Version of the schema, such as `1.0.0`. A new schema without one starts at `1.0.0`. When the definition changes and the version is missing or not higher than every one the schema has had, it is saved with the highest one plus one in its last number (`1.0.0` becomes `1.0.1`). Changing only the name, the maintainer or the description keeps the version. |
| `maintainer` | ❌ | Person or team responsible for the schema. |
| `description` | ❌ | Brief description of the service's purpose. |

### requirements (Optional)

| Field | Required | Description |
|-------|:--------:|-------------|
| `plugins` | ❌ | Array of plugin names that must be installed. A warning is shown if any are missing, but schema creation is not blocked. |
| `download_files` | ❌ | Boolean. If `true`, consumers of this service may download files via `webservice/pluginfile.php`. Defaults to `false`. |
| `upload_files` | ❌ | Boolean. If `true`, consumers of this service may upload files via `webservice/upload.php`. Defaults to `false`. |

### definition (Required)

| Field | Required | Description |
|-------|:--------:|-------------|
| `functions` | ✅ | Array of web service function names to include in the service. |
| `extra_capabilities` | ❌ | Additional Moodle capabilities to assign to the service role beyond those derived from the functions. `webservice/rest:use` and `webservice/soap:use` are always included automatically. |
| `additional_users` | ❌ | Email addresses of existing Moodle users to also authorize for this service. If an email is not found, a warning is shown and creation continues. |

### role (Optional)

What the role that is created for the schema may do, besides the capabilities its functions need. Roles are named by their **short name** (`student`, `editingteacher`, `manager`), the way Moodle names them in code.

| Field | Required | Description |
|-------|:--------:|-------------|
| `context_levels` | ❌ | Where the role can be assigned, besides the whole site, which it always can: `user`, `category`, `course`, `module` (an activity) or `block`. |
| `permissions.allow` | ❌ | Capabilities the role is given. The same as `extra_capabilities`; use whichever reads better next to the other permissions. |
| `permissions.prevent` | ❌ | Capabilities the role does not get, although another role it also has could give them. A place lower down may still allow them. |
| `permissions.prohibit` | ❌ | Capabilities the role can never have, wherever it is and whatever else it is given. |
| `allow_assign` | ❌ | Roles that the role may assign to other people (*Allow role assignments*). |
| `allow_override` | ❌ | Roles whose permissions the role may override (*Allow role overrides*). |
| `allow_switch` | ❌ | Roles the role may switch to (*Allow role switches*). |
| `allow_view` | ❌ | Roles whose names and members the role may see (*Allow role to view*). |

A role that does not exist is an error. A capability that does not exist is a warning, because it may belong to a plugin that is not installed yet. Whatever a version of the schema no longer says is taken away from the role, so the role is always exactly what the schema describes. A change in this section is a change of the definition, so the schema is saved with a new version.

## Function Formats

Functions can be specified in two ways:

**Simple format** (defaults to `critical: true`):
```yaml
functions:
  - core_user_get_users
  - core_course_get_courses
```

**Extended format** (explicit critical flag):
```yaml
functions:
  - name: core_user_get_users
    critical: true    # Schema creation fails if this function is missing
  - name: mod_forum_get_forums
    critical: false   # Warning only — creation continues even if missing
```

## Capability Resolution

When a schema is created or updated, the plugin automatically calculates the full set of required capabilities by reading the PHP declarations of each web service function in Moodle's codebase. These derived capabilities are merged with any `extra_capabilities` listed in the YAML. The final set is assigned to the schema's dedicated role. `webservice/rest:use` and `webservice/soap:use` are always included regardless of the functions defined.

### The `moodle/role:*` capabilities

A handful of capabilities are **not enough on their own**: granting them does not let the service perform the action, because Moodle gates them behind a second layer, the *role-allow matrices*, which say *which target roles* a role may act on.

| Capability | Also requires (matrix) | Key of the `role` section |
|------------|------------------------|-----------------------------|
| `moodle/role:assign` | Allow role assignments | `allow_assign` |
| `moodle/role:review` | Allow role to view | `allow_view` |
| `moodle/role:override` | Allow role overrides | `allow_override` |
| `moodle/role:switch` | Allow role switches | `allow_switch` |

The service role has no archetype, so it starts with nothing in any matrix. The plugin fills them from the `role` section: with `moodle/role:assign` in `extra_capabilities` and `allow_assign: [student]`, a call to `core_role_assign_roles` can assign the student role and no other.

## Naming Conventions

When a schema is created, the following resources are automatically provisioned:

| Resource | Pattern | Example |
|----------|---------|---------|
| Username | `ws.{id}` | `ws.example.service` |
| Display name | `User Webservice {name}` | `User Webservice Example Service` |
| Email | `ws.{id}@devnull.{domain}` | `ws.example.service@devnull.campus.edu` |
| Role display name | `Role for {name}` | `Role for Example Service` |
| Role shortname | `ws_{id}` (dots → underscores) | `ws_example_service` |
| Service shortname | `ws_{id}` | `ws_example_service` |
| Token name | `Token - {name}` | `Token - Example Service` |

The `{domain}` in the email is the site's domain with any leading subdomain stripped (e.g. `campus.example.com` → `example.com`).

## Validation Rules

| Rule | Details |
|------|---------|
| Schema ID format | Letters, numbers, and dots only |
| Schema ID length | Maximum 50 characters |
| Schema ID uniqueness | Each schema ID must be unique |
| Schema name uniqueness | Each schema name must be unique (drives role and service names which have DB unique constraints) |
| Critical functions | If a critical function is missing from the Moodle installation, the schema cannot be created |
| Non-critical functions | Missing non-critical functions generate a warning but do not block creation |
| Version | If the definition (functions, capabilities or role) changes without a version higher than every one the schema has had, it is saved with the next one; a change of the name, the maintainer or the description keeps the version |
| Role section | Only `context_levels`, `permissions`, `allow_assign`, `allow_override`, `allow_switch` and `allow_view` are known; each must be a list of names |
| Roles | Every role named in the section must exist (error) |
| Capabilities in `permissions` | One that this Moodle does not know is a warning |

## Example Files

See the `examples/` folder for complete example files:

- `sample_schema.yaml` — Basic example with all sections and inline comments

## Download Example

[Download sample_schema.yaml](../examples/sample_schema.yaml)
