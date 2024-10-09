import { createSelector } from '@ngrx/store';
import * as fromUi from '../reducers/ui.reducer';
import * as fromFeature from '../reducers';

export const getUiState = createSelector(
    fromFeature.getRCPM2State,
    (state: fromFeature.RCPM2State) => state.ui
);

export const getExecutionModeEntity = createSelector(
    getUiState,
    fromUi.getExecutionModeEntity
);

export const getExecutionModeByLayoutName = (layoutName: string) => {
    return createSelector(
        getExecutionModeEntity,
        entity => entity[layoutName]
    );
};

export const getDataRetrievalMethod = createSelector(
    getUiState,
    fromUi.getDataRetrievalMethod
);

export const getLastPositionRequestTs = createSelector(
    getUiState,
    fromUi.getLastPositionRequestTs
);
