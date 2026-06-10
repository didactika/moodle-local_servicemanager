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
 * Language strings for local_serviceschema
 *
 * @package    local_serviceschema
 * @author     Hector Arrechea <hector.arrechea@ct.uneatlantico.es>
 * @copyright  2026 ADSDR
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

// General.
$string['pluginname'] = 'Gerenciador de Serviços';
$string['privacy:metadata'] = 'O plugin Gerenciador de Esquemas de Serviços não armazena nenhuns dados pessoais.';

// Capabilities.
$string['serviceschema:manage'] = 'Gerenciar esquemas de serviço';
$string['serviceschema:view'] = 'Visualizar esquemas de serviço';

// Navigation and pages.
$string['dashboard'] = 'Painel de Esquemas de Serviços';
$string['upload_schema'] = 'Carregar Esquema';
$string['edit_schema'] = 'Editar Esquema';
$string['view_schema'] = 'Visualizar Esquema';
$string['manage_schemas'] = 'Gerenciar Esquemas';

// Form fields.
$string['yamlfile'] = 'Arquivo de Esquema YAML';
$string['yamlfile_help'] = 'Carregue um arquivo YAML contendo a definição do esquema do serviço. Apenas arquivos .yaml e .yml são aceitos.<br><br><a href="/local/serviceschema/pages/documentation.php"><strong>📖 Visualizar Documentação</strong></a>';
$string['yamlcontent'] = 'Conteúdo YAML';
$string['yamlcontent_help'] = 'Edite a definição do esquema YAML diretamente.<br><br><a href="/local/serviceschema/pages/documentation.php"><strong>📖 Visualizar Documentação</strong></a>';
$string['generatetoken'] = 'Gerar token automaticamente';
$string['generatetoken_desc'] = 'Se marcado, um token será gerado para o usuário de serviço e exibido após o carregamento.';
$string['upload'] = 'Carregar Esquema';

// Schema fields.
$string['schema_id'] = 'ID do Esquema';
$string['schema_information'] = 'Informações do Esquema';
$string['schema_name'] = 'Nome';
$string['schema_version'] = 'Versão';
$string['schema_maintainer'] = 'Mantenedor';
$string['schema_description'] = 'Descrição';
$string['schema_status'] = 'Status';
$string['schema_enabled'] = 'Habilitado';
$string['schema_not_found'] = 'Esquema não encontrado. Pode ter sido excluído.';
$string['schema_created'] = 'Criado';
$string['schema_modified'] = 'Última Modificação';

// Status labels.
$string['status_healthy'] = 'Saudável';
$string['status_warning'] = 'Aviso';
$string['status_critical'] = 'Crítico';

// Actions.
$string['action_view'] = 'Visualizar';
$string['action_edit'] = 'Editar';
$string['action_delete'] = 'Excluir';
$string['action_regenerate_token'] = 'Regenerar Token';
$string['action_disable'] = 'Desabilitar';
$string['action_enable'] = 'Habilitar';
$string['disabled'] = 'Desabilitado';

// Token related.
$string['token_generated'] = 'Token Gerado com Sucesso';
$string['token_regenerated'] = 'Token Regenerado com Sucesso';
$string['token_copy_warning'] = 'Copie este token agora. Ele não será mostrado novamente por razões de segurança.';
$string['copy'] = 'Copiar';
$string['copied'] = 'Copiado!';
$string['token_name'] = 'Nome do Token';
$string['current_token'] = 'Token Atual';
$string['no_token'] = 'Nenhum token gerado';

// Messages.
$string['schema_created_success'] = 'O esquema "{$a}" foi criado com sucesso.';
$string['schema_updated_success'] = 'O esquema "{$a}" foi atualizado com sucesso.';
$string['schema_deleted_success'] = 'O esquema "{$a}" foi excluído com sucesso.';
$string['no_schemas'] = 'Nenhum esquema foi definido ainda. Carregue um arquivo YAML para criar seu primeiro esquema.';
$string['changes_will_apply'] = 'As alterações serão aplicadas ao usuário, função e serviço quando você salvar.';

