// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * A button or a link that is only an icon, with its name as a tooltip and for assistive technology.
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
    /** Colour of what it does: primary, success, warning, info or danger; neutral when it is not given. */
    tone?: string;
    /** Draw it at the size of the other buttons of its row and not at the small one. */
    large?: boolean;
    /** Fill it with the colour, for the action of the page that matters most. */
    solid?: boolean;
}

/**
 * The class of the colour of a tone; the neutral one has none.
 *
 * @param tone Name of the tone, with or without the outline prefix of Bootstrap.
 * @returns The class, with a space before it, or nothing.
 */
export const toneClass = (tone: string): string => {
    const name = tone.replace(/^outline-/, '');
    return name === 'secondary' ? '' : ` tone-${name}`;
};

const IconButton = ({icon, label, href, onClick, tone = 'secondary', large = false, solid = false}: IconButtonProps) => {
    const content = <><Icon name={icon} /><span className="visually-hidden">{label}</span></>;
    const className = `btn sm-pill icon-only${large ? '' : ' compact'}${toneClass(tone)}${solid ? ' solid' : ''}`;
    return href
        ? <a href={href} className={className} title={label}>{content}</a>
        : <button type="button" className={className} title={label} onClick={onClick}>{content}</button>;
};

export default IconButton;
