import * as fromActions from '../actions';
import * as fromModels from '../../models';
import { ICommission } from '../../models';

export interface State {
    commissions: fromModels.ICommission[];
    commissionsLoading: boolean;
    commissionsLoaded: boolean;
    commissionsError?: string;
}

const initialState: State = {
    commissions: [],
    commissionsLoading: false,
    commissionsLoaded: false
};

export function reducer(state = initialState, action: fromActions.CommissionsActions): State {

   switch (action.type) {

        case fromActions.CommissionsActionTypes.LOAD_COMMISSIONS_SCHEDULE:
        case fromActions.CommissionsActionTypes.UPDATE_COMMISSIONS_SCHEDULE:
        case fromActions.CommissionsActionTypes.DOWNLOAD_COMMISSIONS_SCHEDULE: {
            return {
                ...state,
                commissionsLoading: true,
                commissionsLoaded: false,
                commissionsError: null
            };
        }

        case fromActions.CommissionsActionTypes.LOAD_COMMISSIONS_SCHEDULE_COMPLETE:
        case fromActions.CommissionsActionTypes.UPDATE_COMMISSIONS_SCHEDULE_COMPLETE: {
           return {
               ...state,
               commissions: [...action.payload],
               commissionsLoading: false,
               commissionsLoaded: true,
               commissionsError: null
           };
        }

        case fromActions.CommissionsActionTypes.LOAD_COMMISSIONS_SCHEDULE_FAILED:
        case fromActions.CommissionsActionTypes.UPDATE_COMMISSIONS_SCHEDULE_FAILED:
        case fromActions.CommissionsActionTypes.DOWNLOAD_COMMISSIONS_SCHEDULE_FAILED: {
           return {
               ...state,
               commissionsLoading: false,
               commissionsLoaded: false,
               commissionsError: action.payload
           };
        }

       case fromActions.CommissionsActionTypes.DOWNLOAD_COMMISSIONS_SCHEDULE_COMPLETE: {
           return {
               ...state,
               commissionsLoading: false,
               commissionsLoaded: true
           };
       }

    }

    return state;
}

export const getCommissions = (state: State) => state.commissions;
export const getLoading = (state: State) => state.commissionsLoading;
export const getLoaded = (state: State) => state.commissionsLoaded;
export const getError = (state: State) => state.commissionsError;
