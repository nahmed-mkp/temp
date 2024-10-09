import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromTreeNavigation from '../reducers/tree-navigation.reducers';


export const getTreeNavigationState = createSelector(
    fromFeature.getState,
    (state: fromFeature.TreeNavigationState) => state.treeNavigation
);

// ===============================================

export const getActivePathIds = createSelector(
    getTreeNavigationState,
    fromTreeNavigation.getActivePathIds
)

export const getConstructedHierarchy = createSelector(
    getTreeNavigationState, 
    fromTreeNavigation.getConstructedHierarchy
)
