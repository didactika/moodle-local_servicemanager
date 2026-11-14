/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A value that follows another one a moment after it stops changing, so a search is not made for every key that is pressed.
 *
 * @module     report_autograder/hooks/useDebounced
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useEffect, useState} from 'react';

/**
 * Follow a value with a delay.
 *
 * @param value The value that changes.
 * @param milliseconds How long it must stay as it is before it is followed.
 * @returns The value, as it was a moment ago.
 */
export const useDebounced = <T,>(value: T, milliseconds: number): T => {
    const [followed, setFollowed] = useState(value);
    useEffect(() => {
        const timer = window.setTimeout(() => setFollowed(value), milliseconds);
        return () => window.clearTimeout(timer);
    }, [value, milliseconds]);
    return followed;
};
