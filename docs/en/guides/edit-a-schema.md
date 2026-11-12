---
title: Edit a schema
summary: Change a schema with the same form, and how the version follows.
order: 30
---

Press the pencil of a schema, in the dashboard or in its page. It opens **the same form that creates a schema, already filled in**,
with the two tabs: the guided form and the YAML editor.

![Editing a schema](asset:edit-guided.webp)

## What is different from creating

- **Schema ID** is shown but cannot be changed. To use another ID, create a new schema.
- There is no token option. The token is managed in the [schema page](page:guides/schema-page).
- The button says **Save changes**, and **Cancel** goes back to the schema.

## What saving does

The plugin brings the service user, the role, the service and its functions in line with what you wrote: what you added is
created, and what you removed is taken away, including what the role could assign, override, switch to and see.

## The version

You can leave the **Version** empty. If you change the **definition** (the functions, the capabilities, the plugins, the file access or the role), the plugin saves the
next version by itself: the highest that the schema has had, with 1 added to the last number, and the page says which one it used. If you write one that is higher, it is kept. Changing only the name, the
maintainer or the description does not change the version. Every new version is kept in the [history](page:guides/versions-and-comparison), where the rules are in a table.

## Old links

`edit.php?id=…` still works: it opens this form.
