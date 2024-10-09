import * as fromActions from '../actions/dashboard.actions';

export interface State {
    metaData: any[];
    metaDataLoading: boolean;
    metaDataLoaded: boolean;
    metaDataError?: string;

    dashboardData: {[name: string]: any[]};
    dashboardLoading: {[name: string]: boolean};
    dashboardLoaded: {[name: string]: boolean};
    dashboardError?: {[name: string]: string };

    selectedDashboard?: string;

    chartData: any[];
    chartDataLoading: boolean;
    chartDataLoaded: boolean;
    chartDataError?: string;

    chartSpreadData: any[];
    chartSpreadDataLoading: boolean;
    chartSpreadDataLoaded: boolean;
    chartSpreadDataError?: string;

    billsShortCouponsChartData: any,
}

const initialState: State = {
    metaData: [],
    metaDataLoading: false,
    metaDataLoaded: false,

    dashboardData: {},
    dashboardLoading: {},
    dashboardLoaded: {},

    chartData: [],
    chartDataLoading: false,
    chartDataLoaded: false,

    chartSpreadData: [],
    chartSpreadDataLoading: false,
    chartSpreadDataLoaded: false,

    billsShortCouponsChartData: []
};

export function reducer(state = initialState, action: fromActions.MarketDataDashboardActions): State {
    switch (action.type) {

        case fromActions.MarketDataDashboardActionTypes.LOAD_META_DATA: {
            return {
                ...state,
                metaDataLoading: true,
                metaDataLoaded: false,
                metaDataError: null
            };
        }

        case fromActions.MarketDataDashboardActionTypes.LOAD_META_DATA_COMPLETE: {
            return {
                ...state,
                metaDataLoading: false,
                metaDataLoaded: true,
                metaData: [...action.payload]
            };
        }

        case fromActions.MarketDataDashboardActionTypes.LOAD_META_DATA_FAILED: {
            return {
                ...state,
                metaDataLoading: false,
                metaDataLoaded: false,
                metaDataError: action.payload
            };
        }

        case fromActions.MarketDataDashboardActionTypes.LOAD_DASHBOARD_DATA: {
            const dashboardName = action.dashboardName;
            return {
                ...state,
                selectedDashboard: dashboardName,
                dashboardLoading: Object.assign({}, state.dashboardLoading, { [dashboardName]: true }),
                dashboardLoaded: Object.assign({}, state.dashboardLoaded, { [dashboardName]: false }),
                dashboardError: Object.assign({}, state.dashboardError, { [dashboardName]: null })
            };
        }

        case fromActions.MarketDataDashboardActionTypes.LOAD_DASHBOARD_DATA_COMPLETE: {
            const dashboardName = action.dashboardName;
            const payload = action.payload;
            return {
                ...state,
                dashboardData: Object.assign({}, state.dashboardData, { [dashboardName]: payload }),
                dashboardLoading: Object.assign({}, state.dashboardLoading, { [dashboardName]: false }),
                dashboardLoaded: Object.assign({}, state.dashboardLoaded, { [dashboardName]: true })
            };
        }

        case fromActions.MarketDataDashboardActionTypes.LOAD_DASHBOARD_DATA_FAILED: {
            const dashboardName = action.dashboardName;
            const payload = action.payload;
            return {
                ...state,
                dashboardLoading: Object.assign({}, state.dashboardLoading, { [dashboardName]: false }),
                dashboardLoaded: Object.assign({}, state.dashboardLoaded, { [dashboardName]: false }),
                dashboardError: Object.assign({}, state.dashboardError, { [dashboardName]: payload })
            };
        }

        case fromActions.MarketDataDashboardActionTypes.SUBSCRIBE_TO_DASHBOARD_DATA: {
            const dashboardName = action.dashboardName;
            return {
                ...state,
                selectedDashboard: dashboardName,
                dashboardLoading: Object.assign({}, state.dashboardLoading, { [dashboardName]: true }),
                dashboardLoaded: Object.assign({}, state.dashboardLoaded, { [dashboardName]: false }),
                dashboardError: Object.assign({}, state.dashboardError, { [dashboardName]: null })
            };
        }

        case fromActions.MarketDataDashboardActionTypes.DASHBOARD_DATA_ARRIVED: {
            const dashboardName = action.dashboardName;
            const payload = action.payload;
            return {
                ...state,
                dashboardData: Object.assign({}, state.dashboardData, { [dashboardName]: payload }),
                dashboardLoading: Object.assign({}, state.dashboardLoading, { [dashboardName]: false }),
                dashboardLoaded: Object.assign({}, state.dashboardLoaded, { [dashboardName]: true })
            };
        }

        case fromActions.MarketDataDashboardActionTypes.SUBSCRIBE_TO_DASHBOARD_DATA_FAILED: {
            const dashboardName = action.dashboardName;
            const payload = action.payload;
            return {
                ...state,
                dashboardLoading: Object.assign({}, state.dashboardLoading, { [dashboardName]: false }),
                dashboardLoaded: Object.assign({}, state.dashboardLoaded, { [dashboardName]: false }),
                dashboardError: Object.assign({}, state.dashboardError, { [dashboardName]: payload })
            };
        }

        case fromActions.MarketDataDashboardActionTypes.LOAD_CHART_DATA: {
            return {
                ...state,
                chartDataLoading: true,
                chartDataLoaded: false,
                chartDataError: null
            };
        }

        case fromActions.MarketDataDashboardActionTypes.LOAD_CHART_DATA_COMPLETE: {
            return {
                ...state,
                chartDataLoading: false,
                chartDataLoaded: true,
                chartData: action.payload
            };
        }

        case fromActions.MarketDataDashboardActionTypes.LOAD_CHART_DATA_FAILED: {
            return {
                ...state,
                chartDataLoading: false,
                chartDataLoaded: false,
                chartDataError: action.payload
            };
        }

        case fromActions.MarketDataDashboardActionTypes.LOAD_CHART_SPREAD_DATA: {
            return {
                ...state,
                chartSpreadDataLoading: true,
                chartSpreadDataLoaded: false,
                chartSpreadDataError: null
            };
        }

        case fromActions.MarketDataDashboardActionTypes.LOAD_CHART_SPREAD_DATA_COMPLETE: {
            return {
                ...state,
                chartSpreadDataLoading: false,
                chartSpreadDataLoaded: true,
                chartSpreadData: action.payload
            };
        }

        case fromActions.MarketDataDashboardActionTypes.LOAD_CHART_SPREAD_DATA_FAILED: {
            return {
                ...state,
                chartSpreadDataLoading: false,
                chartSpreadDataLoaded: false,
                chartSpreadDataError: action.payload
            };
        }

        case fromActions.MarketDataDashboardActionTypes.ADD_BILLS_SHORT_COUPONS_CHART_DATA: {
            return {
                ...state,
                billsShortCouponsChartData:  Object.assign([], state.billsShortCouponsChartData, { [action.payload.type]: action.payload })
            }
        }

        default: {
            return state;
        }
    }
}

