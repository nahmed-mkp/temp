import * as fromActions from '../actions';
import * as fromModels from '../../models';

export interface TreasuryState {

    treasuryEntity: any;
    treasuryLoading: boolean;
    treasuryLoaded: boolean;
    treasuryError?: string;


    auctionDates: any[];
    auctionDatesLoading: boolean;
    auctionDatesLoaded: boolean;
    auctionDatesError?: string;

    treasuryUpdatePending: boolean;
    treasuryUpdateFinished: boolean;
    treasuryUpdateError?: string;

    securitySuggestions: fromModels.IBVALSuggestion[];
    securitySuggestionsLoading: boolean;
    securitySuggestionsLoaded: boolean;
    securitySuggestionsError?: string;
}

export const initialState: TreasuryState = {
    treasuryEntity: {},
    treasuryLoading: false,
    treasuryLoaded: false,
    treasuryError: null,

    auctionDates: [],
    auctionDatesLoading: false,
    auctionDatesLoaded: false,

    treasuryUpdatePending: false,
    treasuryUpdateFinished: false,

    securitySuggestions: [],
    securitySuggestionsLoading: false,
    securitySuggestionsLoaded: false
};

export function reducer(state = initialState, action: fromActions.TreasuryActions) {
    switch (action.type) {

        case fromActions.TreasuryActionTypes.LOAD_TREASURY: {
            return {
                ...state,
                treasuryLoading: true,
                treasuryLoaded: false,
                treasuryError: null
            };
        }

        case fromActions.TreasuryActionTypes.LOAD_TREASURY_COMPLETE: {
            return {
                ...state,
                treasuryEntity: action.payload,
                treasuryLoading: false,
                treasuryLoaded: true,
                treasuryError: null
            };
        }

        case fromActions.TreasuryActionTypes.LOAD_TREASURY_FAILED: {
            return {
                ...state,
                treasuryLoading: false,
                treasuryLoaded: false,
                treasuryError: action.payload
            };
        }



        // -----------------------------------------------------------------------------------------------

        case fromActions.TreasuryActionTypes.LOAD_AUCTION_DATES: {
            return {
                ...state,
                auctionDatesLoading: true,
                auctionDatesLoaded: false,
                auctionDatesError: null
            };
        }

        case fromActions.TreasuryActionTypes.LOAD_AUCTION_DATES_COMPLETE: {
            return {
                ...state,
                auctionDates: action.payload,
                auctionDatesLoading: false,
                auctionDatesLoaded: true,
                auctionDatesError: null
            };
        }

        case fromActions.TreasuryActionTypes.LOAD_AUCTION_DATES_FAILED: {
            return {
                ...state,
                auctionDatesLoading: false,
                auctionDatesLoaded: false,
                auctionDatesError: action.payload
            };
        }


        case fromActions.TreasuryActionTypes.UPDATE_TREASURY: {
            return {
                ...state,
                treasuryUpdatePending: true,
                treasuryUpdateFinished: false,
                treasuryUpdateError: null
            };
        }

        case fromActions.TreasuryActionTypes.UPDATE_TREASURY_COMPLETE: {
            return {
                ...state,
                treasuryUpdatePending: false,
                treasuryUpdateFinished: true,
                treasuryUpdateError: null
            };
        }

        case fromActions.TreasuryActionTypes.UPDATE_TREASURY_FAILED: {
            return {
                ...state,
                treasuryUpdatePending: false,
                treasuryUpdateFinished: false,
                treasuryUpdateError: action.payload
            };
        }

        // ------------ BVAL ---------------

        case fromActions.TreasuryActionTypes.RESET_BVAL_SECURITY_SUGGESTIONS:
        case fromActions.TreasuryActionTypes.LOAD_BVAL_SECURITY_SUGGESTIONS: {
            return {
                ...state,
                securitySuggestions: [],
                securitySuggestionsLoading: false,
                securitySuggestionsLoaded: false,
                securitySuggestionsError: null
            };
        }

        case fromActions.TreasuryActionTypes.LOAD_BVAL_SECURITY_SUGGESTIONS_COMPLETE: {
            return {
                ...state,
                securitySuggestions: [...action.payload],
                securitySuggestionsLoading: false,
                securitySuggestionsLoaded: true
            };
        }
        
        case fromActions.TreasuryActionTypes.LOAD_BVAL_SECURITY_SUGGESTIONS_FAILED: {
            return { 
                ...state,
                securitySuggestionsLoading: false,
                securitySuggestionsLoaded: false,
                securitySuggestionsError: action.payload
            };
        }

        default:
            return state;
    }
}

export const getTreasuryEntities = (state: TreasuryState) => state.treasuryEntity;
export const getTreasuryLoading = (state: TreasuryState) => state.treasuryLoading;
export const getTreasuryLoaded = (state: TreasuryState) => state.treasuryLoaded;
export const getTreasuryError = (state: TreasuryState) => state.treasuryError;

export const getAuctionDates = (state: TreasuryState) => state.auctionDates;
export const getAuctionDatesLoading = (state: TreasuryState) => state.auctionDatesLoading;
export const getAuctionDatesLoaded = (state: TreasuryState) => state.auctionDatesLoaded;
export const getAuctionDatesError = (state: TreasuryState) => state.auctionDatesError;

export const getTreasuryUpdatePending = (state: TreasuryState) => state.treasuryUpdatePending;
export const getTreasuryUpdateFinished = (state: TreasuryState) => state.treasuryUpdateFinished;
export const getTreasuryUpdateError = (state: TreasuryState) => state.treasuryUpdateError;

export const getBVALSecuritySuggestions = (state: TreasuryState) => state.securitySuggestions;
export const getBVALSecuritySuggestionsLoading = (state: TreasuryState) => state.securitySuggestionsLoading;
export const getBVALSecuritySuggestionsLoaded = (state: TreasuryState) => state.securitySuggestionsLoaded;
export const getBVALSecuritySuggestionsError = (state: TreasuryState) => state.securitySuggestionsError;