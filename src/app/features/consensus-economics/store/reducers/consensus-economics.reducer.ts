import * as fromActions from './../actions';
import * as fromModels from '../../models';

export interface ConsenusEconomicsDataState {

    extractionDates: string[];
    extractionDatesLoading: boolean;
    extractionDatesLoaded: boolean;
    extractionDatesError?: string;

    annualExtractions: fromModels.IExtractionDataAnnual[];
    annualExtractionsLoading: boolean;
    annualExtractionsLoaded: boolean;
    annualExtractionsError?: string;

    quarterlyExtractions: fromModels.IExtractionDataQuarterly[];
    quarterlyExtractionsLoading: boolean;
    quarterlyExtractionsLoaded: boolean;
    quarterlyExtractionsError?: string;

    constituentDates: string[];
    constituentDatesLoading: boolean;
    constituentDatesLoaded: boolean;
    constituentDatesError?: string;

    annualConstituents: fromModels.IConstituentDataAnnual[];
    annualConstituentsLoading: boolean;
    annualConstituentsLoaded: boolean;
    annualConstituentsError?: string;

    quarterlyConstituents: fromModels.IConstituentDataQuarterly[];
    quarterlyConstituentsLoading: boolean;
    quarterlyConstituentsLoaded: boolean;
    quarterlyConstituentsError?: string;
}

export const initialState = {
    extractionDates: [],
    extractionDatesLoading: false,
    extractionDatesLoaded: false,

    annualExtractions: [],
    annualExtractionsLoading: false,
    annualExtractionsLoaded: false,

    quarterlyExtractions: [],
    quarterlyExtractionsLoading: false,
    quarterlyExtractionsLoaded: false,

    constituentDates: [],
    constituentDatesLoading: false,
    constituentDatesLoaded: false,

    annualConstituents: [],
    annualConstituentsLoading: false,
    annualConstituentsLoaded: false,

    quarterlyConstituents: [],
    quarterlyConstituentsLoading: false,
    quarterlyConstituentsLoaded: false
};

