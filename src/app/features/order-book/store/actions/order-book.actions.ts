import { Action } from '@ngrx/store';

import * as fromModels from './../../models/order-book.models';

export enum OrderBookActionTypes {

    LOAD_LOOKUPS = '[OrderBook] Load lookups',
    LOAD_LOOKUPS_COMPLETE = '[OrderBook] Load lookups complete',
    LOAD_LOOKUPS_FAILED = '[OrderBook] Load lookups failed',

    LOAD_ORDERS = '[OrderBook] Load Orders',
    LOAD_ORDERS_COMPLETE = '[OrderBook] Load Orders Complete',
    LOAD_ORDERS_FAILED = '[OrderBook] Load Orders Failed',
    LIVE_LOAD_ORDERS = '[OrderBook] Live Load Order',

    LOAD_ORDER_HISTORY = '[OrderBook] Load Order History',
    LOAD_ORDER_HISTORY_COMPLETE = '[OrderBook] Load Order History complete',
    LOAD_ORDER_HISTORY_FAILED = '[OrderBook] Load Order History failed',


    LOAD_ORDER_NOTES = '[OrderBook] Load Order notes',
    LOAD_ORDER_NOTES_COMPLETE = '[OrderBook] Load Order notes complete',
    LOAD_ORDER_NOTES_FAILED = '[OrderBook] Load Order notes failed',

    // CHECK_ORDER_LOCK_STATUS = '[OrderBook] Check order lock status',
    // CHECK_ORDER_LOCK_STATUS_COMPLETE = '[OrderBook] Check order lock status complete',
    // CHECK_ORDER_LOCK_STATUS_FAILED = '[OrderBook] Check order lock status failed',

    // LOCK_ORDER_FOR_EDITING = '[OrderBook] Lock order for editing',
    // LOCK_ORDER_FOR_EDITING_COMPLETE = '[OrderBook] Lock order for editing complete',
    // LOCK_ORDER_FOR_EDITING_FAILED = '[OrderBook] Lock order for editing failed',

    SEND_ORDER_BOOK_EMAIL = '[OrderBook] send order book email',
    SEND_ORDER_BOOK_EMAIL_COMPLETE = '[OrderBook] send order book email complete',
    SEND_ORDER_BOOK_EMAIL_FAILED = '[OrderBook] send order book email failed',



    // =============================================

    LOCK_ORDER = '[OrderBook] Lock order',
    LOCK_ORDER_COMPLETE = '[OrderBook] Lock order complete',
    LOCK_ORDER_FAILED = '[OrderBook] Lock order failed',

    START_EDIT_ORDER = '[OrderBook] start edit order',
    SAVE_ORDER = '[OrderBook] Save order',
    SAVE_ORDER_COMPLETE = '[OrderBook] Save order complete',
    SAVE_ORDER_FAILED = '[OrderBook] Save order failed',


    // ========================================================

    LOAD_SECURITY_MARKET_DATA = '[OrderBook] load security market data',
    LOAD_SECURITY_MARKET_DATA_COMPLETE = '[OrderBook] load security market data complete',
    LOAD_SECURITY_MARKET_DATA_FAILED = '[OrderBook] load security market data failed',

    LOAD_SECURITY_CURRENT_LEVEL = '[OrderBook] load security current level',
    LOAD_SECURITY_CURRENT_LEVEL_COMPLETE = '[OrderBook] load security current level complete',
    LOAD_SECURITY_CURRENT_LEVEL_FAILED = '[OrderBook] load security current level failed',
}

export class LoadLookups implements Action {
    readonly type = OrderBookActionTypes.LOAD_LOOKUPS;
}

export class LoadLookupsComplete implements Action {
    readonly type = OrderBookActionTypes.LOAD_LOOKUPS_COMPLETE;

    constructor(public payload: any) {}
}

export class LoadLookupsFailed implements Action {
    readonly type = OrderBookActionTypes.LOAD_LOOKUPS_FAILED;

    constructor(public payload: string) { }
}





export class LoadOrders implements Action {

    readonly type = OrderBookActionTypes.LOAD_ORDERS;

    constructor(public payload: fromModels.IOrderBookParams) { }
}

export class LoadOrdersComplete implements Action {

    readonly type = OrderBookActionTypes.LOAD_ORDERS_COMPLETE;

    constructor(public payload: fromModels.IOrder[]) { }
}

export class LoadOrdersFailed implements Action {

    readonly type = OrderBookActionTypes.LOAD_ORDERS_FAILED;

    constructor(public payload: string) { }
}

export class LiveLoadOrders implements Action {

    readonly type = OrderBookActionTypes.LIVE_LOAD_ORDERS;
}






export class LoadOrderHistory implements Action {

    readonly type = OrderBookActionTypes.LOAD_ORDER_HISTORY;

    constructor(public payload: number) { }
}

export class LoadOrderHistoryComplete implements Action {

    readonly type = OrderBookActionTypes.LOAD_ORDER_HISTORY_COMPLETE;

    constructor(public payload: fromModels.IOrderHistory[] | any) { }
}

export class LoadOrderHistoryFailed implements Action {

    readonly type = OrderBookActionTypes.LOAD_ORDER_HISTORY_FAILED;

    constructor(public payload: string) { }
}

export class LiveLoadOrderHistory implements Action {

    readonly type = OrderBookActionTypes.LOAD_ORDER_HISTORY;

    constructor(public payload: number) { }
}










export class LoadOrderNotes implements Action {

    readonly type = OrderBookActionTypes.LOAD_ORDER_NOTES;

    constructor(public payload: number) { }
}

export class LoadOrderNotesComplete implements Action {

    readonly type = OrderBookActionTypes.LOAD_ORDER_NOTES_COMPLETE;

