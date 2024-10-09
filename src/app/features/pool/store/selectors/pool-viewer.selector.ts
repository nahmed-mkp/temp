import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromPoolViewer from '../reducers/pool-viewer.reducers';
import * as _ from 'lodash';

/**
 * PoolViewer Selector
 */
export const getAgencyAnalyticsPoolViewerState = createSelector(
    fromFeature.getAgencyAnalyticsState,
    (state: fromFeature.AgencyAnalyticsState) => state.poolViewer
);



export const getShortcutPortfolios = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getShortcutPortfolios
);




export const getAgencyAnalyticsPoolViewerLookups = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getLookups
);

export const getAgencyAnalyticsPoolViewerLookupsLoadingStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getLookupsLoading
);

export const getAgencyAnalyticsPoolViewerLookupsLoadedStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getLookupsLoaded
);

export const getAgencyAnalyticsPoolViewerLookupsError = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getLookupsError
);








export const getAgencyAnalyticsPoolViewerPortfolioIds = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfolioIds
);

export const getAgencyAnalyticsPoolViewerActivePortfolioId = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getActivePortfolioIds
);

export const getAgencyAnalyticsPoolViewerPortfolioEntities = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfolioEntities
);

export const getAgencyAnalyticsPoolViewerPortfolioLoadingStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfoliosLoading
);

export const getAgencyAnalyticsPoolViewerPortfolioLoadedStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfoliosLoaded
);

export const getAgencyAnalyticsPoolViewerPortfoliosError = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfoliosError
);

export const getAgencyAnalyticsPoolViewerPortfolios = createSelector(
    getAgencyAnalyticsPoolViewerPortfolioIds,
    getAgencyAnalyticsPoolViewerPortfolioEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);

export const getAgencyAnalyticsTempPortfolios = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getTempPortfolios
);








// export const getAgencyAnalyticsPoolViewerInfoIds = createSelector(
//     getAgencyAnalyticsPoolViewerState,
//     fromPoolViewer.getPoolViewerInfoIds
// );

// export const getAgencyAnalyticsPoolViewerInfoEntities = createSelector(
//     getAgencyAnalyticsPoolViewerState,
//     fromPoolViewer.getPoolViewerInfoEntities
// );

// export const getAgencyAnalyticsPoolViewerPortfolioInfoLoadingStatus = createSelector(
//     getAgencyAnalyticsPoolViewerState,
//     fromPoolViewer.getPoolViewerInfosLoading
// );

// export const getAgencyAnalyticsPoolViewerPortfolioInfoLoadedStatus = createSelector(
//     getAgencyAnalyticsPoolViewerState,
//     fromPoolViewer.getPoolViewerInfosLoaded
// );

// export const getAgencyAnalyticsPoolViewerInfosError = createSelector(
//     getAgencyAnalyticsPoolViewerState,
//     fromPoolViewer.getPoolViewerInfosError
// );

// export const getAgencyAnalyticsPoolViewerInfos = createSelector(
//     getAgencyAnalyticsPoolViewerInfoIds,
//     getAgencyAnalyticsPoolViewerInfoEntities,
//     (ids, entities) => {
//         return ids.map((id) => entities[id]);
//     }
// );






// export const getAgencyAnalyticsPoolViewerPoolItemIds = createSelector(
//     getAgencyAnalyticsPoolViewerState,
//     fromPoolViewer.getPoolItemIds
// );

// export const getAgencyAnalyticsPoolViewerPoolItemEntities = createSelector(
//     getAgencyAnalyticsPoolViewerState,
//     fromPoolViewer.getPoolItemEntities
// );

// export const getAgencyAnalyticsPoolViewerPortfolioPoolItemsLoadingStatus = createSelector(
//     getAgencyAnalyticsPoolViewerState,
//     fromPoolViewer.getPoolItemsLoading
// );

// export const getAgencyAnalyticsPoolViewerPortfolioPoolItemsLoadedStatus = createSelector(
//     getAgencyAnalyticsPoolViewerState,
//     fromPoolViewer.getPoolItemsLoaded
// );

