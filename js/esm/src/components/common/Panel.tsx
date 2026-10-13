// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * A section of a page: a card with a title, an icon, how many things it holds and, when it has them, its own actions.
 *
 * Every section of every page is one, so they look the same.
 *
 * @module     local_servicemanager/components/common/Panel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {ReactNode} from 'react';
import Icon from './Icon';

interface PanelProps {
    title: string;
    icon: string;
    count?: number;
    actions?: ReactNode;
    /** The body has no padding, because it holds a table or a list. */
    flush?: boolean;
    region?: string;
    children: ReactNode;
}

const Panel = ({title, icon, count, actions, flush = false, region, children}: PanelProps) => <section className="card sm-panel" data-region={region}>
    <header className="card-header d-flex align-items-center justify-content-between">
        <h3 className="sm-panel-title mb-0">
            <span className="sm-panel-icon text-body-secondary"><Icon name={icon} gap /></span>
            {title}
            {count !== undefined && <span className="sm-count-badge">{count}</span>}
        </h3>
        {actions}
    </header>
    <div className={flush ? undefined : 'card-body'}>{children}</div>
</section>;

export default Panel;
