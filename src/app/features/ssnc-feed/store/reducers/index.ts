import * as fromRoot from '../../../../store';
import * as fromSSNC from './ssnc-feed.reducers';
import { createFeatureSelector } from '@ngrx/store';

export interface SSNCFeedState  {
   ssncFeed: fromSSNC.State
}

export interface State extends fromRoot.RootState {
    ssncFeed: SSNCFeedState;
}

export  const reducers = {
    ssncFeed: fromSSNC.reducer
};

export const getSSNCFeedState = createFeatureSelector<SSNCFeedState>('ssnc-feed');
