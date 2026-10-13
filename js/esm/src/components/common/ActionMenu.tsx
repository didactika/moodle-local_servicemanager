// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * A menu of actions that opens from three dots, which is how the less frequent actions of a row or of a page are kept at hand.
 *
 * It can sit at the end of a group of buttons as one more button of the group.
 *
 * @module     local_servicemanager/components/common/ActionMenu
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useDropdown} from '../../hooks/useDropdown';
import Icon from './Icon';
import {toneClass} from './IconButton';

/** One action of the menu: a link, or a button that runs something. */
export interface MenuAction {
    label: string;
    icon: string;
    href?: string;
    onSelect?: () => void;
    /** The action destroys something, so it goes last, apart, and in the colour of danger. */
    danger?: boolean;
}

interface ActionMenuProps {
    /** What assistive technology says for the caret. */
    label: string;
    actions: MenuAction[];
    /** Size of the button. */
    size?: 'sm' | 'md';
    /** Colour of the button: primary, success, warning, info or danger; neutral when it is not given. */
    tone?: string;
    /** The icon of the button; the three dots when it is not given. */
    icon?: string;
    /** Show the small arrow that says the button opens a menu, for the buttons that do not say it with their icon. */
    caret?: boolean;
    /** Open the links in another tab, as the links to other sites do. */
    external?: boolean;
}

const ActionMenu = ({label, actions, size = 'sm', tone = 'secondary', icon = 'ellipsis', caret = false, external = false}: ActionMenuProps) => {
    const menu = useDropdown();
    const common = actions.filter((action) => !action.danger);
    const dangerous = actions.filter((action) => action.danger);
    const item = (action: MenuAction) => {
        const content = <><Icon name={action.icon} gap />{action.label}</>;
        const className = `dropdown-item${action.danger ? ' text-danger' : ''}`;
        return action.href
            ? <a className={className} href={action.href} {...(external ? {target: '_blank', rel: 'noreferrer'} : {})}>{content}</a>
            : <button type="button" className={className} onClick={() => {
                menu.toggle();
                action.onSelect?.();
            }}>{content}</button>;
    };

    return <div className="dropdown sm-action-menu" ref={menu.ref}>
        <button
            type="button"
            className={`btn sm-pill ${caret ? 'has-caret' : `icon-only${size === 'sm' ? ' compact' : ''}`}${toneClass(tone)}`}
            aria-haspopup="true"
            aria-expanded={menu.open}
            title={label}
            onClick={menu.toggle}
        >
            <Icon name={icon} />{caret && <Icon name="chevron-down" className="sm-caret" />}<span className="visually-hidden">{label}</span>
        </button>
        <ul className={`dropdown-menu dropdown-menu-end sm-row-menu${menu.open ? ' show' : ''}`}>
            {common.map((action) => <li key={action.label}>{item(action)}</li>)}
            {common.length > 0 && dangerous.length > 0 && <li><hr className="dropdown-divider" /></li>}
            {dangerous.map((action) => <li key={action.label}>{item(action)}</li>)}
        </ul>
    </div>;
};

export default ActionMenu;
