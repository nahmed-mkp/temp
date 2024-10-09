import * as fromActions from '../actions/ui.action';

export interface State {
    selectedDate: Date;
    layoutMode: 'spread' | 'compact';
    selectedFuturesTicker: string;
    devMode: boolean;
}

const initialState: State = {
    selectedDate: new Date(),
    layoutMode: 'spread',
    selectedFuturesTicker: 'TY',
    devMode: true
}

export function reducer(state = initialState, action: fromActions.UiActions): State {

    switch (action.type) {

        case fromActions.UiActionTypes.SET_SELECTED_DATE: {
            return {
                ...state,
                selectedDate: action.payload
            };
        }

        case fromActions.UiActionTypes.SET_LAYOUT_MODE: {
            return {
                ...state,
                layoutMode: action.payload
            };
        }

        case fromActions.UiActionTypes.SELECT_FUTURES_TICKER: {
            return {
                ...state,
                selectedFuturesTicker: action.payload
            };
        }

        case fromActions.UiActionTypes.TOGGLE_DEV_MODE: {
            return {
                ...state,
                devMode: !state.devMode
            }
        }

        default: {
            return state;
        }
    }
}

export const getSelectedDate = (state: State) => state.selectedDate;
export const getSelectedFuturesTicker = (state: State) => state.selectedFuturesTicker;
export const getDevMode = (state: State) => state.devMode;
