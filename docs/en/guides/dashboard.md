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
| 1 | [The actions of the page](#1-the-actions-of-the-page) | Read the documentation, export every schema, import schemas and create one. |
| 2 | [The summary](#2-the-summary) | How healthy the schemas are, and whether the web services and their protocols are on. |
| 3 | [Search and filters](#3-search-and-filters) | Narrow the list by name, status and date. |
| 4 | [The list](#4-the-list) | The schemas, with the actions of each one and the pages of the list. |

## 1. The actions of the page

At the right of the head of the page:

| Button | What it does |
|---|---|
| **Documentation** | A menu with the [YAML reference](page:reference/yaml), this manual and the documentation of Moodle. |
| **Export All** | Every schema in one ZIP. |
| **Import Schemas** | [Files and archives](page:guides/import-and-export). |
| **New schema** | The [guided form](page:guides/create-a-schema). |

On a narrow screen, such as a phone, the buttons go under the description of the page.

![The documentation menu](asset:dashboard-documentation-menu.webp)

## 2. The summary

The first line shows how many schemas there are and how they split into **Healthy**, **Warning** and **Critical**, as a bar and as a count of each status. A
schema is checked on a schedule (see [Administration](page:reference/settings)) and its status is the worst thing the check found.

The second line shows whether the web services of the site are **Operational**, **Disabled** or have **No protocols enabled**, and a button for each protocol
(REST, SOAP), marked when it is on. A person who can change the configuration of the site turns them on or off from here, without opening the
administration of Moodle and without reloading the page; a message confirms each change:

- **Enable web services** turns the web services of the site on. **Turn off web services** turns them off, after a confirmation, since every web service of the
  site stops answering.
- The button of a protocol turns that protocol on or off.

Each change is saved as the administration of Moodle saves it, so it is kept in the log of the configuration of the site with its previous value. **Manage**
opens the settings of the protocols. The [page of a schema](page:guides/schema-page) shows the same state of the web services at its top.

## 3. Search and filters

Above the list:

- **Search name...** narrows the list as you type. The words are looked for in the name, the schema ID and the version, and all of them must be there;
  **Esc** clears the search.
- **Status** lists the statuses with the number of schemas of each, counted inside the search and the date; tick one or more to see only those schemas.
- **Last Modified** limits the list to a period: today, the last seven days, the current month, the last thirty days or two dates of your choice. The first
  date is never after the last one: a date that passes the other moves the other one to it.

A menu that narrows the list is highlighted and shows only what it is narrowed to, for example **Healthy**, or **Status: 2** when two statuses are ticked; the
cross that replaces its arrow removes that filter. The button with the reload icon at the end of the row removes the search and every filter at once. When the
menus do not fit beside the search, for example on a phone, they are gathered in one menu, **Filters**, with the funnel icon; the button that removes the
search and every filter is then the last item of that menu.

When the search and the filters match no schema, the list says so where its rows were, at the same height, with a button that removes the search and every
filter.

![The Status menu, with the schemas of each status](asset:dashboard-filters.webp)

What you ask for is kept in the address, so a refresh, or a link that you share, shows the same list.

## 4. The list

The list keeps one height whatever it holds, the room the window leaves it, so on a computer the filters, the list and its pager fit the screen; when it has
more schemas than fit, it scrolls inside its box with the headings in view. Its columns keep their width when a filter changes the rows. Under it, **Rows per
page** offers the sizes smaller than the list, and **All**: a list of up to 12 schemas shows all of them; one of 13 to 24 offers 12 or all; and so on up to 12,
24, 48 and 96. The arrows move to the previous and the next page. The history of a schema and its health checks have the same pager.

Each row ends with round buttons: the eye (**View**), the pencil (**Edit**, which opens the [form that creates a schema, already filled
in](page:guides/edit-a-schema)), the clock (**Version History**) and the three dots, which open **Export**, **Disable** or **Enable** and **Delete**. Disabling and
enabling change the row where it is and say so in a message; deleting asks you to confirm first.

### Choosing several schemas

Tick the schemas, or **Select all** in the header, and a bar floats at the bottom of the screen with how many are chosen and what you can do with them:
**Enable**, **Disable**, **Export** and **Delete** (which asks you to confirm). **Enable** appears only when one of them is disabled, and **Disable** only when one
is enabled. The cross at its end clears the choice, and the bar goes away when nothing is chosen.

![Choosing several schemas](asset:dashboard-selection.webp)

## Colour modes

In Moodle 5.3 the dashboard follows the colour mode of the site and the changes that the theme makes to the colours. In the earlier releases it takes the colours of the theme.

![The dashboard in the dark mode](asset:dashboard-dark.webp)
