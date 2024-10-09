import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/jpm-agency-deliverables.actions';
import * as fromModels from '../../models';
import moment from 'moment';

export interface State {
  latestPortfolioDate: string;
  latestPortfolioDateLoading: boolean;
  latestPortfolioDateLoaded: boolean;
  latestPortfolioDateError?: string;

  portfolioDates: string[];
  portfolioDatesLoading: boolean;
  portfolioDatesLoaded: boolean;
  portfolioDatesError?: string;

  deliverableConfigData: any[];
  deliverableConfigDataLoading: boolean;
  deliverableConfigDataLoaded: boolean;
  deliverableConfigDataError?: string;

  updateDeliverableConfigPending: boolean;
  updateDeliverableConfigComplete: boolean;
  updateDeliverableConfigError?: string;

  deliverableData: fromModels.IAgencyData[];
  deliverableDataLoading: boolean;
  deliverableDataLoaded: boolean;
  deliverableDataError?: string;

  cashData: fromModels.IAgencyData[];
  cashDataLoading: boolean;
  cashDataLoaded: boolean;
  cashDataError?: string;
}

const initialState: State = {
  latestPortfolioDate: moment().format('MM-DD-YYYY'),
  latestPortfolioDateLoading: false,
  latestPortfolioDateLoaded: false,

  portfolioDates: [],
  portfolioDatesLoading: false,
  portfolioDatesLoaded: false,

  deliverableConfigData: [],
  deliverableConfigDataLoading: false,
  deliverableConfigDataLoaded: false,
  deliverableConfigDataError: null,

  updateDeliverableConfigPending: false,
  updateDeliverableConfigComplete: false,
  updateDeliverableConfigError: null,

  deliverableData: [],
  deliverableDataLoading: false,
  deliverableDataLoaded: false,

  cashData: [],
  cashDataLoading: false,
  cashDataLoaded: false,
};