    constructor(public payload: fromModels.IOrderHistory[]) { }
}

export class LoadOrderNotesFailed implements Action {

    readonly type = OrderBookActionTypes.LOAD_ORDER_NOTES_FAILED;

    constructor(public payload: string) { }
}





// export class CheckOrderLockStatus implements Action {

//     readonly type = OrderBookActionTypes.CHECK_ORDER_LOCK_STATUS;

//     constructor(public payload: number) { }
// }

// export class CheckOrderLockStatusComplete implements Action {

//     readonly type = OrderBookActionTypes.CHECK_ORDER_LOCK_STATUS_COMPLETE;

//     constructor(public payload: boolean) { }
// }

// export class CheckOrderLockStatusFailed implements Action {

//     readonly type = OrderBookActionTypes.CHECK_ORDER_LOCK_STATUS_FAILED;

//     constructor(public payload: string) { }
// }

// export class LockOrderForEditing implements Action {

//     readonly type = OrderBookActionTypes.LOCK_ORDER_FOR_EDITING;

//     constructor(public payload: number) { }
// }

// export class LockOrderForEditingComplete implements Action {

//     readonly type = OrderBookActionTypes.LOCK_ORDER_FOR_EDITING_COMPLETE;

//     constructor(public payload: fromModels.IOrder) { }
// }

// export class LockOrderForEditingFailed implements Action {

//     readonly type = OrderBookActionTypes.LOCK_ORDER_FOR_EDITING_FAILED;

//     constructor(public payload: string) { }
// }

export class SendOrderBookEmail implements Action {

    readonly type = OrderBookActionTypes.SEND_ORDER_BOOK_EMAIL;

    constructor(public payload: fromModels.ISendEmailReq) { }
}

export class SendOrderBookEmailComplete implements Action {

    readonly type = OrderBookActionTypes.SEND_ORDER_BOOK_EMAIL_COMPLETE;

}

export class SendOrderBookEmailFailed implements Action {

    readonly type = OrderBookActionTypes.SEND_ORDER_BOOK_EMAIL_FAILED;

    constructor(public payload: string) { }
}








export class LockOrder implements Action {
    readonly type = OrderBookActionTypes.LOCK_ORDER;

    constructor(public payload: fromModels.ILockOrderReq) {}
}

export class LockOrderComplete implements Action {
    readonly type = OrderBookActionTypes.LOCK_ORDER_COMPLETE;

    constructor(public payload: any) {}
}

export class LockOrderFailed implements Action {
    readonly type = OrderBookActionTypes.LOCK_ORDER_FAILED;

    constructor(public payload: string) { }
}




export class StartEditOrder implements Action {
    readonly type = OrderBookActionTypes.START_EDIT_ORDER;
}

export class SaveOrder implements Action {
    readonly type = OrderBookActionTypes.SAVE_ORDER;

    constructor(public payload: fromModels.ISaveOrderReq) {}
}

export class SaveOrderComplete implements Action {
    readonly type = OrderBookActionTypes.SAVE_ORDER_COMPLETE;

    constructor(public payload: any) {}
}

export class SaveOrderFailed implements Action {
    readonly type = OrderBookActionTypes.SAVE_ORDER_FAILED;

    constructor(public payload: string) { }
}








export class LoadSecurityMarketData implements Action {
    readonly type = OrderBookActionTypes.LOAD_SECURITY_MARKET_DATA;

    constructor(public payload: number) {}
}

export class LoadSecurityMarketDataComplete implements Action {
    readonly type = OrderBookActionTypes.LOAD_SECURITY_MARKET_DATA_COMPLETE;
}

export class LoadSecurityMarketDataFailed implements Action {
    readonly type = OrderBookActionTypes.LOAD_SECURITY_MARKET_DATA_FAILED;

    constructor(public payload: string) { }
}





export class LoadSecurityCurrentLevel implements Action {
    readonly type = OrderBookActionTypes.LOAD_SECURITY_CURRENT_LEVEL;

    constructor(public payload: number) {}
}

export class LoadSecurityCurrentLevelComplete implements Action {
    readonly type = OrderBookActionTypes.LOAD_SECURITY_CURRENT_LEVEL_COMPLETE;

    constructor(public payload: number) {}
}

export class LoadSecurityCurrentLevelFailed implements Action {
    readonly type = OrderBookActionTypes.LOAD_SECURITY_CURRENT_LEVEL_FAILED;

    constructor(public payload: string) { }
}





/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type OrderBookActions
    = LoadLookups
    | LoadLookupsComplete
    | LoadLookupsFailed

    | LoadOrders
    | LoadOrdersComplete
    | LoadOrdersFailed
    | LiveLoadOrders

    | LoadOrderHistory
    | LoadOrderHistoryComplete
    | LoadOrderHistoryFailed

    | LoadOrderNotes
    | LoadOrderNotesComplete
    | LoadOrderNotesFailed

    // | CheckOrderLockStatus
    // | CheckOrderLockStatusComplete
    // | CheckOrderLockStatusFailed

    // | LockOrderForEditing
    // | LockOrderForEditingComplete
    // | LockOrderForEditingFailed

    | SendOrderBookEmail
    | SendOrderBookEmailComplete
    | SendOrderBookEmailFailed

    | LockOrder
    | LockOrderComplete
    | LockOrderFailed

    | StartEditOrder
    | SaveOrder
    | SaveOrderComplete
    | SaveOrderFailed


    | LoadSecurityMarketData
    | LoadSecurityMarketDataComplete
    | LoadSecurityMarketDataFailed

    | LoadSecurityCurrentLevel
    | LoadSecurityCurrentLevelComplete
    | LoadSecurityCurrentLevelFailed
;
