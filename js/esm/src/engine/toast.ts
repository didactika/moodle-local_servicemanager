// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * Typed adapter for the toasts of Moodle, which have no native ESM module yet.
 *
 * @module     local_servicemanager/engine/toast
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {requireAsync} from '@moodle/lms/core/amd';

/** What a toast can be asked to do. */
export interface ToastOptions {
    type?: 'success' | 'info' | 'warning' | 'danger';
    closeButton?: boolean;
    autohide?: boolean;
}

interface ToastModule {
    add(message: string, options?: ToastOptions): Promise<unknown>;
}

let loading: Promise<ToastModule> | null = null;

const load = async(): Promise<ToastModule> => {
    const module = await requireAsync<ToastModule | {default: ToastModule}>('core/toast');
    return 'default' in module ? module.default : module;
};

/**
 * Show a message in a toast.
 *
 * @param message Text to show.
 * @param options Type of the toast and whether it can be closed.
 * @returns Resolves when the toast was shown.
 */
export const addToast = async(message: string, options: ToastOptions = {}): Promise<void> => {
    loading ??= load();
    const toast = await loading;
    await toast.add(message, options);
};
