// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * What the consumer of a schema gets and what it needs: the token, the files it may move, the plugins it requires and the extra capabilities.
 *
 * @module     local_servicemanager/components/schema/AccessPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {SchemaDetailProps, Text} from '../../types';
import Icon from '../common/Icon';
import IconButton from '../common/IconButton';
import Panel from '../common/Panel';

interface AccessPanelProps {
    props: SchemaDetailProps;
    text: Text;
}

const AccessPanel = ({props, text}: AccessPanelProps) => {
    const {requirements, extraCapabilities, schema, isHistory, canManage, urls} = props;
    const file = (on: boolean, icon: string, label: string, title: string) => <span className={`badge text-bg-${on ? 'success' : 'secondary'}`} title={title}>
        <Icon name={icon} gap />{label}
    </span>;

    return <Panel title={text('guided_access')} icon="shield-halved" region="access">
        <dl className="sm-facts mb-0">
            {!isHistory && <>
                <dt>{text('tile_token')}</dt>
                <dd>
                    <span className={`badge text-bg-${schema.hasToken ? 'success' : 'secondary'}`}>{text(schema.hasToken ? 'token_active' : 'token_none')}</span>
                    {canManage && <span className="ms-2">
                        <IconButton
                            icon={schema.hasToken ? 'rotate' : 'key'}
                            label={text(schema.hasToken ? 'action_regenerate_token' : 'action_generate_token')}
                            href={urls.regenerate}
                        />
                    </span>}
                </dd>
                <dt>{text('req_file_access')}</dt>
                <dd className="d-flex flex-wrap sm-badges-row">
                    {file(requirements.downloadFiles, 'download', text('req_download_files'), text(requirements.downloadFiles ? 'req_download_files_enabled' : 'req_download_files_disabled'))}
                    {file(requirements.uploadFiles, 'upload', text('req_upload_files'), text(requirements.uploadFiles ? 'req_upload_files_enabled' : 'req_upload_files_disabled'))}
                </dd>
            </>}
            {requirements.plugins.length > 0 && <>
                <dt>{text('req_plugins')}</dt>
                <dd>
                    {requirements.plugins.map((plugin) => <div key={plugin.name}>
                        <span className={plugin.installed ? 'text-success' : 'text-warning'}>
                            <Icon name={plugin.installed ? 'circle-check' : 'triangle-exclamation'} gap />
                        </span>
                        <code>{plugin.name}</code>
                        {!plugin.installed && <small className="text-body-secondary ms-1">{text('function_missing')}</small>}
                    </div>)}
                </dd>
            </>}
            {extraCapabilities.length > 0 && <>
                <dt>{text('extra_capabilities')}</dt>
                <dd className="d-flex flex-wrap sm-badges-row">
                    {extraCapabilities.map((capability) => <code key={capability} className="small">{capability}</code>)}
                </dd>
            </>}
        </dl>
    </Panel>;
};

export default AccessPanel;
