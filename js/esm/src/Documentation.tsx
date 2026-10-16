/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The reference of the YAML format of a schema.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/Documentation
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useMemo} from 'react';
import BackLink from './components/common/BackLink';
import CopyButton from './components/common/CopyButton';
import ErrorBoundary from './components/common/ErrorBoundary';
import Icon from './components/common/Icon';
import PageHeader from './components/common/PageHeader';
import FieldTable, {type Field} from './components/documentation/FieldTable';
import {createText} from './engine/text';
import type {DocumentationProps} from './types';

const META: Field[] = [
    {name: 'id', required: true, description: 'doc_meta_id'},
    {name: 'name', required: true, description: 'doc_meta_name'},
    {name: 'version', required: false, description: 'doc_meta_version'},
    {name: 'maintainer', required: false, description: 'doc_meta_maintainer'},
    {name: 'description', required: false, description: 'doc_meta_description'},
];

const REQUIREMENTS: Field[] = [
    {name: 'plugins', required: false, description: 'doc_requirements_plugins'},
    {name: 'download_files', required: false, description: 'doc_requirements_download_files'},
    {name: 'upload_files', required: false, description: 'doc_requirements_upload_files'},
];

/** What each resource that a schema creates is called, by the text that names the resource and the pattern and example it follows. */
const ROLE: Field[] = [
    {name: 'context_levels', required: false, description: 'doc_role_context_levels'},
    {name: 'permissions', required: false, description: 'doc_role_permissions'},
    {name: 'allow_assign', required: false, description: 'doc_role_allow_assign'},
    {name: 'allow_override', required: false, description: 'doc_role_allow_override'},
    {name: 'allow_switch', required: false, description: 'doc_role_allow_switch'},
    {name: 'allow_view', required: false, description: 'doc_role_allow_view'},
];

const NAMING: Array<{resource: string; pattern: string; example: string}> = [
    {resource: 'doc_naming_username', pattern: 'ws.{id}', example: 'ws.example.service'},
    {resource: 'doc_naming_displayname', pattern: 'User Webservice {name}', example: 'User Webservice Example Service'},
    {resource: 'doc_naming_email', pattern: 'ws.{id}@devnull.{domain}', example: 'ws.example.service@devnull.example.com'},
    {resource: 'doc_naming_role', pattern: 'ws_{id}', example: 'ws_example_service'},
    {resource: 'doc_naming_service', pattern: 'ws_{id}', example: 'ws_example_service'},
    {resource: 'doc_naming_token', pattern: 'Token - {name}', example: 'Token - Example Service'},
];

const SECTIONS = ['structure', 'meta', 'definition', 'role', 'naming', 'example'];

const Documentation = (props: DocumentationProps) => {
    const text = useMemo(() => createText(props.strings), [props.strings]);

    return <ErrorBoundary strings={props.strings}><div className="servicemanager-documentation">
        <div className="mb-3"><BackLink href={props.backUrl} label={text('back')} /></div>
        <PageHeader
            title={text('schema_reference')}
            actions={<a href={props.downloadUrl} className="btn btn-outline-primary"><Icon name="download" gap />{text('download_example')}</a>}
        />

        <div className="card">
            <div className="card-body">
                <h5 className="mb-3">{text('quick_links')}</h5>
                <ul className="list-unstyled mb-4">
                    {SECTIONS.map((section) => <li key={section}>
                        <a href={`#${section}`}><Icon name="chevron-right" gap />{text('doc_' + section)}</a>
                    </li>)}
                </ul>

                <div className="alert alert-success mb-4">
                    <Icon name="download" gap />
                    <a href={props.downloadUrl} className="alert-link">{text('download_example')}</a>
                    {' - '}{text('download_example_desc')}
                </div>

                <h4 id="structure" className="mt-4 mb-3 text-primary">{text('doc_structure')}</h4>
                <p>{text('doc_structure_desc')}</p>
                <pre className="sm-code p-3 rounded"><code>{props.structureCode}</code></pre>
                <CopyButton value={props.structureCode} text={text} tone="outline-secondary" />

                <h4 id="meta" className="mt-4 mb-3 text-primary">{text('doc_meta')}</h4>
                <FieldTable fields={META} text={text} />
                <div className="mt-3"><FieldTable fields={REQUIREMENTS} text={text} /></div>

                <h4 id="definition" className="mt-4 mb-3 text-primary">{text('doc_definition')}</h4>
                <p>{text('doc_definition_desc')}</p>
                <h5 className="mt-3">{text('functions')}</h5>
                <p>{text('doc_functions_desc')}</p>
                <pre className="sm-code p-3 rounded"><code>{props.functionCode}</code></pre>
                <div className="alert alert-info mt-3">
                    <Icon name="circle-info" gap />
                    {text('doc_default_capabilities')}
                    {' '}<code>webservice/rest:use</code>, <code>webservice/soap:use</code>.
                </div>

                <h4 id="role" className="mt-4 mb-3 text-primary">{text('doc_role')}</h4>
                <p>{text('doc_role_desc')}</p>
                <FieldTable fields={ROLE} text={text} />
                <div className="alert alert-info mt-3">
                    <Icon name="circle-info" gap />{text('doc_role_note')}
                </div>

                <h4 id="naming" className="mt-4 mb-3 text-primary">{text('doc_naming')}</h4>
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>{text('resource')}</th>
                            <th>{text('pattern')}</th>
                            <th>{text('doc_example_col')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {NAMING.map((row) => <tr key={row.resource}>
                            <td>{text(row.resource)}</td>
                            <td><code>{row.pattern}</code></td>
                            <td><code>{row.example}</code></td>
                        </tr>)}
                    </tbody>
                </table>

                <h4 id="example" className="mt-4 mb-3 text-primary">{text('doc_example')}</h4>
                <p>
                    {text('doc_example_complete_desc')}{' '}
                    <a href={props.downloadUrl}><Icon name="download" gap />{text('download_example')}</a>{' '}
                    {text('doc_example_to_get_started')}
                </p>
            </div>
        </div>
    </div></ErrorBoundary>;
};

export default Documentation;
