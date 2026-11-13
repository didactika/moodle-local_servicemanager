/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A summary of the health checks of a schema: the latest one, with what it found, how many there are of each status and the way
 * to all of them, which have a page of their own.
 *
 * @module     local_servicemanager/components/schema/HealthPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {statusLook} from '../../lib/status';
import type {HealthSummary, Text} from '../../types';
import Icon from '../common/Icon';
import Panel from '../common/Panel';
import HealthFindings from './HealthFindings';

interface HealthPanelProps {
    health: HealthSummary;
    text: Text;
}

const HealthPanel = ({health, text}: HealthPanelProps) => <Panel
    title={text('healthcheck_task')}
    icon="heart-pulse"
    count={health.total}
    region="health"
    actions={<a href={health.url} className="btn btn-sm btn-outline-primary">
        {text('health_view_all')}<Icon name="arrow-right" className="ms-2" />
    </a>}
>
    {health.latest && <>
        <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
            <span className="text-body-secondary small text-uppercase">{text('health_latest')}</span>
            <span className={`badge badge-soft rounded-pill text-bg-${health.latest.tone}`}>
                <Icon name={health.latest.icon} gap />{health.latest.statusLabel}
            </span>
            <span className="text-body-secondary">{health.latest.time} · {health.latest.ago}</span>
        </div>
        <HealthFindings check={health.latest} />
    </>}
    <div className="d-flex flex-wrap gap-2 mt-3">
        {(health.counts ?? []).map((count) => <span key={count.status} className={`badge badge-soft rounded-pill text-bg-${statusLook(count.status).tone}`}>
            {count.label}<span className="ms-2">{count.count}</span>
        </span>)}
    </div>
</Panel>;

export default HealthPanel;
