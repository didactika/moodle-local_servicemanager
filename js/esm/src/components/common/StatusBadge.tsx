// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The badge of a status, with its icon and its text.
 *
 * @module     local_servicemanager/components/common/StatusBadge
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {statusLook} from '../../lib/status';
import Icon from './Icon';

interface StatusBadgeProps {
    status: string;
    label: string;
}

const StatusBadge = ({status, label}: StatusBadgeProps) => {
    const look = statusLook(status);
    return <span className={`badge text-bg-${look.tone}`}>
        <Icon name={look.icon} gap />{label}
    </span>;
};

export default StatusBadge;
