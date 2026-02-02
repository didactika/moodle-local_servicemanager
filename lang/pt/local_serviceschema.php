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

$string['pluginname'] = 'Gerenciador de Esquemas de Serviço';
$string['privacy:metadata'] = 'O plugin Gerenciador de Esquemas de Serviço não armazena dados pessoais.';
$string['serviceschema:manage'] = 'Gerenciar esquemas de serviço';
$string['serviceschema:view'] = 'Visualizar esquemas de serviço';
$string['dashboard'] = 'Painel de Esquemas de Serviço';
$string['upload_schema'] = 'Enviar Esquema';
$string['edit_schema'] = 'Editar Esquema';
$string['view_schema'] = 'Ver Esquema';
$string['manage_schemas'] = 'Gerenciar Esquemas';
$string['yamlfile'] = 'Arquivo de Esquema YAML';
$string['yamlfile_help'] = 'Envie um arquivo YAML contendo a definição do esquema de serviço. Apenas arquivos .yaml e .yml são aceitos.<br><br><a href="/local/serviceschema/pages/documentation.php" target="_blank"><strong>📖 Ver Documentação</strong></a>';
$string['yamlcontent'] = 'Conteúdo YAML';
$string['yamlcontent_help'] = 'Edite a definição do esquema YAML diretamente.<br><br><a href="/local/serviceschema/pages/documentation.php" target="_blank"><strong>📖 Ver Documentação</strong></a>';
$string['generatetoken'] = 'Gerar token automaticamente';
$string['generatetoken_desc'] = 'Se marcado, um token será gerado para o usuário do serviço e exibido após o envio.';
$string['upload'] = 'Enviar Esquema';
$string['schema_id'] = 'ID do Esquema';
$string['schema_name'] = 'Nome';
$string['schema_version'] = 'Versão';
$string['schema_maintainer'] = 'Mantenedor';
$string['schema_description'] = 'Descrição';
$string['schema_status'] = 'Status';
$string['schema_enabled'] = 'Habilitado';
$string['schema_created'] = 'Criado';
$string['schema_modified'] = 'Última Modificação';
$string['status_healthy'] = 'Saudável';
$string['status_warning'] = 'Aviso';
$string['status_critical'] = 'Crítico';
$string['action_view'] = 'Ver';
$string['action_edit'] = 'Editar';
$string['action_delete'] = 'Excluir';
$string['action_regenerate_token'] = 'Regenerar Token';
$string['action_disable'] = 'Desabilitar';
$string['action_enable'] = 'Habilitar';
$string['disabled'] = 'Desabilitado';
$string['token_generated'] = 'Token Gerado com Sucesso';
$string['token_regenerated'] = 'Token Regenerado com Sucesso';
$string['token_copy_warning'] = 'Copie este token agora. Ele não será exibido novamente por razões de segurança.';
$string['copy'] = 'Copiar';
$string['copied'] = 'Copiado!';
$string['token_name'] = 'Nome do Token';
$string['current_token'] = 'Token Atual';
$string['no_token'] = 'Nenhum token gerado';
$string['schema_created_success'] = 'O esquema "{$a}" foi criado com sucesso.';
$string['schema_updated_success'] = 'O esquema "{$a}" foi atualizado com sucesso.';
$string['schema_deleted_success'] = 'O esquema "{$a}" foi excluído com sucesso.';
$string['no_schemas'] = 'Nenhum esquema foi definido ainda. Envie um arquivo YAML para criar seu primeiro esquema.';
$string['changes_will_apply'] = 'As alterações serão aplicadas ao usuário, papel e serviço quando você salvar.';
$string['error_invalid_yaml'] = 'Formato YAML inválido: {$a}';
$string['error_missing_meta'] = 'Seção "meta" obrigatória faltando no YAML.';
$string['error_missing_meta_id'] = 'Campo "meta.id" obrigatório faltando.';
$string['error_missing_meta_name'] = 'Campo "meta.name" obrigatório faltando.';
$string['error_missing_meta_version'] = 'Campo "meta.version" obrigatório faltando.';
$string['error_missing_definition'] = 'Seção "definition" obrigatória faltando.';
$string['error_missing_functions'] = 'Array "definition.functions" obrigatório faltando.';
$string['error_invalid_schema_id'] = 'O ID de esquema "{$a}" é inválido. Apenas letras, números e pontos (.) são permitidos.';
$string['error_schema_id_exists'] = 'Já existe um esquema com o ID "{$a}".';
$string['error_function_not_found'] = 'A função "{$a}" não existe nesta instalação do Moodle.';
$string['error_critical_function_missing'] = 'A função crítica "{$a}" está faltando. Não é possível criar o esquema.';
$string['error_version_change_required'] = 'Alterações de conteúdo detectadas. Você deve atualizar o número da versão no YAML (por exemplo, incrementar a versão) para salvar essas alterações.';
$string['error_plugin_not_installed'] = 'O plugin obrigatório "{$a}" não está instalado.';
$string['warning_function_missing'] = 'A função não crítica "{$a}" está faltando.';
$string['warning_user_email_not_found'] = 'Usuário com email "{$a}" não encontrado. Pulando autorização.';
$string['warning_plugin_not_installed'] = 'O plugin recomendado "{$a}" não está instalado.';
$string['healthcheck_task'] = 'Verificação de Saúde de Esquemas de Serviço';
$string['healthcheck_report_subject'] = 'Relatório de Saúde de Esquemas de Serviço';
$string['healthcheck_all_healthy'] = 'Todos os esquemas de serviço estão saudáveis.';
$string['healthcheck_issues_found'] = 'Problemas detectados em {$a} esquema(s).';
$string['confirm_delete'] = 'Tem certeza de que deseja excluir o esquema "{$a}"? Isso também excluirá o usuário associado, o papel e o serviço.';
$string['confirm_regenerate_token'] = 'Tem certeza de que deseja regenerar o token? O token atual será invalidado imediatamente.';
$string['service_user'] = 'Usuário de Serviço';
$string['service_role'] = 'Papel de Serviço';
$string['external_service'] = 'Serviço Externo';
$string['authorized_users'] = 'Usuários Autorizados';
$string['functions'] = 'Funções';
$string['function_name'] = 'Nome da Função';
$string['function_critical'] = 'Crítica';
$string['function_status'] = 'Status';
$string['function_exists'] = 'Existe';
$string['function_missing'] = 'Faltando';
$string['capabilities'] = 'Capacidades';
$string['extra_capabilities'] = 'Capacidades Extras';
$string['calculated_capabilities'] = 'Calculadas a partir das Funções';
$string['settings'] = 'Configurações';
$string['settings_notifications'] = 'Notificações';
$string['settings_notifications_desc'] = 'Configurar quem recebe as notificações de verificação de saúde.';
$string['settings_healthcheck'] = 'Verificação de Saúde';
$string['settings_healthcheck_desc'] = 'Configurar o monitoramento automático de saúde.';
$string['settings_cleanup'] = 'Limpeza de Logs';
$string['settings_cleanup_desc'] = 'Configurar a limpeza automática de logs para evitar o crescimento do banco de dados.';
$string['notification_emails'] = 'Emails de notificação';
$string['notification_emails_desc'] = 'Lista de endereços de email separados por vírgula para receber notificações de saúde. Deixe em branco para usar apenas os administradores do site.';
$string['notify_admins'] = 'Notificar também administradores';
$string['notify_admins_desc'] = 'Enviar notificações aos administradores do site além dos emails acima.';
$string['notification_level'] = 'Nível de notificação';
$string['notification_level_desc'] = 'Nível mínimo de status para acionar notificações.';
$string['notification_level_all'] = 'Tudo (incluindo saudável)';
$string['healthcheck_enabled'] = 'Habilitar verificação de saúde';
$string['healthcheck_enabled_desc'] = 'Executar verificações automáticas de saúde nos esquemas.';
$string['cleanup_enabled'] = 'Habilitar limpeza de logs';
$string['cleanup_enabled_desc'] = 'Excluir automaticamente logs de saúde antigos.';
$string['cleanup_retention_days'] = 'Retenção de logs (dias)';
$string['cleanup_retention_days_desc'] = 'Número de dias para manter logs. Logs mais antigos que isso serão excluídos.';
$string['cleanup_task'] = 'Limpeza de Logs de Esquemas de Serviço';
$string['documentation'] = 'Documentação do Esquema';
$string['schema_reference'] = 'Referência do Esquema YAML';
$string['quick_links'] = 'Links Rápidos';
$string['download_example'] = 'Baixar Arquivo de Exemplo';
$string['download_example_desc'] = 'Obtenha um arquivo de esquema YAML de exemplo funcional';
$string['doc_structure'] = 'Estrutura do Esquema';
$string['doc_structure_desc'] = 'Um arquivo YAML de esquema de serviço deve conter as seguintes seções:';
$string['doc_meta'] = 'Seção Meta';
$string['doc_definition'] = 'Seção de Definição';
$string['doc_definition_desc'] = 'A seção de definição especifica as funções do serviço web e as capacidades.';
$string['doc_naming'] = 'Convenções de Nomenclatura';
$string['doc_example'] = 'Exemplo Completo';
$string['doc_functions_desc'] = 'As funções podem ser especificadas em formato simples ou estendido:';
$string['doc_meta_id'] = 'Identificador único. Apenas letras, números e pontos (.) são permitidos.';
$string['doc_meta_name'] = 'Nome legível para o serviço.';
$string['doc_meta_version'] = 'String de versão (vercionamento semântico recomendado).';
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
$string['import_file'] = 'Arquivo de Importação';
$string['import_file_help'] = 'Envie um arquivo de esquema YAML (.yaml, .yml) ou um arquivo ZIP contendo vários esquemas.';
$string['conflict_handling'] = 'Tratamento de Conflitos';
$string['conflict_action'] = 'Quando o ID do esquema existe';
$string['conflict_action_help'] = 'Escolha o que fazer quando já existe um esquema com o mesmo ID.';
$string['conflict_skip'] = 'Pular (manter existente)';
$string['conflict_overwrite'] = 'Sobrescrever (substituir existente)';
$string['conflict_rename'] = 'Renomear (adicionar sufixo .imported)';
$string['import_info_title'] = 'Importar Esquemas';
$string['import_info_text'] = 'Você pode importar esquemas de arquivos YAML ou arquivos ZIP:';
$string['import_info_yaml'] = 'Arquivo YAML único (.yaml ou .yml)';
$string['import_info_zip'] = 'Arquivo ZIP contendo vários arquivos YAML';
$string['import_complete'] = 'Importação completa: {$a->imported} importados, {$a->skipped} pulados.';
$string['import_error_no_id'] = 'O YAML não contém um campo meta.id válido.';
$string['no_file_uploaded'] = 'Nenhum arquivo encontrado.';
$string['no_schemas_to_export'] = 'Não há esquemas para exportar.';
$string['export_error'] = 'Erro ao criar arquivo de exportação.';

