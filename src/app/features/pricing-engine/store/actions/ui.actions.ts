import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum UiActionTypes {
    GET_LATEST_PORTFOLIO_DATE = '[PricingEngine] Get latest portfolio date',
    GET_LATEST_PORTFOLIO_DATE_COMPLETE = '[Pricing Engine] Get latest portfolio date complete',
    GET_LATEST_PORTFOLIO_DATE_FAILED = '[Pricing Engine] Get latest portfolio date failed',
    UPDATE_SELECTED_DATE = '[PricingEngine] Update selected date',
    UPDATE_TIMESTAMP = '[PricingEngine] Update timestamp',
    UPDATE_LIVE_MODE = '[PricingEngine] Update live mode',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */

export class GetLatestPortfolioDate {
    readonly type = UiActionTypes.GET_LATEST_PORTFOLIO_DATE;
}

export class GetLatestPortfolioDateComplete {
    readonly type = UiActionTypes.GET_LATEST_PORTFOLIO_DATE_COMPLETE;
    constructor(public payload: string) {}
}

export class GetLatestPortfolioDateFailed {
    readonly type = UiActionTypes.GET_LATEST_PORTFOLIO_DATE_FAILED;
    constructor(public payload: string) {}
}

export class UpdateSelectedDate {
    readonly type = UiActionTypes.UPDATE_SELECTED_DATE;
    constructor(public payload: Date) {}
}

export class UpdateTimestamp {
    readonly type = UiActionTypes.UPDATE_TIMESTAMP;
    constructor(public payload: string) {}
}

export class UpdateLiveMode {
    readonly type = UiActionTypes.UPDATE_LIVE_MODE;
    constructor(public payload: boolean) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type UiActions
    = GetLatestPortfolioDate
    | GetLatestPortfolioDateComplete
    | GetLatestPortfolioDateFailed
    | UpdateSelectedDate
    | UpdateTimestamp
    | UpdateLiveMode
;
