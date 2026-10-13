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
 * The dialogues of the plugin, opened the way each release of Moodle opens them: the classes of the modals have a create
 * method from Moodle 4.3, and the earlier releases open them through the factory.
 *
 * @module     local_servicemanager/dialogue
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import ModalFactory from 'core/modal_factory';
import ModalEvents from 'core/modal_events';
import ModalSaveCancel from 'core/modal_save_cancel';
import ModalCancel from 'core/modal_cancel';
import {get_string as getString} from 'core/str';

/**
 * Open a modal.
 *
 * @param {Function} ModalClass The class of the modal, which has a create method in the later releases.
 * @param {String} type Name of its type in the factory.
 * @param {Object} config Title and body.
 * @returns {Promise} Resolves with the modal, which is shown.
 */
const open = (ModalClass, type, config) => {
    const made = typeof ModalClass.create === 'function'
        ? ModalClass.create({...config, show: true, removeOnClose: true})
        : ModalFactory.create({type: ModalFactory.types[type], ...config, removeOnClose: true}).then((modal) => {
            modal.show();
            return modal;
        });
    // A long body scrolls inside the dialogue, with its head and its foot in place.
    return made.then((modal) => {
        const dialogue = modal.getRoot()[0].querySelector('.modal-dialog');
        if (dialogue) {
            dialogue.classList.add('modal-dialog-scrollable', 'sm-modal');
        }
        modal.getRoot()[0].classList.add('sm-modal-root');
        return modal;
    });
};

/**
 * Ask the person to confirm something.
 *
 * @param {String} title Title of the dialogue.
 * @param {String} body What is asked.
 * @param {String} label Text of the button that confirms.
 * @param {Function} onConfirm What to do when it is confirmed.
 * @returns {Promise} Resolves when the dialogue is open.
 */
export const confirm = (title, body, label, onConfirm) => open(ModalSaveCancel, 'SAVE_CANCEL', {title, body}).then((modal) => {
    if (typeof modal.setSaveButtonText === 'function') {
        modal.setSaveButtonText(label);
    }
    modal.getRoot().on(ModalEvents.save, onConfirm);
    return modal;
});

/**
 * Make the button of a dialogue that only closes say Close.
 *
 * @param {Object} modal The dialogue.
 * @returns {Promise} Resolves with the dialogue.
 */
const nameCloseButton = (modal) => getString('closebuttontitle', 'core').then((label) => {
    const button = modal.getFooter()[0].querySelector('[data-action="cancel"]');
    if (button) {
        button.textContent = label;
    }
    return modal;
}).catch(() => modal);

/**
 * Show something in a dialogue that only closes.
 *
 * @param {String} title Title of the dialogue.
 * @param {String} body What is shown, as HTML.
 * @returns {Promise} Resolves when the dialogue is open.
 */
export const inform = (title, body) => open(ModalCancel, 'CANCEL', {title, body}).then(nameCloseButton);
