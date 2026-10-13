/**
 * Send the browser to a page of the plugin with a form, which is how the actions that change something are asked for: they are
 * checked with the session key, answered by a page and followed by the notification of Moodle.
 *
 * @module     local_servicemanager/engine/post
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const m=(o,i)=>{const e=document.createElement("form");e.method="post",e.action=o,e.hidden=!0;for(const[n,t]of Object.entries(i))for(const d of Array.isArray(t)?t:[t]){const r=document.createElement("input");r.type="hidden",r.name=Array.isArray(t)?`${n}[]`:n,r.value=String(d),e.appendChild(r)}document.body.appendChild(e),e.submit()};export{m as postForm};
