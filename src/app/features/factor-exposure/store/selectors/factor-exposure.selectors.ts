import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromFactorExposure from '../reducers/factor-exposure.reducer';

export const getFactorExposure = createSelector(
    fromFeature.getFactorExposureState,
    (state: fromFeature.FactorExposureState) => state.factorExposure
);

/* ====================================== */

export const getUserAccessLevel = createSelector(
    getFactorExposure,
    fromFactorExposure.getUserAccessLevel
)

export const getUserAccessLevelLoading = createSelector(
    getFactorExposure,
    fromFactorExposure.getUserAccessLevelLoading
)

export const getUserAccessLevelLoaded = createSelector(
    getFactorExposure,
    fromFactorExposure.getUserAccessLevelLoaded
)

export const getUserAccessLevelError = createSelector(
    getFactorExposure,
    fromFactorExposure.getUserAccessLevelError
)


/* ====================================== */

export const getActiveDate = createSelector(
    getFactorExposure, 
    fromFactorExposure.getActiveDate
)

export const getActiveDateComplete = createSelector(
    getFactorExposure, 
    fromFactorExposure.getActiveDateSet
)

/* ====================================== */

export const getActiveGrouping = createSelector(
    getFactorExposure,
    fromFactorExposure.getActiveGrouping
)

export const getActiveGroupComplete = createSelector(
    getFactorExposure, 
    fromFactorExposure.getActiveGroupingSet
)

/* ====================================== */

export const getTabs = createSelector( 
    getFactorExposure,
    fromFactorExposure.getTabs
)

/* ====================================== */

export const getDateDropdown = createSelector(
    getFactorExposure,
    fromFactorExposure.getDateDropdown
)

export const getDateDropdownLoading = createSelector(
    getFactorExposure,
    fromFactorExposure.getDateDropdownLoading
);


export const getDateDropdownLoaded = createSelector(
    getFactorExposure,
    fromFactorExposure.getDateDropdownLoaded
);


export const getDateDropdownError = createSelector(
    getFactorExposure,
    fromFactorExposure.getDateDropdownError
);

/* ====================================== */

export const getGroupingDropdown = createSelector(
    getFactorExposure,
    fromFactorExposure.getGroupingDropdown
)

export const getGroupingDropdownLoading = createSelector(
    getFactorExposure,
    fromFactorExposure.getGroupingDropdownLoading
);

export const getGroupingDropdownLoaded = createSelector(
    getFactorExposure,
    fromFactorExposure.getGroupingDropdownLoaded
);

export const getGroupingDropdownError = createSelector(
    getFactorExposure,
    fromFactorExposure.getGroupingDropdownError
);

/* ====================================== */

export const getFactorTabData = createSelector(
    getFactorExposure,
    fromFactorExposure.getFactorsTab
)

export const getFactorTabDataLoaded = createSelector(
    getFactorExposure,
    fromFactorExposure.getFactorsTabLoaded
)

export const getFactorTabDataLoading = createSelector(
    getFactorExposure,
    fromFactorExposure.getFactorsTabLoading
)

export const getFactorTabDataError = createSelector(
    getFactorExposure,
    fromFactorExposure.getFactorsTabError
)

/* ====================================== */

export const getGroupingTabData = createSelector(
    getFactorExposure,
    fromFactorExposure.getGroupingTab
)

export const getGroupingTabDataLoaded = createSelector(
    getFactorExposure,
    fromFactorExposure.getGroupingTabLoaded
)

export const getGroupingTabDataLoading = createSelector(
    getFactorExposure,
    fromFactorExposure.getGroupingTabLoading
)

export const getGroupingTabDataError = createSelector(
    getFactorExposure,
    fromFactorExposure.getGroupingTabError
)

/* ====================================== */

export const getPositionsLiteData = createSelector(
    getFactorExposure,
    fromFactorExposure.getPositionsLiteData
)

export const getPositionsLiteDataLoaded = createSelector(
    getFactorExposure,
    fromFactorExposure.getPositionsLiteDataLoaded
)

export const getPositionsLiteDataLoading = createSelector(
    getFactorExposure,
    fromFactorExposure.getPositionsLiteDataLoading
)

export const getPositionsLiteDataError = createSelector(
    getFactorExposure,
    fromFactorExposure.getPositionsLiteDataError
)

/* ====================================== */

export const getPositionsGroupingData = createSelector(
    getFactorExposure,
    fromFactorExposure.getPositionsGroupingData
)

export const getPositionsGroupingDataLoaded = createSelector(
    getFactorExposure,
    fromFactorExposure.getPositionsGroupingDataLoaded
)

export const getPositionsGroupingDataLoading = createSelector(
    getFactorExposure,
    fromFactorExposure.getPositionsGroupingDataLoading
)

export const getPositionsGroupingDataError = createSelector(
    getFactorExposure,
    fromFactorExposure.getPositionsGroupingDataError
)

/* ====================================== */

export const getPositionsAndGroupingData = createSelector(
    getFactorExposure, 
    fromFactorExposure.getPositionsAndGroupingData
)

export const getPositionsAndGroupingDataLoading = createSelector(
    getFactorExposure, 
    fromFactorExposure.getPositionsAndGroupingDataLoading
)


export const getPositionsAndGroupingDataLoaded = createSelector(
    getFactorExposure, 
    fromFactorExposure.getPositionsAndGroupingDataLoaded
)

/* ====================================== */

export const getUSDFilter = createSelector(
    getFactorExposure, 
    fromFactorExposure.getUSDFilterStatus
)

export const getBpsToFundFilter = createSelector(
    getFactorExposure, 
    fromFactorExposure.getBpsToFundFilterStatus
)

export const getBpsToPodFilter = createSelector(
    getFactorExposure, 
    fromFactorExposure.getBpsToPodFilterStatus
)

export const getNullSecFilter = createSelector(
    getFactorExposure,
    fromFactorExposure.getNullSecFilterStatus
)

/* ====================================== */

export const getUserSettings = createSelector(
    getFactorExposure,
    fromFactorExposure.getUserSettings
)

export const getUserSettingsAndActiveDate = createSelector(
    getUserSettings,
    getActiveDate, 
    (settings, activeDate) => {
        return {settings: settings, activeDate: activeDate}
    }
)

export const getUserSettingsLoading = createSelector(
    getFactorExposure,
    fromFactorExposure.getUserSettingsLoading
)

export const getUserSettingsLoaded = createSelector(
    getFactorExposure,
    fromFactorExposure.getUserSettingsLoaded
)

export const getUserSettingsError = createSelector(
    getFactorExposure,
    fromFactorExposure.getUserSettingsError
)

/* ====================================== */

export const getTimestamp = createSelector(
    getFactorExposure, 
    fromFactorExposure.getTimestamp
)

export const getGroupingNameAndIdMaping = createSelector(
    getFactorExposure, 
    fromFactorExposure.getPrimaryGroupingNameAndIdMaping
)