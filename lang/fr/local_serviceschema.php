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

$string['pluginname'] = 'Gestionnaire de Schémas de Service';
$string['privacy:metadata'] = 'Le plugin Gestionnaire de Schémas de Service ne stocke aucune donnée personnelle.';
$string['serviceschema:manage'] = 'Gérer les schémas de service';
$string['serviceschema:view'] = 'Voir les schémas de service';
$string['dashboard'] = 'Tableau de Bord des Schémas';
$string['upload_schema'] = 'Téléverser un Schéma';
$string['edit_schema'] = 'Modifier le Schéma';
$string['view_schema'] = 'Voir le Schéma';
$string['manage_schemas'] = 'Gérer les Schémas';
$string['yamlfile'] = 'Fichier Schéma YAML';
$string['yamlfile_help'] = 'Téléversez un fichier YAML contenant la définition du schéma de service. Seul les fichiers .yaml et .yml sont acceptés.<br><br><a href="/local/serviceschema/pages/documentation.php" target="_blank"><strong>📖 Voir la Documentation</strong></a>';
$string['yamlcontent'] = 'Contenu YAML';
$string['yamlcontent_help'] = 'Modifiez directement la définition du schéma YAML.<br><br><a href="/local/serviceschema/pages/documentation.php" target="_blank"><strong>📖 Voir la Documentation</strong></a>';
$string['generatetoken'] = 'Générer un jeton automatiquement';
$string['generatetoken_desc'] = 'Si coché, un jeton sera généré pour l\'utilisateur du service et affiché après le téléversement.';
$string['upload'] = 'Téléverser le Schéma';
$string['schema_id'] = 'ID du Schéma';
$string['schema_name'] = 'Nom';
$string['schema_version'] = 'Version';
$string['schema_maintainer'] = 'Mainteneur';
$string['schema_description'] = 'Description';
$string['schema_status'] = 'Statut';
$string['schema_enabled'] = 'Activé';
$string['schema_created'] = 'Créé';
$string['schema_modified'] = 'Dernière Modification';
$string['status_healthy'] = 'Sain';
$string['status_warning'] = 'Avertissement';
$string['status_critical'] = 'Critique';
$string['action_view'] = 'Voir';
$string['action_edit'] = 'Modifier';
$string['action_delete'] = 'Supprimer';
$string['action_regenerate_token'] = 'Régénérer le Jeton';
$string['action_disable'] = 'Désactiver';
$string['action_enable'] = 'Activer';
$string['disabled'] = 'Désactivé';
$string['token_generated'] = 'Jeton Généré avec Succès';
$string['token_regenerated'] = 'Jeton Régénéré avec Succès';
$string['token_copy_warning'] = 'Copiez ce jeton maintenant. Il ne sera plus affiché pour des raisons de sécurité.';
$string['copy'] = 'Copier';
$string['copied'] = 'Copié !';
$string['token_name'] = 'Nom du Jeton';
$string['current_token'] = 'Jeton Actuel';
$string['no_token'] = 'Aucun jeton généré';
$string['schema_created_success'] = 'Le schéma "{$a}" a été créé avec succès.';
$string['schema_updated_success'] = 'Le schéma "{$a}" a été mis à jour avec succès.';
$string['schema_deleted_success'] = 'Le schéma "{$a}" a été supprimé avec succès.';
$string['no_schemas'] = 'Aucun schéma n\'a encore été défini. Téléversez un fichier YAML pour créer votre premier schéma.';
$string['changes_will_apply'] = 'Les changements seront appliqués à l\'utilisateur, au rôle et au service lors de l\'enregistrement.';
$string['error_invalid_yaml'] = 'Format YAML invalide : {$a}';
$string['error_missing_meta'] = 'Section "meta" requise manquante dans le YAML.';
$string['error_missing_meta_id'] = 'Champ "meta.id" requis manquant.';
$string['error_missing_meta_name'] = 'Champ "meta.name" requis manquant.';
$string['error_missing_meta_version'] = 'Champ "meta.version" requis manquant.';
$string['error_missing_definition'] = 'Section "definition" requise manquante.';
$string['error_missing_functions'] = 'Tableau "definition.functions" requis manquant.';
$string['error_invalid_schema_id'] = 'L\'ID de schéma "{$a}" est invalide. Seuls les lettres, chiffres et points (.) sont autorisés.';
$string['error_schema_id_exists'] = 'Un schéma avec l\'ID "{$a}" existe déjà.';
$string['error_function_not_found'] = 'La fonction "{$a}" n\'existe pas dans cette installation Moodle.';
$string['error_critical_function_missing'] = 'La fonction critique "{$a}" est manquante. Impossible de créer le schéma.';
$string['error_version_change_required'] = 'Des changements de contenu ont été détectés. Vous devez mettre à jour le numéro de version dans le YAML (par exemple, incrémenter la version) pour enregistrer ces changements.';
$string['error_plugin_not_installed'] = 'Le plugin requis "{$a}" n\'est pas installé.';
$string['warning_function_missing'] = 'La fonction non-critique "{$a}" est manquante.';
$string['warning_user_email_not_found'] = 'Utilisateur avec l\'email "{$a}" non trouvé. Autorisation ignorée.';
$string['warning_plugin_not_installed'] = 'Le plugin recommandé "{$a}" n\'est pas installé.';
$string['healthcheck_task'] = 'Vérification de Santé des Schémas de Service';
$string['healthcheck_report_subject'] = 'Rapport de Santé des Schémas de Service';
$string['healthcheck_all_healthy'] = 'Tous les schémas de service sont sains.';
$string['healthcheck_issues_found'] = 'Problèmes détectés dans {$a} schéma(s).';
$string['confirm_delete'] = 'Êtes-vous sûr de vouloir supprimer le schéma "{$a}" ? Cela supprimera également l\'utilisateur associé, le rôle et le service.';
$string['confirm_regenerate_token'] = 'Êtes-vous sûr de vouloir régénérer le jeton ? Le jeton actuel sera invalidé immédiatement.';
$string['service_user'] = 'Utilisateur de Service';
$string['service_role'] = 'Rôle de Service';
$string['external_service'] = 'Service Externe';
$string['authorized_users'] = 'Utilisateurs Autorisés';
$string['functions'] = 'Fonctions';
$string['function_name'] = 'Nom de la Fonction';
$string['function_critical'] = 'Critique';
$string['function_status'] = 'Statut';
$string['function_exists'] = 'Existe';
$string['function_missing'] = 'Manquante';
$string['capabilities'] = 'Capacités';
$string['extra_capabilities'] = 'Capacités Supplémentaires';
$string['calculated_capabilities'] = 'Calculées depuis les Fonctions';
$string['settings'] = 'Paramètres';
$string['settings_notifications'] = 'Notifications';
$string['settings_notifications_desc'] = 'Configurer qui reçoit les notifications de vérification de santé.';
$string['settings_healthcheck'] = 'Vérification de Santé';
$string['settings_healthcheck_desc'] = 'Configurer la surveillance automatique de santé.';
$string['settings_cleanup'] = 'Nettoyage des Logs';
$string['settings_cleanup_desc'] = 'Configurer le nettoyage automatique des logs pour éviter la croissance de la base de données.';
$string['notification_emails'] = 'Emails de notification';
$string['notification_emails_desc'] = 'Liste d\'adresses email séparées par des virgules pour recevoir les notifications de santé. Laisser vide pour utiliser uniquement les administrateurs du site.';
$string['notify_admins'] = 'Notifier aussi les administrateurs';
$string['notify_admins_desc'] = 'Envoyer les notifications aux administrateurs du site en plus des emails ci-dessus.';
$string['notification_level'] = 'Niveau de notification';
$string['notification_level_desc'] = 'Niveau de statut minimum pour déclencher les notifications.';
$string['notification_level_all'] = 'Tout (y compris sain)';
$string['healthcheck_enabled'] = 'Activer la vérification de santé';
$string['healthcheck_enabled_desc'] = 'Exécuter des vérifications automatiques de santé sur les schémas.';
$string['cleanup_enabled'] = 'Activer le nettoyage des logs';
$string['cleanup_enabled_desc'] = 'Supprimer automatiquement les anciens logs de santé.';
$string['cleanup_retention_days'] = 'Rétention des logs (jours)';
$string['cleanup_retention_days_desc'] = 'Nombre de jours pour conserver les logs. Les logs plus anciens seront supprimés.';
$string['cleanup_task'] = 'Nettoyage des Logs de Schémas de Service';
$string['documentation'] = 'Documentation du Schéma';
$string['schema_reference'] = 'Référence du Schéma YAML';
$string['quick_links'] = 'Liens Rapides';
$string['download_example'] = 'Télécharger Fichier Exemple';
$string['download_example_desc'] = 'Obtenez un fichier schéma YAML exemple fonctionnel';
$string['doc_structure'] = 'Structure du Schéma';
$string['doc_structure_desc'] = 'Un fichier YAML de schéma de service doit contenir les sections suivantes :';
$string['doc_meta'] = 'Section Meta';
$string['doc_definition'] = 'Section de Définition';
$string['doc_definition_desc'] = 'La section définition spécifie les fonctions du service web et les capacités.';
$string['doc_naming'] = 'Conventions de Nommage';
$string['doc_example'] = 'Exemple Complet';
$string['doc_functions_desc'] = 'Les fonctions peuvent être spécifiées en format simple ou étendu :';
$string['doc_meta_id'] = 'Identifiant unique. Seuls les lettres, chiffres et points (.) sont autorisés.';
$string['doc_meta_name'] = 'Nom lisible pour le service.';
$string['doc_meta_version'] = 'Chaîne de version (version sémantique recommandée).';
$string['doc_meta_maintainer'] = 'Personne ou équipe responsable du schéma.';
$string['doc_meta_description'] = 'Brève description de l\'objectif du service.';
$string['field'] = 'Champ';
$string['resource'] = 'Ressource';
$string['pattern'] = 'Modèle';
$string['back'] = 'Retour';
$string['doc_example_col'] = 'Exemple';

