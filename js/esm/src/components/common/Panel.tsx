/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A card of Bootstrap with a head: the icon and the title of what it holds, how many there are, and its actions.
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
    /** The content reaches the edges of the card, as a table or a list does. */
    flush?: boolean;
    region?: string;
    children: ReactNode;
}

const Panel = ({title, icon, count, actions, flush = false, region, children}: PanelProps) => <section className="card" data-region={region}>
    <header className="card-header d-flex flex-wrap align-items-center justify-content-between gap-2">
        <h3 className="h6 mb-0 d-flex align-items-center gap-2">
            <span className="text-muted"><Icon name={icon} /></span>
            {title}
            {count !== undefined && <span className="badge badge-soft rounded-pill text-bg-secondary">{count}</span>}
        </h3>
        {actions}
    </header>
    <div className={flush ? undefined : 'card-body'}>{children}</div>
</section>;

export default Panel;
