import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromDrift from '../reducers/drift.reducers';

const getDriftState = createSelector(
    fromFeature.getDriftsModuleState,
    (state: fromFeature.DriftState) => state.drifts
);

export const getPositionDriftRequest = createSelector(
    getDriftState,
    fromDrift.getPositionsDriftRequest
);

export const getPositionDriftLoading = createSelector(
    getDriftState,
    fromDrift.getPortfolioDriftLoading
);

export const getPositionDriftLoaded = createSelector(
    getDriftState,
    fromDrift.getPortfolioDriftLoaded
);

export const getPositionDriftError = createSelector(
    getDriftState,
    fromDrift.getPortfolioDriftError
);

export const getFundDriftEntities = createSelector(
    getDriftState,
    fromDrift.getFundDriftEntities
);

export const getTradeNameDriftEntities = createSelector(
    getDriftState,
    fromDrift.getTradeNameDriftEntities
);

export const getPositionDriftEntities = createSelector(
    getDriftState,
    fromDrift.getPortfolioDriftEntities
);

export const getExecutionDriftRequest = createSelector(
    getDriftState,
    fromDrift.getPositionDriftRequest
);

export const getExecutionDriftLoading = createSelector(
    getDriftState,
    fromDrift.getExecutionDriftLoading
);

export const getExecutionDriftLoaded = createSelector(
    getDriftState,
    fromDrift.getExecutionDriftLoaded
);

export const getExecutionDriftError = createSelector(
    getDriftState,
    fromDrift.getExecutionDriftError
);

export const getExecutionDriftEntities = createSelector(
    getDriftState,
    fromDrift.getExecutionDriftEntities
);


