/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * A round icon button of the design system (btn-link btn-icon), as the actions of a row, or a filled one for the main
 * action; the label is its title and what assistive technology says.
 *
 * @module     local_servicemanager/components/common/IconButton
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from './Icon';

interface IconButtonProps {
    icon: string;
    label: string;
    href?: string;
    onClick?: () => void;
    /** Colour of the icon: primary, success, warning, info or danger; the colour of the text when it is not given. */
    tone?: string;
    /** The size of a button of the page rather than of a row. */
    large?: boolean;
    /** Filled with its colour, for the main action of a page. */
    solid?: boolean;
    disabled?: boolean;
}

/**
 * The class that gives a button the colour of a tone.
 *
 * @param tone The tone.
 * @returns The class, with a space before it, or nothing for the colour of the text.
 */
export const toneClass = (tone: string): string => (tone && tone !== 'secondary' ? ` text-${tone}` : '');

const IconButton = ({icon, label, href, onClick, tone = 'secondary', large = false, solid = false, disabled = false}: IconButtonProps) => {
    const content = <Icon name={icon} />;
    const className = solid
        ? `btn btn-${tone === 'secondary' ? 'primary' : tone} btn-icon${large ? '' : ' btn-sm'}`
        : `btn btn-link btn-icon${large ? '' : ' btn-sm'}${toneClass(tone)}`;
    return href
        ? <a href={href} className={className} title={label} aria-label={label}>{content}</a>
        : <button type="button" className={className} title={label} aria-label={label} onClick={onClick} disabled={disabled}>{content}</button>;
};

export default IconButton;
