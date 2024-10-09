import * as fromActions from '../actions';
import * as fromModels from '../../models';

export interface State {

    dataLoading: boolean;
    dataLoaded: boolean;
    dataError?: string;

    asOfDate?: string;

    tsySwaps: any[];
    mbsRaws: any[];
    mbsRisks: any[];
    mbsOas: any[];
    csCloses: any[];

    discardUpdates: boolean;

    mode: string;
    useSOFR: boolean;
    legacyMode: boolean;

    ohlc: any[];
    ohlcLoading: boolean;
    ohlcLoaded: boolean;
    ohlcError?: string;

    medianByTimeOfDay: any[];
    medianByTimeOfDayLoading: boolean;
    medianByTimeOfDayLoaded: boolean;
    medianByTimeOfDayError?: string;

    restartingTradewebExcel: boolean;
    restartedTradewebExcel: boolean;
    restartTradewebExcelError?: string;

    intradayMetadata: fromModels.IntradayMetaData,
    intradayMetadataLoading: boolean;
    intradayMetadataLoaded: boolean;
    intradayMetadataError?: string;

    intradayPlot: any,
    intradayPlotLoading: boolean;
    intradayPlotLoaded: boolean;
    intradayPlotError?: string;

    historicalPlot: any,
    historicalPlotLoading: boolean;
    historicalPlotLoaded: boolean;
    historicalPlotError?: string;
}

const initialState: State = {

    dataLoading: false,
    dataLoaded: false,

    tsySwaps: [],
    mbsRaws: [],
    mbsRisks: [],
    mbsOas: [],
    csCloses: [],

    discardUpdates: false,

    mode: 'live',
    useSOFR: true,
    legacyMode: false,

    ohlc: [],
    ohlcLoading: false,
    ohlcLoaded: false,

    medianByTimeOfDay: [],
    medianByTimeOfDayLoading: false,
    medianByTimeOfDayLoaded: false,

    restartingTradewebExcel: false,
    restartedTradewebExcel: false,

    intradayMetadata: { hierarchy: {}, fieldMap: {} },
    intradayMetadataLoading: false,
    intradayMetadataLoaded: false,

    intradayPlot: [],
    intradayPlotLoading: false,
    intradayPlotLoaded: false,

    historicalPlot: [],
    historicalPlotLoading: false,
    historicalPlotLoaded: false
};

