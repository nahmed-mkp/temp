import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromBluePearlSyntheticTrades from '../reducers/bluepearl-synthetic-trades.reducer';

export const getBluePearlSyntheticTradesState = createSelector(
    fromFeature.getBluePearlState,
    (state: fromFeature.BluePearlState) => state.bluePearlSyntheticTrades
);

export const getBluePearlSyntheticTrades = createSelector(
    getBluePearlSyntheticTradesState,
    fromBluePearlSyntheticTrades.getSyntheticTrades
);

