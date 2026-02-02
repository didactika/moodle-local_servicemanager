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
 * Chaînes pour local_serviceschema (Français)
 *
 * @package    local_serviceschema
 * @author     Hector Arrechea <hector.arrechea@ct.uneatlantico.es>
 * @copyright  2026 ADSDR
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

// Général.
$string['pluginname'] = 'Gestionnaire de Schémas de Services';
$string['privacy:metadata'] = 'Le plugin Gestionnaire de Schémas de Services ne stocke aucune donnée personnelle.';

// Capacités.
$string['serviceschema:manage'] = 'Gérer les schémas de services';
$string['serviceschema:view'] = 'Voir les schémas de services';

// Navigation et pages.
$string['dashboard'] = 'Tableau de Bord des Schémas';
$string['upload_schema'] = 'Télécharger un Schéma';
$string['edit_schema'] = 'Modifier le Schéma';
$string['view_schema'] = 'Voir le Schéma';
$string['manage_schemas'] = 'Gérer les Schémas';

// Champs du formulaire.
$string['yamlfile'] = 'Fichier YAML du Schéma';
$string['yamlfile_help'] = 'Téléchargez un fichier YAML contenant la définition du schéma de service. Seuls les fichiers .yaml et .yml sont acceptés.';
$string['yamlcontent'] = 'Contenu YAML';
$string['yamlcontent_help'] = 'Modifiez la définition du schéma YAML directement.';
$string['generatetoken'] = 'Générer le jeton automatiquement';
$string['generatetoken_desc'] = 'Si coché, un jeton sera généré pour l\'utilisateur du service et affiché après le téléchargement.';
$string['upload'] = 'Télécharger le Schéma';

// Champs du schéma.
$string['schema_id'] = 'ID du Schéma';
$string['schema_name'] = 'Nom';
$string['schema_version'] = 'Version';
$string['schema_maintainer'] = 'Responsable';
$string['schema_description'] = 'Description';
$string['schema_status'] = 'Statut';
$string['schema_enabled'] = 'Activé';
$string['schema_created'] = 'Créé';
$string['schema_modified'] = 'Dernière Modification';

// Libellés de statut.
$string['status_healthy'] = 'Sain';
$string['status_warning'] = 'Avertissement';
$string['status_critical'] = 'Critique';

// Actions.
$string['action_view'] = 'Voir';
$string['action_edit'] = 'Modifier';
$string['action_delete'] = 'Supprimer';
$string['action_regenerate_token'] = 'Régénérer le Jeton';
$string['action_disable'] = 'Désactiver';
$string['action_enable'] = 'Activer';

// Jeton.
$string['token_generated'] = 'Jeton Généré avec Succès';
$string['token_regenerated'] = 'Jeton Régénéré avec Succès';
$string['token_copy_warning'] = 'Copiez ce jeton maintenant. Il ne sera pas affiché à nouveau pour des raisons de sécurité.';
$string['copy'] = 'Copier';
$string['copied'] = 'Copié !';
$string['token_name'] = 'Nom du Jeton';
$string['current_token'] = 'Jeton Actuel';
$string['no_token'] = 'Aucun jeton généré';

// Messages.
$string['schema_created_success'] = 'Le schéma "{$a}" a été créé avec succès.';
$string['schema_updated_success'] = 'Le schéma "{$a}" a été mis à jour avec succès.';
$string['schema_deleted_success'] = 'Le schéma "{$a}" a été supprimé avec succès.';
$string['no_schemas'] = 'Aucun schéma défini. Téléchargez un fichier YAML pour créer votre premier schéma.';
$string['changes_will_apply'] = 'Les modifications seront appliquées à l\'utilisateur, au rôle et au service lors de l\'enregistrement.';

