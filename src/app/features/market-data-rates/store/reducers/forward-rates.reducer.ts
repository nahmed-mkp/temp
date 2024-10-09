import * as fromActions from '../actions/forward-rates.action';
import * as _ from 'lodash';

export interface State {
    forwardRates: any;
    forwardRatesLoading: boolean;
    forwardRatesLoaded: boolean;
    forwardRatesError?: string;

    centralBankOISRateEntity: {[date: string]: any};
    centralBankOISRateGroups: {[date: string]: string[]};

    forwardSwapRateEntity: {[date: string]: any};
    forwardSwapRateGroups: {[date: string]: string[]};

    oisYEPricingEntity: {[date: string]: any};
    oisYEPricingGroups: {[date: string]: string[]};

    oisQEForecastEntity: {[date: string]: any};
    oisQEForecastGroups: { [date: string]: string[]};

    timestamp: any;
}

const initialState: State = {
    forwardRates: null,
    forwardRatesLoading: false,
    forwardRatesLoaded: false,

    centralBankOISRateEntity: null,
    centralBankOISRateGroups: null,

    forwardSwapRateEntity: null,
    forwardSwapRateGroups: null,

    oisYEPricingEntity: null,
    oisYEPricingGroups: null,

    oisQEForecastEntity: null,
    oisQEForecastGroups: null,

    timestamp: null,
};

export function reducer(state = initialState, action: fromActions.ForwardRatesActions): State {

    switch (action.type) {

        case fromActions.ForwardRatesActionTypes.LOAD_FORWARD_RATES_ADVANCE:
        case fromActions.ForwardRatesActionTypes.LOAD_FORWARD_RATES: {
            return {
                ...state,
                forwardRatesLoading: true,
                forwardRatesLoaded: false,
                forwardRatesError: null
            };
        }

        case fromActions.ForwardRatesActionTypes.LOAD_FORWARD_RATES_COMPLETE: {
            const targetDate = action.payload.date;
            const result = action.payload.result;

            const centralBankOISRateEntity_new = _.groupBy(result['centralBankOISRates'], 'header');
            const centralBankOISRateGroups_new = Object.keys(centralBankOISRateEntity_new);

            const forwardSwapRateEntity_new = _.groupBy(result['forwardSwapRates'], 'benchmark');
            const forwardSwapRateGroups_new = Object.keys(forwardSwapRateEntity_new);

            const oisYEPricingEntity_new = _.groupBy(result['oisYEPricing'], 'header');
            const oisYEPricingGroups_new = Object.keys(oisYEPricingEntity_new);

            const oisQEForecastEntity_new = _.groupBy(result['oisQEForecast'], 'Header');
            const oisQEForecastGroups_new = Object.keys(oisQEForecastEntity_new);

            const timestamp = result['timestamp'];

            return {
                ...state,
                forwardRates: result,
                forwardRatesLoading: false,
                forwardRatesLoaded: true,
                forwardRatesError: null,

                centralBankOISRateEntity: {
                    ...state.centralBankOISRateEntity,
                    [targetDate]: centralBankOISRateEntity_new
                },
                centralBankOISRateGroups: {
                    ...state.centralBankOISRateGroups,
                    [targetDate]: centralBankOISRateGroups_new
                },

                forwardSwapRateEntity: {
                    ...state.forwardSwapRateEntity,
                    [targetDate]: forwardSwapRateEntity_new
                },
                forwardSwapRateGroups: {
                    ...state.forwardSwapRateGroups,
                    [targetDate]: forwardSwapRateGroups_new
                },
                oisYEPricingEntity: {
                    ...state.oisYEPricingEntity,
                    [targetDate]: oisYEPricingEntity_new
                },
                oisYEPricingGroups: {
                    ...state.oisYEPricingGroups,
                    [targetDate]: oisYEPricingGroups_new
                },
                oisQEForecastEntity: {
                    ...state.oisQEForecastEntity,
                    [targetDate]: oisQEForecastEntity_new
                },
                oisQEForecastGroups: {
                    ...state.oisQEForecastGroups,
                    [targetDate]: oisQEForecastGroups_new
                },

                timestamp: {
                    ...state.timestamp,
                    [targetDate]: timestamp
                }
            };
        }

        case fromActions.ForwardRatesActionTypes.LOAD_FORWARD_RATES_FAILED: {
            return {
                ...state,
                forwardRatesLoading: false,
                forwardRatesLoaded: false,
                forwardRatesError: action.payload
            };
        }





        case fromActions.ForwardRatesActionTypes.UPDATE_GROUP_ORDER: {
            return {
                ...state,
                [action.payload.type]: action.payload.result
            };
        }

        default: {
            return state;
        }
    }
}

export const getForwardRate = (state: State) => state.forwardRates;
export const getForwardRateLoadingStatus = (state: State) => state.forwardRatesLoading;
export const getForwardRateLoadedStatus = (state: State) => state.forwardRatesLoaded;
export const getForwardRateError = (state: State) => state.forwardRatesError;

export const getCentralBankOISRateEntity = (state: State) => state.centralBankOISRateEntity;
export const getCentralBankOISRateGroups = (state: State) => state.centralBankOISRateGroups;

export const getForwardSwapRateEntity = (state: State) => state.forwardSwapRateEntity;
export const getForwardSwapRateGroups = (state: State) => state.forwardSwapRateGroups;

export const getOisYEPricingEntity = (state: State) => state.oisYEPricingEntity;
export const getOisYEPricingGroups = (state: State) => state.oisYEPricingGroups;

export const getOisQEForecastEntity = (state: State) => state.oisQEForecastEntity;
export const getOisQEForecastGroups = (state: State) => state.oisQEForecastGroups;

export const getTimestamp = (state: State) => state.timestamp;
