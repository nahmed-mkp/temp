import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromDashboards from '../reducers/dashboard.reducer';

/**
 * MarketData Dashboard
 */
export const getDashboardState = createSelector(
    fromFeature.getMarketDataDashboardFeatureState,
    (state: fromFeature.MarketDataDashboardState) => state.dashboard
);

export const getDashboardMetaDataLoading = createSelector(
    getDashboardState,
    fromDashboards.getMetaDataLoading
);

export const getDashboardMetaDataLoaded = createSelector(
    getDashboardState,
    fromDashboards.getMetaDataLoaded
);

export const getDashboardMetaDataError = createSelector(
    getDashboardState,
    fromDashboards.getMetaDataError
);

export const getDashboardMetaData = createSelector(
    getDashboardState,
    fromDashboards.getMetaData
);

export const getSelectedDashboard = createSelector(
    getDashboardState,
    fromDashboards.getSelectedDashboard
);

export const getDashboardData = createSelector(
    getDashboardState,
    fromDashboards.getDashboardData
);

export const getDashboardDataLoading = createSelector(
    getDashboardState,
    fromDashboards.getDashboardDataLoading
);

export const getDashboardDataLoaded = createSelector(
    getDashboardState,
    fromDashboards.getDashboardDataLoaded
);

export const getDashboardDataError = createSelector(
    getDashboardState,
    fromDashboards.getDashboardDataError
);

export const getSelectedDashboardData = createSelector(
    getDashboardData,
    getSelectedDashboard,
    (dashboardData, selectedDashboard) => {
        return dashboardData[selectedDashboard];
    }
);

export const getSelectedDashboardDataLoading = createSelector(
    getDashboardDataLoading,
    getSelectedDashboard,
    (dashboardDataLoading, selectedDashboard) => {
        return dashboardDataLoading[selectedDashboard];
    }
);

export const getSelectedDashboardDataLoaded = createSelector(
    getDashboardDataLoaded,
    getSelectedDashboard,
    (dashboardDataLoaded, selectedDashboard) => {
        return dashboardDataLoaded[selectedDashboard];
    }
);

export const getSelectedDashboardDataError = createSelector(
    getDashboardDataError,
    getSelectedDashboard,
    (dashboardDataError, selectedDashboard) => {
        return dashboardDataError[selectedDashboard];
    }
);

export const getDashboardChartDataLoading = createSelector(
    getDashboardState,
    fromDashboards.getChartDataLoading
);

export const getDashboardChartDataLoaded = createSelector(
    getDashboardState,
    fromDashboards.getChartDataLoaded
);

export const getDashboardChartDataError = createSelector(
    getDashboardState,
    fromDashboards.getChartDataError
);

export const getDashboardChartData = createSelector(
    getDashboardState,
    fromDashboards.getChartData
);

export const getDashboardChartSpreadDataLoading = createSelector(
    getDashboardState,
    fromDashboards.getChartSpreadDataLoading
);

export const getDashboardChartSpreadDataLoaded = createSelector(
    getDashboardState,
    fromDashboards.getChartSpreadDataLoaded
);

export const getDashboardChartSpreadDataError = createSelector(
    getDashboardState,
    fromDashboards.getChartSpreadDataError
);

export const getDashboardChartSpreadData = createSelector(
    getDashboardState,
    fromDashboards.getChartSpreadData
);

export const getBillsShortCouponsChartData = createSelector(
    getDashboardState,
    fromDashboards.getBillShortCouponsChartData
)