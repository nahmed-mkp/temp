import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromEquities from '../reducers/equities.reducer';




export const getEquitiesState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.equities
);





export const getEquitiesEntities = createSelector(
    getEquitiesState,
    fromEquities.getEquitiesEntities
);


export const getEquitiesLoading = createSelector(
    getEquitiesState,
    fromEquities.getEquitiesLoading
);

export const getEquitiesLoaded = createSelector(
    getEquitiesState,
    fromEquities.getEquitiesLoaded
);

export const getEquitiesError = createSelector(
    getEquitiesState,
    fromEquities.getEquitiesError
);

export const getEquitiesData = createSelector(
    getEquitiesEntities,
    entity => entity && entity['data'] || []
); 

export const getEquitiesTimeStamp = createSelector(
    getEquitiesEntities,
    entity => entity && entity['timeStamp'] || []
);

