import * as moment from 'moment';
import * as fromModels from './../../models/tagging.models';
import * as fromActions from './../actions/tagging.actions';

export interface State {

    tags: any;
    tagsLoading: boolean;
    tagsLoaded: boolean;
    tagsError?: string;

    lookups: any;
    lookupsLoading: boolean;
    lookupsLoaded: boolean;
    lookupsError?: string;

    range: fromModels.IDateRange;

    securityTags: any[];
    securityTagsLoading: boolean;
    securityTagsLoaded: boolean;
    securityTagsError?: string;

    tradeNameTags: any[];
    tradeNameTagsLoading: boolean;
    tradeNameTagsLoaded: boolean;
    tradeNameTagsError?: string;

    positionTags: any[];
    positionTagsLoading: boolean;
    positionTagsLoaded: boolean;
    positionTagsError?: string;




    tradeNameTagsUpdateResult: any[];
    tradeNameTagsUpdatePending: boolean;
    tradeNameTagsUpdateFinished: boolean;
    tradeNameTagsUpdateError?: string;

    positionTagsUpdateResult: any[];
    positionTagsUpdatePending: boolean;
    positionTagsUpdateFinished: boolean;
    positionTagsUpdateError?: string;
}


const initialState: State = {

    tags: {},
    tagsLoading: false,
    tagsLoaded: false,

    lookups: {},
    lookupsLoading: false,
    lookupsLoaded: false,

    range: {
        'startDate': moment(new Date()).startOf('month').format('MM/DD/YYYY'),
        'endDate': moment(new Date()).format('MM/DD/YYYY')
    },

    securityTags: [],
    securityTagsLoading: false,
    securityTagsLoaded: false,

    tradeNameTags: [],
    tradeNameTagsLoading: false,
    tradeNameTagsLoaded: false,

    positionTags: [],
    positionTagsLoading: false,
    positionTagsLoaded: false,

    tradeNameTagsUpdateResult: [],
    tradeNameTagsUpdatePending: false,
    tradeNameTagsUpdateFinished: false,

    positionTagsUpdateResult: [],
    positionTagsUpdatePending: false,
    positionTagsUpdateFinished: false,
};

export function reducer(state = initialState, action: fromActions.TaggingActions): State {
    switch (action.type) {

        case fromActions.TaggingActionTypes.LOAD_TAG_LIST: {
            return {
                ...state,
                tagsLoading: true,
                tagsLoaded: false,
                tagsError: null
            };
        }

        case fromActions.TaggingActionTypes.LOAD_TAG_LIST_COMPLETE: {
            return {
                ...state,
                tags: action.payload,
                tagsLoading: false,
                tagsLoaded: true
            };
        }

        case fromActions.TaggingActionTypes.LOAD_TAG_LIST_FAILED: {
            return {
                ...state,
                tagsLoading: false,
                tagsLoaded: false,
                tagsError: action.payload
            };
        }

        case fromActions.TaggingActionTypes.LOAD_TAGGING_LOOKUPS: {
            return {
                ...state,
                lookupsLoading: true,
                lookupsLoaded: false,
                lookupsError: null
            };
        }

        case fromActions.TaggingActionTypes.LOAD_TAGGING_LOOKUPS_COMPLETE: {
            return {
                ...state,
                lookups: action.payload,
                lookupsLoading: false,
                lookupsLoaded: true
            };
        }

        case fromActions.TaggingActionTypes.LOAD_TAGGING_LOOKUPS_FAILED: {
            return {
                ...state,
                lookupsLoading: false,
                lookupsLoaded: false,
                lookupsError: action.payload
            };
        }

        case fromActions.TaggingActionTypes.LOAD_SECURITY_TAGS:
        case fromActions.TaggingActionTypes.UPDATE_SECURITY_TAGS: {
            return {
                ...state,
                securityTagsLoading: true,
                securityTagsLoaded: false,
                securityTagsError: null
            };
        }

        case fromActions.TaggingActionTypes.LOAD_SECURITY_TAGS_COMPLETE:
        case fromActions.TaggingActionTypes.UPDATE_SECURITY_TAGS_COMPLETE: {
            return {
                ...state,
                securityTagsLoading: false,
                securityTagsLoaded: true,
                securityTags: [...action.payload]
            };
        }

        case fromActions.TaggingActionTypes.LOAD_SECURITY_TAGS_FAILED:
        case fromActions.TaggingActionTypes.UPDATE_SECURITY_TAGS_FAILED: {
            return {
                ...state,
                securityTagsLoading: false,
                securityTagsLoaded: false,
                securityTagsError: action.payload
            };
        }


        case fromActions.TaggingActionTypes.LOAD_TRADE_NAME_TAGS:
        case fromActions.TaggingActionTypes.UPDATE_TRADE_NAME_TAGS: {
            return {
                ...state,
                tradeNameTagsLoading: true,
                tradeNameTagsLoaded: false,
                tradeNameTagsError: null
            };
        }

        case fromActions.TaggingActionTypes.LOAD_TRADE_NAME_TAGS_COMPLETE:
        case fromActions.TaggingActionTypes.UPDATE_TRADE_NAME_TAGS_COMPLETE: {
            return {
                ...state,
                tradeNameTagsLoading: false,
                tradeNameTagsLoaded: true,
                tradeNameTags: [...action.payload]
            };
        }

        case fromActions.TaggingActionTypes.LOAD_TRADE_NAME_TAGS_FAILED:
        case fromActions.TaggingActionTypes.UPDATE_TRADE_NAME_TAGS_FAILED: {
            return {
                ...state,
                tradeNameTagsLoading: false,
                tradeNameTagsLoaded: false,
                tradeNameTagsError: action.payload
            };
        }


        case fromActions.TaggingActionTypes.LOAD_POSITION_TAGS: {
            return {
                ...state,
                positionTagsLoading: true,
                positionTagsLoaded: false,
                positionTagsError: null
            };
        }

        case fromActions.TaggingActionTypes.LOAD_POSITION_TAGS_COMPLETE: {
            return {
                ...state,
                positionTagsLoading: false,
                positionTagsLoaded: true,
                positionTags: [...action.payload]
            };
        }

        case fromActions.TaggingActionTypes.LOAD_POSITION_TAGS_FAILED: {
            return {
                ...state,
                positionTagsLoading: false,
                positionTagsLoaded: false,
                positionTagsError: action.payload
            };
        }

        // --------------------------------------------------------------------------------

        case fromActions.TaggingActionTypes.UPDATE_TRADE_NAME_TAGS: {
            return {
                ...state,
                tradeNameTagsUpdatePending: true,
                tradeNameTagsUpdateFinished: false,
                tradeNameTagsUpdateError: null
            };
        }

        case fromActions.TaggingActionTypes.UPDATE_TRADE_NAME_TAGS_COMPLETE: {
            return {
                ...state,
                tradeNameTagsUpdateResult: action.payload,
                tradeNameTagsUpdatePending: false,
                tradeNameTagsUpdateFinished: true,
                tradeNameTagsUpdateError: null
            };
        }

        case fromActions.TaggingActionTypes.UPDATE_TRADE_NAME_TAGS_FAILED: {
            return {
                ...state,
                tradeNameTagsUpdatePending: false,
                tradeNameTagsUpdateFinished: false,
                tradeNameTagsUpdateError: action.payload
            };
        }








        case fromActions.TaggingActionTypes.UPDATE_POSITION_TAGS: {
            return {
                ...state,
                positionTagsUpdatePending: true,
                positionTagsUpdateFinished: false,
                positionTagsUpdateError: null
            };
        }

        case fromActions.TaggingActionTypes.UPDATE_POSITION_TAGS_COMPLETE: {
            return {
                ...state,
                positionTagsUpdateResult: action.payload,
                positionTagsUpdatePending: false,
                positionTagsUpdateFinished: true,
                positionTagsUpdateError: null,
            };
        }

        case fromActions.TaggingActionTypes.UPDATE_POSITION_TAGS_FAILED: {
            return {
                ...state,
                positionTagsUpdatePending: false,
                positionTagsUpdateFinished: false,
                positionTagsUpdateError: action.payload
            };
        }


        default: {
            return state;
        }
    }
}

