/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What the person has chosen to compare and the button that compares it. It floats at the bottom of the screen, as the bar of the
 * schemas of the dashboard does, so it is at hand however long the list is.
 *
 * @module     local_servicemanager/components/history/CompareBar
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {Text} from '../../types';
import Icon from '../common/Icon';

interface CompareBarProps {
    chosen: ReadonlySet<number>;
    needed: number;
    /** The person tried to choose a third version. */
    tooMany: boolean;
    onClear: () => void;
    text: Text;
}

const CompareBar = ({chosen, needed, tooMany, onClear, text}: CompareBarProps) => <div className="sm-floating sm-compare" role="status" data-region="compare-bar">
    {[...chosen].map((id) => <input key={id} type="hidden" name="compare[]" value={id} />)}
    <span className="sm-floating-count" data-region="compare-chosen">
        <span>{text('compare_chosen', {n: chosen.size, total: needed})}</span>
    </span>
    {tooMany && <span className="sm-compare-warning" role="alert">{text('compare_select_two')}</span>}
    <div className="sm-floating-actions">
        <button type="submit" id="compare-btn" className="btn sm-pill solid tone-primary" disabled={chosen.size !== needed}>
            <Icon name="code-compare" gap />{text('compare_versions')}
        </button>
    </div>
    <button type="button" className="sm-floating-clear" onClick={onClear} title={text('compare_clear')}>
        <Icon name="xmark" /><span className="visually-hidden">{text('compare_clear')}</span>
    </button>
</div>;

export default CompareBar;
