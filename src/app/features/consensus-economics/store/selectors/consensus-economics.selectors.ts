import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromConsensusEconomics from '../reducers/consensus-economics.reducer';

export const getConsensusEconomicsDataState = createSelector(
    fromFeature.getConsensusEconomicsState,
    (state: fromFeature.ConsensusEconomicsState) => state.data
);

/**
 * Extractions
 */

export const getConsensusEconomicsExtractionDates = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getExtractionDates
);

export const getConsensusEconomicsExtractionDatesLoadingStatus = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getExtractionDatesLoading
);

export const getConsensusEconomicsExtractionDatesLoadedStatus = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getExtractionDatesLoaded
);

export const getConsensusEconomicsExtractionDatesError = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getExtractionDatesError
);

export const getConsensusEconomicsAnnualExtractions = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getAnnualExtractions
);

export const getConsensusEconomicsAnnualExtractionsLoadingStatus = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getAnnualExtractionsLoading
);

export const getConsensusEconomicsAnnualExtractionsLoadedStatus = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getAnnualExtractionsLoaded
);

export const getConsensusEconomicsAnnualExtractionsError = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getQuarterlyExtractionsError
);

export const getConsensusEconomicsQuarterlyExtractions = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getAnnualExtractions
);

export const getConsensusEconomicsQuarterlyExtractionsLoadingStatus = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getQuarterlyExtractionsLoading
);

export const getConsensusEconomicsQuarterlyExtractionsLoadedStatus = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getQuarterlyExtractionsLoaded
);

export const getConsensusEconomicsQuarterlyExtractionsError = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getQuarterlyExtractionsError
);


/**
 * Constituents
 */

export const getConsensusEconomicsConstituentDates = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getConstituentDates
);

export const getConsensusEconomicsConstituentatesLoadingStatus = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getConstituentDatesLoading
);

export const getConsensusEconomicsConstituentDatesLoadedStatus = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getConstituentDatesLoaded
);

export const getConsensusEconomicsConstituentDatesError = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getConstituentDatesError
);

export const getConsensusEconomicsAnnualConstituents = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getAnnualConstituents
);

export const getConsensusEconomicsAnnualConstituentsLoadingStatus = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getAnnualConstituentsLoading
);

export const getConsensusEconomicsAnnualConstituentsLoadedStatus = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getAnnualConstituentsLoaded
);

export const getConsensusEconomicsAnnualConstituentsError = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getQuarterlyConstituentsError
);

export const getConsensusEconomicsQuarterlyConstituents = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getAnnualConstituents
);

export const getConsensusEconomicsQuarterlyConstituentsLoadingStatus = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getQuarterlyConstituentsLoading
);

export const getConsensusEconomicsQuarterlyConstituentsLoadedStatus = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getQuarterlyConstituentsLoaded
);

export const getConsensusEconomicsQuarterlyConstituentsError = createSelector(
    getConsensusEconomicsDataState,
    fromConsensusEconomics.getQuarterlyExtractionsError
);
