import * as fromModels from './../../models';
import * as fromActions from './../actions/snapshot.actions';

export interface SnapshotState {

    periods: fromModels.ISnapshotPeriod[];

    monthEndDates: string[];
    monthEndDatesLoading: boolean;
    monthEndDatesLoaded: boolean;
    monthEndDatesError?: string;

    entitiesMap: {[code: string]: any};
    entitiesMapLoading: boolean;
    entitiesMapLoaded: boolean;
    entitiesMapError?: string;

    groupings: string[];
    groupingsLoading: boolean;
    groupingsLoaded: boolean;
    groupingsError?: string;

    param?: fromModels.ISnapshotParameter;

    summaryStats: any[];
    summaryStatsLoading: boolean;
    summaryStatsLoaded: boolean;
    summaryStatsError?: string;

    correlationMatrix: any[];
    correlationMatrixLoading: boolean;
    correlationMatrixLoaded: boolean;
    correlationMatrixError?: string;

    snapshotData: any;
    snapshotDataLoading: boolean;
    snapshotDataLoaded: boolean;
    snapshotDataError?: string;

}

const initialState: SnapshotState = {

    periods: [
        { 'type': 'ITD', 'display': 'Since Inception' },
        { 'type': 'YTD', 'display': 'Beginning of Year' },
        { 'type': 'QTD', 'display': 'Beginning of Quarter' },
        { 'type': 'MTD', 'display': 'Beginning of Month' }],

    entitiesMap: {},
    entitiesMapLoading: false,
    entitiesMapLoaded: false,

    monthEndDates: [],
    monthEndDatesLoading: false,
    monthEndDatesLoaded: false,

    groupings: [],
    groupingsLoading: false,
    groupingsLoaded: false,

    summaryStats: [],
    summaryStatsLoading: false,
    summaryStatsLoaded: false,

    correlationMatrix: [],
    correlationMatrixLoading: false,
    correlationMatrixLoaded: false,

    snapshotData: {},
    snapshotDataLoading: false,
    snapshotDataLoaded: false
};

