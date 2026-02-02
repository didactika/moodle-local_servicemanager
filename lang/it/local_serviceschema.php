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

$string['pluginname'] = 'Gestore Schemi di Servizio';
$string['privacy:metadata'] = 'Il plugin Gestore Schemi di Servizio non memorizza dati personali.';
$string['serviceschema:manage'] = 'Gestire schemi di servizio';
$string['serviceschema:view'] = 'Visualizzare schemi di servizio';
$string['dashboard'] = 'Dashboard Schemi di Servizio';
$string['upload_schema'] = 'Carica Schema';
$string['edit_schema'] = 'Modifica Schema';
$string['view_schema'] = 'Vedi Schema';
$string['manage_schemas'] = 'Gestisci Schemi';
$string['yamlfile'] = 'File Schema YAML';
$string['yamlfile_help'] = 'Carica un file YAML contenente la definizione dello schema del servizio. Sono accettati solo file .yaml e .yml.<br><br><a href="/local/serviceschema/pages/documentation.php" target="_blank"><strong>📖 Vedi Documentazione</strong></a>';
$string['yamlcontent'] = 'Contenuto YAML';
$string['yamlcontent_help'] = 'Modifica direttamente la definizione dello schema YAML.<br><br><a href="/local/serviceschema/pages/documentation.php" target="_blank"><strong>📖 Vedi Documentazione</strong></a>';
$string['generatetoken'] = 'Genera token automaticamente';
$string['generatetoken_desc'] = 'Se selezionato, verrà generato un token per l\'utente del servizio e mostrato dopo il caricamento.';
$string['upload'] = 'Carica Schema';
$string['schema_id'] = 'ID Schema';
$string['schema_name'] = 'Nome';
$string['schema_version'] = 'Versione';
$string['schema_maintainer'] = 'Manutentore';
$string['schema_description'] = 'Descrizione';
$string['schema_status'] = 'Stato';
$string['schema_enabled'] = 'Abilitato';
$string['schema_created'] = 'Creato';
$string['schema_modified'] = 'Ultima Modifica';
$string['status_healthy'] = 'Sano';
$string['status_warning'] = 'Attenzione';
$string['status_critical'] = 'Critico';
$string['action_view'] = 'Vedi';
$string['action_edit'] = 'Modifica';
$string['action_delete'] = 'Elimina';
$string['action_regenerate_token'] = 'Rigenera Token';
$string['action_disable'] = 'Disabilita';
$string['action_enable'] = 'Abilita';
$string['disabled'] = 'Disabilitato';
$string['token_generated'] = 'Token Generato con Successo';
$string['token_regenerated'] = 'Token Rigenerato con Successo';
$string['token_copy_warning'] = 'Copia questo token ora. Non verrà mostrato di nuovo per motivi di sicurezza.';
$string['copy'] = 'Copia';
$string['copied'] = 'Copiato!';
$string['token_name'] = 'Nome Token';
$string['current_token'] = 'Token Attuale';
$string['no_token'] = 'Nessun token generato';
$string['schema_created_success'] = 'Lo schema "{$a}" è stato creato con successo.';
$string['schema_updated_success'] = 'Lo schema "{$a}" è stato aggiornato con successo.';
$string['schema_deleted_success'] = 'Lo schema "{$a}" è stato eliminato con successo.';
$string['no_schemas'] = 'Non sono stati ancora definiti schemi. Carica un file YAML per creare il tuo primo schema.';
$string['changes_will_apply'] = 'Le modifiche verranno applicate all\'utente, al ruolo e al servizio al salvataggio.';
$string['error_invalid_yaml'] = 'Formato YAML non valido: {$a}';
$string['error_missing_meta'] = 'Sezione "meta" richiesta mancante nel YAML.';
$string['error_missing_meta_id'] = 'Campo "meta.id" richiesto mancante.';
$string['error_missing_meta_name'] = 'Campo "meta.name" richiesto mancante.';
$string['error_missing_meta_version'] = 'Campo "meta.version" richiesto mancante.';
$string['error_missing_definition'] = 'Sezione "definition" richiesta mancante.';
$string['error_missing_functions'] = 'Array "definition.functions" richiesto mancante.';
$string['error_invalid_schema_id'] = 'L\'ID schema "{$a}" non è valido. Sono consentiti solo lettere, numeri e punti (.).';
$string['error_schema_id_exists'] = 'Esiste già uno schema con l\'ID "{$a}".';
$string['error_function_not_found'] = 'La funzione "{$a}" non esiste in questa installazione di Moodle.';
$string['error_critical_function_missing'] = 'Manca la funzione critica "{$a}". Impossibile creare lo schema.';
$string['error_version_change_required'] = 'Rilevati cambiamenti nel contenuto. Devi aggiornare il numero di versione nel YAML (ad esempio, incrementare la versione) per salvare questi cambiamenti.';
$string['error_plugin_not_installed'] = 'Il plugin richiesto "{$a}" non è installato.';
$string['warning_function_missing'] = 'Manca la funzione non critica "{$a}".';
$string['warning_user_email_not_found'] = 'Utente con email "{$a}" non trovato. Autorizzazione saltata.';
$string['warning_plugin_not_installed'] = 'Il plugin raccomandato "{$a}" non è installato.';
$string['healthcheck_task'] = 'Controllo Integrità Schemi di Servizio';
$string['healthcheck_report_subject'] = 'Rapporto Integrità Schemi di Servizio';
$string['healthcheck_all_healthy'] = 'Tutti gli schemi di servizio sono sani.';
$string['healthcheck_issues_found'] = 'Rilevati problemi in {$a} schema(i).';
$string['confirm_delete'] = 'Sei sicuro di voler eliminare lo schema "{$a}"? Questo eliminerà anche l\'utente associato, il ruolo e il servizio.';
$string['confirm_regenerate_token'] = 'Sei sicuro di voler rigenerare il token? Il token attuale verrà invalidato immediatamente.';
$string['service_user'] = 'Utente di Servizio';
$string['service_role'] = 'Ruolo di Servizio';
$string['external_service'] = 'Servizio Esterno';
$string['authorized_users'] = 'Utenti Autorizzati';
$string['functions'] = 'Funzioni';
$string['function_name'] = 'Nome Funzione';
$string['function_critical'] = 'Critica';
$string['function_status'] = 'Stato';
$string['function_exists'] = 'Esiste';
$string['function_missing'] = 'Mancante';
$string['capabilities'] = 'Capacità';
$string['extra_capabilities'] = 'Capacità Extra';
$string['calculated_capabilities'] = 'Calcolate dalle Funzioni';
$string['settings'] = 'Impostazioni';
$string['settings_notifications'] = 'Notifiche';
$string['settings_notifications_desc'] = 'Configura chi riceve le notifiche di controllo integrità.';
$string['settings_healthcheck'] = 'Controllo Integrità';
$string['settings_healthcheck_desc'] = 'Configura il monitoraggio automatico dell\'integrità.';
$string['settings_cleanup'] = 'Pulizia Log';
$string['settings_cleanup_desc'] = 'Configura la pulizia automatica dei log per prevenire la crescita del database.';
$string['notification_emails'] = 'Email di notifica';
$string['notification_emails_desc'] = 'Elenco di indirizzi email separati da virgola per ricevere notifiche di integrità. Lasciare vuoto per usare solo gli amministratori del sito.';
$string['notify_admins'] = 'Notifica anche gli amministratori';
$string['notify_admins_desc'] = 'Invia notifiche agli amministratori del sito oltre alle email sopra.';
$string['notification_level'] = 'Livello di notifica';
$string['notification_level_desc'] = 'Livello di stato minimo per attivare le notifiche.';
$string['notification_level_all'] = 'Tutto (incluso sano)';
$string['healthcheck_enabled'] = 'Abilita controllo integrità';
$string['healthcheck_enabled_desc'] = 'Esegui controlli automatici di integrità sugli schemi.';
$string['cleanup_enabled'] = 'Abilita pulizia log';
$string['cleanup_enabled_desc'] = 'Elimina automaticamente i vecchi log di integrità.';
$string['cleanup_retention_days'] = 'Ritenzione log (giorni)';
$string['cleanup_retention_days_desc'] = 'Numero di giorni per conservare i log. I log più vecchi di questi verranno eliminati.';
$string['cleanup_task'] = 'Pulizia Log Schemi di Servizio';
$string['documentation'] = 'Documentazione Schema';
$string['schema_reference'] = 'Riferimento Schema YAML';
$string['quick_links'] = 'Link Rapidi';
$string['download_example'] = 'Scarica File di Esempio';
$string['download_example_desc'] = 'Ottieni un file schema YAML di esempio funzionante';
$string['doc_structure'] = 'Struttura Schema';
$string['doc_structure_desc'] = 'Un file YAML di schema di servizio deve contenere le seguenti sezioni:';
$string['doc_meta'] = 'Sezione Meta';
$string['doc_definition'] = 'Sezione Definizione';
$string['doc_definition_desc'] = 'La sezione definizione specifica le funzioni del servizio web e le capacità.';
$string['doc_naming'] = 'Convenzioni di Naming';
$string['doc_example'] = 'Esempio Completo';
$string['doc_functions_desc'] = 'Le funzioni possono essere specificate in formato semplice o esteso:';
$string['doc_meta_id'] = 'Identificatore unico. Sono consentiti solo lettere, numeri e punti (.).';
$string['doc_meta_name'] = 'Nome leggibile per il servizio.';
$string['doc_meta_version'] = 'Stringa di versione (si raccomanda versionamento semantico).';
$string['doc_meta_maintainer'] = 'Persona o team responsabile dello schema.';
$string['doc_meta_description'] = 'Breve descrizione dello scopo del servizio.';
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
$string['import_file'] = 'File di Importazione';
$string['import_file_help'] = 'Carica un file schema YAML (.yaml, .yml) o un archivio ZIP contenente più schemi.';
$string['conflict_handling'] = 'Gestione Conflitti';
$string['conflict_action'] = 'Se l\'ID schema esiste';
$string['conflict_action_help'] = 'Scegli cosa fare quando esiste già uno schema con lo stesso ID.';
$string['conflict_skip'] = 'Salta (mantieni esistente)';
$string['conflict_overwrite'] = 'Sovrascrivi (sostituisci esistente)';
$string['conflict_rename'] = 'Rinomina (aggiungi suffisso .imported)';
$string['import_info_title'] = 'Importa Schemi';
$string['import_info_text'] = 'Puoi importare schemi da file YAML o archivi ZIP:';
$string['import_info_yaml'] = 'Singolo file YAML (.yaml o .yml)';
$string['import_info_zip'] = 'Archivio ZIP contenente più file YAML';
$string['import_complete'] = 'Importazione completata: {$a->imported} importati, {$a->skipped} saltati.';
$string['import_error_no_id'] = 'Il YAML non contiene un campo meta.id valido.';
$string['no_file_uploaded'] = 'Nessun file caricato.';
$string['no_schemas_to_export'] = 'Non ci sono schemi da esportare.';
$string['export_error'] = 'Errore durante la creazione del file di esportazione.';

// Bulk operations.
$string['selected'] = 'selezionato(i)';
$string['select_all'] = 'Seleziona tutto';
$string['bulk_enable'] = 'Abilita';
$string['bulk_disable'] = 'Disabilita';
$string['bulk_export'] = 'Esporta';
$string['bulk_delete'] = 'Elimina';
$string['bulk_delete_confirm'] = 'Sei sicuro di voler eliminare gli schemi selezionati? Questa azione non può essere annullata.';
$string['bulk_enabled'] = '{$a} schema(i) sono stati abilitati.';
$string['bulk_disabled'] = '{$a} schema(i) sono stati disabilitati.';
$string['bulk_deleted'] = '{$a} schema(i) sono stati eliminati.';
$string['bulk_deleted_with_errors'] = '{$a->count} schema(i) eliminati, {$a->errors} errore(i) verificatisi.';
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
$string['view_yaml'] = 'Vedi YAML';
