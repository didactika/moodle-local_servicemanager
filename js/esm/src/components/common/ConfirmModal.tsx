// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * A question that must be answered before something that cannot be undone, in a dialog of the browser, which takes the focus,
 * closes with Escape and is drawn over the page with the style of Bootstrap.
 *
 * @module     local_servicemanager/components/common/ConfirmModal
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from './Icon';
import Modal from './Modal';

interface ConfirmModalProps {
    open: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    cancelLabel: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal = ({open, title, message, confirmLabel, cancelLabel, onConfirm, onCancel}: ConfirmModalProps) => <Modal
    open={open}
    title={<><Icon name="triangle-exclamation" gap />{title}</>}
    onClose={onCancel}
    closeLabel={cancelLabel}
    footer={<>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>{cancelLabel}</button>
        <button type="button" className="btn btn-danger" onClick={onConfirm}>{confirmLabel}</button>
    </>}
>
    <p className="mb-0">{message}</p>
</Modal>;

export default ConfirmModal;
