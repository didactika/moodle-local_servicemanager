// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * What a person reads above the form that imports schemas: what files it takes and where the format is explained.
 *
 * Mounted by core/react_autoinit from the data-react-component that the page writes.
 *
 * @module     local_servicemanager/ImportIntro
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {useMemo} from 'react';
import BackLink from './components/common/BackLink';
import ErrorBoundary from './components/common/ErrorBoundary';
import Icon from './components/common/Icon';
import {createText} from './engine/text';
import type {ImportIntroProps} from './types';

const ImportIntro = (props: ImportIntroProps) => {
    const text = useMemo(() => createText(props.strings), [props.strings]);

    return <ErrorBoundary strings={props.strings}><div className="servicemanager-import-page">
        <div className="mb-4"><BackLink href={props.backUrl} label={text('back')} /></div>
        <div className="alert alert-info">
            <h5><Icon name="circle-info" gap />{text('import_info_title')}</h5>
            <p>{text('import_info_text')}</p>
            <ul>
                <li>{text('import_info_yaml')}</li>
                <li>{text('import_info_zip')}</li>
            </ul>
            <p className="mb-0">
                <a href={props.documentationUrl} className="alert-link fw-bold">
                    <Icon name="book" gap />{text('view_documentation')}
                </a>
            </p>
        </div>
    </div></ErrorBoundary>;
};

export default ImportIntro;
