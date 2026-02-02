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
 * Stringhe per local_serviceschema (Italiano)
 *
 * @package    local_serviceschema
 * @author     Hector Arrechea <hector.arrechea@ct.uneatlantico.es>
 * @copyright  2026 ADSDR
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

// Generale.
$string['pluginname'] = 'Gestore Schema Servizi';
$string['privacy:metadata'] = 'Il plugin Gestore Schema Servizi non memorizza dati personali.';

// Capacità.
$string['serviceschema:manage'] = 'Gestire schemi di servizio';
$string['serviceschema:view'] = 'Visualizzare schemi di servizio';

// Navigazione e pagine.
$string['dashboard'] = 'Dashboard Schema Servizi';
$string['upload_schema'] = 'Carica Schema';
$string['edit_schema'] = 'Modifica Schema';
$string['view_schema'] = 'Visualizza Schema';
$string['manage_schemas'] = 'Gestisci Schemi';

// Campi del form.
$string['yamlfile'] = 'File YAML dello Schema';
$string['yamlfile_help'] = 'Carica un file YAML contenente la definizione dello schema di servizio. Solo file .yaml e .yml sono accettati.';
$string['yamlcontent'] = 'Contenuto YAML';
$string['yamlcontent_help'] = 'Modifica la definizione dello schema YAML direttamente.';
$string['generatetoken'] = 'Genera token automaticamente';
$string['generatetoken_desc'] = 'Se selezionato, verrà generato un token per l\'utente del servizio e mostrato dopo il caricamento.';
$string['upload'] = 'Carica Schema';

// Campi dello schema.
$string['schema_id'] = 'ID Schema';
$string['schema_name'] = 'Nome';
$string['schema_version'] = 'Versione';
$string['schema_maintainer'] = 'Responsabile';
$string['schema_description'] = 'Descrizione';
$string['schema_status'] = 'Stato';
$string['schema_enabled'] = 'Abilitato';
$string['schema_created'] = 'Creato';
$string['schema_modified'] = 'Ultima Modifica';

// Etichette di stato.
$string['status_healthy'] = 'Sano';
$string['status_warning'] = 'Avviso';
$string['status_critical'] = 'Critico';

// Azioni.
$string['action_view'] = 'Visualizza';
$string['action_edit'] = 'Modifica';
$string['action_delete'] = 'Elimina';
$string['action_regenerate_token'] = 'Rigenera Token';
$string['action_disable'] = 'Disabilita';
$string['action_enable'] = 'Abilita';

// Token.
$string['token_generated'] = 'Token Generato con Successo';
$string['token_regenerated'] = 'Token Rigenerato con Successo';
$string['token_copy_warning'] = 'Copia questo token ora. Non verrà mostrato di nuovo per motivi di sicurezza.';
$string['copy'] = 'Copia';
$string['copied'] = 'Copiato!';
$string['token_name'] = 'Nome Token';
$string['current_token'] = 'Token Attuale';
$string['no_token'] = 'Nessun token generato';

// Messaggi.
$string['schema_created_success'] = 'Lo schema "{$a}" è stato creato con successo.';
$string['schema_updated_success'] = 'Lo schema "{$a}" è stato aggiornato con successo.';
$string['schema_deleted_success'] = 'Lo schema "{$a}" è stato eliminato con successo.';
$string['no_schemas'] = 'Nessuno schema definito. Carica un file YAML per creare il tuo primo schema.';
$string['changes_will_apply'] = 'Le modifiche verranno applicate all\'utente, ruolo e servizio quando salvi.';

// Errori di validazione.
$string['error_invalid_yaml'] = 'Formato YAML non valido: {$a}';
$string['error_missing_meta'] = 'Sezione "meta" richiesta mancante nel YAML.';
$string['error_missing_meta_id'] = 'Campo "meta.id" richiesto mancante.';
$string['error_missing_meta_name'] = 'Campo "meta.name" richiesto mancante.';
$string['error_missing_meta_version'] = 'Campo "meta.version" richiesto mancante.';
$string['error_missing_definition'] = 'Sezione "definition" richiesta mancante.';
$string['error_missing_functions'] = 'Array "definition.functions" richiesto mancante.';
$string['error_invalid_schema_id'] = 'ID schema "{$a}" non valido. Solo lettere, numeri e punti (.) sono permessi.';
$string['error_schema_id_exists'] = 'Uno schema con ID "{$a}" esiste già.';
$string['error_function_not_found'] = 'La funzione "{$a}" non esiste in questa installazione Moodle.';
$string['error_critical_function_missing'] = 'Funzione critica "{$a}" mancante. Lo schema non può essere creato.';
$string['error_plugin_not_installed'] = 'Plugin richiesto "{$a}" non installato.';

