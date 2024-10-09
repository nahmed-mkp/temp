import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromSecMaster from '../reducers/sec-master.reducer';

/**
 * SecMaster Management
 */
export const getSecurityMasterState = createSelector(
    fromFeature.getSecurityMasterFeatureState,
    (state: fromFeature.SecurityMasterState) => state.secMaster
);

// Search
export const getSecMasterSearchTerm = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSearchTerm
);

export const getSecMasterSearchingStatus = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSearching
);

export const getSecMasterSearchedStatus = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSearched
);

export const getSecMasterSearchError = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSearchError
);

export const getSecMasterSearchResultIds = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSearchResultIds
);

export const getSecMasterSearchResultEntities = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSearchResultEntities
);

export const getSecMasterSearchResults = createSelector(
    getSecMasterSearchResultIds,
    getSecMasterSearchResultEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);

// Recent Securities
export const getSecMasterRecentSecuritiesLoading = createSelector(
    getSecurityMasterState,
    fromSecMaster.getRecentSecuritiesLoading
);

export const getSecMasterRecentSecuritiesLoaded = createSelector(
    getSecurityMasterState,
    fromSecMaster.getRecentSecuritiesLoaded
);

export const getSecMasterRecentSecuritiesError = createSelector(
    getSecurityMasterState,
    fromSecMaster.getRecentSecuritiesError
);





// Security Tags
export const getSecMasterSecurityTagsLoading = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSecurityTagsLoading
);

export const getSecMasterSecurityTagsLoaded = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSecurityTagsLoaded
);

export const getSecMasterSecurityTagsError = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSecurityTagsError
);

export const getSecMasterSecurityTags = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSecurityTags
);




export const getSecurityTagsUpdatePending = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSecurityTagsUpdatePending
);

export const getSecurityTagsUpdateFinished = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSecurityTagsUpdateFinished
);

export const getSecurityTagsUpdateError = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSecurityTagsUpdateError
);






// Selected security
export const getSecMasterSelectedSID = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSelectedSecurity
);

export const getSecMasterSecurityLoading = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSecurityLoading
);

export const getSecMasterSecurityLoaded = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSecurityLoading
);

export const getSecMasterSecurityError = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSecurityError
);

export const getSecMasterSecurityEntities = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSecurityEntities
);

export const getSecMasterSelectedSecurity = createSelector(
    getSecMasterSelectedSID,
    getSecMasterSecurityEntities,
    (sid, entities) => {
        return entities[sid] || null;
    }
);

// Market Data
export const getSecMasterMarketDataLoading = createSelector(
    getSecurityMasterState,
    fromSecMaster.getMarketDataLoading
);

export const getSecMasterMarketDataLoaded = createSelector(
    getSecurityMasterState,
    fromSecMaster.getMarketDataLoaded
);

export const getSecMasterMarketDataError = createSelector(
    getSecurityMasterState,
    fromSecMaster.getMarketDataError
);

export const getSecMasterMarketDataEntities = createSelector(
    getSecurityMasterState,
    fromSecMaster.getMarketDataEntities
);

export const getSecMasterSelectedSecurityMarketData = createSelector(
    getSecMasterSelectedSID,
    getSecMasterMarketDataEntities,
    (sid, entities) => {
        return entities[sid] || [];
    }
);


// Market Data Points
export const getSecMasterMarketDataPointsLoading = createSelector(
    getSecurityMasterState,
    fromSecMaster.getMarketDataPointsLoading
);

export const getSecMasterMarketDataPointsLoaded = createSelector(
    getSecurityMasterState,
    fromSecMaster.getMarketDataPointsLoaded
);

export const getSecMasterMarketDataPointsError = createSelector(
    getSecurityMasterState,
    fromSecMaster.getMarketDataPointsError
);

export const getSecMasterMarketDataPointIDs = createSelector(
    getSecurityMasterState,
    fromSecMaster.getMarketDataPointIDs
);

export const getSecMasterMarketDataPointEntities = createSelector(
    getSecurityMasterState,
    fromSecMaster.getMarketDataPointEntities
);

export const getSecMasterSelectedMDID = createSelector(
    getSecurityMasterState,
    fromSecMaster.getSelectedMarketData
);

export const getSecMasterSelectedMarketDataPoints = createSelector(
    getSecMasterSelectedMDID,
    getSecMasterMarketDataPointEntities,
    (mdid, entities) => {
        return entities[mdid] || [];
    }
);
