import{jsx as e}from"react/jsx-runtime";/**
 * An icon of Font Awesome, which Moodle already loads, so it takes the colour and the size of the text around it.
 *
 * @module     local_servicemanager/components/common/Icon
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const s=({name:o,gap:n=!1,className:a=""})=>e("i",{className:`fa-solid fa-${o}${n?" sm-icon-gap":""}${a?` ${a}`:""}`,"aria-hidden":"true"});var i=s;export{i as default};