// Validation errors.
$string['error_invalid_yaml'] = 'Formato YAML inválido: {$a}';
$string['error_missing_meta'] = 'Seção "meta" obrigatória ausente no YAML.';
$string['error_missing_meta_id'] = 'Campo "meta.id" obrigatório ausente.';
$string['error_missing_meta_name'] = 'Campo "meta.name" obrigatório ausente.';
$string['error_missing_meta_version'] = 'Campo "meta.version" obrigatório ausente.';
$string['error_missing_definition'] = 'Seção "definition" obrigatória ausente.';
$string['error_missing_functions'] = 'Array "definition.functions" obrigatório ausente.';
$string['error_invalid_schema_id'] = 'O ID do esquema "{$a}" é inválido. Apenas letras, números e pontos (.) são permitidos.';
$string['error_schema_id_too_long'] = 'O ID do esquema é muito longo ({$a} caracteres). O máximo permitido é 50 caracteres.';
$string['error_id_change_forbidden'] = 'A alteração do ID do esquema não é permitida. Por favor, crie um novo esquema.';
$string['error_schema_id_exists'] = 'Já existe um esquema com o ID "{$a}".';
$string['error_schema_name_exists'] = 'Já existe um esquema com o nome "{$a}". Os nomes de esquema devem ser únicos.';
$string['error_duplicate_function'] = 'A função "{$a}" está duplicada na definição.';
$string['error_function_not_found'] = 'A função "{$a}" não existe nesta instalação do Moodle.';
$string['error_critical_function_missing'] = 'A função crítica "{$a}" está ausente. Impossível criar o esquema.';
$string['error_version_change_required'] = 'Alterações de conteúdo detectadas. Você deve atualizar o número da versão no YAML (por exemplo, incrementar a versão) para salvar essas alterações.';
$string['error_version_must_increment'] = 'A nova versão ({$a->new}) deve ser maior que a versão atual ({$a->current}). As versões só podem diminuir via reversão do histórico.';
$string['error_version_change_forbidden'] = 'A versão só pode ser alterada se a definição do esquema for modificada. Alterações de metadados não requerem uma atualização de versão.';
$string['error_plugin_not_installed'] = 'O plugin obrigatório "{$a}" não está instalado.';

// Warnings.
$string['warning_function_missing'] = 'A função não crítica "{$a}" está ausente.';
$string['warning_user_email_not_found'] = 'Usuário com email "{$a}" não encontrado. Autorização ignorada.';
$string['warning_plugin_not_installed'] = 'O plugin recomendado "{$a}" não está instalado.';

// Health check.
$string['healthcheck_task'] = 'Verificação de Saúde dos Esquemas de Serviço';
$string['healthcheck_report_subject'] = 'Relatório de Saúde dos Esquemas de Serviço';
$string['healthcheck_all_healthy'] = 'Todos os esquemas de serviço estão saudáveis.';
$string['healthcheck_issues_found'] = 'Problemas detectados em {$a} esquema(s).';

// Confirmation dialogs.
$string['confirm_delete'] = 'Tem certeza de que deseja excluir o esquema "{$a}"? Isso também excluirá o usuário associado, a função e o serviço.';
$string['confirm_regenerate_token'] = 'Tem certeza de que deseja regenerar o token? O token atual será invalidado imediatamente.';

// Service user.
$string['service_user'] = 'Usuário de Serviço';
$string['service_role'] = 'Função de Serviço';
$string['external_service'] = 'Serviço Externo';
$string['authorized_users'] = 'Usuários Autorizados';

// Functions.
$string['functions'] = 'Funções';
$string['function_name'] = 'Nome da Função';
$string['function_critical'] = 'Crítica';
$string['function_status'] = 'Status';
$string['function_exists'] = 'Existe';
$string['function_missing'] = 'Ausente';

// Capabilities.
$string['capabilities'] = 'Capacidades';
$string['extra_capabilities'] = 'Capacidades Extras';
$string['calculated_capabilities'] = 'Calculado a partir de Funções';

// Settings.
$string['settings'] = 'Configurações';
$string['settings_notifications'] = 'Notificações';
$string['settings_notifications_desc'] = 'Configurar quem recebe as notificações de verificação de saúde.';
$string['settings_healthcheck'] = 'Verificação de Saúde';
$string['settings_healthcheck_desc'] = 'Configurar monitoramento automático de saúde.';
$string['settings_cleanup'] = 'Limpeza de Logs';
$string['settings_cleanup_desc'] = 'Configurar limpeza automática de logs para evitar o crescimento do banco de dados.';

