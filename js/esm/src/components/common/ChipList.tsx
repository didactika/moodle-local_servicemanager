// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * A list of chips that shows the first few and, when there are more, a button that opens all of them in a dialogue, as rows that scroll,
 * with a search for the ones that are many.
 *
 * @module     local_servicemanager/components/common/ChipList
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useMemo, useState, type ReactNode} from 'react';
import type {Text} from '../../types';
import Icon from './Icon';
import Modal from './Modal';
import SearchBox from './SearchBox';

/** How many chips are shown before the button. */
const SHOWN = 8;

/** More names than this get a search in the dialogue. */
const SEARCHABLE_FROM = 10;

interface ChipListProps {
    /** What the list is, which is also the title of the dialogue. */
    title: string;
    names: string[];
    /** Draw one chip. */
    chip: (name: string) => ReactNode;
    text: Text;
    /** How many are shown before the button. */
    limit?: number;
}

const ChipList = ({title, names, chip, text, limit = SHOWN}: ChipListProps) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const folded = names.length > limit;
    const found = useMemo(() => {
        const words = query.toLowerCase().split(/\s+/).filter(Boolean);
        return names.filter((name) => words.every((word) => name.toLowerCase().includes(word)));
    }, [names, query]);

    return <>
        <div className="sm-chip-row" data-region="chip-list">
            {(folded ? names.slice(0, limit) : names).map((name) => chip(name))}
            {folded && <button
                type="button"
                className="sm-role-more"
                data-action="chips-all"
                title={text('chips_all', names.length)}
                onClick={() => setOpen(true)}
            >
                +{names.length - limit}
                <span className="visually-hidden"> {text('chips_all', names.length)}</span>
            </button>}
        </div>
        {folded && <Modal
            open={open}
            wide
            title={<>{title}<span className="sm-role-count ms-2">{names.length}</span></>}
            onClose={() => setOpen(false)}
            closeLabel={text('core_cancel')}
        >
            {names.length > SEARCHABLE_FROM && <div className="sm-dialog-search">
                <SearchBox
                    value={query}
                    onChange={setQuery}
                    placeholder={text('filter_name')}
                    clearLabel={text('filter_clear')}
                    id="sm-chips-search"
                />
            </div>}
            <ul className="list-group sm-caps-list" data-region="chip-all">
                {found.map((name) => <li key={name} className="list-group-item"><span className="sm-fn">{name}</span></li>)}
            </ul>
            {found.length === 0 && <p className="text-body-secondary text-center my-3"><Icon name="filter-circle-xmark" gap />{text('no_schemas_filtered')}</p>}
        </Modal>}
    </>;
};

export default ChipList;
