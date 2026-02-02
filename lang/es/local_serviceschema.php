<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

defined('MOODLE_INTERNAL') || die();

$string['pluginname'] = 'Gestor de Esquemas de Servicio';
$string['privacy:metadata'] = 'El plugin Gestor de Esquemas de Servicio no almacena datos personales.';
$string['serviceschema:manage'] = 'Gestionar esquemas de servicio';
$string['serviceschema:view'] = 'Ver esquemas de servicio';
$string['dashboard'] = 'Tablero de Esquemas de Servicio';
$string['upload_schema'] = 'Subir Esquema';
$string['edit_schema'] = 'Editar Esquema';
$string['view_schema'] = 'Ver Esquema';
$string['manage_schemas'] = 'Gestionar Esquemas';
$string['yamlfile'] = 'Archivo de Esquema YAML';
$string['yamlfile_help'] = 'Sube un archivo YAML que contenga la definición del esquema del servicio. Solo se aceptan archivos .yaml y .yml.<br><br><a href="/local/serviceschema/pages/documentation.php" target="_blank"><strong>📖 Ver Documentación</strong></a>';
$string['yamlcontent'] = 'Contenido YAML';
$string['yamlcontent_help'] = 'Edita la definición del esquema YAML directamente.<br><br><a href="/local/serviceschema/pages/documentation.php" target="_blank"><strong>📖 Ver Documentación</strong></a>';
$string['generatetoken'] = 'Generar token automáticamente';
$string['generatetoken_desc'] = 'Si se marca, se generará un token para el usuario del servicio y se mostrará después de la subida.';
$string['upload'] = 'Subir Esquema';
$string['schema_id'] = 'ID del Esquema';
$string['schema_name'] = 'Nombre';
$string['schema_version'] = 'Versión';
$string['schema_maintainer'] = 'Mantenedor';
$string['schema_description'] = 'Descripción';
$string['schema_status'] = 'Estado';
$string['schema_enabled'] = 'Habilitado';
$string['schema_created'] = 'Creado';
$string['schema_modified'] = 'Última Modificación';
$string['status_healthy'] = 'Saludable';
$string['status_warning'] = 'Advertencia';
$string['status_critical'] = 'Crítico';
$string['action_view'] = 'Ver';
$string['action_edit'] = 'Editar';
$string['action_delete'] = 'Eliminar';
$string['action_regenerate_token'] = 'Regenerar Token';
$string['action_disable'] = 'Deshabilitar';
$string['action_enable'] = 'Habilitar';
$string['disabled'] = 'Deshabilitado';
$string['token_generated'] = 'Token Generado Exitosamente';
$string['token_regenerated'] = 'Token Regenerado Exitosamente';
$string['token_copy_warning'] = 'Copia este token ahora. No se mostrará de nuevo por razones de seguridad.';
$string['copy'] = 'Copiar';
$string['copied'] = '¡Copiado!';
$string['token_name'] = 'Nombre del Token';
$string['current_token'] = 'Token Actual';
$string['no_token'] = 'No se ha generado token';
$string['schema_created_success'] = 'El esquema "{$a}" se creó exitosamente.';
$string['schema_updated_success'] = 'El esquema "{$a}" se actualizó exitosamente.';
$string['schema_deleted_success'] = 'El esquema "{$a}" se eliminó exitosamente.';
$string['no_schemas'] = 'No se han definido esquemas todavía. Sube un archivo YAML para crear tu primer esquema.';
$string['changes_will_apply'] = 'Los cambios se aplicarán al usuario, rol y servicio cuando guardes.';
$string['error_invalid_yaml'] = 'Formato YAML inválido: {$a}';
$string['error_missing_meta'] = 'Falta la sección "meta" requerida en el YAML.';
$string['error_missing_meta_id'] = 'Falta el campo requerido "meta.id".';
$string['error_missing_meta_name'] = 'Falta el campo requerido "meta.name".';
$string['error_missing_meta_version'] = 'Falta el campo requerido "meta.version".';
$string['error_missing_definition'] = 'Falta la sección "definition" requerida.';
$string['error_missing_functions'] = 'Falta el array "definition.functions" requerido.';
$string['error_invalid_schema_id'] = 'El ID del esquema "{$a}" es inválido. Solo se permiten letras, números y puntos (.).';
$string['error_schema_id_exists'] = 'Ya existe un esquema con el ID "{$a}".';
$string['error_function_not_found'] = 'La función "{$a}" no existe en esta instalación de Moodle.';
$string['error_critical_function_missing'] = 'Falta la función crítica "{$a}". No se puede crear el esquema.';
$string['error_version_change_required'] = 'Se detectaron cambios en el contenido. Debes actualizar el número de versión en el YAML (por ejemplo, incrementar la versión) para guardar estos cambios.';
$string['error_plugin_not_installed'] = 'El plugin requerido "{$a}" no está instalado.';
$string['warning_function_missing'] = 'Falta la función no crítica "{$a}".';
$string['warning_user_email_not_found'] = 'Usuario con email "{$a}" no encontrado. Omitiendo autorización.';
$string['warning_plugin_not_installed'] = 'El plugin recomendado "{$a}" no está instalado.';
$string['healthcheck_task'] = 'Verificación de Salud de Esquemas de Servicio';
$string['healthcheck_report_subject'] = 'Informe de Salud de Esquemas de Servicio';
$string['healthcheck_all_healthy'] = 'Todos los esquemas de servicio están saludables.';
$string['healthcheck_issues_found'] = 'Se detectaron problemas en {$a} esquema(s).';
$string['confirm_delete'] = '¿Estás seguro de que quieres eliminar el esquema "{$a}"? Esto también eliminará el usuario asociado, el rol y el servicio.';
$string['confirm_regenerate_token'] = '¿Estás seguro de que quieres regenerar el token? El token actual será invalidado inmediatamente.';
$string['service_user'] = 'Usuario de Servicio';
$string['service_role'] = 'Rol de Servicio';
$string['external_service'] = 'Servicio Externo';
$string['authorized_users'] = 'Usuarios Autorizados';
$string['functions'] = 'Funciones';
$string['function_name'] = 'Nombre de Función';
$string['function_critical'] = 'Crítica';
$string['function_status'] = 'Estado';
$string['function_exists'] = 'Existe';
$string['function_missing'] = 'Falta';
$string['capabilities'] = 'Capacidades';
$string['extra_capabilities'] = 'Capacidades Extra';
$string['calculated_capabilities'] = 'Calculadas desde Funciones';
$string['settings'] = 'Configuración';
$string['settings_notifications'] = 'Notificaciones';
$string['settings_notifications_desc'] = 'Configura quién recibe las notificaciones de verificación de salud.';
$string['settings_healthcheck'] = 'Verificación de Salud';
$string['settings_healthcheck_desc'] = 'Configura el monitoreo automático de salud.';
$string['settings_cleanup'] = 'Limpieza de Logs';
$string['settings_cleanup_desc'] = 'Configura la limpieza automática de logs para prevenir el crecimiento de la base de datos.';
$string['notification_emails'] = 'Emails de notificación';
$string['notification_emails_desc'] = 'Lista de direcciones de correo separadas por comas para recibir notificaciones de salud. Dejar vacío para usar solo administradores del sitio.';
$string['notify_admins'] = 'Notificar también a administradores';
$string['notify_admins_desc'] = 'Enviar notificaciones a los administradores del sitio además de los correos anteriores.';
$string['notification_level'] = 'Nivel de notificación';
$string['notification_level_desc'] = 'Nivel mínimo de estado para activar notificaciones.';
$string['notification_level_all'] = 'Todo (incluyendo saludable)';
$string['healthcheck_enabled'] = 'Habilitar verificación de salud';
$string['healthcheck_enabled_desc'] = 'Ejecutar verificaciones automáticas de salud en los esquemas.';
$string['cleanup_enabled'] = 'Habilitar limpieza de logs';
$string['cleanup_enabled_desc'] = 'Eliminar automáticamente logs de salud antiguos.';
$string['cleanup_retention_days'] = 'Retención de logs (días)';
$string['cleanup_retention_days_desc'] = 'Número de días para conservar logs. Los logs más antiguos serán eliminados.';
$string['cleanup_task'] = 'Limpieza de Logs de Esquemas de Servicio';
$string['documentation'] = 'Documentación del Esquema';
$string['schema_reference'] = 'Referencia del Esquema YAML';
$string['quick_links'] = 'Enlaces Rápidos';
$string['download_example'] = 'Descargar Archivo de Ejemplo';
$string['download_example_desc'] = 'Obtén un archivo de esquema YAML de muestra funcional';
$string['doc_structure'] = 'Estructura del Esquema';
$string['doc_structure_desc'] = 'Un archivo YAML de esquema de servicio debe contener las siguientes secciones:';
$string['doc_meta'] = 'Sección Meta';
$string['doc_definition'] = 'Sección de Definición';
$string['doc_definition_desc'] = 'La sección de definición especifica las funciones del servicio web y las capacidades.';
$string['doc_naming'] = 'Convenciones de Nombres';
$string['doc_example'] = 'Ejemplo Completo';
$string['doc_functions_desc'] = 'Las funciones se pueden especificar en formato simple o extendido:';
$string['doc_meta_id'] = 'Identificador único. Solo se permiten letras, números y puntos (.).';
$string['doc_meta_name'] = 'Nombre legible para el servicio.';
$string['doc_meta_version'] = 'Cadena de versión (se recomienda versionado semántico).';
$string['doc_meta_maintainer'] = 'Persona o equipo responsable del esquema.';
$string['doc_meta_description'] = 'Breve descripción del propósito del servicio.';
$string['field'] = 'Campo';
$string['resource'] = 'Recurso';
$string['pattern'] = 'Patrón';
$string['back'] = 'Volver';
$string['doc_example_col'] = 'Ejemplo';