$string['notification_emails'] = 'Emails de notificação';
$string['notification_emails_desc'] = 'Lista de endereços de email separados por vírgula para receber notificações de saúde. Deixe em branco para usar apenas administradores do site.';
$string['notify_admins'] = 'Também notificar administradores do site';
$string['notify_admins_desc'] = 'Enviar notificações aos administradores do site além dos emails acima.';
$string['notification_level'] = 'Nível de notificação';
$string['notification_level_desc'] = 'Nível de status mínimo para acionar notificações.';
$string['notification_level_all'] = 'Todos (incluindo saudável)';

$string['healthcheck_enabled'] = 'Habilitar verificação de saúde';
$string['healthcheck_enabled_desc'] = 'Executar verificações automáticas de saúde nos esquemas.';

$string['cleanup_enabled'] = 'Habilitar limpeza de logs';
$string['cleanup_enabled_desc'] = 'Excluir automaticamente logs de saúde antigos.';
$string['cleanup_retention_days'] = 'Retenção de logs (dias)';
$string['cleanup_retention_days_desc'] = 'Número de dias para manter logs de saúde. Logs mais antigos que isso serão excluídos.';
$string['cleanup_task'] = 'Limpeza de Logs de Esquemas de Serviço';

// Version Retention.
$string['settings_version_retention'] = 'Política de Retenção de Versões';
$string['settings_version_retention_desc'] = 'Configurar limpeza automática de versões antigas de esquemas.';
$string['version_retention_enabled'] = 'Habilitar Retenção de Versões';
$string['version_retention_enabled_desc'] = 'Se habilitado, versões antigas de esquemas serão excluídas automaticamente, mantendo apenas as mais recentes.';
$string['version_retention_max'] = 'Versões Máx. Por Esquema';
$string['version_retention_max_desc'] = 'Número máximo de versões históricas a manter para cada esquema. As versões mais antigas serão excluídas primeiro.';
$string['task_version_cleanup'] = 'Limpar versões antigas de esquemas';
$string['task_scheduled_validation'] = 'Validação agendada de esquemas';

// Documentation.
$string['documentation'] = 'Documentação do Esquema';
$string['schema_reference'] = 'Referência do Esquema YAML';
$string['quick_links'] = 'Links Rápidos';
$string['download_example'] = 'Baixar Arquivo de Exemplo';
$string['download_example_desc'] = 'Obter um arquivo de esquema YAML de exemplo funcional';
$string['doc_structure'] = 'Estrutura do Esquema';
$string['doc_structure_desc'] = 'Um arquivo YAML de esquema de serviço deve conter as seguintes seções:';
$string['doc_meta'] = 'Seção Meta';
$string['doc_definition'] = 'Seção de Definição';
$string['doc_definition_desc'] = 'A seção de definição especifica as funções de serviço web e as capacidades.';
$string['doc_naming'] = 'Convenções de Nomenclatura';
$string['doc_example'] = 'Exemplo Completo';
$string['doc_example_complete_desc'] = 'O esquema de exemplo acima mostra uma configuração funcional completa. Baixe o arquivo de exemplo no link no topo para começar rapidamente.';
$string['doc_functions_desc'] = 'As funções podem ser especificadas em formato simples ou estendido:';
$string['doc_meta_id'] = 'Identificador único. Apenas letras, números e pontos (.) são permitidos.';
$string['doc_meta_name'] = 'Nome legível por humanos para o serviço.';
$string['doc_meta_version'] = 'String de versão (versionamento semântico recomendado).';
$string['doc_meta_maintainer'] = 'Pessoa ou equipe responsável pelo esquema.';
$string['doc_meta_description'] = 'Breve descrição do objetivo do serviço.';
$string['field'] = 'Campo';
$string['resource'] = 'Recurso';
$string['pattern'] = 'Padrão';
$string['back'] = 'Voltar';
$string['doc_example_col'] = 'Exemplo';

