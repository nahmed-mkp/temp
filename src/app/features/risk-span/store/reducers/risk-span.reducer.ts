import * as fromModels from '../../models';
import * as fromActions from '../actions';

export interface RiskSpanState {

    activeReportId: number;
    multiPlotMode: boolean;
    UiViewMode: 'plot' | 'raw' | 'rawDetail' | 'query';
    columnsCollection: string[];
    targetColumn: string;
    searchText: string;

    reports: fromModels.ReportRecord[];
    reportsLoading: boolean;
    reportsLoaded: boolean;
    reportsError?: string;

    xAxisCollection: string[];
    xAxisCollectionLoading: boolean;
    xAxisCollectionLoaded: boolean;
    xAxisCollectionError?: string;

    yAxisCollection: string[];
    yAxisCollectionLoading: boolean;
    yAxisCollectionLoaded: boolean;
    yAxisCollectionError?: string;

    plotReponse: fromModels.ReportPlotResponse;
    plotLoading: boolean;
    plotLoaded: boolean;
    plotError?: string;

    // -------------------------------------------------------------------------

    schema?: fromModels.IRequestSchema;
    schemaLoading: boolean;
    schemaLoaded: boolean;
    schemaError?: string;

    requestIds: string[];
    requestEntities: {[id: string]: fromModels.IDetailRequest | fromModels.IRequest};
    currentRequest?: string;
    requestSaving: boolean;
    requestSaved: boolean;
    requestError?: string;

    requestSubmitting: boolean;
    requestSubmitted: boolean;
    requestSubmitError?: string;

    queryResult: fromModels.IQueryResult;
    results: any;
    detailResults: any;
}

export const initialState: RiskSpanState = {

    activeReportId: 1,
    multiPlotMode: false,
    UiViewMode: undefined,
    columnsCollection: [],
    targetColumn: undefined,
    searchText: undefined,

    reports: [],
    reportsLoading: false,
    reportsLoaded: false,

    xAxisCollection: [],
    xAxisCollectionLoading: false,
    xAxisCollectionLoaded: false,

    yAxisCollection: [],
    yAxisCollectionLoading: false,
    yAxisCollectionLoaded: false,

    plotReponse: undefined,
    plotLoading: false,
    plotLoaded: false,

    schemaLoading: false,
    schemaLoaded: false,

    requestIds: [],
    requestEntities: {},
    requestSaving: false,
    requestSaved: false,

    requestSubmitting: false,
    requestSubmitted: false,

    queryResult: null,
    results: undefined,
    detailResults: undefined

};


