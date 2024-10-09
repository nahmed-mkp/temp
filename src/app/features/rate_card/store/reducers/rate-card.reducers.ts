import * as fromActions from '../actions';
import * as fromModels from '../../models';
import moment from 'moment';
import { createReducer, on } from '@ngrx/store';


export interface State {

    groupingData: any;
    groupingDataLoading: boolean;
    groupingDataLoaded: boolean;
    groupingDataErorr? : string

    startDate: Date;
    endDate: Date;

    currencies: string[],
    selectedCurrencies: string[];

    secTypes: string[],
    selectedSecTypes: string[],

    rateByFundAndBucket: fromModels.IRateByFundAndBucket[];
    rateByFundAndBucketLoading: boolean;
    rateByFundAndBucketLoaded: boolean;
    rateByFundAndBucketError?: string;

    rateByFundAndSec: fromModels.IRateByFundAndSecurity[];
    rateByFundAndSecLoading: boolean;
    rateByFundAndSecLoaded: boolean;
    rateByFundAndSecError?: string;

    rateByEquity: fromModels.IRateByEquity[];
    rateByEquityLoading: boolean;
    rateByEquityLoaded: boolean;
    rateByEquityError?: string;

    rateCard: fromModels.IRateCard[];
    rateCardLoading: boolean;
    rateCardLoaded: boolean;
    rateCardError?: string;

    rateCardAdminFundSecTimeseriesData: fromModels.IRateCard[];
    rateCardAdminFundSecTimeseriesDataLoading: boolean;
    rateCardAdminFundSecTimeseriesDataLoaded: boolean;
    rateCardAdminFundSecTimeseriesDataError?: string;
    rateCardAdminFundSecName: string;
    
    rateCardAdminFundBucketTimeseriesData: fromModels.IRateCard[];
    rateCardAdminFundBucketTimeseriesDataLoading: boolean;
    rateCardAdminFundBucketTimeseriesDataLoaded: boolean;
    rateCardAdminFundBucketTimeseriesDataError?: string;
    rateCardAdminFundBucketSecName: string;

    rateCardTimeseriesData: fromModels.IRateCard[];
    rateCardTimeseriesDataLoading: boolean;
    rateCardTimeseriesDataLoaded: boolean;
    rateCardTimeseriesDataError?: string;
    rateCardTimeseriesSecName: string;

    rateCardSecurityEquityTimeseriesData: fromModels.IRateCard[];
    rateCardSecurityEquityTimeseriesDataLoading: boolean;
    rateCardSecurityEquityTimeseriesDataLoaded: boolean;
    rateCardSecurityEquityTimeseriesDataError?: string;
    rateCardSecurityEquityTimeseriesSecName: string;

    fundingCharges: fromModels.IFundingCharge[];
    fundingChargesLoading: boolean;
    fundingChargesLoaded: boolean;
    fundingChargesError?: string;
}

const initialState: State = {

    groupingData: null,
    groupingDataLoading: false,
    groupingDataLoaded: false,

    startDate: new Date(),
    endDate: new Date(),

    currencies: null,
    selectedCurrencies: ['USD'],
    
    secTypes: null,
    selectedSecTypes: ['GOVT', 'USTIPS', 'TBILL'],

    rateByFundAndBucket: null,
    rateByFundAndBucketLoading: false,
    rateByFundAndBucketLoaded: false,
    
    rateByFundAndSec: null,
    rateByFundAndSecLoading: false,
    rateByFundAndSecLoaded: false,

    rateByEquity: null,
    rateByEquityLoading: false,
    rateByEquityLoaded: false,

    rateCard: null,
    rateCardLoading: false,
    rateCardLoaded: false,
    
    rateCardAdminFundSecTimeseriesData: null,
    rateCardAdminFundSecTimeseriesDataLoading: false,
    rateCardAdminFundSecTimeseriesDataLoaded: false,
    rateCardAdminFundSecName: null,
    
    rateCardAdminFundBucketTimeseriesData: null,
    rateCardAdminFundBucketTimeseriesDataLoading: false,
    rateCardAdminFundBucketTimeseriesDataLoaded: false,
    rateCardAdminFundBucketSecName: null,

    rateCardTimeseriesData: null,
    rateCardTimeseriesDataLoading: false,
    rateCardTimeseriesDataLoaded: false,
    rateCardTimeseriesSecName: null,

    rateCardSecurityEquityTimeseriesData: null,
    rateCardSecurityEquityTimeseriesDataLoading: false,
    rateCardSecurityEquityTimeseriesDataLoaded: false,
    rateCardSecurityEquityTimeseriesSecName: null,

    fundingCharges: null,
    fundingChargesLoaded: false,
    fundingChargesLoading: false
};

