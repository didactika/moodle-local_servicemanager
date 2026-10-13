/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A figure with its label: how many schemas there are, how many are healthy, whether the web services work.
 *
 * It is a link when the figure leads somewhere, such as the list of the schemas that it counts.
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
    /** Bootstrap colour of the figure and of its icon. */
    tone?: 'success' | 'warning' | 'danger' | 'secondary' | 'primary';
    icon?: string;
    /** What goes under the figure. */
    hint?: ReactNode;
    href?: string;
    active?: boolean;
}

const StatTile = ({label, value, tone = 'secondary', icon, hint, href, active = false}: StatTileProps) => {
    const body = <>
        <div className="d-flex align-items-center justify-content-between">
            <span className="text-body-secondary small text-uppercase sm-tile-label">{label}</span>
            {icon && <span className={`sm-tile-icon text-${tone}`}><Icon name={icon} /></span>}
        </div>
        <div className={`sm-tile-value text-${tone === 'secondary' ? 'body' : tone}`}>{value}</div>
        {hint && <div className="text-body-secondary small">{hint}</div>}
    </>;
    const classes = `card sm-tile${active ? ' sm-tile-active' : ''}`;
    return href
        ? <a href={href} className={`${classes} text-decoration-none sm-tile-link`} aria-current={active ? 'true' : undefined}>
            <div className="card-body">{body}</div>
        </a>
        : <div className={classes}><div className="card-body">{body}</div></div>;
};

export default StatTile;