// Import/Export.
$string['import_schemas'] = 'Importar Esquemas';
$string['export_all'] = 'Exportar Todo';
$string['action_export'] = 'Exportar';
$string['import'] = 'Importar';
$string['import_file'] = 'Archivo de Importación';
$string['import_file_help'] = 'Sube un archivo de esquema YAML (.yaml, .yml) o un archivo ZIP que contenga múltiples esquemas.';
$string['conflict_handling'] = 'Manejo de Conflictos';
$string['conflict_action'] = 'Cuando existe el ID del esquema';
$string['conflict_action_help'] = 'Elige qué hacer cuando ya existe un esquema con el mismo ID.';
$string['conflict_skip'] = 'Omitir (mantener existente)';
$string['conflict_overwrite'] = 'Sobrescribir (reemplazar existente)';
$string['conflict_rename'] = 'Renombrar (añadir sufijo .imported)';
$string['import_info_title'] = 'Importar Esquemas';
$string['import_info_text'] = 'Puedes importar esquemas desde archivos YAML o archivos ZIP:';
$string['import_info_yaml'] = 'Archivo YAML único (.yaml o .yml)';
$string['import_info_zip'] = 'Archivo ZIP conteniendo múltiples archivos YAML';
$string['import_complete'] = 'Importación completa: {$a->imported} importados, {$a->skipped} omitidos.';
$string['import_error_no_id'] = 'El YAML no contiene un campo meta.id válido.';
$string['no_file_uploaded'] = 'No se subió ningún archivo.';
$string['no_schemas_to_export'] = 'No hay esquemas para exportar.';
$string['export_error'] = 'Error creando el archivo de exportación.';