export const reducer = createReducer(
   
    initialState,

    on(fromActions.loadGroupingData, (state, action) => {
        return {
            ...state,
            groupingDataLoading: true,
            groupingDataLoaded: false,
            groupingDataErorr: null
        }
    }),

    on(fromActions.loadGroupingDataComplete, (state, action) => {

        const primaryGroupingNameIdMaping: any = {
            CrossPodName: {},
            TradeGroup: {},
            TradeNameWithID: {},
            CrossFund: {},
            PortfolioBreakout: {},
            ExposureCurrency: {},
            ClientServicesTradeTheme: {},
            SecurityName: {},
            MacroTheme: {},
            ClientServicesThemeBreakdown: {},
            CountryOfRisk: {},
            SecurityNameExcludingCP: {},
        };

        action.res.forEach(item => {
            item.Id = '' + item.FundID + '|' + item.PodID + '|' + item.TID + '|' + item.SID;

            if (primaryGroupingNameIdMaping.CrossPodName[item.CrossPodName] === undefined) {
                primaryGroupingNameIdMaping.CrossPodName[item.CrossPodName] = item.CrossPodID;
            }

            if (primaryGroupingNameIdMaping.TradeGroup[item.TradeGroup] === undefined) {
                primaryGroupingNameIdMaping.TradeGroup[item.TradeGroup] = item.TGID;
            }

            if (primaryGroupingNameIdMaping.TradeNameWithID[item.TradeNameWithID] === undefined) {
                primaryGroupingNameIdMaping.TradeNameWithID[item.TradeNameWithID] = item.TID;
            }

            if (primaryGroupingNameIdMaping.CrossFund[item.CrossFund] === undefined) {
                primaryGroupingNameIdMaping.CrossFund[item.CrossFund] = item.CrossFundID;
            }

            if (primaryGroupingNameIdMaping.PortfolioBreakout[item.PortfolioBreakout] === undefined) {
                primaryGroupingNameIdMaping.PortfolioBreakout[item.PortfolioBreakout] = item.PortfolioBreakoutId;
            }

            if (primaryGroupingNameIdMaping.ExposureCurrency[item.ExposureCurrency] === undefined) {
                primaryGroupingNameIdMaping.ExposureCurrency[item.ExposureCurrency] = item.ExposureCurrencyId;
            }

            if (primaryGroupingNameIdMaping.SecurityName[item.SecurityName] === undefined) {
                primaryGroupingNameIdMaping.SecurityName[item.SecurityName] = item.SecurityNameId;
            }

            if (primaryGroupingNameIdMaping.MacroTheme[item.MacroTheme] === undefined) {
                primaryGroupingNameIdMaping.MacroTheme[item.MacroTheme] = item.MTID;
            }

            if (primaryGroupingNameIdMaping.ClientServicesThemeBreakdown[item.ClientServicesThemeBreakdown] === undefined) {
                primaryGroupingNameIdMaping.ClientServicesThemeBreakdown[item.ClientServicesThemeBreakdown] = item.CSTBID;
            }

            if (primaryGroupingNameIdMaping.ClientServicesTradeTheme[item.ClientServicesTradeTheme] === undefined) {
                primaryGroupingNameIdMaping.ClientServicesTradeTheme[item.ClientServicesTradeTheme] = item.CSTTID;
            }

            if (primaryGroupingNameIdMaping.CountryOfRisk[item.CountryOfRisk] === undefined) {
                primaryGroupingNameIdMaping.CountryOfRisk[item.CountryOfRisk] = item.CountryOfRiskId;
            }

            if (primaryGroupingNameIdMaping.SecurityNameExcludingCP[item.SecurityNameExcludingCP] === undefined) {
                primaryGroupingNameIdMaping.SecurityNameExcludingCP[item.SecurityNameExcludingCP] = item.SGID;
            }
        });

        return {
            ...state,
            groupingData: action.res,
            groupingDataLoading: false,
            groupingDataLoaded: true
        }
    }),

    on(fromActions.loadGroupingDataFailed, (state, action) => {
        return {
            ...state,
            groupingDataLoading: false,
            groupingDataLoaded: false,
            groupingDataErorr: action.err
        }
    }),

    // ============== CHANGE DATES ===============

    on(fromActions.changeStartDate, (state, action) => {
        return {
            ...state,
            startDate: action.date
        }
    }),

    on(fromActions.changeEndDate, (state, action) => {
        return {
            ...state,
            endDate: action.date
        }
    }),

    // ============== CURRENCIES ===============

    on(fromActions.changeSelectedCurrencies, (state, action) => {
        return {
            ...state,
            selectedCurrencies: action.selectedCurrencies
        }
    }),

    on(fromActions.changeSelectedSecTypes, (state, action) => {
        return {
            ...state,
            selectedSecTypes: action.selectedSecTypes
        }
    }),

    // ============== LOAD BY FUND AND SECURITY ===============

    on(fromActions.loadRateByFundAndSecurity, (state, action) => {
        return {
            ...state,
            rateByFundAndSecLoading: true,
            rateByFundAndSecLoaded: false,
            rateByFundAndSecError: null
        }
    }),

    on(fromActions.loadRateByFundAndSecurityComplete, (state, action) => {
        let payload:fromModels.IRateByFundAndSecurity[] = action.res;
        return {
            ...state,
            rateByFundAndSec: action.res,
            rateByFundAndSecLoading: false,
            rateByFundAndSecLoaded: true
        }
    }),

    on(fromActions.loadRateByFundAndSecurityFailed, (state, action) => {
        return {
            ...state,
            rateByFundAndSecLoading: false,
            rateByFundAndSecLoaded: false,
            rateByFundAndSecError: action.err
        }
    }),

    // ============== LOAD BY FUND AND BUCKET ===============

    on(fromActions.loadRateByFundAndBucket, (state, action) => {
        return {
            ...state,
            rateByFundAndBucketLoading: true,
            rateByFundAndBucketLoaded: false,
            rateByFundAndBucketError: null
        }
    }),

    on(fromActions.loadRateByFundAndBucketComplete, (state, action) => {
        return {
            ...state,
            rateByFundAndBucket: action.res,
            rateByFundAndBucketLoading: false,
            rateByFundAndBucketLoaded: true
        }
    }),

    on(fromActions.loadRateByFundAndBucketFailed, (state, action) => {
        return {
            ...state,
            rateByFundAndBucketLoading: false,
            rateByFundAndBucketLoaded: false,
            rateByFundAndBucketError: action.err
        }
    }),

    // ============== LOAD BY EQUITY ===============
    on(fromActions.loadRateByEquity, (state, action) => {
        return {
            ...state,
            rateByEquityLoading: true,
            rateByEquityLoaded: false,
            rateByEquityError: null
        }
    }),

    on(fromActions.loadRateByEquityComplete, (state, action) => {
        return {
            ...state,
            rateByEquity: action.res,
            rateByEquityLoading: false,
            rateByEquityLoaded: true
        }
    }),

    on(fromActions.loadRateByEquityFailed, (state, action) => {
        return {
            ...state,
            rateByEquityLoading: false,
            rateByEquityLoaded: false,
            rateByEquityError: action.err
        }
    }),

    on(fromActions.loadSecurityEquityTimeseriesData, (state, action) => {
        return {
            ...state,
            rateCardSecurityEquityTimeseriesDataLoading: true,
            rateCardSecurityEquityTimeseriesDataLoaded: false,
            rateCardSecurityEquityTimeseriesDataError: null,
            rateCardSecurityEquityTimeseriesSecName: action.payload.secName
        }
    }),

    on(fromActions.loadSecurityEquityTimeseriesDataComplete, (state, action) => {
        return {
            ...state,
            rateCardSecurityEquityTimeseriesData: action.res,
            rateCardSecurityEquityTimeseriesDataLoading: false,
            rateCardSecurityEquityTimeseriesDataLoaded: true
        }
    }),

    on(fromActions.loadSecurityEquityTimeseriesDataFailed, (state, action) => {
        return {
            ...state,
            rateCardSecurityEquityTimeseriesDataLoading: false,
            rateCardSecurityEquityTimeseriesDataLoaded: false,
            rateCardSecurityEquityTimeseriesDataError: action.err
        }
    }),

    // ============== LOAD RATE CARD ===============


    on(fromActions.loadRateCard, (state, action) => {
        return {
            ...state,
            rateCardLoading: true,
            rateCardLoaded: false,
            rateCardError: null
        }
    }),


    on(fromActions.loadRateCardComplete, (state, action) => {
        let secTypesArr = [];
        let currenciesArr = [];
        action.res.map( (row: fromModels.IRateCard) => {
            if(!secTypesArr.includes(row.SecurityType)){
                secTypesArr.push(row.SecurityType);
            }
            if(!currenciesArr.includes(row.Currency)){
                currenciesArr.push(row.Currency)
            }
        })
        return {
            ...state,
            rateCard: action.res,
            rateCardLoading: false,
            rateCardLoaded: true,
            currencies: currenciesArr,
            selectedCurrency: currenciesArr[0],
            secTypes: secTypesArr,
            selectedSecTypes: secTypesArr
        }
    }),

    on(fromActions.loadRateCardFailed, (state, action) => {
        return {
            ...state,
            rateCardLoading: false,
            rateCardLoaded: false,
            rateCardError: action.err
        }
    }),


 // ============== LOAD RATE CARD TIMESERIES DATA ===============


 on(fromActions.loadRateCardTimeseriesData, (state, action) => {
    return {
        ...state,
        rateCardTimeseriesDataLoading: true,
        rateCardTimeseriesDataLoaded: false,
        rateCardTimeseriesDataError: null,
        rateCardTimeseriesSecName: action.payload.secName
    }
}),


on(fromActions.loadRateCardTimeseriesDataComplete, (state, action) => {
    return {
        ...state,
        rateCardTimeseriesData: action.res,
        rateCardTimeseriesDataLoading: false,
        rateCardTimeseriesDataLoaded: true,
    }
}),

on(fromActions.loadRateCardTimeseriesDataFailed, (state, action) => {
    return {
        ...state,
        rateCardTimeseriesDataLoading: false,
        rateCardTimeseriesDataLoaded: false,
        rateCardTimeseriesDataError: action.err
    }
}),

// ============== LOAD RATE CARD ADMIN TIMESERIES FUND/BUCKET DATA ===============


 on(fromActions.loadRateCardAdminFundBucketTimeseriesData, (state, action) => {
    return {
        ...state,
        rateCardAdminFundBucketTimeseriesDataLoading: true,
        rateCardAdminFundBucketTimeseriesDataLoaded: false,
        rateCardAdminFundBucketTimeseriesDataError: null,
        rateCardAdminFundBucketSecName: action.payload.secName
    }
}),


on(fromActions.loadRateCardAdminFundBucketTimeseriesDataComplete, (state, action) => {
    return {
        ...state,
        rateCardAdminFundBucketTimeseriesData: action.res,
        rateCardAdminFundBucketTimeseriesDataLoading: false,
        rateCardAdminFundBucketTimeseriesDataLoaded: true,
    }
}),

on(fromActions.loadRateCardAdminFundBucketTimeseriesDataFailed, (state, action) => {
    return {
        ...state,
        rateCardAdminFundBucketTimeseriesDataLoading: false,
        rateCardAdminFundBucketTimeseriesDataLoaded: false,
        rateCardAdminFundBucketTimeseriesDataError: action.err
    }
}),


// ============== LOAD RATE CARD ADMIN TIMESERIES FUND/SEC DATA ===============


on(fromActions.loadRateCardAdminFundSecTimeseriesData, (state, action) => {
    return {
        ...state,
        rateCardAdminFundSecTimeseriesDataLoading: true,
        rateCardAdminFundSecTimeseriesDataLoaded: false,
        rateCardAdminFundSecTimeseriesDataError: null,
        rateCardAdminFundSecName: action.payload.secName
    }
}),


on(fromActions.loadRateCardAdminFundSecTimeseriesDataComplete, (state, action) => {
    return {
        ...state,
        rateCardAdminFundSecTimeseriesData: action.res,
        rateCardAdminFundSecTimeseriesDataLoading: false,
        rateCardAdminFundSecTimeseriesDataLoaded: true,
    }
}),

on(fromActions.loadRateCardAdminFundSecTimeseriesDataFailed, (state, action) => {
    return {
        ...state,
        rateCardAdminFundSecTimeseriesDataLoading: false,
        rateCardAdminFundSecTimeseriesDataLoaded: false,
        rateCardAdminFundSecTimeseriesDataError: action.err
    }
}),


// ============== LOAD FUNDING CHARGES ===============


    on(fromActions.loadFundingCharges, (state, action) => {
        return {
            ...state,
            fundingChargesLoading: true,
            fundingChargesLoaded: false,
            fundingChargesError: null
        }
    }),


    on(fromActions.loadFundingChargesComplete, (state, action) => {

        const primaryGroupingNameIdMaping: any = {
            fundName: {},
            // fundName: {'Macro': 2, 'Enhanced: 4}
            podName: {},
            // pod: {'Alpha Port': 12, 'Macro': 15}
            tradeName: {},
            // securityName: {},
        };

        action.res.forEach((item) => {
            item.ID = '' + item.FundID + '|' + item.PodID + '|' + item.TID + '|' + item.SID;

            if (primaryGroupingNameIdMaping.fundName[item.FundName] === undefined) {
                primaryGroupingNameIdMaping.fundName[item.FundName] = item.FundID;
            }

            if (primaryGroupingNameIdMaping.podName[item.PodName] === undefined) {
                primaryGroupingNameIdMaping.podName[item.PodName] = item.PodID;
            }

            if (primaryGroupingNameIdMaping.tradeName[item.TradeName] === undefined) {
                primaryGroupingNameIdMaping.tradeName[item.TradeName] = [item.TID];
            } else if (primaryGroupingNameIdMaping.tradeName[item.TradeName].indexOf(item.TID) === -1) {
                primaryGroupingNameIdMaping.tradeName[item.TradeName].push(item.TID);
            }

            // if (primaryGroupingNameIdMaping.securityName[item.securityName] === undefined) {
            //     primaryGroupingNameIdMaping.securityName[item.securityName] = item.sid;
            // }
        });

        const combineData = () => {
            return combinePositionAndGroupingData(action.res, state.groupingData);
        }

        combineData()

        return {
            ...state,
            fundingCharges: combineData(),
            fundingChargesLoading: false,
            fundingChargesLoaded: true
        }
    }),

    on(fromActions.loadFundingChargesFailed, (state, action) => {
        return {
            ...state,
            fundingChargesLoading: false,
            fundingChargesLoaded: false,
            fundingChargesError: action.err
        }
    })
)

