// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * A choice of one among a few, drawn as pills that take the whole width of their row; the one that is chosen is tinted and has a check.
 *
 * @module     local_servicemanager/components/common/Chips
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from './Icon';

/** One of the choices. */
export interface Chip {
    value: string;
    label: string;
}

interface ChipsProps {
    label: string;
    chips: Chip[];
    value: string;
    onChange: (value: string) => void;
}

const Chips = ({label, chips, value, onChange}: ChipsProps) => <div className="sm-chips" role="group" aria-label={label}>
    {chips.map((chip) => <button
        key={chip.value}
        type="button"
        className={`sm-chip${chip.value === value ? ' active' : ''}`}
        aria-pressed={chip.value === value}
        onClick={() => onChange(chip.value)}
    >
        {chip.value === value && <Icon name="check" gap />}{chip.label}
    </button>)}
</div>;

export default Chips;
