import{fetchOne as t}from"@moodle/lms/core/ajax";/**
 * Every web service call of the plugin's pages, in one place.
 *
 * @module     local_servicemanager/services/api
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const r=(e,n)=>t({methodname:e,args:n}),a=async e=>(await r("local_servicemanager_get_version",{historyid:e})).yaml,i=async(e,n)=>(await r("local_servicemanager_set_enabled",{id:e,enabled:n})).enabled,l=async e=>(await r("local_servicemanager_regenerate_token",{id:e})).token;export{a as getVersionYaml,l as regenerateToken,i as setSchemaEnabled};
