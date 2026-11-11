---
title: How a schema becomes a service
summary: What a schema is, what the plugin creates from it and how it keeps both in line.
order: 10
---

## A schema is a closed room

A schema is a YAML file that says what one consumer of your Moodle needs: the functions it calls, the extra capabilities it requires and, if you want, what its role may do. For each schema the plugin creates, and keeps in line:

| What | Why it exists |
|---|---|
| A **service user** | The identity the consumer calls Moodle with. |
| A **role** | Holds only the capabilities that the functions need, plus the ones you add. |
| An **external service** | The list of functions the consumer may call. |
| A **token** | What the consumer sends with every call. It is shown once, when it is made. |

Each schema has its own user, role, service and token, so a leaked token or a misbehaving consumer reaches only what its schema declares.

## What you write and what the plugin works out

You list the functions. You never list the capabilities each function needs: the plugin reads them from the declarations of Moodle's web service functions and gives them to the role. Capabilities that the functions do not imply go in `extra_capabilities`, and the section `role` says where the role can be assigned and which roles it may assign, override, switch to and see. [The YAML reference](page:reference/yaml) describes every field.

## The life of a schema

| Step | What the plugin does |
|---|---|
| **Create** | Creates the user, the role, the service and, if you ask for it, the token. A function that is missing blocks the creation if it is critical, and only warns if it is not. |
| **Edit** | Brings everything in line with the new YAML: what you added is created and what you removed is taken away. A change of the definition saves a new [version](page:guides/versions-and-comparison). |
| **Disable** | Suspends the service user and the service. Nothing is deleted. |
| **Enable** | Gives them back. |
| **Roll back** | Brings the schema back to an earlier version, after keeping the state it leaves. |
| **Delete** | Removes the schema and everything it created: the user, the role, the service and the token. |

## It keeps watching

A scheduled task checks every schema and leaves it **Healthy**, **Warning** or **Critical**: whether what it created is still there and works, and whether this Moodle still has the functions. The result is written in the log of the schema page and, if you set it, sent by email. See [permissions, settings and health check](page:reference/settings).

## The names of what is created

The user, the role and the service take their names from the ID and the name of the schema, so both must be unique. The patterns are in the [YAML reference](page:reference/yaml#naming-conventions).
