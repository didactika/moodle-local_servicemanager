import{fetchOne as a}from"@moodle/lms/core/ajax";/**
 * Every web service call of the plugin's pages, in one place.
 *
 * @module     local_servicemanager/services/api
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const s=(r,n)=>a({methodname:r,args:n}),i=async r=>(await s("local_servicemanager_get_version",{historyid:r})).yaml,c=async(r,n)=>(await s("local_servicemanager_set_enabled",{id:r,enabled:n})).enabled,l=async(r,n)=>{const t=await s("local_servicemanager_rollback_schema",{id:r,historyid:n});return{version:t.version,rows:t.rows.map(e=>({id:e.id,version:e.version,userName:e.username,userPicture:e.userpicture,date:e.date,at:e.at,reason:e.reason,isCurrent:e.iscurrent,viewUrl:e.viewurl,canRollback:e.canrollback}))}},u=async r=>(await s("local_servicemanager_regenerate_token",{id:r})).token;export{i as getVersionYaml,u as regenerateToken,l as rollbackSchema,c as setSchemaEnabled};
