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
$string['pluginname'] = 'Gestore Servizi';
$string['privacy:metadata'] = 'Il plugin Gestore Schemi di Servizi non memorizza dati personali.';

// Capabilities.
$string['serviceschema:manage'] = 'Gestire schemi di servizio';
$string['serviceschema:view'] = 'Visualizzare schemi di servizio';

// Navigation and pages.
$string['dashboard'] = 'Dashboard degli Schemi di Servizi';
$string['upload_schema'] = 'Carica Schema';
$string['edit_schema'] = 'Modifica Schema';
$string['view_schema'] = 'Visualizza Schema';
$string['manage_schemas'] = 'Gestisci Schemi';

// Web service status panel.
$string['ws_status_panel'] = 'Stato dei Servizi Web';
$string['ws_status_operational'] = 'Operativo';
$string['ws_status_warning'] = 'Nessun protocollo abilitato';
$string['ws_status_disabled'] = 'Disabilitato';
$string['ws_enabled_label'] = 'Abilitato';
$string['ws_disabled_label'] = 'Disabilitato';
$string['ws_services_label'] = 'Servizi Web';
$string['ws_protocols_label'] = 'Protocolli Abilitati';
$string['ws_health_label'] = 'Riepilogo Salute';
$string['ws_overview_link'] = 'Panoramica dei servizi web';
$string['ws_manage_protocols_link'] = 'Gestisci protocolli';

// Form fields.
$string['yamlfile'] = 'File Schema YAML';
$string['yamlfile_help'] = 'Carica un file YAML contenente la definizione dello schema del servizio. Sono accettati solo file .yaml e .yml.<br><br><a href="/local/serviceschema/pages/documentation.php"><strong>📖 Visualizza Documentazione</strong></a>';
$string['yamlcontent'] = 'Contenuto YAML';
$string['yamlcontent_help'] = 'Modifica direttamente la definizione dello schema YAML.<br><br><a href="/local/serviceschema/pages/documentation.php"><strong>📖 Visualizza Documentazione</strong></a>';
$string['generatetoken'] = 'Genera token automaticamente';
$string['generatetoken_desc'] = 'Se selezionato, verrà generato un token per l\'utente di servizio e visualizzato dopo il caricamento.';
$string['upload'] = 'Carica Schema';

// Schema fields.
$string['schema_id'] = 'ID Schema';
$string['schema_information'] = 'Informazioni dello Schema';
$string['schema_name'] = 'Nome';
$string['schema_version'] = 'Versione';
$string['schema_maintainer'] = 'Manutentore';
$string['schema_description'] = 'Descrizione';
$string['schema_status'] = 'Stato';
$string['schema_enabled'] = 'Abilitato';
$string['schema_not_found'] = 'Schema non trovato. Potrebbe essere stato eliminato.';
$string['schema_created'] = 'Creato';
$string['schema_modified'] = 'Ultima Modifica';

// Status labels.
$string['status_healthy'] = 'Sano';
$string['status_warning'] = 'Attenzione';
$string['status_critical'] = 'Critico';

// Actions.
$string['action_view'] = 'Visualizza';
$string['action_edit'] = 'Modifica';
$string['action_delete'] = 'Elimina';
$string['action_regenerate_token'] = 'Rigenera Token';
$string['action_disable'] = 'Disabilita';
$string['action_enable'] = 'Abilita';
$string['disabled'] = 'Disabilitato';

// Token related.
$string['token_generated'] = 'Token Generato con Successo';
$string['token_regenerated'] = 'Token Rigenerato con Successo';
$string['token_copy_warning'] = 'Copia questo token ora. Non verrà mostrato nuovamente per motivi di sicurezza.';
$string['copy'] = 'Copia';
$string['copied'] = 'Copiato!';
$string['token_name'] = 'Nome Token';
$string['current_token'] = 'Token Attuale';
$string['no_token'] = 'Nessun token generato';

