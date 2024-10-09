import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import moment from 'moment';
import * as fromModels from '../../models';

export interface BluePearlSettlementLadderState {

    selectedFund: fromModels.IFundRes;
    migrationDate: string;
    settlementDate: string;
    
    funds: any[];
    fundsLoading: boolean;
    fundsLoaded: boolean;
    fundsError?: string;

    settlementLadder: any;
    settlementLadderLoading: boolean;
    settlementLadderLoaded: boolean;
    settlementLadderError?: string;

    repoGovArr: any[];
    selectedRepoGovSID: number;

}

const initialState: BluePearlSettlementLadderState = {

    selectedFund: { FundID: 28, FundName: 'MA7' },
    migrationDate: moment('02/29/2024').format('MM-DD-YYYY'),
    settlementDate: moment().format('MM-DD-YYYY'),

    funds: [],
    fundsLoading: false,
    fundsLoaded: false,

    settlementLadder: [],
    settlementLadderLoading: false,
    settlementLadderLoaded: false,

    repoGovArr: [],
    selectedRepoGovSID: null
};


export const reducer = createReducer(
    initialState, 

    on(fromActions.changeMigrationDate, (state, action) => {
        return ({
            ...state,
            migrationDate: action.date
        })
    }),

    on(fromActions.changeSettlementDate, (state, action) => {
        return ({
            ...state,
            settlementDate: action.date
        })
    }),

    on(fromActions.changeSelectedFund, (state, action) => {
        return ({
            ...state,
            seelectedFundId: action.fund
        })
    }),

    /* ============ FUNDS ================== */

    on(fromActions.loadFunds, (state) => {
        return ({
            ...state,
            fundsLoading: true,
            fundsLoaded: false
        })
    }),

    on(fromActions.loadFundsComplete, (state, action) => {
        return ({
            ...state,
            funds: action.funds,
            fundsLoading: true,
            fundsLoaded: false
        })
    }),

    on(fromActions.loadFundsFailed, (state, action) => {
        return ({
            ...state,
            fundsLoading: false,
            fundsLoaded: false,
            fundsError: action.err
        })
    }),
    

    /* ============ SETTLEMENT LADDER ================== */

    on(fromActions.loadSettlementLadder, (state) => {
        return ({
            ...state,
            settlementLadderLoading: true,
            settlementLadderLoaded: false
        })
    }),

    on(fromActions.loadSettlementLadderComplete, (state, action) => {
        return ({
            ...state,
            settlementLadder: action.funds.filter( item => item['SecurityType'] !== 'REPOGOV'),
            settlementLadderLoading: false,
            settlementLadderLoaded: true,
            repoGovArr: action.funds.filter(item =>  item['SecurityType'] === 'REPOGOV')
        })
    }),

    on(fromActions.loadSettlementLadderFailed, (state, action) => {
        return ({
            ...state,
            settlementLadderLoading: false,
            settlementLadderLoaded: false,
            settlementLadderError: action.err
        })
    })
)


export const getMigrationDate = (state: BluePearlSettlementLadderState) => state.migrationDate;
export const getSettlementDate = (state: BluePearlSettlementLadderState) => state.settlementDate;

export const getSelectedFund = (state: BluePearlSettlementLadderState) => state.selectedFund;
export const getFunds = (state: BluePearlSettlementLadderState) => state.funds;

export const getSettlementLadder = (state: BluePearlSettlementLadderState) => state.settlementLadder;
export const getSettlementLadderLoading = (state: BluePearlSettlementLadderState) => state.settlementLadderLoading;

export const getRepoGovArr = (state: BluePearlSettlementLadderState) => state.repoGovArr;
export const getSelectedRepoGovSID = (state: BluePearlSettlementLadderState) => state.selectedRepoGovSID