function combinePositionAndGroupingData(positionData, groupingData) {

    if (positionData === undefined) {
        return [];
    }

    if (groupingData && groupingData.length > 0) {
        const groupingMaping: any = {};
        groupingData.forEach(element => { 
            return groupingMaping[element.Id] = element
        });

        const combineResult = positionData.map((element: fromModels.IFundingCharge) => {
            if (groupingMaping[element.ID]) {
                let el = groupingMaping[element.ID];
                let crossPodName = el['CrossPodName']
                let crossPodId = el['CrossPodID']
                let securityNameExcludingCP = el['SecurityNameExcludingCP']
                let crossFund = el['CrossFund'];
                let crossFundID = el['CrossFundID'];
                let clientServicesTradeTheme = el['ClientServicesTradeTheme']
                let enrichedObj = {
                    CrossPodID: crossPodId,
                    CrossPodName: crossPodName,
                    SecurityNameExcludingCP: securityNameExcludingCP,
                    CrossFund: crossFund,
                    CrossFundID: crossFundID,
                    ClientServicesTradeTheme: clientServicesTradeTheme,
                }
                return {...element, ...enrichedObj};
            } else {
                return element;
            }
        });
        return combineResult;
    } else {
        return positionData;
    }
}

export const getGroupingData = (state: State) => state.groupingData;
export const getGroupingDataLoading = (state: State) => state.groupingDataLoading;

