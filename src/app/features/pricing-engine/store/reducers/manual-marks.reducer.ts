import { createReducer, on } from '@ngrx/store';
import * as fromModels from '../../models';
import * as fromActions from '../actions/manual-marks.actions';
import moment from 'moment';

export interface State {
  asOfDate: string;
  manualMarks: fromModels.IRvDataRes[];
  manualMarksLoading: boolean;
  manualMarksLoaded: boolean;
  manualMarksError?: string;
}

const initialState: State = {
  asOfDate: moment().format('MM-DD-YYYY'),
  manualMarks: [],
  manualMarksLoading: false,
  manualMarksLoaded: false,
}

export const reducer = createReducer(

    initialState, 

    /* ============ CHANGE AS OF DATE =================== */

    on(fromActions.changeDate, (state, action) => {
      return {
        ...state,
        asOfDate: action.asOfDate,
      }
    }),

    /* ============ LOAD MANUAL MARKS =================== */

    on(fromActions.loadManualMarks, (state) => {
      return {
        ...state,
        manualMarksLoading: true,
        manualMarksLoaded: false,
      }
    }),

    on(fromActions.loadManualMarksComplete, (state, action) => {
      return {
        ...state,
        manualMarks: action.res,
        manualMarksLoading: false,
        manualMarksLoaded: true,
      }
    }),

    on(fromActions.loadManualMarksFailed, (state, action) => {
      return {
        ...state,
        manualMarksLoading: false,
        manualMarksError: action.err,
      }
    }),



)

export const getAsOfDate = (state: State) => state.asOfDate;

export const getManualMarks = (state: State) => state.manualMarks;
export const getManualMarksLoading = (state: State) => state.manualMarksLoading;
export const getManualMarksLoaded = (state: State) => state.manualMarksLoaded;
export const getManualMarksError = (state: State) => state.manualMarksError;