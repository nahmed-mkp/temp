import * as fromModels from '../../models/agency-dials.models';
import * as fromActions from '../actions/agency-dials.actions';

export interface State {

    defaultTemplateId?: string;
    defaultTemplateDial?: fromModels.IDialDetail;
    defaultTemplateLoading: boolean;
    defaultTemplateLoaded: boolean;
    defaultTemplateError?: string;

    dialIds: string[];
    dialEntities: { [id: string]: fromModels.IDial }
    dialsLoading: boolean;
    dialsLoaded: boolean;
    dialsError?: string;

    selectedDialId?: string;
    selectedDialDetail?: fromModels.IDialDetail;
    selectedDialLoading?: boolean;
    selectedDialLoaded?: boolean;
    selectedDialError?: string;

    closeDialog?: boolean;

};

const initialState: State = {
    
    defaultTemplateLoading: false,
    defaultTemplateLoaded: false,

    dialIds: [],
    dialEntities: {},
    dialsLoading: false,
    dialsLoaded: false,
};

export function reducer(state: State = initialState, action: fromActions.AgencyDialsActions): State {
    switch (action.type) {

        case fromActions.AgencyDialsActionTypes.LOAD_DEFAULT_TEMPLATE: {
            return {
                ...state,
                defaultTemplateId: null,
                defaultTemplateDial: null,
                defaultTemplateLoading: true,
                defaultTemplateLoaded: false,
                defaultTemplateError: null
            };
        }

        case fromActions.AgencyDialsActionTypes.LOAD_DEFAULT_TEMPLATE_COMPLETE: {
            const payload: fromModels.IDialDetail = action.payload
            return {
                ...state,
                defaultTemplateId: payload.dialId,
                defaultTemplateDial: payload,
                defaultTemplateLoading: false,
                defaultTemplateLoaded: true,
                defaultTemplateError: null
            };
        }

        case fromActions.AgencyDialsActionTypes.LOAD_DEFAULT_TEMPLATE_FAILED: {
            return {
                ...state,
                defaultTemplateLoading: false,
                defaultTemplateLoaded: false,
                defaultTemplateError: action.payload
            };
        }

        case fromActions.AgencyDialsActionTypes.LOAD_DIALS: {
            return {
                ...state,
                dialIds: [],
                dialEntities: {},
                dialsLoading: true, 
                dialsLoaded: false,
                dialsError: null
            };
        }

        case fromActions.AgencyDialsActionTypes.LOAD_DIALS_COMPLETE: {
            const payload: fromModels.IDial[] = action.payload;
            const dialIds = payload.map((dial: fromModels.IDial) => dial['dialId']);
            let entities = payload.reduce((entities: { [id: string]: fromModels.IDial }, dial: fromModels.IDial) => {
                return Object.assign({}, entities, { [dial.dialId]: dial });
            }, {});
            return {
                ...state,
                dialIds: [...dialIds],
                dialEntities: {...entities},
                dialsLoading: false,
                dialsLoaded: true
            };
        }

        case fromActions.AgencyDialsActionTypes.LOAD_DIALS_FAILED: {
            return {
                ...state,
                dialsLoading: false,
                dialsLoaded: true,
                dialsError: action.payload
            };
        }

        case fromActions.AgencyDialsActionTypes.LOAD_DIAL: {
            const dialId: string = action.payload;
            return {
                ...state,
                selectedDialId: dialId,
                selectedDialDetail: null,
                selectedDialLoading: true,
                selectedDialLoaded: false,
                selectedDialError: null
            };
        }

        case fromActions.AgencyDialsActionTypes.LOAD_DIAL_COMPLETE: {
            const payload: fromModels.IDialDetail = action.payload;
            return {
                ...state,
                selectedDialId: payload.dialId,
                selectedDialDetail: { ...action.payload },
                selectedDialLoading: false,
                selectedDialLoaded: true
            };
        }

        case fromActions.AgencyDialsActionTypes.LOAD_DIAL_FAILED: {
            return {
                ...state,
                selectedDialDetail: null,
                selectedDialLoading: false,
                selectedDialLoaded: false,
                selectedDialError: action.payload
            };
        }

        case fromActions.AgencyDialsActionTypes.CLEAR_SELECTED_DIAL: {
            return {
                ...state,
                selectedDialDetail: null,
                selectedDialLoading: false,
                selectedDialLoaded: false,
                selectedDialError: null
            };
        }

        case fromActions.AgencyDialsActionTypes.ADD_DIAL:
        case fromActions.AgencyDialsActionTypes.CLONE_DIAL:
        case fromActions.AgencyDialsActionTypes.UPDATE_DIAL:
            return {
                ...state,
                selectedDialLoading: true,
                selectedDialLoaded: false,
                selectedDialError: null
            };

        case fromActions.AgencyDialsActionTypes.ADD_DIAL_COMPLETE:
        case fromActions.AgencyDialsActionTypes.CLONE_DIAL_COMPLETE:
        case fromActions.AgencyDialsActionTypes.UPDATE_DIAL_COMPLETE: {
            const payload: fromModels.IDialDetail = action.payload;
            const newDial: fromModels.IDial = { 'dialId': payload.dialId, 'dialName': payload.dialName };
            const dialIds: string[] = state.dialIds.filter((dialId) => dialId !== newDial.dialId);
            delete state.dialEntities[payload.dialId];
            return {
                ...state,
                dialIds: [newDial.dialId, ...dialIds],
                dialEntities: Object.assign({}, state.dialEntities, { [newDial.dialId]: newDial }),
                selectedDialId: payload.dialId,
                selectedDialDetail: payload,
                selectedDialLoading: false,
                selectedDialLoaded: true
            };
        }
            

        case fromActions.AgencyDialsActionTypes.ADD_DIAL_FAILED:
        case fromActions.AgencyDialsActionTypes.CLONE_DIAL_FAILED:
        case fromActions.AgencyDialsActionTypes.UPDATE_DIAL_FAILED: {
            return {
                ...state,
                selectedDialLoading: false,
                selectedDialLoaded: false,
                selectedDialError: action.payload
            };
        }


        case fromActions.AgencyDialsActionTypes.DELETE_DIAL: {
            return {
                ...state,
                selectedDialLoading: true,
                selectedDialLoaded: false,
                selectedDialError: null
            };
        }
            

        case fromActions.AgencyDialsActionTypes.DELETE_DIAL_COMPLETE: {
            const payload: fromModels.IDialDetail = action.payload;
            const newDial: fromModels.IDial = { 'dialId': payload.dialId, 'dialName': payload.dialName };
            const dialIds: string[] = state.dialIds.filter((dialId) => dialId !== newDial.dialId);
            delete state.dialEntities[payload.dialId];
            return {
                ...state,
                dialIds: [...dialIds],
                selectedDialId: null,
                selectedDialDetail: null,
                selectedDialLoading: false,
                selectedDialLoaded: false
            };

        }            
        
        case fromActions.AgencyDialsActionTypes.DELETE_DIAL_FAILED: {
            return {
                ...state,
                selectedDialLoading: false,
                selectedDialLoaded: false,
                selectedDialError: action.payload
            };
        }

        default: {
            return state;
        }
    }
}

export const getDefaultTemplateId = (state: State) => state.defaultTemplateId;
export const getDefaultTemplateDial = (state: State) => state.defaultTemplateDial;
export const getDefaultTemplateLoaded = (state: State) => state.defaultTemplateLoading;
export const getDefaultTemplateLoading = (state: State) => state.defaultTemplateLoaded;
export const getDefaultTemplateError = (state: State) => state.defaultTemplateError;

export const getDialIds = (state: State) => state.dialIds;
export const getDialEntities = (state: State) => state.dialEntities;
export const getDialsLoading = (state: State) => state.dialsLoading;
export const getDialsLoaded = (state: State) => state.dialsLoaded;
export const getDialsError = (state: State) => state.dialsError;

export const getSelectedDialId = (state: State) => state.selectedDialId;
export const getSelectedDialDetail = (state: State) => state.selectedDialDetail;
export const getSelectedDialLoading = (state: State) => state.selectedDialLoading;
export const getSelectedDialLoaded = (state: State) => state.selectedDialLoaded;
export const getSelectedDialError = (state: State) => state.selectedDialError;