export function reducer(state = initialState, action: fromActions.DailyTrackingActions): State {

    switch (action.type) {

        case fromActions.DailyTrackingActionTypes.LOAD_DATA:
        case fromActions.DailyTrackingActionTypes.LOAD_HISTORICAL_DATA: {
            return {
                ...state,
                dataLoading: true,
                dataLoaded: false,
                dataError: null
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_DATA_COMPLETE: {

            if (state.discardUpdates) {
                console.log('Discarding Updates');
                return {
                    ...state
                };
            }

            // data Enrich
            action.payload.tsySwaps.forEach(item => {
                item.Id = item.maturity;
            });

            const mbsRawWithId = [];
            action.payload.mbsRaw.forEach(item => {
                item.Id = item.Name;
                item.customGroup = item.Name.split(' ')[0];
                mbsRawWithId.push(item);
            });

            const mbsRiskWithId = [];
            action.payload.mbsRisk.forEach(item => {
                item.Id = item.Name;
                item.customGroup = item.Name.split(' ')[0];
                mbsRiskWithId.push(item);
            });

            const mbsOasWithId = [];
            action.payload.mbsOas.forEach(item => {
                item.Id = item.Name;
                item.customGroup = item.Name.split(' ')[0];
                mbsOasWithId.push(item);
            });

            return {
                ...state,
                dataLoading: false,
                dataLoaded: true,
                dataError: null,

                asOfDate: action.payload.asOfDate,
                tsySwaps: action.payload.tsySwaps,
                mbsRaws: mbsRawWithId,
                mbsRisks: mbsRiskWithId,
                mbsOas: mbsOasWithId,
                csCloses: action.payload.csCloses
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_DATA_FAILED:
        case fromActions.DailyTrackingActionTypes.LOAD_HISTORICAL_DATA_FAILED: {
            return {
                ...state,
                dataLoading: false,
                dataLoaded: false,
                dataError: action.payload
            };
        }

        case fromActions.DailyTrackingActionTypes.CHANGE_MODE: {
            const newMode = state.mode === 'live' ? 'close' : 'live';
            return {
                ...state,
                mode: newMode
            };
        }

        case fromActions.DailyTrackingActionTypes.UPDATE_USER_INPUTS: {
            setTimeout(() => {
                // Introduce a 3 second delay, this is to stall
            }, 3000);

            return {
                ...state,
                discardUpdates: true
            };
        }

        case fromActions.DailyTrackingActionTypes.TOGGLE_SOFR_SPREADS: {
            return {
                ...state, 
                useSOFR: action.payload
            };
        }

        case fromActions.DailyTrackingActionTypes.TOGGLE_LEGACY_MODE: {
            return {
                ...state,
                legacyMode: action.payload
            };
        }

        case fromActions.DailyTrackingActionTypes.UPDATE_USER_INPUTS_COMPLETE: {
            return {
                ...state,
                discardUpdates: false
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_OHLC: {
            return {
                ...state,
                ohlcLoading: true,
                ohlcLoaded: false,
                ohlcError: null
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_OHLC_COMPLETE: {
            return {
                ...state,
                ohlcLoading: false,
                ohlcLoaded: true,
                ohlc: [...action.payload]
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_OHLC_FAILED: {
            return {
                ...state,
                ohlcLoading: false,
                ohlcLoaded: false,
                ohlcError: action.payload
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_MEDIAN_BY_TIME_OF_DAY: {
            return {
                ...state,
                medianByTimeOfDayLoading: true,
                medianByTimeOfDayLoaded: false,
                medianByTimeOfDayError: null
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_MEDIAN_BY_TIME_OF_DAY_COMPLETE: {
            return {
                ...state,
                medianByTimeOfDayLoading: false,
                medianByTimeOfDayLoaded: true,
                medianByTimeOfDay: [...action.payload]
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_MEDIAN_BY_TIME_OF_DAY_FAILED: {
            return {
                ...state,
                medianByTimeOfDayLoading: false,
                medianByTimeOfDayLoaded: false,
                medianByTimeOfDayError: action.payload
            };
        }

        case fromActions.DailyTrackingActionTypes.RESTART_TRADEWEB_EXCEL_SHEET: {
            return {
                ...state,
                restartingTradewebExcel: true,
                restartedTradewebExcel: false,
                restartTradewebExcelError: null
            };
        }

        case fromActions.DailyTrackingActionTypes.RESTART_TRADEWEB_EXCEL_SHEET_COMPLETE: {
            return {
                ...state,
                restartingTradewebExcel: false,
                restartedTradewebExcel: true
            };
        }

        case fromActions.DailyTrackingActionTypes.RESTART_TRADEWEB_EXCEL_SHEET_FAILED: {
            return {
                ...state,
                restartingTradewebExcel: false,
                restartedTradewebExcel: false,
                restartTradewebExcelError: action.payload
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_INTRADAY_METADATA: {
            return {
                ...state,
                intradayMetadata: {hierarchy: {}, fieldMap: {}},
                intradayMetadataLoading: true,
                intradayMetadataLoaded: false,
                intradayMetadataError: null
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_INTRADAY_METADATA_COMPLETE: {
            const hierarchy = {};
            const expressions = action.payload.expressions;
            const fieldMap = action.payload.fieldMap;
            expressions.map((expression) => {
                const exprParts = expression.split(':');

                //TODO: Need to do this using recursion.... 
                exprParts.forEach((exprPart, idx) => {
                    if (idx === 0) { 
                        // We ignore this level here
                    } else if (idx===1) { 
                        if (hierarchy[exprPart] === undefined) {
                            hierarchy[exprPart] = {}
                        }
                    } else if (idx === 2) {
                        if (hierarchy[exprParts[1]][exprPart] === undefined) { 
                            hierarchy[exprParts[1]][exprPart] = {}
                        }
                    } else if (idx === 3) { 
                        if (hierarchy[exprParts[1]][exprParts[2]][exprPart]=== undefined) {
                            hierarchy[exprParts[1]][exprParts[2]][exprPart] = expression
                        }
                    }
                })
            });
            const metaData =  {
                fieldMap: fieldMap,
                hierarchy: hierarchy
            }
            return {
                ...state,
                intradayMetadata: { ...metaData },
                intradayMetadataLoading: false,
                intradayMetadataLoaded: true
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_INTRADAY_METADATA_FAILED: {
            return {
                ...state,
                intradayMetadataLoading: false,
                intradayMetadataLoaded: false,
                intradayMetadataError: action.payload
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_INTRADAY_PLOT: {
            return {
                ...state, 
                intradayPlot: [],
                intradayPlotLoading: true,
                intradayPlotLoaded: false,
                intradayPlotError: null
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_INTRADAY_PLOT_COMPLETE: {
            const payload = action.payload;
            const dates = Object.keys(payload);
            const seriesByDate = {}
            dates.map((date) => {
                seriesByDate[date] = [];
                Object.keys(payload[date]).map((key) => {
                    seriesByDate[date].push(key)
                });
            });

            const finalPayload = {
                'dates': [...dates],
                'seriesByDate': {...seriesByDate},
                'data': {...payload}
            };

            return {
                ...state,
                intradayPlot: finalPayload,
                intradayPlotLoading: false,
                intradayPlotLoaded: true
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_INTRADAY_PLOT_FAILED: {
            return {
                ...state,
                intradayPlotLoading: false,
                intradayPlotLoaded: false,
                intradayPlotError: action.payload
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_HISTORICAL_PLOT: {
            return {
                ...state,
                historicalPlot: [],
                historicalPlotLoading: true,
                historicalPlotLoaded: false,
                historicalPlotError: null
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_HISTORICAL_PLOT_COMPLETE: {
            const payload = action.payload;
            return {
                ...state,
                historicalPlot: action.payload,
                historicalPlotLoading: false,
                historicalPlotLoaded: true
            };
        }

        case fromActions.DailyTrackingActionTypes.LOAD_HISTORICAL_PLOT_FAILED: {
            return {
                ...state,
                historicalPlotLoading: false,
                historicalPlotLoaded: false,
                historicalPlotError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getDataLoading = (state: State) => state.dataLoading;
export const getDataLoaded = (state: State) => state.dataLoaded;
export const getDataError = (state: State) => state.dataError;

export const getTsySwaps = (state: State) => state.tsySwaps;
export const getMbsRaws = (state: State) => state.mbsRaws;
export const getMbsRisks = (state: State) => state.mbsRisks;
export const getMbsOas = (state: State) => state.mbsOas;
export const getCSCloses = (state: State) => state.csCloses;

export const getMode = (state: State) => state.mode;
export const getAsOfDate = (state: State) => state.asOfDate;
export const getUseSOFR = (state: State) => state.useSOFR;
export const getLegacyMode = (state: State) => state.legacyMode;

export const getOHLC = (state: State) => state.ohlc;
export const getOHLCLoading = (state: State) => state.ohlcLoading;
export const getOHLCLoaded = (state: State) => state.ohlcLoaded;
export const getOHLCError = (state: State) => state.ohlcError;

export const getMedianByTimeOfDay = (state: State) => state.medianByTimeOfDay;
export const getMedianByTimeOfDayLoading = (state: State) => state.medianByTimeOfDayLoading;
export const getMedianByTimeOfDayLoaded = (state: State) => state.medianByTimeOfDayLoaded;
export const getMedianByTimeOfDayError = (state: State) => state.medianByTimeOfDayError;

export const getTradewebExcelRestarting = (state: State) => state.restartingTradewebExcel;
export const getTradewebExcelRestarted = (state: State) => state.restartedTradewebExcel;
export const getTradewebExcelRestartError = (state: State) => state.restartTradewebExcelError;

export const getIntradayMetadata = (state: State) => state.intradayMetadata;
export const getIntradayMetadataLoading = (state: State) => state.intradayMetadataLoading;
export const getIntradayMetadataLoaded = (state: State) => state.intradayMetadataLoaded;
export const getIntradayMetadataError = (state: State) => state.intradayMetadataError;

export const getIntradayPlot = (state: State) => state.intradayPlot;
export const getIntradayPlotLoading = (state: State) => state.intradayPlotLoading;
export const getIntradayPlotLoaded = (state: State) => state.intradayPlotLoaded;
export const getIntradayPlotError = (state: State) => state.intradayPlotError;

export const getHistoricalPlot = (state: State) => state.historicalPlot;
export const getHistoricalPlotLoading = (state: State) => state.historicalPlotLoading;
export const getHistoricalPlotLoaded = (state: State) => state.historicalPlotLoaded;
export const getHistoricalPlotError = (state: State) => state.historicalPlotError;
