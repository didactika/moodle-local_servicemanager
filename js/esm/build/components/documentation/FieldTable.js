import{jsx as e,jsxs as d}from"react/jsx-runtime";/**
 * A table of the fields of one part of a schema, with whether each is required and what it is for.
 *
 * @module     local_servicemanager/components/documentation/FieldTable
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */const o=({fields:a,text:t})=>d("table",{className:"table table-bordered table-striped",children:[e("thead",{children:d("tr",{children:[e("th",{children:t("field")}),e("th",{children:t("core_required")}),e("th",{children:t("core_description")})]})}),e("tbody",{children:a.map(r=>d("tr",{children:[e("td",{children:e("code",{children:r.name})}),e("td",{children:e("span",{className:`badge text-bg-${r.required?"success":"secondary"}`,children:t(r.required?"core_yes":"core_no")})}),e("td",{children:t(r.description)})]},r.name))})]});var s=o;export{s as default};
