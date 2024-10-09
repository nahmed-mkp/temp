import * as fromModels from '../../models/returns.models';
import * as fromActions from '../actions/returns.actions';

export interface State {

    capitals: {
        [year: number]: any;
    };

    capitalsLoading: {
        [year: number]: any;
    };

    capitalsLoaded: {
        [year: number]: any;
    };

    capitalsError: {
        [year: number]: string;
    };

    returnsEntity: {
        [layoutName: string]: any;
    };

    returnsEntityLoading: {
        [layoutName: string]: boolean;
    };

    returnsEntityLoaded: {
        [layoutName: string]: boolean;
    };

    returnsEntityError: {
        [layoutName: string]: string;
    };
}


const initialState: State = {

    capitals: {},
    capitalsLoading: {},
    capitalsLoaded: {},
    capitalsError: {},

    returnsEntity: {},
    returnsEntityLoading: {},
    returnsEntityLoaded: {},
    returnsEntityError: {},
};


export function reducer(state = initialState, action: fromActions.ReturnsActions): State {

    switch (action.type) {

        // case fromActions.ReturnsActionTypes.LOAD_CAPITALS: {
        //     return {
        //         ...state,
        //         capitalsLoading: {[action.year]: true},
        //         capitalsLoaded: { [action.year]: false },
        //         capitalsError: { [action.year]: null }
        //     };
        // }

        // case fromActions.ReturnsActionTypes.LOAD_CAPITALS_COMPLETE: {
        //     return {
        //         ...state,
        //         capitalsLoading: { [action.year]: false },
        //         capitalsLoaded: { [action.year]: true },
        //         capitals: Object.assign({}, state.capitals, {[action.year]: action.payload})
        //     };
        // }

        // case fromActions.ReturnsActionTypes.LOAD_CAPITALS_FAILED: {
        //     return {
        //         ...state,
        //         capitalsLoading: { [action.year]: false },
        //         capitalsLoaded: { [action.year]: false },
        //         capitalsError: { [action.year]: action.payload}
        //     };
        // }

        case fromActions.ReturnsActionTypes.LOAD_RETURNS: {
            const layout = action.layout;
            return {
                ...state,
                returnsEntityLoading: Object.assign({}, state.returnsEntityLoading, { [layout]: true}),
                returnsEntityLoaded: Object.assign({}, state.returnsEntityLoaded, { [layout]: false }),
                returnsEntityError: Object.assign({}, state.returnsEntityError, { [layout]: null }),
                capitalsLoading: Object.assign({}, state.capitalsLoading, { [layout]: true }),
                capitalsLoaded: Object.assign({}, state.capitalsLoaded, { [layout]: false }),
                capitalsError: Object.assign({}, state.capitalsError, { [layout]: false })
            };
        }

        case fromActions.ReturnsActionTypes.LOAD_RETURNS_COMPLETE: {
            const layout = action.layout;
            const returns = action.payload['returns'];
            const capitals = {
                fundCapitals: action.payload['fundCapitals'],
                crossPodCapitals: action.payload['crossPodCapitals'],
                podCapitals: action.payload['podCapitals']};
            return {
                ...state,
                returnsEntity: Object.assign({}, state.returnsEntity, { [layout]: returns }),
                returnsEntityLoading: Object.assign({}, state.returnsEntityLoading, { [layout]: false }),
                returnsEntityLoaded: Object.assign({}, state.returnsEntityLoaded, { [layout]: true }),

                capitals: Object.assign({}, state.capitals, {[layout]: capitals}),
                capitalsLoading: Object.assign({}, state.capitalsLoading, { [layout]: false }),
                capitalsLoaded: Object.assign({}, state.capitalsLoaded, { [layout]: true }),
            };
        }

        case fromActions.ReturnsActionTypes.LOAD_RETURNS_FAILED: {
            const layout = action.layout;
            return {
                ...state,
                returnsEntityLoading: Object.assign({}, state.returnsEntityLoading, { [layout]: false }),
                returnsEntityLoaded: Object.assign({}, state.returnsEntityLoaded, { [layout]: false }),
                returnsEntityError: Object.assign({}, state.returnsEntityError, { [layout]: action.payload }),
                capitalsLoading: Object.assign({}, state.capitalsLoading, { [layout]: false }),
                capitalsLoaded: Object.assign({}, state.capitalsLoaded, { [layout]: false }),
                capitalsError: Object.assign({}, state.capitalsError, { [layout]: action.payload })
            };
        }

        default: {
            return state;
        }
    }
}

export const getCapitalsYears = (state: State) => Object.keys(state.capitals);
export const getCapitals = (state: State) => state.capitals;
export const getCapitalsLoading = (state: State) => state.capitalsLoading;
export const getCapitalsLoaded = (state: State) => state.capitalsLoaded;
export const getCapitalsError = (state: State) => state.capitalsError;

export const getReturnsEntity = (state: State) => state.returnsEntity;
export const getReturnsEntityLoading = (state: State) => state.returnsEntityLoading;
export const getReturnsEntityLoaded = (state: State) => state.returnsEntityLoaded;
export const getReturnsEntityError = (state: State) => state.returnsEntityError;
