---
title: Permissions, settings and health check
summary: Who can see and change schemas, every setting and the scheduled checks.
order: 20
---

## Permissions

| Capability | Who has it by default | What it allows |
|---|---|---|
| `local/servicemanager:view` | Managers | See the dashboard, the schemas, their history and the comparison. |
| `local/servicemanager:manage` | Managers | Create, edit, enable, disable, delete and import schemas, make tokens and roll back. |

The buttons that change something do not appear for someone who can only view.

## Settings

They are in **Site administration → Server → Web Service Manager → Settings**.

| Setting | What it does |
|---|---|
| **Notification emails** | Addresses (comma separated) that receive the report of the health check. |
| **Also notify site administrators** | Sends it to the administrators too. |
| **Notification level** | The least severe status that sends a notification: all, warning or critical. |
| **Enable health check** | Runs the scheduled health check of the schemas. |
| **Enable cleanup** and **Log retention (days)** | Delete the logs of the health checks that are older than the days you say (30 by default). |
| **Enable Version Retention** and **Max Versions Per Schema** | Keep only the latest versions of each schema in the history, deleting the oldest first. |

## The health check

A scheduled task goes through every schema and checks that what it provisioned is still there and works: the functions (and whether
this Moodle still has them), the service user, the service and the token. Each schema is left as **Healthy**, **Warning** (something that
is not critical is missing) or **Critical** (something that it needs is missing), and the result is written in the log of its page. The
tasks of the plugin (the health check, the validation, the cleanup of logs and the cleanup of versions) are in **Site administration →
Server → Scheduled tasks**.