// Messages.
$string['schema_created_success'] = 'Lo schema "{$a}" è stato creato con successo.';
$string['schema_updated_success'] = 'Lo schema "{$a}" è stato aggiornato con successo.';
$string['schema_deleted_success'] = 'Lo schema "{$a}" è stato eliminato con successo.';
$string['no_schemas'] = 'Nessuno schema è stato ancora definito. Carica un file YAML per creare il tuo primo schema.';
$string['changes_will_apply'] = 'Le modifiche verranno applicate all\'utente, al ruolo e al servizio quando salvi.';

// Validation errors.
$string['error_invalid_yaml'] = 'Formato YAML non valido: {$a}';
$string['error_missing_meta'] = 'Sezione "meta" obbligatoria mancante nel YAML.';
$string['error_missing_meta_id'] = 'Campo "meta.id" obbligatorio mancante.';
$string['error_missing_meta_name'] = 'Campo "meta.name" obbligatorio mancante.';
$string['error_missing_meta_version'] = 'Campo "meta.version" obbligatorio mancante.';
$string['error_missing_definition'] = 'Sezione "definition" obbligatoria mancante.';
$string['error_missing_functions'] = 'Array "definition.functions" obbligatorio mancante.';
$string['error_invalid_schema_id'] = 'L\'ID dello schema "{$a}" non è valido. Sono consentiti solo lettere, numeri e punti (.).';
$string['error_schema_id_too_long'] = 'L\'ID dello schema è troppo lungo ({$a} caratteri). Il massimo consentito è 50 caratteri.';
$string['error_id_change_forbidden'] = 'Non è consentito modificare l\'ID dello schema. Crea un nuovo schema.';
$string['error_schema_id_exists'] = 'Esiste già uno schema con ID "{$a}".';
$string['error_schema_name_exists'] = 'Esiste già uno schema con il nome "{$a}". I nomi degli schemi devono essere univoci.';
$string['error_duplicate_function'] = 'La funzione "{$a}" è duplicata nella definizione.';
$string['error_function_not_found'] = 'La funzione "{$a}" non esiste in questa installazione di Moodle.';
$string['error_critical_function_missing'] = 'Manca la funzione critica "{$a}". Impossibile creare lo schema.';
$string['error_version_change_required'] = 'Rilevati cambiamenti nel contenuto. Devi aggiornare il numero di versione nel YAML (ad esempio, incrementare la versione) per salvare questi cambiamenti.';
$string['error_version_must_increment'] = 'La nuova versione ({$a->new}) deve essere maggiore della versione attuale ({$a->current}). Le versioni possono diminuire solo tramite ripristino dalla cronologia.';
$string['error_version_change_forbidden'] = 'La versione può essere modificata solo se la definizione dello schema viene modificata. Le modifiche ai metadati non richiedono un aggiornamento della versione.';
$string['error_plugin_not_installed'] = 'Il plugin richiesto "{$a}" non è installato.';

// Warnings.
$string['warning_function_missing'] = 'Manca la funzione non critica "{$a}".';
$string['warning_user_email_not_found'] = 'Utente con email "{$a}" non trovato. Autorizzazione saltata.';
$string['warning_plugin_not_installed'] = 'Il plugin raccomandato "{$a}" non è installato.';

// Health check.
$string['healthcheck_task'] = 'Controllo Integrità Schemi di Servizio';
$string['healthcheck_report_subject'] = 'Rapporto di Integrità Schemi di Servizio';
$string['healthcheck_all_healthy'] = 'Tutti gli schemi di servizio sono sani.';
$string['healthcheck_issues_found'] = 'Rilevati problemi in {$a} schema(i).';

// Confirmation dialogs.
$string['confirm_delete'] = 'Sei sicuro di voler eliminare lo schema "{$a}"? Questo eliminerà anche l\'utente associato, il ruolo e il servizio.';
$string['confirm_regenerate_token'] = 'Sei sicuro di voler rigenerare il token? Il token attuale verrà invalidato immediatamente.';

