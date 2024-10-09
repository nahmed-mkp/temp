import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromAgencyPortfolio from '../reducers/agency-portfolio.reducer';

const getAgencyPortfolioState = createSelector(
    fromFeature.getAgencyPortfolioState,
    (state: fromFeature.AgencyPortfolioState) => state.agencyPortfolio
);


// UI ------------------------------------------------------

// export const getActiveLayoutNamesEntity = createSelector(
//     getAgencyPortfolioState,
//     fromAgencyPortfolio.getActiveLayout
// );

export const getActiveTab = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getActiveTab
);

// export const getActiveLayoutName = createSelector(
//     getActiveTab,
//     getActiveLayoutNamesEntity,
//     (tab, entity) => {
//         console.log('getting the active layout category', tab, entity)
//         return tab && entity && entity[tab]
//     }
// );
export const getActivePositionLayoutName = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getActivePositionLayoutName
);

export const getActiveBenchmarkLayoutName = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getActiveBenchmarkLayoutName
);

export const getActiveSecurityLayoutName = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getActiveSecurityLayoutName
);

export const getActiveRollsLayoutName = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getActiveRollsLayoutName
);



export const getBarChartShowStatus = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getBarChartShowStatus
);

export const getGlobalTextFilter = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getGlobalTextFilter
);

export const getColumnsSearchDict = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getColumnsSearchDict
);

export const getActiveColumnsSearchDict = createSelector(
    getActiveTab,
    getColumnsSearchDict,
    (tab, entity) => {
        if(tab && entity) return entity[tab];
        else return []
    }
);

export const getTargetColumn = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getTargetColumn
);

export const getAllowLoadingDisplay = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getAllowLoadingDisplay
);

export const getActiveAsOfDate = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getActiveAsOfDate
);








// Datasource -----------------------------------------------------------------------

export const getPositions = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getPositions
);

export const getActiveAsOfDatePositions = createSelector(
    getActiveAsOfDate,
    getPositions,
    (asOfDate, positionsEntity) => {
        if(asOfDate && positionsEntity) return positionsEntity[asOfDate];
        else return []
    }
);

export const getPositionsLoadingStatus = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getPositionsLoading
);

export const getPositionsLoadedStatus = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getPositionsLoaded
);

export const getPositionsError = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getPositionsError
);





export const getSecurities = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getSecurities
);

export const getActiveAsOfDateSecurities = createSelector(
    getActiveAsOfDate,
    getSecurities,
    (asOfDate, securitiesEntity) => {
        if(asOfDate && securitiesEntity) return securitiesEntity[asOfDate];
        else return []
    }
);

export const getSecuritiesLoadingStatus = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getSecuritiesLoading
);

export const getSecuritiesLoadedStatus = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getSecuritiesLoaded
);

export const getSecuritiesError = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getSecuritiesError
);






export const getBenchmarks = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getBenchmarks
);

export const getActiveAsOfDateBenchmarks = createSelector(
    getActiveAsOfDate,
    getBenchmarks,
    (asOfDate, benchmarksEntity) => {
        if(asOfDate && benchmarksEntity) return benchmarksEntity[asOfDate];
        else return []
    }
);

export const getBenchmarksLoadingStatus = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getBenchmarksLoading
);

export const getBenchmarksLoadedStatus = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getBenchmarksLoaded
);

export const getBenchmarksError = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getBenchmarksError
);




export const getRolls = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getRolls
);

export const getActiveAsOfDateRolls = createSelector(
    getActiveAsOfDate,
    getRolls,
    (asOfDate, RollsEntity) => {
        if(asOfDate && RollsEntity) return RollsEntity[asOfDate];
        else return []
    }
);

export const getRollsLoadingStatus = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getRollsLoading
);

export const getRollsLoadedStatus = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getRollsLoaded
);

export const getRollsError = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getRollsError
);



export const getLayouts = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getLayouts
);

export const getActiveTabLayoutsNames = createSelector(
    getLayouts,
    getActiveTab,
    (layoutsEntities, activeTab) => {
        if(activeTab && layoutsEntities) {
           return Object.keys(layoutsEntities).filter(key => layoutsEntities[key].subCategory === activeTab)
            .map(key => layoutsEntities[key].name)
        } else return []
    }
    
    // Object.keys(layoutsEntities)
);

export const getActivePositionLayout = createSelector(
    getActivePositionLayoutName,
    getLayouts,
    (name, entity) => {
        if(name && entity) return entity[name];
        else return null
    }
);

export const getActiveBenchmarkLayout = createSelector(
    getActiveBenchmarkLayoutName,
    getLayouts,
    (name, entity) => {
        if(name && entity) return entity[name];
        else return null
    }
);

export const getActiveSecurityLayout = createSelector(
    getActiveSecurityLayoutName,
    getLayouts,
    (name, entity) => {
        if(name && entity) return entity[name];
        else return null
    }
);

export const getActiveRollsLayout = createSelector(
    getActiveRollsLayoutName,
    getLayouts,
    (name, entity) => {
        if(name && entity) return entity[name];
        else return null
    }
);

// export const getActiveLayout = createSelector(
//     getActiveLayoutName,
//     getLayouts,
//     (name, entity) => {
//         console.log('getting the active layout', name)
//         if(name && entity) return entity[name];
//         else return undefined
//     }
// );

export const getLayoutsLoadingStatus = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getLayoutsLoading
);

export const getLayoutsLoadedStatus = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getLayoutsLoaded
);

export const getLayoutsSavingStatus = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getLayoutsSaving
);

export const getLayoutsSavedStatus = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getLayoutsSaved
);

export const getLayoutsError = createSelector(
    getAgencyPortfolioState,
    fromAgencyPortfolio.getLayoutsError
);
