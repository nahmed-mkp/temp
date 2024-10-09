import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromSecurityEditor from '../reducers/security-editor.reducer';

// --------------------------------------------------------

export const getSecurityMasterState = createSelector(
    fromFeature.getSecurityEditorMasterState,
    (state: fromFeature.SecurityEditorMasterState) => state.securityEditor
);

// Search ----------------------------------------------------------

export const getSecurityEditorSearchTerm = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSearchTerm
);

export const getSecurityEditorSearchingStatus = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSearching
);

export const getSecurityEditorSearchedStatus = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSearched
);

export const getSecurityEditorSearchError = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSearchError
);

export const getSecurityEditorSearchResultIds = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSearchResultIds
);

export const getSecurityEditorSearchResultEntities = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSearchResultEntities
);

export const getSecurityEditorSearchResults = createSelector(
    getSecurityEditorSearchResultIds,
    getSecurityEditorSearchResultEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);





// Recent Securities ----------------------------------------------------------

export const getSecurityEditorRecentSecuritiesLoading = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getRecentSecuritiesLoading
);

export const getSecurityEditorRecentSecuritiesLoaded = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getRecentSecuritiesLoaded
);

export const getSecurityEditorRecentSecuritiesError = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getRecentSecuritiesError
);







// Selected security
export const getSecurityEditorSelectedSID = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSelectedSecurity
);

export const getSecurityEditorSecurityLoading = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSecurityLoading
);

export const getSecurityEditorSecurityLoaded = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSecurityLoading
);

export const getSecurityEditorSecurityError = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSecurityError
);

export const getSecurityEditorSecurityEntities = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSecurityEntities
);

export const getSecurityEditorSelectedSecurity = createSelector(
    getSecurityEditorSelectedSID,
    getSecurityEditorSecurityEntities,
    (sid, entities) => {
        return entities[sid] || null;
    }
);






// Market Data --------------------------------------------------------

export const getSecurityEditorMarketDataLoading = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getMarketDataLoading
);

export const getSecurityEditorMarketDataLoaded = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getMarketDataLoaded
);

export const getSecurityEditorMarketDataError = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getMarketDataError
);

export const getSecurityEditorMarketDataEntities = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getMarketDataEntities
);

export const getSecurityEditorSelectedSecurityMarketData = createSelector(
    getSecurityEditorSelectedSID,
    getSecurityEditorMarketDataEntities,
    (sid, entities) => {
        return entities[sid] || [];
    }
);






// Market Data Points -----------------------------------------------

export const getSecurityEditorMarketDataPointsLoading = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getMarketDataPointsLoading
);

export const getSecurityEditorMarketDataPointsLoaded = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getMarketDataPointsLoaded
);

export const getSecurityEditorMarketDataPointsError = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getMarketDataPointsError
);

export const getSecurityEditorMarketDataPointIDs = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getMarketDataPointIDs
);

export const getSecurityEditorMarketDataPointEntities = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getMarketDataPointEntities
);

export const getSecurityEditorSelectedMDID = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSelectedMarketData
);

export const getSecurityEditorSelectedMarketDataPoints = createSelector(
    getSecurityEditorSelectedMDID,
    getSecurityEditorMarketDataPointEntities,
    (mdid, entities) => {
        return entities[mdid] || [];
    }
);







// Security Tags -------------------------------------------------------
export const getSecurityEditorSecurityTagsLoading = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSecurityTagsLoading
);

export const getSecurityEditorSecurityTagsLoaded = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSecurityTagsLoaded
);

export const getSecurityEditorSecurityTagsError = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSecurityTagsError
);

export const getSecurityEditorSecurityTags = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSecurityTags
);




export const getSecurityTagsUpdatePending = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSecurityTagsUpdatePending
);

export const getSecurityTagsUpdateFinished = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSecurityTagsUpdateFinished
);

export const getSecurityTagsUpdateError = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSecurityTagsUpdateError
);






export const getSecurityTagDeletePending = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSecurityTagDeletePending
);

export const getSecurityTagDeleteFinished = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSecurityTagDeleteFinished
);

export const getSecurityTagDeleteError = createSelector(
    getSecurityMasterState,
    fromSecurityEditor.getSecurityTagDeleteError
);
