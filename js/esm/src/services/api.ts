// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * Every web service call of the plugin's pages, in one place.
 *
 * @module     local_servicemanager/services/api
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
import {fetchOne} from '@moodle/lms/core/ajax';

/**
 * Call one web service of the plugin.
 *
 * @param methodname Name of the web service function.
 * @param args Arguments.
 * @returns What the function returns.
 */
const call = <T>(methodname: string, args: Record<string, unknown>): Promise<T> => fetchOne<T>({methodname, args});

/**
 * The YAML of one past version of a schema, which the history does not carry until a version is opened.
 *
 * @param historyid Id of the version in the history.
 * @returns The YAML.
 */
export const getVersionYaml = async(historyid: number): Promise<string> => {
    const version = await call<{id: number; yaml: string}>('local_servicemanager_get_version', {historyid});
    return version.yaml;
};

/**
 * Enable or disable a schema.
 *
 * @param id Id of the schema.
 * @param enabled Whether it is to be enabled.
 * @returns Whether the schema is enabled now.
 */
export const setSchemaEnabled = async(id: number, enabled: boolean): Promise<boolean> => {
    const result = await call<{id: number; enabled: boolean}>('local_servicemanager_set_enabled', {id, enabled});
    return result.enabled;
};

/**
 * Make the token of a schema, or a new one when it has one.
 *
 * @param id Id of the schema.
 * @returns The token, which is not shown again.
 */
export const regenerateToken = async(id: number): Promise<string> => {
    const result = await call<{id: number; token: string}>('local_servicemanager_regenerate_token', {id});
    return result.token;
};
