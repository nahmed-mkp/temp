import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromTagging from './tagging.reducers';

export interface TaggingState {
    tagging: fromTagging.State;
}

export interface State extends fromRoot.RootState {
    tagging: TaggingState
}

export const reducers = {
    tagging: fromTagging.reducer
};

export const getTaggingFeatureState = createFeatureSelector<TaggingState>('tagging');
