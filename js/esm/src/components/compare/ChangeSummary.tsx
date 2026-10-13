// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * What changed between two versions, said in terms of the schema: which functions came and went, which fields were edited.
 *
 * @module     local_servicemanager/components/compare/ChangeSummary
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {ofArea} from '../../lib/diff';
import type {Change, Text} from '../../types';
import Icon from '../common/Icon';

interface ChangeSummaryProps {
    changes: Change[];
    text: Text;
}

const AREAS: Array<{area: Change['area']; title: string; icon: string}> = [
    {area: 'field', title: 'area_field', icon: 'id-card'},
    {area: 'function', title: 'area_function', icon: 'code'},
    {area: 'capability', title: 'area_capability', icon: 'shield-halved'},
    {area: 'user', title: 'area_user', icon: 'user'},
    {area: 'plugin', title: 'area_plugin', icon: 'puzzle-piece'},
    {area: 'files', title: 'area_files', icon: 'file-arrow-down'},
    {area: 'role', title: 'area_role', icon: 'user-shield'},
];

const KINDS = {
    added: {icon: 'plus', tone: 'success'},
    removed: {icon: 'minus', tone: 'danger'},
    changed: {icon: 'pen', tone: 'warning'},
} as const;

/** What a value is called, for the values that are words of the plugin rather than of the person. */
const named = (text: Text, area: Change['area'], name: string, value: string | undefined): string => {
    if (value === undefined) {
        return '';
    }
    if (area === 'function' || area === 'files') {
        return text('state_' + value);
    }
    return value === '' ? text('change_empty') : value;
};

const label = (text: Text, change: Change): string => {
    if (change.area === 'field') {
        return text({name: 'schema_name', version: 'schema_version', maintainer: 'schema_maintainer', description: 'core_description'}[change.name] ?? change.name);
    }
    if (change.area === 'files') {
        return text(change.name === 'download_files' ? 'req_download_files' : 'req_upload_files');
    }
    return change.name;
};

const ChangeSummary = ({changes, text}: ChangeSummaryProps) => <div className="card mb-4" data-region="change-summary">
    <div className="card-header"><h5 className="mb-0">{text('compare_changes_title')}</h5></div>
    <div className="card-body">
        <div className="row">
            {AREAS.map(({area, title, icon}) => {
                const items = ofArea(changes, area);
                if (items.length === 0) {
                    return null;
                }
                return <div key={area} className="col-lg-6 mb-3">
                    <div className="text-body-secondary small text-uppercase mb-2"><Icon name={icon} gap />{text(title)}</div>
                    <ul className="list-unstyled mb-0">
                        {items.map((change) => {
                            const kind = KINDS[change.kind];
                            return <li key={change.kind + change.name} className="d-flex align-items-start sm-change">
                                <span className={`badge text-bg-${kind.tone} sm-change-badge`} title={text('change_' + change.kind)}>
                                    <Icon name={kind.icon} /><span className="visually-hidden">{text('change_' + change.kind)}</span>
                                </span>
                                <span>
                                    {area === 'function' || area === 'capability' || area === 'plugin' || area === 'role' ? <code>{label(text, change)}</code> : label(text, change)}
                                    {change.kind === 'changed' && <span className="text-body-secondary">
                                        {': '}<del>{named(text, area, change.name, change.from)}</del>
                                        {' → '}<ins>{named(text, area, change.name, change.to)}</ins>
                                    </span>}
                                </span>
                            </li>;
                        })}
                    </ul>
                </div>;
            })}
        </div>
    </div>
</div>;

export default ChangeSummary;
