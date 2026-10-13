// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * The token that was just generated, which is shown once.
 *
 * @module     local_servicemanager/components/schema/TokenAlert
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import type {Text} from '../../types';
import CopyButton from '../common/CopyButton';
import Icon from '../common/Icon';

interface TokenAlertProps {
    token: string;
    text: Text;
}

const TokenAlert = ({token, text}: TokenAlertProps) => <div className="alert alert-success mb-4" role="alert" data-region="new-token">
    <h4 className="alert-heading"><Icon name="key" gap />{text('token_generated')}</h4>
    <p className="mb-3">{text('token_copy_warning')}</p>
    <hr />
    <div className="input-group">
        <input
            type="text"
            className="form-control font-monospace"
            value={token}
            readOnly
            id="new-token-value"
            onFocus={(event) => event.currentTarget.select()}
            aria-label={text('current_token')}
        />
        <CopyButton value={token} text={text} />
    </div>
</div>;

export default TokenAlert;
