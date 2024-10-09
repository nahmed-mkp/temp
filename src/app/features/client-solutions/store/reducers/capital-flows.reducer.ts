import * as fromModels from './../../models';
import * as fromActions from './../actions/capital-flows.actions';

export interface CapitalFlowsState {

    dateRange?: fromModels.DateRange;
    datesLoading: boolean;
    datesLoaded: boolean;
    datesError?: string;

    ids: number[];
    entities: {[id: number]: fromModels.CapitalFlow};

    entitiesLoading: boolean;
    entitiesLoaded: boolean;
    entitiesError?: string;

    stats: fromModels.CapitalFlowStats;
    statsLoading: boolean;
    statsLoaded: boolean;
    statsError?: string;

    projectedAUM: fromModels.ProjectedAUM;
    projectedAUMLoading: boolean;
    projectedAUMLoaded: boolean;
    projectedAUMError?: string;

    formData: fromModels.CapitalFlowForm;
    formDataLoading: boolean;
    formDataLoaded: boolean;
    formDataError?: string;

    emailSending: boolean;
    emailSent: boolean;
    emailError?: string;

    canEdit: boolean;
}

const initialState: CapitalFlowsState = {

    datesLoading: false,
    datesLoaded: false,

    ids: [],
    entities: {},
    entitiesLoading: false,
    entitiesLoaded: false,

    stats: null,
    statsLoading: false,
    statsLoaded: false,

    projectedAUM: null,
    projectedAUMLoading: false,
    projectedAUMLoaded: false,

    formData: null,
    formDataLoading: false,
    formDataLoaded: false,

    emailSending: false,
    emailSent: false,

    canEdit: false
};

