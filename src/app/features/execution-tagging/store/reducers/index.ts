import * as fromRoot from '../../../../store';
import * as fromExecutionTagging from './execution-tagging.reducer';
import { createFeatureSelector } from '@ngrx/store';

export interface ExecutionTaggingState  {
  executionTagging: fromExecutionTagging.ExecutionTaggingState
}

export interface State extends fromRoot.RootState {
  executionTagging: ExecutionTaggingState;
}

export  const reducers = {
  executionTagging: fromExecutionTagging.reducer
};

export const getExecutionTaggingState = createFeatureSelector<ExecutionTaggingState>('execution-tagging');