// Service user.
$string['schema_requirements'] = 'Requisiti';
$string['req_file_access'] = 'Accesso ai File';
$string['req_download_files'] = 'Può scaricare file';
$string['req_upload_files'] = 'Può caricare file';
$string['req_plugins'] = 'Plugin Richiesti';
$string['provisioned_resources'] = 'Risorse Provisionate';
$string['service_user'] = 'Utente di Servizio';
$string['service_role'] = 'Ruolo di Servizio';
$string['external_service'] = 'Servizio Esterno';
$string['authorized_users'] = 'Utenti Autorizzati';

// Functions.
$string['functions'] = 'Funzioni';
$string['function_name'] = 'Nome Funzione';
$string['function_critical'] = 'Critico';
$string['function_status'] = 'Stato';
$string['function_exists'] = 'Esiste';
$string['function_missing'] = 'Mancante';

// Capabilities.
$string['capabilities'] = 'Capacità';
$string['extra_capabilities'] = 'Capacità Extra';
$string['calculated_capabilities'] = 'Calcolato dalle Funzioni';

// Settings.
$string['settings'] = 'Impostazioni';
$string['settings_notifications'] = 'Notifiche';
$string['settings_notifications_desc'] = 'Configura chi riceve le notifiche di controllo integrità.';
$string['settings_healthcheck'] = 'Controllo Integrità';
$string['settings_healthcheck_desc'] = 'Configura il monitoraggio automatico dell\'integrità.';
$string['settings_cleanup'] = 'Pulizia Log';
$string['settings_cleanup_desc'] = 'Configura la pulizia automatica dei log per prevenire la crescita del database.';

$string['notification_emails'] = 'Email di notifica';
$string['notification_emails_desc'] = 'Elenco separato da virgole di indirizzi email per ricevere notifiche di integrità. Lasciare vuoto per utilizzare solo gli amministratori del sito.';
$string['notify_admins'] = 'Notifica anche gli amministratori del sito';
$string['notify_admins_desc'] = 'Invia notifiche agli amministratori del sito oltre alle email sopra.';
$string['notification_level'] = 'Livello di notifica';
$string['notification_level_desc'] = 'Livello di stato minimo per attivare le notifiche.';
$string['notification_level_all'] = 'Tutti (incluso sano)';

$string['healthcheck_enabled'] = 'Abilita controllo integrità';
$string['healthcheck_enabled_desc'] = 'Esegui controlli automatici di integrità sugli schemi.';

$string['cleanup_enabled'] = 'Abilita pulizia log';
$string['cleanup_enabled_desc'] = 'Elimina automaticamente i vecchi log di integrità.';
$string['cleanup_retention_days'] = 'Conservazione log (giorni)';
$string['cleanup_retention_days_desc'] = 'Numero di giorni per conservare i log di integrità. I log più vecchi verranno eliminati.';
$string['cleanup_task'] = 'Pulizia Log Schemi di Servizio';

// Version Retention.
$string['settings_version_retention'] = 'Politica di Conservazione Versioni';
$string['settings_version_retention_desc'] = 'Configura la pulizia automatica delle vecchie versioni degli schemi.';
$string['version_retention_enabled'] = 'Abilita Conservazione Versioni';
$string['version_retention_enabled_desc'] = 'Se abilitato, le vecchie versioni degli schemi verranno eliminate automaticamente, mantenendo solo le più recenti.';
$string['version_retention_max'] = 'Max Versioni Per Schema';
$string['version_retention_max_desc'] = 'Numero massimo di versioni storiche da mantenere per ogni schema. Le versioni più vecchie verranno eliminate per prime.';
$string['task_version_cleanup'] = 'Pulisci vecchie versioni degli schemi';
$string['task_scheduled_validation'] = 'Convalida programmata degli schemi';