// export const getAgencyAnalyticsPoolViewerPortfolioPoolItemsError = createSelector(
//     getAgencyAnalyticsPoolViewerState,
//     fromPoolViewer.getPoolItemsError
// );

// export const getAgencyAnalyticsPoolViewerItems = createSelector(
//     getAgencyAnalyticsPoolViewerPoolItemIds,
//     getAgencyAnalyticsPoolViewerPoolItemEntities,
//     (ids, entities) => {
//         if (ids.length >= 1) {
//             const result = ids.map((id) => entities[id]);
//             for (let i = 0; i < 5; i++) {
//                 result.push(...result);
//             }
//             return result;
//         }
//     }
// );

// export const getAgencyAnalyticsPoolViewerItemsForSelectedPortfolio = createSelector(
//     getAgencyAnalyticsPoolViewerItems,
//     getAgencyAnalyticsPoolViewerActivePortfolioId,
//     (poolItems, activePortfolioIds) => {
//         if (poolItems && activePortfolioIds) {
//             const selectedPortfoliosPoolViewerItems = {};
//             activePortfolioIds.forEach(id => {selectedPortfoliosPoolViewerItems[id] = []; });
//             poolItems.forEach(item => {
//                 if (activePortfolioIds.indexOf(item.portfolioId) > -1) {
//                     for (let i = 0; i < 50; i++) {
//                         selectedPortfoliosPoolViewerItems[item.portfolioId].push(item);
//                     }
//                 }
//             });
//             const result = Object.keys(selectedPortfoliosPoolViewerItems).map(key => {
//                return {id: key, items: selectedPortfoliosPoolViewerItems[key]};
//             });
//             return result;
//         } else {
//             return [];
//         }
//     }
// );
export const getAgencyAnalyticsPoolPortfoliosYieldbookResultEntity = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfoliosYieldbookResultEntities
);

export const getAgencyAnalyticsPoolPortfoliosYieldbookResultLoading = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfoliosYieldbookResultLoading
);

export const getAgencyAnalyticsPoolPortfoliosYieldbookResultLoaed = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfoliosYieldbookResultLoaded
);

export const getAgencyAnalyticsPoolPortfoliosYieldbookResultError = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfoliosYieldbookResultError
);








export const getAgencyAnalyticsPoolPortfoliosSecuritiesEntities = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfoliosSecuritiesEntities
);
export const getAgencyAnalyticsPoolPortfoliosSecuritiesLoadingStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfoliosSecuritiesLoading
);
export const getAgencyAnalyticsPoolPortfoliosSecuritiesLoadedStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfoliosSecuritiesLoaded
);
export const getAgencyAnalyticsPoolPortfoliosSecuritiesError = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfoliosSecuritiesError
);
export const getAgencyAnalyticsPoolSelectedPortfoliosSecurities = createSelector(
    getAgencyAnalyticsPoolViewerActivePortfolioId,
    getAgencyAnalyticsPoolPortfoliosSecuritiesEntities,
    getAgencyAnalyticsPoolViewerPortfolioEntities,
    getAgencyAnalyticsTempPortfolios,
    getAgencyAnalyticsPoolPortfoliosYieldbookResultEntity,
    (activePortfolioIds, portfoliosSecurities, portfoliosEntities, tempPortfoliosEntities, portfolioYieldbookResultEntites) => {
        const result = activePortfolioIds.map(portfolioId => {

            const itemCollection = JoinSecuritiesAndYieldbookResult(portfoliosSecurities[portfolioId], portfolioYieldbookResultEntites[portfolioId]);
            return { id: portfolioId, items: itemCollection,
                name: portfoliosEntities[portfolioId] && portfoliosEntities[portfolioId].name
                || tempPortfoliosEntities[portfolioId] && tempPortfoliosEntities[portfolioId].name
                || 'New List'
            }
        });
        return result;
    }
)

