---
title: Quick start
summary: Turn the web services on and create a service with its own user, role and token in five minutes.
order: 20
---

## Before you start

1. In **Site administration → Server → Web services → Overview**, turn the web services on and turn on a protocol (REST is
   the usual one). The dashboard shows the state of the services of the site, and of each protocol, next to its title, so you can
   check it there.
2. Your account needs the capability `local/servicemanager:manage` (an administrator has it) to create schemas, and
   `local/servicemanager:view` to look at them.

## Create the schema

1. Open **Site administration → Server → Web Service Manager → Dashboard**.
2. Press the round blue **+** (**New schema**).
3. In **Guided form**, fill in:
   - **Schema ID**: a short name that does not change, such as `crm.sync`.
   - **Name**, and the **Version** if you want one (left empty it is 1.0.0, and the plugin raises it for you later).
   - **Required functions**: start typing, for example `core_user`, and choose from the suggestions.
4. Leave **Generate token automatically** on and press **Create schema**.

![The guided form](asset:create-guided.webp)

## Copy the token

The page of the schema opens with a green box with the token. **Copy it now: it is shown once.** If you lose it, the
[schema page](page:guides/schema-page) has a key button that makes a new one: it asks you to confirm in a window and shows the new token right there, small, with a copy button.

## What was created

On the schema page, **Provisioned Resources** lists the service user, the role and the external service, with a link to each.
The role has only the capabilities that the functions you chose need. Call the service with the token:

```bash
curl "https://your.moodle/webservice/rest/server.php" \
  -d wstoken=YOUR_TOKEN -d wsfunction=core_webservice_get_site_info -d moodlewsrestformat=json
```
