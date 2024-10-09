import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromNonAgency from '../reducers/non-agency.reducer';




export const getNonAgencyState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.nonAgency
);




export const getNonAgencyEntities = createSelector(
    getNonAgencyState,
    fromNonAgency.getNonAgencyEntities
);


export const getNonAgencyLoading = createSelector(
    getNonAgencyState,
    fromNonAgency.getNonAgencyLoading
);

export const getNonAgencyLoaded = createSelector(
    getNonAgencyState,
    fromNonAgency.getNonAgencyLoaded
);

export const getNonAgencyError = createSelector(
    getNonAgencyState,
    fromNonAgency.getNonAgencyError
);

