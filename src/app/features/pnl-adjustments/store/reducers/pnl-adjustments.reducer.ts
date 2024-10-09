import * as fromActions from '../actions';
import * as fromModels from '../../models';
import moment from 'moment';
import { createReducer, on } from '@ngrx/store';

export interface State {

    startDate: string;
    endDate: string;

    adjustments: fromModels.IPnlAdjustment[];
    adjustmentsLoading: boolean;
    adjustmentsLoaded: boolean;
    adjustmentsError?: string;

    // downloadAdjustmentAttachmentsLoading: boolean;
    // downloadAdjustmentAttachmentsLoaded: boolean;
    // downloadAdjustmentAttachmentsError?: string;
}

const initialState: State = {

    startDate: moment().subtract(5, 'days').format('MM-DD-YYYY'),
    endDate: moment().format('MM-DD-YYYY'),

    adjustments: [],
    adjustmentsLoading: false,
    adjustmentsLoaded: false,
    adjustmentsError: null,

    // downloadAdjustmentAttachmentsLoading: false,
    // downloadAdjustmentAttachmentsLoaded: false,
    // downloadAdjustmentAttachmentsError: null
};

export const reducer = createReducer(

    initialState,

    /* ================= DATES ================= */


    on(fromActions.changeStartDate, (state, action) => {
        return {
            ...state,
            startDate: action.startDate
        }
    }),

    on(fromActions.changeEndDate, (state, action) => {
        return {
            ...state,
            endDate: action.endDate
        }
    }),
    
    /* ================= PNL DATA ================= */

    on(fromActions.loadPnlAdjustments, (state, action) => {
        return {
            ...state,
            adjustments: [],
            adjustmentsLoading: true,
            adjustmentsLoaded: false,
        }
    }),

    on(fromActions.loadPnlAdjustmentsComplete, (state, action) => {
        return {
            ...state,
            adjustments: action.res,
            adjustmentsLoading: false,
            adjustmentsLoaded: true,
        }
    }),

    on(fromActions.loadPnlAdjustmentsFailed, (state, action) => {
        return {
            ...state,
            adjustments: [],
            adjustmentsLoading: false,
            adjustmentsLoaded: false,
            adjustmentsError: action.err
        }
    }),
      
    /* ================= ADJUSTMENT ATTACHMENTS ================= */


)

export const getAdjustments = (state: State) => state.adjustments;
export const getAdjustmentsLoading = (state: State) => state.adjustmentsLoading;
export const getAdjustmentsLoaded = (state: State) => state.adjustmentsLoaded;
export const getAdjustmentsError = (state: State) => state.adjustmentsError;

export const getStartDate = (state: State) => state.startDate;
export const getEndDate = (state: State) => state.endDate;

