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

/**
 * Cadenas de idioma para local_serviceschema (Español)
 *
 * @package    local_serviceschema
 * @author     Hector Arrechea <hector.arrechea@ct.uneatlantico.es>
 * @copyright  2026 ADSDR
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

// General.
$string['pluginname'] = 'Gestor de Esquemas de Servicios';
$string['privacy:metadata'] = 'El plugin Gestor de Esquemas de Servicios no almacena datos personales.';

// Capacidades.
$string['serviceschema:manage'] = 'Gestionar esquemas de servicios';
$string['serviceschema:view'] = 'Ver esquemas de servicios';

// Navegación y páginas.
$string['dashboard'] = 'Panel de Esquemas de Servicios';
$string['upload_schema'] = 'Subir Esquema';
$string['edit_schema'] = 'Editar Esquema';
$string['view_schema'] = 'Ver Esquema';
$string['manage_schemas'] = 'Gestionar Esquemas';

// Campos del formulario.
$string['yamlfile'] = 'Archivo YAML del Esquema';
$string['yamlfile_help'] = 'Sube un archivo YAML con la definición del esquema de servicio. Solo se aceptan archivos .yaml y .yml.<br><br><a href="/local/serviceschema/pages/documentation.php" target="_blank"><strong>📖 Ver Documentación</strong></a>';
$string['yamlcontent'] = 'Contenido YAML';
$string['yamlcontent_help'] = 'Edita la definición del esquema YAML directamente.<br><br><a href="/local/serviceschema/pages/documentation.php" target="_blank"><strong>📖 Ver Documentación</strong></a>';
$string['generatetoken'] = 'Generar token automáticamente';
$string['generatetoken_desc'] = 'Si está marcado, se generará un token para el usuario del servicio y se mostrará después de la subida.';
$string['upload'] = 'Subir Esquema';

// Campos del esquema.
$string['schema_id'] = 'ID del Esquema';
$string['schema_name'] = 'Nombre';
$string['schema_version'] = 'Versión';
$string['schema_maintainer'] = 'Responsable';
$string['schema_description'] = 'Descripción';
$string['schema_status'] = 'Estado';
$string['schema_enabled'] = 'Habilitado';
$string['schema_created'] = 'Creado';
$string['schema_modified'] = 'Última Modificación';

// Etiquetas de estado.
$string['status_healthy'] = 'Saludable';
$string['status_warning'] = 'Advertencia';
$string['status_critical'] = 'Crítico';

// Acciones.
$string['action_view'] = 'Ver';
$string['action_edit'] = 'Editar';
$string['action_delete'] = 'Eliminar';
$string['action_regenerate_token'] = 'Regenerar Token';
$string['action_disable'] = 'Deshabilitar';
$string['action_enable'] = 'Habilitar';

// Relacionado con tokens.
$string['token_generated'] = 'Token Generado Correctamente';
$string['token_regenerated'] = 'Token Regenerado Correctamente';
$string['token_copy_warning'] = 'Copia este token ahora. No se mostrará de nuevo por razones de seguridad.';
$string['copy'] = 'Copiar';
$string['copied'] = '¡Copiado!';
$string['token_name'] = 'Nombre del Token';
$string['current_token'] = 'Token Actual';
$string['no_token'] = 'Sin token generado';

// Mensajes.
$string['schema_created_success'] = 'El esquema "{$a}" se ha creado correctamente.';
$string['schema_updated_success'] = 'El esquema "{$a}" se ha actualizado correctamente.';
$string['schema_deleted_success'] = 'El esquema "{$a}" se ha eliminado correctamente.';
$string['no_schemas'] = 'No hay esquemas definidos todavía. Sube un archivo YAML para crear tu primer esquema.';
$string['changes_will_apply'] = 'Los cambios se aplicarán al usuario, rol y servicio cuando guardes.';

// Errores de validación.
$string['error_invalid_yaml'] = 'Formato YAML inválido: {$a}';
$string['error_missing_meta'] = 'Falta la sección "meta" requerida en el YAML.';
$string['error_missing_meta_id'] = 'Falta el campo requerido "meta.id".';
$string['error_missing_meta_name'] = 'Falta el campo requerido "meta.name".';
$string['error_missing_meta_version'] = 'Falta el campo requerido "meta.version".';
$string['error_missing_definition'] = 'Falta la sección "definition" requerida.';
$string['error_missing_functions'] = 'Falta el array "definition.functions" requerido.';
$string['error_invalid_schema_id'] = 'El ID de esquema "{$a}" es inválido. Solo se permiten letras, números y puntos (.).';
$string['error_schema_id_exists'] = 'Ya existe un esquema con ID "{$a}".';
$string['error_function_not_found'] = 'La función "{$a}" no existe en esta instalación de Moodle.';
$string['error_critical_function_missing'] = 'Falta la función crítica "{$a}". No se puede crear el esquema.';
$string['error_plugin_not_installed'] = 'El plugin requerido "{$a}" no está instalado.';

// Advertencias.
$string['warning_function_missing'] = 'La función no crítica "{$a}" no existe.';
$string['warning_user_email_not_found'] = 'Usuario con email "{$a}" no encontrado. Omitiendo autorización.';
$string['warning_plugin_not_installed'] = 'El plugin recomendado "{$a}" no está instalado.';

// Verificación de salud.
$string['healthcheck_task'] = 'Verificación de Salud de Esquemas de Servicio';
$string['healthcheck_report_subject'] = 'Informe de Salud de Esquemas de Servicio';
$string['healthcheck_all_healthy'] = 'Todos los esquemas de servicio están saludables.';
$string['healthcheck_issues_found'] = 'Se detectaron problemas en {$a} esquema(s).';

// Diálogos de confirmación.
$string['confirm_delete'] = '¿Estás seguro de que quieres eliminar el esquema "{$a}"? Esto también eliminará el usuario, rol y servicio asociados.';
$string['confirm_regenerate_token'] = '¿Estás seguro de que quieres regenerar el token? El token actual se invalidará inmediatamente.';

// Usuario de servicio.
$string['service_user'] = 'Usuario del Servicio';
$string['service_role'] = 'Rol del Servicio';
$string['external_service'] = 'Servicio Externo';
$string['authorized_users'] = 'Usuarios Autorizados';

// Funciones.
$string['functions'] = 'Funciones';
$string['function_name'] = 'Nombre de Función';
$string['function_critical'] = 'Crítica';
$string['function_status'] = 'Estado';
$string['function_exists'] = 'Existe';
$string['function_missing'] = 'No existe';

// Capacidades.
$string['capabilities'] = 'Capacidades';
$string['extra_capabilities'] = 'Capacidades Adicionales';
$string['calculated_capabilities'] = 'Calculadas desde Funciones';

// Configuraciones.
$string['settings'] = 'Configuraciones';
$string['settings_notifications'] = 'Notificaciones';
$string['settings_notifications_desc'] = 'Configura quién recibe las notificaciones de verificación de salud.';
$string['settings_healthcheck'] = 'Verificación de Salud';
$string['settings_healthcheck_desc'] = 'Configura el monitoreo automático de salud.';
$string['settings_cleanup'] = 'Limpieza de Logs';
$string['settings_cleanup_desc'] = 'Configura la limpieza automática de logs para prevenir el crecimiento de la base de datos.';

$string['notification_emails'] = 'Emails de notificación';
$string['notification_emails_desc'] = 'Lista de direcciones de correo electrónico separadas por comas para recibir notificaciones de salud. Deja vacío para utilizar solo administradores del sitio.';
$string['notify_admins'] = 'También notificar a administradores del sitio';
$string['notify_admins_desc'] = 'Enviar notificaciones a los administradores del sitio además de los emails configurados.';
$string['notification_level'] = 'Nivel de notificación';
$string['notification_level_desc'] = 'Nivel de estado mínimo para activar notificaciones.';
$string['notification_level_all'] = 'Todos (incluyendo saludables)';

$string['healthcheck_enabled'] = 'Habilitar verificación de salud';
$string['healthcheck_enabled_desc'] = 'Ejecutar verificaciones automáticas de salud en los esquemas.';

$string['cleanup_enabled'] = 'Habilitar limpieza de logs';
$string['cleanup_enabled_desc'] = 'Eliminar automáticamente los logs de verificación de salud antiguos.';
$string['cleanup_retention_days'] = 'Retención de logs (días)';
$string['cleanup_retention_days_desc'] = 'Número de días para conservar los logs de verificación de salud. Los logs más antiguos se eliminarán.';
$string['cleanup_task'] = 'Limpieza de Logs de Esquemas de Servicio';

