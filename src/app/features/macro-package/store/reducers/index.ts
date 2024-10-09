import * as fromRoot from '../../../../store';

import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromEquities from './equities-analytics.reducer';
import * as fromCredit from './credit-analytics.reducer';
import * as fromCommodities from './commodities-analytics.reducer';
import * as fromInflation from './inflation-analytics.reducer';

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
export interface MacroAnalyticsState {
    equities: fromEquities.EquitiesAnalyticsState;
    credit: fromCredit.CreditAnalyticsState;
    commodities: fromCommodities.CommoditiesAnalyticsState;
    inflation: fromInflation.InflationAnalyticsState;
}

export interface State extends fromRoot.RootState {
    'macroAnalytics': MacroAnalyticsState;
}

/**
 * Feature reducers are composed using a map of reducers
 *
 * https://github.com/ngrx/platform/blob/master/docs/store/api.md#meta-reducers
 */
export const reducers = {
    equities: fromEquities.reducer,
    credit: fromCredit.reducer,
    commodities: fromCommodities.reducer,
    inflation: fromInflation.reducer
};

/**
 * Macro Analytics State
 */
export const getMacroAnalyticsState = createFeatureSelector<MacroAnalyticsState>('macroAnalytics');
