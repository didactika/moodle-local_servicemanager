### 2026090600 (v1.0.2) ###

* Restored the core user_created event when provisioning service users (#26).
* Added regression coverage for user creation, role creation, role assignment, and schema provisioning events (#26).
* Added the missing cachedef_newtoken language string (#24).
* Made the naming-convention table labels in the schema documentation translatable (#25).

### 2026071400 (v1.0.1) ###

* Fixed: provisioned services and tokens are no longer deleted on plugin upgrade.
* Added a Privacy API provider and GitHub Actions CI with packaged releases.
* Refactored web service functions into classes/external/ and schema import into an importer class.
* Store freshly generated tokens via the Cache API instead of $SESSION.
* Added missing language strings, externalised hard-coded text, and added file boilerplate headers.

### 2026062500 (v1.0.0) ###

* Initial release.
* Provision a full web service (user, role, capabilities, service, token) from a single YAML schema.
* Automatic capability resolution from the declared functions.
* Dashboard with import/export, in-browser editor, validation, versioning with rollback, and bulk actions.
* Scheduled health checks with email notifications.
* REST API for managing schemas programmatically.
