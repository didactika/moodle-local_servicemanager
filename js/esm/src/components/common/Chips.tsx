/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The filter chips of the design system, for the one choice of a short list: the chosen one is pressed.
 *
 * @module     local_servicemanager/components/common/Chips
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
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

const Chips = ({label, chips, value, onChange}: ChipsProps) => <div className="dd-chips" role="group" aria-label={label}>
    {chips.map((chip) => <button key={chip.value} type="button" className="dd-chip" aria-pressed={chip.value === value}
        onClick={() => onChange(chip.value)}>{chip.label}</button>)}
</div>;

export default Chips;
