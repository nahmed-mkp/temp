import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromTreasury from '../reducers/treasury.reducer';




export const getTreasuryState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.treasury
);




export const getTreasuryEntities = createSelector(
    getTreasuryState,
    fromTreasury.getTreasuryEntities
);


export const getTreasuryLoading = createSelector(
    getTreasuryState,
    fromTreasury.getTreasuryLoading
);

export const getTreasuryLoaded = createSelector(
    getTreasuryState,
    fromTreasury.getTreasuryLoaded
);

export const getTreasuryError = createSelector(
    getTreasuryState,
    fromTreasury.getTreasuryError
);

export const getTreasuryData = createSelector(
    getTreasuryEntities,
    entity => entity && entity['data'] || []
); 

export const getTreasuryTimeStamp = createSelector(
    getTreasuryEntities,
    entity => entity && entity['timeStamp'] || []
);

export const getTreasuryUpdatePending = createSelector(
    getTreasuryState,
    fromTreasury.getTreasuryUpdatePending
);

export const getTreasuryUpdateFinished = createSelector(
    getTreasuryState,
    fromTreasury.getTreasuryUpdateFinished
);

export const getTreasuryUpdateError = createSelector(
    getTreasuryState,
    fromTreasury.getTreasuryUpdateError
);


















export const getAuctionDates = createSelector(
    getTreasuryState,
    fromTreasury.getAuctionDates
);


export const getAuctionDatesLoading = createSelector(
    getTreasuryState,
    fromTreasury.getAuctionDatesLoading
);

export const getAuctionDatesLoaded = createSelector(
    getTreasuryState,
    fromTreasury.getAuctionDatesLoaded
);

export const getAuctionDatesError = createSelector(
    getTreasuryState,
    fromTreasury.getAuctionDatesError
);



/* ============= BVAL SECURITY SUGGESTIONS ================= */

export const getBVALSecuritySuggestions = createSelector(
    getTreasuryState,
    fromTreasury.getBVALSecuritySuggestions
);

export const getBVALSecuritySuggestionsLoading = createSelector(
    getTreasuryState,
    fromTreasury.getBVALSecuritySuggestionsLoading
);

export const getBVALSecuritySuggestionsLoaded = createSelector(
    getTreasuryState,
    fromTreasury.getBVALSecuritySuggestionsLoaded
);

export const getBVALSecuritySuggestionsError = createSelector(
    getTreasuryState,
    fromTreasury.getBVALSecuritySuggestionsError
);