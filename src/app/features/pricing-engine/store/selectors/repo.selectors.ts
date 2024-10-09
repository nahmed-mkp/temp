import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromRepo from '../reducers/repo.reducer';




export const getRepoState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.repo
);




export const getRepoEntities = createSelector(
    getRepoState,
    fromRepo.getRepoEntities
);


export const getRepoLoading = createSelector(
    getRepoState,
    fromRepo.getRepoLoading
);

export const getRepoLoaded = createSelector(
    getRepoState,
    fromRepo.getRepoLoaded
);

export const getRepoError = createSelector(
    getRepoState,
    fromRepo.getRepoError
);

