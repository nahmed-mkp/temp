import * as fromActions from '../actions';
import * as fromModels from '../../models';

export interface State {
    // UI State
    tempSaveTimeseriesRecord: string[];
    activeTimeseriesRecord: string;
    activeAsOfDate: string;

    // Server response
    asOfDates: string[];
    asOfDateLoading: boolean;
    asOfDateLoaded: boolean;
    asOfDateError?: string;

    timeseriesRecord: {
        [id: string]: any
    }
    timeseriesRecordLoading: boolean,
    timeseriesRecordLoaded: boolean,
    timeseriesRecordError?: string,

    volReport: {
        [asOfDates: string]: fromModels.VolReportData[];
    };
    volReportLoading: boolean;
    volReportLoaded: boolean;
    volReportError?: string;
}

const initialState: State = {
    tempSaveTimeseriesRecord: [],
    activeTimeseriesRecord: null,
    activeAsOfDate: null,

    asOfDates: [],
    asOfDateLoading: false,
    asOfDateLoaded: false,

    timeseriesRecord: {},
    timeseriesRecordLoading: false,
    timeseriesRecordLoaded: false,

    volReport: null,
    volReportLoading: false,
    volReportLoaded: false,
}

export function reducer(state = initialState, action: fromActions.VolReportAction): State {

    switch(action.type) {

        case fromActions.VolReportActionTypes.SAVE_TIMESERIES_RECORD: {
            return {
                ...state,
                tempSaveTimeseriesRecord: [...state.tempSaveTimeseriesRecord, action.payload]
            }
        }

        case fromActions.VolReportActionTypes.SET_ACTIVE_AS_OF_DATE: {
            return {
                ...state,
                activeAsOfDate: action.payload
            }
        }





        case fromActions.VolReportActionTypes.LOAD_AS_OF_DATE: {
            return {
                ...state,
                asOfDateLoading: true,
                asOfDateLoaded: false,
                asOfDateError: null
            }
        }

        case fromActions.VolReportActionTypes.LOAD_AS_OF_DATE_COMPLETE: {
            return {
                ...state,
                asOfDates: action.payload,
                asOfDateLoading: false,
                asOfDateLoaded: true,
                asOfDateError: null
            }
        }

        case fromActions.VolReportActionTypes.LOAD_AS_OF_DATE_FAILED: {
            return {
                ...state,
                asOfDateLoading: false,
                asOfDateLoaded: false,
                asOfDateError: action.payload
            }
        }




        case fromActions.VolReportActionTypes.LOAD_VOL_REPORT: {
            return {
                ...state,
                volReportLoading: true,
                volReportLoaded: false,
                volReportError: null
            }   
        }

        case fromActions.VolReportActionTypes.LOAD_VOL_REPORT_COMPLETE: {
            return {
                ...state,
                volReportLoading: false,
                volReportLoaded: true,
                volReport: Object.assign({}, state.volReport, action.payload),
                volReportError: null,
            }
        }

        case fromActions.VolReportActionTypes.LOAD_VOL_REPORT_FAILED: {
            return {
                ...state,
                volReportLoading: false,
                volReportLoaded: false,
                volReportError: action.payload,
            }
        }






        case fromActions.VolReportActionTypes.LOAD_TIMESERIES: {
            return {
                ...state,
                timeseriesRecordLoading: true,
                timeseriesRecordLoaded: false,
                timeseriesRecordError: null
            }
        }

        case fromActions.VolReportActionTypes.LOAD_TIMESERIES_COMPLETE: {

            return {
                ...state,
                timeseriesRecord: Object.assign({}, state.timeseriesRecord, {[action.payload.id]: action.payload}),
                timeseriesRecordLoading: false,
                timeseriesRecordLoaded: true,
                timeseriesRecordError: null
            }
        }

        case fromActions.VolReportActionTypes.LOAD_TIMESERIES_FAILED: {
            return {
                ...state,
                timeseriesRecordLoading: true,
                timeseriesRecordLoaded: true,
                timeseriesRecordError: null
            }
        }

        default: {
            return state;
        }
    }
}


export const getTempSaveTimeseriesRecord = (state: State) => state.tempSaveTimeseriesRecord;
export const getActiveTimeseriesRecord = (state: State) => state.activeTimeseriesRecord;
export const getActiveAsOfDate = (state: State) => state.activeAsOfDate;

export const getAsOfDates = (state: State) => state.asOfDates;
export const getAsOfDateLoading = (state: State) => state.asOfDateLoading;
export const getAsOfDateLoaded = (state: State) => state.asOfDateLoaded;
export const getAsOfDateError = (state: State) => state.asOfDateError;

export const getTimeseriesRecord = (state: State) => state.timeseriesRecord;
export const getTimeseriesRecordLoading = (state: State) => state.timeseriesRecordLoading;
export const getTimeseriesRecordLoaded = (state: State) => state.timeseriesRecordLoaded;
export const getTimeseriesRecordError = (state: State) => state.timeseriesRecordError;

export const getVolReport = (state: State) => state.volReport;
export const getVolReportLoading = (state: State) => state.volReportLoading;
export const getVolReportLoaded = (state: State) => state.volReportLoaded;
export const getVolReportError = (state: State) => state.volReportError;