export function reducer(state = initialState, action: fromActions.RiskSpanActions | fromActions.RiskSpanRequestActions): RiskSpanState {

    switch (action.type) {

        case fromActions.RiskSpanActionTypes.SET_ACTIVE_REPORT_ID: {
            return {
                ...state,
                activeReportId: action.payload
            };
        }

        case fromActions.RiskSpanActionTypes.RESET_WORKFLOW: {
            return {
                ...state,
                plotReponse: undefined,
                plotLoading: false,
                plotLoaded: false,
            };
        }

        case fromActions.RiskSpanActionTypes.SET_UI_VIEW_MODE: {
            return {
                ...state,
                UiViewMode: action.payload,
            };
        }

        case fromActions.RiskSpanActionTypes.SET_COLUMNS_COLLECTION: {
            return {
                ...state,
                columnsCollection: action.payload
            };
        }

        case fromActions.RiskSpanActionTypes.SET_TARGET_COLUMN: {
            return {
                ...state,
                targetColumn: action.payload
            };
        }

        case fromActions.RiskSpanActionTypes.SET_SEARCH_TEXT: {
            return {
                ...state,
                searchText: action.payload
            };
        }








        case fromActions.RiskSpanActionTypes.LOAD_REPORTS: {
            return {
                ...state,
                reportsLoading: true,
                reportsLoaded: false,
                reportsError: null
            };
        }

        case fromActions.RiskSpanActionTypes.LOAD_REPORTS_COMPLETE: {
            return {
                ...state,
                reportsLoading: false,
                reportsLoaded: true,
                reports: action.payload,
                reportsError: null
            };
        }

        case fromActions.RiskSpanActionTypes.LOAD_REPORTS_FAILED: {
            return {
                ...state,
                reportsLoading: false,
                reportsLoaded: false,
                reportsError: action.payload
            };
        }

        case fromActions.RiskSpanActionTypes.LOAD_X_AXIS: {
            return {
                ...state,
                xAxisCollectionLoading: true,
                xAxisCollectionLoaded: false,
                xAxisCollectionError: null
            };
        }

        case fromActions.RiskSpanActionTypes.LOAD_X_AXIS_COMPLETE: {
            return {
                ...state,
                xAxisCollectionLoading: false,
                xAxisCollectionLoaded: true,
                xAxisCollection: action.payload,
                xAxisCollectionError: null
            };
        }

        case fromActions.RiskSpanActionTypes.LOAD_X_AXIS_FAILED: {
            return {
                ...state,
                xAxisCollectionLoading: false,
                xAxisCollectionLoaded: false,
                xAxisCollectionError: action.payload
            };
        }

        case fromActions.RiskSpanActionTypes.LOAD_Y_AXIS: {
            return {
                ...state,
                yAxisCollectionLoading: true,
                yAxisCollectionLoaded: false,
                yAxisCollectionError: null
            };
        }

        case fromActions.RiskSpanActionTypes.LOAD_Y_AXIS_COMPLETE: {
            return {
                ...state,
                yAxisCollectionLoading: false,
                yAxisCollectionLoaded: true,
                yAxisCollection: action.payload,
                yAxisCollectionError: null
            };
        }

        case fromActions.RiskSpanActionTypes.LOAD_Y_AXIS_FAILED: {
            return {
                ...state,
                yAxisCollectionLoading: false,
                yAxisCollectionLoaded: false,
                yAxisCollectionError: action.payload
            };
        }

        case fromActions.RiskSpanActionTypes.LOAD_MULTI_PLOT: {
            return {
                ...state,
                plotLoading: true,
                plotLoaded: false,
                plotError: null,
            };
        }

        case fromActions.RiskSpanActionTypes.LOAD_MULTI_PLOT_COMPLETE: {
            return {
                ...state,
                multiPlotMode: action.payload.plots.length > 1 ? true : false,
                plotLoading: false,
                plotLoaded: true,
                plotReponse: action.payload,
                plotError: null,
            };
        }

        case fromActions.RiskSpanActionTypes.LOAD_MULTI_PLOT_FAILED: {
            return {
                ...state,
                plotLoading: false,
                plotLoaded: false,
                plotError: action.payload,
            };
        }

        case fromActions.RiskSpanRequestActionTypes.LOAD_RISK_SPAN_SCHEMA: {
            return {
                ...state,
                schemaLoading: true,
                schemaLoaded: false,
                schemaError: null
            };
        }

        case fromActions.RiskSpanRequestActionTypes.LOAD_RISK_SPAN_SCHEMA_COMPLETE: {
            return {
                ...state,
                schemaLoading: false,
                schemaLoaded: true,
                schema: action.payload
            };
        }

        case fromActions.RiskSpanRequestActionTypes.LOAD_RISK_SPAN_SCHEMA_FAILED: {
            return {
                ...state,
                schemaLoading: false,
                schemaLoaded: false,
                schemaError: action.payload
            };
        }

        case fromActions.RiskSpanRequestActionTypes.ADD_REQUEST:
        case fromActions.RiskSpanRequestActionTypes.UPDATE_REQUEST: {
            const payload = action.payload;
            const existingIds = state.requestIds.filter((id) => id !== payload.id);
            const newEntities = Object.assign({}, state.requestEntities, {[payload.id]: payload});
            return {
                ...state,
                requestIds: [payload.id, ...existingIds],
                currentRequest: payload.id,
                requestEntities: newEntities
            };
        }

        case fromActions.RiskSpanRequestActionTypes.DELETE_REQUEST: {
            const payload = action.payload;
            const existingIds = state.requestIds.filter((id) => id !== payload.id);
            const newEntities = Object.assign({}, state.requestEntities);
            delete newEntities[payload.id];
            return {
                ...state,
                requestIds: [payload.id, ...existingIds],
                currentRequest: payload.id,
                requestEntities: newEntities
            };
        }

        // case fromActions.RiskSpanRequestActionTypes.ADD_DATASET: {
        //     const payload = action.payload;
        //     const otherIds = state.requestIds.filter((id) => id !== state.currentRequest);
        //     const currentRequest = Object.assign({}, state.requestEntities[state.currentRequest]);
        //     const existingDataSets = currentRequest.dataSets.filter((dataSet) => dataSet !== payload);
        //     const updatedRequest = {...currentRequest, dataSets: [payload, ...existingDataSets]};
        //     const newEntities = Object.assign({}, state.requestEntities, {[state.currentRequest]: updatedRequest});
        //     return {
        //         ...state,
        //         requestIds: [state.currentRequest, ...otherIds],
        //         requestEntities: newEntities
        //     };
        // }

        // case fromActions.RiskSpanRequestActionTypes.REMOVE_DATASET: {
        //     const payload = action.payload;
        //     const otherIds = state.requestIds.filter((id) => id !== state.currentRequest);
        //     const currentRequest = Object.assign({}, state.requestEntities[state.currentRequest]);
        //     const existingDataSets = currentRequest.dataSets.filter((dataSet) => dataSet !== payload);
        //     const updatedRequest = { ...currentRequest, dataSets: [...existingDataSets] };
        //     const newEntities = Object.assign({}, state.requestEntities, { [state.currentRequest]: updatedRequest });
        //     delete newEntities[state.currentRequest];
        //     return {
        //         ...state,
        //         requestIds: [state.currentRequest, ...otherIds],
        //         requestEntities: newEntities
        //     };
        // }

        // case fromActions.RiskSpanRequestActionTypes.ADD_FACTOR_DATE:
        // case fromActions.RiskSpanRequestActionTypes.UPDATE_FACTOR_DATE: {
        //     const payload = action.payload;
        //     const otherIds = state.requestIds.filter((id) => id !== state.currentRequest);
        //     const currentRequest = Object.assign({}, state.requestEntities[state.currentRequest]);
        //     const updatedRequest = { ...currentRequest, factorDates: payload };
        //     const newEntities = Object.assign({}, state.requestEntities, { [state.currentRequest]: updatedRequest });
        //     return {
        //         ...state,
        //         requestIds: [state.currentRequest, ...otherIds],
        //         requestEntities: newEntities
        //     };
        // }

        // case fromActions.RiskSpanRequestActionTypes.ADD_BUCKET: {
        //     const payload = action.payload;
        //     const otherIds = state.requestIds.filter((id) => id !== state.currentRequest);
        //     const currentRequest = Object.assign({}, state.requestEntities[state.currentRequest]);
        //     const otherBuckets = currentRequest.buckets.filter((bucket) => bucket.inputName !== payload.inputName);
        //     const updatedRequest = { ...currentRequest, buckets: [payload, ...otherBuckets] };
        //     const newEntities = Object.assign({}, state.requestEntities, { [state.currentRequest]: updatedRequest });
        //     return {
        //         ...state,
        //         requestIds: [state.currentRequest, ...otherIds],
        //         requestEntities: newEntities
        //     };
        // }

        // case fromActions.RiskSpanRequestActionTypes.REMOVE_BUCKET: {
        //     const payload = action.payload;
        //     const otherIds = state.requestIds.filter((id) => id !== state.currentRequest);
        //     const currentRequest = Object.assign({}, state.requestEntities[state.currentRequest]);
        //     const otherBuckets = currentRequest.buckets.filter((bucket) => bucket.inputName !== payload.inputName);
        //     const updatedRequest = { ...currentRequest, buckets: [...otherBuckets] };
        //     const newEntities = Object.assign({}, state.requestEntities, { [state.currentRequest]: updatedRequest });
        //     return {
        //         ...state,
        //         requestIds: [state.currentRequest, ...otherIds],
        //         requestEntities: newEntities
        //     };
        // }

        // case fromActions.RiskSpanRequestActionTypes.ADD_FIELD: {
        //     const payload = action.payload;
        //     const otherIds = state.requestIds.filter((id) => id !== state.currentRequest);
        //     const currentRequest = Object.assign({}, state.requestEntities[state.currentRequest]);
        //     const otherFields = currentRequest.fieldList.filter((field) => field !== payload);
        //     const updatedRequest = { ...currentRequest, fieldList: [payload, ...otherFields] };
        //     const newEntities = Object.assign({}, state.requestEntities, { [state.currentRequest]: updatedRequest });
        //     return {
        //         ...state,
        //         requestIds: [state.currentRequest, ...otherIds],
        //         requestEntities: newEntities
        //     };
        // }

        // case fromActions.RiskSpanRequestActionTypes.REMOVE_FIELD: {
        //     const payload = action.payload;
        //     const otherIds = state.requestIds.filter((id) => id !== state.currentRequest);
        //     const currentRequest = Object.assign({}, state.requestEntities[state.currentRequest]);
        //     const otherFields = currentRequest.fieldList.filter((field) => field !== payload);
        //     const updatedRequest = { ...currentRequest, fieldList: [...otherFields] };
        //     const newEntities = Object.assign({}, state.requestEntities, { [state.currentRequest]: updatedRequest });
        //     return {
        //         ...state,
        //         requestIds: [state.currentRequest, ...otherIds],
        //         requestEntities: newEntities
        //     };
        // }


        // case fromActions.RiskSpanRequestActionTypes.ADD_DETAIL_FIELD: {
        //     const payload = action.payload;
        //     const otherIds = state.requestIds.filter((id) => id !== state.currentRequest);
        //     const currentRequest = Object.assign({}, state.requestEntities[state.currentRequest]);
        //     const otherFields = currentRequest.detailFieldList.filter((detailField) => detailField !== payload);
        //     const updatedRequest = { ...currentRequest, detailFieldList: [payload, ...otherFields] };
        //     const newEntities = Object.assign({}, state.requestEntities, { [state.currentRequest]: updatedRequest });
        //     return {
        //         ...state,
        //         requestIds: [state.currentRequest, ...otherIds],
        //         requestEntities: newEntities
        //     };
        // }

        // case fromActions.RiskSpanRequestActionTypes.REMOVE_DETAIL_FIELD: {
        //     const payload = action.payload;
        //     const otherIds = state.requestIds.filter((id) => id !== state.currentRequest);
        //     const currentRequest = Object.assign({}, state.requestEntities[state.currentRequest]);
        //     const otherFields = currentRequest.detailFieldList.filter((detailField) => detailField !== payload);
        //     const updatedRequest = { ...currentRequest, detailFIeldList: [...otherFields] };
        //     const newEntities = Object.assign({}, state.requestEntities, { [state.currentRequest]: updatedRequest });
        //     return {
        //         ...state,
        //         requestIds: [state.currentRequest, ...otherIds],
        //         requestEntities: newEntities
        //     };
        // }

        case fromActions.RiskSpanRequestActionTypes.BUILD_QUERY: {
            return {
                ...state,
                requestSubmitting: true,
                requestSubmitted: false,
                requestSubmitError: null
            };
        }

        case fromActions.RiskSpanRequestActionTypes.BUILD_QUERY_COMPLETE: {
            return {
                ...state,
                queryResult: action.payload,
                requestSubmitting: false,
                requestSubmitted: true
            };
        }

        case fromActions.RiskSpanRequestActionTypes.BUILD_QUERY_FAILED: {
            return {
                ...state,
                requestSubmitting: false,
                requestSubmitted: false,
                requestSubmitError: action.payload
            };
        }

        case fromActions.RiskSpanRequestActionTypes.SUBMIT_REQUEST: {
            return {
                ...state,
                UiViewMode: 'raw',
                requestSubmitting: true,
                requestSubmitted: false,
                requestSubmitError: null
            };
        }

        case fromActions.RiskSpanRequestActionTypes.SUBMIT_REQUEST_COMPLETE: {
            return {
                ...state,
                results: action.payload,
                requestSubmitting: false,
                requestSubmitted: true
            };
        }

        case fromActions.RiskSpanRequestActionTypes.SUBMIT_REQUEST_FAILED: {
            return {
                ...state,
                requestSubmitting: false,
                requestSubmitted: false,
                requestSubmitError: action.payload
            };
        }

        case fromActions.RiskSpanRequestActionTypes.SUBMIT_DETAIL_REQUEST: {
            return {
                ...state,
                requestSubmitting: true,
                requestSubmitted: false,
                requestSubmitError: null
            };
        }

        case fromActions.RiskSpanRequestActionTypes.SUBMIT_DETAIL_REQUEST_COMPLETE: {
            return {
                ...state,
                detailResults: action.payload,
                requestSubmitting: false,
                requestSubmitted: true,

                UiViewMode: 'rawDetail',
            };
        }

        case fromActions.RiskSpanRequestActionTypes.SUBMIT_DETAIL_REQUEST_FAILED: {
            return {
                ...state,
                requestSubmitting: false,
                requestSubmitted: false,
                requestSubmitError: action.payload,

                UiViewMode: 'rawDetail',
            };
        }



        default: {
            return state;
        }

    }
}

