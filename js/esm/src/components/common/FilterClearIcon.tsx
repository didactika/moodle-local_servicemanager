// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The icon of the button that clears the filters: a funnel with a cross, the same that Icon Restyle draws in its own filters.
 *
 * @module     local_servicemanager/components/common/FilterClearIcon
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const FilterClearIcon = () => <svg
    className="sm-filter-clear-icon"
    viewBox="0 0 24 24"
    width="1.05em"
    height="1.05em"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
>
    <path d="M13 14.5V20l-3 1.5v-7L3 4h14" />
    <line x1="16" y1="8" x2="22" y2="14" />
    <line x1="22" y1="8" x2="16" y2="14" />
</svg>;

export default FilterClearIcon;
