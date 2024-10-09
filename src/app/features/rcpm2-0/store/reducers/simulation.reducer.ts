import * as fromActions from '../actions/simulation.actions';

export interface State {

    simulationEntity: {
        [layoutName: string]: any;
    };

    simulationLoadingEntity: {
        [layoutName: string]: boolean;
    };

    simulationLoadedEntity: {
        [layoutName: string]: boolean;
    };

    simulationErrorEntity: {
        [layoutName: string]: string;
    };
}


const initialState: State = {

    simulationEntity: {},
    simulationLoadingEntity: {},
    simulationLoadedEntity: {},
    simulationErrorEntity: {},
};


export function reducer(state = initialState, action: fromActions.SimulationActions): State {

    switch (action.type) {

        case fromActions.SimulationActionTypes.LOAD_DAILY_SIMULATION:
        case fromActions.SimulationActionTypes.LOAD_MONTHLY_SIMULATION:
        case fromActions.SimulationActionTypes.LOAD_QUARTERLY_SIMULATION: {
            return {
                ...state,
                simulationLoadingEntity: Object.assign({}, state.simulationLoadingEntity, {[action.payload.layout]: true}),
                simulationLoadedEntity: Object.assign({}, state.simulationLoadedEntity, {[action.payload.layout]: false}),
                simulationErrorEntity: Object.assign({}, state.simulationErrorEntity, {[action.payload.layout]: null})
            };
        }

        case fromActions.SimulationActionTypes.LOAD_DAILY_SIMULATION_COMPLETE:
        case fromActions.SimulationActionTypes.LOAD_MONTHLY_SIMULATION_COMPLETE:
        case fromActions.SimulationActionTypes.LOAD_QUARTERLY_SIMULATION_COMPLETE: {
            return {
                ...state,
                simulationEntity: Object.assign({}, state.simulationEntity, {[action.payload.layout]: action.payload.data}),
                simulationLoadingEntity: Object.assign({}, state.simulationLoadingEntity, {[action.payload.layout]: false}),
                simulationLoadedEntity: Object.assign({}, state.simulationLoadedEntity, {[action.payload.layout]: true}),
                simulationErrorEntity: Object.assign({}, state.simulationErrorEntity, {[action.payload.layout]: null})
            };
        }

        case fromActions.SimulationActionTypes.LOAD_DAILY_SIMULATION_FAILED:
        case fromActions.SimulationActionTypes.LOAD_MONTHLY_SIMULATION_FAILED:
        case fromActions.SimulationActionTypes.LOAD_QUARTERLY_SIMULATION_FAILED: {
            return {
                ...state,
                simulationLoadingEntity: Object.assign({}, state.simulationLoadingEntity, {[action.payload.layout]: false}),
                simulationLoadedEntity: Object.assign({}, state.simulationLoadedEntity, {[action.payload.layout]: false}),
                simulationErrorEntity: Object.assign({}, state.simulationErrorEntity, {[action.payload.layout]: action.payload})
            };
        }

        default: {
            return state;
        }
    }
}

export const getSimulationEntity = (state: State) => state.simulationEntity;
export const getSimulationLoadingEntity = (state: State) => state.simulationLoadingEntity;
export const getSimulationLoadedEntity = (state: State) => state.simulationLoadedEntity;
export const getSimulationErrorEntity = (state: State) => state.simulationErrorEntity;
