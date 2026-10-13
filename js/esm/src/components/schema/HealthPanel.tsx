// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The results of the scheduled health checks of a schema, which can be narrowed to one status.
 *
 * @module     local_servicemanager/components/schema/HealthPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useState} from 'react';
import {statusLook} from '../../lib/status';
import type {SchemaDetailProps, Text} from '../../types';
import Panel from '../common/Panel';

interface HealthPanelProps {
    logs: SchemaDetailProps['healthLogs'];
    text: Text;
}

const HealthPanel = ({logs, text}: HealthPanelProps) => {
    const [status, setStatus] = useState('');
    const shown = status ? logs.filter((log) => log.status === status) : logs;

    return <Panel
        title={text('healthcheck_task')}
        icon="heart-pulse"
        count={logs.length}
        flush
        region="health"
        actions={<select
            className="form-select form-select-sm sm-auto-width"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            aria-label={text('core_status')}
            id="healthlog-status-filter"
        >
            <option value="">{text('core_all')}</option>
            <option value="healthy">{text('status_healthy')}</option>
            <option value="warning">{text('status_warning')}</option>
            <option value="critical">{text('status_critical')}</option>
        </select>}
    >
        <div className="sm-scroll">
            <table className="table table-sm align-middle mb-0" id="healthlog-table">
                <thead>
                    <tr>
                        <th className="sm-time-column">{text('core_time')}</th>
                        <th className="sm-status-column">{text('core_status')}</th>
                        <th>{text('core_message')}</th>
                    </tr>
                </thead>
                <tbody>
                    {shown.map((log, index) => <tr key={index} data-status={log.status}>
                        <td>{log.time}</td>
                        <td><span className={`sm-badge tone-${statusLook(log.status).tone}`}>{log.status}</span></td>
                        <td>{log.message}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </Panel>;
};

export default HealthPanel;
