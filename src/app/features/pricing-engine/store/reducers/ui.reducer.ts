import * as fromActions from '../actions';

export interface UiState {

    latestPortfolioDate: string | null;
    latestPortfolioDateLoading: boolean;
    latestPortfolioDateLoaded: boolean;
    latestPortfolioDateError?: string | null;

    selectedDate: Date;
    liveMode: boolean;
    timestamp: string;
}

export const initialState: UiState = {

    latestPortfolioDate: null,
    latestPortfolioDateLoading: false,
    latestPortfolioDateLoaded: false,

    selectedDate: new Date(),
    liveMode: true,
    timestamp: null,
};

export function reducer(state = initialState, action: fromActions.UiActions) {
    switch (action.type) {

        case fromActions.UiActionTypes.GET_LATEST_PORTFOLIO_DATE: {
            return {
                ...state,
                latestPortfolioDateLoading: true,
                latestPortfolioDateLoaded: false
            }
        }
        
        case fromActions.UiActionTypes.GET_LATEST_PORTFOLIO_DATE_COMPLETE: {
            return {
                ...state,
                latestPortfolioDateLoading: false,
                latestPortfolioDateLoaded: true,
                latestPortfolioDate: action.payload
            }
        }
        
        case fromActions.UiActionTypes.GET_LATEST_PORTFOLIO_DATE_FAILED: {
            return {
                ...state,
                latestPortfolioDateLoading: false,
                latestPortfolioDateLoaded: false,
                latestPortfolioDateError: action.payload
            }
        }

        case fromActions.UiActionTypes.UPDATE_SELECTED_DATE: {
            return {
                ...state,
                selectedDate: action.payload,
            };
        }

        case fromActions.UiActionTypes.UPDATE_LIVE_MODE: {
            return {
                ...state,
                liveMode: action.payload,
            };
        }

        case fromActions.UiActionTypes.UPDATE_TIMESTAMP: {
            return {
                ...state,
                timestamp: action.payload,
            };
        }

        default:
            return state;
    }
}

export const getLatestPortfolioDate = (state: UiState) => state.latestPortfolioDate;
export const getLatestPortfolioDateLoading = (state: UiState) => state.latestPortfolioDateLoading;
export const getLatestPortfolioDateLoaded = (state: UiState) => state.latestPortfolioDateLoaded;
export const getLatestPortfolioDateError = (state: UiState) => state.latestPortfolioDateError;

export const getSelectedDate = (state: UiState) => state.selectedDate;
export const getLiveMode = (state: UiState) => state.liveMode;
export const getTimestamp = (state: UiState) => state.timestamp;