// Bulk operations.
$string['selected'] = 'selecionado(s)';
$string['select_all'] = 'Selecionar tudo';
$string['bulk_enable'] = 'Habilitar';
$string['bulk_disable'] = 'Desabilitar';
$string['bulk_export'] = 'Exportar';
$string['bulk_delete'] = 'Excluir';
$string['bulk_delete_confirm'] = 'Tem certeza de que deseja excluir os esquemas selecionados? Esta ação não pode ser desfeita.';
$string['bulk_enabled'] = '{$a} esquema(s) foram habilitados.';
$string['bulk_disabled'] = '{$a} esquema(s) foram desabilitados.';
$string['bulk_deleted'] = '{$a} esquema(s) foram excluídos.';
$string['bulk_deleted_with_errors'] = '{$a->count} esquema(s) excluídos, {$a->errors} erro(s) ao processar.';
$string['no_schemas_selected'] = 'Nenhum esquema selecionado.';
$string['invalid_action'] = 'Ação inválida.';

// Version history.
$string['version_history'] = 'Histórico de Versões';
$string['version'] = 'Versão';
$string['current'] = 'Atual';
$string['rollback'] = 'Reverter';
$string['rollback_confirm'] = 'Tem certeza de que deseja reverter para esta versão? As alterações atuais serão salvas como backup.';
$string['rollback_success'] = 'O esquema foi revertido com sucesso.';
$string['rollback_error'] = 'Erro ao reverter o esquema';
$string['rollback_backup'] = 'Backup antes da reversão';
$string['rollback_to_version'] = 'Revertido para a versão {$a}';
$string['no_history'] = 'Nenhum histórico de versão disponível para este esquema.';
$string['history_count'] = 'Exibindo {$a} versão(ões).';
$string['historynotfound'] = 'Registro de histórico não encontrado.';
$string['view_yaml'] = 'Ver YAML';
