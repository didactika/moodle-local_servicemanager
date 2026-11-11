---
title: Troubleshooting
summary: What to check, error by error.
order: 90
---

## The fields that suggest as you type fail with "invalidrecord"

The error mentions `local_servicemanager_get_suggestions` in `external_functions`. The plugin was updated without the upgrade, so
Moodle does not know its new web service functions. Open **Site administration → Notifications**, or run
`php admin/cli/upgrade.php`.

## "Web services: Disabled" on the dashboard

The web services of the site are off. Turn them on in **Site administration → Server → Web services → Overview**. If the dashboard
says **Warning**, they are on but no protocol is.

## The schema was created, with warnings

A **Warning** is not an error. The usual ones are a function that this Moodle does not have (a plugin that is not installed) and a
capability that it does not know. The schema works with what exists; install the plugin and the warning goes away at the next health
check.

## "A schema with ID … already exists" or "with the name … already exists"

The ID and the name of a schema are unique. When you edit a schema, its own ID and name are not a conflict.

## "Changing the Schema ID is not allowed"

The ID of a schema cannot change. Create a new schema with the new ID and delete the old one.

## The version is not the one I wrote

When you change the definition of a schema and the version is empty, already used, or lower than one that the schema has had, the plugin saves the next one (the last number plus 1) and says so in a message
at the top of the page. This is not an error: write a higher version yourself if you want a particular one. See [Versions and comparison](page:guides/versions-and-comparison#where-a-version-number-comes-from).

## The token does not work

A token is shown once. If it was lost, or you generated a new one, the old one no longer works: press the key or refresh icon in
**Access and requirements** of the schema page. Check as well that the schema is enabled: a disabled schema suspends its user.

## A function returns "access control exception"

The role has only the capabilities that the functions need. Press **N capabilities** on the function to see them, and add what is
missing in **Extra Capabilities**. For the functions that assign, override, switch or see roles, the role also needs the
[`role` section](page:reference/yaml#role-optional).

## The import does not take a file

It takes `.yaml`, `.yml` and `.zip`. A ZIP must have the YAML files inside, not a folder of them nested more than once.