/**
 * Plot
 */
export const getActiveReportId = (state: RiskSpanState) => state.activeReportId;
export const getMultiPlotMode = (state: RiskSpanState) => state.multiPlotMode;
export const getUiViewMode = (state: RiskSpanState) => state.UiViewMode;
export const getColumnsCollection = (state: RiskSpanState) => state.columnsCollection;
export const getTargetColumn = (state: RiskSpanState) => state.targetColumn;
export const getSearchText = (state: RiskSpanState) => state.searchText;

export const getReports = (state: RiskSpanState) => state.reports;
export const getReportsLoading = (state: RiskSpanState) => state.reportsLoading;
export const getReportsLoaded = (state: RiskSpanState) => state.reportsLoaded;
export const getReportsError = (state: RiskSpanState) => state.reportsError;

export const getXAxisCollection = (state: RiskSpanState) => state.xAxisCollection;
export const getXAxisCollectionLoading = (state: RiskSpanState) => state.xAxisCollectionLoading;
export const getXAxisCollectionLoaded = (state: RiskSpanState) => state.xAxisCollectionLoaded;
export const getXAxisCollectionError = (state: RiskSpanState) => state.xAxisCollectionError;

export const getYAxisCollection = (state: RiskSpanState) => state.yAxisCollection;
export const getYAxisCollectionLoading = (state: RiskSpanState) => state.yAxisCollectionLoading;
export const getYAxisCollectionLoaded = (state: RiskSpanState) => state.yAxisCollectionLoaded;
export const getYAxisCollectionError = (state: RiskSpanState) => state.yAxisCollectionError;

