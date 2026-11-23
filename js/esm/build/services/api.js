import{fetchOne as a}from"@moodle/lms/core/ajax";/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * Every web service call of the plugin's pages, in one place.
 *
 * @module     local_servicemanager/services/api
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const s=(e,n)=>a({methodname:e,args:n}),o=async e=>(await s("local_servicemanager_get_version",{historyid:e})).yaml,c=async(e,n)=>(await s("local_servicemanager_set_enabled",{id:e,enabled:n})).enabled,l=(e,n="")=>s("local_servicemanager_set_web_services",{enable:e,protocol:n}),m=async(e,n)=>{const t=await s("local_servicemanager_rollback_schema",{id:e,historyid:n});return{version:t.version,rows:t.rows.map(r=>({id:r.id,version:r.version,userName:r.username,userPicture:r.userpicture,date:r.date,at:r.at,reason:r.reason,isCurrent:r.iscurrent,viewUrl:r.viewurl,canRollback:r.canrollback}))}},u=async e=>(await s("local_servicemanager_regenerate_token",{id:e})).token;export{o as getVersionYaml,u as regenerateToken,m as rollbackSchema,c as setSchemaEnabled,l as setWebServices};