export const reducer = createReducer(

    initialState, 

    /* ==================== LATEST PORTFOLIO DATE ====================== */


    on(fromActions.changeLatestPortfolioDate, (state, action) => {
        return {
            ...state,
            latestPortfolioDate: action.payload,
            cashDataLoading: true,
            cashDataLoaded: false,
            deliverableDataLoading: true,
            deliverableDataLoaded: false
        }
    }),

    on(fromActions.loadLatestPortfolioDate, (state, action) => {
        return {
            ...state,
            latestPortfolioDateLoading: true,
            latestPortfolioDateLoaded: false
        }
    }),

    on(fromActions.loadLatestPortfolioDateComplete, (state, action) => {
      let formattedPayload = moment.utc(action.payload[0]['Date']).format('MM-DD-YYYY')
        return {
            ...state,
            latestPortfolioDate: formattedPayload,
            latestPortfolioDateLoading: false,
            latestPortfolioDateLoaded: true,
            cashDataLoading: true,
            cashDataLoaded: false,
            deliverableDataLoading: true,
            deliverableDataLoaded: false
        }
    }),

    on(fromActions.loadLatestPortfolioDateFailed, (state, action) => {
        return {
            ...state,
            latestPortfolioDateLoading: false,
            latestPortfolioDateLoaded: false,
            latestPortfolioDateError: action.err
        }
    }),

    /* ==================== PORTFOLIO DATES ====================== */

    on(fromActions.loadPortfolioDates, (state, action) => {
        return {
            ...state,
            portfolioDatesLoading: true,
            portfolioDatesLoaded: false
        }
    }),

    on(fromActions.loadPortfolioDatesComplete, (state, action) => {
      let formattedPayload = []
      action.payload.forEach((item) => {
        formattedPayload.push(moment.utc(item['Date']).format('MM-DD-YYYY')) 
      })
      return {
          ...state,
          portfolioDates: formattedPayload,
          portfolioDatesLoading: false,
          portfolioDatesLoaded: true
      }
    }),

    on(fromActions.loadPortfolioDatesFailed, (state, action) => {
        return {
            ...state,
            portfolioDatesLoading: false,
            portfolioDatesLoaded: false,
            portfolioDatesError: action.err
        }
    }),

    /* ==================== CONFIG DATA ====================== */

    on(fromActions.loadDeliverableConfigData, (state,action) => {
        return ({
            ...state,
            deliverableConfigDataLoading: true,
            deliverableConfigDataLoaded: false
        })
    }),

    on(fromActions.loadDeliverableConfigDataComplete, (state,action) => {
        return ({
            ...state,
            deliverableConfigData: action.payload,
            deliverableConfigDataLoading: false,
            deliverableConfigDataLoaded: true
        })
    }),

    on(fromActions.loadDeliverableConfigDataFailed, (state, action) => {
        return {
            ...state,
            deliverableConfigDataLoading: false,
            deliverableConfigDataLoaded: false,
            deliverableConfigDataError: action.err
        }
    }),

    /* ==================== DELIVERABLE DATA ====================== */

    on(fromActions.loadDeliverableDataComplete, (state, action) => {
        return {
            ...state,
            deliverableData: action.payload,
            deliverableDataLoading: false,
            deliverableDataLoaded: true
        }
    }),

    on(fromActions.loadDeliverableDataFailed, (state, action) => {
        return {
            ...state,
            deliverableDataLoading: false,
            deliverableDataLoaded: false,
            deliverableDataError: action.err
        }
    }),

    /* ==================== CASH DATA ====================== */

    on(fromActions.loadCashDataComplete, (state, action) => {
        return {
            ...state,
            cashData: action.payload,
            cashDataLoading: false,
            cashDataLoaded: true
        }
    }),

    on(fromActions.loadCashDataFailed, (state, action) => {
        return {
            ...state,
            cashDataLoading: false,
            cashDataLoaded: false,
            cashDataError: action.err
        }
    }),

    /* ==================== UPDATE CONFIG DATA ====================== */

    on(fromActions.updateDeliverableConfigData, (state, action) => {
        return {
            ...state,
            updateDeliverableConfigPending: true,
            updateDeliverableConfigComplete: false
        }
    }),

    on(fromActions.updateDeliverableConfigDataComplete, (state, action) => {
        return {
            ...state,
            deliverableConfigData: action.payload,
            updateDeliverableConfigPending: false,
            updateDeliverableConfigComplete: true
        }
    }),

    on(fromActions.updateDeliverableConfigDataFailed, (state, action) => {
        return {
            ...state,
            updateDeliverableConfigPending: false,
            updateDeliverableConfigComplete: false,
            updateDeliverableConfigError: action.err
        }
    })

)

export const getLatestPortfolioDate = (state: State) => state.latestPortfolioDate;
export const getLatestPortfolioDateLoading = (state: State) => state.latestPortfolioDateLoading;
export const getLatestPortfolioDateLoaded = (state: State) => state.latestPortfolioDateLoaded;
export const getLatestPortfolioDateError = (state: State) => state.latestPortfolioDateError;

export const getPortfolioDates = (state: State) => state.portfolioDates;
export const getPortfolioDatesLoading = (state: State) => state.portfolioDatesLoading;
export const getPortfolioDatesLoaded = (state: State) => state.portfolioDatesLoaded;
export const getPortfolioDatesError = (state: State) => state.portfolioDatesError;

export const getDeliverableConfigData = (state: State) => state.deliverableConfigData;
export const getDeliverableConfigDataLoading = (state: State) => state.deliverableConfigDataLoading;
export const getDeliverableConfigDataLoaded = (state: State) => state.deliverableConfigDataLoaded;
export const getDeliverableConfigDataError = (state: State) => state.deliverableConfigDataError;

export const getDeliverableData = (state: State) => state.deliverableData;
export const getDeliverableDataLoading = (state: State) => state.deliverableDataLoading;
export const getDeliverableDataLoaded = (state: State) => state.deliverableDataLoaded;
export const getDeliverableDataError = (state: State) => state.deliverableDataError;

export const getCashData = (state: State) => state.cashData;
export const getCashDataLoading = (state: State) => state.cashDataLoading;
export const getCashDataLoaded = (state: State) => state.cashDataLoaded;
export const getCashDataError = (state: State) => state.cashDataError;
