import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../../../../store';
import * as fromTreeNavigation from './tree-navigation.reducers';

export interface TreeNavigationState {
    treeNavigation: fromTreeNavigation.State;
}

export interface State extends fromRoot.RootState {
    'treeNavigation': TreeNavigationState;
}

export const reducers = {
    treeNavigation: fromTreeNavigation.reducer
};

export const getState = createFeatureSelector<TreeNavigationState>('treeNavigation');
