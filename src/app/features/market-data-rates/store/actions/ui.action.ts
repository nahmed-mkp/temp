
/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */

export enum UiActionTypes {

    SET_SELECTED_DATE = '[Market Data Rates] set selective date',
    SET_LAYOUT_MODE = '[Market Data Rates] set layout mode',
    SELECT_FUTURES_TICKER = '[Market Data Rates] Set Futures ticker',

    TOGGLE_DEV_MODE = '[Market Data Rates] Toggle dev mode',
}

export class SetSelectiveDate {
    readonly type = UiActionTypes.SET_SELECTED_DATE;

    constructor(public payload: Date) {}
}

export class SetLayoutMode {
    readonly type = UiActionTypes.SET_LAYOUT_MODE;

    constructor(public payload: 'spread' | 'compact') {}
}

export class SelectFuturesTicker {
    readonly type = UiActionTypes.SELECT_FUTURES_TICKER;

    constructor(public payload: 'TY' | 'FV' | 'TU' | 'WN') {}
}

export class ToggleDevMode {
    readonly type = UiActionTypes.TOGGLE_DEV_MODE;
}

export type UiActions
    = SetSelectiveDate
    | SetLayoutMode
    | SelectFuturesTicker
    | ToggleDevMode;
