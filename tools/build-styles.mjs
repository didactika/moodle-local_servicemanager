// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * Compile the nested component styles with the Sass dependency of a Moodle checkout.
 *
 * Usage: node tools/build-styles.mjs <Moodle checkout> [--check]
 * Without --check it writes styles.css; with it, it fails when styles.css is not what styles.scss produces.
 *
 * @copyright 2026 Didactika.org
 * @author Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import {createRequire} from 'node:module';
import {readFileSync, writeFileSync} from 'node:fs';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const args = process.argv.slice(2);
const core = args.find(arg => arg !== '--check') || process.env.MOODLE_ROOT;
if (!core) {
    throw new Error('Usage: node tools/build-styles.mjs <Moodle checkout> [--check]');
}
const require = createRequire(resolve(core, 'package.json'));
const plugin = resolve(dirname(fileURLToPath(import.meta.url)), '..');
let compiled;
try {
    compiled = require('sass').compile(resolve(plugin, 'styles.scss'), {style: 'expanded', charset: false}).css;
} catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
        throw error;
    }
    compiled = require('node-sass').renderSync({file: resolve(plugin, 'styles.scss'), outputStyle: 'expanded'}).css.toString();
}
// LibSass treats min() and max() as Sass arithmetic; the source writes Min() and Max() to keep them as plain CSS.
compiled = compiled.replace(/\bMin\(/g, 'min(').replace(/\bMax\(/g, 'max(');
// LibSass keeps the escapes of a string as they were written and Dart Sass turns them into the characters, so the escapes are
// decoded first and written again by the step below, the same on both engines.
compiled = compiled.replace(/"((?:[^"\\]|\\.)*)"/g, (match, inner) => '"' + inner.replace(/\\([0-9a-fA-F]{1,6}) ?/g,
    (escape, hex) => String.fromCodePoint(parseInt(hex, 16))) + '"');
// The engines disagree on how they write characters outside ASCII; the stylesheet keeps them as CSS escapes.
compiled = compiled.replace(/[^\x00-\x7f]/g, (character, offset) => {
    const next = compiled[offset + character.length] || '';
    return '\\' + character.codePointAt(0).toString(16) + (/[0-9a-fA-F\s]/.test(next) ? ' ' : '');
});
const postcss = require('postcss');
const tree = postcss.parse(compiled);
tree.walkDecls(declaration => {
    declaration.value = declaration.value.replace(/(^|[\s,(])(-?)\.(\d+)/g,
        (_match, prefix, sign, digits) => prefix + sign + '0.' + digits);
    if (declaration.prop === 'grid-column') {
        declaration.value = declaration.value.replace(/\s*\/\s*/g, ' / ');
    }
});
tree.walk(node => {
    if (node.type === 'rule' || node.type === 'atrule') {
        node.raws.before = '\n\n';
    }
    // Sass engines emit different indentation; serialize the same four-space CSS on each core.
    let depth = 0;
    for (let parent = node.parent; parent && parent.type !== 'root'; parent = parent.parent) {
        depth++;
    }
    node.raws.before = (node.raws.before || '').replace(/[ \t]*$/, ' '.repeat(depth * 4));
    if (node.type === 'rule') {
        // LibSass keeps the quotes of an attribute value and Dart Sass drops them; the stylesheet has them dropped.
        node.selector = node.selector.replace(/\[([^\]=~|^$*]+)([~|^$*]?=)\s*(["'])([A-Za-z0-9_-]+)\3\s*\]/g, '[$1$2$4]');
        node.selector = postcss.list.comma(node.selector).join(',\n' + ' '.repeat(depth * 4));
    }
    if (node.nodes) {
        node.raws.after = (node.raws.after || '\n').replace(/[ \t]*$/, ' '.repeat(depth * 4));
    }
});
compiled = tree.toString().replace(/^\s+/, '');
const target = resolve(plugin, 'styles.css');
const output = '/* Generated from styles.scss. Edit the SCSS component sources and rebuild. */\n'
        + '/* Moodle 4.0 and later cores disagree on decimal formatting; use the current leading-zero style. */\n'
        + '/* stylelint-disable number-leading-zero */\n\n' + compiled + '\n';
const result = await require('stylelint').lint({
    code: output,
    codeFilename: target, configFile: resolve(core, '.stylelintrc'),
});
if (result.errored) {
    throw new Error('Generated styles do not pass Moodle stylelint: ' + JSON.stringify(result.results.map(item => item.warnings)));
}
const fingerprint = css => {
    const nodeData = node => {
        const data = {};
        for (const field of ['type', 'name', 'params', 'selector', 'prop', 'value', 'important']) {
            if (node[field] !== undefined) {
                data[field] = node[field];
            }
        }
        if (node.nodes) {
            data.nodes = node.nodes.filter(child => child.type !== 'comment').map(nodeData);
        }
        return data;
    };
    return JSON.stringify(nodeData(postcss.parse(css)));
};
/**
 * One line for each declaration, with the selector and the at-rules around it, so two stylesheets can be compared.
 *
 * @param {string} css Stylesheet.
 * @returns {string[]} Lines.
 */
const lines = css => {
    const out = [];
    const walk = (node, context) => {
        node.each(child => {
            if (child.type === 'rule') {
                child.each(declaration => {
                    if (declaration.type === 'decl') {
                        out.push(context + child.selector.replace(/\s+/g, ' ') + ' { ' + declaration.prop + ': ' + declaration.value + ' }');
                    }
                });
            } else if (child.type === 'atrule' && child.nodes) {
                walk(child, context + '@' + child.name + ' ' + child.params + ' ');
            }
        });
    };
    walk(postcss.parse(css), '');
    return out;
};
if (args.includes('--check')) {
    if (fingerprint(readFileSync(target, 'utf8')) !== fingerprint(output)) {
        const shipped = lines(readFileSync(target, 'utf8'));
        const built = lines(output);
        const different = [];
        for (let i = 0; i < Math.max(shipped.length, built.length) && different.length < 8; i++) {
            if (shipped[i] !== built[i]) {
                different.push('  shipped: ' + shipped[i] + '\n  built:   ' + built[i]);
            }
        }
        throw new Error('styles.css is out of date. Run tools/build-styles.mjs without --check.\n' + different.join('\n'));
    }
    const shipped = await require('stylelint').lint({files: target, configFile: resolve(core, '.stylelintrc')});
    if (shipped.errored || shipped.results.some(item => item.warnings.length)) {
        throw new Error('Shipped styles do not pass Moodle stylelint: ' + JSON.stringify(shipped.results.map(item => item.warnings)));
    }
} else {
    writeFileSync(target, output);
}
