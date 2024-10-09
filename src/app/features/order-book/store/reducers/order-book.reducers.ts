import * as fromActions from './../actions/order-book.actions';
import * as fromModels from './../../models/order-book.models';

import * as moment from 'moment';

export interface State {

    params: fromModels.IOrderBookParams;

    lookups: any;
    lookupsLoading: boolean;
    lookupsLoaded: boolean;
    lookupsError?: string;

    orderIds: number[];
    orderEntities: {[id: number]: fromModels.IOrder};
    ordersLoading: boolean;
    ordersLoaded: boolean;
    ordersError?: string;

    selectedOrderId?: number;

    orderHistory: fromModels.IOrderHistory[];
    orderHistoryLoading: boolean;
    orderHistoryLoaded: boolean;
    orderHistoryError?: string;

    orderNotes: fromModels.IOrderHistory[];
    orderNotesLoading: boolean;
    orderNotesLoaded: boolean;
    orderNotesError?: string;

    orderEmailSending: boolean;
    orderEmailSended: boolean;
    orderEmailError?: string;


    // -------------------------------------------------------
    lockOrderPending: boolean;
    lockOrderFinished: boolean;
    lockOrderError?: string;

    saveOrderPending: boolean;
    saveOrderFinished: boolean;
    saveOrderError?: string;


    // ------------------------------------------------------
    securityMarketDataLoading: boolean;
    securityMarketDataLoaded: boolean;
    securityMarketDataError?: string;

    securityCurrentLevelLoading: boolean;
    securityCurrentLevelLoaded: boolean;
    securityCurrentLevelError?: string;
    securityCurrentLevel: number;
}

const currentDate = new Date();

const initialState: State = {

    params: null,

    lookups: null,
    lookupsLoading: false,
    lookupsLoaded: false,

    orderIds: [],
    orderEntities: {},
    ordersLoading: false,
    ordersLoaded: false,

    orderHistory: [],
    orderHistoryLoading: false,
    orderHistoryLoaded: false,

    orderNotes: [],
    orderNotesLoading: false,
    orderNotesLoaded: false,

    orderEmailSending: false,
    orderEmailSended: false,

    lockOrderPending: false,
    lockOrderFinished: false,
    
    saveOrderPending: false,
    saveOrderFinished: false,

    securityMarketDataLoading: false,
    securityMarketDataLoaded: false,

    securityCurrentLevelLoading: false,
    securityCurrentLevelLoaded: false,
    securityCurrentLevel: null,
};

