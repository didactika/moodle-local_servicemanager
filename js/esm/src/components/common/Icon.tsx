/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * An icon of Font Awesome, which Moodle already loads, so it takes the colour and the size of the text around it.
 *
 * @module     local_servicemanager/components/common/Icon
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

interface IconProps {
    /** Name of the icon in Font Awesome, without the fa- prefix. */
    name: string;
    /** Space to leave after the icon, when it comes before a text. */
    gap?: boolean;
    /** Other classes of the icon. */
    className?: string;
}

const Icon = ({name, gap = false, className = ''}: IconProps) => <i className={`fa-solid fa-${name}${gap ? ' sm-icon-gap' : ''}${className ? ` ${className}` : ''}`} aria-hidden="true" />;

export default Icon;
