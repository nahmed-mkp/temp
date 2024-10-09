import * as fromRoot from '../../../../store';
import * as fromFunds from './fund.reducer';
import * as fromBenchmarks from './benchmark.reducer';
import * as fromCliffwater from './cliffwater.reducer';
import * as fromSnapshot from './snapshot.reducer';
import * as fromInvestorRelations from './investor-relations.reducer';
import * as fromCapitalFlows from './capital-flows.reducer';

import { createFeatureSelector } from '@ngrx/store';


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
export interface ClientSolutionsState {
  funds: fromFunds.FundState;
  benchmarks: fromBenchmarks.BenchmarkState;
  cliffwater: fromCliffwater.CliffwaterState;
  snapshot: fromSnapshot.SnapshotState;
  investorRelations: fromInvestorRelations.InvestorRelationsState;
  capitalFlows: fromCapitalFlows.CapitalFlowsState;
}

export interface State extends fromRoot.RootState {
  clientSolutions: ClientSolutionsState;
}

/**
 * Feature reducers are composed using a map of reducers
 *
 * https://github.com/ngrx/platform/blob/master/docs/store/api.md#meta-reducers
 */
export const reducers = {
  funds: fromFunds.reducer,
  benchmarks: fromBenchmarks.reducer,
  cliffwater: fromCliffwater.reducer,
  snapshot: fromSnapshot.reducer,
  investorRelations: fromInvestorRelations.reducer,
  capitalFlows: fromCapitalFlows.reducer
};

/**
 * External Reports State
 */
export const getClientSolutionsFeatureState = createFeatureSelector<ClientSolutionsState>('clientSolutions');
