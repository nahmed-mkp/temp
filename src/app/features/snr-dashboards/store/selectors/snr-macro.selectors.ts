import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromFeature from '../reducers';
import * as fromMacro from '../reducers/snr-macro.reducers';

export const getSNRMacroDashboardState = createSelector(
    fromFeature.getSNRDashboardState,
    (state: fromFeature.SNRDashboardState) => state.macro
);

export const getSNRMacroRunDates = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getDates
);

export const getSNRMacroRunCountries = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getCountries
);

export const getSNRMacroRunInputsLoading = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getInputsLoading
);

export const getSNRMacroRunInputsLoaded = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getInputsLoaded
);

export const getSNRMacroRunInputsError = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getInputsError
);


export const getSNRMacroRunSelectedMacroRun = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getSelectedMacroRun
);

export const getSNRMacroRunSelectedCountries = createSelector(
    getSNRMacroRunSelectedMacroRun,
    macroRun => macroRun && macroRun.countries
);













export const getSNRMacroRunResults = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getMacroRunResults
);

export const getSNRMacroRunResultsLoading = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getMacroRunResultsLoading
);

export const getSNRMacroRunResultsLoaded = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getMacroRunResultsLoaded
);

export const getSNRMacroRunResultsError = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getMacroRunResultsError
);


export const getSNRMacroRunResultsWithSelectedCountry = (country) => {
    return createSelector(
        getSNRMacroRunResults,
        data => {
            if (data) {
                return data.filter(element => element['country'] === country);
            } else {
                return [];
            }
        }
    );
};

export const getSNRMacroRunResultsChartGroupsWithSelectedCountry = (country) => {
    return createSelector(
        getSNRMacroRunResults,
        data => {
            if (data) {
                let chartGroups = [];
                data.filter(element => element['country'] === country).forEach(element => {
                    chartGroups.push(element['chartGroup']);
                });
                chartGroups = _.flatten(chartGroups);
                chartGroups = _.uniq(chartGroups);
                return chartGroups;
            } else {
                return [];
            }
        }
    );
};













export const getSNRMacroRunQuarterlyGDP = createSelector(
    getSNRMacroRunResults,
    data => {
        if (data) {
            const result = data.filter(element => element['fileType'] === 'Quarterly GDP');
            result.sort(sortCountry);
            return result;
        } else {
            return [];
        }
    }
);

export const getSNRMacroRunMonthlyGDP = createSelector(
    getSNRMacroRunResults,
    data => {
        if (data) {
            const result = data.filter(element => element['fileType'] === 'Monthly GDP');
            result.sort(sortCountry);
            return result;
        } else {
            return [];
        }
    }
);

export const getSNRMacroRunMonthlyInflation = createSelector(
    getSNRMacroRunResults,
    data => {
        if (data) {
            const result = data.filter(element => element['fileType'] === 'Monthly Inflation');
            result.sort(sortCountry);
            return result;
        } else {
            return [];
        }
    }
);

export const getSNRMacroRunMonthlyInflation_core = createSelector(
    getSNRMacroRunMonthlyInflation,
    data => {
        if (data) {
            const result = data.map(element => {
                const selectPart = {...element, data: element.data['core']};
                return selectPart;
            });
            // console.log('core', result);
            result.sort(sortCountry);
            return result;
        } else {
            return [];
        }
    }
);

export const getSNRMacroRunMonthlyInflation_headline = createSelector(
    getSNRMacroRunMonthlyInflation,
    data => {
        if (data) {
            const result = data.map(element => {
                const selectPart = {...element, data: element.data['headline']};
                return selectPart;
            });
            // console.log('headline', result);
            result.sort(sortCountry);
            return result;
        } else {
            return [];
        }
    }
);

export const getSNRMacroRunQuarterlyGDPDecomposition = createSelector(
    getSNRMacroRunResults,
    data => {
        if (data) {
            const result = data.filter(element => element['fileType'] === 'GDP Decomposition');
            result.sort(sortCountry);
            return result;
        } else {
            return [];
        }
    }
);

export const getSNRMacroRunMonthlyInflationDecomposition = createSelector(
    getSNRMacroRunResults,
    data => {
        if (data) {
            const result = data.filter(element => element['fileType'] === 'Inflation Decomposition');
            result.sort(sortCountry);
            return result;
        } else {
            return [];
        }
    }
);










