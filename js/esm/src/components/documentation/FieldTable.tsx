// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * A table of the fields of one part of a schema, with whether each is required and what it is for.
 *
 * @module     local_servicemanager/components/documentation/FieldTable
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {Text} from '../../types';

/** A field of the format. */
export interface Field {
    name: string;
    required: boolean;
    /** Name of the text that says what it is for. */
    description: string;
}

interface FieldTableProps {
    fields: Field[];
    text: Text;
}

const FieldTable = ({fields, text}: FieldTableProps) => <table className="table table-bordered table-striped">
    <thead>
        <tr>
            <th>{text('field')}</th>
            <th>{text('core_required')}</th>
            <th>{text('core_description')}</th>
        </tr>
    </thead>
    <tbody>
        {fields.map((field) => <tr key={field.name}>
            <td><code>{field.name}</code></td>
            <td><span className={`badge text-bg-${field.required ? 'success' : 'secondary'}`}>{text(field.required ? 'core_yes' : 'core_no')}</span></td>
            <td>{text(field.description)}</td>
        </tr>)}
    </tbody>
</table>;

export default FieldTable;
