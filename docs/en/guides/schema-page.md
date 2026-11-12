---
title: The schema page
summary: Everything a schema is and has made, and its state, in one page.
order: 40
---

The page of a schema is where you see everything the schema is and has made, and where you change its state without leaving it. You open it from the name or the eye of a schema in the [dashboard](page:guides/dashboard).

![A schema, with its parts numbered](asset:schema-marked.webp)

| # | Part | What it is for |
|---|---|---|
| 1 | [State of the web services](#1-state-of-the-web-services) | The same line as in the dashboard, with the buttons to turn on what is off. |
| 2 | [Schema Information](#2-schema-information) | The description, version, dates and whether it is enabled. |
| 3 | [The actions](#3-the-actions) | Edit, history, export, disable and delete, as round icons. |
| 4 | [Access and requirements, and Role](#4-access-and-requirements) | The lists: token, file access, plugins, capabilities and the role. |
| 5 | [Functions](#5-functions) | What the service can call. |

## 1. State of the web services

At the right of the title, at the same level as in the dashboard, you see whether the web services are **Operational**, **Disabled** or in **Warning**, each protocol, and the
button **Enable web services** or **Enable a protocol** when something is off. A schema can be perfect and still not answer if the site has the web services off; this tells you so.

## 2. Schema Information

The main column, at the left, has the information of the schema, its functions and what it created. It starts with the description and, in one row, the version, when it was created and last modified and whether it is enabled
(and the maintainer, if the schema has one).

## 3. The actions

At the right of the title of **Schema Information** there are the actions, as round icons:

| Icon | What it does |
|---|---|
| Pencil | **Edit**: the [form](page:guides/edit-a-schema), filled in. |
| Clock | **Version History**: the [history](page:guides/versions-and-comparison). |
| Download | **Export** this schema as a YAML file. |
| Switch | **Disable** or **Enable**. A disabled schema suspends its service user and its service. The page changes where it is and says so in a message; it does not reload. |
| Bin | **Delete**: removes the schema and everything it created. It asks you to confirm in a window. |

## 4. Access and requirements

The column at the right has the access and the role: the things that are lists.

The **Token** (active or none) with a button that makes one, or a new one. A window asks you to confirm, the token appears right there, small, with a
copy button, and it is shown once; a new token makes the old one stop working. Then the **File Access** (download and upload), the **Required Plugins** (with a
warning for one that is not installed) and the **Extra Capabilities**, as chips. When there are more than eight, the first ones are shown and a `+N` button opens all of them
in a window that scrolls, with a search.

### Role

When the schema says what the role may do, a card lists, each in its own block with how many there are, where the role can be assigned and which roles it may
assign, override, switch to and see, and which capabilities it is kept from or forbidden. A long list shows the first chips and a `+N` button that opens all of them.

![A schema with a role](asset:schema-role.webp)

## 5. Functions

Each function has an icon (a pen for the ones that write, an eye for the ones that read), its name, **Read** or **Write**, **Critical**
if the schema needs it, what Moodle says it does, and a badge if this Moodle does not have it. With eight functions or more, a search box
appears above the list.

Press **N capabilities** to see, in a window, the capabilities that whoever calls the function must have. The window has a fixed title and a fixed foot,
and the list scrolls between them.

![The capabilities of a function](asset:schema-capabilities.webp)

## Provisioned Resources

At the left, under the functions: the **service user**, the **service role** and the **external service**, each with a link to its page in Moodle, its name and its identifier. The identifiers (everywhere in the plugin)
are shown in a small label with a fingerprint icon.

## Health check

The log of the scheduled health checks (see [Administration](page:reference/settings)), which you can filter by status.

## Windows

The questions (delete, make a token, roll back) and the long lists open in a window over the page. It closes with the round cross at its top right, with its button or with **Esc**. Its
title and its buttons stay in place, and what is between them scrolls. A question names what it is about and its main button says what it will do.
