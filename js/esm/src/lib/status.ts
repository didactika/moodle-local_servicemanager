// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * How a status is shown: the colour of its badge and its icon.
 *
 * @module     local_servicemanager/lib/status
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/** What a status looks like. */
export interface StatusLook {
    /** Bootstrap colour of the badge. */
    tone: 'success' | 'warning' | 'danger' | 'secondary';
    /** Name of the Font Awesome icon. */
    icon: string;
}

const LOOKS: Record<string, StatusLook> = {
    healthy: {tone: 'success', icon: 'circle-check'},
    warning: {tone: 'warning', icon: 'triangle-exclamation'},
    critical: {tone: 'danger', icon: 'circle-xmark'},
    history: {tone: 'secondary', icon: 'clock'},
};

/**
 * The look of a status.
 *
 * @param status Status of a schema or of a health check; anything else looks like a healthy one.
 * @returns The colour and the icon.
 */
export const statusLook = (status: string): StatusLook => LOOKS[status] ?? LOOKS.healthy;
