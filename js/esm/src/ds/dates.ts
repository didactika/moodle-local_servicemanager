/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The usual periods of a filter of dates, counted from a day.
 *
 * @module     local_servicemanager/ds/dates
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
/**
 * A date as the date inputs write it.
 *
 * @param date The date.
 * @returns Year, month and day, joined by hyphens.
 */
export const isoDay = (date: Date): string => {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
};

/** A range of dates that can be chosen with one press. */
export interface DatePreset {
    key: 'today' | 'week' | 'month' | 'last30';
    from: string;
    to: string;
}

/**
 * The ranges that can be chosen with one press, counted from a day.
 *
 * @param today The day to count from.
 * @returns The ranges: today, the last seven days, the month so far and the last thirty days.
 */
export const datePresets = (today: Date): DatePreset[] => {
    const back = (days: number): Date => new Date(today.getFullYear(), today.getMonth(), today.getDate() - days);
    return [
        {key: 'today', from: isoDay(today), to: isoDay(today)},
        {key: 'week', from: isoDay(back(6)), to: isoDay(today)},
        {key: 'month', from: isoDay(new Date(today.getFullYear(), today.getMonth(), 1)), to: isoDay(today)},
        {key: 'last30', from: isoDay(back(29)), to: isoDay(today)},
    ];
};
