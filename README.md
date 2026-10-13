<div align="center">

<img src="pix/icon.svg" width="96" alt="Web Service Manager icon">

# Web Service Manager for Moodle

*Set up a Moodle web service from one YAML file: its user, role, functions and token*

[![Release](https://img.shields.io/github/v/release/didactika/moodle-local_servicemanager?filter=v*-m503&style=flat-square)](https://github.com/didactika/moodle-local_servicemanager/releases)
[![Moodle](https://img.shields.io/badge/Moodle-5.3-f98012?style=flat-square&logo=moodle&logoColor=white)](https://moodle.org)
[![PHP](https://img.shields.io/badge/PHP-8.3+-777bb4?style=flat-square&logo=php&logoColor=white)](https://www.php.net)
[![License](https://img.shields.io/badge/License-GPL_v3-blue?style=flat-square)](LICENSE)

[Overview](#overview) • [Technology](#technology) • [Installation](#installation) • [Usage](#usage) • [User manual](#user-manual) • [Schema format](#schema-format) • [Configuration](#configuration) • [Web service API](#web-service-api) • [Development](#development) • [Troubleshooting](#troubleshooting)

</div>

Web Service Manager (**local_servicemanager**) lets an administrator describe a complete Moodle web service in one version-controlled YAML file. For each schema the plugin creates the service user, the role with only the capabilities the service needs, the external service with its authorised functions and the token, and keeps all of them in line with the file every time it changes. A compromised token or a misbehaving consumer can reach only what its schema declares, and disabling or deleting the schema closes the door.

![The dashboard](https://raw.githubusercontent.com/wiki/didactika/moodle-local_servicemanager/images/dashboard.png)

## Overview

- **One schema, one closed room**: a dedicated service user (suspended when the schema is disabled), a dedicated role, a dedicated external service restricted to that user and those functions, and a scoped token that is never shared.
- **Capabilities without hunting**: the capabilities each function needs are read from the function declarations in Moodle and assigned to the role; `webservice/rest:use` and `webservice/soap:use` are always included, and the schema can add more.
- **Two ways to write a schema**: a guided form with suggestions as you type for functions, plugins, users and capabilities, or the YAML editor.
- **Roles**: say where the service role can be assigned and which roles it may assign, override, switch to and see; the role-allow matrices that Moodle needs are filled from the schema.
- **Dashboard**: health summary (healthy, warning, critical), active protocols, search that filters as you type and bulk actions in a floating bar.
- **History and comparator**: every change is a version; compare two of them side by side or unified, with a summary of what changed, and roll back without leaving the page.
- **Export and import**: download one schema or all of them in a ZIP archive and bring schemas in from files, with a review step.
- **Health checks**: a scheduled task validates every schema and sends an email when a function disappears or a resource is missing.
- **Automation**: the plugin has its own web service to create, read, update and delete schemas from a pipeline.
- **Follows your Moodle**: light and dark colour modes and the components of the theme.

## Technology

The interface is a React 19 application written in TypeScript, mounted by Moodle's own `core/react_autoinit` from components that implement `core\output\react_component_renderable`. The source is in `js/esm/src` and the build that Moodle serves is committed in `js/esm/build`; rebuild it with `npx grunt esm` from the root of Moodle. The server side (schemas, provisioning, health checks and web services) is the same as in the maintenance line for Moodle 4.0 to 5.2.

## Installation

**Requirements:** Moodle 5.3, PHP 8.3 or newer and the database requirements of the selected Moodle release. The PHP YAML extension is recommended; a parser is included when it is missing. Moodle 4.0 to 5.2 have a maintenance line of their own (`MOODLE_400_STABLE`) with the same features and an interface written in AMD and Mustache; this line does not run on Moodle 5.2, which lacks `core\output\react_component_renderable`.

**From a release:** download the matching release ZIP (`-m503`), open **Site administration → Plugins → Install plugins**, upload the package and follow the prompts.

**From Git:**

```bash
cd /path/to/moodle
git clone --branch main https://github.com/didactika/moodle-local_servicemanager.git public/local/servicemanager
php admin/cli/upgrade.php --non-interactive
```

The plugin directory in Moodle 5.3 is `public/local/servicemanager`.

### Branches and releases

| Branch | Moodle | Interface | Release |
|--------|--------|-----------|---------|
| `main`, `MOODLE_503_STABLE` | 5.3 | React and TypeScript (ESM) | `X.Y.Z-m503` |
| `MOODLE_400_STABLE` | 4.0 to 5.2 | AMD modules and Mustache templates | `X.Y.Z-m400` |

A release is named after the delivery and the lowest Moodle version of the line, so `1.1.0-m400` and `1.1.0-m503` carry the same functions for different Moodle versions. The latest release is always the one of `main`.

## Usage

1. Open **Site administration → Server → Service Manager → Dashboard**.
2. Click **New schema**, fill in the **Guided form** or switch to the **YAML editor** and paste the YAML, and click **Create schema**. Tick **Generate token automatically** if you want the token at once.
3. Type in the search box and the list narrows as you type; choose **Healthy**, **Warning** or **Critical** in the summary to see only those. Tick rows and a bar floats at the bottom with what can be done to them: enable, disable, export or delete.
4. Click a schema to see its user, role and service, the state of each function, its token (shown once, with a copy button and regeneration) and its health history.
5. **Version history** lists every version; choose two and **Compare**, or **Roll back** to an earlier one.

Deleting a schema removes the user, the role, the service and the tokens it created. Every step is explained, with screenshots, in the [user manual](https://github.com/didactika/moodle-local_servicemanager/wiki).

## User manual

- **[User manual](https://github.com/didactika/moodle-local_servicemanager/wiki)**: a wiki with a start page that says what to read first, then the dashboard, creating and editing a schema, the schema page, versions and comparison, importing and exporting, administration and troubleshooting.
- The reference of the YAML format is in [docs/schema_reference.md](docs/schema_reference.md) and, inside Moodle, in the **Documentation** menu of the dashboard.
- The screenshots are taken from the real interface by `tests/behat/manual.feature`; run it with `--tags=@servicemanager_manual` to refresh them.

## Schema format

```yaml
meta:
  id: "myapp.users"                    # Required: unique identifier
  name: "My Application User Service"  # Required: display name
  version: "1.0.0"                     # Set by the plugin when it is missing or already used
  maintainer: "IT Department"          # Optional
  description: "User management API"   # Optional

requirements:                          # Optional
  plugins:
    - mod_forum
  download_files: false
  upload_files: false

definition:
  functions:                           # Required
    - core_user_get_users              # Simple form: critical
    - name: mod_forum_get_forums       # Extended form
      critical: false                  # Only a warning if it is missing
  extra_capabilities:                  # Optional
    - moodle/user:viewdetails
  additional_users:                    # Optional: users to authorise on the service
    - admin@example.com

role:                                  # Optional: what the role of the service may do
  context_levels:
    - course
  permissions:
    prevent:
      - moodle/user:delete
    prohibit:
      - moodle/site:config
  allow_assign:
    - student
  allow_view:
    - student
```

A schema has up to four sections: **`meta`** (who the service is), **`requirements`** (plugins it needs and whether it may download or upload files), **`definition`** (the functions it exposes, extra capabilities and extra users) and **`role`** (where the role can be assigned, the capabilities it is kept from or forbidden, and the roles it may assign, override, switch to and see). You never list the capabilities each function needs: the plugin reads them from Moodle. The complete field-by-field reference, with validation rules and naming patterns, is in **[docs/schema_reference.md](docs/schema_reference.md)**.

## Configuration

The plugin has a section of its own, **Site administration → Server → Service Manager**, with the **Dashboard**, the **Import** page and the **Settings**.

| Setting | Default | Meaning |
|---|---|---|
| `local_servicemanager/notification_emails` | empty | Comma-separated list of people who receive the health report. |
| `local_servicemanager/notify_admins` | on | Also send the report to the site administrators. |
| `local_servicemanager/notification_level` | warning | Lowest severity that sends an email: all, warning, error or critical. |
| `local_servicemanager/healthcheck_enabled` | on | Run the scheduled health check of every schema. |
| `local_servicemanager/cleanup_enabled` | on | Delete old health logs. |
| `local_servicemanager/cleanup_retention_days` | 30 | Days a health log is kept. |
| `local_servicemanager/version_retention_enabled` | on | Delete the oldest versions of a schema. |
| `local_servicemanager/version_retention_max` | 10 | Versions of each schema that are kept. |

### Permissions

| Capability | Context | Default |
|---|---|---|
| `local/servicemanager:view` | System | Manager |
| `local/servicemanager:manage` | System | Manager |

`local/servicemanager:manage` carries the configuration risk flag: whoever has it can create users, roles and tokens.

### Scheduled tasks

| Task | Does | Default schedule |
|---|---|---|
| `health_check_task` | Validates every schema and sends the report. | Daily at 2:00 |
| `cleanup_logs_task` | Removes old health logs. | Daily at 3:00 |

## Web service API

The plugin exposes its own REST API so that schemas can be managed from a pipeline. An external service, `ws_servicemanager`, is installed with the plugin: authorise a user who has `local/servicemanager:manage` on it and use its token.

| Function | Type | Does |
|---|---|---|
| `local_servicemanager_get_schemas` | read | Lists the schemas. |
| `local_servicemanager_get_schema` | read | Returns one schema. |
| `local_servicemanager_get_version` | read | Returns the YAML of one version of a schema. |
| `local_servicemanager_get_suggestions` | read | Suggestions for the autocomplete fields of the guided form. |
| `local_servicemanager_create_schema` | write | Creates a schema from YAML. |
| `local_servicemanager_update_schema` | write | Updates a schema with new YAML. |
| `local_servicemanager_delete_schema` | write | Deletes a schema and everything it provisioned. |

The dashboard also uses `local_servicemanager_set_enabled`, `local_servicemanager_rollback_schema` and `local_servicemanager_regenerate_token`, which are not part of the external service. Every function checks the capability of whoever calls it.

```bash
curl -X POST "https://yourmoodle.example.com/webservice/rest/server.php" \
  -d "wstoken=YOUR_TOKEN" \
  -d "wsfunction=local_servicemanager_create_schema" \
  -d "moodlewsrestformat=json" \
  -d "yamlcontent=meta:%0A  id: my.service%0A  ..." \
  -d "generatetoken=1"
```

## Development

The styles are written as nested SCSS (`styles.scss` and the partials in `scss/`) and compiled into the `styles.css` that is distributed; the pipeline checks that it is what the sources produce. The checks of the pipeline can be run in a Moodle checkout:

```bash
vendor/bin/phpunit --testsuite local_servicemanager_testsuite
php admin/tool/behat/cli/init.php
vendor/bin/behat --config /path/to/behatrun/behat.yml --tags=@local_servicemanager
vendor/bin/phpcs --standard=moodle local/servicemanager/
```

Changes go in by pull request from a branch, one for each line. Follow the [Moodle coding style](https://moodledev.io/general/development/policies/codingstyle), document public methods with PHPDoc and write tests for new behaviour.

## Troubleshooting

| Problem | Check |
|---|---|
| The schema is not created | The message says why: YAML syntax, an `id` that is already used (letters, numbers and dots only), a name that is already used, or a critical function this Moodle does not have (install the plugin or mark it `critical: false`). |
| The token does not copy | The copy button needs JavaScript and HTTPS; the token is shown once, so regenerate it from the schema page if it is lost. |
| The token does not work | Check that the service and its user are enabled and that the function is authorised. |
| No health emails | Check the cron, the recipients and the notification level in the settings. |
| A function is reported missing | The plugin that provides it is not installed or is disabled. |

More in the [troubleshooting chapter](https://github.com/didactika/moodle-local_servicemanager/wiki/Troubleshooting).

## Getting help

Open an [issue](https://github.com/didactika/moodle-local_servicemanager/issues) with your Moodle and PHP versions, the YAML of the schema and the exact message.
