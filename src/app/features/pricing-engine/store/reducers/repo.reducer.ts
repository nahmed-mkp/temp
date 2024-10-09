import * as fromActions from '../actions';

export interface RepoState {

    repoEntity: any;
    repoLoading: boolean;
    repoLoaded: boolean;
    repoError?: string;
}

export const initialState: RepoState = {
    repoEntity: {},
    repoLoading: false,
    repoLoaded: false,
    repoError: null,
};

export function reducer(state = initialState, action: fromActions.RepoActions) {
    switch (action.type) {

        case fromActions.RepoActionTypes.LOAD_REPO: {
            return {
                ...state,
                repoLoading: true,
                repoLoaded: false,
                repoError: null
            };
        }

        case fromActions.RepoActionTypes.LOAD_REPO_COMPLETE: {
            return {
                ...state,
                repoEntity: action.payload,
                repoLoading: false,
                repoLoaded: true,
                repoError: null
            };
        }

        case fromActions.RepoActionTypes.LOAD_REPO_FAILED: {
            return {
                ...state,
                repoLoading: false,
                repoLoaded: false,
                repoError: action.payload
            };
        }


        default:
            return state;
    }
}

export const getRepoEntities = (state: RepoState) => state.repoEntity;
export const getRepoLoading = (state: RepoState) => state.repoLoading;
export const getRepoLoaded = (state: RepoState) => state.repoLoaded;
export const getRepoError = (state: RepoState) => state.repoError;


