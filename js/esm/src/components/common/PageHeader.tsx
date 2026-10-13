// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The head of a page: its title, a line that says what it is for and the actions that belong to the whole page.
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
    /** What goes before the title, such as a badge. */
    badges?: ReactNode;
    actions?: ReactNode;
}

const PageHeader = ({title, subtitle, badges, actions}: PageHeaderProps) => <header
    className="d-flex flex-wrap justify-content-between align-items-start sm-page-header"
>
    <div className="sm-page-title">
        <div className="d-flex flex-wrap align-items-center sm-badges-row">
            <h2 className="mb-0">{title}</h2>
            {badges}
        </div>
        {subtitle && <p className="text-body-secondary mb-0 mt-1">{subtitle}</p>}
    </div>
    {actions && <div className="d-flex flex-wrap align-items-center sm-actions-row">{actions}</div>}
</header>;

export default PageHeader;
