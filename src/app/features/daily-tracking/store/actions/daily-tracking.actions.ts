import { Action } from '@ngrx/store';

import * as fromModels from '../../models/daily-tracking.models';

export enum DailyTrackingActionTypes {

    // Server Action

    LOAD_DATA = '[Daily Tracking] Load Data',
    LOAD_DATA_SOFR = '[Daily Tracking] Load Data SOFR',
    LOAD_DATA_COMPLETE = '[Daily Tracking] Load Data Complete',
    LOAD_DATA_FAILED = '[Daily Tracking] Load Data failed',

    LOAD_HISTORICAL_DATA = '[Daily Tracking] Load Historical Data',
    LOAD_HISTORICAL_DATA_COMPLETE = '[Daily Tracking] Load Historical Data Complete',
    LOAD_HISTORICAL_DATA_FAILED = '[Daily Tracking] Load Historical Data Failed',

    CHANGE_MODE = '[Daily Tracking] Change mode',

    UPDATE_USER_INPUTS = '[Daily Tracking] Update user inputs',
    UPDATE_USER_INPUTS_COMPLETE = '[Daily Tracking] Update user inputs complete',
    UPDATE_USER_INPUTS_FAILED = '[Daily Tracking] Update user inputs failed',

    TAKE_SNAPSHOT = '[Daily Tracking] Save snapshot',
    TAKE_SNAPSHOT_COMPLETE = '[Daily Tracking] Save snapshot complete',
    TAKE_SNAPSHOT_FAILED = '[Daily Tracking] Save snapshot failed',

    LOAD_OHLC = '[Daily Tracking] Load OHLC',
    LOAD_OHLC_COMPLETE = '[Daily Tracking] Load OHLC Complete',
    LOAD_OHLC_FAILED = '[Daily Tracking] Load OHLC Failed',

    LOAD_MEDIAN_BY_TIME_OF_DAY = '[Daily Tracking] Load median by time of day',
    LOAD_MEDIAN_BY_TIME_OF_DAY_COMPLETE = '[Daily Tracking] Load median by time of day complete',
    LOAD_MEDIAN_BY_TIME_OF_DAY_FAILED = '[Daily Tracking] Load median by time of day failed',

    RESTART_TRADEWEB_EXCEL_SHEET = '[Daily Tracking] Restart Tradeweb Excel Sheet',
    RESTART_TRADEWEB_EXCEL_SHEET_COMPLETE = '[Daily Tracking] Restart Tradeweb Excel Sheet Complete',
    RESTART_TRADEWEB_EXCEL_SHEET_FAILED = '[Daily Tracking] Restart Tradeweb Excel Sheet Failed',

    LOAD_INTRADAY_METADATA = '[Daily Tracking] Load intraday meta data',
    LOAD_INTRADAY_METADATA_COMPLETE = '[Daily Tracking] Load intraday meta data complete',
    LOAD_INTRADAY_METADATA_FAILED = '[Daily Tracking] Load intraday meta data failed', 

    LOAD_INTRADAY_PLOT = '[Daily Tracking] Load intraday plot',
    LOAD_INTRADAY_PLOT_COMPLETE = '[Daily Tracking] Load intraday plot complete',
    LOAD_INTRADAY_PLOT_FAILED = '[Daily Tracking] Load intraday plot failed',

    TOGGLE_SOFR_SPREADS = '[Daily Tracking] Toggle SOFR Spreads',
    TOGGLE_LEGACY_MODE = '[Daily Tracking] Toggle Legacy Mode',

    LOAD_HISTORICAL_PLOT = '[Daily Tracking] Load historical plot',
    LOAD_HISTORICAL_PLOT_COMPLETE = '[Daily Tracking] Load historical plot complete',
    LOAD_HISTORICAL_PLOT_FAILED = '[Daily Tracking] Load historical plot failed',
}

export class LoadData implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_DATA;

    constructor(public payload: fromModels.ITrackingInput) { }
}

export class LoadDataSOFR implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_DATA_SOFR;

    constructor(public payload: string) { }
}

export class LoadDataComplete implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_DATA_COMPLETE;

    constructor(public payload: {asOfDate: string, tsySwaps: any; mbsRaw: any; mbsRisk: any, csCloses: any, mbsOas: any}) {}
}

export class LoadDataFailed implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_DATA_FAILED;

    constructor(public payload: string) {}
}

export class LoadHistoricalData implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_HISTORICAL_DATA;

    constructor(public payload: fromModels.ITrackingInput) { }
}

export class LoadHistoricalDataComplete implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_HISTORICAL_DATA_COMPLETE;

    constructor(public payload: {asOfDate: string, tsySwaps: any; mbsRaw: any; mbsRisk: any, csCloses: any }) { }
}

export class LoadHistoricalDataFailed implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_HISTORICAL_DATA_FAILED;

    constructor(public payload: string) { }
}

export class UpdateUserInputs implements Action {
    readonly type = DailyTrackingActionTypes.UPDATE_USER_INPUTS;

    constructor(public payload: any) { }

}