export function reducer(state = initialState, action: fromActions.OrderBookActions): State {

    switch (action.type) {

        case fromActions.OrderBookActionTypes.LOAD_ORDERS: {
            return {
                ...state,
                params: action.payload,
                ordersLoading: true,
                ordersLoaded: false,
                ordersError: null
            };
        }

        case fromActions.OrderBookActionTypes.LOAD_LOOKUPS: {
            return {
                ...state,
                lookupsLoading: true,
                lookupsLoaded: false,
                lookupsError: null
            };
        }

        case fromActions.OrderBookActionTypes.LOAD_LOOKUPS_COMPLETE: {
            return {
                ...state,
                lookups: action.payload,
                lookupsLoading: false,
                lookupsLoaded: true,
            };
        }

        case fromActions.OrderBookActionTypes.LOAD_ORDERS_COMPLETE: {
            const payload = action.payload;
            const orderIds = action.payload.map((order) => order.orderId);
            const orderEntities = action.payload.reduce((entities: { [id: number]: fromModels.IOrder }, item: fromModels.IOrder) => {
                return Object.assign({}, entities, { [item.orderId]: item });
            }, {});

            return {
                ...state,
                orderIds: [...orderIds],
                orderEntities: orderEntities,
                ordersLoading: false,
                ordersLoaded: true
            };
        }

        case fromActions.OrderBookActionTypes.LOAD_ORDERS_FAILED: {
            return {
                ...state,
                ordersError: action.payload
            };
        }

        case fromActions.OrderBookActionTypes.LOAD_ORDERS: {
            return {
                ...state,
                // params: action.payload,

                orderIds: [],
                orderEntities: {},
                ordersLoading: true,
                ordersLoaded: false,
                ordersError: null
            };
        }

        case fromActions.OrderBookActionTypes.LOAD_ORDERS_COMPLETE: {
            const payload = action.payload;
            const orderIds = action.payload.map((order) => order.orderId);
            const orderEntities = action.payload.reduce((entities: { [id: number]: fromModels.IOrder}, item: fromModels.IOrder) => {
                return Object.assign({}, entities, {[item.orderId]: item});
            }, {});

            return {
                ...state,
                orderIds: [...orderIds],
                orderEntities: orderEntities,
                ordersLoading: false,
                ordersLoaded: true
            };
        }

        case fromActions.OrderBookActionTypes.LOAD_ORDERS_FAILED: {
            return {
                ...state,
                ordersError: action.payload
            };
        }

        case fromActions.OrderBookActionTypes.LOAD_ORDER_HISTORY: {
            return {
                ...state,
                selectedOrderId: action.payload,
                orderHistoryLoading: true,
                orderHistoryLoaded: false,
                orderHistoryError: null
            };
        }

        case fromActions.OrderBookActionTypes.LOAD_ORDER_HISTORY_COMPLETE: {
            return {
                ...state,
                orderHistory: [...action.payload],
                orderHistoryLoading: false,
                orderHistoryLoaded: true,
                orderHistoryError: null
            };
        }

        case fromActions.OrderBookActionTypes.LOAD_ORDER_HISTORY_FAILED: {
            return {
                ...state,
                orderHistoryLoading: false,
                orderHistoryLoaded: false,
                orderHistoryError: action.payload
            };
        }

        case fromActions.OrderBookActionTypes.LOAD_ORDER_NOTES: {
            return {
                ...state,
                orderNotesLoading: true,
                orderNotesLoaded: false,
                orderNotesError: null
            };
        }

        case fromActions.OrderBookActionTypes.LOAD_ORDER_NOTES_COMPLETE: {
            return {
                ...state,
                orderNotes: [...action.payload],
                orderNotesLoading: false,
                orderNotesLoaded: true,
                orderNotesError: null
            };
        }

        case fromActions.OrderBookActionTypes.LOAD_ORDER_HISTORY_FAILED: {
            return {
                ...state,
                orderNotesLoading: false,
                orderNotesLoaded: false,
                orderNotesError: action.payload
            };
        }





        case fromActions.OrderBookActionTypes.SEND_ORDER_BOOK_EMAIL: {
            return {
                ...state,
                orderEmailSending: true,
                orderEmailSended: false,
                orderEmailError: null,
            };
        }

        case fromActions.OrderBookActionTypes.SEND_ORDER_BOOK_EMAIL_COMPLETE: {
            return {
                ...state,
                orderEmailSending: false,
                orderEmailSended: true,
                orderEmailError: null,
            };
        }

        case fromActions.OrderBookActionTypes.SEND_ORDER_BOOK_EMAIL_FAILED: {
            return {
                ...state,
                orderEmailSending: false,
                orderEmailSended: false,
                orderEmailError: action.payload,
            };
        }



        // --------------------------------------------------------------------------------

        case fromActions.OrderBookActionTypes.LOCK_ORDER: {
            return {
                ...state,
                lockOrderPending: true,
                lockOrderFinished: false,
                lockOrderError: null,
            }
        }

        case fromActions.OrderBookActionTypes.LOCK_ORDER_COMPLETE: {
            return {
                ...state,
                lockOrderPending: false,
                lockOrderFinished: true,
                lockOrderError: null,
            }
        }

        case fromActions.OrderBookActionTypes.LOCK_ORDER_FAILED: {
            return {
                ...state,
                lockOrderPending: false,
                lockOrderFinished: false,
                lockOrderError: action.payload,
            }
        }




        case fromActions.OrderBookActionTypes.SAVE_ORDER: {
            return {
                ...state,
                saveOrderPending: true,
                saveOrderFinished: false,
                saveOrderError: null,
            }
        }

        case fromActions.OrderBookActionTypes.SAVE_ORDER_COMPLETE: {
            return {
                ...state,
                saveOrderPending: false,
                saveOrderFinished: true,
                saveOrderError: null,
            }
        }

        case fromActions.OrderBookActionTypes.SAVE_ORDER_FAILED: {
            return {
                ...state,
                saveOrderPending: false,
                saveOrderFinished: false,
                saveOrderError: action.payload,
            }
        }







        case fromActions.OrderBookActionTypes.LOAD_SECURITY_MARKET_DATA: {
            return {
                ...state,
                securityMarketDataLoading: true,
                securityMarketDataLoaded: false,
                securityMarketDataError: null,
            }
        }

        case fromActions.OrderBookActionTypes.LOAD_SECURITY_MARKET_DATA_COMPLETE: {
            return {
                ...state,
                securityMarketDataLoading: false,
                securityMarketDataLoaded: true,
                securityMarketDataError: null,
            }
        }

        case fromActions.OrderBookActionTypes.LOAD_SECURITY_MARKET_DATA_FAILED: {
            return {
                ...state,
                securityMarketDataLoading: false,
                securityMarketDataLoaded: false,
                securityMarketDataError: action.payload,
            }
        }








        case fromActions.OrderBookActionTypes.LOAD_SECURITY_CURRENT_LEVEL: {
            return {
                ...state,
                securityMarketDataLoading: true,
                securityMarketDataLoaded: false,
                securityMarketDataError: null,
                securityCurrentLevel: null
            }
        }

        case fromActions.OrderBookActionTypes.LOAD_SECURITY_CURRENT_LEVEL_COMPLETE: {
            return {
                ...state,
                securityMarketDataLoading: false,
                securityMarketDataLoaded: true,
                securityMarketDataError: null,
                securityCurrentLevel: action.payload,
            }
        }

        case fromActions.OrderBookActionTypes.LOAD_SECURITY_CURRENT_LEVEL_FAILED: {
            return {
                ...state,
                securityMarketDataLoading: false,
                securityMarketDataLoaded: false,
                securityMarketDataError: action.payload,
                securityCurrentLevel: null
            }
        }
















        default: {
            return state;
        }
    }
}

