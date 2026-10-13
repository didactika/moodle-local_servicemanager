// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The tools to find a schema: a search that filters as the person types, and the dates and the size of the page in a menu. The
 * status is chosen in the summary above, so it is not asked for twice.
 *
 * @module     local_servicemanager/components/dashboard/Toolbar
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {ListControl} from '../../hooks/useListState';
import type {Text} from '../../types';
import type {ReactNode} from 'react';
import Chips from '../common/Chips';
import FilterMenu from '../common/FilterMenu';
import SearchBox from '../common/SearchBox';

interface ToolbarProps {
    list: ListControl;
    options: number[];
    text: Text;
    /** The actions of the whole page, which sit at the end of the row as icons. */
    actions?: ReactNode;
}

const Toolbar = ({list, options, text, actions}: ToolbarProps) => <div className="sm-toolbar">
    <SearchBox
        value={list.state.query}
        onChange={(query) => list.set({query})}
        placeholder={text('filter_name')}
        clearLabel={text('filter_clear')}
    />
    <FilterMenu text={text} count={list.extras} onReset={() => list.set({from: '', to: '', perpage: options[0]})}>
        <div className="mb-3">
            <label htmlFor="sm-from" className="form-label">{text('filter_date_from')}</label>
            <input type="date" id="sm-from" className="form-control" value={list.state.from} onChange={(event) => list.set({from: event.target.value})} />
        </div>
        <div className="mb-3">
            <label htmlFor="sm-to" className="form-label">{text('filter_date_to')}</label>
            <input type="date" id="sm-to" className="form-control" value={list.state.to} onChange={(event) => list.set({to: event.target.value})} />
        </div>
        <div className="sm-filter-title">{text('filter_per_page')}</div>
        <Chips
            label={text('filter_per_page')}
            value={String(list.state.perpage)}
            onChange={(value) => list.set({perpage: Number(value)})}
            chips={options.map((option) => ({value: String(option), label: String(option)}))}
        />
    </FilterMenu>
    {actions && <div className="sm-toolbar-actions">{actions}</div>}
</div>;

export default Toolbar;
