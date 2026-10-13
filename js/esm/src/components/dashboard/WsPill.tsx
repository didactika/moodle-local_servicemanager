/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * Whether the web services of the site work, in a line: the state, the protocols that are on and where to change them.
 *
 * @module     local_servicemanager/components/dashboard/WsPill
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {Text, WsStatus} from '../../types';
import Icon from '../common/Icon';

interface WsPillProps {
    status: WsStatus;
    canManage: boolean;
    text: Text;
}

const LEVELS = {
    disabled: {tone: 'danger', label: 'ws_status_disabled', icon: 'plug-circle-xmark'},
    warning: {tone: 'warning', label: 'ws_status_warning', icon: 'plug-circle-exclamation'},
    operational: {tone: 'success', label: 'ws_status_operational', icon: 'plug-circle-check'},
} as const;

const WsPill = ({status, canManage, text}: WsPillProps) => {
    const level = LEVELS[status.level];

    return <span className="d-inline-flex flex-wrap align-items-center sm-badges-row" data-region="ws-status">
        <span className={`sm-badge tone-${level.tone}`}><Icon name={level.icon} gap />{text('tile_services')}: {text(level.label)}</span>
        {status.protocols.map((protocol) => <span
            key={protocol.name}
            className={`sm-protocol ${protocol.enabled ? 'on' : 'off'}`}
            title={text(protocol.enabled ? 'ws_enabled_label' : 'ws_disabled_label')}
        >
            <Icon name={protocol.enabled ? 'circle-check' : 'circle-minus'} gap />{protocol.name}
            <span className="visually-hidden"> {text(protocol.enabled ? 'ws_enabled_label' : 'ws_disabled_label')}</span>
        </span>)}
        {canManage && status.fixUrl && <a href={status.fixUrl} className={`btn sm-pill compact tone-${level.tone}`} data-region="ws-fix">
            <Icon name="power-off" gap />{status.fixLabel}
        </a>}
        {canManage && status.protocolsUrl && <a href={status.protocolsUrl} className="btn sm-pill compact" title={text('ws_manage_protocols_link')}>
            <Icon name="gear" gap />{text('tile_manage')}
        </a>}
    </span>;
};

export default WsPill;
