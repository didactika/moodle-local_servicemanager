// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The web service functions that a schema declares: what each does, whether it reads or writes, what it asks of whoever calls it
 * and whether this Moodle has it. The capabilities of a function open in a window.
 *
 * @module     local_servicemanager/components/schema/FunctionsPanel
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useMemo, useState} from 'react';
import type {SchemaFunction, Text} from '../../types';
import Icon from '../common/Icon';
import Modal from '../common/Modal';
import Panel from '../common/Panel';
import SearchBox from '../common/SearchBox';

interface FunctionsPanelProps {
    functions: SchemaFunction[];
    text: Text;
}

/** More functions than this get a search of their own. */
const SEARCHABLE_FROM = 8;

const FunctionsPanel = ({functions, text}: FunctionsPanelProps) => {
    const [query, setQuery] = useState('');
    const [viewing, setViewing] = useState<SchemaFunction | null>(null);
    const missing = functions.filter((fn) => !fn.exists).length;
    const shown = useMemo(() => {
        const words = query.toLowerCase().split(/\s+/).filter(Boolean);
        return functions.filter((fn) => words.every((word) => (fn.name + ' ' + fn.description).toLowerCase().includes(word)));
    }, [functions, query]);

    return <Panel
        title={text(functions.length === 1 ? 'tile_function' : 'functions')}
        icon="code"
        count={functions.length}
        flush
        region="functions"
        actions={missing > 0 ? <span className="badge text-bg-danger">{text('tile_functions_missing', missing)}</span> : undefined}
    >
        {functions.length >= SEARCHABLE_FROM && <div className="p-3 border-bottom">
            <SearchBox value={query} onChange={setQuery} placeholder={text('functions_search')} clearLabel={text('filter_clear')} id="sm-functions-search" />
        </div>}
        <ul className="list-group list-group-flush sm-functions">
            {shown.map((fn) => <li key={fn.name} className={`list-group-item sm-function${fn.exists ? '' : ' missing'}`}>
                <span className={`sm-function-icon ${fn.exists ? 'text-body-secondary' : 'text-danger'}`}>
                    <Icon name={fn.exists ? (fn.type === 'write' ? 'pen' : 'eye') : 'circle-xmark'} />
                </span>
                <div className="flex-grow-1 sm-function-body">
                    <div className="d-flex flex-wrap align-items-center sm-badges-row">
                        <span className="sm-fn">{fn.name}</span>
                        {fn.type && <span className="badge text-bg-light border">{text('function_' + fn.type)}</span>}
                        {fn.critical && <span className="badge text-bg-light border">{text('function_critical')}</span>}
                        {!fn.exists && <span className="badge text-bg-danger">{text('function_missing')}</span>}
                    </div>
                    {fn.description && <div className="text-body-secondary small">{fn.description}</div>}
                </div>
                {fn.capabilities.length > 0 && <button
                    type="button"
                    className="btn btn-sm btn-outline-primary sm-function-caps"
                    onClick={() => setViewing(fn)}
                    title={text('function_capabilities_view')}
                >
                    <Icon name="shield-halved" gap />{text('function_capabilities', fn.capabilities.length)}
                </button>}
            </li>)}
        </ul>
        {shown.length === 0 && <p className="text-body-secondary text-center my-4">{text('no_schemas_filtered')}</p>}

        <Modal
            open={viewing !== null}
            wide
            title={<><Icon name="shield-halved" gap />{text('function_capabilities_title')}</>}
            onClose={() => setViewing(null)}
            closeLabel={text('core_cancel')}
        >
            {viewing && <>
                <p className="mb-2"><span className="sm-fn">{viewing.name}</span></p>
                {viewing.description && <p className="text-body-secondary">{viewing.description}</p>}
                <p className="small text-body-secondary">{text('function_capabilities_help')}</p>
                <ul className="list-group sm-caps-list">
                    {viewing.capabilities.map((capability) => <li key={capability} className="list-group-item"><span className="sm-fn">{capability}</span></li>)}
                </ul>
            </>}
        </Modal>
    </Panel>;
};

export default FunctionsPanel;
