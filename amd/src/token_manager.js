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
 * Token manager AMD module for Service Schema Manager
 *
 * @module     local_serviceschema/token_manager
 * @author     Hector Arrechea <hector.arrechea@ct.uneatlantico.es>
 * @copyright  2026 ADSDR
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery', 'core/str', 'core/notification'], function ($, Str, Notification) {

    /**
     * Initialize the token manager
     */
    var init = function () {
        // Bind copy button click events using event delegation
        document.addEventListener('click', function (e) {
            var button = e.target.closest('.copy-token');
            if (button) {
                e.preventDefault();
                e.stopPropagation();

                var token = button.getAttribute('data-token');
                var targetId = button.getAttribute('data-target');

                if (token) {
                    copyToClipboard(token, button, targetId);
                }
            }
        });
    };

    /**
     * Copy text to clipboard
     *
     * @param {string} text Text to copy
     * @param {Element} button The button element
     * @param {string} targetId Optional input element ID to select
     */
    var copyToClipboard = function (text, button, targetId) {
        // Select input for visual feedback
        if (targetId) {
            var input = document.getElementById(targetId);
            if (input) {
                input.select();
                try {
                    input.setSelectionRange(0, 99999);
                } catch (e) {
                    // Ignore if not supported
                }
            }
        }

        // Try clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(function () {
                showCopySuccess(button);
            }).catch(function (err) {
                console.log('Clipboard API failed, using fallback', err);
                fallbackCopy(text, button);
            });
        } else {
            fallbackCopy(text, button);
        }
    };

    /**
     * Fallback copy method using execCommand
     *
     * @param {string} text Text to copy
     * @param {Element} button The button element
     */
    var fallbackCopy = function (text, button) {
        var textArea = document.createElement('textarea');
        textArea.value = text;

        // Make textarea out of viewport
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        textArea.style.opacity = '0';

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        var success = false;
        try {
            success = document.execCommand('copy');
        } catch (err) {
            console.error('execCommand failed:', err);
        }

        document.body.removeChild(textArea);

        if (success) {
            showCopySuccess(button);
        } else {
            Notification.addNotification({
                message: 'Failed to copy token to clipboard',
                type: 'error'
            });
        }
    };

    /**
     * Show success feedback on button
     *
     * @param {Element} button The button element
     */
    var showCopySuccess = function (button) {
        var originalHtml = button.innerHTML;
        var originalClass = button.className;

        button.innerHTML = '<i class="fa fa-check mr-1"></i>Copied!';
        button.className = button.className.replace('btn-success', '').replace('btn-outline-secondary', '') + ' btn-success';

        Str.get_string('copied', 'local_serviceschema').then(function (copiedStr) {
            button.innerHTML = '<i class="fa fa-check mr-1"></i>' + copiedStr;
        }).catch(function () {
        });

        setTimeout(function () {
            button.innerHTML = originalHtml;
            button.className = originalClass;
        }, 2000);
    };

    return {
        init: init
    };
});
