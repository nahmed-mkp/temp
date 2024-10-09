import * as fromRoot from '../../../../store';
import * as fromParsers from './tbareports-parser.reducer';
import * as fromTimeseries from './tbareports-timeseries.reducer';

import {ActionReducer, ActionReducerMap} from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';


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
export interface TBAReportsState {
    parser: fromParsers.ParserState;
    timeseries: fromTimeseries.TimeseriesState;
}

export interface State extends fromRoot.RootState  {
  'tbaReports': TBAReportsState;
}

/**
 * Feature reducers are composed using a map of reducers
 *
 * https://github.com/ngrx/platform/blob/master/docs/store/api.md#meta-reducers
 */
export const reducers = {
    parser: fromParsers.reducer,
    timeseries: fromTimeseries.reducer
};

/**
 * Futures State
 */
export const getTbaReportsState = createFeatureSelector<TBAReportsState>('tbaReports');
