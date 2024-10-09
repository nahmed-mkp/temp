import * as fromActions from './../actions/timeseries-exporter.actions';
import * as fromModels from './../../models/timeseries-exporter.models';

import * as moment from 'moment';

export interface State {

    params: fromModels.IDateRange;

    selectedMonitor?: string;

    monitorNames: string[];
    monitorEntities: {[name: string]: fromModels.IMonitor};
    monitorData: {[name: string]: any};

    monitorsLoading: boolean;
    monitorsLoaded: boolean;
    monitorsLoadingError?: string;

    monitorDataLoading: boolean;
    monitorDataLoaded: boolean;
    monitorDataLoadingError?: string;

    monitorSaving: boolean;
    monitorSaved: boolean;
    monitorSavingError?: string;

    monitorListDeleting: boolean;
    monitorListDeleted: boolean;
    monitorListDeleteError?: string;

    timeseries: any[];
    timeseriesLoading: boolean;
    timeseriesLoaded: boolean;
    timeseriesError?: string;
}

const initialState: State = {

    params: {
        'startDate': moment().startOf('day').add(-1, 'year').format('MM/DD/YYYY'),
        'endDate': moment().startOf('day').format('MM/DD/YYYY')
    },

    monitorNames: [],
    monitorEntities: {},
    monitorData: {},

    monitorsLoading: false,
    monitorsLoaded: false,

    monitorDataLoading: false,
    monitorDataLoaded: false,

    monitorSaving: false,
    monitorSaved: false,

    monitorListDeleting: false,
    monitorListDeleted: false,

    timeseries: [],
    timeseriesLoading: false,
    timeseriesLoaded: false
};