export function reducer(state = initialState, action: fromActions.CapitalFlowsActions): CapitalFlowsState {
    switch (action.type) {

        case fromActions.CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_DATES: {
            return {
                ...state,
                datesLoading: true,
                datesLoaded: false,
                datesError: null
            };
        }

        case fromActions.CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_DATES_COMPLETE: {
            return {
                ...state,
                dateRange: action.payload
            };
        }

        case fromActions.CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_DATES_FAILED: {
            return {
                ...state,
                datesError: action.payload
            };
        }

        case fromActions.CapitalFlowsActionTypes.LOAD_CAPITAL_FLOWS: {
            return {
                ...state,
                ids: [],
                entities: {},
                entitiesLoading: true,
                entitiesLoaded: false,
                entitiesError: null
            };
        }

        case fromActions.CapitalFlowsActionTypes.ADD_CAPITAL_ACTIVITY:
        case fromActions.CapitalFlowsActionTypes.UPDATE_CAPITAL_ACTIVITY:
        case fromActions.CapitalFlowsActionTypes.DELETE_CAPITAL_ACTIVITY: {
            return {
                ...state,
                ids: [],
                entities: {},
                entitiesLoading: true,
                entitiesLoaded: false,
                entitiesError: null
            };
        }

        case fromActions.CapitalFlowsActionTypes.LOAD_CAPITAL_FLOWS_COMPLETE:
        case fromActions.CapitalFlowsActionTypes.ADD_CAPITAL_FLOW_COMPLETE:
        case fromActions.CapitalFlowsActionTypes.UPDATE_CAPITAL_FLOW_COMPLETE:
        case fromActions.CapitalFlowsActionTypes.DELETE_CAPITAL_FLOW_COMPLETE: {
            const payload = action.payload;
            const newIds = payload.map((flow) => flow.TransactionId);
            const newEntities = payload.reduce((entities: {[id: number]: fromModels.CapitalFlow}, item: fromModels.CapitalFlow) => {
                return Object.assign({}, entities, {[item.TransactionId]: item});
            }, {});
            return {
                ...state,
                ids: [...newIds],
                entities: {...newEntities},
                entitiesLoading: false,
                entitiesLoaded: true
            };
        }

        case fromActions.CapitalFlowsActionTypes.LOAD_CAPITAL_FLOWS_FAILED:
        case fromActions.CapitalFlowsActionTypes.ADD_CAPITAL_FLOW_FAILED:
        case fromActions.CapitalFlowsActionTypes.UPDATE_CAPITAL_FLOW_FAILED:
        case fromActions.CapitalFlowsActionTypes.DELETE_CAPITAL_FLOW_FAILED: {
            return {
                ...state,
                entitiesLoading: false,
                entitiesLoaded: false,
                entitiesError: action.payload
            };
        }

        case fromActions.CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_STATS: {
            return {
                ...state,
                statsLoading: true,
                statsLoaded: false,
                statsError: null
            };
        }

        case fromActions.CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_STATS_COMPLETE: {
            return {
                ...state,
                stats: {...action.payload},
                statsLoading: false,
                statsLoaded: true
            };
        }

        case fromActions.CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_STATS_FAILED: {
            return {
                ...state,
                statsLoading: false,
                statsLoaded: true,
                statsError: action.payload
            };
        }

        case fromActions.CapitalFlowsActionTypes.LOAD_PROJECTED_AUM: {
            return {
                ...state, 
                projectedAUMLoading: true,
                projectedAUMLoaded: false,
                projectedAUMError: null
            };
        }

        case fromActions.CapitalFlowsActionTypes.LOAD_PROJECTED_AUM_COMPLETE: {
            return {
                ...state,
                projectedAUM: {...action.payload},
                projectedAUMLoading: false,
                projectedAUMLoaded: true
            };
        }

        case fromActions.CapitalFlowsActionTypes.LOAD_PROJECTED_AUM_FAILED: {
            return {
                ...state,
                projectedAUMLoading: false,
                projectedAUMLoaded: false,
                projectedAUMError: action.payload
            };
        }

        case fromActions.CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_FORM: {
            return {
                ...state,
                formDataLoading: true,
                formDataLoaded: false,
                formDataError: null
            };
        }

        case fromActions.CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_FORM_COMPLETE: {
            return {
                ...state,
                formData: { ...action.payload },
                formDataLoading: false,
                formDataLoaded: true
            };
        }

        case fromActions.CapitalFlowsActionTypes.LOAD_CAPITAL_FLOW_FORM_FAILED: {
            return {
                ...state,
                formDataLoading: false,
                formDataLoaded: false,
                formDataError: action.payload
            };
        }

        case fromActions.CapitalFlowsActionTypes.SEND_CAPITAL_FLOW_EMAIL: {
            return {
                ...state,
                emailSending: true,
                emailSent: false,
                emailError: null
            };
        }

        case fromActions.CapitalFlowsActionTypes.SEND_CAPITAL_FLOW_EMAIL_COMPLETE: {
            return {
                ...state,
                emailSending: false,
                emailSent: true
            };
        }

        case fromActions.CapitalFlowsActionTypes.SEND_CAPITAL_FLOW_EMAIL_FAILED: {
            return {
                ...state,
                emailSending: false,
                emailSent: false,
                emailError: action.payload
            };
        }

        case fromActions.CapitalFlowsActionTypes.GET_PERMISSIONS_COMPLETE: {
            return {
                ...state,
                canEdit: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getDateRange = (state: CapitalFlowsState) => state.dateRange;
export const getDateRangeLoading = (state: CapitalFlowsState) => state.datesLoading;
export const getDateRangeLoaded = (state: CapitalFlowsState) => state.datesLoaded;
export const getDateRangeError = (state: CapitalFlowsState) => state.datesError;

export const getCapitalFlowIds = (state: CapitalFlowsState) => state.ids;
export const getCapitalFlowEntities = (state: CapitalFlowsState) => state.entities;
export const getCapitalFlowsLoading = (state: CapitalFlowsState) => state.entitiesLoading;
export const getCapitalFlowsLoaded = (state: CapitalFlowsState) => state.entitiesLoaded;
export const getCapitalFlowsError = (state: CapitalFlowsState) => state.entitiesError;

export const getCapitalFlowStats = (state: CapitalFlowsState) => state.stats;
export const getCapitalFlowStatsLoading = (state: CapitalFlowsState) => state.statsLoading;
export const getCapitalFlowStatsLoaded = (state: CapitalFlowsState) => state.statsLoaded;
export const getCapitalFlowStatsError = (state: CapitalFlowsState) => state.statsError;

export const getCapitalFlowProjectedAUM = (state: CapitalFlowsState) => state.projectedAUM;
export const getCapitalFlowProjectedAUMLoading = (state: CapitalFlowsState) => state.projectedAUMLoading;
export const getCapitalFlowProjectedAUMLoaded = (state: CapitalFlowsState) => state.projectedAUMLoaded;
export const getCapitalFlowProjectedAUMError = (state: CapitalFlowsState) => state.projectedAUMError;

export const getCapitalFlowFormData = (state: CapitalFlowsState) => state.formData;
export const getCapitalFlowFormDataLoading = (state: CapitalFlowsState) => state.formDataLoading;
export const getCapitalFlowFormDataLoaded = (state: CapitalFlowsState) => state.formDataLoaded;
export const getCapitalFlowFormDataError = (state: CapitalFlowsState) => state.formDataError;

export const getEmailSending = (state: CapitalFlowsState) => state.emailSending;
export const getEmailSent = (state: CapitalFlowsState) => state.emailSent;
export const getEmailError = (state: CapitalFlowsState) => state.emailError;

export const getCanEditCapitalFlows = (state: CapitalFlowsState) => state.canEdit;
