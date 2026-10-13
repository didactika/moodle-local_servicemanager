// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The user, the role and the service that the plugin created for a schema, each linked to where Moodle manages it.
 *
 * @module     local_servicemanager/components/schema/ResourcesPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {Resource, SchemaDetailProps, Text} from '../../types';
import Icon from '../common/Icon';
import Panel from '../common/Panel';

interface ResourcesPanelProps {
    resources: SchemaDetailProps['resources'];
    text: Text;
}

interface Entry {
    label: string;
    icon: string;
    resource: Resource | null;
    detail: string | undefined;
}

const ResourcesPanel = ({resources, text}: ResourcesPanelProps) => {
    const entries: Entry[] = [
        {label: text('service_user'), icon: 'user', resource: resources.user, detail: resources.user?.username},
        {label: text('service_role'), icon: 'shield-halved', resource: resources.role, detail: resources.role?.shortname},
        {label: text('external_service'), icon: 'plug', resource: resources.service, detail: resources.service?.shortname},
    ];

    return <Panel title={text('provisioned_resources')} icon="server" flush region="resources">
        <ul className="list-group list-group-flush">
            {entries.filter((entry) => entry.resource).map((entry) => <li key={entry.label} className="list-group-item d-flex align-items-center">
                <span className="sm-resource-icon text-body-secondary"><Icon name={entry.icon} /></span>
                <div className="flex-grow-1 sm-resource-body">
                    <div className="text-body-secondary small text-uppercase">{entry.label}</div>
                    <a href={entry.resource?.url} target="_blank" rel="noreferrer">{entry.resource?.name}</a>
                </div>
                <span className="sm-id-chip compact"><Icon name="fingerprint" gap />{entry.detail}</span>
            </li>)}
        </ul>
    </Panel>;
};

export default ResourcesPanel;
