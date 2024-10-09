import * as fromActions from './../actions/subscription.actions';

export interface State {
    id: any;
};

const initialState: State = {
    id: {}
};

export function reducer(state = initialState, action: fromActions.SubscriptionActions ): State {
    switch (action.type) {

        case fromActions.SubscriptionActionTypes.SUBSCRIBE_TO_POSITIONS: {
            return {
                ...state
            };
        }

        default: {
            return state;
        }
    }
}
