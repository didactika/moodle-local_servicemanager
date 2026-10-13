// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The bar that follows the person down the history while they pick the two versions to compare.
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

const CompareBar = ({chosen, needed, tooMany, onClear, text}: CompareBarProps) => <div className="sm-compare-bar" role="status" data-region="compare-bar">
    {[...chosen].map((id) => <input key={id} type="hidden" name="compare[]" value={id} />)}
    <div className="d-flex align-items-center flex-wrap sm-actions-row">
        <span className="fw-bold">{text('compare_chosen', {n: chosen.size, total: needed})}</span>
        {tooMany && <span className="text-danger" role="alert">{text('compare_select_two')}</span>}
        <div className="ms-auto sm-group">
            {chosen.size > 0 && <button type="button" className="btn sm-pill" onClick={onClear}>
                <Icon name="xmark" gap />{text('compare_clear')}
            </button>}
            <button type="submit" id="compare-btn" className="btn sm-pill solid tone-primary" disabled={chosen.size !== needed}>
                <Icon name="code-compare" gap />{text('compare_versions')}
            </button>
        </div>
    </div>
</div>;

export default CompareBar;
