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
 * Strings para local_serviceschema (Português)
 *
 * @package    local_serviceschema
 * @author     Hector Arrechea <hector.arrechea@ct.uneatlantico.es>
 * @copyright  2026 ADSDR
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

// Geral.
$string['pluginname'] = 'Gerenciador de Esquemas de Serviços';
$string['privacy:metadata'] = 'O plugin Gerenciador de Esquemas de Serviços não armazena dados pessoais.';

// Capacidades.
$string['serviceschema:manage'] = 'Gerenciar esquemas de serviços';
$string['serviceschema:view'] = 'Visualizar esquemas de serviços';

// Navegação e páginas.
$string['dashboard'] = 'Painel de Esquemas de Serviços';
$string['upload_schema'] = 'Enviar Esquema';
$string['edit_schema'] = 'Editar Esquema';
$string['view_schema'] = 'Visualizar Esquema';
$string['manage_schemas'] = 'Gerenciar Esquemas';

// Campos do formulário.
$string['yamlfile'] = 'Arquivo YAML do Esquema';
$string['yamlfile_help'] = 'Envie um arquivo YAML contendo a definição do esquema de serviço. Apenas arquivos .yaml e .yml são aceitos.';
$string['yamlcontent'] = 'Conteúdo YAML';
$string['yamlcontent_help'] = 'Edite a definição do esquema YAML diretamente.';
$string['generatetoken'] = 'Gerar token automaticamente';
$string['generatetoken_desc'] = 'Se marcado, um token será gerado para o usuário do serviço e exibido após o envio.';
$string['upload'] = 'Enviar Esquema';

// Campos do esquema.
$string['schema_id'] = 'ID do Esquema';
$string['schema_name'] = 'Nome';
$string['schema_version'] = 'Versão';
$string['schema_maintainer'] = 'Responsável';
$string['schema_description'] = 'Descrição';
$string['schema_status'] = 'Status';
$string['schema_enabled'] = 'Habilitado';
$string['schema_created'] = 'Criado';
$string['schema_modified'] = 'Última Modificação';

// Rótulos de status.
$string['status_healthy'] = 'Saudável';
$string['status_warning'] = 'Aviso';
$string['status_critical'] = 'Crítico';

// Ações.
$string['action_view'] = 'Visualizar';
$string['action_edit'] = 'Editar';
$string['action_delete'] = 'Excluir';
$string['action_regenerate_token'] = 'Regenerar Token';
$string['action_disable'] = 'Desabilitar';
$string['action_enable'] = 'Habilitar';

// Token.
$string['token_generated'] = 'Token Gerado com Sucesso';
$string['token_regenerated'] = 'Token Regenerado com Sucesso';
$string['token_copy_warning'] = 'Copie este token agora. Ele não será exibido novamente por razões de segurança.';
$string['copy'] = 'Copiar';
$string['copied'] = 'Copiado!';
$string['token_name'] = 'Nome do Token';
$string['current_token'] = 'Token Atual';
$string['no_token'] = 'Nenhum token gerado';

// Mensagens.
$string['schema_created_success'] = 'O esquema "{$a}" foi criado com sucesso.';
$string['schema_updated_success'] = 'O esquema "{$a}" foi atualizado com sucesso.';
$string['schema_deleted_success'] = 'O esquema "{$a}" foi excluído com sucesso.';
$string['no_schemas'] = 'Nenhum esquema definido. Envie um arquivo YAML para criar seu primeiro esquema.';
$string['changes_will_apply'] = 'As alterações serão aplicadas ao usuário, função e serviço quando você salvar.';

// Erros de validação.
$string['error_invalid_yaml'] = 'Formato YAML inválido: {$a}';
$string['error_missing_meta'] = 'Seção "meta" obrigatória ausente no YAML.';
$string['error_missing_meta_id'] = 'Campo "meta.id" obrigatório ausente.';
$string['error_missing_meta_name'] = 'Campo "meta.name" obrigatório ausente.';
$string['error_missing_meta_version'] = 'Campo "meta.version" obrigatório ausente.';
$string['error_missing_definition'] = 'Seção "definition" obrigatória ausente.';
$string['error_missing_functions'] = 'Array "definition.functions" obrigatório ausente.';
$string['error_invalid_schema_id'] = 'ID de esquema "{$a}" inválido. Apenas letras, números e pontos (.) são permitidos.';
$string['error_schema_id_exists'] = 'Um esquema com ID "{$a}" já existe.';
$string['error_function_not_found'] = 'A função "{$a}" não existe nesta instalação do Moodle.';
$string['error_critical_function_missing'] = 'Função crítica "{$a}" ausente. O esquema não pode ser criado.';
$string['error_plugin_not_installed'] = 'Plugin obrigatório "{$a}" não instalado.';

