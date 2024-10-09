import * as fromRoot from '../../../../store';

import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSecMasterGlobal from './sec-master-global.reducer';
import * as fromSecMaster from './sec-master.reducer';
import * as fromFuturesRoot from './futures-root.reducer';
import * as fromSecMasterBbgDataMap from './sec-master-bbg-data-map.reducer';
import * as fromConfigDownstreamMapping from './sec-master-config-downstream-mapping.reducer';
import * as fromReconciliation from './sec-master-reconciliation.reducer';
import * as fromSecMasterHistory from './sec-master-history.reducer';


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
export interface SecurityMasterState {
    secMasterGlobal: fromSecMasterGlobal.SecMasterGlobalState;
    secMaster: fromSecMaster.SecMasterState;
    futuresRoot: fromFuturesRoot.FuturesRootState;
    secMasterBbgDataMap: fromSecMasterBbgDataMap.SecMasterBbgDataMapState;
    configDownStreamMapping: fromConfigDownstreamMapping.SecMasterConfigDownstreamMappingState;
    reconciliation: fromReconciliation.SecMasterReconciliationState;
    secMasterHistory: fromSecMasterHistory.SecMasterHistoryState;
}

export interface State extends fromRoot.RootState {
    'securityMaster': SecurityMasterState;
}

/**
 * Feature reducers are composed using a map of reducers
 *
 * https://github.com/ngrx/platform/blob/master/docs/store/api.md#meta-reducers
 */
export const reducers = {
    secMasterGlobal: fromSecMasterGlobal.reducer,
    secMaster: fromSecMaster.reducer,
    futuresRoot: fromFuturesRoot.reducer,
    secMasterBbgDataMap: fromSecMasterBbgDataMap.reducer,
    configDownStreamMapping: fromConfigDownstreamMapping.reducer,
    reconciliation: fromReconciliation.reducer,
    secMasterHistory: fromSecMasterHistory.reducer,
};

/**
 * Master Data State
 */
export const getSecurityMasterFeatureState = createFeatureSelector<SecurityMasterState>('securityMaster');