export class UpdateUserInputsComplete implements Action {
    readonly type = DailyTrackingActionTypes.UPDATE_USER_INPUTS_COMPLETE;

    constructor(public payload: string) { }
}

export class UpdateUserInputsFailed implements Action {
    readonly type = DailyTrackingActionTypes.UPDATE_USER_INPUTS_FAILED;

    constructor(public payload: string) { }
}

export class TakeSnapshot implements Action {
    readonly type = DailyTrackingActionTypes.TAKE_SNAPSHOT;
}

export class TakeSnapshotComplete implements Action {
    readonly type = DailyTrackingActionTypes.TAKE_SNAPSHOT_COMPLETE;

    constructor(public payload: string) { }
}

export class TakeSnapshotFailed implements Action {
    readonly type = DailyTrackingActionTypes.TAKE_SNAPSHOT_FAILED;

    constructor(public payload: string) { }
}

export class ChangeMode implements Action {
    readonly type = DailyTrackingActionTypes.CHANGE_MODE;
}


export class LoadOHLC implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_OHLC;
}

export class LoadOHLCComplete implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_OHLC_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadOHLCFailed implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_OHLC_FAILED;

    constructor(public payload: string) {}
}


export class LoadMedianByTimeOfDay implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_MEDIAN_BY_TIME_OF_DAY;
}

export class LoadMedianByTimeOfDayComplete implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_MEDIAN_BY_TIME_OF_DAY_COMPLETE;

    constructor(public payload: any[]) { }
}

export class LoadMedianByTimeOfDayFailed implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_MEDIAN_BY_TIME_OF_DAY_FAILED;

    constructor(public payload: string) { }
}

export class LoadIntradayPlot implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_INTRADAY_PLOT;

    constructor(public payload: fromModels.IntradayRequest) { }
}

export class LoadIntradayPlotComplete implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_INTRADAY_PLOT_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadIntradayPlotFailed implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_INTRADAY_PLOT_FAILED;

    constructor(public payload: string) { }
}


export class LoadIntradayMetaData implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_INTRADAY_METADATA;
}

export class LoadIntradayMetaDataComplete implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_INTRADAY_METADATA_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadIntradayMetaDataFailed implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_INTRADAY_METADATA_FAILED;

    constructor(public payload: string) { }
}

export class RestartTradewebExcelSheet implements Action {
    readonly type = DailyTrackingActionTypes.RESTART_TRADEWEB_EXCEL_SHEET;

    constructor(public payload: string) { }
}

export class RestartTradewebExcelSheetComplete implements Action {
    readonly type = DailyTrackingActionTypes.RESTART_TRADEWEB_EXCEL_SHEET_COMPLETE;

    constructor(public payload: any) { }
}

export class RestartTradewebExcelSheetFailed implements Action {
    readonly type = DailyTrackingActionTypes.RESTART_TRADEWEB_EXCEL_SHEET_FAILED;

    constructor(public payload: string) { }
}

export class ToggleSOFRSpreads implements Action {
    readonly type = DailyTrackingActionTypes.TOGGLE_SOFR_SPREADS;

    constructor(public payload: boolean) { }
}

export class ToggleLegacyMode implements Action {
    readonly type = DailyTrackingActionTypes.TOGGLE_LEGACY_MODE;

    constructor(public payload: boolean) { }
}

export class LoadHistoricalPlot implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_HISTORICAL_PLOT;

    constructor(public payload: fromModels.EODRequest) { }
}

export class LoadHistoricalPlotComplete implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_HISTORICAL_PLOT_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadHistoricalPlotFailed implements Action {
    readonly type = DailyTrackingActionTypes.LOAD_HISTORICAL_PLOT_FAILED;

    constructor(public payload: string) { }
}

export type DailyTrackingActions
    = LoadData
    | LoadDataSOFR
    | LoadDataComplete
    | LoadDataFailed

    | LoadHistoricalData
    | LoadHistoricalDataComplete
    | LoadHistoricalDataFailed

    | UpdateUserInputs
    | UpdateUserInputsComplete
    | UpdateUserInputsFailed

    | TakeSnapshot
    | TakeSnapshotComplete
    | TakeSnapshotFailed

    | ChangeMode

    | LoadOHLC
    | LoadOHLCComplete
    | LoadOHLCFailed

    | LoadMedianByTimeOfDay
    | LoadMedianByTimeOfDayComplete
    | LoadMedianByTimeOfDayFailed

    | RestartTradewebExcelSheet
    | RestartTradewebExcelSheetComplete
    | RestartTradewebExcelSheetFailed

    | LoadIntradayMetaData
    | LoadIntradayMetaDataComplete
    | LoadIntradayMetaDataFailed

    | LoadIntradayPlot
    | LoadIntradayPlotComplete
    | LoadIntradayPlotFailed

    | LoadHistoricalPlot
    | LoadHistoricalPlotComplete
    | LoadHistoricalPlotFailed

    | ToggleSOFRSpreads
    | ToggleLegacyMode;
