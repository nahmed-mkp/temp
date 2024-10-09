import { createSelector } from '@ngrx/store';

import * as fromReturns from '../reducers/returns.reducer';
import * as fromFeature from '../reducers';

export const getReturnsState = createSelector(
    fromFeature.getRCPM2State,
    (state: fromFeature.RCPM2State) => state.returns
);

export const getReturnsEntity = createSelector(
    getReturnsState,
    fromReturns.getReturnsEntity
);

export const getReturnsEntityLoading = createSelector(
    getReturnsState,
    fromReturns.getReturnsEntityLoading
);

export const getReturnsEntityLoaded = createSelector(
    getReturnsState,
    fromReturns.getReturnsEntityLoaded
);

export const getReturnsEntityError = createSelector(
    getReturnsState,
    fromReturns.getReturnsEntityError
);

export const getSelectedLayoutReturns = () => {
    return createSelector(
        getReturnsEntity,
        (entity, props) => entity && entity[props]
    );
};

export const getSelectedLayoutReturnsLoading = () => {
    return createSelector(
        getReturnsEntityLoading,
        (entity, props) => entity && entity[props]
    );
};

export const getSelectedLayoutReturnsLoaded = () => {
    return createSelector(
        getReturnsEntityLoaded,
        (entity, props) => entity && entity[props]
    );
};

export const getSelectedLayoutReturnsError = () => {
    return createSelector(
        getReturnsEntityError,
        (entity, props) => entity && entity[props]
    );
};


// Capitals

export const getCapitals = createSelector(
    getReturnsState,
    fromReturns.getCapitals
);

export const getCapitalsLoading = createSelector(
    getReturnsState,
    fromReturns.getCapitalsLoading
);

export const getCapitalsLoaded = createSelector(
    getReturnsState,
    fromReturns.getCapitalsLoaded
);

export const getCapitalsError = createSelector(
    getReturnsState,
    fromReturns.getCapitalsError
);

export const getSelectedLayoutCapitalsLoading = () => {
    return createSelector(
        getCapitalsLoading,
        (entity, props) => entity && entity[props]
    );
};

export const getSelectedLayoutCapitalsLoaded = () => {
    return createSelector(
        getCapitalsLoaded,
        (entity, props) => entity && entity[props]
    );
};

export const getSelectedLayoutCapitalsError = () => {
    return createSelector(
        getCapitalsError,
        (entity, props) => entity && entity[props]
    );
};

export const getSelectedLayoutCapitals = () => {
    return createSelector(
        getCapitals,
        (entity, props) => entity && entity[props]
    );
};
