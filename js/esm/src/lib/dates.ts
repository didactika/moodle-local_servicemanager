/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The dates of the filters, which a date field writes as text and the server reads as a Unix time.
 *
 * @module     local_servicemanager/lib/dates
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/**
 * The Unix time of the start of a day.
 *
 * @param day Day as a date field writes it, such as 2026-10-13.
 * @returns Seconds since 1970, or an empty string when there is no day.
 */
export const toTimestamp = (day: string): string => {
    if (!day) {
        return '';
    }
    return String(Math.floor(new Date(day).getTime() / 1000));
};
