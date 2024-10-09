import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromTagging from '../reducers/tagging.reducers';

const getTaggingState = createSelector(
    fromFeature.getTaggingFeatureState,
    (state: fromFeature.TaggingState) => state.tagging
);

export const getSelectedDateRange = createSelector(
    getTaggingState,
    fromTagging.getSelectedDateRange
);

/**
 * Tags List
 */
export const getTagsList = createSelector(
    getTaggingState,
    fromTagging.getTags
);

export const getTagsListLoaded = createSelector(
    getTaggingState,
    fromTagging.getTagsLoaded
);

export const getTagsListLoading = createSelector(
    getTaggingState,
    fromTagging.getTagsLoading
);

export const getTagsListError = createSelector(
    getTaggingState,
    fromTagging.getTagsError
);

/**
 * Tag Lookups
 */
export const getTaggingLookups = createSelector(
    getTaggingState,
    fromTagging.getTaggingLookups
);

export const getTaggingLookupsLoaded = createSelector(
    getTaggingState,
    fromTagging.getTaggingLookupsLoaded
);

export const getTaggingLookupsLoading = createSelector(
    getTaggingState,
    fromTagging.getTaggingLookupsLoading
);

export const getTaggingLookupsError = createSelector(
    getTaggingState,
    fromTagging.getTaggingLookupsError
);

/**
 * Security Tags
 */

export const getSecurityTags = createSelector(
    getTaggingState,
    fromTagging.getSecurityTags
);

export const getSecurityTagsLoading = createSelector(
    getTaggingState,
    fromTagging.getSecurityTagsLoading
);

export const getSecurityTagsLoaded = createSelector(
    getTaggingState,
    fromTagging.getSecurityTagsLoaded
);

export const getSecurityTagsError = createSelector(
    getTaggingState,
    fromTagging.getSecurityTagsError
);


/**
 * TradeName Tags
 */

export const getTradeNameTags = createSelector(
    getTaggingState,
    fromTagging.getTradeNameTags
);

export const getTradeNameTagsLoading = createSelector(
    getTaggingState,
    fromTagging.getTradeNameTagsLoading
);

export const getTradeNameTagsLoaded = createSelector(
    getTaggingState,
    fromTagging.getTradeNameTagsLoaded
);

export const getTradeNameTagsError = createSelector(
    getTaggingState,
    fromTagging.getTradeNameTagsError
);





export const getTradeNameTagsUpdateResult = createSelector(
    getTaggingState,
    fromTagging.getTradeNameTagsUpdateResult
);

export const getTradeNameTagsUpdatePending = createSelector(
    getTaggingState,
    fromTagging.getTradeNameTagsUpdatePending
);

export const getTradeNameTagsUpdateFinished = createSelector(
    getTaggingState,
    fromTagging.getTradeNameTagsUpdateFinished
);

export const getTradeNameTagsUpdateError = createSelector(
    getTaggingState,
    fromTagging.getTradeNameTagsUpdateError
); 


/**
 * Position Tags
 */
export const getPositionTags = createSelector(
    getTaggingState,
    fromTagging.getPositionTags
);

export const getPositionTagsLoading = createSelector(
    getTaggingState,
    fromTagging.getPositionTagsLoading
);

export const getPositionTagsLoaded = createSelector(
    getTaggingState,
    fromTagging.getPositionTagsLoaded
);

export const getPositionTagsError = createSelector(
    getTaggingState,
    fromTagging.getPositionTagsError
);



export const getPositionTagsUpdateResult = createSelector(
    getTaggingState,
    fromTagging.getPositionTagsUpdateResult
);

export const getPositionTagsUpdatePending = createSelector(
    getTaggingState,
    fromTagging.getPositionTagsUpdatePending
);

export const getPositionTagsUpdateFinished = createSelector(
    getTaggingState,
    fromTagging.getPositionTagsUpdateFinished
);

export const getPositionTagsUpdateError = createSelector(
    getTaggingState,
    fromTagging.getPositionTagsUpdateError
); 