export const getStartDate = (state: State) => state.startDate;
export const getEndDate = (state: State) => state.endDate; 

export const getCurrencies = (state: State) => state.currencies;
export const getSelectedCurrencies = (state: State) => state.selectedCurrencies;

export const getSecTypes = (state: State) => state.secTypes;
export const getSelectedSecTypes = (state: State) => state.selectedSecTypes;

export const getRateByFundAndSecurity = (state: State) => state.rateByFundAndSec;
export const getRateByFundAndSecurityLoading = (state: State) => state.rateByFundAndSecLoading;
export const getRateByFundAndSecurityLoaded = (state: State) => state.rateByFundAndSecLoaded;
export const getRateByFundAndSecurityError = (state: State) => state.rateByFundAndSecError;

export const getRateByFundAndBucket = (state: State) => state.rateByFundAndBucket;
export const getRateByFundAndBucketLoading = (state: State) => state.rateByFundAndBucketLoading;
export const getRateByFundAndBucketLoaded = (state: State) => state.rateByFundAndBucketLoaded;
export const getRateByFundAndBucketError = (state: State) => state.rateByFundAndBucketError;

export const getRateCard = (state: State) => state.rateCard;
export const getRateCardLoading = (state: State) => state.rateCardLoading;
export const getRateCardLoaded = (state: State) => state.rateCardLoaded;
export const getRateCardError = (state: State) => state.rateCardError;

