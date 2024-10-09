import { Action } from '@ngrx/store';

import * as fromModels from './../../models';

/**
* For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum OptionVolsActionTypes {

    // UI action

    UPDATE_SELECTED_REQUEST_ID = '[OptionVols] update selected request id',
    ADD_REQUEST_ID= '[OptionVols] Add request id',
    DELETE_SELECTED_REQUEST_ID = '[OptionVols] Deleted selected request id',
    SET_ACTIVE_INDEX =  '[OptionVols] set active index',
    RELOAD_REQUEST = '[OptionVols] reload request',

    // Notify Support
    NOTIFY_SUPPORT = '[OptionVols] Notify support',
    NOTIFY_SUPPORT_COMPLETE = '[OptionVols] Notify support complete',
    NOTIFY_SUPPORT_FAILED = '[OptionVols] Notify support failed',

    // Preload Action

    LOAD_SUPPORTED_TICKERS = '[OptionVols] Load supported tickers',
    LOAD_SUPPORTED_TICKERS_COMPLETE = '[OptionVols] Load supported tickers complete',
    LOAD_SUPPORTED_TICKERS_FAILED = '[OptionVols] Load supported tickers failed',

    ADD_SUPPORTED_TICKERS = '[OptionVols] Add supported tickers',
    ADD_SUPPORTED_TICKERS_COMPLETE = '[OptionVols] Add supported tickers complete',
    ADD_SUPPORTED_TICKERS_FAILED = '[OptionVols] Add supported tickers failed',

    DELETE_SUPPORTED_TICKERS = '[OptionVols] Delete supported tickers',
    DELETE_SUPPORTED_TICKERS_COMPLETE = '[OptionVols] Delete supported tickers complete',
    DELETE_SUPPORTED_TICKERS_FAILED = '[OptionVols] Delete supported tickers failed',

    UPDATE_SUPPORTED_TICKERS = '[OptionVols] Update supported tickers',
    UPDATE_SUPPORTED_TICKERS_COMPLETE = '[OptionVols] Update supported tickers complete',
    UPDATE_SUPPORTED_TICKERS_FAILED = '[OptionVols] Update supported tickers failed',

    LOAD_FUTURES_MAPPING = '[OptionVols] Load futures mapping',
    LOAD_FUTURES_MAPPING_COMPLETE = '[OptionVols] Load futures mapping complete',
    LOAD_FUTURES_MAPPING_FAILED = '[OptionVols] Load futures mapping failed',

    ADD_FUTURES_MAPPING = '[OptionVols] Add futures mapping',
    ADD_FUTURES_MAPPING_COMPLETE = '[OptionVols] Add futures mapping complete',
    ADD_FUTURES_MAPPING_FAILED = '[OptionVols] Add futures mapping failed',

    DELETE_FUTURES_MAPPING = '[OptionVols] Delete futures mapping',
    DELETE_FUTURES_MAPPING_COMPLETE = '[OptionVols] Delete futures mapping complete',
    DELETE_FUTURES_MAPPING_FAILED = '[OptionVols] Delete futures mapping failed',

    UPDATE_FUTURES_MAPPING = '[OptionVols] Update futures mapping',
    UPDATE_FUTURES_MAPPING_COMPLETE = '[OptionVols] Update futures mapping complete',
    UPDATE_FUTURES_MAPPING_FAILED = '[OptionVols] Update futures mapping failed',

    LOAD_OPTION_CHAIN = '[OptionVols] Load option chain',
    LOAD_OPTION_CHAIN_COMPLETE = '[OptionVols] Load option chain complete',
    LOAD_OPTION_CHAIN_FAILED = '[OptionVols] Load option chain failed',

    LOAD_SIZING_CAPITALS = '[Sizing] Load sizing capitals',
    LOAD_SIZING_CAPITALS_COMPLETE = '[Sizing] Load sizing capitals complete',
    LOAD_SIZING_CAPITALS_FAILED = '[Sizing] Load sizing capitals failed',


    //  Analysis Action

    RUN_OPTION_VOL_ANALYSIS = '[OptionVols] Run option vols analysis',
    RUN_OPTION_VOL_ANALYSIS_COMPLETE = '[OptionVols] Run option vols analysis complete',
    RUN_OPTION_VOL_ANALYSIS_FAILED = '[OptionVols] Run option vols analysis failed',

    RUN_FX_OPTION_VOL_ANALYSIS = '[OptionVols] Run FX optoin vols analysis',
    RUN_FX_OPTION_VOL_ANALYSIS_COMPLETE = '[OptionVols] Run FX option vols analysis complete',
    RUN_FX_OPTION_VOL_ANALYSIS_FAILED = '[OptionVols] Run FX option vols analysis failed',

    GET_OPTION_VOL_ANALYSIS_LOGS = '[OptionVols] Get option vols analysis logs',
    GET_OPTION_VOL_ANALYSIS_LOGS_COMPLETE = '[OptionVols] Get option vols analysis logs complete',
    GET_OPTION_VOL_ANALYSIS_LOGS_FAILED = '[OptionVols] Get option vols analysis logs failed',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class UpdateSelectedRequestId implements Action {
    readonly type = OptionVolsActionTypes.UPDATE_SELECTED_REQUEST_ID;

    constructor(public payload: string) {}
}

export class AddRequestId implements Action {
    readonly type = OptionVolsActionTypes.ADD_REQUEST_ID;

    constructor(public payload: string) {}
}

export class DeletedSelectedRequestId implements Action {
    readonly type = OptionVolsActionTypes.DELETE_SELECTED_REQUEST_ID;

    constructor(public payload: string) {}
}

export class SetActiveIndex implements Action {
    readonly type = OptionVolsActionTypes.SET_ACTIVE_INDEX;

    constructor(public payload: number) {}
}

export class ReloadRequest implements Action {
    readonly type = OptionVolsActionTypes.RELOAD_REQUEST;

    constructor(public payload: string) {}
}

export class NotifySupport implements Action {
    readonly type = OptionVolsActionTypes.NOTIFY_SUPPORT;

    constructor(public payload: string) { }
}

export class NotifySupportComplete implements Action {
    readonly type = OptionVolsActionTypes.NOTIFY_SUPPORT_COMPLETE;

    constructor(public payload: any) { }
}

export class NotifySupportFailed implements Action {
    readonly type = OptionVolsActionTypes.NOTIFY_SUPPORT_FAILED;

    constructor(public payload: string) { }
}

export class LoadSupportedTickers implements Action {
    readonly type = OptionVolsActionTypes.LOAD_SUPPORTED_TICKERS;
}

export class LoadSupportedTickersComplete implements Action {
    readonly type = OptionVolsActionTypes.LOAD_SUPPORTED_TICKERS_COMPLETE;

    constructor(public payload: string[]) { }
}

export class LoadSupportedTickersFailed implements Action {
    readonly type = OptionVolsActionTypes.LOAD_SUPPORTED_TICKERS_FAILED;

    constructor(public payload: string) { }
}

export class AddSupportedTickers implements Action {
    readonly type = OptionVolsActionTypes.ADD_SUPPORTED_TICKERS;

    constructor(public payload: string) { }
}

export class AddSupportedTickersComplete implements Action {
    readonly type = OptionVolsActionTypes.ADD_SUPPORTED_TICKERS_COMPLETE;

    constructor(public payload: string[]) { }
}

export class AddSupportedTickersFailed implements Action {
    readonly type = OptionVolsActionTypes.ADD_SUPPORTED_TICKERS_FAILED;

    constructor(public payload: string) { }
}

export class DeleteSupportedTickers implements Action {
    readonly type = OptionVolsActionTypes.DELETE_SUPPORTED_TICKERS;

    constructor(public payload: string) { }
}

export class DeleteSupportedTickersComplete implements Action {
    readonly type = OptionVolsActionTypes.DELETE_SUPPORTED_TICKERS_COMPLETE;

    constructor(public payload: string[]) { }
}

export class DeleteSupportedTickersFailed implements Action {
    readonly type = OptionVolsActionTypes.DELETE_SUPPORTED_TICKERS_FAILED;

    constructor(public payload: string) { }
}

export class UpdateSupportedTickers implements Action {
    readonly type = OptionVolsActionTypes.UPDATE_SUPPORTED_TICKERS;

    constructor(public payload: {oldTicker: string; newTicker: string}) { }
}

export class UpdateSupportedTickersComplete implements Action {
    readonly type = OptionVolsActionTypes.UPDATE_SUPPORTED_TICKERS_COMPLETE;

    constructor(public payload: string[]) { }
}

export class UpdateSupportedTickersFailed implements Action {
    readonly type = OptionVolsActionTypes.UPDATE_SUPPORTED_TICKERS_FAILED;

    constructor(public payload: string) { }
}

export class LoadFuturesMapping implements Action {
    readonly type = OptionVolsActionTypes.LOAD_FUTURES_MAPPING;
}

export class LoadFuturesMappingComplete implements Action {
    readonly type = OptionVolsActionTypes.LOAD_FUTURES_MAPPING_COMPLETE;

    constructor(public payload: fromModels.IFutureMapping[]) { }
}

export class LoadFuturesMappingFailed implements Action {
    readonly type = OptionVolsActionTypes.LOAD_FUTURES_MAPPING_FAILED;

    constructor(public payload: string) { }
}

export class AddFuturesMapping implements Action {
    readonly type = OptionVolsActionTypes.ADD_FUTURES_MAPPING;

    constructor(public payload: fromModels.IFutureMapping) { }
}

export class AddFuturesMappingComplete implements Action {
    readonly type = OptionVolsActionTypes.ADD_FUTURES_MAPPING_COMPLETE;

    constructor(public payload: fromModels.IFutureMapping[] | any) { }
}

export class AddFuturesMappingFailed implements Action {
    readonly type = OptionVolsActionTypes.ADD_FUTURES_MAPPING_FAILED;

    constructor(public payload: string) { }
}

export class DeleteFuturesMapping implements Action {
    readonly type = OptionVolsActionTypes.DELETE_FUTURES_MAPPING;

    constructor(public payload: fromModels.IFutureMapping) { }
}

export class DeleteFuturesMappingComplete implements Action {
    readonly type = OptionVolsActionTypes.DELETE_FUTURES_MAPPING_COMPLETE;

    constructor(public payload: fromModels.IFutureMapping[] | any) { }
}

export class DeleteFuturesMappingFailed implements Action {
    readonly type = OptionVolsActionTypes.DELETE_FUTURES_MAPPING_FAILED;

    constructor(public payload: string) { }
}

export class UpdateFuturesMapping implements Action {
    readonly type = OptionVolsActionTypes.UPDATE_FUTURES_MAPPING;

    constructor(public payload: fromModels.IFutureMapping) { }
}

export class UpdateFuturesMappingComplete implements Action {
    readonly type = OptionVolsActionTypes.UPDATE_FUTURES_MAPPING_COMPLETE;

    constructor(public payload: fromModels.IFutureMapping[] | any) { }
}

export class UpdateFuturesMappingFailed implements Action {
    readonly type = OptionVolsActionTypes.UPDATE_FUTURES_MAPPING_FAILED;

    constructor(public payload: string) { }
}

export class LoadOptionChain implements Action {
    readonly type = OptionVolsActionTypes.LOAD_OPTION_CHAIN;

    constructor(public payload: fromModels.ITicker) { }
}

export class LoadOptionChainComplete implements Action {
    readonly type = OptionVolsActionTypes.LOAD_OPTION_CHAIN_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadOptionChainFailed implements Action {
    readonly type = OptionVolsActionTypes.LOAD_OPTION_CHAIN_FAILED;

    constructor(public payload: string) { }
}





export class LoadSizingCapitals implements Action {
    readonly type = OptionVolsActionTypes.LOAD_SIZING_CAPITALS;
}

export class LoadSizingCapitalsComplete implements Action {
    readonly type = OptionVolsActionTypes.LOAD_SIZING_CAPITALS_COMPLETE;

    constructor(public payload: fromModels.SizingCapital[]) {}
}

export class LoadSizingCapitalsFailed implements Action {
    readonly type = OptionVolsActionTypes.LOAD_SIZING_CAPITALS_FAILED;

    constructor(public payload: string) {}
}




















export class RunOptionVolAnalysis implements Action {
    readonly type = OptionVolsActionTypes.RUN_OPTION_VOL_ANALYSIS;

    constructor(public payload: fromModels.IOptionVolRequest) { }
}

export class RunOptionVolAnalysisComplete implements Action {
    readonly type = OptionVolsActionTypes.RUN_OPTION_VOL_ANALYSIS_COMPLETE;

    constructor(public payload: {guid: string, result: any}) { }
}

export class RunOptionVolAnalysisFailed implements Action {
    readonly type = OptionVolsActionTypes.RUN_OPTION_VOL_ANALYSIS_FAILED;

    constructor(public payload: {guid: string, message: string}) { }
}

export class RunFXOptionVolAnalysis implements Action {
    readonly type = OptionVolsActionTypes.RUN_FX_OPTION_VOL_ANALYSIS;

    constructor(public payload: fromModels.IOptionVolRequest) { }
}

export class RunFXOptionVolAnalysisComplete implements Action {
    readonly type = OptionVolsActionTypes.RUN_FX_OPTION_VOL_ANALYSIS_COMPLETE;

    constructor(public payload: { guid: string, result: any }) { }
}

export class RunFXOptionVolAnalysisFailed implements Action {
    readonly type = OptionVolsActionTypes.RUN_FX_OPTION_VOL_ANALYSIS_FAILED;

    constructor(public payload: { guid: string, message: string }) { }
}

export class GetOptionVolAnalysisLogs implements Action {
    readonly type = OptionVolsActionTypes.GET_OPTION_VOL_ANALYSIS_LOGS;

    constructor(public payload: string) { }
}

export class GetOptionVolAnalysisLogsComplete implements Action {
    readonly type = OptionVolsActionTypes.GET_OPTION_VOL_ANALYSIS_LOGS_COMPLETE;

    constructor(public payload: {guid: string, message: string}) { }
}

export class GetOptionVolAnalysisLogsFailed implements Action {
    readonly type = OptionVolsActionTypes.GET_OPTION_VOL_ANALYSIS_LOGS_FAILED;

    constructor(public payload: {guid: string, message: string}) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type OptionVolsActions
    = LoadSupportedTickers
    | LoadSupportedTickersComplete
    | LoadSupportedTickersFailed

    | AddSupportedTickers
    | AddSupportedTickersComplete
    | AddSupportedTickersFailed

    | DeleteSupportedTickers
    | DeleteSupportedTickersComplete
    | DeleteSupportedTickersFailed

    | UpdateSupportedTickers
    | UpdateSupportedTickersComplete
    | UpdateSupportedTickersFailed

    | LoadFuturesMapping
    | LoadFuturesMappingComplete
    | LoadFuturesMappingFailed

    | AddFuturesMapping
    | AddFuturesMappingComplete
    | AddFuturesMappingFailed

    | DeleteFuturesMapping
    | DeleteFuturesMappingComplete
    | DeleteFuturesMappingFailed

    | UpdateFuturesMapping
    | UpdateFuturesMappingComplete
    | UpdateFuturesMappingFailed

    | LoadOptionChain
    | LoadOptionChainComplete
    | LoadOptionChainFailed

    | LoadSizingCapitals
    | LoadSizingCapitalsComplete
    | LoadSizingCapitalsFailed

    | UpdateSelectedRequestId
    | AddRequestId
    | DeletedSelectedRequestId
    | SetActiveIndex
    | ReloadRequest

    | NotifySupport
    | NotifySupportComplete
    | NotifySupportFailed

    | RunOptionVolAnalysis
    | RunOptionVolAnalysisComplete
    | RunOptionVolAnalysisFailed

    | RunFXOptionVolAnalysis
    | RunFXOptionVolAnalysisComplete
    | RunFXOptionVolAnalysisFailed

    | GetOptionVolAnalysisLogs
    | GetOptionVolAnalysisLogsComplete
    | GetOptionVolAnalysisLogsFailed;


