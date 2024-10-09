import * as fromActions from '../actions';
import * as fromModels from '../../models';
import moment from 'moment';
import { createReducer, on } from '@ngrx/store';

export interface State {

  selectedTab: string;

  fromDate: string;
  toDate: string;

  filterText: string,

  selectedDate: string;
  selectedOrderId: number;
  selectedColumn: string;

  summaryData: any[];
  summaryDataLoading: boolean;
  summaryDataLoaded: boolean;
  summaryDataError?: string;

//   failedTradeData: any[];
//   failedTradeDataLoading: boolean;
//   failedTradeDataLoaded: boolean;
//   failedTradeDataError?: string;

  ssncFeedData: any[];
  ssncFeedDataLoading: boolean;
  ssncFeedDataLoaded: boolean;
  ssncFeedDataError?: string;

  additionalFeedData: any[];
  additionalFeedDataLoading: boolean;
  additionalFeedDataLoaded: boolean;
  additionalFeedDataError?: string;

  downloadTradeFilePending: boolean;
  downloadTradeFileComplete: boolean;
  downloadTradeFileError?: string;

  downloadAckFilePending: boolean;
  downloadAckFileComplete: boolean;
  downloadAckFileError?: string;

}

const initialState: State = {

    selectedTab: 'Futures',

    fromDate: moment().subtract(1, 'day').format('MM-DD-YYYY'),
    toDate: moment().subtract(1, 'day').format('MM-DD-YYYY'),
    selectedDate: moment().subtract(1, 'day').format('MM-DD-YYYY'),

    selectedOrderId: null,
    selectedColumn: null,

    filterText: '',

    summaryData: [],
    summaryDataLoading: false,
    summaryDataLoaded: false,

    // failedTradeData: [],
    // failedTradeDataLoading: false,
    // failedTradeDataLoaded: false,

    ssncFeedData: [],
    ssncFeedDataLoading: false,
    ssncFeedDataLoaded: false,
    
    additionalFeedData: [],
    additionalFeedDataLoading: false,
    additionalFeedDataLoaded: false,

    downloadTradeFilePending: false,
    downloadTradeFileComplete: false,
  
    downloadAckFilePending: false,
    downloadAckFileComplete: false
};

