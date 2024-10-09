import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromOrderBook from './order-book.reducers';

export interface OrderBookState {
    orderBook: fromOrderBook.State;
}

export interface State extends fromRoot.RootState {
    orderBook: OrderBookState;
}

export const reducers = {
    orderBook: fromOrderBook.reducer
};

export const getOrderBookFeatureState = createFeatureSelector<OrderBookState>('orderBook');
