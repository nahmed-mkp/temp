import * as fromActions from '../actions/broker-bic-map.actions';
import * as fromModels from '../../models';

export interface BrokerState {

    activeBroker: string;

    brokerListEntity: {
        [id: string]: fromModels.IBroker
    };
    brokerListLoading: boolean;
    brokerListLoaded: boolean;
    brokerListError?: string;


    // brokerDetailEntity: {[id: string]: any};
    // brokerDetailLoadingEntity: {[id: string]: boolean};
    // brokerDetailLoadedEntity: {[id: string]: boolean};
    // brokerDetailErrorEntity: {[id: string]: string};

    brokerDetailUpdating: boolean;
    brokerDetailUpdated: boolean;
    brokerDetailUpdateError?: string;
}

export const initialState: BrokerState = {

    activeBroker: null,

    brokerListEntity: {},
    brokerListLoading: false,
    brokerListLoaded: false,

    // brokerDetailEntity: {},
    // brokerDetailLoadingEntity: {},
    // brokerDetailLoadedEntity: {},
    // brokerDetailErrorEntity: {},

    brokerDetailUpdating: false,
    brokerDetailUpdated: false,
    brokerDetailUpdateError: null,
};


export function reducer(state = initialState, action: fromActions.BrokerBicMapActions) {
    switch (action.type) {

        case fromActions.BrokerBicMapActionTypes.LOAD_BROKER_LIST: {
            return {
                ...state,
                brokerListLoading: true,
                brokerListLoaded: false,
                brokerListError: null,
            };
        }

        case fromActions.BrokerBicMapActionTypes.LOAD_BROKER_LIST_COMPLETE: {

            const newEntity = action.payload.reduce((entity, item) => {
                return Object.assign({}, entity, {[item.id]: item});
            }, {});
            return {
                ...state,
                brokerListEntity: newEntity,
                brokerListLoading: false,
                brokerListLoaded: true,
                brokerListError: null,
            };
        }

        case fromActions.BrokerBicMapActionTypes.LOAD_BROKER_LIST_FAILIED: {
            return {
                ...state,
                brokerListLoading: false,
                brokerListLoaded: false,
                brokerListError: action.payload,
            };
        }







        // case fromActions.BrokerBicMapActionTypes.LOAD_BROKER_DETAIL: {
        //     return {
        //         ...state,
        //         activeBroker: action.payload,
        //         brokerDetailLoadingEntity: {...state.brokerDetailLoadingEntity, [action.payload]: true},
        //         brokerDetailLoadedEntity: {...state.brokerDetailLoadedEntity, [action.payload]: false},
        //         brokerDetailErrorEntity: {...state.brokerDetailErrorEntity, [action.payload]: null}
        //     };
        // }

        // case fromActions.BrokerBicMapActionTypes.LOAD_BROKER_DETAIL_COMPLETE: {
        //     return {
        //         ...state,
        //         brokerDetailEntity: {...state.brokerDetailEntity, [action.payload.id]: action.payload.data},
        //         brokerDetailLoadingEntity: {...state.brokerDetailLoadingEntity, [action.payload.id]: false},
        //         brokerDetailLoadedEntity: {...state.brokerDetailLoadedEntity, [action.payload.id]: true},
        //         brokerDetailErrorEntity: {...state.brokerDetailErrorEntity, [action.payload.id]: null}
        //     };
        // }

        // case fromActions.BrokerBicMapActionTypes.LOAD_BROKER_DETAIL_FAILIED: {
        //     return {
        //         ...state,
        //         brokerDetailLoadingEntity: {...state.brokerDetailLoadingEntity, [action.payload.id]: false},
        //         brokerDetailLoadedEntity: {...state.brokerDetailLoadedEntity, [action.payload.id]: false},
        //         brokerDetailErrorEntity: {...state.brokerDetailErrorEntity, [action.payload.id]: action.payload.error}
        //     };
        // }








        case fromActions.BrokerBicMapActionTypes.UPDATE_BROKER_DETAIL: {
            return {
                ...state,
                brokerDetailUpdating: true,
                brokerDetailUpdated: false,
                brokerDetailUpdateError: null
            };
        }

        case fromActions.BrokerBicMapActionTypes.UPDATE_BROKER_DETAIL_COMPLETE: {
            return {
                ...state,
                brokerListEntity: {...state.brokerListEntity, [action.payload.id]: action.payload},
                brokerDetailUpdating: false,
                brokerDetailUpdated: true,
                brokerDetailUpdateError: null
            };
        }

        case fromActions.BrokerBicMapActionTypes.UPDATE_BROKER_DETAIL_FAILIED: {
            return {
                ...state,
                brokerDetailUpdating: false,
                brokerDetailUpdated: false,
                brokerDetailUpdateError: action.payload
            };
        }




        default:
            return state;
    }
}




export const getActiveBroker = (state: BrokerState) => state.activeBroker;

export const getBrokerListEntity = (state: BrokerState) => state.brokerListEntity;
export const getBrokerListLoading = (state: BrokerState) => state.brokerListLoading;
export const getBrokerListLoaded = (state: BrokerState) => state.brokerListLoaded;
export const getBrokerListError = (state: BrokerState) => state.brokerListError;

// export const getBrokerDetailEntity = (state: BrokerState) => state.brokerDetailEntity;
// export const getBrokerDetailLoadingEntity = (state: BrokerState) => state.brokerDetailLoadingEntity;
// export const getBrokerDetailLoadedEntity = (state: BrokerState) => state.brokerDetailLoadedEntity;
// export const getBrokerDetailErrorEntity = (state: BrokerState) => state.brokerDetailErrorEntity;

export const getBrokerDetailUpdating = (state: BrokerState) => state.brokerDetailUpdating;
export const getBrokerDetailUpdated = (state: BrokerState) => state.brokerDetailUpdated;
export const getBrokerDetailUpdateError = (state: BrokerState) => state.brokerDetailUpdateError;
