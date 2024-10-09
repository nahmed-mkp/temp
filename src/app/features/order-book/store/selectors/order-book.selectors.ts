import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromOrderBook from '../reducers/order-book.reducers';

const getOrderBookState = createSelector(
    fromFeature.getOrderBookFeatureState,
    (state: fromFeature.OrderBookState) => state.orderBook
);

export const getOrderBookParams = createSelector(
    getOrderBookState,
    fromOrderBook.getOrderBookParams
);

export const getLookups = createSelector(
    getOrderBookState,
    fromOrderBook.getLookups
);

export const getOrderBookOrderIds = createSelector(
    getOrderBookState,
    fromOrderBook.getOrderIds
);

export const getOrderBookSelectedOrderId = createSelector(
    getOrderBookState,
    fromOrderBook.getSelectedOrderId
);

export const getOrderBookOrderEntities = createSelector(
    getOrderBookState,
    fromOrderBook.getOrderEntities
);

export const getOrderBookLoadingStatus = createSelector(
    getOrderBookState,
    fromOrderBook.getOrdersLoading
);

export const getOrderBookLoadedStatus = createSelector(
    getOrderBookState,
    fromOrderBook.getOrdersLoaded
);

export const getOrderBookError = createSelector(
    getOrderBookState,
    fromOrderBook.getOrdersError
);

export const getOrderBookOrders = createSelector(
    getOrderBookOrderIds,
    getOrderBookOrderEntities,
    (orderIds, orderEntities) => {
        return orderIds.map((id) => orderEntities[id]);
    }
);

export const getOrderBookSelectedOrder = createSelector(
    getOrderBookSelectedOrderId,
    getOrderBookOrderEntities,
    (orderId, orderEntities) => {
        return orderEntities[orderId] || null;
    }
);

export const getOrderHistory = createSelector(
    getOrderBookState,
    fromOrderBook.getOrderHistory
);

export const getOrderHistoryLoading = createSelector(
    getOrderBookState,
    fromOrderBook.getOrderHistoryLoading
);

export const getOrderHistoryLoaded = createSelector(
    getOrderBookState,
    fromOrderBook.getOrderHistoryLoaded
);

export const getOrderHistoryError = createSelector(
    getOrderBookState,
    fromOrderBook.getOrderHistoryError
);

export const getOrderEmailSending = createSelector(
    getOrderBookState,
    fromOrderBook.getOrderEmailSending
);

export const getOrderEmailSended = createSelector(
    getOrderBookState,
    fromOrderBook.getOrderEmailSended
);

export const getOrderEmailError = createSelector(
    getOrderBookState,
    fromOrderBook.getOrderEmailError
);







export const getSecurityMarketDataLoading = createSelector(
    getOrderBookState,
    fromOrderBook.getSecurityMarketDataLoading
);

export const getSecurityMarketDataLoaded = createSelector(
    getOrderBookState,
    fromOrderBook.getSecurityMarketDataLoaded
);

export const getSecurityMarketDataError = createSelector(
    getOrderBookState,
    fromOrderBook.getSecurityMarketDataError
);






export const getSecurityCurrentLevel = createSelector(
    getOrderBookState,
    fromOrderBook.getSecurityCurrentLevel
);

export const getSecurityCurrentLevelLoading = createSelector(
    getOrderBookState,
    fromOrderBook.getSecurityCurrentLevelLoading
);

export const getSecurityCurrentLevelLoaded = createSelector(
    getOrderBookState,
    fromOrderBook.getSecurityCurrentLevelLoaded
);

export const getSecurityCurrentLevelError = createSelector(
    getOrderBookState,
    fromOrderBook.getSecurityCurrentLevelError
);


