/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * The link back to the page this one was opened from, as the design system draws it above a page.
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

const BackLink = ({href, label}: BackLinkProps) => <a href={href} className="btn btn-link px-0">
    <Icon name="angle-left" gap />{label}
</a>;

export default BackLink;
