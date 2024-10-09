import { createSelector } from '@ngrx/store';

import * as fromLeverage from '../reducers/leverage.reducer';
import * as fromFeature from '../reducers';

export const getLeverageState = createSelector(
    fromFeature.getGlobalLeverageState,
    (state: fromFeature.LeverageState) => state.leverage
);

export const getActiveDate = createSelector(
    getLeverageState,
    fromLeverage.getActiveDate
);

export const getIsLive = createSelector(
    getLeverageState,
    fromLeverage.getIsLive
);


export const getSelectedGrouping = createSelector(
    getLeverageState,
    fromLeverage.getSelectedGrouping
);







export const getLeverageDates = createSelector(
    getLeverageState,
    fromLeverage.getLeverageDates
);

export const getLeverageDatesLoading = createSelector(
    getLeverageState,
    fromLeverage.getLeverageDatesLoading
);

export const getLeverageDatesLoaded = createSelector(
    getLeverageState,
    fromLeverage.getLeverageDatesLoaded
);

export const getLeverageDatesError = createSelector(
    getLeverageState,
    fromLeverage.getLeverageDatesError
);








export const getSupportedGroupings = createSelector(
    getLeverageState,
    fromLeverage.getSupportedGroupings
);

export const getSupportedGroupingsLoaded = createSelector(
    getLeverageState,
    fromLeverage.getSupportedGroupingsLoaded
);

export const getSupportedGroupingsLoading = createSelector(
    getLeverageState,
    fromLeverage.getSupportedGroupingsLoading
);

export const getSupportedGroupingsError = createSelector(
    getLeverageState,
    fromLeverage.getSupportedGroupingsError
);







export const getLeverage = createSelector(
    getLeverageState,
    fromLeverage.getLeverage
);

export const getLeverageLoading = createSelector(
    getLeverageState,
    fromLeverage.getLeverageLoading
);

export const getLeverageLoaded = createSelector(
    getLeverageState,
    fromLeverage.getLeverageLoaded
);

export const getLeverageError = createSelector(
    getLeverageState,
    fromLeverage.getLeverageError
);
