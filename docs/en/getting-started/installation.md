---
title: Installation
summary: Requirements, how to install the plugin, how to update it and how to remove it.
order: 10
---

## Requirements

| Moodle | Branch | Releases |
|---|---|---|
| 4.0 to 5.2 | `MOODLE_400_STABLE` | `X.Y.Z-m400` |
| 5.3 | `main` | `X.Y.Z-m503` |

Both lines look the same and do the same. The 5.3 line follows the colour modes of Moodle, including the dark one.

## Install

Download the ZIP of the release that matches your Moodle, go to **Site administration > Plugins > Install plugins**, upload the file and follow the prompts. The plugin can also be installed from the Moodle plugins directory.

To install from Git, put the plugin in `local/servicemanager` (in `public/local/servicemanager` on Moodle 5.3, which serves its code from the `public` folder) and run:

```bash
php admin/cli/upgrade.php
```

## Who can use it

| Capability | Who has it by default | What it allows |
|---|---|---|
| `local/servicemanager:view` | Managers | See the dashboard, the schemas, their history and the comparison. |
| `local/servicemanager:manage` | Managers | Create, edit, enable, disable, delete and import schemas, make tokens and roll back. |

The next step is the [quick start](page:getting-started/quick-start).

## Update

After you update the code, open **Site administration > Notifications** (or run `php admin/cli/upgrade.php`). Moodle registers the web service functions of the plugin when its version changes, so skipping the upgrade makes the fields that suggest as you type fail.

## Uninstall

Uninstalling the plugin deletes every schema first, and with each one its service user, role, service and token.
