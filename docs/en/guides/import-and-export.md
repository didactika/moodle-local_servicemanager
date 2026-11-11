---
title: Import and export
summary: Move schemas between sites with files and archives.
order: 60
---

## Import

From the dashboard, the green arrow (**Import Schemas**) opens the import page.

![Import](asset:import.webp)

Choose a file in **Import File**:

- a `.yaml` or `.yml` file with one schema, or
- a `.zip` with several (each one a YAML file).

**Generate token automatically** makes a token for each schema that is created. **When schema ID exists** says what to do with a
schema whose ID is already on the site:

| Choice | What happens |
|---|---|
| **Skip (keep existing)** | The schema on the site is left as it is. |
| **Overwrite (replace existing)** | The schema on the site is updated with the file (the version has to follow the [rules of versions](page:guides/versions-and-comparison#where-a-version-number-comes-from)). |
| **Rename (add .imported suffix)** | The file is created as a new schema, with `.imported` added to its ID. |

When it finishes, a page tells you, schema by schema, what was **created or updated**, what was **left alone** and what **failed**,
and why. A schema that fails does not stop the others.

## Export

| Where | What it exports |
|---|---|
| The download icon of the schema page, or **Export** in the three dots of a row | One schema, as a YAML file. |
| The file icon of the dashboard (**Export all**) | Every schema, in one ZIP. |
| **Export** in the floating bar | The schemas you chose, in one ZIP. |

The exported files are the YAML that is stored, so they can be imported into another site, committed to a repository or used to
create the same service on each environment.

## Example file

The [YAML reference](page:reference/yaml) page of the plugin has a **Download Example** button with a file that has every section.
