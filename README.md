<div align="center">

<img src="pix/icon.svg" width="96" alt="Web Service Manager icon">

# Web Service Manager for Moodle

*Set up a Moodle web service from one YAML file: its user, role, functions and token*

[![Release](https://img.shields.io/github/v/release/didactika/moodle-local_servicemanager?filter=v*-m400&style=flat-square)](https://github.com/didactika/moodle-local_servicemanager/releases)
[![Moodle](https://img.shields.io/badge/Moodle-4.0_to_5.2-f98012?style=flat-square&logo=moodle&logoColor=white)](https://moodle.org)
[![PHP](https://img.shields.io/badge/PHP-7.4+-777bb4?style=flat-square&logo=php&logoColor=white)](https://www.php.net)
[![License](https://img.shields.io/badge/License-GPL_v3-blue?style=flat-square)](LICENSE)

[Overview](#overview) • [Installation](#installation) • [Usage](#usage) • [Schema format](#schema-format) • [Configuration](#configuration) • [Web service API](#web-service-api) • [Development](#development) • [Troubleshooting](#troubleshooting)

</div>

Web Service Manager (**local_servicemanager**) lets an administrator describe a complete Moodle web service in one version-controlled YAML file. For each schema the plugin creates the service user, the role with only the capabilities the service needs, the external service with its authorised functions and the token, and keeps all of them in line with the file every time it changes. A compromised token or a misbehaving consumer can reach only what its schema declares, and disabling or deleting the schema closes the door.

![The dashboard](https://raw.githubusercontent.com/wiki/didactika/moodle-local_servicemanager/images/dashboard.png)

## Overview

- **One schema, one closed room**: a dedicated service user, a dedicated role, a dedicated external service restricted to that user and those functions, and a token of its own.
- **Capabilities without hunting**: the capabilities each function needs are read from the function declarations in Moodle and assigned to the role; `webservice/rest:use` and `webservice/soap:use` are always included, and the schema can add more.
- **Two ways to write a schema**: a guided form with suggestions as you type for functions, plugins, users and capabilities, or the YAML editor. Editing opens the same form filled in, and a form whose changes are not saved asks before the page is left.
- **Versions numbered for you**: every change is a version. A schema without a version starts at `1.0.0`, and a change that does not raise it is saved with the next one (`1.0.0` becomes `1.0.1`). Saving without changing what the schema does keeps its version.
- **Roles**: say where the service role can be assigned, which capabilities it is kept from or forbidden, and which roles it may assign, override, switch to and see.
- **The state of Moodle**: a schema is enabled or disabled as its external service is. Disabling the service in the administration of Moodle disables the schema and suspends its user, and enabling it does the opposite.
- **Dashboard**: health summary (healthy, warning, critical), the state of the web services and their protocols, search that filters as you type and bulk actions in a floating bar.
- **History and comparator**: compare two versions side by side or unified, with a summary of what changed and arrows that go through each change, and roll back without leaving the page.
- **Health checks**: a scheduled task checks every enabled schema once a day. The results have a page of their own, filtered by status and a page at a time, and a report is mailed when a schema is not healthy.
- **Export and import**: download one schema or all of them in a ZIP archive, and import schemas from files, choosing what happens to one whose id is already used.
- **Automation**: the plugin has its own web service to create, read, update and delete schemas from a pipeline.

## Installation

> [!IMPORTANT]
> The health checks, their reports and the cleanup of old data run from the scheduled tasks of Moodle, so the [cron](https://docs.moodle.org/en/Cron) must be running.

**Requirements:** Moodle 4.0 to 5.2 and PHP 7.4 or newer, which the plugin declares in its `environment.xml` and Moodle checks on its Environment page. The PHP YAML extension is recommended; a parser is included when it is missing. Moodle 5.3 has a line of its own (`main`) with the same features.

**From a release:** download the matching release ZIP (`-m400`), open **Site administration → Plugins → Install plugins**, upload the package and follow the prompts.

**From Git:**

```bash
cd /path/to/moodle
git clone --branch MOODLE_400_STABLE https://github.com/didactika/moodle-local_servicemanager.git local/servicemanager
php admin/cli/upgrade.php --non-interactive
```

The plugin directory is `local/servicemanager`, or `public/local/servicemanager` on Moodle 5.1 and 5.2, which serve the code from `public/`.

### Branches and releases

| Branch | Moodle | Interface | Release |
|--------|--------|-----------|---------|
| `main` | 5.3 | React and TypeScript (ESM) | `X.Y.Z-m503` |
| `MOODLE_400_STABLE` | 4.0 to 5.2 | AMD modules and Mustache templates | `X.Y.Z-m400` |

A release is named after the delivery and the lowest Moodle version of the line, so `1.1.0-m400` and `1.1.0-m503` carry the same functions for different Moodle versions.

## Usage

1. Open **Site administration → Server → Web Service Manager → Dashboard**.
2. Click **New schema**, fill in the **Guided form** or switch to the **YAML editor**, and click **Create schema**. **Review as YAML** takes what the guided form has to the editor. Tick **Generate token automatically** to get the token at once; it is shown once, with a copy button.
3. Type in the search box and the list narrows as you type; choose **Healthy**, **Warning** or **Critical** in the summary to see only those. Tick rows and a bar floats at the bottom with what can be done to them: enable, disable, export or delete.
4. Click a schema to see its user, role and service, the state of each function, its token and a summary of its health checks. **View all health checks** opens all of them.
5. **Version history** lists every version; choose two and **Compare Versions**, or **Rollback** to an earlier one.

Deleting a schema removes the user, the role, the service and the token it created. Every step is explained, with screenshots, in the [user manual](https://github.com/didactika/moodle-local_servicemanager/wiki). The reference of the YAML format is in [docs/schema_reference.md](docs/schema_reference.md) and, inside Moodle, in the **Documentation** menu of the dashboard.

## Schema format

```yaml
meta:
  id: "myapp.users"                    # Required: letters, numbers and dots
  name: "My Application User Service"  # Required: display name
  version: "1.0.0"                     # Optional: set by the plugin when it is missing or already used
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

A schema has up to four sections: **`meta`** (who the service is), **`requirements`** (plugins it needs and whether it may download or upload files), **`definition`** (the functions it exposes, extra capabilities and extra users) and **`role`** (where the role can be assigned, the capabilities it is kept from or forbidden, and the roles it may assign, override, switch to and see). You never list the capabilities each function needs: the plugin reads them from Moodle. The complete reference, with validation rules and naming patterns, is in **[docs/schema_reference.md](docs/schema_reference.md)**.

## Configuration

The plugin has a section of its own, **Site administration → Server → Web Service Manager**, with the **Dashboard**, **Import Schemas** and **Settings**.

| Setting | Default | Meaning |
|---|---|---|
| `notification_emails` | empty | Comma-separated addresses that receive the health report. |
| `notify_admins` | on | Also send the report to the site administrators. |
| `notification_level` | Warning | When the report is mailed: with *All* after every run, and with *Warning* or *Critical* only when a schema is not healthy. |
| `healthcheck_enabled` | on | Run the daily health check. With it off, no schema is checked and no report is mailed. |
| `cleanup_enabled` | on | Delete old health logs. |
| `cleanup_retention_days` | 30 | Days a health log is kept. |
| `version_retention_enabled` | on | Delete the oldest versions of a schema. |
| `version_retention_max` | 10 | Versions of each schema that are kept. |

### Permissions

| Capability | Context | Given by default to |
|---|---|---|
| `local/servicemanager:view` | System | Manager |
| `local/servicemanager:manage` | System | Site administrators only |

> [!WARNING]
> `local/servicemanager:manage` carries the configuration and personal data risks: whoever has it creates users, roles with any capability and tokens, and the guided form looks up the users of the site. Give it to another role only on purpose. Upgrading from an earlier release takes it away from the roles of the manager archetype.

### Scheduled tasks

| Task | Default schedule | Does |
|---|---|---|
| `health_check` | Daily at 07:00 | Checks the functions, user, service and token of every enabled schema, keeps the result and mails the report. It also takes the state of a web service that was changed in Moodle without an event, such as from a script. |
| `scheduled_validation_task` | Daily at 03:00 | Validates every schema against this Moodle and writes the result to the log of the task. |
| `version_cleanup_task` | Daily at 02:00 | Keeps the newest versions of each schema, as the version retention settings say. |
| `cleanup_logs` | Every minute | Deletes health logs older than the retention days, when log cleanup is on. |

## Web service API

The plugin exposes its own REST API so that schemas can be managed from a pipeline. An external service, `ws_servicemanager`, is installed with the plugin with these functions; authorise a user who has `local/servicemanager:manage` on it and use its token.

| Function | Type | Does |
|---|---|---|
| `local_servicemanager_get_schemas` | read | Lists the schemas. |
| `local_servicemanager_get_schema` | read | Returns one schema with its YAML. |
| `local_servicemanager_create_schema` | write | Creates a schema from YAML, with a token when `generatetoken` is set. |
| `local_servicemanager_update_schema` | write | Updates a schema with new YAML. |
| `local_servicemanager_delete_schema` | write | Deletes a schema and everything it provisioned. |

The interface of the plugin also calls `local_servicemanager_get_version`, `local_servicemanager_get_suggestions`, `local_servicemanager_set_enabled`, `local_servicemanager_rollback_schema` and `local_servicemanager_regenerate_token`, which are not part of the external service. Every function checks the capability of whoever calls it.

```bash
curl -X POST "https://yourmoodle.example.com/webservice/rest/server.php" \
  -d "wstoken=YOUR_TOKEN" \
  -d "wsfunction=local_servicemanager_create_schema" \
  -d "moodlewsrestformat=json" \
  --data-urlencode "yamlcontent@schema.yaml" \
  -d "generatetoken=1"
```

## Development

The interface is written in AMD modules (`amd/src`, built into `amd/build` with `grunt amd`) and Mustache templates. The styles are written as nested SCSS (`styles.scss` and the partials in `scss/`) and compiled into `styles.css` with `node tools/build-styles.mjs <Moodle checkout>`; the pipeline checks that `styles.css` is what the sources produce. The tests run in a Moodle checkout:

```bash
vendor/bin/phpunit --testsuite local_servicemanager_testsuite
php admin/tool/behat/cli/init.php
php admin/tool/behat/cli/run.php --tags=@local_servicemanager
```

The screenshots of the user manual are taken from the real interface by `tests/behat/manual.feature`; run it with `--tags=@servicemanager_manual` to refresh them.

## Troubleshooting

| Problem | Check |
|---|---|
| The schema is not created | The message says why: YAML syntax, an `id` that is already used (letters, numbers and dots only), a name that is already used, or a critical function this Moodle does not have (install the plugin that provides it or mark it `critical: false`). |
| The token is lost | It is shown once. Make a new one from the page of the schema. |
| The token does not work | The web services and the protocol must be enabled (the dashboard shows both, with the buttons to turn them on), the schema must be enabled and the function authorised. |
| A schema is disabled and nobody disabled it here | Its external service was disabled in **Site administration → Server → Web services → External services**; the schema follows the state of its service. |
| No health checks are listed | Check that **Enable health check** is on, that the cron runs and that the schema is enabled: disabled schemas are not checked. |
| No health emails | Check the recipients and the notification level in the settings, and the outgoing mail of Moodle. |
| A function is reported missing | The plugin that provides it is not installed or is disabled. |

More in the [troubleshooting chapter](https://github.com/didactika/moodle-local_servicemanager/wiki/Troubleshooting).

## Getting help

Open an [issue](https://github.com/didactika/moodle-local_servicemanager/issues) with your Moodle and PHP versions, the YAML of the schema and the exact message.
