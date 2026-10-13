// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
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
    onToggle: () => void;
    text: Text;
}

const DetailsPanel = ({schema, urls, canManage, isHistory, onToggle, text}: DetailsPanelProps) => <Panel
    title={text('schema_information')}
    icon="circle-info"
    region="details"
    actions={!isHistory ? <div className="sm-group" role="group" aria-label={text('core_actions')}>
        {canManage && <IconButton icon="clock-rotate-left" label={text('version_history')} href={urls.history} tone="primary" />}
        <IconButton icon="download" label={text('action_export')} href={urls.export} tone="info" />
        {canManage && <IconButton
            icon={schema.enabled ? 'toggle-on' : 'toggle-off'}
            label={text(schema.enabled ? 'bulk_disable' : 'bulk_enable')}
            onClick={onToggle}
            tone={schema.enabled ? 'success' : 'secondary'}
        />}
        {canManage && <IconButton icon="trash" label={text('action_delete')} href={urls.delete} tone="danger" />}
    </div> : undefined}
>
    {schema.description && <p className="mb-3">{schema.description}</p>}
    <dl className="sm-facts mb-0">
        <dt>{text('schema_version')}</dt>
        <dd>{schema.version}</dd>
        {schema.maintainer && <>
            <dt>{text('schema_maintainer')}</dt>
            <dd>{schema.maintainer}</dd>
        </>}
        <dt>{text('schema_created')}</dt>
        <dd>{schema.created}</dd>
        <dt>{text('schema_modified')}</dt>
        <dd>{schema.modified}</dd>
        {!isHistory && <>
            <dt>{text('schema_enabled')}</dt>
            <dd>
                <span className={`badge text-bg-${schema.enabled ? 'success' : 'secondary'}`}>{text(schema.enabled ? 'core_yes' : 'core_no')}</span>
            </dd>
        </>}
    </dl>
</Panel>;

export default DetailsPanel;
