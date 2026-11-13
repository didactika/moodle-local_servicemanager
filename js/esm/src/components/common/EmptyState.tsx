/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What a page or a list says when it has nothing, as the design system draws it: the icon in its tile, the title, the
 * explanation and what to do.
 *
 * @module     local_servicemanager/components/common/EmptyState
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {ReactNode} from 'react';
import Icon from './Icon';

interface EmptyStateProps {
    icon: string;
    title: string;
    text: string;
    actions?: ReactNode;
    /** Inside another card, without one of its own. */
    bare?: boolean;
}

const EmptyState = ({icon, title, text, actions, bare = false}: EmptyStateProps) => {
    const body = <div className="dd-empty" data-region="empty">
        <span className="dd-tile dd-tile-lg"><Icon name={icon} /></span>
        <p className="dd-empty-title">{title}</p>
        <p className="dd-empty-text">{text}</p>
        {actions && <div className="d-flex flex-wrap justify-content-center gap-2">{actions}</div>}
    </div>;
    return bare ? body : <div className="card">{body}</div>;
};

export default EmptyState;
