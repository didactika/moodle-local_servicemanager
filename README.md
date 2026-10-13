# Web Service Manager (local_servicemanager)

A Moodle local plugin for managing web service integrations from declarative YAML schemas.

Web Service Manager lets administrators define a complete Moodle web service setup in one version-controlled file. For each schema, the plugin provisions the service user, role, capabilities, external service, authorized functions, and token, then keeps those resources synchronized as the schema changes.

[![Moodle](https://img.shields.io/badge/Moodle-4.0%20to%205.3-blue.svg)](https://moodle.org)
[![License](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Contents

- [Overview](#overview)
  - [The Security Model](#the-security-model)
  - [Automatic Capability Resolution](#automatic-capability-resolution)
  - [Full Lifecycle Management](#full-lifecycle-management)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [YAML Schema Format](#yaml-schema-format)
- [Configuration](#configuration)
- [API Reference](#api-reference)
  - [Plugin Web Service API](#plugin-web-service-api)
- [Testing](#testing)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Support](#support)
- [Contributing](#contributing)
- [Featured Contributors](#featured-contributors)
- [License](#license)

## Overview

Web Service Manager allows administrators to define Moodle web services declaratively using YAML files. Instead of navigating multiple Moodle admin screens to manually create users, roles, capabilities, and services, you declare everything in a single YAML file and the plugin provisions and maintains the full infrastructure automatically.

### The Security Model

Each schema creates a **fully isolated, scoped environment** for one web service consumer:

- **Dedicated service user** — a system account created exclusively for this service, suspended automatically if the schema is disabled
- **Dedicated role** — a custom role assigned to that user at the system level, containing only the capabilities this service actually needs
- **Dedicated external service** — a Moodle web service restricted to that user and those functions only
- **Scoped token** — a token tied to that user and service, never shared across consumers

This means a compromised token or misbehaving consumer can only access exactly what its schema declares — nothing more. Revoking access is as simple as disabling or deleting the schema.

### Automatic Capability Resolution

Moodle web service functions each declare the capabilities they require in their PHP definition files. This plugin reads those declarations at provisioning time and automatically assigns all necessary capabilities to the service role — you don't need to know or look them up manually. You can also declare additional capabilities in the YAML for access patterns beyond the standard function requirements. The capabilities `webservice/rest:use` and `webservice/soap:use` are always included.

### Full Lifecycle Management

The plugin keeps all Moodle resources in sync with the schema throughout its lifetime:

| Action | What happens automatically |
|--------|---------------------------|
| **Create** | User, role, capabilities, service, token all provisioned in one step |
| **Update** | Role name, capabilities, and service functions updated to match the new YAML |
| **Enable / Disable** | User account unsuspended / suspended; service toggled |
| **Delete** | User, role, service, and token all removed cleanly |

### Why Use This Plugin?

- **Security by default**: Every consumer gets its own isolated user, role, and service — no shared credentials, minimal blast radius
- **No manual capability hunting**: Required capabilities are derived automatically from the function declarations in Moodle's codebase
- **Efficiency**: Create a complete, production-ready web service setup in seconds instead of navigating multiple Moodle admin screens
- **Reproducibility**: Schema files can be version-controlled and deployed identically across environments
- **Documentation**: YAML files serve as self-documenting service configurations — the schema is the spec
- **Auditability**: Version history, health check logs, and YAML diffs give a complete record of every change
- **Automation**: Import schemas via ZIP archive, integrate provisioning into CI/CD pipelines, or manage schemas programmatically via the plugin's own web service API

## Features

| Feature | Description |
|---------|-------------|
| **Declarative Configuration** | Define web services using YAML files |
| **Automatic Provisioning** | Users, roles, services, and tokens created automatically |
| **Health Monitoring** | Scheduled health checks with email notifications |
| **Token Management** | Secure token generation, display, and regeneration |
| **Multi-language** | English, Spanish, Portuguese, Italian, French |
| **Guided Form** | Create a schema by filling in fields, with suggestions for functions, plugins, users and capabilities as you type |
| **In-Browser Editor** | Edit schemas directly in Moodle, or paste YAML |
| **Roles** | Say which roles the service role may assign, override, switch to and see, and where it can be assigned |
| **Dashboard** | Health summary, active protocols, search that filters as you type, and bulk actions in a floating bar |
| **Comparator** | Side by side or unified differences between two versions, with a summary of what changed |
| **Colour modes** | Follows the colour mode of Moodle and the components of the theme |
| **Validation** | Real-time syntax and function validation |
| **Capability Calculation** | Automatic capability assignment from functions |
| **Versioning** | Full history tracking with rollback and diff view |

## Requirements

| Requirement | Version |
|-------------|---------|
| Moodle | 5.3 on this branch; 4.0 to 5.2 on `MOODLE_400_STABLE` (see Branches and versions) |
| PHP | 8.3 or later |
| PHP YAML Extension | Recommended (fallback parser included) |

## Installation

### Method 1: Direct Download

1. Download the latest release
2. Extract it into `local/servicemanager`.
3. Visit **Site administration** in Moodle.
4. Complete the plugin installation wizard.

### Method 2: Git Clone

```bash
cd /path/to/moodle/local
git clone https://github.com/didactika/moodle-local_servicemanager.git servicemanager
```

### Branches and versions

| Branch | Moodle | Interface |
|--------|--------|-----------|
| `main` | 5.3 | React and TypeScript (ESM) |
| `MOODLE_400_STABLE` | 4.0 to 5.2 | AMD modules and Mustache templates |

Both branches offer the same functions. Check out the one that matches your Moodle.

## Documentation

The user manual, with screenshots, is in the **[wiki](https://github.com/didactika/moodle-local_servicemanager/wiki)**.
The reference of the YAML format is in [docs/schema_reference.md](docs/schema_reference.md) and, inside Moodle, in the **Documentation** menu of the dashboard.

After installation, visit **Site Administration** to complete the setup.

## Usage

### Accessing the Dashboard

Navigate to: **Site Administration → Server → Service Manager → Dashboard**

### Creating a Schema

1. Click **New schema** (the plus button).
2. Fill in the **Guided form**, or switch to **YAML editor** and paste the YAML.
3. Check **"Generate token automatically"** if needed.
4. Click **Create schema**.

To bring in schemas you already have as files, use the **import** button next to it; **export all** downloads every schema in one archive.

### Finding a Schema

Type in the search box and the list narrows as you type. Choose **Healthy**, **Warning** or **Critical** in the summary above to see only those; the dates and the size of the page are in the **Filters** menu. Tick one or more rows and a bar floats at the bottom with what can be done to them: enable, disable, export or delete.

### Editing a Schema

1. From the dashboard, click the **edit icon** (pencil)
2. Modify the YAML content in the editor
3. Click **"Save Changes"**

### Viewing Schema Details

Click on a schema name to view:

- Associated user, role, and service links
- Function status (available/missing)
- Token information and regeneration
- Health check history

### Managing Versions

1. Click on **Version History** while viewing a specific schema
2. View past versions and their changes
3. Select two versions and Click **"Compare Versions"** to view the definitions difference.
4. Click **"Rollback"** to restore a previous version

### Deleting a Schema

1. Click on the schema name to view details
2. Click **"Delete"** button
3. Confirm deletion

> ⚠️ **Warning**: Deleting a schema removes the associated user, role, service, and tokens.

## YAML Schema Format

### Complete Example

```yaml
meta:
  id: "myapp.users"                    # Required: Unique identifier
  name: "My Application User Service"  # Required: Display name
  version: "1.0.0"                     # Optional: set by the plugin when it is missing or already used
  maintainer: "IT Department"          # Optional: Maintainer info
  description: "User management API"   # Optional: Description

requirements:                          # Optional section
  plugins:
    - mod_forum                        # List of required plugins
    - mod_assign
  download_files: false                # Allow file downloads (default: false)
  upload_files: false                  # Allow file uploads (default: false)

definition:
  functions:                           # Required: Web service functions
    - core_user_get_users              # Simple format (critical: true)
    - core_user_create_users
    - name: core_user_update_users     # Extended format
      critical: true                   # Blocks creation if missing
    - name: mod_forum_get_forums
      critical: false                  # Warning only if missing
  
  extra_capabilities:                  # Optional: Additional capabilities
    - moodle/user:viewdetails
    - moodle/course:view
  
  additional_users:                    # Optional: Users to authorize
    - admin@example.com
    - apiuser@example.com

role:                                  # Optional: what the role of the service may do
  context_levels:                      # Where it can be assigned, besides the whole site
    - course
  permissions:
    prevent:
      - moodle/user:delete
    prohibit:
      - moodle/site:config
  allow_assign:                        # Roles it may assign to other people
    - student
  allow_view:                          # Roles whose members it may see
    - student
```

### In Short

A schema has up to four sections:

- **`meta`** — who the service is: `id`, `name`, and `version` (required), plus optional `maintainer` and `description`.
- **`requirements`** *(optional)* — plugins the service needs, and whether it may download or upload files.
- **`definition`** — the `functions` the service exposes (required), plus optional `extra_capabilities` and `additional_users`.
- **`role`** *(optional)* — where the role can be assigned, the capabilities it is kept from or forbidden, and the roles it may assign, override, switch to and see (`allow_assign`, `allow_override`, `allow_switch`, `allow_view`).

You don't list the capabilities each function needs — the plugin reads them from Moodle and assigns them automatically, and `webservice/rest:use` / `webservice/soap:use` are always included. When a schema is created it also provisions a user, role, service, and token following fixed naming patterns.

> 📖 For the complete field-by-field reference, validation rules, naming conventions, and notes on special capabilities, see **[docs/schema_reference.md](docs/schema_reference.md)** — the single source of truth for the schema format.

## Configuration

### Settings Location

**Site Administration → Plugins → Local Plugins → Web Service Manager → Settings**

### Notification Settings

| Setting | Description |
|---------|-------------|
| Email recipients | Comma-separated list of notification recipients |
| Notify admins | Also send notifications to site administrators |
| Notification level | Minimum severity (All, Warning, Error, Critical) |

### Health Check Settings

| Setting | Description |
|---------|-------------|
| Enable health check | Run scheduled health monitoring |
| Check interval | Configured via Moodle scheduled tasks |

### Log Cleanup Settings

| Setting | Description |
|---------|-------------|
| Enable cleanup | Automatically delete old health logs |
| Retention days | Number of days to keep logs (default: 30) |

## API Reference

### PHP Classes

```php
// Schema Manager - Main entry point
$manager = new \local_servicemanager\schema\manager();
$result = $manager->create_schema($yaml_content, $generate_token);
$schema = $manager->get_schema($id);
$manager->update_schema($id, $new_yaml);
$manager->delete_schema($id);

// YAML Parser
$parser = new \local_servicemanager\schema\yaml_parser();
$data = $parser->parse($yaml_content);
$meta = $parser->extract_meta($data);
$functions = $parser->extract_functions($data);

// Validator
$validator = new \local_servicemanager\schema\validator();
$result = $validator->validate_content($yaml_content);
// Returns: ['errors' => [...], 'warnings' => [...]]
```

### Scheduled Tasks

| Task | Description | Default Schedule |
|------|-------------|------------------|
| `health_check_task` | Validates all schemas | Daily at 2:00 AM |
| `cleanup_logs_task` | Removes old health logs | Daily at 3:00 AM |

### Plugin Web Service API

The plugin exposes its own REST API so schemas can be managed programmatically — useful for CI/CD pipelines, deployment scripts, or any external tooling that needs to provision or update web services without accessing the Moodle UI.

A pre-configured external service (`ws_servicemanager`) is installed automatically. Authorize a user with the `local/servicemanager:manage` capability to that service and use the token to call these functions:

| Function | Type | Description |
|----------|------|-------------|
| `local_servicemanager_get_schemas` | read | List all schemas |
| `local_servicemanager_get_schema` | read | Get a single schema by ID |
| `local_servicemanager_create_schema` | write | Create a new schema from YAML content |
| `local_servicemanager_update_schema` | write | Update an existing schema with new YAML content |
| `local_servicemanager_delete_schema` | write | Delete a schema and all its provisioned resources |
| `local_servicemanager_get_version` | read | The YAML of one version of a schema |
| `local_servicemanager_get_suggestions` | read | Suggestions for the autocomplete fields of the guided form |

**Example — create a schema via REST:**

```bash
curl -X POST "https://yourmoodle.example.com/webservice/rest/server.php" \
  -d "wstoken=YOUR_TOKEN" \
  -d "wsfunction=local_servicemanager_create_schema" \
  -d "moodlewsrestformat=json" \
  -d "yamlcontent=meta:%0A  id: my.service%0A  ..." \
  -d "generatetoken=1"
```

## Testing

### PHPUnit Tests

```bash
# Run all plugin tests
vendor/bin/phpunit --testsuite local_servicemanager_testsuite

# Run specific test class
vendor/bin/phpunit local/servicemanager/tests/yaml_parser_test.php
```

### Behat Tests

```bash
# Initialize Behat
php admin/tool/behat/cli/init.php

# Run plugin tests
vendor/bin/behat --config /path/to/behatrun/behat.yml --tags=@local_servicemanager
```

### Test Coverage

| Test File | Covers |
|-----------|--------|
| `yaml_parser_test.php` | YAML parsing, ID validation, data extraction |
| `validator_test.php` | Schema validation, error detection |
| `user_manager_test.php` | Service user CRUD operations |
| `role_manager_test.php` | Role creation, capability assignment |
| `service_manager_test.php` | External service management |
| `capability_calculator_test.php` | Capability calculation |
| `manager_test.php` | Full schema lifecycle |
| `role_settings_test.php` | The `role` section: parsing, validation and what it does to the role |
| `schema_builder_test.php` | The YAML written by the guided form |
| `suggester_test.php` | Suggestions while typing |
| `line_diff_test.php`, `version_summary_test.php` | The comparator |

## Security

### Design Principles

- **Isolation**: Each schema gets its own user, role, and service
- **Restricted Access**: Services are restricted to authorized users only
- **Non-routable Emails**: Service user emails use `@devnull.{domain}` pattern
- **Token Security**: Tokens displayed only once after generation
- **Capability Minimization**: Only required capabilities are assigned

### Best Practices

1. **Version Control**: Keep schema YAML files in version control
2. **Environment Separation**: Use different schema IDs per environment
3. **Token Rotation**: Regenerate tokens periodically
4. **Audit Logging**: Monitor health check logs for anomalies
5. **Principle of Least Privilege**: Only include necessary functions

## Troubleshooting

### Schema Not Creating

| Issue | Solution |
|-------|----------|
| YAML syntax error | Validate YAML at [yamllint.com](https://www.yamllint.com/) |
| Invalid schema ID | Use only letters, numbers, and dots |
| Missing critical function | Install required plugin or mark as non-critical |
| Duplicate ID | Choose a unique schema ID |
| Duplicate name | Schema names must be unique — use a different `meta.name` |

### Token Issues

| Issue | Solution |
|-------|----------|
| Token not copying | Enable JavaScript, use HTTPS |
| Token lost | Regenerate from schema detail page |
| Token not working | Verify service and user are enabled |

### Health Check Issues

| Issue | Solution |
|-------|----------|
| Not running | Check cron configuration |
| No notifications | Verify email settings |
| False positives | Review function availability |

### Common Errors

```
Error: Schema ID already exists
→ Use a unique ID or delete existing schema

Error: Invalid YAML syntax  
→ Check for indentation issues, missing quotes

Error: Critical function not found
→ Install required plugin or set critical: false
```

## Support

Found a bug, hit an error not covered above, or have a feature request? Please open an **[issue](https://github.com/didactika/moodle-local_servicemanager/issues)**.

When reporting a bug, include your Moodle and PHP versions, the relevant schema YAML, and the exact error message so we can reproduce it quickly.

## Contributing

### Development Setup

```bash
# Clone into your Moodle installation
git clone https://github.com/didactika/moodle-local_servicemanager.git /path/to/moodle/local/servicemanager

# Run tests
vendor/bin/phpunit --testsuite local_servicemanager_testsuite

# Run code style checks (requires PHP_CodeSniffer with Moodle standard)
vendor/bin/phpcs --standard=moodle local/servicemanager/
```

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`vendor/bin/phpunit --testsuite local_servicemanager_testsuite`)
5. Run code checks (`vendor/bin/phpcs --standard=moodle local/servicemanager/`)
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Standards

- Follow [Moodle Coding Style](https://moodledev.io/general/development/policies/codingstyle)
- Add PHPDoc comments to all public methods
- Write tests for new functionality
- Update documentation as needed

## Featured Contributors

[![Contributors](https://contrib.rocks/image?repo=didactika/moodle-local_servicemanager)](https://github.com/didactika/moodle-local_servicemanager/graphs/contributors)

## License

This plugin is licensed under the [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0) or later.

**© Didactika.org - Made with ❤️ for the Moodle community**