// Import/Export.
$string['import_schemas'] = 'Importer des Schémas';
$string['export_all'] = 'Tout Exporter';
$string['action_export'] = 'Exporter';
$string['import'] = 'Importer';
$string['import_file'] = 'Fichier d\'Importation';
$string['import_file_help'] = 'Téléversez un fichier schéma YAML (.yaml, .yml) ou une archive ZIP contenant plusieurs schémas.';
$string['conflict_handling'] = 'Gestion des Conflits';
$string['conflict_action'] = 'Si l\'ID de schéma existe';
$string['conflict_action_help'] = 'Choisissez quoi faire lorsqu\'un schéma avec le même ID existe déjà.';
$string['conflict_skip'] = 'Ignorer (garder l\'existant)';
$string['conflict_overwrite'] = 'Écraser (remplacer l\'existant)';
$string['conflict_rename'] = 'Renommer (ajouter suffixe .imported)';
$string['import_info_title'] = 'Importer des Schémas';
$string['import_info_text'] = 'Vous pouvez importer des schémas depuis des fichiers YAML ou des archives ZIP :';
$string['import_info_yaml'] = 'Fichier YAML unique (.yaml ou .yml)';
$string['import_info_zip'] = 'Archive ZIP contenant plusieurs fichiers YAML';
$string['import_complete'] = 'Importation terminée : {$a->imported} importés, {$a->skipped} ignorés.';
$string['import_error_no_id'] = 'Le YAML ne contient pas de champ meta.id valide.';
$string['no_file_uploaded'] = 'Aucun fichier n\'a été téléversé.';
$string['no_schemas_to_export'] = 'Il n\'y a aucun schéma à exporter.';
$string['export_error'] = 'Erreur lors de la création du fichier d\'exportation.';

