import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import moment from 'moment';
import * as fromModels from '../../models';

export interface ExecutionTaggingState {

  showReasonEditor: false;

  startDate: string;
  endDate: string;

  currentPortfolioManager: fromModels.IPortfolioManager;

  portfolioManagers: fromModels.IPortfolioManager[];
  portfolioManagersLoading: boolean;
  portfolioManagersLoaded: boolean;
  portfolioManagersFailed?: any;

  executionTaggingData: any;
  executionTaggingDataLoading: boolean;
  executionTaggingDataLoaded: boolean;
  executionTaggingDataFailed?: any;

  reasons: fromModels.IReason[];
  reasonsLoading: boolean;
  reasonsLoaded: boolean;
  reasonsFailed?: any;

  updateReasonPending: boolean;
  updateReasonComplete: boolean;
  updateReasonError?: boolean;

  updateTagPending: boolean;
  updateTagComplete: boolean;
  updateTagError?: boolean;

}

const initialState: ExecutionTaggingState = {

  showReasonEditor: false,

  startDate: moment().subtract(1, 'weeks').format('MM-DD-YYYY'),
  endDate: moment().format('MM-DD-YYYY'),

  currentPortfolioManager: {Name: '(All)', NTName: 'all', UserId: -1},

  portfolioManagers: null,
  portfolioManagersLoading: false,
  portfolioManagersLoaded: false,

  executionTaggingData: null,
  executionTaggingDataLoading: false,
  executionTaggingDataLoaded: false,

  reasons: null,
  reasonsLoading: false,
  reasonsLoaded: false,

  updateReasonPending: false,
  updateReasonComplete: false,

  updateTagPending: false,
  updateTagComplete: false
};

export const reducer = createReducer(

  initialState,

  on(fromActions.toggleReasonEditor, (state) => {
      return {
          ...state,
          showReasonEditor: !state.showReasonEditor
      }
  }),

  /* =================================== DATE RANGE =================================== */

  on(fromActions.changeStartDate, (state, action) => {
      return {
          ...state,
          startDate: action.startDate,
          executionTaggingDataLoading: true,
          executionTaggingDataLoaded: false
      }
  }),

  on(fromActions.changeEndDate, (state, action) => {
      return {
          ...state,
          endDate: action.endDate,
          executionTaggingDataLoading: true,
          executionTaggingDataLoaded: false
      }
  }),

  /* =================================== PORTFOLIO MANAGERS =================================== */


  on(fromActions.changeCurrentPortfolioManager, (state, action) => {
      return {
          ...state,
          currentPortfolioManager: action.portfolioManager,
          executionTaggingDataLoading: true,
          executionTaggingDataLoaded: false,
      }
  }),

  on(fromActions.loadPortfolioManagers, (state) => {
      return {
          ...state,
          portfolioManagersLoading: true,
          portfolioManagersLoaded: false,
          portfolioManagersFailed: null
      }
  }),

  on(fromActions.loadPortfolioManagersComplete, (state, action) => {
      return {
          ...state,
          portfolioManagers: action.res,
          portfolioManagersLoading: false,
          portfolioManagersLoaded: true
      }
  }),

  on(fromActions.loadPortfolioManagersError, (state, action) => {
      return {
          ...state,
          portfolioManagersLoading: false,
          portfolioManagersLoaded: false,
          portfolioManagersFailed: action.err
      }
  }),

  /* =================================== EXECUTIONS =================================== */

  on(fromActions.loadExecutionsTaggingData, (state) => {
      return {
          ...state,
          executionTaggingDataLoading: true,
          executionTaggingDataLoaded: false,
          executionTaggingDataFailed: null
      }
  }),

  on(fromActions.loadExecutionsTaggingDataComplete, (state, action) => {
      action.res.map( (item,idx)=> item.id = idx)
      return {
          ...state,
          executionTaggingData: action.res,
          executionTaggingDataLoading: false,
          executionTaggingDataLoaded: true
      }
  }),

  on(fromActions.loadExecutionsTaggingDataError, (state, action) => {
      return {
          ...state,
          executionTaggingDataLoading: false,
          executionTaggingDataLoaded: false,
          executionTaggingDataFailed: action.err
      }
  }),

  /* =================================== REASONS =================================== */

  on(fromActions.loadReasons, (state) => {
      return {
          ...state,
          reasonsLoading: true,
          reasonsLoaded: false
      }
  }),

  on(fromActions.loadReasonsComplete, (state, action) => {
      return {
          ...state,
          reasons: action.res,
          reasonsLoading: false,
          reasonsLoaded: true
      }
  }),

  on(fromActions.loadReasonsError, (state) => {
      return {
          ...state,
          reasonsLoading: false,
          reasonsLoaded: false
      }
  }),



  on(fromActions.updateReason, (state) => {
      return {
          ...state,
          updateReasonPending: true,
          updateReasonComplete: false
      }
  }),

  on(fromActions.updateReasonComplete, (state) => {
      return {
          ...state,
          updateReasonPending: false,
          updateReasonComplete: true
      }
  }),

  on(fromActions.updateReasonError, (state) => {
      return {
          ...state,
          updateReasonPending: false,
          updateReasonComplete: false
      }
  }),

  /* =================================== UPDATE TAG =================================== */

  on(fromActions.updateTag, (state) => {
      return {
          ...state,
          updateTagPending: true,
          updateTagComplete: false
      }
  }),

  on(fromActions.updateTagComplete, (state) => {
      return {
          ...state,
          updateTagPending: false,
          updateTagComplete: true
      }
  }),

  on(fromActions.updateTagError, (state) => {
      return {
          ...state,
          updateTagPending: false,
          updateTagComplete: false
      }
  })

)

export const getShowReasonEditor = (state: ExecutionTaggingState) => state.showReasonEditor;

export const getStartDate = (state: ExecutionTaggingState) => state.startDate;
export const getEndDate = (state: ExecutionTaggingState) => state.endDate;

export const getCurrentPortfolioManager = (state: ExecutionTaggingState) => state.currentPortfolioManager;

export const getPortfolioManagers = (state: ExecutionTaggingState) => state.portfolioManagers;
export const getPortfolioManagersLoading = (state: ExecutionTaggingState) => state.portfolioManagersLoading;
export const getPortfolioManagersLoaded = (state: ExecutionTaggingState) => state.portfolioManagersLoaded;
export const getPortfolioManagersFailed = (state: ExecutionTaggingState) => state.portfolioManagersFailed;

export const getExecutionTaggingData = (state: ExecutionTaggingState) => state.executionTaggingData;
export const getExecutionTaggingDataLoading = (state: ExecutionTaggingState) => state.executionTaggingDataLoading;
export const getExecutionTaggingDataLoaded = (state: ExecutionTaggingState) => state.executionTaggingDataLoaded;
export const getExecutionTaggingDataFailed = (state: ExecutionTaggingState) => state.executionTaggingDataFailed;

export const getReasons = (state: ExecutionTaggingState) => state.reasons;
export const getReasonsLoading = (state: ExecutionTaggingState) => state.reasonsLoading;
export const getReasonsLoaded = (state: ExecutionTaggingState) => state.reasonsLoaded;
export const getReasonsFailed = (state: ExecutionTaggingState) => state.reasonsFailed;

export const getUpdateReasonPending = (state: ExecutionTaggingState) => state.updateReasonPending;
export const getUpdateReasonComplete = (state: ExecutionTaggingState) => state.updateReasonComplete;

export const getUpdateTagPending = (state: ExecutionTaggingState) => state.updateTagPending;
export const getUpdateTagComplete = (state: ExecutionTaggingState) => state.updateTagComplete;