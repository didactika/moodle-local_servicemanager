// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * The page of a schema: searches its functions, shows the capabilities of one in a dialogue, enables or disables it and makes its
 * token, all without leaving the page.
 *
 * @module     local_servicemanager/schema
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import Ajax from 'core/ajax';
import {get_strings as getStrings} from 'core/str';
import {add as addToast} from 'core/toast';
import Templates from 'core/templates';
import {confirm, inform} from 'local_servicemanager/dialogue';
import {init as initCopy} from 'local_servicemanager/copy';

/**
 * Show the capabilities of a function.
 *
 * @param {HTMLElement} button The button of the function.
 */
const showCapabilities = (button) => {
    getStrings([
        {key: 'function_capabilities_title', component: 'local_servicemanager'},
        {key: 'function_capabilities_help', component: 'local_servicemanager'},
    ]).then((strings) => {
        const capabilities = JSON.parse(button.dataset.capabilities);
        const body = Templates.render('local_servicemanager/function_capabilities_dialogue', {
            name: button.dataset.name,
            description: button.dataset.description || '',
            hint: strings[1],
            items: capabilities.map((name) => ({name})),
        });
        return inform(strings[0], body);
    }).catch(() => null);
};

/**
 * Start the page.
 */
export const init = () => {
    const root = document.querySelector('[data-region="servicemanager-detail"]');
    if (!root) {
        return;
    }
    initCopy();

    const search = root.querySelector('#sm-functions-search');
    if (search) {
        const rows = [...root.querySelectorAll('[data-region="function"]')];
        const empty = root.querySelector('[data-region="functions-empty"]');
        search.addEventListener('input', () => {
            const words = search.value.toLowerCase().split(/\s+/).filter(Boolean);
            let shown = 0;
            rows.forEach((row) => {
                const match = words.every((word) => row.dataset.search.includes(word));
                row.hidden = !match;
                shown += match ? 1 : 0;
            });
            empty.hidden = shown !== 0;
        });
    }

    /**
     * Call one web service function of the plugin.
     *
     * @param {String} methodname Name of the function.
     * @param {Object} args Arguments.
     * @returns {Promise} Resolves with what it returns.
     */
    const call = (methodname, args) => Ajax.call([{methodname, args}])[0];
    const text = (key, component = 'local_servicemanager', param = undefined) => getStrings([{key, component, param}])
        .then((loaded) => loaded[0]);
    let busy = false;

    const sayActionFailed = () => text('error_action_failed').then((message) => addToast(message, {type: 'danger'}));

    /**
     * Run a change, with the buttons waiting, and say how it went.
     *
     * @param {Function} change Makes the call and returns a promise of the text of the toast.
     */
    const run = (change) => {
        if (busy) {
            return;
        }
        busy = true;
        change().then((message) => addToast(message, {type: 'success'}))
            .catch(sayActionFailed)
            .catch(() => null)
            .then(() => {
                busy = false;
                return null;
            })
            .catch(() => null);
    };

    const drawEnabled = (enabled) => {
        root.dataset.enabled = enabled ? '1' : '0';
        const toggle = root.querySelector('[data-region="toggle-schema"]');
        toggle.classList.toggle('tone-success', enabled);
        const icon = toggle.querySelector('i');
        icon.className = 'fa-solid fa-' + (enabled ? 'toggle-on' : 'toggle-off');
        root.querySelector('[data-region="disabled-badge"]').hidden = enabled;
        const badge = root.querySelector('[data-region="enabled-badge"]');
        badge.classList.toggle('tone-success', enabled);
        badge.classList.toggle('tone-secondary', !enabled);
        return getStrings([
            {key: enabled ? 'bulk_disable' : 'bulk_enable', component: 'local_servicemanager'},
            {key: enabled ? 'yes' : 'no', component: 'moodle'},
        ]).then((loaded) => {
            toggle.title = loaded[0];
            toggle.querySelector('.sr-only, .visually-hidden').textContent = loaded[0];
            badge.textContent = loaded[1];
            return loaded;
        });
    };

    const toggled = (result) => drawEnabled(result.enabled).then(() => text(
        result.enabled ? 'schema_enabled_toast' : 'schema_disabled_toast',
        'local_servicemanager',
        root.dataset.name
    ));

    const toggleSchema = () => run(() => call('local_servicemanager_set_enabled', {
        id: Number(root.dataset.id),
        enabled: root.dataset.enabled !== '1',
    }).then(toggled));

    const showToken = (token) => {
        const holder = root.querySelector('[data-region="fresh-token"]');
        root.querySelector('#sm-fresh-token-value').textContent = token;
        holder.hidden = false;
        root.dataset.hasToken = '1';
        const make = root.querySelector('[data-region="make-token"]');
        make.querySelector('i').className = 'fa-solid fa-rotate';
        const badge = root.querySelector('[data-region="token-badge"]');
        if (badge) {
            badge.classList.remove('tone-secondary');
            badge.classList.add('tone-success');
            text('token_active').then((label) => {
                badge.textContent = label;
                return label;
            }).catch(() => null);
        }
    };

    const makeToken = () => run(() => call('local_servicemanager_regenerate_token', {id: Number(root.dataset.id)})
        .then((result) => {
            showToken(result.token);
            return text('token_regenerated');
        }));

    const askForToken = () => {
        const has = root.dataset.hasToken === '1';
        getStrings([
            {key: has ? 'action_regenerate_token' : 'action_generate_token', component: 'local_servicemanager'},
            {key: has ? 'confirm_regenerate_token' : 'confirm_generate_token', component: 'local_servicemanager'},
        ]).then((loaded) => confirm(loaded[0], loaded[1], loaded[0], makeToken)).catch(() => null);
    };

    /** More names than this get a search in the dialogue. */
    const SEARCHABLE_FROM = 10;

    const drawChips = (dialogue, none, names, query) => {
        const words = query.toLowerCase().split(/\s+/).filter(Boolean);
        const found = names.filter((name) => words.every((word) => name.toLowerCase().includes(word)));
        none.hidden = found.length !== 0;
        return Templates.renderForPromise('local_servicemanager/chips_rows', {items: found.map((name) => ({name}))})
            .then(({html, js}) => Templates.replaceNode(dialogue.querySelector('[data-region="chip-all"]'), html, js))
            .catch(() => null);
    };

    const bindChips = (modal, names) => modal.getBodyPromise().then(() => {
        const dialogue = modal.getBody()[0];
        const none = dialogue.querySelector('[data-region="chip-none"]');
        dialogue.addEventListener('input', (event) => {
            if (event.target.matches('[data-region="chips-search"]')) {
                drawChips(dialogue, none, names, event.target.value);
            }
        });
        drawChips(dialogue, none, names, '');
        return modal;
    });

    const openChips = (title, names, strings) => inform(title, Templates.render('local_servicemanager/chips_dialogue', {
        hassearch: names.length > SEARCHABLE_FROM,
        placeholder: strings[0],
        nonetext: strings[1],
    })).then((modal) => bindChips(modal, names));

    const showAllChips = (button) => {
        const block = button.closest('[data-region="chip-block"]');
        const names = [...block.querySelectorAll('[data-chip]')].map((chip) => chip.textContent.trim());
        getStrings([
            {key: 'filter_name', component: 'local_servicemanager'},
            {key: 'no_schemas_filtered', component: 'local_servicemanager'},
        ]).then((strings) => openChips(block.dataset.title, names, strings)).catch(() => null);
    };

    root.addEventListener('click', (event) => {
        const capabilities = event.target.closest('[data-action="show-capabilities"]');
        const more = event.target.closest('[data-action="chips-all"]');
        if (more) {
            showAllChips(more);
        } else if (capabilities) {
            showCapabilities(capabilities);
        } else if (event.target.closest('[data-action="toggle-schema"]')) {
            toggleSchema();
        } else if (event.target.closest('[data-action="make-token"]')) {
            askForToken();
        }
    });
};