export const getOrderBookParams = (state: State) => state.params;

export const getLookups = (state: State) => state.lookups;
export const getLookupsLoading = (state: State) => state.lookupsLoading;
export const getLookupsLoaded = (state: State) => state.lookupsLoaded;
export const getLookupsError = (state: State) => state.lookupsError;

export const getOrderIds = (state: State) => state.orderIds;
export const getOrderEntities = (state: State) => state.orderEntities;
export const getOrdersLoading = (state: State) => state.ordersLoading;
export const getOrdersLoaded = (state: State) => state.ordersLoaded;
export const getOrdersError = (state: State) => state.ordersError;

export const getSelectedOrderId = (state: State) => state.selectedOrderId;

export const getOrderHistory = (state: State) => state.orderHistory;
export const getOrderHistoryLoading = (state: State) => state.orderHistoryLoading;
export const getOrderHistoryLoaded = (state: State) => state.orderHistoryLoaded;
export const getOrderHistoryError = (state: State) => state.orderHistoryError;

export const getOrderNotes = (state: State) => state.orderNotes;
export const getOrderNotesLoading = (state: State) => state.orderNotesLoading;
export const getOrderNotesLoaded = (state: State) => state.orderNotesLoaded;
export const getOrderNotesError = (state: State) => state.orderNotesError;

export const getOrderEmailSending = (state: State) => state.orderEmailSending;
export const getOrderEmailSended = (state: State) => state.orderEmailSended;
export const getOrderEmailError = (state: State) => state.orderEmailError;


export const getLockOrderPending = (state: State) => state.lockOrderPending;
export const getlockOrderFinished = (state: State) => state.lockOrderFinished;
export const getLockOrderError = (state: State) => state.lockOrderError;

export const getSaveOrderPending = (state: State) => state.saveOrderPending;
export const getSaveOrderFinished = (state: State) => state.saveOrderFinished;
export const getSaveOrderError = (state: State) => state.saveOrderError;


export const getSecurityMarketDataLoading = (state: State) => state.securityMarketDataLoading;
export const getSecurityMarketDataLoaded = (state: State) => state.securityMarketDataLoaded;
export const getSecurityMarketDataError = (state: State) => state.securityMarketDataError;

export const getSecurityCurrentLevel = (state: State) => state.securityCurrentLevel;
export const getSecurityCurrentLevelLoading = (state: State) => state.securityCurrentLevelLoading;
export const getSecurityCurrentLevelLoaded = (state: State) => state.securityCurrentLevelLoaded;
export const getSecurityCurrentLevelError = (state: State) => state.securityCurrentLevelError;
