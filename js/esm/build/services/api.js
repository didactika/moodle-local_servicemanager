import{fetchOne as e}from"@moodle/lms/core/ajax";/**
 * Every web service call of the plugin's pages, in one place.
 *
 * @module     local_servicemanager/services/api
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const o=(n,r)=>e({methodname:n,args:r}),i=async n=>(await o("local_servicemanager_get_version",{historyid:n})).yaml;export{i as getVersionYaml};