export const getRateCardAdminFundBucketSecName = (state: State) => state.rateCardAdminFundBucketSecName;
export const getRateCardAdminFundBucketTimeseriesData = (state: State) => state.rateCardAdminFundBucketTimeseriesData;
export const getRateCardAdminFundBucketTimeseriesDataLoading = (state: State) => state.rateCardAdminFundBucketTimeseriesDataLoading;
export const getRateCardAdminFundBucketTimeseriesDataLoaded = (state: State) => state.rateCardAdminFundBucketTimeseriesDataLoaded;
export const getRateCardAdminFundBucketTimeseriesDataError = (state: State) => state.rateCardAdminFundBucketTimeseriesDataError;

export const getRateCardAdminFundSecName = (state: State) => state.rateCardAdminFundSecName;
export const getRateCardAdminFundSecTimeseriesData = (state: State) => state.rateCardAdminFundSecTimeseriesData;
export const getRateCardAdminFundSecTimeseriesDataLoading = (state: State) => state.rateCardAdminFundSecTimeseriesDataLoading;
export const getRateCardAdminFundSecTimeseriesDataLoaded = (state: State) => state.rateCardAdminFundSecTimeseriesDataLoaded;
export const getRateCardAdminFundSecTimeseriesDataError = (state: State) => state.rateCardAdminFundSecTimeseriesDataError;

