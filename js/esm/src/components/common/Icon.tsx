/**
 * This file is part of Moodle - https://moodle.org/
 * Moodle is free software under the GNU General Public License, version 3 or later.
 *
 * An icon of Moodle, asked for by its id and drawn by the server with the icon map of the theme, so a theme (or Icon Restyle)
 * changes it like every other icon of the site. The components name the icons by what they show; each name is the icon of Moodle
 * that shows it or, where Moodle has none, an icon of the plugin that lib.php maps to Font Awesome.
 *
 * @module     local_servicemanager/components/common/Icon
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/** The icon of Moodle (an id of core) or of the plugin (a name without a slash) that each name of the components shows. */
export const ICON_IDS: Record<string, string> = {
    'angle-left': 'i/previous',
    'angle-right': 'i/next',
    'arrow-left': 't/left',
    'arrow-right': 't/right',
    'arrows-rotate': 'i/reload',
    'bars': 'i/menubars',
    'book': 'docs',
    'check': 'i/checked',
    'chevron-down': 't/expanded',
    'chevron-right': 't/collapsed',
    'chevron-up': 't/up',
    'circle-check': 'i/valid',
    'circle-exclamation': 'i/warning',
    'circle-info': 'i/info',
    'circle-xmark': 'i/invalid',
    'clock': 'i/scheduled',
    'clock-rotate-left': 'history',
    'code': 'code',
    'code-branch': 'branch',
    'code-compare': 'compare',
    'copy': 't/copy',
    'download': 't/download',
    'ellipsis': 'i/moremenu',
    'eye': 'view',
    'file-arrow-down': 't/download',
    'file-import': 'i/import',
    'filter': 'i/filter',
    'filter-circle-xmark': 'i/filter',
    'fingerprint': 'fingerprint',
    'forward': 't/right',
    'gear': 'i/settings',
    'heart-pulse': 'health',
    'key': 'key',
    'magnifying-glass': 'a/search',
    'minus': 't/less',
    'pen': 't/edit',
    'pen-to-square': 't/edit',
    'plug': 'plug',
    'plug-circle-check': 'plug',
    'plug-circle-exclamation': 'plug',
    'plug-circle-xmark': 'plug',
    'plus': 't/add',
    'power-off': 'power',
    'puzzle-piece': 'plugin',
    'rotate': 'i/reload',
    'rotate-left': 't/reset',
    'rotate-right': 'i/reload',
    'server': 'server',
    'shield-halved': 'i/permissions',
    'spinner': 'i/loading',
    'table-columns': 'columns',
    'table-list': 'list',
    'toggle-off': 't/hide',
    'toggle-on': 't/show',
    'trash': 't/delete',
    'triangle-exclamation': 'i/warning',
    'user': 'i/user',
    'user-shield': 'i/permissions',
    'xmark': 'e/cancel',
};

/** The icons drawn by the server, under pix:id, from the texts of the page. */
let drawn: Record<string, string> = {};

/**
 * Keep the icons the server drew for the page, so every icon can be drawn from them.
 *
 * @param strings The texts of the page, with the icons under pix:id.
 */
export const registerIcons = (strings: Record<string, string>): void => {
    drawn = strings;
};

interface IconProps {
    /** What the icon shows (a name of ICON_IDS), or the id of an icon of Moodle. */
    name: string;
    /** Space to leave after the icon, when it comes before a text. */
    gap?: boolean;
    /** Other classes of the icon. */
    className?: string;
}

const Icon = ({name, gap = false, className = ''}: IconProps) => {
    const html = drawn[`pix:${ICON_IDS[name] ?? name}`];
    const classes = `d-inline-flex${gap ? ' me-1' : ''}${className ? ` ${className}` : ''}`;
    return html
        ? <span className={classes} aria-hidden="true" dangerouslySetInnerHTML={{__html: html}} />
        : <span className={classes} aria-hidden="true" />;
};

export default Icon;