// Erreurs de validation.
$string['error_invalid_yaml'] = 'Format YAML invalide : {$a}';
$string['error_missing_meta'] = 'Section "meta" requise manquante dans le YAML.';
$string['error_missing_meta_id'] = 'Champ "meta.id" requis manquant.';
$string['error_missing_meta_name'] = 'Champ "meta.name" requis manquant.';
$string['error_missing_meta_version'] = 'Champ "meta.version" requis manquant.';
$string['error_missing_definition'] = 'Section "definition" requise manquante.';
$string['error_missing_functions'] = 'Tableau "definition.functions" requis manquant.';
$string['error_invalid_schema_id'] = 'ID de schéma "{$a}" invalide. Seuls les lettres, chiffres et points (.) sont autorisés.';
$string['error_schema_id_exists'] = 'Un schéma avec l\'ID "{$a}" existe déjà.';
$string['error_function_not_found'] = 'La fonction "{$a}" n\'existe pas dans cette installation Moodle.';
$string['error_critical_function_missing'] = 'Fonction critique "{$a}" manquante. Le schéma ne peut pas être créé.';
$string['error_plugin_not_installed'] = 'Plugin requis "{$a}" non installé.';

// Avertissements.
$string['warning_function_missing'] = 'Fonction non critique "{$a}" manquante.';
$string['warning_user_email_not_found'] = 'Utilisateur avec l\'email "{$a}" non trouvé. Autorisation ignorée.';
$string['warning_plugin_not_installed'] = 'Plugin recommandé "{$a}" non installé.';

// Vérification de santé.
$string['healthcheck_task'] = 'Vérification de Santé des Schémas';
$string['healthcheck_report_subject'] = 'Rapport de Santé des Schémas';
$string['healthcheck_all_healthy'] = 'Tous les schémas de services sont sains.';
$string['healthcheck_issues_found'] = 'Problèmes détectés dans {$a} schéma(s).';

// Dialogues de confirmation.
$string['confirm_delete'] = 'Êtes-vous sûr de vouloir supprimer le schéma "{$a}" ? Cela supprimera également l\'utilisateur, le rôle et le service associés.';
$string['confirm_regenerate_token'] = 'Êtes-vous sûr de vouloir régénérer le jeton ? Le jeton actuel sera invalidé immédiatement.';

// Utilisateur service.
$string['service_user'] = 'Utilisateur Service';
$string['service_role'] = 'Rôle Service';
$string['external_service'] = 'Service Externe';
$string['authorized_users'] = 'Utilisateurs Autorisés';

// Fonctions.
$string['functions'] = 'Fonctions';
$string['function_name'] = 'Nom de Fonction';
$string['function_critical'] = 'Critique';
$string['function_status'] = 'Statut';
$string['function_exists'] = 'Existe';
$string['function_missing'] = 'Manquant';

// Capacités.
$string['capabilities'] = 'Capacités';
$string['extra_capabilities'] = 'Capacités Supplémentaires';
$string['calculated_capabilities'] = 'Calculées depuis les Fonctions';

// Paramètres.
$string['settings'] = 'Paramètres';
$string['settings_notifications'] = 'Notifications';
$string['settings_notifications_desc'] = 'Configurez qui reçoit les notifications de vérification de santé.';
$string['settings_healthcheck'] = 'Vérification de Santé';
$string['settings_healthcheck_desc'] = 'Configurez la surveillance automatique de la santé.';
$string['settings_cleanup'] = 'Nettoyage des Logs';
$string['settings_cleanup_desc'] = 'Configurez le nettoyage automatique des logs pour éviter la croissance de la base de données.';

$string['notification_emails'] = 'Emails de notification';
$string['notification_emails_desc'] = 'Liste d\'adresses email séparées par des virgules pour recevoir les notifications. Laissez vide pour utiliser uniquement les administrateurs du site.';
$string['notify_admins'] = 'Notifier aussi les administrateurs';
$string['notify_admins_desc'] = 'Envoyer des notifications aux administrateurs du site en plus des emails ci-dessus.';
$string['notification_level'] = 'Niveau de notification';
$string['notification_level_desc'] = 'Niveau de statut minimum pour déclencher les notifications.';
$string['notification_level_all'] = 'Tous (y compris sains)';

$string['healthcheck_enabled'] = 'Activer la vérification de santé';
$string['healthcheck_enabled_desc'] = 'Exécuter des vérifications automatiques de santé sur les schémas.';

$string['cleanup_enabled'] = 'Activer le nettoyage des logs';
$string['cleanup_enabled_desc'] = 'Supprimer automatiquement les anciens logs de vérification de santé.';
$string['cleanup_retention_days'] = 'Rétention des logs (jours)';
$string['cleanup_retention_days_desc'] = 'Nombre de jours pour conserver les logs. Les logs plus anciens seront supprimés.';
$string['cleanup_task'] = 'Nettoyage des Logs de Schémas';
