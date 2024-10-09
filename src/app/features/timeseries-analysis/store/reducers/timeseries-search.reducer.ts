import * as fromModels from './../../models/timeseries.models';
import * as fromActions from '../actions/timeseries-search.actions';

export interface State {
    sources: string[];
    sourcesLoading: boolean;
    sourcesLoaded: boolean;
    sourcesError?: string;

    searchCriteria?: fromModels.ITimeseriesSearch;

    searchResults: fromModels.ITimeseries[];
    searching: boolean;
    searched: boolean;
    searchError?: string;

    activePreview: fromModels.ITimeseriesPreview
    activePreviewLoading: boolean;
    activePreviewLoaded: boolean;
    activePreviewError?: string;
};

const initialState: State = {
    sources: [],
    sourcesLoading: false,
    sourcesLoaded: false,

    searchResults: [],
    searching: false,
    searched: false,

    activePreview: null,
    activePreviewLoading: false,
    activePreviewLoaded: false        
};

export function reducer(state = initialState, action: fromActions.TimeseriesSearchActions): State {
    switch (action.type) {

        case fromActions.TimeseriesSearchActionTypes.LOAD_SOURCES: {
            return {
                ...state, 
                sourcesLoading: true, 
                sourcesLoaded: false, 
                sourcesError: null
            };
        }

        case fromActions.TimeseriesSearchActionTypes.LOAD_SOURCES_COMPLETE: {
            return {
                ...state, 
                sourcesLoading: false,
                sourcesLoaded: true, 
                sources: [...action.payload]
            };
        }

        case fromActions.TimeseriesSearchActionTypes.LOAD_SOURCES_FAILED: {
            return {
                ...state, 
                sourcesLoading: false,
                sourcesLoaded: false,
                sourcesError: action.payload
            };
        }

        case fromActions.TimeseriesSearchActionTypes.SEARCH_TIMESERIES: {
            return {
                ...state, 
                searchCriteria: action.payload, 
                searching: true,
                searched: false,
                searchError: null
            };
        }
        
        case fromActions.TimeseriesSearchActionTypes.SEARCH_TIMESERIES_COMPLETE: {
            return {
                ...state, 
                searchResults: [...action.payload],
                searching: false,
                searched: true
            };
        }

        case fromActions.TimeseriesSearchActionTypes.SEARCH_TIMESERIES_FAILED: {
            return {
                ...state, 
                searchResults: [],
                searching: false,
                searched: false,
                searchError: action.payload
            };
        }

        case fromActions.TimeseriesSearchActionTypes.PREVIEW_TIMESERIES: {
            return {
                ...state, 
                activePreviewLoading: true,
                activePreviewLoaded: false,
                activePreviewError: null
            };
        }

        case fromActions.TimeseriesSearchActionTypes.PREVIEW_TIMESERIES_COMPLETE: {
            return {
                ...state, 
                activePreviewLoading: false,
                activePreviewLoaded: true,
                activePreview: {...action.payload}
            };
        }

        case fromActions.TimeseriesSearchActionTypes.PREVIEW_TIMESERIES_FAILED: {
            return {
                ...state, 
                activePreviewLoading: false,
                activePreviewLoaded: false,
                activePreviewError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}