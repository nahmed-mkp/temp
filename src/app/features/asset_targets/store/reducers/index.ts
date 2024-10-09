import { createFeatureSelector } from '@ngrx/store';

import * as fromRoot from './../../../../store';
import * as fromAssetTargets from './asset_targets.reducer';

export interface AssetTargetsState {
    assetTargets: fromAssetTargets.State
}

export interface State extends fromRoot.RootState {
    assetTargets: AssetTargetsState
}

export const reducers = {
    assetTargets: fromAssetTargets.reducer
};

export const getAssetTargetsFeatureState = createFeatureSelector<AssetTargetsState>('assetTargets');