function JoinSecuritiesAndYieldbookResult(securities: any[] = [], yieldbookResults: any[] = []) {
    const securitiesMap = {};
    const securitiesKeys = [];
    securities.forEach(security => {
        securitiesMap[security.Cusip] = security;
        securitiesKeys.push(security.Cusip);
    });
    const yieldbookResultsMap = {};
    const yieldbookResultsKeys = []
    yieldbookResults.forEach(yieldbookResult => {
        yieldbookResultsMap[yieldbookResult.Cusip] = yieldbookResult;
        yieldbookResultsKeys.push(yieldbookResult.Cusip);
    });
    const uniqueCusips = _.uniq([...securitiesKeys, ...yieldbookResultsKeys]);
    const resultMergeArray = uniqueCusips.map(cusip => {
        return Object.assign({}, securitiesMap[cusip], yieldbookResultsMap[cusip]);
    });
    return resultMergeArray;
}

// -------------------------------------------------------------------------------------------------------

export const getPortfolioCusipModelValidationDetails = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfolioCusipModelValidationDetails
);

export const getActivePortfolioCusipModelValidationDetails = createSelector(
    getPortfolioCusipModelValidationDetails,
    (entities, props) => {
        if (props && entities[props]) {
            return entities[props];
        } else {
            return []
        }
    }
);

export const getPortfolioCusipModelValidationDetailsLoading = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfolioCusipModelValidationDetailsLoading
);

export const getPortfolioCusipModelValidationDetailsLoaded = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfolioCusipModelValidationDetailsLoading
);

export const getPortfolioCusipModelValidationDetailsError = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfolioCusipModelValidationDetailsError
);



export const getPortfolioCusipModelValidationSummaries = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfolioCusipModelValidationSummaries
);

export const getActivePortfolioCusipModelValidationSummaries = createSelector(
    getPortfolioCusipModelValidationSummaries,
    (entities, props) => {
        if (props && entities[props]) {
            return entities[props];
        } else {
            return [];
        }
    }
);

export const getPortfolioCusipModelValidationSummariesLoading = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfolioCusipModelValidationSummariesLoading
);

export const getPortfolioCusipModelValidationSummariesLoaded = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfolioCusipModelValidationSummariesLoading
);

export const getPortfolioCusipModelValidationSummariesError = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPortfolioCusipModelValidationSummariesError
);





export const getBidlistsViewMode = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getBidlistsViewMode
);

export const getBidlists = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getBidlists
);

export const getBidListsPanelData = createSelector(
    getBidlists,
    (bidlistsState, props) => {
        if (bidlistsState && bidlistsState[props.panelType]) {
            return bidlistsState[props.panelType].data;
        } else {
            return []
        }
    }
);

export const getBidListsPanelLoading = createSelector(
    getBidlists,
    (bidlistsState, props) => {
        if (bidlistsState && bidlistsState[props.panelType]) {
            return bidlistsState[props.panelType].loading;
        }
    }
);

export const getBidListsPanelDataLoaded = createSelector(
    getBidlists,
    (bidlistsState, props) => {
        if (bidlistsState && bidlistsState[props.panelType]) {
            return bidlistsState[props.panelType].loaded;
        }
    }
);

export const getBidListsPanelError = createSelector(
    getBidlists,
    (bidlistsState, props) => {
        if (bidlistsState && bidlistsState[props.panelType]) {
            return bidlistsState[props.panelType].error;
        }
    }
);

export const getBidlistIndicativeDataLoadingOnOffSwitch = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getBidlistIndicativeDataLoadingOnOffSwitch
)

// export const getBidlistsLoading = createSelector(
//     getAgencyAnalyticsPoolViewerState,
//     fromPoolViewer.getBidlistsLoading
// );

// export const getBidlistsLoaded = createSelector(
//     getAgencyAnalyticsPoolViewerState,
//     fromPoolViewer.getBidlistsLoaded
// );

// export const getBidlistsError = createSelector(
//     getAgencyAnalyticsPoolViewerState,
//     fromPoolViewer.getBidlistsError
// );







// --------------------------------------------------------------------------------------------------------

export const getAgencyAnalyticsPoolItemsGridColumnsLayoutsIds = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPoolItemsGridColumnsLayoutsIds
);

export const getAgencyAnalyticsPoolItemsGridColumnsLayoutsEntities = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPoolItemsGridColumnsLayoutsEntities
);

