import * as fromActions from '../actions/curve.action';

export interface State {
    curve: {
        [date: string]: any
    };
    curveLoading: boolean;
    curveLoaded: boolean;
    curveError?: string;
}

const initialState: State = {
    curve: null,
    curveLoading: false,
    curveLoaded: false,
}

export function reducer(state = initialState, action: fromActions.CurveActions): State {

    switch(action.type) {

        case fromActions.CurveActionTypes.LOAD_CURVE: {
            return {
                ...state,
                curveLoading: true,
                curveLoaded: false,
                curveError: null
            }
        }

        case fromActions.CurveActionTypes.LOAD_CURVE_COMPLETE: {

            const targetDate = action.payload.date;
            const result = action.payload.result;


            return {
                ...state,
                curve: {
                    ...state.curve,
                    [targetDate]: result
                },
                curveLoading: false,
                curveLoaded: true,
                curveError: null
            }
        }

        case fromActions.CurveActionTypes.LOAD_CURVE_FAILED: {
            return {
                ...state,
                curveLoading: false,
                curveLoaded: false,
                curveError: action.payload
            }
        }

        default: {
            return state;
        }
    }
}

export const getCurve = (state: State) => state.curve;
export const getCurveLoadingStatus = (state: State) => state.curveLoading;
export const getCurveLoadedStatus = (state: State) => state.curveLoaded;
export const getCurveError = (state: State) => state.curveError;