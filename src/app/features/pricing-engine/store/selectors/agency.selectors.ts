import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAgency from '../reducers/agency.reducer';




export const getAgencyState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.agency
);




export const getAgencyEntities = createSelector(
    getAgencyState,
    fromAgency.getAgencyEntities
);


export const getAgencyLoading = createSelector(
    getAgencyState,
    fromAgency.getAgencyLoading
);

export const getAgencyLoaded = createSelector(
    getAgencyState,
    fromAgency.getAgencyLoaded
);

export const getAgencyError = createSelector(
    getAgencyState,
    fromAgency.getAgencyError
);

