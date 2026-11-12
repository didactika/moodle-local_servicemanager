---
title: Create a schema
summary: The guided form with suggestions as you type, and the YAML editor.
order: 20
---

**New schema** has two tabs: a **Guided form**, which asks for each thing in turn, and a **YAML editor**, where you write or paste
the file. Both end in the same YAML and go through the same checks.

## The guided form

![The guided form](asset:create-guided.webp)

| Section | What you fill in |
|---|---|
| **Identity** | **Schema ID** (letters, numbers and dots, never changed afterwards), **Name** (unique), **Version** (optional: when empty the schema starts at 1.0.0), **Maintainer** and **Description**. |
| **Functions** | **Required functions** block the creation if this Moodle does not have them; **Optional functions** only warn. |
| **Access and requirements** | **Extra capabilities**, **Additional users**, **Required plugins** and whether the service may download or upload files. |
| **Role** | Where the role can be assigned and which other roles it may assign, override, switch to and see. See [the role section](page:reference/yaml#role-optional). |
| **Token** | **Generate token automatically** creates a token for the service user and shows it once. |

### Suggestions as you type

The fields of functions, capabilities, plugins and users search while you type and show at least ten matches (more if there
are). Choose one with the mouse or with **Enter**. A field that takes free text, such as the extra capabilities, also accepts
what you type if it is not in the list: a capability of a plugin that is not installed yet is only a warning.

### Review as YAML

**Review as YAML** takes what you filled in to the YAML editor, so you can add what the form does not ask for and keep working
there.

## The YAML editor

Write or paste the YAML in **YAML Content**. The [YAML reference](page:reference/yaml) describes every field. The page tells you what is
wrong at the field that has it, before anything is created.

![The YAML editor](asset:create-yaml.webp)

## What happens when you create it

The plugin creates the service user, the role with the capabilities that the functions need, the external service with those
functions, and, if you asked for it, the token. It then opens the schema page. A schema that has warnings, for example a function
that this Moodle does not have, is created and the page tells you.
