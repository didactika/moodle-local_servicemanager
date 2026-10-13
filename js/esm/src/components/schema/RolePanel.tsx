// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * What the role of the schema may do: where it can be assigned, which roles it may assign, override, switch to and see, and which
 * capabilities it is kept from or forbidden.
 *
 * Each of them is a block with its name over its list, because a list of roles can be long; the ones past the first few are
 * behind a button that opens all of them in a dialogue, so the card stays the size of what matters.
 *
 * @module     local_servicemanager/components/schema/RolePanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {RoleSection, Text} from '../../types';
import ChipList from '../common/ChipList';
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

interface BlockProps {
    label: string;
    names: string[];
    tone: string;
    text: Text;
}

const Block = ({label, names, tone, text}: BlockProps) => <section className="sm-role-block" data-region="role-block">
    <h4 className="sm-role-label">{label}<span className="sm-role-count">{names.length}</span></h4>
    <ChipList
        title={label}
        names={names}
        text={text}
        chip={(name) => <span key={name} className={`sm-role-chip tone-${tone}`}>{name}</span>}
    />
</section>;

const RolePanel = ({role, text}: RolePanelProps) => {
    const levels = (role.context_levels ?? []).filter((level) => level !== 'system');
    const permissions = PERMISSIONS.filter((permission) => (role.permissions?.[permission.key] ?? []).length > 0);
    const relations = RELATIONS.filter((relation) => (role[relation] ?? []).length > 0);
    if (levels.length === 0 && permissions.length === 0 && relations.length === 0) {
        return null;
    }

    return <Panel title={text('role_panel_title')} icon="user-shield" region="role">
        <div className="sm-role-grid">
            {levels.length > 0 && <Block
                label={text('role_context_levels')}
                names={['system', ...levels].map((level) => text('role_level_' + level) || level)}
                tone="secondary"
                text={text}
            />}
            {relations.map((relation) => <Block
                key={relation}
                label={text('role_' + relation)}
                names={role[relation] ?? []}
                tone="primary"
                text={text}
            />)}
            {permissions.map((permission) => <Block
                key={permission.key}
                label={text('role_permission_' + permission.key)}
                names={role.permissions?.[permission.key] ?? []}
                tone={permission.tone}
                text={text}
            />)}
        </div>
    </Panel>;
};

export default RolePanel;
