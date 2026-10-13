// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * What a list shows when it has nothing to list: what happened and what the person can do about it.
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
}

const EmptyState = ({icon, title, text, actions}: EmptyStateProps) => <div className="card sm-empty" data-region="empty-state">
    <div className="card-body text-center py-5">
        <div className="sm-empty-icon text-body-secondary mb-3"><Icon name={icon} /></div>
        <h4 className="mb-2">{title}</h4>
        <p className="text-body-secondary mx-auto sm-empty-text">{text}</p>
        {actions && <div className="d-flex flex-wrap justify-content-center sm-actions-row">{actions}</div>}
    </div>
</div>;

export default EmptyState;
