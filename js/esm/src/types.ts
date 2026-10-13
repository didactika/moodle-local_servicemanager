// This file is part of Moodle - https://moodle.org/
// Moodle is free software under the GNU General Public License, version 3 or later.

/**
 * Shapes shared by the pages of the plugin, which are the properties that the server gives each component.
 *
 * @module     local_servicemanager/types
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

/** Looks a text up, with the value or the values put in the places that the text marks. */
export type Text = (name: string, value?: string | number | Record<string, string | number>) => string;

/** How healthy a schema is. */
export type SchemaStatus = 'healthy' | 'warning' | 'critical';

/** One schema in the list of the dashboard. */
export interface SchemaRow {
    id: number;
    schemaId: string;
    name: string;
    version: string;
    status: SchemaStatus;
    statusLabel: string;
    enabled: boolean;
    modified: string;
    /** Unix time of the last change, which the dates of the filters are compared with. */
    modifiedAt: number;
    viewUrl: string;
    editUrl: string;
    deleteUrl: string;
    exportUrl: string;
    historyUrl: string;
}

/** The state of the web services of the site. */
export interface WsStatus {
    enabled: boolean;
    level: 'disabled' | 'warning' | 'operational';
    protocols: Array<{name: string; enabled: boolean}>;
    enabledProtocols: number;
    healthy: number;
    warning: number;
    critical: number;
    overviewUrl: string;
    protocolsUrl: string;
    /** Where to turn the web services, or a protocol, on, with what to call it; empty when there is nothing to turn on. */
    fixUrl: string;
    fixLabel: string;
}

/** Properties of the dashboard. */
export interface DashboardProps {
    strings: Record<string, string>;
    canManage: boolean;
    sesskey: string;
    urls: {
        create: string; createYaml: string; import: string; exportAll: string; bulkAction: string; documentation: string;
        dashboard: string; wiki: string; moodleDocs: string;
    };
    wsStatus: WsStatus;
    schemas: SchemaRow[];
    /** The site has more schemas than are sent. */
    truncated: boolean;
    perPageOptions: number[];
}

/** A function that a schema declares. */
export interface SchemaFunction {
    name: string;
    critical: boolean;
    exists: boolean;
    /** What Moodle says the function does. */
    description: string;
    /** Whether it reads or writes, as Moodle says; empty when Moodle does not. */
    type: 'read' | 'write' | '';
    component: string;
    /** The capabilities the function asks of whoever calls it. */
    capabilities: string[];
}

/** A user, a role or a service that a schema provisioned. */
export interface Resource {
    name: string;
    username?: string;
    shortname?: string;
    url: string;
}

/** Properties of the page of one schema or one past version of it. */
export interface SchemaDetailProps {
    strings: Record<string, string>;
    canManage: boolean;
    isHistory: boolean;
    sesskey: string;
    schema: {
        id: number;
        schemaId: string;
        name: string;
        version: string;
        description: string;
        maintainer: string;
        status: string;
        statusLabel: string;
        enabled: boolean;
        created: string;
        modified: string;
        hasToken: boolean;
    };
    newToken: string | null;
    functions: SchemaFunction[];
    resources: {user: Resource | null; role: Resource | null; service: Resource | null};
    requirements: {
        downloadFiles: boolean;
        uploadFiles: boolean;
        plugins: Array<{name: string; installed: boolean}>;
    };
    extraCapabilities: string[];
    /** What the schema says about its role; only the parts it says something about. */
    role: RoleSection;
    healthLogs: Array<{time: string; status: string; message: string}>;
    urls: {
        dashboard: string; back: string; edit: string; delete: string; history: string; regenerate: string;
        export: string; bulkAction: string;
    };
}

/** What a schema says about the role that is created for it. */
export interface RoleSection {
    context_levels?: string[];
    permissions?: {allow?: string[]; prevent?: string[]; prohibit?: string[]};
    allow_assign?: string[];
    allow_override?: string[];
    allow_switch?: string[];
    allow_view?: string[];
}

/** One past version of a schema in the history. */
export interface HistoryRow {
    id: number;
    version: string;
    userName: string;
    userPicture: string;
    date: string;
    /** Unix time the version was made, which the dates of the filters are compared with. */
    at: number;
    reason: string;
    isCurrent: boolean;
    viewUrl: string;
    rollbackUrl: string;
}

/** Properties of the history of a schema. */
export interface HistoryProps {
    strings: Record<string, string>;
    schemaId: number;
    schemaName: string;
    currentVersion: string;
    urls: {back: string; edit: string; compare: string; history: string};
    rows: HistoryRow[];
    perPageOptions: number[];
}

/** One version in a comparison. */
export interface ComparedVersion {
    version: string;
    date: string;
    user: string;
    viewUrl: string;
}

/** A change between two versions, said in terms of the schema. */
export interface Change {
    area: 'field' | 'function' | 'capability' | 'user' | 'plugin' | 'files' | 'role';
    kind: 'added' | 'removed' | 'changed';
    name: string;
    from?: string;
    to?: string;
}

/** One side of a row of the comparison: the number of the line and its text. */
export interface DiffSide {
    no: number;
    text: string;
}

/** One row of the comparison. */
export interface DiffRow {
    kind: 'same' | 'removed' | 'added' | 'changed';
    left: DiffSide | null;
    right: DiffSide | null;
}

/** Properties of the comparison of two versions. */
export interface CompareProps {
    strings: Record<string, string>;
    title: string;
    backUrl: string;
    first: ComparedVersion;
    second: ComparedVersion;
    counts: {added: number; removed: number; changed: number};
    changes: Change[];
    rows: DiffRow[];
}

/** What became of one schema of an import. */
export interface ImportItem {
    id: string;
    name: string;
    status: 'imported' | 'updated' | 'skipped' | 'failed';
    messages: string[];
    viewUrl: string;
}

/** Properties of the result of an import. */
export interface ImportResultProps {
    strings: Record<string, string>;
    totals: {imported: number; skipped: number; failed: number; warnings: number};
    items: ImportItem[];
    urls: {dashboard: string; again: string};
}

/** Properties of the documentation of the format. */
export interface DocumentationProps {
    strings: Record<string, string>;
    backUrl: string;
    downloadUrl: string;
    structureCode: string;
    functionCode: string;
}

/** Properties of the introduction above the import form. */
export interface ImportIntroProps {
    strings: Record<string, string>;
    backUrl: string;
    documentationUrl: string;
}