export function reducer(state = initialState, action: fromActions.SnapshotActions ): SnapshotState {
    switch (action.type) {

        case fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_MONTH_END_DATES: {
            return {
                ...state,
                monthEndDatesLoading: true,
                monthEndDatesLoaded: false,
                monthEndDatesError: null
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_MONTH_END_DATES_COMPLETE: {
            return {
                ...state,
                monthEndDatesLoading: false,
                monthEndDatesLoaded: true,
                monthEndDates: [...action.payload]
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_MONTH_END_DATES_FAILED: {
            return {
                ...state,
                monthEndDatesLoading: false,
                monthEndDatesLoaded: false,
                monthEndDatesError: action.payload
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_GROUPINGS: {
            return {
                ...state,
                groupingsLoading: true,
                groupingsLoaded: false,
                groupingsError: null
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_GROUPINGS_COMPLETE: {
            return {
                ...state,
                groupingsLoading: false,
                groupingsLoaded: true,
                groupings: [...action.payload]
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_GROUPINGS_FAILED: {
            return {
                ...state,
                groupingsLoading: false,
                groupingsLoaded: false,
                groupingsError: action.payload
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_ENTITIES_NAME_MAP: {
            return {
                ...state,
                entitiesMapLoading: true,
                entitiesMapLoaded: false,
                entitiesMapError: null
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_ENTITIES_NAME_MAP_COMPLETE: {
            return {
                ...state,
                entitiesMapLoading: false,
                entitiesMapLoaded: true,
                entitiesMap: action.payload
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_ENTITIES_NAME_MAP_FAILED: {
            return {
                ...state,
                entitiesMapLoading: false,
                entitiesMapLoaded: false,
                entitiesMapError: action.payload
            };
        }

        case fromActions.SnapshotActionTypes.PARAM_CHANGED: {
            return {
                ...state,
                param: action.payload
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_SUMMARY_STATS: {
            return {
                ...state,
                summaryStatsLoading: true,
                summaryStatsLoaded: false,
                summaryStatsError: null
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_SUMMARY_STATS_COMPLETE: {
            return {
                ...state,
                summaryStatsLoading: false,
                summaryStatsLoaded: true,
                summaryStats: [...action.payload]
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_SUMMARY_STATS_FAILED: {
            return {
                ...state,
                summaryStatsLoading: false,
                summaryStatsLoaded: true,
                summaryStatsError: action.payload
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_CORRELATION_MATRIX: {
            return {
                ...state,
                correlationMatrixLoading: true,
                correlationMatrixLoaded: false,
                correlationMatrixError: null
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_CORRELATION_MATRIX_COMPLETE: {
            return {
                ...state,
                correlationMatrixLoading: false,
                correlationMatrixLoaded: true,
                correlationMatrix: [...action.payload]
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_CORRELATION_MATRIX_FAILED: {
            return {
                ...state,
                correlationMatrixLoading: false,
                correlationMatrixLoaded: true,
                correlationMatrixError: action.payload
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_DATA: {
            return {
                ...state,
                snapshotDataLoading: true,
                snapshotDataLoaded: false,
                snapshotDataError: null
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_DATA_COMPLETE: {
            return {
                ...state,
                snapshotDataLoading: false,
                snapshotDataLoaded: true,
                snapshotData: action.payload
            };
        }

        case fromActions.SnapshotActionTypes.LOAD_SNAPSHOT_DATA_FAILED: {
            return {
                ...state,
                snapshotDataLoading: false,
                snapshotDataLoaded: true,
                snapshotDataError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getPeriods = (state: SnapshotState) => state.periods;

export const getMonthEndDates = (state: SnapshotState) => state.monthEndDates;
export const getMonthEndDatesLoading = (state: SnapshotState) => state.monthEndDatesLoading;
export const getMonthEndDatesLoaded = (state: SnapshotState) => state.monthEndDatesLoaded;
export const getMonthEndDatesError = (state: SnapshotState) => state.monthEndDatesError;

export const getSupportedGroupings = (state: SnapshotState) => state.groupings;
export const getSupportedGroupingsLoading = (state: SnapshotState) => state.groupingsLoading;
export const getSupportedGroupingsLoaded = (state: SnapshotState) => state.groupingsLoaded;
export const getSupportedGroupingsError = (state: SnapshotState) => state.groupingsError;

export const getEntitiesMap = (state: SnapshotState) => state.entitiesMap;
export const getEntitiesMapLoading = (state: SnapshotState) => state.entitiesMapLoading;
export const getEntitiesMapLoaded = (state: SnapshotState) => state.entitiesMapLoaded;
export const getEntitiesMapError = (state: SnapshotState) => state.entitiesMapError;

export const getSnapshotParam = (state: SnapshotState) => state.param;

export const getSummaryStats = (state: SnapshotState) => state.summaryStats;
export const getSummaryStatsLoading = (state: SnapshotState) => state.summaryStatsLoading;
export const getSummaryStatsLoaded = (state: SnapshotState) => state.summaryStatsLoaded;
export const getSummaryStatsError = (state: SnapshotState) => state.summaryStatsError;

export const getCorrelationMatrix = (state: SnapshotState) => state.correlationMatrix;
export const getCorrelationMatrixLoading = (state: SnapshotState) => state.correlationMatrixLoading;
export const getCorrelationMatrixLoaded = (state: SnapshotState) => state.correlationMatrixLoaded;
export const getCorrelationMatrixError = (state: SnapshotState) => state.correlationMatrixError;

export const getSnapshotData = (state: SnapshotState) => state.snapshotData;
export const getSnapshotDataLoading = (state: SnapshotState) => state.snapshotDataLoading;
export const getSnapshotDataLoaded = (state: SnapshotState) => state.snapshotDataLoaded;
export const getSnapshotDataError = (state: SnapshotState) => state.snapshotDataError;


