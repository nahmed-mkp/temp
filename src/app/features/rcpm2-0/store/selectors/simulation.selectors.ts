import { createSelector } from '@ngrx/store';

import * as fromSimulation from '../reducers/simulation.reducer';
import * as fromFeature from '../reducers';

export const getSimulationState = createSelector(
    fromFeature.getRCPM2State,
    (state: fromFeature.RCPM2State) => state.simulation
);

export const getSimulationEntity = createSelector(
    getSimulationState,
    fromSimulation.getSimulationEntity
);

export const getSimulationLoadingEntity = createSelector(
    getSimulationState,
    fromSimulation.getSimulationLoadingEntity
);

export const getSimulationLoadedEntity = createSelector(
    getSimulationState,
    fromSimulation.getSimulationLoadedEntity
);

export const getSimulationErrorEntity = createSelector(
    getSimulationState,
    fromSimulation.getSimulationErrorEntity
);






export const getSelectedLayoutSimuluation = () => {
    return createSelector(
        getSimulationEntity,
        (entity, props) => entity && entity[props]
    );
};

export const getSelectedLayoutSimuluationLoading = () => {
    return createSelector(
        getSimulationLoadingEntity,
        (entity, props) => entity && entity[props]
    );
};

export const getSelectedLayoutSimuluationLoaded = () => {
    return createSelector(
        getSimulationLoadedEntity,
        (entity, props) => entity && entity[props]
    );
};

export const getSelectedLayoutSimuluationError = () => {
    return createSelector(
        getSimulationErrorEntity,
        (entity, props) => entity && entity[props]
    );
};

