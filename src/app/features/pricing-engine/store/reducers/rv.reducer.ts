import { createReducer, on } from '@ngrx/store';
import * as fromModels from '../../models';
import * as fromActions from '../actions/rv.actions';
import moment from 'moment';

export interface State {

  asOfDate: string;
  mode: 'live' | 'close';

  rvTradeData: fromModels.IRvDataRes[];
  rvTradeDataLoading: boolean;
  rvTradeDataLoaded: boolean;
  rvTradeDataError?: string;

  securityDetail: any;
  securityDetailLoading: boolean;
  securityDetailLoaded: boolean;
  securityDetailError?: string;

  securitySuggestions: any;
  securitySuggestionsLoading: boolean;
  securitySuggestionsLoaded: boolean;
  securitySuggestionsError?: string;

  rvTradeDataUpdatePending: boolean;
  rvTradeDataUpdateComplete: boolean;
  rvTradeDataUpdateError?: string;

  mdidEnrichedData: any;
  mdidEnrichedDataLoading: boolean;
  mdidEnrichedDataLoaded: boolean;
  mdidEnrichedDataError?: string;

  userInputEnrichedData: any;
  userInputEnrichedDataLoading: boolean;
  userInputEnrichedDataLoaded: boolean;
  userInputEnrichedDataError?: string;

}

const initialState: State = {

  asOfDate: moment().format('MM-DD-YYYY'),
  mode: 'live',

  rvTradeData: [],
  rvTradeDataLoading: false,
  rvTradeDataLoaded: false,

  securityDetail: [],
  securityDetailLoading: false,
  securityDetailLoaded: false,

  securitySuggestions: [],
  securitySuggestionsLoading: false,
  securitySuggestionsLoaded: false,

  rvTradeDataUpdatePending: false,
  rvTradeDataUpdateComplete: false,

  mdidEnrichedData: [],
  mdidEnrichedDataLoading: false,
  mdidEnrichedDataLoaded: false,

  userInputEnrichedData: [],
  userInputEnrichedDataLoading: false,
  userInputEnrichedDataLoaded: false,

}

export const reducer = createReducer(

    initialState, 

    /* ============ CHANGE AS OF DATE =================== */

    on(fromActions.changeAsOfDate, (state, action) => {
      return {
        ...state,
        asOfDate: action.asOfDate,
      }
    }),

    /* ============ CHANGE MODE =================== */

    on(fromActions.changeMode, (state, action) => {
      return {
        ...state,
        mode: action.mode,
      }
    }),

    /* ============ LOAD MULTI ASSET OPTIONS =================== */ 

    on(fromActions.loadRVTrades, (state) => {
        return {
          ...state,
          rvTradeDataLoading: true,
          rvTradeDataLoaded: false,
        }
    }),

    on(fromActions.loadRVTradesComplete, (state, action) => {
        return {
          ...state,
          rvTradeData: action.res,
          rvTradeDataLoading: false,
          rvTradeDataLoaded: true,
        }
    }),

    on(fromActions.loadRVTradesFailed, (state, action) => {
        return {
          ...state,
          rvTradeDataLoading: false,
          rvTradeDataLoaded: false,
          rvTradeDataError: action.err
        }
    }),

    /* ============ DETAILS =================== */ 

    on(fromActions.loadSecurityDetail, (state,action) => {
        return {
          ...state,
          securityDetailLoading: true,
          securityDetailLoaded: false,
          securityDetailError: null
        }
    }),

    
    on(fromActions.loadSecurityDetailComplete, (state,action) => {
        return {
          ...state,
          securityDetail: action.res,
          securityDetailLoading: false,
          securityDetailLoaded: true
        }
    }),

    
    on(fromActions.loadSecurityDetailFailed, (state,action) => {
        return {
          ...state,
          securityDetailLoading: false,
          securityDetailLoaded: false,
          securityDetailError: action.err
        }
    }),

    /* ============ RV SUGGESTIONS =================== */ 

    on(fromActions.resetRvSecSuggestions, (state) => { 
        return {
            ...state,
            securitySuggestions: [],
        }
    }),

    on(fromActions.loadRvSecSuggestions, (state) => {
        return {
            ...state,
            securitySuggestionsLoading: true,
            securitySuggestionsLoaded: false,
            securitySuggestionsError: null
        }
    }),

    on(fromActions.loadRvSecSuggestionsComplete, (state, action) => {
        return {
            ...state,
            securitySuggestions: action.res,
            securitySuggestionsLoading: false,
            securitySuggestionsLoaded: true
        }
    }),

    on(fromActions.loadRvSecSuggestionsFailed, (state, action) => {
        return {
            ...state,
            securitySuggestionsLoading: false,
            securitySuggestionsLoaded: false,
            securitySuggestionsError: action.err
        }
    }),

    /* ============= ENRICHED DATA ================= */

    on(fromActions.loadMdidEnrichedData, (state) => {
        return {
            ...state,
            mdidEnrichedDataLoading: true,
            mdidEnrichedDataLoaded: false,
        }
    }),

    on(fromActions.loadMdidEnrichedDataComplete, (state, action) => {
        return {
            ...state,
            mdidEnrichedData: action.res,
            mdidEnrichedDataLoading: false,
            mdidEnrichedDataLoaded: true,
        }
    }),

    on(fromActions.loadMdidEnrichedDataFailed, (state, action) => {
        return {
            ...state,
            mdidEnrichedDataLoading: false,
            mdidEnrichedDataLoaded: false,
            mdidEnrichedDataError: action.err
        }
    }),

    on(fromActions.loadUserInputEnrichedData, (state) => {
        return {
            ...state,
            userInputEnrichedDataLoading: true,
            userInputEnrichedDataLoaded: false,
        }
    }),

    on(fromActions.loadUserInputEnrichedDataComplete, (state, action) => {
        return {
            ...state,
            userInputEnrichedData: action.res,
            userInputEnrichedDataLoading: false,
            userInputEnrichedDataLoaded: true,
        }
    }),

    on(fromActions.loadUserInputEnrichedDataFailed, (state, action) => {
        return {
            ...state,
            userInputEnrichedDataLoading: false,
            userInputEnrichedDataLoaded: false,
            userInputEnrichedDataError: action.err
        }
    }),
  
    /* ============= UPDATE RV TRADES ================= */

    on(fromActions.updateRvTradesComplete, (state) => {
        return {
            ...state,
            updateRvTradeDataComplete: true,
        }
    }),

    on(fromActions.updateRvTradesFailed, (state, action) => {
        return {
            ...state,
            updateRvTradeDataError: action.err,
        }
    }),
)

