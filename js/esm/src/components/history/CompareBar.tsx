/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The floating bar of the design system while versions are chosen to compare: how many of the two are chosen, a warning when a
 * third one was tried, the button that compares them and the one that clears the choice.
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

const CompareBar = ({chosen, needed, tooMany, onClear, text}: CompareBarProps) => <div className="dd-floatbar" role="region"
    aria-label={text('compare_versions')} data-region="compare-bar">
    {[...chosen].map((id) => <input key={id} type="hidden" name="compare[]" value={id} />)}
    <span className="dd-floatbar-count" role="status" data-region="compare-chosen">{text('compare_chosen', {n: chosen.size, total: needed})}</span>
    {tooMany && <span className="text-danger small" role="alert">{text('compare_select_two')}</span>}
    <div className="dd-floatbar-actions">
        <button type="submit" id="compare-btn" className="btn btn-primary btn-sm" disabled={chosen.size !== needed}>
            <Icon name="code-compare" gap />{text('compare_versions')}
        </button>
    </div>
    <button type="button" className="dd-floatbar-clear" onClick={onClear} title={text('compare_clear')} aria-label={text('compare_clear')} />
</div>;

export default CompareBar;
