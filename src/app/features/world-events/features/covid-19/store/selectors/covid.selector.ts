import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromCovid from '../reducers/covid.reducer';

const getCovidState = createSelector(
    fromFeature.getCovidState,
    (state: fromFeature.CovidState) => state.covid
);

export const getCovidActiveAsOfDate = createSelector(
    getCovidState,
    fromCovid.getAsOfDate
);

export const getColumns = createSelector(
    getCovidState,
    fromCovid.getColumns
);

export const getCovidCountriesLoading = createSelector(
    getCovidState,
    fromCovid.getCountriesLoading
);

export const getCovidCountriesLoaded = createSelector(
    getCovidState,
    fromCovid.getCountriesLoaded
);

export const getCovidCountriesError = createSelector(
    getCovidState,
    fromCovid.getCountriesError
);

export const getCovidCountries = createSelector(
    getCovidState,
    fromCovid.getCountries
);

export const getCovidCountryIds = createSelector(
    getCovidState,
    fromCovid.getCountryIds
);

export const getCovidCountryDataRecords = createSelector(
    getCovidState,
    fromCovid.getCountryData
);

export const getCovidCountryDataLoading = createSelector(
    getCovidState,
    fromCovid.getCountryDataLoading
);

export const getCovidCountryDataLoaded = createSelector(
    getCovidState,
    fromCovid.getCountryDataLoaded
);

export const getCovidCountryDataError = createSelector(
    getCovidState,
    fromCovid.getCountryDataError
);

export const getCovidCountryData = createSelector(
    getCovidCountryIds,
    getCovidCountryDataRecords,
    (ids, records) => {
        return ids.map((id) => records[id]);
    }
);


/** US History **/

export const getCovidUSHistory = createSelector(
    getCovidState,
    fromCovid.getUSHistory
);

export const getCovidUSHistoryLoading = createSelector(
    getCovidState,
    fromCovid.getUSHistoryLoading
);

export const getCovidUSHistoryLoaded = createSelector(
    getCovidState,
    fromCovid.getUSHistoryLoaded
);

export const getCovidUSHistoryError = createSelector(
    getCovidState,
    fromCovid.getUSHistoryError
);

export const getCovidUSStates = createSelector(
    getCovidState,
    fromCovid.getUSStates
);

export const getCovidUSstatesEntities = createSelector(
    getCovidState,
    fromCovid.getUSstatesEntities
);

export const getCovidUSStatesHistoryLoading = createSelector(
    getCovidState,
    fromCovid.getUSStatesHistoryLoading
);

export const getCovidUSStatesHistoryLoaded = createSelector(
    getCovidState,
    fromCovid.getUSStatesHistoryLoaded
);

export const getCovidUSStatesHistoryError = createSelector(
    getCovidState,
    fromCovid.getUSStatesHistoryError
);

export const getCovidUSStatesHistory = createSelector(
    getCovidUSStates,
    getCovidUSstatesEntities,
    (states, entities) => {
        return states.map((state) => entities[state]);
    }
);


