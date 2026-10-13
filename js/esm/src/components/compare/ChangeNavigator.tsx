/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * Goes through the changes of a comparison, one after another, from a bar that floats at the bottom of the screen: the arrows go to
 * the previous and the next change and the text says which one it is and where.
 *
 * @module     local_servicemanager/components/compare/ChangeNavigator
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {ChangeRun} from '../../lib/diff';
import type {Text} from '../../types';
import Icon from '../common/Icon';

interface ChangeNavigatorProps {
    runs: ChangeRun[];
    /** The change the person is at, or -1 when they have not gone to any yet. */
    position: number;
    onMove: (step: 1 | -1) => void;
    text: Text;
}

const ChangeNavigator = ({runs, position, onMove, text}: ChangeNavigatorProps) => {
    const current = runs[position];
    return <div className="sm-floating sm-changenav" role="status" data-region="change-navigator">
        <button type="button" className="sm-navbtn" onClick={() => onMove(-1)} title={text('compare_prev_change')}>
            <Icon name="chevron-up" /><span className="visually-hidden">{text('compare_prev_change')}</span>
        </button>
        <span className="sm-changenav-info">
            <strong>{current ? text('compare_change_of', {n: position + 1, total: runs.length}) : text('compare_changes_found', runs.length)}</strong>
            <small>{current ? text('compare_change_at', {line: current.line, kind: text('change_' + current.kind)}) : text('compare_changes_hint')}</small>
        </span>
        <button type="button" className="sm-navbtn" onClick={() => onMove(1)} title={text('compare_next_change')}>
            <Icon name="chevron-down" /><span className="visually-hidden">{text('compare_next_change')}</span>
        </button>
    </div>;
};

export default ChangeNavigator;