// Bulk operations.
$string['selected'] = 'seleccionado(s)';
$string['select_all'] = 'Seleccionar todo';
$string['bulk_enable'] = 'Habilitar';
$string['bulk_disable'] = 'Deshabilitar';
$string['bulk_export'] = 'Exportar';
$string['bulk_delete'] = 'Eliminar';
$string['bulk_delete_confirm'] = '¿Estás seguro de que quieres eliminar los esquemas seleccionados? Esta acción no se puede deshacer.';
$string['bulk_enabled'] = '{$a} esquema(s) han sido habilitados.';
$string['bulk_disabled'] = '{$a} esquema(s) han sido deshabilitados.';
$string['bulk_deleted'] = '{$a} esquema(s) han sido eliminados.';
$string['bulk_deleted_with_errors'] = '{$a->count} esquema(s) eliminados, ocurrieron {$a->errors} error(es).';
$string['no_schemas_selected'] = 'No se seleccionaron esquemas.';
$string['invalid_action'] = 'Acción inválida.';

// Version history.
$string['version_history'] = 'Historial de Versiones';
$string['version'] = 'Versión';
$string['current'] = 'Actual';
$string['rollback'] = 'Restaurar';
$string['rollback_confirm'] = '¿Estás seguro de que quieres restaurar esta versión? Los cambios actuales se guardarán como una copia de seguridad.';
$string['rollback_success'] = 'El esquema ha sido restaurado exitosamente.';
$string['rollback_error'] = 'Error restaurando el esquema';
$string['rollback_backup'] = 'Copia antes de restaurar';
$string['rollback_to_version'] = 'Restaurado a la versión {$a}';
$string['no_history'] = 'No hay historial de versiones disponible para este esquema.';
$string['history_count'] = 'Mostrando {$a} versión(es).';
$string['historynotfound'] = 'Registro de historial no encontrado.';
$string['view_yaml'] = 'Ver YAML';
