/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * How many schemas are healthy, in doubt or failing, as one bar with a legend. Pressing a part of the legend shows only those schemas, and
 * pressing it again shows them all, so the same choice is not offered twice.
 *
 * @module     local_servicemanager/components/dashboard/HealthSummary
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {Text} from '../../types';
import Icon from '../common/Icon';

interface HealthSummaryProps {
    counts: Record<string, number>;
    /** The status that is shown, or an empty text for all of them. */
    status: string;
    onStatus: (status: string) => void;
    text: Text;
}

const PARTS = [
    {key: 'healthy', tone: 'success', icon: 'circle-check'},
    {key: 'warning', tone: 'warning', icon: 'triangle-exclamation'},
    {key: 'critical', tone: 'danger', icon: 'circle-xmark'},
] as const;

const HealthSummary = ({counts, status, onStatus, text}: HealthSummaryProps) => {
    const total = PARTS.reduce((sum, part) => sum + (counts[part.key] ?? 0), 0);

    return <div className="card sm-health" data-region="summary">
        <div className="card-body d-flex flex-wrap align-items-center">
            <div className="sm-health-total">
                <span className="sm-health-number">{total}</span>
                <span className="text-body-secondary">{text(total === 1 ? 'tile_schema' : 'tile_schemas')}</span>
            </div>
            <div className="sm-health-bar" aria-hidden="true">
                {PARTS.map((part) => (counts[part.key] ?? 0) > 0 && <span
                    key={part.key}
                    className={`sm-health-part bg-${part.tone}`}
                    style={{flexGrow: counts[part.key]}}
                />)}
            </div>
            <div className="sm-health-legend" role="group" aria-label={text('filter_status')}>
                {PARTS.map((part) => {
                    const count = counts[part.key] ?? 0;
                    const on = status === part.key;
                    return <button
                        key={part.key}
                        type="button"
                        className={`sm-chip sm-health-chip${on ? ' active' : ''}`}
                        aria-pressed={on}
                        disabled={count === 0 && !on}
                        onClick={() => onStatus(on ? '' : part.key)}
                    >
                        <span className={`text-${part.tone}`}><Icon name={part.icon} /></span>
                        <strong>{count}</strong> {text('status_' + part.key)}
                    </button>;
                })}
            </div>
        </div>
    </div>;
};

export default HealthSummary;
