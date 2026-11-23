/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The summary at the top of the dashboard: how many schemas there are and how healthy they are, and whether the web services of the
 * site work. A person who can change the configuration of the site turns the web services and each protocol on or off from here,
 * without reloading the page; the change is written as the administration writes it, so it is kept in the log of the configuration.
 *
 * @module     local_servicemanager/components/dashboard/Summary
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useState} from 'react';
import {setWebServices} from '../../services/api';
import {addToast} from '../../engine/toast';
import {Dialog, Icon} from '../../ds/ui';
import type {Text, WsStatus} from '../../types';

/** The statuses of a schema, with the colour and the icon of Moodle that say each one. */
export const HEALTH = [
    {key: 'healthy', tone: 'success', icon: 'i/valid'},
    {key: 'warning', tone: 'warning', icon: 'i/warning'},
    {key: 'critical', tone: 'danger', icon: 'i/invalid'},
] as const;

/** The colour of each state of the web services. */
const LEVELS = {disabled: 'danger', warning: 'warning', operational: 'success'} as const;

/**
 * The summary of the schemas and of the web services.
 *
 * @param props The schemas of each status, the state of the web services, the session key and the texts.
 * @returns The summary.
 */
const Summary = ({counts, ws: initial, text}: {counts: Record<string, number>; ws: WsStatus; sesskey: string; text: Text}) => {
    const [asking, setAsking] = useState(false);
    const [ws, setWs] = useState(initial);
    const [busy, setBusy] = useState(false);
    const total = HEALTH.reduce((sum, part) => sum + (counts[part.key] ?? 0), 0);
    // The change is sent to a web service and the summary shows the new state, with a message; the page is not reloaded.
    const change = async(enable: boolean, protocol = ''): Promise<void> => {
        setBusy(true);
        try {
            const {message, ...status} = await setWebServices(enable, protocol);
            setWs((before) => ({...before, ...status}));
            setAsking(false);
            await addToast(message, {type: 'success'});
        } catch (error) {
            await addToast(String((error as {message?: string})?.message ?? error), {type: 'danger'});
        } finally {
            setBusy(false);
        }
    };

    return <div className="card" data-region="summary">
        <div className="card-body d-grid gap-3">
            <div className="d-flex flex-wrap align-items-center gap-3">
                <p className="mb-0"><span className="fs-3 fw-bold me-1">{total}</span>
                    <span className="text-muted">{text(total === 1 ? 'tile_schema' : 'tile_schemas')}</span></p>
                <div className="progress flex-grow-1" role="img"
                    aria-label={HEALTH.map((part) => `${counts[part.key] ?? 0} ${text(`status_${part.key}`)}`).join(', ')}>
                    {HEALTH.map((part) => (counts[part.key] ?? 0) > 0 && <div key={part.key} className={`progress-bar bg-${part.tone}`}
                        style={{width: `${(100 * (counts[part.key] ?? 0)) / Math.max(1, total)}%`}} />)}
                </div>
                <ul className="list-inline mb-0">
                    {HEALTH.map((part) => <li key={part.key} className="list-inline-item">
                        <span className={`badge rounded-pill text-bg-${part.tone}`}>
                            <Icon name={part.icon} text={text} /> {counts[part.key] ?? 0} {text(`status_${part.key}`)}
                        </span>
                    </li>)}
                </ul>
            </div>
            <div className="d-flex flex-wrap align-items-center gap-2 border-top pt-3" data-region="ws-status">
                <span className={`badge rounded-pill text-bg-${LEVELS[ws.level]} me-1`}>
                    {text('tile_services')}: {text(`ws_status_${ws.level}`)}
                </span>
                {ws.protocols.map((protocol) => ws.canConfigure
                    ? <button key={protocol.key} type="button" aria-pressed={protocol.on}
                        className={`btn btn-sm rounded-pill btn-outline-${protocol.on ? 'success' : 'secondary'}`}
                        title={text(protocol.on ? 'ws_protocol_turn_off' : 'ws_protocol_turn_on', protocol.name)}
                        disabled={busy} onClick={() => void change(!protocol.on, protocol.key)}>
                        <Icon name={protocol.on ? 'i/checkedcircle' : 'i/uncheckedcircle'} text={text} /> {protocol.name}
                    </button>
                    : <span key={protocol.key} className={`badge border rounded-pill text-bg-${protocol.on ? 'success' : 'secondary'}`}>
                        {protocol.name}<span className="visually-hidden"> {text(protocol.on ? 'ws_enabled_label' : 'ws_disabled_label')}</span>
                    </span>)}
                {ws.canConfigure && <div className="ms-auto d-flex flex-wrap gap-2">
                    {ws.enabled
                        ? <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill" onClick={() => setAsking(true)}>
                            <Icon name="power" text={text} /> {text('ws_disable_services')}
                        </button>
                        : <button type="button" className="btn btn-sm btn-primary rounded-pill" disabled={busy} onClick={() => void change(true)}>
                            <Icon name="power" text={text} /> {text('ws_enable_services')}
                        </button>}
                    {ws.protocolsUrl && <a href={ws.protocolsUrl} className="btn btn-sm btn-outline-secondary rounded-pill">
                        <Icon name="i/settings" text={text} /> {text('tile_manage')}
                    </a>}
                </div>}
            </div>
        </div>
        {asking && <Dialog title={text('ws_disable_services')} onClose={() => setAsking(false)} text={text}
            footer={<>
                <button type="button" className="btn btn-secondary" onClick={() => setAsking(false)}>{text('core_cancel')}</button>
                <button type="button" className="btn btn-danger" disabled={busy} onClick={() => void change(false)}>{text('ws_disable_services')}</button>
            </>}>
            <p className="mb-0">{text('ws_disable_confirm')}</p>
        </Dialog>}
    </div>;
};

export default Summary;
