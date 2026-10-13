// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The button that copies a text to the clipboard and says that it did, in the toast of Moodle.
 *
 * @module     local_servicemanager/components/common/CopyButton
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useEffect} from 'react';
import {addToast} from '../../engine/toast';
import {useCopy} from '../../hooks/useCopy';
import type {Text} from '../../types';
import Icon from './Icon';

interface CopyButtonProps {
    value: string;
    text: Text;
    /** What the button says; Copy when it is not given. */
    label?: string;
    /** Bootstrap button class that goes with btn-. */
    tone?: string;
    /** A small round button with only the icon. */
    compact?: boolean;
}

const CopyButton = ({value, text, label, tone = 'outline-success', compact = false}: CopyButtonProps) => {
    const {copied, failed, copy} = useCopy();

    // The result is told where Moodle tells everything else, so it is seen wherever the person is looking.
    useEffect(() => {
        if (copied) {
            addToast(text('copied'), {type: 'success'}).catch(() => undefined);
        } else if (failed) {
            addToast(text('copy_token_failed'), {type: 'danger'}).catch(() => undefined);
        }
    }, [copied, failed, text]);

    if (compact) {
        return <button
            type="button"
            className={`btn sm-pill icon-only compact${copied ? ' tone-success' : ''}`}
            onClick={() => copy(value)}
            title={text('copy')}
        >
            <Icon name={copied ? 'check' : 'copy'} /><span className="visually-hidden">{text('copy')}</span>
        </button>;
    }
    return <button type="button" className={`btn btn-${copied ? 'success' : tone}`} onClick={() => copy(value)}>
        <Icon name={copied ? 'check' : 'copy'} gap />{copied ? text('copied') : (label ?? text('copy'))}
    </button>;
};

export default CopyButton;
