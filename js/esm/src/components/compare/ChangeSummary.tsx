/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
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

const KIND_SIGN = {added: 'plus', removed: 'minus', changed: 'pen'} as const;

const ChangeSummary = ({changes, text}: ChangeSummaryProps) => <details className="sm-changes" data-region="change-summary" open>
    <summary className="sm-changes-head">
        <Icon name="chevron-right" className="sm-changes-caret" />
        <h5 className="sm-changes-title">{text('compare_changes_title')}</h5>
        <span className="sm-count-badge">{changes.length}</span>
    </summary>
    <div className="sm-changes-body">
        {AREAS.map(({area, title, icon}) => {
            const items = ofArea(changes, area);
            if (items.length === 0) {
                return null;
            }
            return <section key={area} className="sm-changes-area">
                <h6 className="sm-changes-area-title"><Icon name={icon} gap />{text(title)}</h6>
                <ul className="sm-changes-list">
                    {items.map((change) => <li key={change.kind + change.name} className={`sm-change-chip tone-${KINDS[change.kind].tone}`}>
                        <Icon name={KIND_SIGN[change.kind]} className="sm-change-sign" />
                        <span className="visually-hidden">{text('change_' + change.kind)}: </span>
                        <span className="sm-change-name">{label(text, change)}</span>
                        {change.kind === 'changed' && <span className="sm-change-values">
                            <span className="sm-change-from">{named(text, area, change.name, change.from)}</span>
                            <Icon name="arrow-right" />
                            <span className="sm-change-to">{named(text, area, change.name, change.to)}</span>
                        </span>}
                    </li>)}
                </ul>
            </section>;
        })}
    </div>
</details>;

export default ChangeSummary;