// Documentation.
$string['documentation'] = 'Documentazione Schema';
$string['schema_reference'] = 'Riferimento Schema YAML';
$string['quick_links'] = 'Link Rapidi';
$string['download_example'] = 'Scarica File di Esempio';
$string['download_example_desc'] = 'Ottieni un file di schema YAML di esempio funzionante';
$string['doc_structure'] = 'Struttura Schema';
$string['doc_structure_desc'] = 'Un file YAML di schema di servizio deve contenere le seguenti sezioni:';
$string['doc_meta'] = 'Sezione Meta';
$string['doc_definition'] = 'Sezione Definizione';
$string['doc_definition_desc'] = 'La sezione definizione specifica le funzioni del servizio web e le capacità.';
$string['doc_naming'] = 'Convenzioni di Denominazione';
$string['doc_example'] = 'Esempio Completo';
$string['doc_example_complete_desc'] = 'L\'esempio di schema sopra mostra una configurazione funzionale completa.';
$string['doc_example_to_get_started'] = 'per iniziare rapidamente.';
$string['doc_functions_desc'] = 'Le funzioni possono essere specificate in formato semplice o esteso:';
$string['doc_meta_id'] = 'Identificatore unico. Sono consentiti solo lettere, numeri e punti (.). Massimo 50 caratteri.';
$string['doc_meta_name'] = 'Nome leggibile dall\'uomo per il servizio. Deve essere unico tra tutti gli schemi.';
$string['doc_meta_version'] = 'Stringa di versione (versionamento semantico raccomandato). Deve essere incrementata quando la definizione (funzioni o capacità) cambia; le modifiche solo ai metadati (nome, manutentore, descrizione) non richiedono aggiornamento della versione.';
$string['doc_meta_maintainer'] = 'Persona o team responsabile dello schema.';
$string['doc_meta_description'] = 'Breve descrizione dello scopo del servizio.';
$string['doc_requirements_plugins'] = 'Array di nomi di plugin Moodle che devono essere installati. Viene mostrato un avviso se alcuni mancano, ma la creazione dello schema non viene bloccata.';
$string['doc_requirements_download_files'] = 'Booleano. Se true, i consumatori di questo servizio possono scaricare file tramite l\'endpoint file del webservice Moodle. Default false.';
$string['doc_requirements_upload_files'] = 'Booleano. Se true, i consumatori di questo servizio possono caricare file tramite l\'endpoint di upload del webservice Moodle. Default false.';
$string['doc_default_capabilities'] = 'Le seguenti capacità vengono aggiunte automaticamente a ogni schema, indipendentemente dalle funzioni definite:';
$string['field'] = 'Campo';
$string['resource'] = 'Risorsa';
$string['pattern'] = 'Modello';
$string['back'] = 'Indietro';
$string['doc_example_col'] = 'Esempio';

// Import/Export.
$string['import_schemas'] = 'Importa Schemi';
$string['export_all'] = 'Esporta Tutto';
$string['action_export'] = 'Esporta';
$string['import'] = 'Importa';
$string['import_file'] = 'Importa File';
$string['import_file_help'] = 'Carica un file di schema YAML (.yaml, .yml) o un archivio ZIP contenente più schemi.';
$string['conflict_handling'] = 'Gestione Conflitti';
$string['conflict_action'] = 'Quando l\'ID dello schema esiste';
$string['conflict_action_help'] = 'Scegli cosa fare quando esiste già uno schema con lo stesso ID.';
$string['conflict_skip'] = 'Salta (mantieni esistente)';
$string['conflict_overwrite'] = 'Sovrascrivi (sostituisci esistente)';
$string['conflict_rename'] = 'Rinomina (aggiungi suffisso .imported)';
$string['import_info_title'] = 'Importa Schemi';
$string['import_info_text'] = 'Puoi importare schemi da file YAML o archivi ZIP:';
$string['import_info_yaml'] = 'Singolo file YAML (.yaml o .yml)';
$string['import_info_zip'] = 'Archivio ZIP contenente più file YAML';
$string['import_complete'] = 'Importazione completata: {$a->imported} importati, {$a->skipped} saltati, {$a->errors_count} con errori.';
$string['import_error_no_id'] = 'Il YAML non contiene un campo meta.id valido.';
$string['no_file_uploaded'] = 'Nessun file caricato.';
$string['no_schemas_to_export'] = 'Non ci sono schemi da esportare.';
$string['export_error'] = 'Errore durante la creazione del file di esportazione.';

