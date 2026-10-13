/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What can be done with the schemas that were chosen. It floats at the bottom of the screen while there is a choice, so the page
 * does not move and the actions are always at hand.
 *
 * @module     local_servicemanager/components/dashboard/SelectionBar
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {BulkActions} from '../../lib/selection';
import type {Text} from '../../types';
import Icon from '../common/Icon';

interface SelectionBarProps {
    count: number;
    actions: BulkActions;
    onAction: (action: 'enable' | 'disable' | 'export' | 'delete') => void;
    onClear: () => void;
    text: Text;
}

const SelectionBar = ({count, actions, onAction, onClear, text}: SelectionBarProps) => <div className="sm-floating" data-region="bulk-actions" role="status">
    <span className="sm-floating-count"><span>{count} {text('selected')}</span></span>
    <div className="sm-floating-actions" role="group" aria-label={text('core_actions')}>
        {actions.enable && <button type="button" className="sm-pill tone-success" onClick={() => onAction('enable')}>
            <Icon name="toggle-on" gap />{text('bulk_enable')}
        </button>}
        {actions.disable && <button type="button" className="sm-pill tone-warning" onClick={() => onAction('disable')}>
            <Icon name="toggle-off" gap />{text('bulk_disable')}
        </button>}
        <button type="button" className="sm-pill tone-info" onClick={() => onAction('export')}>
            <Icon name="download" gap />{text('bulk_export')}
        </button>
        <button type="button" className="sm-pill tone-danger" onClick={() => onAction('delete')}>
            <Icon name="trash" gap />{text('bulk_delete')}
        </button>
    </div>
    <button type="button" className="sm-floating-clear" onClick={onClear} title={text('compare_clear')}>
        <Icon name="xmark" /><span className="visually-hidden">{text('compare_clear')}</span>
    </button>
</div>;

export default SelectionBar;
