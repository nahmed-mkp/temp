import { createReducer, on } from '@ngrx/store';
import * as fromModels from '../../models';
import * as fromActions from '../actions/bval.actions';
import moment from 'moment';

export interface State {

  asOfDate: string;

  bvalBondPricesData: fromModels.IBVALBondPriceRes[];
  bvalBondPricesDataLoading: boolean;
  bvalBondPricesDataLoaded: boolean;
  bvalBondPricesDataError?: string;

  bvalBondPriceHistoryData: any[];
  bvalBondPriceHistoryDataLoading: boolean;
  bvalBondPriceHistoryDataLoaded: boolean;
  bvalBondPriceHistoryDataError?: string;

  securitySuggestions: fromModels.IBVALSuggestion[];
  securitySuggestionsLoading: boolean;
  securitySuggestionsLoaded: boolean;
  securitySuggestionsError?: string;
}

const initialState: State = {

  asOfDate: moment().format('MM-DD-YYYY'),

  bvalBondPricesData: [],
  bvalBondPricesDataLoading: false,
  bvalBondPricesDataLoaded: false,

  bvalBondPriceHistoryData: [],
  bvalBondPriceHistoryDataLoading: false,
  bvalBondPriceHistoryDataLoaded: false,  

  securitySuggestions: [],
  securitySuggestionsLoading: false,
  securitySuggestionsLoaded: false,
}

export const reducer = createReducer(

    initialState, 

    /* ============ CHANGE AS OF DATE =================== */

    on(fromActions.changeBVALAsOfDate, (state, action) => {
      return {
        ...state,
        asOfDate: action.asOfDate,
      }
    }),

    /* ============ LOAD BVAL Bond Prices =================== */ 

    on(fromActions.loadBVALBondPrices, (state) => {
        return {
          ...state,
          bvalBondPricesDataLoading: true,
          bvalBondPricesDataLoaded: false,
          bvalBondPricesDataError: null
        }
    }),

    on(fromActions.loadBVALBondPricesComplete, (state, action) => {
        return {
          ...state,
          bvalBondPricesData: action.res,
          bvalBondPricesDataLoading: false,
          bvalBondPricesDataLoaded: true,
        }
    }),

    on(fromActions.loadBVALBondPricesFailed, (state, action) => {
        return {
          ...state,
          bvalBondPricesDataLoading: false,
          bvalBondPricesDataLoaded: false,
          bvalBondPricesDataError: action.err
        }
    }),

    /* ============== History =================== */ 

    on(fromActions.loadBVALBondPriceHistory, (state,action) => {
        return {
          ...state,
          bvalBondPriceHistoryLoading: true,
          bvalBondPriceHistoryLoaded: false,
          bvalBondPriceHistoryError: null
        }
    }),

    
    on(fromActions.loadBVALBondPriceHistoryComplete, (state,action) => {
        return {
          ...state,
          securityDetail: action.res,
          bvalBondPriceHistoryLoading: false,
          bvalBondPriceHistoryLoaded: true
        }
    }),

    
    on(fromActions.loadBVALBondPriceHistoryFailed, (state,action) => {
        return {
          ...state,
          bvalBondPriceHistoryLoading: false,
          bvalBondPriceHistoryLoaded: false,
          bvalBondPriceHistoryError: action.err
        }
    }),
)

export const getAsOfDate = (state: State) => state.asOfDate;

export const getBvalBondPricesData = (state: State) => state.bvalBondPricesData;
export const getBvalBondPricesDataLoading = (state: State) => state.bvalBondPricesDataLoading;
export const getBvalBondPricesDataLoaded = (state: State) => state.bvalBondPricesDataLoaded;
export const getBvalBondPricesDataError = (state: State) => state.bvalBondPricesDataError;

export const getBvalBondPriceHistoryData = (state: State) => state.bvalBondPriceHistoryData;
export const getBvalBondPriceHistoryDataLoading = (state: State) => state.bvalBondPriceHistoryDataLoading;
export const getBvalBondPriceHistoryDataLoaded = (state: State) => state.bvalBondPriceHistoryDataLoaded;
export const getBvalBondPriceHistoryDataError = (state: State) => state.bvalBondPriceHistoryDataError;