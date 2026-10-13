// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * Copying a text to the clipboard, and saying so for a moment.
 *
 * @module     local_servicemanager/hooks/useCopy
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useCallback, useEffect, useRef, useState} from 'react';

/** Milliseconds that the confirmation stays. */
const CONFIRMATION_TIME = 2000;

/** Whether the copy worked, and how to ask for another. */
export interface Copy {
    copied: boolean;
    failed: boolean;
    copy: (text: string) => void;
}

/**
 * Copy with the clipboard of the browser, or with a hidden field where the page is not a secure context.
 *
 * @param text Text to copy.
 * @returns True when it was copied.
 */
const write = async (text: string): Promise<boolean> => {
    if (navigator.clipboard && window.isSecureContext) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch {
            // The browser refused; the old way below may not.
        }
    }
    const field = document.createElement('textarea');
    field.value = text;
    field.style.cssText = 'position:fixed;left:-9999px;top:-9999px;opacity:0';
    document.body.appendChild(field);
    field.focus();
    field.select();
    let done = false;
    try {
        done = document.execCommand('copy');
    } catch {
        done = false;
    }
    document.body.removeChild(field);
    return done;
};

/**
 * Keep the state of a copy button.
 *
 * @returns Whether the last copy worked or failed, for a moment, and how to copy.
 */
export const useCopy = (): Copy => {
    const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const copy = useCallback((text: string) => {
        write(text).then((done) => {
            setState(done ? 'copied' : 'failed');
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setState('idle'), CONFIRMATION_TIME);
            return done;
        }).catch(() => setState('failed'));
    }, []);

    return {copied: state === 'copied', failed: state === 'failed', copy};
};