export const getChartGroupByCountryEntity = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getChartGroupByCountryEntity
);

export const getChartGroupByCountryLoadingEntity = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getChartGroupByCountryLoadingEntity
);

export const getChartGroupByCountryLoadedEntity = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getChartGroupByCountryLoadedEntity
);

export const getChartGroupByCountryErrorEntity = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getChartGroupByCountryErrorEntity
);


// --------------------------------------------------------------------------


export const getChartGroupByCountry = (country) => {
    return createSelector(
        getChartGroupByCountryEntity,
        entity => entity && entity[country] || []
    );
};

export const getChartGroupByCountryLoading = (country) => {
    return createSelector(
        getChartGroupByCountryLoadingEntity,
        entity => entity && entity[country] || []
    );
};

export const getChartGroupByCountryLoaded = (country) => {
    return createSelector(
        getChartGroupByCountryLoadedEntity,
        entity => entity && entity[country] || []
    );
};

export const getChartGroupByCountryError = (country) => {
    return createSelector(
        getChartGroupByCountryErrorEntity,
        entity => entity && entity[country] || []
    );
};






export const getChartDataByCountryAndChartGroupAndDateEntity = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getChartDataByCountryAndChartGroupAndDateEntity
);

export const getChartDataByCountryAndChartGroupAndDateLoadingEntity = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getChartDataByCountryAndChartGroupAndDateLoadingEntity
);

export const getChartDataByCountryAndChartGroupAndDateLoadedEntity = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getChartDataByCountryAndChartGroupAndDateLoadedEntity
);

export const getChartDataByCountryAndChartGroupAndDateMissingFilesEntity = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getChartDataByCountryAndChartGroupAndDateMissingFilesEntity
);


export const getChartDataByCountryAndChartGroupAndDateErrorEntity = createSelector(
    getSNRMacroDashboardState,
    fromMacro.getChartDataByCountryAndChartGroupAndDateErrorEntity
);

export const getChartDataDynamic = (country, chartGroup) => {
    return createSelector(
        getSNRMacroRunSelectedMacroRun,
        getChartDataByCountryAndChartGroupAndDateEntity,
        (macroRun, entity) => {
            if (macroRun && entity) {
                const combineKey = macroRun.asOfDate + '|' + country + '|' + chartGroup;
                return entity[combineKey];
            } else {
                return [];
            }
        }
    );
};

export const getChartDataLoadingDynamic = (country, chartGroup) => {
    return createSelector(
        getSNRMacroRunSelectedMacroRun,
        getChartDataByCountryAndChartGroupAndDateLoadingEntity,
        (macroRun, entity) => {
            if (macroRun && entity) {
                const combineKey = macroRun.asOfDate + '|' + country + '|' + chartGroup;
                return entity[combineKey];
            } else {
                return false;
            }
        }
    );
};

export const getChartDataLoadedDynamic = (country, chartGroup) => {
    return createSelector(
        getSNRMacroRunSelectedMacroRun,
        getChartDataByCountryAndChartGroupAndDateLoadedEntity,
        (macroRun, entity) => {
            if (macroRun && entity) {
                const combineKey = macroRun.asOfDate + '|' + country + '|' + chartGroup;
                return entity[combineKey];
            } else {
                return false;
            }
        }
    );
};

export const getChartDataErrorDynamic = (country, chartGroup) => {
    return createSelector(
        getSNRMacroRunSelectedMacroRun,
        getChartDataByCountryAndChartGroupAndDateErrorEntity,
        (macroRun, entity) => {
            if (macroRun && entity) {
                const combineKey = macroRun.asOfDate + '|' + country + '|' + chartGroup;
                return entity[combineKey];
            } else {
                return null;
            }
        }
    );
};

export const getChartDataMissingFiles = (country, chartGroup) => {
    return createSelector(
        getSNRMacroRunSelectedMacroRun,
        getChartDataByCountryAndChartGroupAndDateMissingFilesEntity,
        (macroRun, entity) => {
            if (macroRun && entity) {
                const combineKey = macroRun.asOfDate + '|' + country + '|' + chartGroup;
                return entity[combineKey];
            } else {
                return null;
            }
        }
    );
};

















function sortCountry(elementA, elementB) {

    const aValue = elementA.country.toLowerCase().charCodeAt(0);
    const bValue = elementB.country.toLowerCase().charCodeAt(0);

    return bValue - aValue;
}