export const getRateCardTimeseriesSecName = (state: State) => state.rateCardTimeseriesSecName;
export const getRateCardTimeseriesData = (state: State) => state.rateCardTimeseriesData;
export const getRateCardTimeseriesDataLoading = (state: State) => state.rateCardTimeseriesDataLoading;
export const getRateCardTimeseriesDataLoaded = (state: State) => state.rateCardTimeseriesDataLoaded;
export const getRateCardTimeseriesDataError = (state: State) => state.rateCardTimeseriesDataError;

export const getFundingCharges = (state: State) => state.fundingCharges;
export const getFundingChargesLoading = (state: State) => state.fundingChargesLoading;
export const getFundingChargesLoaded = (state: State) => state.fundingChargesLoaded;
export const getFundingChargesError = (state: State) => state.fundingChargesError;

export const getRateByEquity = (state: State) => state.rateByEquity;
export const getRateByEquityLoading = (state: State) => state.rateByEquityLoading;
export const getRateByEquityLoaded = (state: State) => state.rateByEquityLoaded;
export const getRateByEquityError = (state: State) => state.rateByEquityError;

export const getRateCardSecurityEquityTimeseriesSecName = (state: State) => state.rateCardSecurityEquityTimeseriesSecName;
export const getRateCardSecurityEquityTimeseriesData = (state: State) => state.rateCardSecurityEquityTimeseriesData;
export const getRateCardSecurityEquityTimeseriesDataLoading = (state: State) => state.rateCardSecurityEquityTimeseriesDataLoading;
export const getRateCardSecurityEquityTimeseriesDataLoaded = (state: State) => state.rateCardSecurityEquityTimeseriesDataLoaded;
export const getRateCardSecurityEquityTimeseriesDataError = (state: State) => state.rateCardSecurityEquityTimeseriesDataError;