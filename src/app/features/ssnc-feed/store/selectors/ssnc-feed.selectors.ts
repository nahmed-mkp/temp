import { createSelector } from '@ngrx/store';

import * as fromSSNCFeed from '../reducers/ssnc-feed.reducers';
import * as fromFeature from '../reducers';

export const getSSNCFeedStateSlice = createSelector(
    fromFeature.getSSNCFeedState,
    (state: fromFeature.SSNCFeedState) => state.ssncFeed
);

export const getSelectedTab = createSelector(
    getSSNCFeedStateSlice,
    fromSSNCFeed.getSelectedTab
)

export const getFromDate = createSelector(
    getSSNCFeedStateSlice,
    fromSSNCFeed.getFromDate
)

export const getToDate = createSelector(
    getSSNCFeedStateSlice,
    fromSSNCFeed.getToDate
)

export const getSelectedDate = createSelector(
    getSSNCFeedStateSlice,
    fromSSNCFeed.getSelectedDate
);


export const getSelectedColumn = createSelector(
    getSSNCFeedStateSlice,
    fromSSNCFeed.getSelectedColumn
)

/* =============== FILTERS ================= */

export const getFilterText = createSelector(
    getSSNCFeedStateSlice,
    fromSSNCFeed.getFilterText
)


/* =============== SUMMARY DATA ================= */

export const getSSNCSummaryData = createSelector(
    getSSNCFeedStateSlice,
    fromSSNCFeed.getSummaryData
);

export const getSSNCSummaryDataLoading = createSelector(
    getSSNCFeedStateSlice,
    fromSSNCFeed.getSummaryDataLoaded
);

export const getSSNCSummaryDataLoaded = createSelector(
    getSSNCFeedStateSlice,
    fromSSNCFeed.getSummaryDataLoaded
);

/* =============== FAILED TRADE DATA ================= */

// export const getSSNCFailedTradeData = createSelector(
//     getSSNCFeedStateSlice,
//     fromSSNCFeed.getFailedTradeData
// );

// export const getSSNCFailedTradeDataLoading = createSelector(
//     getSSNCFeedStateSlice,
//     fromSSNCFeed.getFailedTradeDataLoading
// );

// export const getSSNCFailedTradeDataLoaded = createSelector(
//     getSSNCFeedStateSlice,
//     fromSSNCFeed.getFailedTradeDataLoaded
// );


/* =============== FEED DATA ================= */

export const getSSNCFeedData = createSelector(
    getSSNCFeedStateSlice,
    fromSSNCFeed.getSSNCFeedData
);

export const getSSNCFeedDataLoading = createSelector(
    getSSNCFeedStateSlice,
    fromSSNCFeed.getSSNCFeedDataLoading
);

export const getSSNCFeedDataLoaded = createSelector(
    getSSNCFeedStateSlice,
    fromSSNCFeed.getSSNCFeedDataLoaded
);

/* =============== ADDITIONAL FEED DATA ================= */

export const getAdditionalSSNCFeedData = createSelector(
    getSSNCFeedStateSlice,
    fromSSNCFeed.getAdditionalSSNCFeedData
);

export const getAdditionalSSNCFeedDataLoading = createSelector(
    getSSNCFeedStateSlice,
    fromSSNCFeed.getAdditionalSSNCFeedDataLoading
);

export const getAdditionalSSNCFeedDataLoaded = createSelector(
    getSSNCFeedStateSlice,
    fromSSNCFeed.getAdditionalSSNCFeedDataLoaded
);


export const getSelectedOrderId = createSelector(
    getSSNCFeedStateSlice,
    fromSSNCFeed.getSelectedOrderId
)