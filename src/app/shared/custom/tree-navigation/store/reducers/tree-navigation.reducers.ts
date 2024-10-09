import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions/tree-navigation.actions';

export interface State {
    activePathIds: any[],
    constructedHierarchy: any[];
}

const initialState: State = {
    activePathIds: [],
    constructedHierarchy: []
};

export const reducer = createReducer(
    initialState, 
    on(fromActions.addIdToActivePath, (state, {payload}) => ({...state, activePathIds:[...state.activePathIds, payload]})),
    on(fromActions.overwriteActivePath, (state, {payload}) => ({...state, activePathIds: payload})),
    on(fromActions.addToConstructedHierarchy, (state, {payload}) => ({...state, constructedHierarchy:[...state.constructedHierarchy, payload]})),
    on(fromActions.overwriteConstructedHierarchy, (state, {payload}) => ({...state, constructedHierarchy:payload}))
)

export const getActivePathIds = (state: State) => state.activePathIds;
export const getConstructedHierarchy = (state: State) => state.constructedHierarchy;