// Bulk operations.
$string['selected'] = 'sélectionné(s)';
$string['select_all'] = 'Tout sélectionner';
$string['bulk_enable'] = 'Activer';
$string['bulk_disable'] = 'Désactiver';
$string['bulk_export'] = 'Exporter';
$string['bulk_delete'] = 'Supprimer';
$string['bulk_delete_confirm'] = 'Êtes-vous sûr de vouloir supprimer les schémas sélectionnés ? Cette action est irréversible.';
$string['bulk_enabled'] = '{$a} schéma(s) ont été activés.';
$string['bulk_disabled'] = '{$a} schéma(s) ont été désactivés.';
$string['bulk_deleted'] = '{$a} schéma(s) ont été supprimés.';
$string['bulk_deleted_with_errors'] = '{$a->count} schéma(s) supprimés, {$a->errors} erreur(s) survenue(s).';
$string['no_schemas_selected'] = 'Aucun schéma sélectionné.';
$string['invalid_action'] = 'Action invalide.';

// Version history.
$string['version_history'] = 'Historique des Versions';
$string['version'] = 'Version';
$string['current'] = 'Actuel';
$string['rollback'] = 'Rétablir';
$string['rollback_confirm'] = 'Êtes-vous sûr de vouloir rétablir cette version ? Les changements actuels seront sauvegardés comme une copie de sécurité.';
$string['rollback_success'] = 'Le schéma a été rétabli avec succès.';
$string['rollback_error'] = 'Erreur lors du rétablissement du schéma';
$string['rollback_backup'] = 'Sauvegarde avant rétablissement';
$string['rollback_to_version'] = 'Rétabli à la version {$a}';
$string['no_history'] = 'Aucun historique de version disponible pour ce schéma.';
$string['history_count'] = 'Affichage de {$a} version(s).';
$string['historynotfound'] = 'Enregistrement d\'historique introuvable.';
$string['view_yaml'] = 'Voir YAML';