// Avisos.
$string['warning_function_missing'] = 'Função não crítica "{$a}" ausente.';
$string['warning_user_email_not_found'] = 'Usuário com email "{$a}" não encontrado. Autorização ignorada.';
$string['warning_plugin_not_installed'] = 'Plugin recomendado "{$a}" não instalado.';

// Verificação de saúde.
$string['healthcheck_task'] = 'Verificação de Saúde de Esquemas de Serviços';
$string['healthcheck_report_subject'] = 'Relatório de Saúde de Esquemas de Serviços';
$string['healthcheck_all_healthy'] = 'Todos os esquemas de serviços estão saudáveis.';
$string['healthcheck_issues_found'] = 'Problemas detectados em {$a} esquema(s).';

// Diálogos de confirmação.
$string['confirm_delete'] = 'Tem certeza de que deseja excluir o esquema "{$a}"? Isso também excluirá o usuário, função e serviço associados.';
$string['confirm_regenerate_token'] = 'Tem certeza de que deseja regenerar o token? O token atual será invalidado imediatamente.';

// Usuário de serviço.
$string['service_user'] = 'Usuário do Serviço';
$string['service_role'] = 'Função do Serviço';
$string['external_service'] = 'Serviço Externo';
$string['authorized_users'] = 'Usuários Autorizados';

// Funções.
$string['functions'] = 'Funções';
$string['function_name'] = 'Nome da Função';
$string['function_critical'] = 'Crítica';
$string['function_status'] = 'Status';
$string['function_exists'] = 'Existe';
$string['function_missing'] = 'Ausente';

// Capacidades.
$string['capabilities'] = 'Capacidades';
$string['extra_capabilities'] = 'Capacidades Extras';
$string['calculated_capabilities'] = 'Calculadas das Funções';

// Configurações.
$string['settings'] = 'Configurações';
$string['settings_notifications'] = 'Notificações';
$string['settings_notifications_desc'] = 'Configure quem recebe as notificações de verificação de saúde.';
$string['settings_healthcheck'] = 'Verificação de Saúde';
$string['settings_healthcheck_desc'] = 'Configure o monitoramento automático de saúde.';
$string['settings_cleanup'] = 'Limpeza de Logs';
$string['settings_cleanup_desc'] = 'Configure a limpeza automática de logs para evitar o crescimento do banco de dados.';

$string['notification_emails'] = 'Emails de notificação';
$string['notification_emails_desc'] = 'Lista de endereços de email separados por vírgula para receber notificações. Deixe vazio para usar apenas os administradores do site.';
$string['notify_admins'] = 'Notificar também administradores';
$string['notify_admins_desc'] = 'Enviar notificações aos administradores do site além dos emails acima.';
$string['notification_level'] = 'Nível de notificação';
$string['notification_level_desc'] = 'Nível de status mínimo para acionar notificações.';
$string['notification_level_all'] = 'Todos (incluindo saudáveis)';

$string['healthcheck_enabled'] = 'Habilitar verificação de saúde';
$string['healthcheck_enabled_desc'] = 'Executar verificações automáticas de saúde nos esquemas.';

$string['cleanup_enabled'] = 'Habilitar limpeza de logs';
$string['cleanup_enabled_desc'] = 'Excluir automaticamente logs antigos de verificação de saúde.';
$string['cleanup_retention_days'] = 'Retenção de logs (dias)';
$string['cleanup_retention_days_desc'] = 'Número de dias para manter os logs. Logs mais antigos serão excluídos.';
$string['cleanup_task'] = 'Limpeza de Logs de Esquemas de Serviços';
