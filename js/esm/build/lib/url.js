/**
 * Addresses of the lists, which are the same list with another filter.
 *
 * @module     local_servicemanager/lib/url
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const g=(e,i,n)=>{const[r,o=""]=e.split("?"),t=o.split("&").filter(s=>s!==""&&!s.startsWith(i+"=")&&!s.startsWith("page="));return n!==""&&t.push(i+"="+encodeURIComponent(n)),t.length?r+"?"+t.join("&"):r};export{g as withParam};
