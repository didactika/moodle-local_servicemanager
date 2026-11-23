/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What a schema says about itself: its description, who maintains it, when it was made and changed and whether it is on.
 *
 * @module     local_servicemanager/components/schema/DetailsPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {SchemaDetailProps, Text} from '../../types';
import IconButton from '../common/IconButton';
import Panel from '../common/Panel';

interface DetailsPanelProps {
    schema: SchemaDetailProps['schema'];
    urls: SchemaDetailProps['urls'];
    canManage: boolean;
    isHistory: boolean;
    /** A change is being saved, so the buttons wait. */
    busy: boolean;
    onToggle: () => void;
    text: Text;
}

const DetailsPanel = ({schema, urls, canManage, isHistory, busy, onToggle, text}: DetailsPanelProps) => <Panel
    title={text('schema_information')}
    icon="circle-info"
    region="details"
    actions={!isHistory ? <div className="d-flex flex-wrap gap-1" role="group" aria-label={text('core_actions')}>
        {canManage && <IconButton icon="pen-to-square" label={text('action_edit')} href={urls.edit} />}
        {canManage && <IconButton icon="clock-rotate-left" label={text('version_history')} href={urls.history} tone="primary" />}
        <IconButton icon="download" label={text('action_export')} href={urls.export} tone="info" />
        {canManage && <IconButton
            icon={schema.enabled ? 'toggle-on' : 'toggle-off'}
            label={text(schema.enabled ? 'bulk_disable' : 'bulk_enable')}
            onClick={onToggle}
            disabled={busy}
            tone={schema.enabled ? 'success' : 'secondary'}
        />}
        {canManage && <IconButton icon="trash" label={text('action_delete')} href={urls.delete} tone="danger" />}
    </div> : undefined}
>
    {schema.description && <p className="mb-3">{schema.description}</p>}
    <dl className="row mx-0 mb-0">
        <dt className="col-sm-4 fw-normal text-muted px-0 py-2 mb-0 border-bottom">{text('schema_version')}</dt><dd className="col-sm-8 px-0 py-2 mb-0 border-bottom">{schema.version}</dd>
        {schema.maintainer && <><dt className="col-sm-4 fw-normal text-muted px-0 py-2 mb-0 border-bottom">{text('schema_maintainer')}</dt><dd className="col-sm-8 px-0 py-2 mb-0 border-bottom">{schema.maintainer}</dd></>}
        <dt className="col-sm-4 fw-normal text-muted px-0 py-2 mb-0 border-bottom">{text('schema_created')}</dt><dd className="col-sm-8 px-0 py-2 mb-0 border-bottom">{schema.created}</dd>
        <dt className="col-sm-4 fw-normal text-muted px-0 py-2 mb-0 border-bottom">{text('schema_modified')}</dt><dd className="col-sm-8 px-0 py-2 mb-0 border-bottom">{schema.modified}</dd>
        {!isHistory && <>
            <dt className="col-sm-4 fw-normal text-muted px-0 py-2 mb-0 border-bottom">{text('schema_enabled')}</dt>
            <dd className="col-sm-8 px-0 py-2 mb-0 border-bottom">
                <span className={`badge rounded-pill text-bg-${schema.enabled ? 'success' : 'secondary'}`}>{text(schema.enabled ? 'core_yes' : 'core_no')}</span>
            </dd>
        </>}
    </dl>
</Panel>;

export default DetailsPanel;
