import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromDrift from '../reducers/drift-new.reducer';

const getDriftState = createSelector(
    fromFeature.getDriftsModuleState,
    (state: fromFeature.DriftState) => state.driftsNew
);

export const getFundPodTradeDrift = createSelector(
    getDriftState,
    fromDrift.getFundPodTradeDrift
);

export const getFundPodTradeDriftLoadingStatus = createSelector(
    getDriftState,
    fromDrift.getFundPodTradeDriftLoading
);

export const getFundPodTradeDriftLoadedStatus = createSelector(
    getDriftState,
    fromDrift.getFundPodTradeDriftLoaded
);

export const getFundPodTradeDriftErrorStatus = createSelector(
    getDriftState,
    fromDrift.getFundPodTradeDriftError
);