export const getSelectedDateRange = (state: State) => state.range;

export const getTags = (state: State) => state.tags;
export const getTagsLoading = (state: State) => state.tagsLoading;
export const getTagsLoaded = (state: State) => state.tagsLoaded;
export const getTagsError = (state: State) => state.tagsError;

export const getTaggingLookups = (state: State) => state.lookups;
export const getTaggingLookupsLoading = (state: State) => state.lookupsLoading;
export const getTaggingLookupsLoaded = (state: State) => state.lookupsLoaded;
export const getTaggingLookupsError = (state: State) => state.lookupsError;

/**
 * Security Tags
 */
export const getSecurityTags = (state: State) => state.securityTags;
export const getSecurityTagsLoading = (state: State) => state.securityTagsLoading;
export const getSecurityTagsLoaded = (state: State) => state.securityTagsLoaded;
export const getSecurityTagsError = (state: State) => state.securityTagsError;

/**
 * TradeName Tags
 */
export const getTradeNameTags = (state: State) => state.tradeNameTags;
export const getTradeNameTagsLoading = (state: State) => state.tradeNameTagsLoading;
export const getTradeNameTagsLoaded = (state: State) => state.tradeNameTagsLoaded;
export const getTradeNameTagsError = (state: State) => state.tradeNameTagsError;

export const getTradeNameTagsUpdateResult = (state: State) => state.tradeNameTagsUpdateResult;
export const getTradeNameTagsUpdatePending = (state: State) => state.tradeNameTagsUpdatePending;
export const getTradeNameTagsUpdateFinished = (state: State) => state.tradeNameTagsUpdateFinished;
export const getTradeNameTagsUpdateError = (state: State) => state.tradeNameTagsUpdateError;



/**
 * Position Tags
 */
export const getPositionTags = (state: State) => state.positionTags;
export const getPositionTagsLoading = (state: State) => state.positionTagsLoading;
export const getPositionTagsLoaded = (state: State) => state.positionTagsLoaded;
export const getPositionTagsError = (state: State) => state.positionTagsError;

export const getPositionTagsUpdateResult = (state: State) => state.positionTagsUpdateResult;
export const getPositionTagsUpdatePending = (state: State) => state.positionTagsUpdatePending;
export const getPositionTagsUpdateFinished = (state: State) => state.positionTagsUpdateFinished;
export const getPositionTagsUpdateError = (state: State) => state.positionTagsUpdateError;
