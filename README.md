# Service Schema Manager

A Moodle plugin for declarative web service management using YAML schema files.

[![Moodle Plugin CI](https://img.shields.io/badge/Moodle-4.5+-blue.svg)](https://moodle.org)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [YAML Schema Format](#yaml-schema-format)
- [Configuration](#configuration)
- [API Reference](#api-reference)
- [Testing](#testing)
- [Security](#security)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

Service Schema Manager allows administrators to define Moodle web services declaratively using YAML files. Instead of manually configuring users, roles, capabilities, and services through the Moodle interface, you can define everything in a single YAML file.

### Why Use This Plugin?

- **Reproducibility**: Schema files can be version-controlled and deployed across environments
- **Automation**: Integrate web service provisioning into CI/CD pipelines
- **Documentation**: YAML files serve as self-documenting service configurations
- **Efficiency**: Create complete web service setups in seconds instead of minutes

## Features

| Feature | Description |
|---------|-------------|
| **Declarative Configuration** | Define web services using YAML files |
| **Automatic Provisioning** | Users, roles, services, and tokens created automatically |
| **Health Monitoring** | Scheduled health checks with email notifications |
| **Token Management** | Secure token generation, display, and regeneration |
| **Multi-language** | English, Spanish, Portuguese, Italian, French |
| **In-Browser Editor** | Edit schemas directly in Moodle |
| **Validation** | Real-time syntax and function validation |
| **Capability Calculation** | Automatic capability assignment from functions |

## Requirements

| Requirement | Version |
|-------------|---------|
| Moodle | 4.5 or later |
| PHP | 8.1 or later |
| PHP YAML Extension | Recommended (fallback parser included) |

## Installation

### Method 1: Direct Download

1. Download the latest release
2. Extract to `/local/serviceschema/`
3. Visit **Site Administration → Notifications**
4. Complete the installation wizard

### Method 2: Git Clone

```bash
cd /path/to/moodle/local
git clone https://github.com/your-org/moodle-local_serviceschema.git serviceschema
```

### Method 3: Composer

```json
{
  "require": {
    "your-org/moodle-local_serviceschema": "^1.0"
  }
}
```

After installation, visit **Site Administration → Notifications** to complete setup.

## Usage

### Accessing the Dashboard

Navigate to: **Site Administration → Plugins → Local Plugins → Service Schema Manager**

### Creating a Schema

1. Click **"Upload Schema"**
2. Upload a YAML file or download the example
3. Check **"Generate token automatically"** if needed
4. Click **"Upload"**

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
  version: "1.0.0"                     # Required: Version number
  maintainer: "IT Department"          # Optional: Maintainer info
  description: "User management API"   # Optional: Description

requirements:                          # Optional section
  plugins:
    - mod_forum                        # List of required plugins
    - mod_assign

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
```

### Field Reference

#### Meta Section (Required)

| Field | Required | Description |
|-------|:--------:|-------------|
| `id` | ✅ | Unique identifier. Only letters, numbers, and dots (.) |
| `name` | ✅ | Human-readable display name |
| `version` | ✅ | Semantic version string (e.g., "1.0.0") |
| `maintainer` | ❌ | Responsible person or team |
| `description` | ❌ | Brief description of the service |

#### Requirements Section (Optional)

| Field | Description |
|-------|-------------|
| `plugins` | Array of plugin names that must be installed |

#### Definition Section (Required)

| Field | Required | Description |
|-------|:--------:|-------------|
| `functions` | ✅ | Array of web service function names |
| `extra_capabilities` | ❌ | Additional Moodle capabilities to assign |
| `additional_users` | ❌ | Email addresses of users to authorize |

### Naming Conventions

When a schema is created, resources follow these patterns:

| Resource | Pattern | Example |
|----------|---------|---------|
| Username | `ws.{id}` | `ws.myapp.users` |
| Email | `ws.{id}@devnull.{domain}` | `ws.myapp.users@devnull.campus.edu` |
| Role | `ws_{id}` (dots → underscores) | `ws_myapp_users` |
| Service | `ws_{id}` | `ws_myapp_users` |
| Token Name | `Token - {name}` | `Token - My Application User Service` |

## Configuration

### Settings Location

**Site Administration → Plugins → Local Plugins → Service Schema Manager → Settings**

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
$manager = new \local_serviceschema\schema\manager();
$result = $manager->create_from_yaml($yaml_content, $generate_token);
$schema = $manager->get_schema($id);
$manager->update_schema($id, $new_yaml);
$manager->delete_schema($id);

// YAML Parser
$parser = new \local_serviceschema\schema\yaml_parser();
$data = $parser->parse($yaml_content);
$meta = $parser->get_meta($data);
$functions = $parser->get_functions($data);

// Validator
$validator = new \local_serviceschema\schema\validator();
$result = $validator->validate_content($yaml_content);
// Returns: ['errors' => [...], 'warnings' => [...]]
```

### Scheduled Tasks

| Task | Description | Default Schedule |
|------|-------------|------------------|
| `health_check_task` | Validates all schemas | Daily at 2:00 AM |
| `cleanup_logs_task` | Removes old health logs | Daily at 3:00 AM |

## Testing

### PHPUnit Tests

```bash
# Run all plugin tests
vendor/bin/phpunit --testsuite local_serviceschema_testsuite

# Run specific test class
vendor/bin/phpunit local/serviceschema/tests/yaml_parser_test.php
```

### Behat Tests

```bash
# Initialize Behat
php admin/tool/behat/cli/init.php

# Run plugin tests
vendor/bin/behat --config /path/to/behatrun/behat.yml --tags=@local_serviceschema
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

## Contributing

### Development Setup

```bash
# Clone repository
git clone https://github.com/your-org/moodle-local_serviceschema.git

# Install dependencies
cd moodle-local_serviceschema
npm install

# Run code checks
grunt
```

### Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`vendor/bin/phpunit --testsuite local_serviceschema_testsuite`)
5. Run code checks (`grunt`)
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Standards

- Follow [Moodle Coding Style](https://moodledev.io/general/development/policies/codingstyle)
- Add PHPDoc comments to all public methods
- Write tests for new functionality
- Update documentation as needed

## License

This plugin is licensed under the [MIT License](LICENSE).

```
MIT License

Copyright (c) 2026 Your Organization

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

**Made with ❤️ for the Moodle community**
