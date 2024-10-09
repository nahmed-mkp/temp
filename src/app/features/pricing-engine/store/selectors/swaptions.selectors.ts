import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSwaptions from '../reducers/swaptions.reducer';




export const getSwaptionsState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.swaptions
);




export const getSwaptionsEntities = createSelector(
    getSwaptionsState,
    fromSwaptions.getSwaptionsEntities
);


export const getSwaptionsLoading = createSelector(
    getSwaptionsState,
    fromSwaptions.getSwaptionsLoading
);

export const getSwaptionsLoaded = createSelector(
    getSwaptionsState,
    fromSwaptions.getSwaptionsLoaded
);

export const getSwaptionsError = createSelector(
    getSwaptionsState,
    fromSwaptions.getSwaptionsError
);


export const getSwaptionsData = createSelector(
    getSwaptionsEntities,
    entity => entity && entity['data'] || []
);

export const getSwaptionsTimeStamp = createSelector(
    getSwaptionsEntities,
    entity => entity && entity['timeStamp'] || []
);







export const getSwaptionOwnership = createSelector(
    getSwaptionsState,
    fromSwaptions.getSwaptionOwnership
);

export const getSwaptionOwnershipLoading = createSelector(
    getSwaptionsState,
    fromSwaptions.getSwaptionOwnershipLoading
);

export const getSwaptionOwnershipLoaded = createSelector(
    getSwaptionsState,
    fromSwaptions.getSwaptionOwnershipLoaded
);

export const getSwaptionOwnershipError = createSelector(
    getSwaptionsState,
    fromSwaptions.getSwaptionOwnershipError
);







export const getSwaptionUpdatePending = createSelector(
    getSwaptionsState,
    fromSwaptions.getSwaptionUpdatePending
);

export const getSwaptionUpdateFinished = createSelector(
    getSwaptionsState,
    fromSwaptions.getSwaptionUpdateFinished
);

export const getSwaptionUpdateError = createSelector(
    getSwaptionsState,
    fromSwaptions.getSwaptionUpdateError
);




export const getSwaptionDetail = createSelector(
    getSwaptionsState,
    fromSwaptions.getSecurityDetail
);

export const getSwaptionDetailLoading = createSelector(
    getSwaptionsState,
    fromSwaptions.getSecurityDetailLoading
);

export const getSwaptionDetailLoaded = createSelector(
    getSwaptionsState,
    fromSwaptions.getSecurityDetailLoaded
);

export const getSwaptionDetailError = createSelector(
    getSwaptionsState,
    fromSwaptions.getSecurityDetailError
);

