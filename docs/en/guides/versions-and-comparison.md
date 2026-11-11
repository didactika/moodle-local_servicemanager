---
title: Versions and comparison
summary: The history, the YAML of each version, the comparison and the way back.
order: 50
---

Every time the definition of a schema changes, the plugin keeps the version. **Version History**, from the clock in the dashboard
or in the schema page, lists them.

![The history, with its parts numbered](asset:history-marked.webp)

| # | Part |
|---|---|
| 1 | Search, by version, user, date or reason. |
| 2 | Filters: dates and size of the page, with the count of the ones that are on. |
| 3 | A version: tick it to compare it. |
| 4 | What you can do with a version. |

## The list

Each version is one row: its number, **Current** if it is the one the schema has now, who made it and when, and why. The search and the filters work as
in the dashboard. There is no edit button here: to change the schema, edit it from the [dashboard](page:guides/dashboard) or its [page](page:guides/schema-page). At the end of each row there are three round buttons, always in the same place: the one that a row does not have (the current version cannot be rolled back to) leaves its place empty, so the buttons of the same kind line up from one row to the next.

- the code icon opens its YAML below the row, loaded when you ask for it, with a **Copy** button;
- the eye opens the page of the schema as it was in that version;
- the arrow that goes back (**Rollback**) brings the schema back to that version; it is not offered for the current one. It opens a window that asks you to confirm, and the history changes where it is: the version that is current moves, the state that was left is kept as a backup when it was not in the history already, and a message says so. The page is not reloaded.

![The window that asks before a rollback](asset:history-rollback.webp)

## Comparing two versions

Tick two versions ("Choose version …"). Nothing floats on the screen until you tick one; then a bar appears at the bottom with how many are chosen, a cross to clear the choice and the **Compare Versions**
button, which is available only when two are chosen. Ticking a third one shows a warning.

![Two versions chosen](asset:history-compare.webp)

The comparison has three parts:

![The comparison, with its parts numbered](asset:compare-marked.webp)

| # | Part | What it is for |
|---|---|---|
| 1 | **What changed** | The changes said in terms of the schema and not of lines. It is a card that folds: press its title to hide it or show it. Each change is a small label with the colour of what it did: green for what was added, red for what was removed and yellow for what changed, with the old value crossed out and the new one next to it. They are grouped by area: fields, functions, capabilities, users, plugins, file access and role. |
| 2 | The tools | **Side by side** or **Unified** changes how the lines are laid out. **Only the changes** (on by default) folds the lines that did not change, keeping two around each difference; press a fold to open it. |
| 3 | The lines | The two versions, with a tint under what changed. |
| 4 | The bar of changes | A bar at the bottom of the screen goes through the changes. |

## Going through the changes

The bar at the bottom of the screen has two arrows, up and down, and between them which change you are at (*Change 3 of 12*) and where it is (*Line 14 · Added*). The down arrow goes to the next change and the up arrow to the previous one; after the last one it starts again from the first. Before you press any, it says how many there are. It only appears when the two versions differ.

![The bar that goes through the changes](asset:compare-next.webp)

## Where a version number comes from

You do not have to write one. The plugin keeps the numbers going up so that a change is never refused for not raising the version:

| What you did | The version that is saved |
|---|---|
| Created a schema and left the version empty | **1.0.0**, always. |
| Changed the definition and left the version empty | The highest the schema has had, with **1 added to the last number** (1.0.3 becomes 1.0.4). |
| Changed the definition and wrote a version that was already used, or a lower one | The same: the highest, plus 1 in the last number. The page tells you which one it used. |
| Wrote a version that is higher than all of them | The one you wrote. |
| Changed only the name, the maintainer or the description | The version stays. |

## Rolling back

**Rollback** brings the schema back to an earlier version: the user, the role, the service and the functions are brought in line with
it. If the state you leave is not in the history yet, it is kept there first with the reason *Backup before rollback*, so nothing is lost; the rollback itself does not add a row. This is the only way a schema can go back to a lower version number.
