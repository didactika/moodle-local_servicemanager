// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
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
import {useMemo} from 'react';
import BackLink from './components/common/BackLink';
import ErrorBoundary from './components/common/ErrorBoundary';
import PageHeader from './components/common/PageHeader';
import StatusBadge from './components/common/StatusBadge';
import AccessPanel from './components/schema/AccessPanel';
import DetailsPanel from './components/schema/DetailsPanel';
import FunctionsPanel from './components/schema/FunctionsPanel';
import HealthPanel from './components/schema/HealthPanel';
import ResourcesPanel from './components/schema/ResourcesPanel';
import RolePanel from './components/schema/RolePanel';
import TokenAlert from './components/schema/TokenAlert';
import {createText} from './engine/text';
import {postForm} from './engine/post';
import type {SchemaDetailProps} from './types';

const SchemaDetail = (props: SchemaDetailProps) => {
    const {schema, urls, resources, isHistory, canManage} = props;
    const text = useMemo(() => createText(props.strings), [props.strings]);
    const hasResources = Boolean(resources.user || resources.role || resources.service);
    const toggle = () => postForm(urls.bulkAction, {sesskey: props.sesskey, action: schema.enabled ? 'disable' : 'enable', ids: [schema.id]});

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
                    {!isHistory && !schema.enabled && <span className="badge text-bg-secondary">{text('disabled')}</span>}
                </>}
                subtitle={<code>{schema.schemaId}</code>}
            />

            <div className="row">
                <div className="col-lg-4">
                    <DetailsPanel schema={schema} urls={urls} canManage={canManage} isHistory={isHistory} onToggle={toggle} text={text} />
                    <AccessPanel props={props} text={text} />
                    <RolePanel role={props.role} text={text} />
                </div>
                <div className="col-lg-8">
                    {props.functions.length > 0 && <FunctionsPanel functions={props.functions} text={text} />}
                    {hasResources && <ResourcesPanel resources={resources} text={text} />}
                    {props.healthLogs.length > 0 && <HealthPanel logs={props.healthLogs} text={text} />}
                </div>
            </div>
        </div>
    </ErrorBoundary>;
};

export default SchemaDetail;
