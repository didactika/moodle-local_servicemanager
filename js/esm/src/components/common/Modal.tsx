// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * A window over the page, in a dialog of the browser: it takes the focus, closes with Escape or with its button and returns the focus to
 * where the person was.
 *
 * @module     local_servicemanager/components/common/Modal
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useEffect, useRef, type ReactNode} from 'react';
import Icon from './Icon';

interface ModalProps {
    open: boolean;
    title: ReactNode;
    onClose: () => void;
    closeLabel: string;
    children: ReactNode;
    footer?: ReactNode;
}

const Modal = ({open, title, onClose, closeLabel, children, footer}: ModalProps) => {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const element = dialog.current;
        if (!element) {
            return;
        }
        if (open && !element.open) {
            element.showModal();
        } else if (!open && element.open) {
            element.close();
        }
    }, [open]);

    return <dialog ref={dialog} className="sm-dialog" onCancel={(event) => {
        event.preventDefault();
        onClose();
    }} onClick={(event) => {
        // A click on the backdrop is a click on the dialog itself and not on what is inside it.
        if (event.target === dialog.current) {
            onClose();
        }
    }}>
        <div className="sm-dialog-body">
            <div className="d-flex align-items-start justify-content-between mb-3">
                <h5 className="mb-0">{title}</h5>
                <button type="button" className="btn btn-sm btn-link text-body-secondary" onClick={onClose} title={closeLabel}>
                    <Icon name="xmark" /><span className="visually-hidden">{closeLabel}</span>
                </button>
            </div>
            {children}
            {footer && <div className="d-flex justify-content-end sm-actions-row mt-3">{footer}</div>}
        </div>
    </dialog>;
};

export default Modal;