export function reducer(state = initialState, action: fromActions.TimeseriesExporterActions): State {
    switch (action.type) {

        case fromActions.TimeseriesExporterActionTypes.CHANGE_PARAMS: {
            return {
                ...state,
                params: action.payload
            };
        }

        case fromActions.TimeseriesExporterActionTypes.SELECT_MONITOR: {
            return {
                ...state,
                selectedMonitor: action.payload
            };
        }

        case fromActions.TimeseriesExporterActionTypes.LOAD_MONITORS: {
            return {
                ...state,
                monitorsLoading: true,
                monitorsLoaded: false,
                monitorsLoadingError: null
            };
        }

        case fromActions.TimeseriesExporterActionTypes.LOAD_MONITORS_COMPLETE: {
            const monitors = action.payload.map((monitor) => monitor.name);
            const newEntities = action.payload.reduce((entities: {[name: string]: fromModels.IMonitor}, item: fromModels.IMonitor) => {
                item.marketData = item.marketData.sort((elementA, elementB) => elementA.listOrder - elementB.listOrder);
                return Object.assign({}, entities, {[item.name]: item});
            }, {});
            return {
                ...state,
                monitorsLoading: false,
                monitorsLoaded: true,
                monitorNames: [...monitors],
                monitorEntities: newEntities
            };
        }

        case fromActions.TimeseriesExporterActionTypes.LOAD_MONITORS_FAILED: {
            return {
                ...state,
                monitorsLoading: false,
                monitorsLoaded: false,
                monitorsLoadingError: action.payload
            };
        }



        case fromActions.TimeseriesExporterActionTypes.LOAD_MONITOR_DATA: {
            return {
                ...state,
                monitorDataLoading: true,
                monitorDataLoaded: false,
                monitorDataLoadingError: null,
                selectedMonitor: action.payload.monitor.name
            };
        }

        case fromActions.TimeseriesExporterActionTypes.LOAD_MONITOR_DATA_COMPLETE: {
            if (action.payload !== null) {
                const newEntity = { [action.payload.name]: action.payload.data };
                return {
                    ...state,
                    monitorDataLoading: false,
                    monitorDataLoaded: true,
                    monitorData: Object.assign({}, state.monitorData, newEntity)
                };
            } else {
                return {
                    ...state
                };
            }
        }

        case fromActions.TimeseriesExporterActionTypes.LOAD_MONITOR_DATA_FAILED: {
            return {
                ...state,
                monitorDataLoading: false,
                monitorDataLoaded: false,
                monitorDataLoadingError: action.payload
            };
        }







        // ---------------------------------------------------------------------------------


        case fromActions.TimeseriesExporterActionTypes.SAVE_MONITOR: {
            return {
                ...state,
                monitorSaving: true,
                monitorSaved: false,
                monitorSavingError: null
            };
        }

        case fromActions.TimeseriesExporterActionTypes.SAVE_MONITOR_COMPLETE: {
            if (action.payload !== null) {
                const updatedList = action.payload.updatedList;
                const monitorName = action.payload.name;
                const oldMonitorNameList = state.monitorNames;

                const newMonitorNameList = oldMonitorNameList.includes(monitorName) === false ? [...oldMonitorNameList, monitorName] : oldMonitorNameList;
                const newEntities = Object.assign({}, state.monitorEntities, {[monitorName]: {name: monitorName, marketData: updatedList}});
                // const monitors = state.monitorNames.filter(monitorName => monitorName !== action.payload.name);
                // const newList = [action.payload.name];
                // monitors.forEach(monitor => {
                //     newList.push(monitor);
                // });
                return {
                    ...state,
                    monitorsLoading: false,
                    monitorsLoaded: true,
                    monitorNames: [...newMonitorNameList],
                    monitorEntities: newEntities
                };
            } else {
                return {
                    ...state,
                    monitorSaving: false,
                    monitorSaved: false
                };
            }
        }

        case fromActions.TimeseriesExporterActionTypes.SAVE_MONITOR_FAILED: {
            return {
                ...state,
                monitorSaving: false,
                monitorSaved: false,
                monitorSavingError: action.payload
            };
        }



        // ---------------------------------------------------------------------------------


        case fromActions.TimeseriesExporterActionTypes.DELETE_MONITOR_LIST: {
            return {
                ...state,
                monitorListDeleting: true,
                monitorListDeleted: false,
                monitorListDeleteError: null,
            };
        }

        case fromActions.TimeseriesExporterActionTypes.DELETE_MONITOR_LIST_COMPLETE: {
            const deletedMonitorName = action.payload;
            const monitorEntities = state.monitorEntities;
            const monitorNames = state.monitorNames.filter(name => name !== deletedMonitorName);
            delete monitorEntities[deletedMonitorName];

            return {
                ...state,
                monitorNames: [...monitorNames],
                monitorEntities: {...monitorEntities},

                monitorListDeleting: false,
                monitorListDeleted: true,
                monitorListDeleteError: null,
            };
        }

        case fromActions.TimeseriesExporterActionTypes.DELETE_MONITOR_LIST_FAILED: {
            return {
                ...state,
                monitorListDeleting: false,
                monitorListDeleted: false,
                monitorListDeleteError: action.payload,
            };
        }

        case fromActions.TimeseriesExporterActionTypes.LOAD_TIME_SERIES: {
            return {
                ...state,
                timeseries: [],
                timeseriesLoading: true,
                timeseriesLoaded: false,
                timeseriesError: null
            };
        }

        case fromActions.TimeseriesExporterActionTypes.LOAD_TIME_SERIES_COMPLETE: {
            return {
                ...state,
                timeseriesLoading: false,
                timeseriesLoaded: true,
                timeseries: [...action.payload]
            };
        }

        case fromActions.TimeseriesExporterActionTypes.LOAD_TIME_SERIES_FAILED: {
            return {
                ...state,
                timeseriesLoading: false,
                timeseriesLoaded: false,
                timeseriesError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getParams = (state: State) => state.params;
export const getSelectedMonitor = (state: State) => state.selectedMonitor;

export const getMonitorNames = (state: State) => state.monitorNames;
export const getMonitorEntities = (state: State) => state.monitorEntities;
export const getMonitorsLoading = (state: State) => state.monitorsLoading;
export const getMonitorsLoaded = (state: State) => state.monitorsLoaded;
export const getMonitorsLoadingError = (state: State) => state.monitorsLoadingError;

export const getMonitorData = (state: State) => state.monitorData;
export const getMonitorDataLoading = (state: State) => state.monitorDataLoading;
export const getMonitorDataLoaded = (state: State) => state.monitorDataLoaded;
export const getMonitorDataLoadingError = (state: State) => state.monitorDataLoadingError;

export const getMonitorSaving = (state: State) => state.monitorSaving;
export const getMonitorSaved = (state: State) => state.monitorSaved;
export const getMonitorSavingError = (state: State) => state.monitorSavingError;

export const getMonitorListDeleting = (state: State) => state.monitorListDeleting;
export const getMonitorListDeleted = (state: State) => state.monitorListDeleted;
export const getMonitorListDeleteError = (state: State) => state.monitorListDeleteError;

export const getTimeseries = (state: State) => state.timeseries;
export const getTimeseriesLoading = (state: State) => state.timeseriesLoading;
export const getTimeseriesLoaded = (state: State) => state.timeseriesLoaded;
export const getTimeseriesError = (state: State) => state.timeseriesError;


