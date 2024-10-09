import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromOptions from '../reducers/options.reducer';




export const getOptionsState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.options
);

export const getOptionsEntities = createSelector(
    getOptionsState,
    fromOptions.getOptionsEntities
);

export const getOptionsLoading = createSelector(
    getOptionsState,
    fromOptions.getOptionsLoading
);

export const getOptionsLoaded = createSelector(
    getOptionsState,
    fromOptions.getOptionsLoaded
);

export const getOptionsError = createSelector(
    getOptionsState,
    fromOptions.getOptionsError
);

export const getOptionsData = createSelector(
    getOptionsEntities,
    entity => entity && entity['data'] || []
); 

export const getOptionsTimeStamp = createSelector(
    getOptionsEntities,
    entity => entity && entity['timeStamp'] || []
);

export const getOptionUpdatePending = createSelector(
    getOptionsState,
    fromOptions.getOptionsUpdatePending
);

export const getOptionUpdateFinished = createSelector(
    getOptionsState,
    fromOptions.getOptionsUpdateComplete
);

export const getOptionUpdateError = createSelector(
    getOptionsState,
    fromOptions.getOptionsUpdateError
);

export const getOptionPriceMethodUpdatePending = createSelector(
    getOptionsState,
    fromOptions.getOptionsPriceMethodUpdatePending
);

export const getOptionPriceMethodUpdateFinished = createSelector(
    getOptionsState,
    fromOptions.getOptionsPriceMethodUpdateComplete
);

export const getOptionPriceMethodUpdateError = createSelector(
    getOptionsState,
    fromOptions.getOptionsPriceMethodUpdateError
);

export const getOptionDetail = createSelector(
    getOptionsState,
    fromOptions.getSecurityDetail
);

export const getOptionDetailLoading = createSelector(
    getOptionsState,
    fromOptions.getSecurityDetailLoading
);

export const getOptionDetailLoaded = createSelector(
    getOptionsState,
    fromOptions.getSecurityDetailLoaded
);

export const getOptionDetailError = createSelector(
    getOptionsState,
    fromOptions.getSecurityDetailError
);

export const getOptionOwnership = createSelector(
    getOptionsState,
    fromOptions.getOptionOwnership
);

export const getOptionOwnershipLoading = createSelector(
    getOptionsState,
    fromOptions.getOptionOwnershipLoading
);

export const getOptionOwnershipLoaded = createSelector(
    getOptionsState,
    fromOptions.getOptionOwnershipLoaded
);

export const getOptionOwnershipLoadingError = createSelector(
    getOptionsState,
    fromOptions.getOptionOwnershipError
);


