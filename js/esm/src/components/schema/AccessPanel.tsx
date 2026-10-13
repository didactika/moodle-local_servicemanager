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
import ChipList from '../common/ChipList';
import CopyButton from '../common/CopyButton';
import Icon from '../common/Icon';
import IconButton from '../common/IconButton';
import Panel from '../common/Panel';

interface AccessPanelProps {
    props: SchemaDetailProps;
    /** The token that was just made, shown once next to the button that made it. */
    freshToken: string | null;
    busy: boolean;
    onMakeToken: () => void;
    text: Text;
}

const AccessPanel = ({props, freshToken, busy, onMakeToken, text}: AccessPanelProps) => {
    const {requirements, extraCapabilities, schema, isHistory, canManage} = props;
    const file = (on: boolean, icon: string, label: string, title: string) => <span className={`sm-badge tone-${on ? 'success' : 'secondary'}`} title={title}>
        <Icon name={icon} gap />{label}
    </span>;

    return <Panel title={text('guided_access')} icon="shield-halved" region="access">
        <dl className="sm-facts mb-0">
            {!isHistory && <>
                <dt>{text('tile_token')}</dt>
                <dd>
                    <span className={`sm-badge tone-${schema.hasToken ? 'success' : 'secondary'}`}>{text(schema.hasToken ? 'token_active' : 'token_none')}</span>
                    {canManage && <span className="ms-2">
                        <IconButton
                            icon={schema.hasToken ? 'rotate' : 'key'}
                            label={text(schema.hasToken ? 'action_regenerate_token' : 'action_generate_token')}
                            onClick={onMakeToken}
                            disabled={busy}
                        />
                    </span>}
                    {freshToken && <div className="sm-fresh-token" data-region="fresh-token">
                        <code className="sm-token-value">{freshToken}</code>
                        <CopyButton value={freshToken} text={text} compact />
                        <div className="small text-body-secondary">{text('token_shown_once')}</div>
                    </div>}
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
                        <span className="sm-fn">{plugin.name}</span>
                        {!plugin.installed && <small className="text-body-secondary ms-1">{text('function_missing')}</small>}
                    </div>)}
                </dd>
            </>}
            {extraCapabilities.length > 0 && <>
                <dt className="sm-fact-wide">{text('extra_capabilities')}</dt>
                <dd className="sm-fact-wide">
                    <ChipList
                        title={text('extra_capabilities')}
                        names={extraCapabilities}
                        text={text}
                        chip={(capability) => {
                            const [plugin, name] = capability.split(':');
                            return <code key={capability} className="sm-code-chip" title={capability}>
                                <span className="sm-code-chip-plugin">{plugin}</span>{name !== undefined && <span>:{name}</span>}
                            </code>;
                        }}
                    />
                </dd>
            </>}
        </dl>
    </Panel>;
};

export default AccessPanel;
