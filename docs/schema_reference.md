# Service Schema YAML Documentation

This document describes the YAML schema format used by the Service Schema Manager plugin.

## Schema Structure

A service schema YAML file must contain the following sections:

```yaml
meta:
  id: "example.service"           # Required: Unique identifier (letters, numbers, dots only)
  name: "Example Service"         # Required: Display name
  version: "1.0.0"               # Required: Version number
  maintainer: "Your Name"         # Optional: Maintainer info
  description: "Description"      # Optional: Service description

requirements:                     # Optional section
  plugins:                        # List of required plugins
    - mod_forum
    - mod_assign

definition:
  functions:                      # Required: List of web service functions
    - core_user_get_users
    - name: core_course_get_courses
      critical: true              # Default: true (blocks creation if missing)
    - name: mod_forum_get_forums
      critical: false             # Non-critical won't block creation
  
  extra_capabilities:             # Optional: Additional capabilities to assign
    - moodle/user:viewdetails
    - moodle/course:view
  
  additional_users:               # Optional: Additional users to authorize
    - admin@example.com
    - teacher@example.com
```

## Field Reference

### meta (Required)

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique identifier. Only letters, numbers, and dots (.) allowed. Example: `myapp.users` |
| `name` | Yes | Human-readable name for the service |
| `version` | Yes | Version string (semantic versioning recommended) |
| `maintainer` | No | Person or team responsible for the schema |
| `description` | No | Brief description of the service's purpose |

### requirements (Optional)

| Field | Description |
|-------|-------------|
| `plugins` | Array of plugin names that must be installed. Warning shown if missing. |

### definition (Required)

| Field | Required | Description |
|-------|----------|-------------|
| `functions` | Yes | Array of web service function names |
| `extra_capabilities` | No | Additional Moodle capabilities to assign to the service role |
| `additional_users` | No | Email addresses of additional users to authorize for this service |

### Function Formats

Functions can be specified in two ways:

**Simple format** (defaults to critical: true):
```yaml
functions:
  - core_user_get_users
  - core_course_get_courses
```

**Extended format** (with critical flag):
```yaml
functions:
  - name: core_user_get_users
    critical: true
  - name: mod_forum_get_forums
    critical: false
```

## Naming Conventions

When a schema is created, the following resources are automatically generated:

| Resource | Naming Pattern | Example |
|----------|---------------|---------|
| Username | `ws.{id}` | `ws.example.service` |
| Email | `ws.{id}@devnull.{domain}` | `ws.example.service@devnull.campus.edu` |
| Role shortname | `ws_{id}` (dots → underscores) | `ws_example_service` |
| Service shortname | `ws_{id}` | `ws_example_service` |
| Token name | `Token - {name}` | `Token - Example Service` |

## Validation Rules

1. **Schema ID**: Must contain only letters, numbers, and dots
2. **Critical functions**: If a critical function is missing, the schema cannot be created
3. **Non-critical functions**: Will show a warning but allow creation
4. **Duplicate IDs**: Each schema ID must be unique

## Example Files

See the `examples/` folder for complete example files:

- `sample_schema.yaml` - Basic example with all sections

## Download Example

[Download sample_schema.yaml](examples/sample_schema.yaml)
