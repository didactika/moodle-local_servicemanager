/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * One schema, or one past version of it: what it declares, what the plugin created for it and how healthy it is.
 *
 * The actions of the schema are one group of buttons in the head of the page, and the rest of the page is made of sections that
 * all look the same: the main ones at the left and the ones about what the schema is and who gets what at the right.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/SchemaDetail
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useMemo, useState} from 'react';
import BackLink from './components/common/BackLink';
import ConfirmModal from './components/common/ConfirmModal';
import ErrorBoundary from './components/common/ErrorBoundary';
import Icon from './components/common/Icon';
import PageHeader from './components/common/PageHeader';
import StatusBadge from './components/common/StatusBadge';
import WsPill from './components/dashboard/WsPill';
import AccessPanel from './components/schema/AccessPanel';
import DetailsPanel from './components/schema/DetailsPanel';
import FunctionsPanel from './components/schema/FunctionsPanel';
import HealthPanel from './components/schema/HealthPanel';
import ResourcesPanel from './components/schema/ResourcesPanel';
import RolePanel from './components/schema/RolePanel';
import TokenAlert from './components/schema/TokenAlert';
import {createText} from './engine/text';
import {addToast} from './engine/toast';
import {regenerateToken, setSchemaEnabled} from './services/api';
import type {SchemaDetailProps} from './types';

const SchemaDetail = (props: SchemaDetailProps) => {
    const {schema, urls, resources, isHistory, canManage} = props;
    const text = useMemo(() => createText(props.strings), [props.strings]);
    const hasResources = Boolean(resources.user || resources.role || resources.service);
    const [enabled, setEnabled] = useState(schema.enabled);
    const [hasToken, setHasToken] = useState(schema.hasToken);
    const [freshToken, setFreshToken] = useState<string | null>(null);
    const [confirming, setConfirming] = useState(false);
    const [busy, setBusy] = useState(false);
    const current = {...schema, enabled, hasToken};

    // The page changes where it is and says so in a toast, so nothing is lost by reloading.
    const failed = () => addToast(text('error_action_failed'), {type: 'danger'}).catch(() => undefined);
    const toggle = () => {
        if (busy) {
            return;
        }
        setBusy(true);
        setSchemaEnabled(schema.id, !enabled).then((now) => {
            setEnabled(now);
            return addToast(text(now ? 'schema_enabled_toast' : 'schema_disabled_toast', schema.name), {type: 'success'});
        }).catch(failed).finally(() => setBusy(false));
    };
    const makeToken = () => {
        setConfirming(false);
        setBusy(true);
        regenerateToken(schema.id).then((token) => {
            setHasToken(true);
            setFreshToken(token);
            return addToast(text('token_regenerated'), {type: 'success'});
        }).catch(failed).finally(() => setBusy(false));
    };

    return <ErrorBoundary strings={props.strings}>
        <div className="servicemanager-detail">
            <div className="mb-3">
                <BackLink href={isHistory ? urls.back : urls.dashboard} label={text(isHistory ? 'back' : 'dashboard')} />
            </div>

            {props.newToken && <TokenAlert token={props.newToken} text={text} />}

            <PageHeader
                title={schema.name}
                badges={<>
                    <StatusBadge status={schema.status} label={schema.statusLabel} />
                    {!isHistory && !enabled && <span className="sm-badge">{text('disabled')}</span>}
                </>}
                actions={props.wsStatus ? <WsPill status={props.wsStatus} canManage={canManage} text={text} /> : undefined}
                subtitle={<span className="sm-id-chip" title={text('schema_id')}><Icon name="fingerprint" gap />{schema.schemaId}</span>}
            />

            <div className="row">
                <div className="col-lg-8">
                    <DetailsPanel schema={current} urls={urls} canManage={canManage} isHistory={isHistory} busy={busy} onToggle={toggle} text={text} />
                    {props.functions.length > 0 && <FunctionsPanel functions={props.functions} text={text} />}
                    {hasResources && <ResourcesPanel resources={resources} text={text} />}
                    {props.healthLogs.length > 0 && <HealthPanel logs={props.healthLogs} text={text} />}
                </div>
                <div className="col-lg-4">
                    <AccessPanel
                        props={{...props, schema: current}}
                        freshToken={freshToken}
                        busy={busy}
                        onMakeToken={() => setConfirming(true)}
                        text={text}
                    />
                    <RolePanel role={props.role} text={text} />
                </div>
            </div>

            <ConfirmModal
                open={confirming}
                title={text(hasToken ? 'action_regenerate_token' : 'action_generate_token')}
                message={text(hasToken ? 'confirm_regenerate_token' : 'confirm_generate_token')}
                confirmLabel={text(hasToken ? 'action_regenerate_token' : 'action_generate_token')}
                cancelLabel={text('core_cancel')}
                onCancel={() => setConfirming(false)}
                onConfirm={makeToken}
            />
        </div>
    </ErrorBoundary>;
};

export default SchemaDetail;
