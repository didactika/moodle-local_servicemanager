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
    const body = <div className="d-flex flex-column align-items-center gap-2 px-4 py-5 text-center" data-region="empty">
        <span className="icon-box"><Icon name={icon} /></span>
        <p className="fw-bold mb-0">{title}</p>
        <p className="text-muted mb-0">{text}</p>
        {actions && <div className="d-flex flex-wrap justify-content-center gap-2">{actions}</div>}
    </div>;
    return bare ? body : <div className="card">{body}</div>;
};

export default EmptyState;
