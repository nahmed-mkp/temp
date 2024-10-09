import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../../../../store';
import * as fromMarketDataSearchGeneral from './market-data-search-general.reducer';
import * as fromMarketDataSearch from './market-data-search.reducer';

export interface MarketDataSearchState {
    search: fromMarketDataSearch.State;
    searchGeneral: fromMarketDataSearchGeneral.State; 
}

export interface State extends fromRoot.RootState {
    marketDataSearch: MarketDataSearchState;
}

export const reducers = {
    search: fromMarketDataSearch.reducer,
    searchGeneral: fromMarketDataSearchGeneral.reducer
};

export const getMarketDataSearchState = createFeatureSelector<MarketDataSearchState>('marketDataSearch');

