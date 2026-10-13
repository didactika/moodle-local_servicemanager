// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * Catches an error of the page, so a mistake in one part leaves a message with a way out instead of a blank page.
 *
 * @module     local_servicemanager/components/common/ErrorBoundary
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {Component, type ErrorInfo, type ReactNode} from 'react';
import Icon from './Icon';

interface ErrorBoundaryProps {
    /** The texts of the page, from which the message is taken. */
    strings: Record<string, string>;
    children: ReactNode;
}

interface ErrorBoundaryState {
    failed: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {failed: false};

    static getDerivedStateFromError(): ErrorBoundaryState {
        return {failed: true};
    }

    componentDidCatch(error: Error, info: ErrorInfo): void {
        // The console is where whoever maintains the site looks for what broke.
        window.console.error('local_servicemanager', error, info.componentStack);
    }

    render() {
        if (!this.state.failed) {
            return this.props.children;
        }
        const {strings} = this.props;
        return <div className="alert alert-danger d-flex align-items-start" role="alert" data-region="page-error">
            <span className="sm-icon-gap"><Icon name="circle-exclamation" /></span>
            <div>
                <h5 className="alert-heading">{strings.error_page_title}</h5>
                <p className="mb-2">{strings.error_page_text}</p>
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => window.location.reload()}>
                    <Icon name="rotate" gap />{strings.error_page_reload}
                </button>
            </div>
        </div>;
    }
}

export default ErrorBoundary;
