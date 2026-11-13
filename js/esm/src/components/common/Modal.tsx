/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A window over the page, as Moodle and Bootstrap draw their dialogs: it takes the focus, closes with Escape, with its button or
 * with a click outside it, and gives the focus back to where the person was.
 *
 * @module     local_servicemanager/components/common/Modal
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useEffect, useId, useRef, type ReactNode} from 'react';
import {createPortal} from 'react-dom';

interface ModalProps {
    open: boolean;
    title: ReactNode;
    onClose: () => void;
    closeLabel: string;
    children: ReactNode;
    footer?: ReactNode;
    /** A wider dialog, for lists. */
    wide?: boolean;
}

const Modal = ({open, title, onClose, closeLabel, children, footer, wide = false}: ModalProps) => {
    const root = useRef<HTMLDivElement>(null);
    const titleId = useId();

    useEffect(() => {
        if (!open) {
            return undefined;
        }
        const previous = document.activeElement as HTMLElement | null;
        document.body.classList.add('modal-open');
        root.current?.focus();
        return () => {
            document.body.classList.remove('modal-open');
            previous?.focus();
        };
    }, [open]);

    if (!open) {
        return null;
    }
    return createPortal(<>
        <div ref={root} className="modal show d-block" role="dialog" aria-modal="true" aria-labelledby={titleId} tabIndex={-1}
            onKeyDown={(event) => event.key === 'Escape' && onClose()}
            onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
            <div className={`modal-dialog modal-dialog-scrollable${wide ? ' modal-lg' : ''}`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={titleId}>{title}</h5>
                        <button type="button" className="btn-close" aria-label={closeLabel} title={closeLabel} onClick={onClose} />
                    </div>
                    <div className="modal-body">{children}</div>
                    {footer && <div className="modal-footer">{footer}</div>}
                </div>
            </div>
        </div>
        <div className="modal-backdrop show" />
    </>, document.body);
};

export default Modal;
