/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * What a health check found, one thing under another, each with the icon of the status of the check and what it is about in
 * bold.
 *
 * @module     local_servicemanager/components/schema/HealthFindings
 * @copyright  2026 Didactika.org
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {HealthCheck} from '../../types';
import Icon from '../common/Icon';

interface HealthFindingsProps {
    check: HealthCheck;
}

const HealthFindings = ({check}: HealthFindingsProps) => <ul className={`sm-health-findings tone-${check.tone}`}>
    {check.findings.map((finding, index) => <li key={index}>
        <Icon name={check.icon} />
        <span>{finding.label && <><strong>{finding.label}</strong>{' '}</>}{finding.text}</span>
    </li>)}
</ul>;

export default HealthFindings;