// Avvisi.
$string['warning_function_missing'] = 'Funzione non critica "{$a}" mancante.';
$string['warning_user_email_not_found'] = 'Utente con email "{$a}" non trovato. Autorizzazione saltata.';
$string['warning_plugin_not_installed'] = 'Plugin consigliato "{$a}" non installato.';

// Controllo salute.
$string['healthcheck_task'] = 'Controllo Salute Schema Servizi';
$string['healthcheck_report_subject'] = 'Report Salute Schema Servizi';
$string['healthcheck_all_healthy'] = 'Tutti gli schemi di servizio sono sani.';
$string['healthcheck_issues_found'] = 'Problemi rilevati in {$a} schema/i.';

// Dialoghi di conferma.
$string['confirm_delete'] = 'Sei sicuro di voler eliminare lo schema "{$a}"? Questo eliminerà anche l\'utente, ruolo e servizio associati.';
$string['confirm_regenerate_token'] = 'Sei sicuro di voler rigenerare il token? Il token attuale verrà invalidato immediatamente.';

// Utente servizio.
$string['service_user'] = 'Utente Servizio';
$string['service_role'] = 'Ruolo Servizio';
$string['external_service'] = 'Servizio Esterno';
$string['authorized_users'] = 'Utenti Autorizzati';

// Funzioni.
$string['functions'] = 'Funzioni';
$string['function_name'] = 'Nome Funzione';
$string['function_critical'] = 'Critica';
$string['function_status'] = 'Stato';
$string['function_exists'] = 'Esiste';
$string['function_missing'] = 'Mancante';

// Capacità.
$string['capabilities'] = 'Capacità';
$string['extra_capabilities'] = 'Capacità Extra';
$string['calculated_capabilities'] = 'Calcolate dalle Funzioni';

// Impostazioni.
$string['settings'] = 'Impostazioni';
$string['settings_notifications'] = 'Notifiche';
$string['settings_notifications_desc'] = 'Configura chi riceve le notifiche del controllo salute.';
$string['settings_healthcheck'] = 'Controllo Salute';
$string['settings_healthcheck_desc'] = 'Configura il monitoraggio automatico della salute.';
$string['settings_cleanup'] = 'Pulizia Log';
$string['settings_cleanup_desc'] = 'Configura la pulizia automatica dei log per prevenire la crescita del database.';

$string['notification_emails'] = 'Email di notifica';
$string['notification_emails_desc'] = 'Lista di indirizzi email separati da virgola per ricevere notifiche. Lascia vuoto per usare solo gli amministratori del sito.';
$string['notify_admins'] = 'Notifica anche amministratori';
$string['notify_admins_desc'] = 'Invia notifiche agli amministratori del sito oltre alle email sopra.';
$string['notification_level'] = 'Livello di notifica';
$string['notification_level_desc'] = 'Livello di stato minimo per attivare le notifiche.';
$string['notification_level_all'] = 'Tutti (inclusi sani)';

$string['healthcheck_enabled'] = 'Abilita controllo salute';
$string['healthcheck_enabled_desc'] = 'Esegui controlli automatici della salute sugli schemi.';

$string['cleanup_enabled'] = 'Abilita pulizia log';
$string['cleanup_enabled_desc'] = 'Elimina automaticamente i vecchi log del controllo salute.';
$string['cleanup_retention_days'] = 'Ritenzione log (giorni)';
$string['cleanup_retention_days_desc'] = 'Numero di giorni per mantenere i log. I log più vecchi verranno eliminati.';
$string['cleanup_task'] = 'Pulizia Log Schema Servizi';