export const getAgencyAnalyticsPoolItemsGridColumnsLayoutsLoadingStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPoolItemsGridColumnsLayoutsLoading
);

export const getAgencyAnalyticsPoolItemsGridColumnsLayoutsLoadedStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPoolItemsGridColumnsLayoutsLoaded
);

export const getAgencyAnalyticsPoolItemsGridColumnsLayoutsError = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPoolItemsGridColumnsLayoutsError
);

export const getAgencyAnalyticsPoolItemsGridColumnsLayouts = createSelector(
    getAgencyAnalyticsPoolItemsGridColumnsLayoutsIds,
    getAgencyAnalyticsPoolItemsGridColumnsLayoutsEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);




export const getAgencyAnalyticsPoolItemsIds = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPoolItemsGroupingsIds
);

export const getAgencyAnalyticsPoolItemsGroupingsEntities = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPoolItemsGroupingsEntities
);

export const getAgencyAnalyticsPoolItemsGroupingsLoadingStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPoolItemsGroupingsLoading
);

export const getAgencyAnalyticsPoolItemsGroupingsLoadedStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPoolItemsGroupingsLoaded
);

export const getAgencyAnalyticsPoolItemsGroupingsError = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPoolItemsGroupingsError
);

export const getAgencyAnalyticsPoolItemsGroupings = createSelector(
    getAgencyAnalyticsPoolItemsIds,
    getAgencyAnalyticsPoolItemsGroupingsEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);







export const getAgencyAnalyticsCreatingPortfolioStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getCreatingPortfolio
);

export const getAgencyAnalyticsCreatedPortfolioStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getCreatedPortfolio
);

export const getAgencyAnalyticsCreatedPortfolioError = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getCreatePortfolioError
);


export const getAgencyAnalyticsPoolViewerGridSize = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getPoolViewerGridSize
);





export const getAgencyAnalyticsDefaultScenariosIds = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getDefaultScenariosIds
);

export const getAgencyAnalyticsDefaultScenariosEntities = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getDefaultScenariosEntities
);

export const getAgencyAnalyticsDefaultScenariosLoadingStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getDefaultScenariosLoading
);

export const getAgencyAnalyticsDefaultScenariosLoadedStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getDefaultScenariosLoaded
);

export const getAgencyAnalyticsDefaultScenariosError = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getDefaultScenariosError
);

export const getAgencyAnalyticsDefaultScenarios = createSelector(
    getAgencyAnalyticsDefaultScenariosIds,
    getAgencyAnalyticsDefaultScenariosEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);




export const getAgencyAnalyticsConfigurationGlobalSettings = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getConfigurationGlobalSettings
);

export const getAgencyAnalyticsConfigurationSeveritySettings = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getConfigurationSeveritySettings
);

export const getAgencyAnalyticsConfigurationCalibrationSettings = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getConfigurationCalibrationSettings
);

export const getAgencyAnalyticsConfigurationLoadingStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getConfigurationLoading
);

export const getAgencyAnalyticsConfigurationLoadedStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getConfigurationLoaded
);

export const getAgencyAnalyticsConfigurationError = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getConfigurationError
);





export const getAgencyAnalyticsRiskFreeRate = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getRiskFreeRate
)

export const getAgencyAnalyticsRiskFreeRateLoadingStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getLoadingRiskFreeRate
)

export const getAgencyAnalyticsRiskFreeRateLoadedStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getLoadedRiskFreeRate
)

export const getAgencyAnalyticsRiskFreeRateLoadError = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getloadRiskFreeRateError
)





export const getAgencyAnalyticsUpdatingRiskFreeRateStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getUpdatingRiskFreeRate
)

export const getAgencyAnalyticsUpdatedRiskFreeRateStatus = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getUpdatedRiskFreeRate
)

export const getAgencyAnalyticsUpdateRiskFreeRateError = createSelector(
    getAgencyAnalyticsPoolViewerState,
    fromPoolViewer.getUpdateRiskFreeRateError
)