// Import/Export.
$string['import_schemas'] = 'Importar Esquemas';
$string['export_all'] = 'Exportar Tudo';
$string['action_export'] = 'Exportar';
$string['import'] = 'Importar';
$string['import_file'] = 'Importar Arquivo';
$string['import_file_help'] = 'Carregue um arquivo de esquema YAML (.yaml, .yml) ou um arquivo ZIP contendo vários esquemas.';
$string['conflict_handling'] = 'Tratamento de Conflitos';
$string['conflict_action'] = 'Quando o ID do esquema existe';
$string['conflict_action_help'] = 'Escolha o que fazer quando um esquema com o mesmo ID já existe.';
$string['conflict_skip'] = 'Pular (manter existente)';
$string['conflict_overwrite'] = 'Sobrescrever (substituir existente)';
$string['conflict_rename'] = 'Renomear (adicionar sufixo .imported)';
$string['import_info_title'] = 'Importar Esquemas';
$string['import_info_text'] = 'Você pode importar esquemas de arquivos YAML ou arquivos ZIP:';
$string['import_info_yaml'] = 'Arquivo YAML único (.yaml ou .yml)';
$string['import_info_zip'] = 'Arquivo ZIP contendo vários arquivos YAML';
$string['import_complete'] = 'Importação completa: {$a->imported} importados, {$a->skipped} pulados, {$a->errors_count} com erros.';
$string['import_error_no_id'] = 'O YAML não contém um campo meta.id válido.';
$string['no_file_uploaded'] = 'Nenhum arquivo foi carregado.';
$string['no_schemas_to_export'] = 'Não há esquemas para exportar.';
$string['export_error'] = 'Erro ao criar arquivo de exportação.';

// Bulk operations.
$string['selected'] = 'Selected';
$string['select_all'] = 'Selecionar tudo';
$string['bulk_enable'] = 'Habilitar';
$string['bulk_disable'] = 'Desabilitar';
$string['bulk_export'] = 'Exportar';
$string['bulk_delete'] = 'Excluir';
$string['bulk_delete_confirm'] = 'Tem certeza de que deseja excluir os esquemas selecionados? Esta ação não pode ser desfeita.';
$string['bulk_enabled'] = '{$a} esquema(s) foram habilitados.';
$string['bulk_disabled'] = '{$a} esquema(s) foram desabilitados.';
$string['bulk_deleted'] = '{$a} esquema(s) foram excluídos.';
$string['bulk_deleted_with_errors'] = '{$a->count} esquema(s) excluídos, ocorreram {$a->errors} erro(s).';
$string['no_schemas_selected'] = 'Nenhum esquema foi selecionado.';
$string['invalid_action'] = 'Ação inválida.';

// Version history.
$string['version_history'] = 'Histórico de Versões';
$string['version'] = 'Versão';
$string['current'] = 'Atual';
$string['rollback'] = 'Reverter';
$string['rollback_confirm'] = 'Tem certeza de que deseja reverter para esta versão? As alterações atuais serão salvas como backup.';
$string['rollback_success'] = 'O esquema foi revertido com sucesso.';
$string['rollback_error'] = 'Erro ao reverter esquema';
$string['rollback_backup'] = 'Backup antes da reversão';
$string['rollback_to_version'] = 'Revertido para a versão {$a}';
$string['no_history'] = 'Nenhum histórico de versão disponível para este esquema.';
$string['history_count'] = 'Mostrando {$a} versão(s).';
$string['historynotfound'] = 'Registro de histórico não encontrado.';
$string['view_yaml'] = 'Visualizar YAML';

// Pagination.
$string['pagination_page_info'] = 'Página {$a->current} / {$a->total}';
$string['pagination_first'] = 'Primeira';
$string['pagination_last'] = 'Última';
$string['pagination_previous'] = 'Anterior';
$string['pagination_next'] = 'Próxima';

// Filters.
$string['filters'] = 'Filtros';
$string['filters_applied'] = 'Filtros aplicados';
$string['filters_active'] = 'Filtros ativos';
$string['filter_status'] = 'Status';
$string['filter_status_all'] = 'Todos';
$string['filter_name'] = 'Buscar nome...';
$string['filter_per_page'] = 'Por página';
$string['filter_date_from'] = 'Data de';
$string['filter_date_to'] = 'Data até';
$string['filter_version'] = 'Versão';
$string['filter_clear'] = 'Limpar';
$string['filter_apply'] = 'Aplicar';
$string['no_schemas_filtered'] = 'Nenhum esquema encontrado com os filtros aplicados.';

// Comparison.
$string['compare_versions'] = 'Comparar Versões';
$string['compare_select_two'] = 'Selecione exatamente duas versões para comparar.';
$string['back_to_history'] = 'Voltar ao Histórico';

// Documentation link.
$string['view_documentation'] = 'Visualizar Documentação';
$string['view_documentation_desc'] = 'Veja a documentação completa para o formato de esquema YAML.';
