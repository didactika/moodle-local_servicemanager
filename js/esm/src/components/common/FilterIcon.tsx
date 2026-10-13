// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The icon of the button that opens the filters: the funnel that Icon Restyle draws in its own.
 *
 * @module     local_servicemanager/components/common/FilterIcon
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
const FilterIcon = () => <svg
    className="sm-filter-icon"
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
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
</svg>;

export default FilterIcon;