export const reducer = createReducer(
   
    initialState,

    on(fromActions.changeTab, (state, action) => {
        return {
            ...state,
            selectedTab: action.tab
        }
    }),

    on(fromActions.changeFromDate, (state,action) => {
        return {
            ...state,
            fromDate: action.date
        }
    }),

  
    on(fromActions.changeToDate, (state,action) => {
        return {
            ...state,
            toDate: action.date
        }
    }),  

    on(fromActions.changeSelectedDate, (state, action) => {
        return {
            ...state,
            selectedDate: action.date
        }
    }),

    on(fromActions.changeSelectedColumn, (state,action) => {
        return {
            ...state,
            selectedColumn: action.col
        }
    }),

    
    /* ===================== FILTER UPDATES ====================== */

    on(fromActions.changeFilterText, (state, action) => {
        return {
            ...state,
            filterText: action.text
        }
    }),


    /* ===================== LOAD SUMMARY ====================== */

    on(fromActions.loadSummary, (state) => {
        return {
            ...state,
            summaryDataLoading: true,
            summaryDataLoaded: false
        }
    }),

 
    on(fromActions.loadSummaryComplete, (state, action) => {
        return {
            ...state,
            summaryData: action.res,
            summaryDataLoading: true,
            summaryDataLoaded: false
        }
    }),

    on(fromActions.loadSummaryFailed, (state, action) => {
        return {
            ...state,
            summaryDataLoading: false,
            summaryDataLoaded: false,
            summaryDataError: action.err
        }
    }),


    /* ===================== LOAD FAILED TRADES ====================== */

    // on(fromActions.loadFailedTrades, (state) => {
    //     return {
    //         ...state,
    //         failedTradeDataLoading: true,
    //         failedTradeDataLoaded: false
    //     }
    // }),

 
    // on(fromActions.loadFailedTradesComplete, (state, action) => {
    //     return {
    //         ...state,
    //         failedTradeData: action.res,
    //         failedTradeDataLoading: true,
    //         failedTradeDataLoaded: false
    //     }
    // }),

    // on(fromActions.loadFailedTradesFailed, (state, action) => {
    //     return {
    //         ...state,
    //         failedTradeDataLoading: false,
    //         failedTradeDataLoaded: false,
    //         failedTradeDataError: action.err
    //     }
    // }),

    /* ===================== LOAD FEED ========================= */

    on(fromActions.loadSSNCFeedData, (state, action) => {
        return {
            ...state,
            ssncFeedData: [],
            ssncFeedDataLoading: true,
            ssncFeedDataLoaded: false
        }
    }),

    on(fromActions.loadSSNCFeedDataComplete, (state, action) => {
        return {
            ...state,
            ssncFeedData: action.res,
            ssncFeedDataLoading: false,
            ssncFeedDataLoaded: true
        }
    }),

    on(fromActions.loadSSNCFeedDataFailed, (state, action) => {
        return {
            ...state,
            ssncFeedDataLoading: false,
            ssncFeedDataLoaded: false,
            ssncFeedDataError: action.err
        }
    }),

    /* ===================== LOAD ADDITIONAL FEED ========================= */
    
    on(fromActions.loadAdditionalSSNCFeedData, (state, action) => {
        return {
            ...state,
            additionaldFeedDataLoading: true,
            additionalFeedDataLoaded: false
        }
    }),

    on(fromActions.loadAdditionalSSNCFeedDataComplete, (state, action) => {
        return {
            ...state,
            additionalFeedData: action.res,
            additionalFeedDataLoading: false,
            additionalFeedDataLoaded: true
        }
    }),

    on(fromActions.loadAdditionalSSNCFeedDataFailed, (state, action) => {
        return {
            ...state,
            additionalFeedDataLoading: false,
            additionalFeedDataLoaded: false,
            additionalFeedDataError: action.err
        }
    }),

    /* ===================== SELECT ORDER ID ========================= */
    on(fromActions.selectOrderId, (state, action) => {
        return {
            ...state,
            selectedOrderId: action.orderId
        }
    }),

    /* ===================== DOWNLOAD TRADE FILE  ========================= */

    on(fromActions.downloadTradeFile, (state) => {
        return {
            ...state,
            downloadTradeFilePending: true,
            downloadTradeFileError: null
        }
    }),

    on(fromActions.downloadTradeFileComplete, (state) => {
        return {
            ...state,
            downloadTradeFilePending: false,
            downloadTradeFileComplete: true
        }
    }),

    on(fromActions.downloadTradeFileFailed, (state, action) => {
        return {
            ...state,
            downloadTradeFilePending: false,
            downloadTradeFileError: action.err
        }
    }),

    /* ===================== DOWNLOAD ACK FILE  ========================= */

    on(fromActions.downloadAckFile, (state) => {
        return {
            ...state,
            downloadAckFilePending: true,
            downloadAckFileError: null
        }
    }),

    on(fromActions.downloadAckFileComplete, (state) => {
        return {
            ...state,
            downloadAckFilePending: false,
            downloadAckFileComplete: true
        }
    }),

    on(fromActions.downloadAckFileFailed, (state, action) => {
        return {
            ...state,
            downloadAckFilePending: false,
            downloadAckFileError: action.err
        }
    }),
)


export const getSelectedTab = (state: State) => state.selectedTab;

export const getFromDate = (state: State) => state.fromDate;
export const getToDate = (state: State) => state.toDate;

export const getFilterText = (state: State) => state.filterText;

export const getSummaryData = (state: State) => state.summaryData;
export const getSummaryDataLoading = (state: State) => state.summaryDataLoading;
export const getSummaryDataLoaded = (state: State) => state.summaryDataLoaded;

// export const getFailedTradeData = (state: State) => state.failedTradeData;
// export const getFailedTradeDataLoading = (state: State) => state.failedTradeDataLoading;
// export const getFailedTradeDataLoaded = (state: State) => state.failedTradeDataLoaded;

export const getSSNCFeedData = (state: State) => state.ssncFeedData;
export const getSSNCFeedDataLoading = (state: State) => state.ssncFeedDataLoading;
export const getSSNCFeedDataLoaded = (state: State) => state.ssncFeedDataLoaded;

export const getAdditionalSSNCFeedData = (state: State) => state.additionalFeedData;
export const getAdditionalSSNCFeedDataLoading = (state: State) => state.additionalFeedDataLoading;
export const getAdditionalSSNCFeedDataLoaded = (state: State) => state.additionalFeedDataLoaded;

export const getSelectedOrderId = (state: State) => state.selectedOrderId;
export const getSelectedDate = (state: State) => state.selectedDate;
export const getSelectedColumn = (state: State) => state.selectedColumn;