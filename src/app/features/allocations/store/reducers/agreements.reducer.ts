import * as fromModels from './../../models/agreements.models';
import * as fromActions from './../actions/agreements.actions';
import uuidv1 from 'uuid/v1';

export interface State {

  agreementTypeIds: number[];
  agreementTypeEntities: {[id: number]: fromModels.ITradeAgreementType};
  agreementTypesLoaded: boolean;
  agreementTypesLoading: boolean;
  agreementTypesError?: string;

  selectedAgreementTypes: fromModels.ITradeAgreementType[];

  agreementIds: number[];
  agreementEntities: {[id: number]: fromModels.ITradeAgreement};
  agreementsLoaded: boolean;
  agreementsLoading: boolean;
  agreementsError?: string;
  agreementOriginData: any;

  agreementTypes: string[];
  agreementSecTypeEntities: {[type: string]: fromModels.ITradeAgreementSecType[]};
  agreementSecTypesLoading: boolean;
  agreementSecTypesLoaded: boolean;
  agreementSecTypesError?: string;

  fxGiveupAgreementIds: number[];
  fxGiveupAgreementEntities: {[id: number]: fromModels.IFXGiveupAgreement};

  allocationIds: number[];
  allocationEntities: {[id: number]: fromModels.ITradeAgreementAllocationCache};
  allocationCacheLoading: boolean;
  allocationCacheLoaded: boolean;
  allocationCacheError?: string;
}

const initialState: State = {
    agreementTypeIds: [],
    agreementTypeEntities: {},
    agreementTypesLoaded: false,
    agreementTypesLoading: false,

    selectedAgreementTypes: [],

    agreementIds: [],
    agreementEntities: {},
    agreementsLoaded: false,
    agreementsLoading: false,
    agreementOriginData: null,

    agreementTypes: [],
    agreementSecTypeEntities: {},
    agreementSecTypesLoading: false,
    agreementSecTypesLoaded: false,

    fxGiveupAgreementIds: [],
    fxGiveupAgreementEntities: {},

    allocationIds: [],
    allocationEntities: {},
    allocationCacheLoading: false,
    allocationCacheLoaded: false
};

