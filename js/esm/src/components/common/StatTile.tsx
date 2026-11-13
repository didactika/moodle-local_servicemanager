/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A figure of a page in a card: what it counts, the number in the colour of its state, and a line that explains it; it
 * opens a page when it has an address.
 *
 * @module     local_servicemanager/components/common/StatTile
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {ReactNode} from 'react';
import Icon from './Icon';

interface StatTileProps {
    label: string;
    value: ReactNode;
    tone?: 'success' | 'warning' | 'danger' | 'secondary' | 'primary';
    icon?: string;
    hint?: ReactNode;
    href?: string;
    /** The page that the tile opens is the one shown. */
    active?: boolean;
}

const StatTile = ({label, value, tone = 'secondary', icon, hint, href, active = false}: StatTileProps) => {
    const body = <div className="card-body">
        <div className="d-flex align-items-center justify-content-between gap-2">
            <span className="small text-muted text-uppercase fw-semibold">{label}</span>
            {icon && <span className={`text-${tone}`}><Icon name={icon} /></span>}
        </div>
        <div className={`fs-4 fw-bold text-${tone === 'secondary' ? 'body' : tone}`}>{value}</div>
        {hint && <div className="small text-muted">{hint}</div>}
    </div>;
    const classes = `card h-100${active ? ' border-primary' : ''}`;
    return href
        ? <a href={href} className={`${classes} text-decoration-none text-reset`} aria-current={active ? 'true' : undefined}>{body}</a>
        : <div className={classes}>{body}</div>;
};

export default StatTile;
