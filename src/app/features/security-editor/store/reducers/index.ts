import * as fromRoot from '../../../../store';

import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';

import * as fromSecurityEditor from './security-editor.reducer';


export interface SecurityEditorMasterState {
    securityEditor: fromSecurityEditor.SecMasterState;
}


export interface State extends fromRoot.RootState {
    'securityEditorMaster': SecurityEditorMasterState;
}


export const reducers = {
    securityEditor: fromSecurityEditor.reducer
};


/**
 * Master Data State
 */

 export const getSecurityEditorMasterState = createFeatureSelector<SecurityEditorMasterState>('securityEditorMaster')