export const getAsOfDate = (state: State) => state.asOfDate;
export const getMode = (state: State) => state.mode;

export const getRvTradeData = (state: State) => state.rvTradeData;
export const getRvTradeDataLoading = (state: State) => state.rvTradeDataLoading;
export const getRvTradeDataLoaded = (state: State) => state.rvTradeDataLoaded;
export const getRvTradeDataError = (state: State) => state.rvTradeDataError;

export const getSecurityDetail = (state: State) => state.securityDetail;
export const getSecurityDetailLoading = (state: State) => state.securityDetailLoading;
export const getSecurityDetailLoaded = (state: State) => state.securityDetailLoaded;
export const getSecurityDetailError = (state: State) => state.securityDetailError;

export const getRvTradeDataUpdatePending = (state: State) => state.rvTradeDataUpdatePending;
export const getRvTradeDataUpdateComplete = (state: State) => state.rvTradeDataUpdateComplete;  
export const getRvTradeDataUpdateError = (state: State) => state.rvTradeDataUpdateError;

export const getRvSecuritySuggestions = (state: State) => state.securitySuggestions;
export const getRvSecuritySuggestionsLoading = (state: State) => state.securitySuggestionsLoading;
export const getRvSecuritySuggestionsLoaded = (state: State) => state.securitySuggestionsLoaded;
export const getRvSecuritySuggestionsError = (state: State) => state.securitySuggestionsError;

export const getMdidEnrichedData = (state: State) => state.mdidEnrichedData;
export const getMdidEnrichedDataLoading = (state: State) => state.mdidEnrichedDataLoading;
export const getMdidEnrichedDataLoaded = (state: State) => state.mdidEnrichedDataLoaded;
export const getMdidEnrichedDataError = (state: State) => state.mdidEnrichedDataError;

export const getUserInputEnrichedData = (state: State) => state.userInputEnrichedData;
export const getUserInputEnrichedDataLoading = (state: State) => state.userInputEnrichedDataLoading;
export const getUserInputEnrichedDataLoaded = (state: State) => state.userInputEnrichedDataLoaded;
export const getUserInputEnrichedDataError = (state: State) => state.userInputEnrichedDataError;