// Bulk operations.
$string['selected'] = 'Selected';
$string['select_all'] = 'Seleziona tutto';
$string['bulk_enable'] = 'Abilita';
$string['bulk_disable'] = 'Disabilita';
$string['bulk_export'] = 'Esporta';
$string['bulk_delete'] = 'Elimina';
$string['bulk_delete_confirm'] = 'Sei sicuro di voler eliminare gli schemi selezionati? Questa azione non può essere annullata.';
$string['bulk_enabled'] = '{$a} schema(i) sono stati abilitati.';
$string['bulk_disabled'] = '{$a} schema(i) sono stati disabilitati.';
$string['bulk_deleted'] = '{$a} schema(i) sono stati eliminati.';
$string['bulk_deleted_with_errors'] = '{$a->count} schema(i) eliminati, si sono verificati {$a->errors} errore(i).';
$string['no_schemas_selected'] = 'Nessuno schema selezionato.';
$string['invalid_action'] = 'Azione non valida.';

// Version history.
$string['version_history'] = 'Cronologia Versioni';
$string['version'] = 'Versione';
$string['current'] = 'Attuale';
$string['rollback'] = 'Ripristina';
$string['rollback_confirm'] = 'Sei sicuro di voler ripristinare questa versione? Le modifiche attuali verranno salvate come backup.';
$string['rollback_success'] = 'Lo schema è stato ripristinato con successo.';
$string['rollback_error'] = 'Errore durante il ripristino dello schema';
$string['rollback_backup'] = 'Backup prima del ripristino';
$string['rollback_to_version'] = 'Ripristinato alla versione {$a}';
$string['no_history'] = 'Nessuna cronologia versioni disponibile per questo schema.';
$string['history_count'] = 'Visualizzazione di {$a} versione(i).';
$string['historynotfound'] = 'Record cronologia non trovato.';
$string['view_yaml'] = 'Visualizza YAML';

// Pagination.
$string['pagination_page_info'] = 'Pagina {$a->current} / {$a->total}';
$string['pagination_first'] = 'Prima';
$string['pagination_last'] = 'Ultima';
$string['pagination_previous'] = 'Precedente';
$string['pagination_next'] = 'Successiva';

// Filters.
$string['filters'] = 'Filtri';
$string['filters_applied'] = 'Filtri applicati';
$string['filters_active'] = 'Filtri attivi';
$string['filter_status'] = 'Stato';
$string['filter_status_all'] = 'Tutti';
$string['filter_name'] = 'Cerca nome...';
$string['filter_per_page'] = 'Per pagina';
$string['filter_date_from'] = 'Data da';
$string['filter_date_to'] = 'Data a';
$string['filter_version'] = 'Versione';
$string['filter_clear'] = 'Pulisci';
$string['filter_apply'] = 'Applica';
$string['no_schemas_filtered'] = 'Nessuno schema trovato con i filtri applicati.';

// Comparison.
$string['compare_versions'] = 'Confronta Versioni';
$string['compare_select_two'] = 'Seleziona esattamente due versioni da confrontare.';
$string['back_to_history'] = 'Torna alla Cronologia';

// Documentation link.
$string['view_documentation'] = 'Visualizza Documentazione';
$string['view_documentation_desc'] = 'Visualizza la documentazione completa per il formato schema YAML.';
