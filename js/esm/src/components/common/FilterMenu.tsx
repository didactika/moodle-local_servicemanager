// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The button that opens the less used filters of a list, such as the dates and the size of the page.
 *
 * What is chosen in it applies at once, so there is nothing to confirm; it only has a way to put everything back.
 *
 * @module     local_servicemanager/components/common/FilterMenu
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {ReactNode} from 'react';
import {useDropdown} from '../../hooks/useDropdown';
import type {Text} from '../../types';
import Icon from './Icon';

interface FilterMenuProps {
    text: Text;
    /** How many of the filters of this menu are on. */
    count: number;
    onReset: () => void;
    children: ReactNode;
}

const FilterMenu = ({text, count, onReset, children}: FilterMenuProps) => {
    const menu = useDropdown();

    return <div className="dropdown sm-filter" ref={menu.ref}>
        <button
            className={`btn btn-outline-secondary${count > 0 ? ' active' : ''}`}
            type="button"
            aria-haspopup="true"
            aria-expanded={menu.open}
            onClick={menu.toggle}
        >
            <Icon name="sliders" gap />{text('filters')}
            {count > 0 && <span className="badge text-bg-primary ms-2">{count}</span>}
        </button>
        <div className={`dropdown-menu dropdown-menu-end sm-filter-menu${menu.open ? ' show' : ''}`}>
            {children}
            <button type="button" className="btn btn-link px-0" onClick={onReset} disabled={count === 0}>
                <Icon name="rotate-left" gap />{text('filter_clear')}
            </button>
        </div>
    </div>;
};

export default FilterMenu;
