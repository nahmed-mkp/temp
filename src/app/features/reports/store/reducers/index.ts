import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromProjects from './projects.reducer';
import * as fromWorkbooks from './workbooks.reducer';
import * as fromReports from './reports.reducer';


/**
 * The compose function is one of our most handy tools. In basic terms, you give
 * it any number of functions and it returns a function. This new function
 * takes a value and chains it through every composed function, returning
 * the output.
 *
 * More: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
 */

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 */
export interface ExternalReportsState {
    projects: fromProjects.ProjectsState;
    workbooks: fromWorkbooks.WorkbooksState;
    reports: fromReports.ReportsState;
}

export interface State extends fromRoot.RootState {
    'externalReports': ExternalReportsState;
}

export const reducers = {
    projects: fromProjects.reducer,
    workbooks: fromWorkbooks.reducer,
    reports: fromReports.reducer
};

/**
 * External Reports State
 */
export const getExternalReportsState = createFeatureSelector<ExternalReportsState>('externalReports');
