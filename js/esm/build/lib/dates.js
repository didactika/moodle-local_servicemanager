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
 */const r=t=>t?String(Math.floor(new Date(t).getTime()/1e3)):"";export{r as toTimestamp};