export function reducer(state = initialState, action: fromActions.ConsensusEconomicsActions) {
    switch (action.type) {

        case fromActions.ConsensusEconomicsActionTypes.LOAD_EXTRACTION_DATES: {
            return {
                ...state,
                extractionDatesLoading: true,
                extractionDatesLoaded: false,
                extractionDatesError: null
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_EXTRACTION_DATES_COMPLETE: {
            return {
                ...state,
                extractionDatesLoading: false,
                extractionDatesLoaded: true,
                extractionDates: [...action.payload]
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_EXTRACTION_DATES_FAILED: {
            return {
                ...state,
                extractionDatesLoading: false,
                extractionDatesLoaded: false,
                extractionDatesError: action.payload
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_ANNUAL_EXTRACTIONS: {
            return {
                ...state,
                annualExtractionsLoading: true,
                annualExtractionsLoaded: false,
                annualExtractionsError: null
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_ANNUAL_EXTRACTIONS_COMPLETE: {
            return {
                ...state,
                annualExtractionsLoading: false,
                annualExtractionsLoaded: true,
                annualExtractions: [...action.payload]
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_ANNUAL_EXTRACTIONS_FAILED: {
            return {
                ...state,
                annualExtractionsLoading: false,
                annualExtractionsLoaded: true,
                annualExtractionsError: action.payload
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_QUARTERLY_EXTRACTIONS: {
            return {
                ...state,
                quarterlyExtractionsLoading: true,
                quarterlyExtractionsLoaded: false,
                quarterlyExtractionsError: null
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_QUARTERLY_EXTRACTIONS_COMPLETE: {
            return {
                ...state,
                quarterlyExtractionsLoading: false,
                quarterlyExtractionsLoaded: true,
                quarterlyExtractions: [...action.payload]
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_QUARTERLY_EXTRACTIONS_FAILED: {
            return {
                ...state,
                quarterlyExtractionsLoading: false,
                quarterlyExtractionsLoaded: true,
                quarterlyExtractionsError: action.payload
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_CONSTITUENTS_DATES: {
            return {
                ...state,
                constituentDatesLoading: true,
                constituentDatesLoaded: false,
                constituentDatesError: null
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_CONSTITUENTS_DATES_COMPLETE: {
            return {
                ...state,
                constituentDatesLoading: false,
                constituentDatesLoaded: true,
                constituentDates: [...action.payload]
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_CONSTITUENTS_DATES_FAILED: {
            return {
                ...state,
                constituentDatesLoading: false,
                constituentDatesLoaded: false,
                constituentDatesError: action.payload
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_ANNUAL_CONSTITUENTS: {
            return {
                ...state,
                annualConstituentsLoading: true,
                annualConstituentsLoaded: false,
                annualConstituentsError: null
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_ANNUAL_CONSTITUENTS_COMPLETE: {
            return {
                ...state,
                annualConstituentsLoading: false,
                annualConstituentsLoaded: true,
                annualConstituents: [...action.payload]
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_ANNUAL_CONSTITUENTS_FAILED: {
            return {
                ...state,
                annualConstituentsLoading: false,
                annualConstituentsLoaded: true,
                annualConstituentsError: action.payload
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_QUARTERLY_CONSTITUENTS: {
            return {
                ...state,
                quarterlyConstituentsLoading: true,
                quarterlyConstituentsLoaded: false,
                quarterlyConstituentsError: null
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_QUARTERLY_CONSTITUENTS_COMPLETE: {
            return {
                ...state,
                quarterlyConstituentsLoading: false,
                quarterlyConstituentsLoaded: true,
                quarterlyConstituents: [...action.payload]
            };
        }

        case fromActions.ConsensusEconomicsActionTypes.LOAD_QUARTERLY_CONSTITUENTS_FAILED: {
            return {
                ...state,
                quarterlyConstituentsLoading: false,
                quarterlyConstituentsLoaded: true,
                quarterlyConstituentsError: action.payload
            };
        }

        default:
            return state;
    }
}

export const getExtractionDates = (state: ConsenusEconomicsDataState) => state.extractionDates;
export const getExtractionDatesLoading = (state: ConsenusEconomicsDataState) => state.extractionDatesLoading;
export const getExtractionDatesLoaded = (state: ConsenusEconomicsDataState) => state.extractionDatesLoaded;
export const getExtractionDatesError = (state: ConsenusEconomicsDataState) => state.extractionDatesError;

export const getAnnualExtractions = (state: ConsenusEconomicsDataState) => state.annualExtractions;
export const getAnnualExtractionsLoading = (state: ConsenusEconomicsDataState) => state.annualExtractionsLoading;
export const getAnnualExtractionsLoaded = (state: ConsenusEconomicsDataState) => state.annualExtractionsLoaded;
export const getAnnualExtractionsError = (state: ConsenusEconomicsDataState) => state.annualExtractionsError;

export const getQuarterlyExtractions = (state: ConsenusEconomicsDataState) => state.quarterlyExtractions;
export const getQuarterlyExtractionsLoading = (state: ConsenusEconomicsDataState) => state.quarterlyExtractionsLoading;
export const getQuarterlyExtractionsLoaded = (state: ConsenusEconomicsDataState) => state.quarterlyExtractionsLoaded;
export const getQuarterlyExtractionsError = (state: ConsenusEconomicsDataState) => state.quarterlyExtractionsError;

export const getConstituentDates = (state: ConsenusEconomicsDataState) => state.constituentDates;
export const getConstituentDatesLoading = (state: ConsenusEconomicsDataState) => state.constituentDatesLoading;
export const getConstituentDatesLoaded = (state: ConsenusEconomicsDataState) => state.constituentDatesLoaded;
export const getConstituentDatesError = (state: ConsenusEconomicsDataState) => state.constituentDatesError;

export const getAnnualConstituents = (state: ConsenusEconomicsDataState) => state.annualConstituents;
export const getAnnualConstituentsLoading = (state: ConsenusEconomicsDataState) => state.annualConstituentsLoading;
export const getAnnualConstituentsLoaded = (state: ConsenusEconomicsDataState) => state.annualConstituentsLoaded;
export const getAnnualConstituentsError = (state: ConsenusEconomicsDataState) => state.annualConstituentsError;

export const getQuarterlyConstituents = (state: ConsenusEconomicsDataState) => state.quarterlyConstituents;
export const getQuarterlyConstituentsLoading = (state: ConsenusEconomicsDataState) => state.quarterlyConstituentsLoading;
export const getQuarterlyConstituentsLoaded = (state: ConsenusEconomicsDataState) => state.quarterlyConstituentsLoaded;
export const getQuarterlyConstituentsError = (state: ConsenusEconomicsDataState) => state.quarterlyConstituentsError;