export function reducer(state = initialState, action: fromActions.AgreementActions): State {
    switch (action.type) {

        case fromActions.AgreementActionTypes.LOAD_TRADE_AGREEMENT_TYPES: {
            return {
                ...state,
                agreementTypesLoading: true,
                agreementTypesLoaded: false,
                agreementTypesError: null
            };
        }

        case fromActions.AgreementActionTypes.LOAD_TRADE_AGREEMENT_TYPES_COMPLETE: {
            const payload = action.payload;
            const ids = payload.map((types) => types.id);
            const newEntities = payload.reduce((entities: {[id: number]: fromModels.ITradeAgreementType }, item: fromModels.ITradeAgreementType) => {
                return Object.assign({}, entities, {[item.id]: item});
            }, {});

            return {
                ...state,
                agreementTypeIds: [...ids],
                agreementTypeEntities: newEntities,
                agreementTypesLoading: false,
                agreementTypesLoaded: true
            };
        }

        case fromActions.AgreementActionTypes.LOAD_TRADE_AGREEMENT_TYPES_FAILED: {
            return {
                ...state,
                agreementTypesLoading: false,
                agreementTypesLoaded: false,
                agreementTypesError: action.payload
            };
        }

        case fromActions.AgreementActionTypes.LOAD_TRADE_AGREEMENT_SEC_TYPES: {
            return {
                ...state,
                agreementSecTypesLoading: true,
                agreementSecTypesLoaded: false,
                agreementSecTypesError: null
            };
        }

        case fromActions.AgreementActionTypes.LOAD_TRADE_AGREEMENT_SEC_TYPES_COMPLETE: {
            const payload = action.payload;
            const tradeAgreements = payload.map((item) => item.tradeAgreement);
            const uniqueAgreements = tradeAgreements.filter((agreement, idx) => tradeAgreements.indexOf(agreement) === idx);
            const agreementSecTypeEntities = payload.reduce((entities: {[id: string]: fromModels.ITradeAgreementSecType[]},
                item: fromModels.ITradeAgreementSecType) => {
                    const obj = Object.assign({}, entities);
                    if (obj[item.tradeAgreement] === undefined) {
                        obj[item.tradeAgreement] = [];
                    }
                    obj[item.tradeAgreement].push(item);
                    return obj;
                }, {});
            return {
                ...state,
                agreementTypes: [...uniqueAgreements],
                agreementSecTypeEntities: agreementSecTypeEntities,
                agreementSecTypesLoading: false,
                agreementSecTypesLoaded: true,
                agreementSecTypesError: null
            };
        }

        case fromActions.AgreementActionTypes.LOAD_TRADE_AGREEMENT_SEC_TYPES_FAILED: {
            return {
                ...state,
                agreementSecTypesLoading: false,
                agreementSecTypesLoaded: false,
                agreementSecTypesError: action.payload
            };
        }

        case fromActions.AgreementActionTypes.SELECT_AGREEMENT_TYPES: {
            return {
                ...state,
                selectedAgreementTypes: [...action.payload]
            };
        }

        case fromActions.AgreementActionTypes.CLEAR_AGREEMENT_TYPES: {
            return {
                ...state,
                selectedAgreementTypes: []
            };
        }



        case fromActions.AgreementActionTypes.LOAD_TRADE_AGREEMENTS: {
            return {
                ...state,
                agreementsLoading: true,
                agreementsLoaded: false,
                agreementsError: null
            };
        }

        case fromActions.AgreementActionTypes.LOAD_TRADE_AGREEMENTS_COMPLETE: {
            const payload = action.payload;
            const payloadWithoutFxGiveups = payload.filter((item) => !(item.tradeAgreement === 'FX_PB' && item.dealer.startsWith('F-')));
            const payloadWithFxGiveups = payload.filter((item) => item.tradeAgreement === 'FX_PB' && item.dealer.startsWith('F-'));

            const fxIds = payloadWithFxGiveups.map((types) => types.id);
            const fxEntities = payloadWithFxGiveups.reduce((entities: { [id: number]: fromModels.IFXGiveupAgreement }, item: fromModels.ITradeAgreement) => {
                const fxAgreement: fromModels.IFXGiveupAgreement = {
                    id: item.id,
                    fund: item.dealer,
                    allowedCustodians: item.custodian.split(',').map((val) => val.trim().toUpperCase())
                };
                return Object.assign({}, entities, { [item.id]: fxAgreement });
            }, {});

            const fxGiveupAgreements = fxIds.map((fxId) => fxEntities[fxId]);

            const ids = payloadWithoutFxGiveups.map((types) => types.id);
            const newEntities = payloadWithoutFxGiveups.reduce((entities: { [id: number]: fromModels.ITradeAgreement }, item: fromModels.ITradeAgreement) => {
                const itemCopy = Object.assign({}, item);
                itemCopy.recordId = uuidv1();
                if ('FX_PB' === item.tradeAgreement) {
                    const pbCustodians = item.custodian.split(',').map((custodian) => custodian.trim().toUpperCase());
                    itemCopy.alphaPortCanTrade = false;
                    itemCopy.enhancedOppCanTrade = false;
                    itemCopy.opportunityCanTrade = false;
                    itemCopy.ma7CanTrade = false;
                    itemCopy.selectCanTrade = false;
                    fxGiveupAgreements.forEach((fxGiveupAgreement) => {
                        for (const custodian of pbCustodians) {
                            if (fxGiveupAgreement.allowedCustodians.indexOf(custodian.toUpperCase()) >= 0) {
                                switch (fxGiveupAgreement.fund.toUpperCase()) {
                                    case 'F-ALPHA PORT':
                                        itemCopy.alphaPortCanTrade = true;
                                        break;
                                    case 'F-OPP FUND':
                                        itemCopy.opportunityCanTrade = true;
                                        break;
                                    case 'F-ENHANCED OPP':
                                        itemCopy.enhancedOppCanTrade = true;
                                        break;
                                    case 'F-EVERWOOD':
                                        itemCopy.ma7CanTrade = true;
                                        break;
                                    case 'F-SELECT':
                                        itemCopy.selectCanTrade = true;
                                        break;
                                }
                            }
                        }
                    });
                } else {
                    itemCopy.alphaPortCanTrade = itemCopy.alphaPort;
                    itemCopy.opportunityCanTrade = itemCopy.opportunity;
                    itemCopy.enhancedOppCanTrade = itemCopy.enhancedOpp;
                    itemCopy.ma7CanTrade = itemCopy.ma7;
                    itemCopy.selectCanTrade = itemCopy.select;
                }
                return Object.assign({}, entities, { [itemCopy.recordId]: itemCopy });
            }, {});

            return {
                ...state,
                agreementIds: [...ids],
                agreementEntities: newEntities,

                fxGiveupAgreementIds: [...fxIds],
                fxGiveupAgreementEntities: fxEntities,

                agreementsLoading: false,
                agreementsLoaded: true
            };
        }

        case fromActions.AgreementActionTypes.LOAD_TRADE_AGREEMENTS_FAILED: {
            return {
                ...state,
                agreementsLoading: false,
                agreementsLoaded: false,
                agreementsError: action.payload
            };
        }

        case fromActions.AgreementActionTypes.SAVE_AGREEMENT_GRID_ORIGIN_DATA: {

            const originDataCopy = JSON.parse(JSON.stringify(action.payload));
            return {
                ...state,
                agreementOriginData: originDataCopy
            };
        }

        case fromActions.AgreementActionTypes.ADD_TRADE_AGREEMENT:
        case fromActions.AgreementActionTypes.UPDATE_TRADE_AGREEMENT:
        case fromActions.AgreementActionTypes.DELETE_TRADE_AGREEMENT: {
            return {
                ...state,
                agreementsLoading: true,
                agreementsLoaded: false,
                agreementsError: null
            };
        }

        case fromActions.AgreementActionTypes.ADD_TRADE_AGREEMENT_COMPLETE:
        case fromActions.AgreementActionTypes.UPDATE_TRADE_AGREEMENT_COMPLETE: {
            const payload = action.payload;
            const existingIds = state.agreementIds.filter((id) => id !== payload.id);
            const newEntities = Object.assign({}, state.agreementEntities, {[payload.recordId]: payload});

            const originDataCopy = JSON.parse(JSON.stringify(Object.keys(newEntities).map(key => newEntities[key])));

            return {
                ...state,
                agreementIds: [...existingIds, payload.id],
                agreementEntities: newEntities,
                agreementsLoading: false,
                agreementsLoaded: true,

                agreementOriginData: originDataCopy
            };
        }

        case fromActions.AgreementActionTypes.DELETE_TRADE_AGREEMENT_COMPLETE: {
            const payload = action.payload;
            const existingIds = state.agreementIds.filter((id) => id !== payload.id);
            const newEntities = Object.assign({}, state.agreementEntities);
            delete newEntities[payload.recordId];

            const originDataCopy = JSON.parse(JSON.stringify(Object.keys(newEntities).map(key => newEntities[key])));

            return {
                ...state,
                agreementIds: [...existingIds],
                agreementEntities: newEntities,
                agreementsLoading: false,
                agreementsLoaded: true,

                agreementOriginData: originDataCopy
            };
        }

        case fromActions.AgreementActionTypes.ADD_TRADE_AGREEMENT_FAILED:
        case fromActions.AgreementActionTypes.UPDATE_TRADE_AGREEMENT_FAILED:
        case fromActions.AgreementActionTypes.DELETE_TRADE_AGREEMENT_FAILED: {
            return {
                ...state,
                agreementsLoading: false,
                agreementsLoaded: false,
                agreementsError: action.payload
            };
        }

        case fromActions.AgreementActionTypes.LOAD_TRADE_AGREEMENT_ALLOCATION_CACHE: {
            return {
                ...state,
                allocationCacheLoading: true,
                allocationCacheLoaded: false,
                allocationCacheError: null
            };
        }

        case fromActions.AgreementActionTypes.LOAD_TRADE_AGREEMENT_ALLOCATION_CACHE_COMPLETE: {
            const payload = action.payload;
            const ids = payload.map((item) => item.allocationId);
            const newEntities = payload.reduce((entities: {[id: number]: fromModels.ITradeAgreementAllocationCache},
                item: fromModels.ITradeAgreementAllocationCache) => {
                    return Object.assign({}, entities, { [item.allocationId]: item});

                }, {});
            return {
                ...state,
                allocationCacheLoading: false,
                allocationCacheLoaded: true,
                allocationIds: [...ids],
                allocationEntities: newEntities
            };
        }

        case fromActions.AgreementActionTypes.LOAD_TRADE_AGREEMENT_ALLOCATION_CACHE_FAILED: {
            return {
                ...state,
                allocationCacheLoading: false,
                allocationCacheLoaded: false,
                allocationCacheError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getAgreementTypeIds = (state: State) => state.agreementTypeIds;
export const getAgreementTypeEntities = (state: State) => state.agreementTypeEntities;
export const getAgreementTypesLoading = (state: State) => state.agreementTypesLoading;
export const getAgreementTypesLoaded = (state: State) => state.agreementTypesLoaded;
export const getAgreementTypesError = (state: State) => state.agreementTypesError;

export const getAgreementIds = (state: State) => state.agreementIds;
export const getAgreementEntities = (state: State) => state.agreementEntities;
export const getAgreementOriginData = (state: State) => state.agreementOriginData;

export const getFXGiveupAgreementIds = (state: State) => state.fxGiveupAgreementIds;
export const getFXGiveupAgreementEntities = (state: State) => state.fxGiveupAgreementEntities;

export const getAgreementsLoading = (state: State) => state.agreementsLoading;
export const getAgreementsLoaded = (state: State) => state.agreementsLoaded;
export const getAgreementsError = (state: State) => state.agreementsError;

export const getAgreementSecTypes = (state: State) => state.agreementTypes;
export const getAgreementSecTypeEntities = (state: State) => state.agreementSecTypeEntities;
export const getAgreementSecTypesLoading = (state: State) => state.agreementSecTypesLoading;
export const getAgreementSecTypesLoaded = (state: State) => state.agreementSecTypesLoaded;
export const getAgreementSecTypesError = (state: State) => state.agreementTypesError;

export const getSelectedAgreementTypes = (state: State) => state.selectedAgreementTypes;

export const getAllocationCacheIds = (state: State) => state.allocationIds;
export const getAllocationCacheEntities = (state: State) => state.allocationEntities;
export const getAllocationCacheLoadingStatus = (state: State) => state.allocationCacheLoading;
export const getAllocationCacheLoadedStatus = (state: State) => state.allocationCacheLoaded;
export const getAllocationCacheError = (state: State) => state.allocationCacheError;
