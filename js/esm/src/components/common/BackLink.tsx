/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The button that goes back to the page before.
 *
 * @module     local_servicemanager/components/common/BackLink
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import Icon from './Icon';

interface BackLinkProps {
    href: string;
    label: string;
}

const BackLink = ({href, label}: BackLinkProps) => <a href={href} className="btn btn-secondary">
    <Icon name="arrow-left" gap />{label}
</a>;

export default BackLink;
