/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The foot of a list, as the Didactika design system and Delegate account draw it: rows per page with the sizes that fit the
 * list, which rows are shown, and the arrows.
 *
 * @module     local_servicemanager/components/common/Pager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useId} from 'react';
import {fitPageSizes, pageRange} from '../../lib/paging';
import type {Text} from '../../types';
import Icon from './Icon';

interface PagerProps {
    page: number;
    /** Rows on a page, 0 for all of them. */
    perpage: number;
    total: number;
    onChange: (changes: {page?: number; perpage?: number}) => void;
    text: Text;
}

const Pager = ({page, perpage, total, onChange, text}: PagerProps) => {
    const id = useId();
    if (total === 0) {
        // An empty list has no pages: its empty state says so.
        return null;
    }
    const {from, to} = pageRange(page, perpage, total);
    // Only the sizes smaller than the list are offered, besides all of it, and the select always shows one of them.
    const {sizes, shown} = fitPageSizes(perpage, total);
    return <div className="table-foot">
        <nav className="dd-pager" aria-label={text('pagination_aria_label')}>
            <div className="dd-pager-size">
                <label htmlFor={id} className="mb-0">{text('pagination_per_page')}</label>
                <select
                    id={id}
                    className="form-select form-select-sm dd-select"
                    value={shown}
                    onChange={(event) => onChange({perpage: Number(event.target.value), page: 0})}
                >
                    {sizes.map((size) => <option key={size} value={size}>{size ? size : text('pagination_all')}</option>)}
                </select>
            </div>
            <div className="dd-pager-end">
                <span className="dd-pager-range" role="status">{text('pagination_range', {from, to, total})}</span>
                <div className="dd-pager-arrows">
                    <button type="button" className="btn btn-outline-secondary btn-sm btn-icon" disabled={page === 0}
                        title={text('pagination_previous')} aria-label={text('pagination_previous')}
                        onClick={() => onChange({page: page - 1})}>
                        <Icon name="angle-left" />
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-sm btn-icon" disabled={to >= total}
                        title={text('pagination_next')} aria-label={text('pagination_next')}
                        onClick={() => onChange({page: page + 1})}>
                        <Icon name="angle-right" />
                    </button>
                </div>
            </div>
        </nav>
    </div>;
};

export default Pager;