export const getPlotResponse = (state: RiskSpanState) => state.plotReponse;
export const getPlotLoading = (state: RiskSpanState) => state.plotLoading;
export const getPlotLoaded = (state: RiskSpanState) => state.plotLoaded;
export const getPlotError = (state: RiskSpanState) => state.plotError;


/**
 * Schema
 */

export const getSchema = (state: RiskSpanState) => state.schema;
export const getSchemaLoading = (state: RiskSpanState) => state.schemaLoading;
export const getSchemaLoaded = (state: RiskSpanState) => state.schemaLoaded;
export const getSchemaError = (state: RiskSpanState) => state.schemaError;

/**
 * Requests
 */
export const getRequestIds = (state: RiskSpanState) => state.requestIds;
export const getRequestEntities = (state: RiskSpanState) => state.requestEntities;
export const getCurrentRequestId = (state: RiskSpanState) => state.currentRequest;
export const getRequestSavingStatus = (state: RiskSpanState) => state.requestSaving;
export const getRequestSavedStatus = (state: RiskSpanState) => state.requestSaved;
export const getRequestError = (state: RiskSpanState) => state.requestError;

export const getQueryResult = (state: RiskSpanState) => state.queryResult;
export const getResults = (state: RiskSpanState) => state.results;
export const getDetailResults = (state: RiskSpanState) => state.detailResults;
export const getRequestSubmittingStatus = (state: RiskSpanState) => state.requestSubmitting;
export const getRequestSubmittedStatus = (state: RiskSpanState) => state.requestSubmitted;
export const getRequestSubmitError = (state: RiskSpanState) => state.requestSubmitError;



