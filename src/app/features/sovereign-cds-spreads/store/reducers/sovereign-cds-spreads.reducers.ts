import * as fromActions from '../actions';
import moment from 'moment';
import { createReducer, on } from '@ngrx/store';
import { from } from 'rxjs';

export interface State {
  asOfDate: string;
  
  sovereignCdsSpreads: any;
  sovereignCdsSpreadsLoading: boolean;
  sovereignCdsSpreadsLoaded: boolean;
  sovereignCdsSpreadsError?: string | null;

}

const initialState: State = {
  asOfDate: moment().format('MM-DD-YYYY'),

  sovereignCdsSpreads: [],
  sovereignCdsSpreadsLoading: false,
  sovereignCdsSpreadsLoaded: false,
  sovereignCdsSpreadsError: null

};

export const reducer = createReducer(

    initialState,

    on(fromActions.changeAsOfDate, (state, { date }) => { 
      return {
        ...state,
        asOfDate: date
      };
    }),

    on(fromActions.loadSovereignSpreadData, (state) => {
      return {
        ...state,
        sovereignCdsSpreadsLoading: true,
        sovereignCdsSpreadsLoaded: false,
        sovereignCdsSpreadsError: null
      };
    }),

    on(fromActions.loadSovereignSpreadDataComplete, (state, { res }) => {
      return {
        ...state,
        sovereignCdsSpreads: res,
        sovereignCdsSpreadsLoading: false,
        sovereignCdsSpreadsLoaded: true,
      };
    }),

    on(fromActions.loadSovereignSpreadDataFailed, (state, { err }) => {
      return {
        ...state,
        sovereignCdsSpreadsLoading: false,
        sovereignCdsSpreadsLoaded: false,
        sovereignCdsSpreadsError: err
      };
    })
)


export const getAsOfDate = (state: State) => {
  return state.asOfDate
};

export const getSovereignCdsSpreads = (state: State) => state.sovereignCdsSpreads;
export const getSovereignCdsSpreadsLoadingStatus = (state: State) => state.sovereignCdsSpreadsLoading;
export const getSovereignCdsSpreadsLoadedStatus = (state: State) => state.sovereignCdsSpreadsLoaded;
export const getSovereignCdsSpreadsErrorStatus = (state: State) => state.sovereignCdsSpreadsError;