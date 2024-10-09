import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromBluePearlSettlmentLadder from '../reducers/bluepearl-settlement-ladder.reducer';

export const getBluePearlSettlementLadderState = createSelector(
    fromFeature.getBluePearlState,
    (state: fromFeature.BluePearlState) => state.bluePearlSettlementLadder
);

export const getBluePearlSettlementLadder = createSelector(
    getBluePearlSettlementLadderState,
    fromBluePearlSettlmentLadder.getSettlementLadder
);

export const getBluePearlSettlementLadderLoading = createSelector(
    getBluePearlSettlementLadderState,
    fromBluePearlSettlmentLadder.getSettlementLadderLoading
);

export const getMigrationDate = createSelector(
    getBluePearlSettlementLadderState, 
    fromBluePearlSettlmentLadder.getMigrationDate
);

export const getSettlementDate = createSelector(
    getBluePearlSettlementLadderState, 
    fromBluePearlSettlmentLadder.getSettlementDate
);

export const getSelectedFund = createSelector(
    getBluePearlSettlementLadderState, 
    fromBluePearlSettlmentLadder.getSelectedFund
)

export const getFunds = createSelector(
    getBluePearlSettlementLadderState,
    fromBluePearlSettlmentLadder.getFunds
)

export const getRepoGovs = createSelector(
    getBluePearlSettlementLadderState,
    fromBluePearlSettlmentLadder.getRepoGovArr
)

export const getSelectedRepoGovSID = createSelector(
    getBluePearlSettlementLadderState,
    fromBluePearlSettlmentLadder.getSelectedRepoGovSID
)