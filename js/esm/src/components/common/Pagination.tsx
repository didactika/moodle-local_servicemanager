/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The bar that goes from one page of a list to another, without leaving the page.
 *
 * @module     local_servicemanager/components/common/Pagination
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {ReactNode} from 'react';
import {pageWindow} from '../../lib/paging';
import type {Text} from '../../types';
import Icon from './Icon';

interface PaginationProps {
    page: number;
    perpage: number;
    total: number;
    onPage: (page: number) => void;
    text: Text;
}

const Pagination = ({page, perpage, total, onPage, text}: PaginationProps) => {
    const bar = pageWindow(page, perpage, total);
    if (bar.pages < 2) {
        return null;
    }
    const go = (target: number, title: string, content: ReactNode) => <li className="page-item">
        <button type="button" className="page-link" title={title} aria-label={title} onClick={() => onPage(target)}>{content}</button>
    </li>;

    return <nav aria-label={text('pagination_aria_label')} className="servicemanager-pagination mt-3">
        <ul className="pagination justify-content-center mb-1">
            {bar.first && go(0, text('pagination_first'), <Icon name="angles-left" />)}
            {bar.previous && go(page - 1, text('pagination_previous'), <Icon name="angle-left" />)}
            {bar.startDots && <li className="page-item disabled"><span className="page-link">...</span></li>}
            {bar.shown.map((index) => <li key={index} className={`page-item${index === page ? ' active' : ''}`}>
                <button type="button" className="page-link" onClick={() => onPage(index)} aria-current={index === page ? 'page' : undefined}>
                    {index + 1}
                </button>
            </li>)}
            {bar.endDots && <li className="page-item disabled"><span className="page-link">...</span></li>}
            {bar.last && go(bar.pages - 1, text('pagination_last'), bar.pages)}
            {bar.next && go(page + 1, text('pagination_next'), <Icon name="angle-right" />)}
        </ul>
        <div className="text-center text-body-secondary small">{text('pagination_page_info', {current: page + 1, total: bar.pages})}</div>
    </nav>;
};

export default Pagination;