export const getMetaDataLoading = (state: State) => state.metaDataLoading;
export const getMetaDataLoaded = (state: State) => state.metaDataLoaded;
export const getMetaDataError = (state: State) => state.metaDataError;
export const getMetaData = (state: State) => state.metaData;

export const getDashboardDataLoading = (state: State) => state.dashboardLoading;
export const getDashboardDataLoaded = (state: State) => state.dashboardLoaded;
export const getDashboardDataError = (state: State) => state.dashboardError;
export const getDashboardData = (state: State) => state.dashboardData;

export const getSelectedDashboard = (state: State) => state.selectedDashboard;

export const getChartDataLoading = (state: State) => state.chartDataLoading;
export const getChartDataLoaded = (state: State) => state.chartDataLoaded;
export const getChartDataError = (state: State) => state.chartDataError;
export const getChartData = (state: State) => state.chartData;

export const getChartSpreadDataLoading = (state: State) => state.chartSpreadDataLoading;
export const getChartSpreadDataLoaded = (state: State) => state.chartSpreadDataLoaded;
export const getChartSpreadDataError = (state: State) => state.chartSpreadDataError;
export const getChartSpreadData = (state: State) => state.chartSpreadData;

export const getBillShortCouponsChartData = (state: State) => state.billsShortCouponsChartData;