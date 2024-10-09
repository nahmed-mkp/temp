import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromParsers from '../reducers/tbareports-parser.reducer';

/**
 * TBA Reports Parsers
 */
export const getParsersState = createSelector(
  fromFeature.getTbaReportsState,
  (state: fromFeature.TBAReportsState) => state.parser
);

export const getMissingDates = createSelector(
    getParsersState,
    fromParsers.getMissingDates
);

export const getMissingDatesLoadedStatus = createSelector(
    getParsersState,
    fromParsers.getMissingDatesLoadedStatus
);

export const getParserRequest = createSelector(
    getParsersState,
    fromParsers.getParserRequest
);

export const getParserResults = createSelector(
    getParsersState,
    fromParsers.getParserResults
);

export const getParserLoadingStatus = createSelector(
    getParsersState,
    fromParsers.getLoadingStatus
);

export const getParserLoadedStatus = createSelector(
    getParsersState,
    fromParsers.getLoadedStatus
);

export const getParserError = createSelector(
    getParsersState,
    fromParsers.getError,
);

export const isRequestValid = createSelector(
    getParserRequest,
    (request => {
        return (request.asOfDate !== null && request.dealer !== null && request.asOfDate <= new Date());
    })
);

export const getSteps = createSelector(
    getParsersState,
    fromParsers.getSteps
);

export const getCurrentStep = createSelector(
    getParsersState,
    fromParsers.getCurrentStep
);

export const getCacheKey = createSelector(
    getParsersState,
    fromParsers.getCacheKey
);

export const getSavingState = createSelector(
    getParsersState,
    fromParsers.getSavingState
);

export const getSavedState = createSelector(
    getParsersState,
    fromParsers.getSavedState
);

export const getCompletionStatus = createSelector(
    getParsersState,
    fromParsers.getCompletionStatus
);


