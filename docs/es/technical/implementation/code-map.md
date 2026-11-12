---
id: MAP
status: draft
origin: code
sourceOfTruth: code
---

# Mapa del código

| Elemento del modelo | Tipo | Ubicación en el código | Verificado |
| --- | --- | --- | --- |
| Schema, SchemaVersion, HealthLog | tablas | `db/install.xml` | sí |
| Creación, actualización y borrado de un esquema | métodos | `classes/schema/manager.php` | sí |
| Validación de un esquema | clase | `classes/schema/validator.php` | sí |
| Sección del rol | clase | `classes/schema/role_section_validator.php` | sí |
| Versión de un cambio | clases | `classes/schema/version_resolver.php`, `classes/schema/version_policy.php` | sí |
| ServiceUser | clase | `classes/automation/user_manager.php` | sí |
| ServiceRole, Capability, RoleSettings | clases | `classes/automation/role_manager.php`, `classes/automation/role_settings.php` | sí |
| ExternalService, WebServiceFunction | clase | `classes/automation/service_manager.php` | sí |
| Token | clase | `classes/automation/token_manager.php` | sí |
| Capacidades derivadas | clase | `classes/automation/capability_calculator.php` | sí |
| Aprovisionamiento | clase | `classes/schema/provisioner.php` | sí |
| Historial, retroceso y comparación | clases | `classes/schema/history_manager.php`, `classes/schema/line_diff.php`, `classes/schema/version_summary.php` | sí |
| Importación y exportación | clase | `classes/schema/importer.php` | sí |
| Comprobación de salud | clases | `classes/health/inspector.php`, `classes/task/health_check.php` | sí |
| Notificación del informe | clase | `classes/notification/manager.php` | sí |
| Capacidades del plugin | fichero | `db/access.php` | sí |
| Servicios web | fichero | `db/services.php` | sí |
| Tareas programadas | fichero | `db/tasks.php` | sí |
| Privacidad | clase | `classes/privacy/provider.php` | sí |
