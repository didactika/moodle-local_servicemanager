// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Health logs filter for Service Schema view page.
 *
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @author     Hector Arrechea
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 * @module     local_servicemanager/health_log_filter
 */

/**
 * Initialize the filter.
 */
export const init = () => {
    const filter = document.getElementById('healthlog-status-filter');
    const table = document.getElementById('healthlog-table');

    if (!filter || !table) {
        return;
    }

    filter.addEventListener('change', (e) => {
        const selectedStatus = e.target.value;
        const rows = table.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const status = row.getAttribute('data-status');
            if (!selectedStatus || status === selectedStatus) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
};
