// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * What the schema says about the role that was created for it: where it can be assigned, which capabilities it has explicitly and
 * which other roles it may assign, override, switch to and see.
 *
 * @module     local_servicemanager/components/schema/RolePanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {RoleSection, Text} from '../../types';
import Panel from '../common/Panel';

interface RolePanelProps {
    role: RoleSection;
    text: Text;
}

const RELATIONS = ['allow_assign', 'allow_override', 'allow_switch', 'allow_view'] as const;
const PERMISSIONS = [
    {key: 'prevent', tone: 'warning'},
    {key: 'prohibit', tone: 'danger'},
] as const;

const Names = ({names, tone = 'secondary'}: {names: string[]; tone?: string}) => <span className="d-flex flex-wrap sm-badges-row">
    {names.map((name) => <span key={name} className={`badge text-bg-${tone}`}>{name}</span>)}
</span>;

const RolePanel = ({role, text}: RolePanelProps) => {
    const levels = (role.context_levels ?? []).filter((level) => level !== 'system');
    const permissions = PERMISSIONS.filter((permission) => (role.permissions?.[permission.key] ?? []).length > 0);
    const relations = RELATIONS.filter((relation) => (role[relation] ?? []).length > 0);
    if (levels.length === 0 && permissions.length === 0 && relations.length === 0) {
        return null;
    }

    return <Panel title={text('role_panel_title')} icon="user-shield" region="role">
        <dl className="sm-facts mb-0">
            {levels.length > 0 && <>
                <dt>{text('role_context_levels')}</dt>
                <dd><Names names={['system', ...levels].map((level) => text('role_level_' + level) || level)} /></dd>
            </>}
            {relations.map((relation) => <div className="sm-fact-pair" key={relation}>
                <dt>{text('role_' + relation)}</dt>
                <dd><Names names={role[relation] ?? []} tone="primary" /></dd>
            </div>)}
            {permissions.map((permission) => <div className="sm-fact-pair" key={permission.key}>
                <dt>{text('role_permission_' + permission.key)}</dt>
                <dd><Names names={role.permissions?.[permission.key] ?? []} tone={permission.tone} /></dd>
            </div>)}
        </dl>
    </Panel>;
};

export default RolePanel;
