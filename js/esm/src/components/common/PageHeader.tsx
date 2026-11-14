/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The head of a page, as the design system draws it: the title with its badges and its line of context, and the actions
 * of the page at the other end; on a narrow screen the actions go under the title.
 *
 * @module     local_servicemanager/components/common/PageHeader
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {ReactNode} from 'react';

interface PageHeaderProps {
    title: ReactNode;
    subtitle?: ReactNode;
    /** What goes beside the title, such as a badge. */
    badges?: ReactNode;
    actions?: ReactNode;
}

const PageHeader = ({title, subtitle, badges, actions}: PageHeaderProps) => <header className="dd-page-header">
    <div className="dd-page-header-row">
        <div className="dd-page-header-main">
            <div>
                <div className="d-flex flex-wrap align-items-center gap-2">
                    <h2 className="dd-page-title">{title}</h2>
                    {badges}
                </div>
                {subtitle && <p className="dd-page-subtitle">{subtitle}</p>}
            </div>
        </div>
        {actions && <div className="dd-page-actions">{actions}</div>}
    </div>
</header>;

export default PageHeader;
