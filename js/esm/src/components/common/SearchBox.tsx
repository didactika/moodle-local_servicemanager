/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A search field that filters as the person types, with a way to clear it.
 *
 * @module     local_servicemanager/components/common/SearchBox
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from './Icon';

interface SearchBoxProps {
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    clearLabel: string;
    id?: string;
}

const SearchBox = ({value, onChange, placeholder, clearLabel, id = 'lsm-search'}: SearchBoxProps) => <div className="dd-searchbox" role="search">
    <Icon name="magnifying-glass" />
    <input
        type="search"
        id={id}
        name="q"
        value={value}
        className="form-control"
        placeholder={placeholder}
        aria-label={placeholder}
        title={clearLabel}
        autoComplete="off"
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
            if (event.key === 'Escape') {
                onChange('');
            }
        }}
    />
</div>;

export default SearchBox;
