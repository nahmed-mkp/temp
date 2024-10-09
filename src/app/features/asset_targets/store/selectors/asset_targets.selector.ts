import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAssetTargets from '../reducers/asset_targets.reducer';

const getAssetTargetsState = createSelector(
    fromFeature.getAssetTargetsFeatureState,
    (state: fromFeature.AssetTargetsState) => state.assetTargets
);

export const getUserAccessLevel = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getUserAccessLevel
)

export const getUserAccessLevelLoading = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getUserAccessLevelLoading
)

export const getUserAccessLevelLoaded = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getUserAccessLevelLoaded
)

export const getUserAccessLevelError = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getUserAccessLevelError
)

export const getUserLimitedAccessLevel = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getUserLimitedAccessLevel
)

export const getUserLimitedAccessLevelLoading = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getUserLimitedAccessLevelLoading
)

export const getUserLimitedAccessLevelLoaded = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getUserLimitedAccessLevelLoaded
)

export const getUserLimitedAccessLevelError = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getUserLimitedAccessLevelError
)

export const getInitLoadComplete = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getInitLoadComplete
)

export const getAssetTargetsLoading = createSelector(
    getAssetTargetsState, 
    fromAssetTargets.getAssetTargetsLoading
);

export const getAssetTargetsLoaded = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getAssetTargetsLoaded
);

export const getAssetTargetsError = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getAssetTargetsError
);

export const getEditorAssetTargetsLoading = createSelector(
    getAssetTargetsState, 
    fromAssetTargets.getEditorAssetTargetsLoading
);

export const getEditorAssetTargetsLoaded = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getEditorAssetTargetsLoaded
);

export const getEditorAssetTargetsError = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getEditorAssetTargetsError
);

export const getEditorAssetTargets = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getEditorAssetTargets
);


export const getAssetTargets= createSelector(
    getAssetTargetsState,
    fromAssetTargets.getAssetTargets
);

export const getAssetTargetsParams = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getParams
);

export const getAssetTargetsMode = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getMode
);

export const getAssetType = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getAssetType
);

export const getEditorAssetType = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getEditorAssetType
);

export const getAssetTargetTimeseriesLoading = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getAssetTargetTimeseriesLoading
);

export const getAssetTargetTimeseriesLoaded = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getAssetTargetTimeseriesLoaded
);

export const getAssetTargetTimeseriesError = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getAssetTargetTimeseriesError
);

export const getAssetTargetTimeseriesIds = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getAssetTargetTimeseriesIds
);

export const getAssetTargetTimeseriesEntities = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getAssetTargetTimeseriesEntities
);

export const getAssetTargetTimeseries = createSelector(
    getAssetTargetTimeseriesIds,
    getAssetTargetTimeseriesEntities, 
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);


/* ======================= */

export const getScenarioTargetDashboardData = createSelector(
    getAssetTargetsState, 
    fromAssetTargets.getScenarioTargetDashboardData
)

export const getScenarioTargetDashboardDataLoading = createSelector(
    getAssetTargetsState, 
    fromAssetTargets.getScenarioTargetDashboardDataLoading
)

export const getScenarioTargetDashboardDataLoaded = createSelector(
    getAssetTargetsState, 
    fromAssetTargets.getScenarioTargetDashboardDataLoaded
)

export const getScenarioTargetDashboardDataFailed = createSelector(
    getAssetTargetsState, 
    fromAssetTargets.getScenarioTargetDashboardDataFailed
)

/* ====================== */

export const getScenarioProbabilityDashboardData = createSelector(
    getAssetTargetsState, 
    fromAssetTargets.getScenarioProbabilityDashboardData
)

export const getScenarioProbabilityDashboardDataLoading = createSelector(
    getAssetTargetsState, 
    fromAssetTargets.getScenarioProbabilityDashboardDataLoading
)

export const getScenarioProbabilityDashboardDataLoaded = createSelector(
    getAssetTargetsState, 
    fromAssetTargets.getScenarioProbabilityDashboardDataLoaded
)

export const getScenarioProbabilityDashboardDataFailed = createSelector(
    getAssetTargetsState, 
    fromAssetTargets.getScenarioProbabilityDashboardDataFailed
)

/* ====================== */

export const getInitAssetCalculatorInputs = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getInitCalculatorInputs
)

export const getAssetCalculatorInputs = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getCalculatorInputs
)

export const getAssetCalculatorInputsLoading = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getCalculatorInputsLoading
)

export const getAssetCalculatorInputsLoaded = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getCalculatorInputsLoaded
)

/* ====================== */

export const getOverriddenvalues = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getOverridenValues
)

export const getEditedAssetCalculatorInputs = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getEditedCalculatorInputs
)


export const getSupportedCalculatorCounties = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getSupportedCalculatorCounties
)

export const getSupportedCalculatorCountiesLoading = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getSupportedCalculatorCountiesLoading
)

export const getSupportedCalculatorCountiesLoaded = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getSupportedCalculatorCountiesLoaded
)

export const getSupportedCalculatorCountiesError = createSelector(
    getAssetTargetsState,
    fromAssetTargets.getSupportedCalculatorCountiesError
)