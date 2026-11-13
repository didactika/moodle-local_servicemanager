---
title: The dashboard
summary: The state of the web services, the health of the schemas, search, filters and the actions of the list.
order: 10
---

The dashboard is the home of the plugin. It tells you, at a glance, whether the web services of the site work and how healthy your schemas are,
and it lists the schemas so you can open, change, export or remove them. You reach it from **Site administration > Server > Web Service Manager > Dashboard**.

![The dashboard, with its parts numbered](asset:dashboard-marked.webp)

| # | Part | What it is for |
|---|---|---|
| 1 | [State of the web services](#1-the-state-of-the-services) | Whether the site can serve web services and with which protocols; the button to turn on what is off. |
| 2 | [Health summary](#2-the-health-summary) | How many schemas are healthy, in warning or critical; also the status filter. |
| 3 | [Search](#3-search) | Narrows the list while you type. |
| 4 | [Filters](#4-filters) | Dates and size of the page; a badge counts the filters that are on. |
| 5 | [The actions](#5-the-actions) | Create, import, export and read the documentation. |
| 6 | [The actions of a schema](#6-the-actions-of-a-schema) | View, edit, history and the rest, in each row. |

## 1. The state of the services

Next to the title there is one line: whether the web services of the site are **Operational**, **Disabled** or **Warning** (on,
but with no protocol), and each protocol (REST, SOAP, XML-RPC) with a check mark if it is on and a grey icon if it is not. The same line is shown, in the same place,
at the top of the [page of a schema](page:guides/schema-page), so you can see it wherever you work.

When the web services are off, or on without a protocol, a button says **Enable web services** or **Enable a protocol** and leads straight to the setting in the
administration of Moodle, so you do not have to look for it. **Manage** leads to the settings of the protocols.

## 2. The health summary

The bar shows how many schemas there are and how they split into **Healthy**, **Warning** and **Critical**. A schema is checked on a schedule (see
[Administration](page:reference/settings)) and its status is the worst thing the check found.

The three buttons at its right are also the status filter: press one to see only those schemas, press it again to see them all. A status that no
schema has is dimmed and cannot be chosen. The numbers follow the search and the dates, so each button tells you what it would leave.

## 3. Search

Type in **Search name...** and the list narrows as you type. There is no button to press. The words are looked for in the
name, the schema ID and the version, and all of them must be there; **Esc** clears the search, and so does the cross at its right (there is only one cross, the one of the box). The box is a pill with the magnifier inside; while it has text it takes the colour of the theme.

## 4. Filters

**Filters**, next to the search, opens a panel with the dates (from and to). What you
choose applies at once, so there is nothing to confirm. A round badge on the corner of the button counts the filters that are on, and the button takes the colour of the
search box while they are. The reload icon at the top right of the panel puts every filter back. The funnel and the reload icon are icons of Moodle, so a site can restyle them with Icon Restyle.

![The filters panel](asset:dashboard-filters.webp)

The list keeps the same height whatever it holds and scrolls inside its box, with the headings in view. Under it, **Rows per page** offers the sizes smaller than the list, and **All**: a list of up to 12 schemas shows all of them; one of 13 to 24 offers 12 or all; and so on up to 12, 24, 48 and 96. The arrows move to the previous and the next page. The history of a schema and its health checks have the same pager.

What you ask for is kept in the address, so a refresh, or a link that you share, shows the same list.

## 5. The actions

At the right of the search there are four buttons:

| Button | What it does |
|---|---|
| Blue **+** | **New schema**: the [guided form](page:guides/create-a-schema). |
| Green arrow | **Import Schemas**: [files and archives](page:guides/import-and-export). |
| Blue file | **Export all**: every schema in one ZIP. |
| Book with a small arrow | **Documentation**: a menu with the [YAML reference](page:reference/yaml), this manual and the documentation of Moodle. |

![The documentation menu](asset:dashboard-documentation-menu.webp)

## 6. The actions of a schema

Each row has four round buttons: the eye (**View**), the pencil (**Edit**, which opens the [form that creates a schema, already filled in](page:guides/edit-a-schema)), the clock
(**Version History**) and the three dots, which open **Export**, **Disable** or **Enable** and **Delete**. Disabling and enabling change the row where it is and say so
in a message; deleting asks you to confirm in a window first.

## Choosing several schemas

Tick the schemas, or **Select all** in the header, and a bar floats at the bottom of the screen with how many are chosen and what
you can do with them: **Enable**, **Disable**, **Export** and **Delete** (which asks you to confirm). **Enable** appears only when
one of them is disabled, and **Disable** only when one is enabled. The cross at its left clears the choice, and the bar goes away when nothing is chosen.

![Choosing several schemas](asset:dashboard-selection.webp)

## Colour modes

In Moodle 5.3 the dashboard follows the colour mode of the site and the changes that the theme makes to the colours. In the earlier releases it takes the colours of the theme.

![The dashboard in the dark mode](asset:dashboard-dark.webp)
