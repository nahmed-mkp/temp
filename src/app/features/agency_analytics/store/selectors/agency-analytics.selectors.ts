import { createSelector } from '@ngrx/store';

import * as _ from 'lodash';

import * as fromModels from './../../models/agency-analytics.models';

import * as fromFeature from '../reducers';
import * as fromAgencyAnalytics from '../reducers/agency-analytics.reducers';

const getAgencyAnalyticsState = createSelector(
    fromFeature.getAgencyAnalyticsFeatureState,
    (state: fromFeature.AgencyAnalyticsState) => state.agencyAnalytics
);

/** Portfolios **/

export const getMode = createSelector(
    getAgencyAnalyticsState, 
    fromAgencyAnalytics.getMode
)

export const getAgencyLookups = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getLookups
);

export const getAgencyLookupsLoading = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getLookupsLoading
);

export const getAgencyLookupsLoaded = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getLookupsLoaded
);

export const getAgencyLookupsError = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getLookupsError
);

export const getPortfolioIds = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getPortfolioIds
);

export const getPortfolioEntities = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getPortfolioEntities
);

export const getPortfoliosLoading = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getPortfoliosLoading
);

export const getPortfoliosLoaded = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getPortfoliosLoaded
);

export const getPortfoliosError = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getPortfoliosError
);

export const getPortfolios = createSelector(
    getPortfolioIds,
    getPortfolioEntities,
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
);

export const getExpandedNodes = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getExpandedNodes
);


export const getPortfoliosTree = createSelector(
    getPortfolios,
    getExpandedNodes,
    (portfolios, expandedNodes) => {
        const treePaths = portfolios.sort((a, b) => {
            return b['sortOrder1'].localeCompare(a['sortOrder1']);
        }).map((portfolio) => portfolio['treePath']);

        const hierarchy = treePaths.reduce((hier, path) => {
            var x = hier;

            path.split('/').forEach((item) => {
                if (!x[item]) {
                    x[item] = {};
                }
                x = x[item];
            });
            x.treePath = path;
            x.portfolios = portfolios.filter((portfolio) => portfolio['treePath'] === path).sort((a, b) => {
                return a['sortOrder2'].localeCompare(b['sortOrder2']);
            });
            return hier;
        }, {});
        
        const result: fromModels.TreeNode[] = buildPortfolioTreeRecursively(hierarchy, [], 1, '', expandedNodes);
        return result;
    }    
)

function buildPortfolioTreeRecursively(obj: any, parent: any[], level: number, 
    parentPath: string, expandedNodes: string[]): fromModels.TreeNode[] {
    Object.keys(obj).forEach((key) => {
        if (key === 'portfolios' || key === 'treePath') {
            parent = [...obj['portfolios']]
        } else {
            const treePath = parentPath === '' ? key : parentPath + '/' + key;
            const item: fromModels.TreeNode = {
                name: key, 
                children: [], 
                level: level, 
                treePath: treePath, 
                expanded: expandedNodes.indexOf(treePath) >= 0
            };
            item['children'] = buildPortfolioTreeRecursively(obj[key], item['children'], level + 1, treePath, expandedNodes);
            parent.push(item);            
        }
    });
    return parent;
}

/** Portfolio Creation **/

export const getNewPortfolio = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getNewPortfolio
);

export const getPortfolioCreating = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getPortfolioCreating
);

export const getPortfolioCreated = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getPortfolioCreated
);

export const getPortfolioCreationError = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getPortfolioCreationError
);

/** Search **/

export const getSearchResults = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getSearchResults
);

export const getSearchingStatus = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getSearchingStatus
);

export const getSearchedStatus = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getSearchedStatus
);

export const getSearchError = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getSearchError
);

/** Security Validation **/

export const getValidSecurities = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getValidSecurities
);

export const getValidatingSecurities = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getValidatingSecurities
);

export const getValidatedSecurities = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getValidatedSecurities
);

export const getValidatingSecuritiesError = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getValidatingSecuritiesError
);

/** Loaded Portfolios **/

export const getLoadedPortfolioIds = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getLoadedPortfolioIds
);

export const getLoadedPortfolios = createSelector(
    getLoadedPortfolioIds, 
    getPortfolioEntities, 
    (ids, entities) => {
        return ids.map((id) => entities[id]);
    }
)

/** Portfolio Details **/

export const getActivePortfolio = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getActivePortfolio
);

export const getPortfolioDetailsLoading = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getPortfolioDetailsLoading
);

export const getPortfolioDetailsLoaded = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getPortfolioDetailsLoaded
);

export const getPortfolioDetailsError = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getPortfolioDetailsError
);

export const getLoadedPortfolioDetailsEntities = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getPortfolioDetailsEntities
);

export const getActivePortfolioDetail = createSelector(
        getActivePortfolio,
        getLoadedPortfolioDetailsEntities,
        (portfolio, entities) => {
            return entities && entities[portfolio.guid];
        }
);

export const getSelectedPortfolioDetails = (guid: string) => {
    return createSelector(
        getLoadedPortfolioDetailsEntities,
        (entities) => {
            return entities && entities[guid];
        }
    );
};

export const getSelectedPortfolioDetailsLoading = (guid: string) => {
    return createSelector(
        getPortfolioDetailsLoading,
        (portfolioLoading): boolean => {
            return portfolioLoading && portfolioLoading[guid];
        }
    );
};

export const getSelectedPortfolioDetailsLoaded = (guid: string) => {
    return createSelector(
        getPortfolioDetailsLoaded,
        (portfolioLoaded): boolean => {
            return portfolioLoaded && portfolioLoaded[guid];
        }
    );
};

export const getSelectedPortfolioDetailsError = (guid: string) => {
    return createSelector(
        getPortfolioDetailsError,
        (portfolioError): string => {
            return portfolioError && portfolioError[guid];
        }
    );
};

/** Grid Views **/

export const getPortfolioGridViews = createSelector(
    getAgencyAnalyticsState,
    fromAgencyAnalytics.getPortfolioGridViews
);

export const getActivePortfolioGridViews = createSelector(
    getPortfolioGridViews,
    getActivePortfolio, 
    (gridViews, activePortfolio) => {
        return (gridViews && activePortfolio && gridViews[activePortfolio.guid]) || {'selectedViews': []};
    }
);