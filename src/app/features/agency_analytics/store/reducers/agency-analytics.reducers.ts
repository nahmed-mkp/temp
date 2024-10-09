import * as fromModels from '../../models/agency-analytics.models';
import * as fromYBModels from './../../models/yieldbook.models';
import * as fromActions from '../actions/agency-analytics.actions';

const DEFAULT_INPUT = {
    curves: ['GVT_TSYM', 'SWAP_RFR'],
    inputType: 'Price',
    inputValue: null, // Default everything to par value
}

export interface State {

    mode: "Live" | "Close";

    lookups: any;
    lookupsLoading: boolean;
    lookupsLoaded: boolean;
    lookupsError?: string;

    portfolioIds: string[];
    portfolioEntities: {[id: string]: fromModels.IPortfolio}
    portfoliosLoading: boolean;
    portfoliosLoaded: boolean;
    portfoliosError?: string;

    expandedNodes: string[];

    searchResults: fromYBModels.ISearchResult;
    searching: boolean;
    searched: boolean;
    searchError?: string;

    validSecurites: fromModels.IValidSecurity[];
    validatingSecurities: boolean;
    validatedSecurities: boolean;
    validatingSecuritiesError?: string;

    newPortfolio?: fromModels.INewPortfolio | fromModels.IPortfolio,
    portfolioCreating: boolean;
    portfolioCreated: boolean;
    portfolioCreationError?: string;
    portfolioDeleting: boolean;
    portfolioDeleted: boolean;
    portfolioDeletionError?: string;

    loadedPortfolioIds: string[];
    portfolioDetailsEntities: {[id: string]: fromModels.ISecurityDetail[]};
    portfolioDetailsLoading: {[id: string]: boolean};
    portfolioDetailsLoaded: {[id: string]: boolean};
    portfolioDetailsError: {[id: string]: string};

    activePortfolio?: fromModels.IPortfolio;

    gridViews: {[id: string]: fromModels.IGridViews};

};

const initialState: State = {
    mode: "Live", 

    lookups: {},
    lookupsLoading: false,
    lookupsLoaded: false,

    portfolioIds: [],
    portfolioEntities: {},
    portfoliosLoading: false,
    portfoliosLoaded: false,

    expandedNodes: [],

    searchResults: null,
    searching: false,
    searched: false, 

    validSecurites: [],
    validatingSecurities: false,
    validatedSecurities: false,

    portfolioCreating: false,
    portfolioCreated: false,
    portfolioDeleting: false,
    portfolioDeleted: false,

    loadedPortfolioIds: [],
    portfolioDetailsEntities: {},
    portfolioDetailsLoading: {},
    portfolioDetailsLoaded: {},
    portfolioDetailsError: {},

    gridViews: {}
};

export function reducer(state = initialState, action: fromActions.AgencyAnalyticsActions): State {
    switch (action.type) {

        case fromActions.AgencyAnalyticsActionTypes.TOGGLE_LIVE_OR_CLOSE_MODE: {
            return {
                ...state, 
                mode: state.mode === 'Close' ? 'Live' : 'Close'
            }
        }

        case fromActions.AgencyAnalyticsActionTypes.LOAD_LOOKUPS: {
            return {
                ...state,
                lookupsLoading: true,
                lookupsLoaded: false,
                lookupsError: null
            };
        }

        case fromActions.AgencyAnalyticsActionTypes.LOAD_LOOKUPS_COMPLETE: {
            return {
                ...state,
                lookupsLoading: false,
                lookupsLoaded: true,
                lookups: {...action.payload }
            };
        }

        case fromActions.AgencyAnalyticsActionTypes.LOAD_LOOKUPS_FAILED: {
            return {
                ...state,
                lookupsLoading: false,
                lookupsLoaded: false,
                lookupsError: action.payload
            };
        }

        case fromActions.AgencyAnalyticsActionTypes.LOAD_PORTFOLIOS: {
            return {
                ...state,
                portfoliosLoading: true,
                portfoliosLoaded: false,
                portfoliosError: null
            };
        }

        case fromActions.AgencyAnalyticsActionTypes.LOAD_PORTFOLIOS_COMPLETE:{
            const payload = action.payload;
            const portfolioIds = payload.map((portfolio: fromModels.IPortfolio) => portfolio.guid);
            const portfolioEntities = payload.reduce((entities: {[id: string]: fromModels.IPortfolio}, item: fromModels.IPortfolio) => {
                return Object.assign({}, entities, {[item.guid]: item});
            }, {});
            return {
                ...state,
                portfoliosLoading: false,
                portfoliosLoaded: true,
                portfolioIds: [...portfolioIds],
                portfolioEntities: {...portfolioEntities}
            };
        }

        case fromActions.AgencyAnalyticsActionTypes.LOAD_PORTFOLIOS_FAILED: {
            return {
                ...state,
                portfoliosLoading: false,
                portfoliosLoaded: false,
                portfoliosError: action.payload
            };
        }

        case fromActions.AgencyAnalyticsActionTypes.CREATE_PORTFOLIO: {
            return {
                ...state, 
                newPortfolio: {...action.payload},
                portfolioCreating: true,
                portfolioCreated: false,
                portfolioCreationError: null
            }
        }

        case fromActions.AgencyAnalyticsActionTypes.CREATE_PORTFOLIO_COMPLETE: {
            return {
                ...state,
                newPortfolio: { ...action.payload },
                portfolioCreating: false,
                portfolioCreated: true
            }
        }

        case fromActions.AgencyAnalyticsActionTypes.CREATE_PORTFOLIO_FAILED: {
            return {
                ...state,
                portfolioCreating: false,
                portfolioCreated: false,
                portfolioCreationError: action.payload
            }
        }

        case fromActions.AgencyAnalyticsActionTypes.DELETE_PORTFOLIO: {
            return {
                ...state,
                newPortfolio: { ...action.payload },
                portfolioDeleting: true,
                portfolioDeleted: false,
                portfolioDeletionError: null
            }
        }

        case fromActions.AgencyAnalyticsActionTypes.DELETE_PORTFOLIO_COMPLETE: {
            const payload: fromModels.IPortfolio = action.payload;
            const ids = state.portfolioIds.filter((id) => id != payload.guid);
            delete state.portfolioEntities[payload.guid];
            return {
                ...state,
                portfolioIds: [...ids],                
                portfolioDeleting: false,
                portfolioDeleted: true
            }
        }

        case fromActions.AgencyAnalyticsActionTypes.DELETE_PORTFOLIO_FAILED: {
            return {
                ...state,
                portfolioDeleting: false,
                portfolioDeleted: false,
                portfolioDeletionError: action.payload
            }
        }

        case fromActions.AgencyAnalyticsActionTypes.SEARCH_SECURITY: {
            return {
                ...state, 
                searching: true,
                searched: false,
                searchError: null
            }
        }

        case fromActions.AgencyAnalyticsActionTypes.SEARCH_SECURITY_COMPLETE: {
            return {
                ...state,
                searching: false,
                searched: true,
                searchResults: {...action.payload},
            }
        }

        case fromActions.AgencyAnalyticsActionTypes.SEARCH_SECURITY_FAILED: {
            return {
                ...state, 
                searching: false,
                searched: false,
                searchError: action.payload
            }
        }

        case fromActions.AgencyAnalyticsActionTypes.VALIDATE_SECURITIES: {
            return {
                ...state,
                validatingSecurities: true,
                validatedSecurities: false,
                validatingSecuritiesError: null
            }
        }

        case fromActions.AgencyAnalyticsActionTypes.VALIDATE_SECURITIES_COMPLETE: {
            return {
                ...state,
                validatingSecurities: false,
                validatedSecurities: true,
                validSecurites: [...action.payload]
            };
        }

        case fromActions.AgencyAnalyticsActionTypes.VALIDATE_SECURITIES_FAILED: {
            return {
                ...state,
                validatingSecurities: false,
                validatedSecurities: false,
                validatingSecuritiesError: action.payload
            }
        }

        case fromActions.AgencyAnalyticsActionTypes.RESET_CREATION_STATE: {
            return {
                ...state,

                // Clear Validating Securities
                validatingSecurities: false,
                validatedSecurities: false,
                validatingSecuritiesError: null,
                validSecurites: [],

                // Clear Portfolio creation state
                newPortfolio: null,
                portfolioCreating: false,
                portfolioCreated: false,
                portfolioCreationError: null
            }
        }

        /******* Load Portfolio *******/

        case fromActions.AgencyAnalyticsActionTypes.LOAD_PORTFOLIO:
        case fromActions.AgencyAnalyticsActionTypes.RELOAD_PORTFOLIO: {
            const portfolio: fromModels.IPortfolio = action.portfolio;
            const loadedPortfolioIds = state.loadedPortfolioIds.filter((guid) => guid !== portfolio.guid);
            const portfolioIds = state.portfolioIds.filter((guid) => guid !== portfolio.guid);

            // const gridViews = Object.assign({}, state.gridViews, {[portfolio.guid]: { 'selectedViews': ['indicative', 'ror'] }});
            
            return {
                ...state, 
                
                activePortfolio: portfolio,
                // gridViews: gridViews, 
                portfolioIds: [portfolio.guid, ...portfolioIds],
                portfolioEntities: Object.assign({}, state.portfolioEntities, {[portfolio.guid]: portfolio}),                
                loadedPortfolioIds: [...loadedPortfolioIds, portfolio.guid],
                portfolioDetailsEntities: Object.assign({}, state.portfolioDetailsEntities, { [portfolio.guid]: null}),
                portfolioDetailsLoading: Object.assign({}, state.portfolioDetailsLoading, { [portfolio.guid]: true}),
                portfolioDetailsLoaded: Object.assign({}, state.portfolioDetailsLoaded, { [portfolio.guid]: false }),
                portfolioDetailsError: Object.assign({}, state.portfolioDetailsError, { [portfolio.guid]: null }),
            }
        }
        
        case fromActions.AgencyAnalyticsActionTypes.LOAD_PORTFOLIO_COMPLETE:
        case fromActions.AgencyAnalyticsActionTypes.RELOAD_PORTFOLIO_COMPLETE: {

            const portfolio: fromModels.IPortfolio = action.portfolio;
            const details: fromModels.IPortfolioDetail = action.details;
            const securities = [...portfolio.securities];

            const indic = details.indic || {};
            const pyCalc = details.py_calc || {};
            const scenarioCalc = details.scenario_calc || {};
            const actVsProj = details.act_vs_prj || {};
            const editable = portfolio.editable || false;

            let hasIndic = false;
            let hasPYCalc = false;
            let hasROR = false;
            let hasActVsProj = false;

            const securityDetails: fromModels.ISecurityDetail[] = [];
            securities.forEach((security: fromModels.ISecurity) => {
                let secDetail: fromModels.ISecurityDetail = {
                    security: security,
                    hasIndic: false,
                    hasPYCalc: false,
                    hasROR: false,
                    hasActVsProj: false, 
                    editable: editable,
                    inputType: security.inputType,
                    inputValue: security.inputValue
                };

                const identifier = security.identifier;
                const userTag = security.inputName;

                // bind Indicative Data
                if (identifier in indic) {
                    hasIndic = true;
                    secDetail.indic = indic[identifier];
                    secDetail.hasIndic = true;
                } else if (userTag in indic) { 
                    hasIndic = true;
                    secDetail.indic = indic[userTag];
                    secDetail.hasIndic = true;
                }

                // bind PYCalc Data
                if (security.identifier in pyCalc) {
                    hasPYCalc = true;
                    secDetail.pyCalc = pyCalc[identifier];
                    secDetail.hasPYCalc = true;
                } else if (userTag in pyCalc) {
                    hasPYCalc = true;
                    secDetail.pyCalc = pyCalc[userTag];
                    secDetail.hasPYCalc = true;
                }

                // This is where we copy inputs from the corresponding 
                // request to the secDetail section...
                if (secDetail.pyCalc && secDetail.pyCalc['inputs']) {                     
                    const inputs = secDetail.pyCalc['inputs'];
                    const asOfDate = inputs['asOfDate'];
                    const levelType = inputs['levelType'];
                    const levelValue = inputs['levelValue'];
                    const modelCode = inputs['modelCode'];
                    const includePartials = inputs['includePartialDuration'];
                    const otherDurations = inputs['otherDurations'];                    
                    const editable = inputs['editable'];
                    
                    let security = secDetail['security'];
                    security['curves'] = [...inputs['curves']];
                    switch (levelType) { 
                        case 'd': 
                            security['inputType'] = 'Price';
                            break;
                        case 'o':
                            security['inputType'] = 'OAS';
                            break;
                        case 'y':
                            security['inputType'] = 'Yield';
                            break;
                        default:
                            security['inputType'] = 'Price';
                            break;
                    }
                    security['modelCode'] = modelCode;
                    security['includePartialDuration'] = includePartials;
                    security['otherDurations'] = otherDurations;
                    security['priceDate'] = asOfDate;                                        
                } else {
                    secDetail['security'] = Object.assign({}, secDetail['security'], DEFAULT_INPUT);
                    secDetail['security']['inputType'] = security['inputType'] ? security['inputType'] : DEFAULT_INPUT['inputType'];                    
                }

                // bind RoR Data
                if (security.identifier in scenarioCalc) {
                    hasROR = true;
                    secDetail.ror = scenarioCalc[identifier];
                    secDetail.hasROR = true;
                } else if (userTag in scenarioCalc) {
                    hasROR = true;
                    secDetail.ror = scenarioCalc[userTag];
                    secDetail.hasROR = true;
                }

                // bind Actual vs. Prepay
                if (security.identifier in actVsProj) {
                    hasActVsProj = true;
                    secDetail.actVsProj = actVsProj[identifier];
                    secDetail.hasActVsProj = true;
                } else if (userTag in actVsProj) {
                    hasActVsProj = true;
                    secDetail.actVsProj = actVsProj[userTag];
                    secDetail.hasActVsProj = true;
                }

                securityDetails.push(secDetail);
            });

            const selectedViews = [];
            if (hasIndic) { 
                selectedViews.push('indicative');
            }
            if (hasPYCalc) { 
                selectedViews.push('py');
            }
            if (hasROR) { 
                selectedViews.push('ror');
            }
            if (hasActVsProj) { 
                selectedViews.push('actvsproj');
            }

            const gridViews = Object.assign({}, state.gridViews, {[portfolio.guid]: { 'selectedViews': [...selectedViews] }});
            const loadedPortfolioIds = state.loadedPortfolioIds.filter((guid) => guid !== portfolio.guid);
            return {
                ...state,
                gridViews: gridViews,
                loadedPortfolioIds: [...loadedPortfolioIds, portfolio.guid],
                portfolioDetailsEntities: Object.assign({}, state.portfolioDetailsEntities, { [portfolio.guid]: [...securityDetails] }),
                portfolioDetailsLoading: Object.assign({}, state.portfolioDetailsLoading, { [portfolio.guid]: false }),
                portfolioDetailsLoaded: Object.assign({}, state.portfolioDetailsLoaded, { [portfolio.guid]: true })
            }
        }

        case fromActions.AgencyAnalyticsActionTypes.LOAD_PORTFOLIO_FAILED:
        case fromActions.AgencyAnalyticsActionTypes.RELOAD_PORTFOLIO_FAILED: {
            const portfolio: fromModels.IPortfolio = action.portfolio;
            const payload: string = action.payload;
            const loadedPortfolios = state.loadedPortfolioIds.filter((guid) => guid !== portfolio.guid);
            return {
                ...state,
                loadedPortfolioIds: [...loadedPortfolios, portfolio.guid],
                portfolioDetailsEntities: Object.assign({}, state.portfolioDetailsEntities, { [portfolio.guid]: null }),
                portfolioDetailsLoading: Object.assign({}, state.portfolioDetailsLoading, { [portfolio.guid]: false }),
                portfolioDetailsLoaded: Object.assign({}, state.portfolioDetailsLoaded, { [portfolio.guid]: false }),
                portfolioDetailsError: Object.assign({}, state.portfolioDetailsError, { [portfolio.guid]: payload }),
            }
        }

        /******************************/

        /********* UI ONLY Actions  *********/

        case fromActions.AgencyAnalyticsActionTypes.CLOSE_PORTFOLIO: {

            const portfolio: fromModels.IPortfolio = action.portfolio;
            const loadedPortfolioIds = state.loadedPortfolioIds.filter((guid) => guid !== portfolio.guid);
            const portfolioIds = state.portfolioIds.filter((guid) => guid !== portfolio.guid);

            delete state.portfolioDetailsEntities[portfolio.guid];
            delete state.portfolioDetailsLoading[portfolio.guid];
            delete state.portfolioDetailsLoaded[portfolio.guid];
            delete state.portfolioDetailsError[portfolio.guid];

            return {
                ...state,
                activePortfolio: null,
                portfolioIds: [portfolio.guid, ...portfolioIds],
                portfolioEntities: Object.assign({}, state.portfolioEntities, { [portfolio.guid]: portfolio }),
                loadedPortfolioIds: [...loadedPortfolioIds]
            }
        }

        case fromActions.AgencyAnalyticsActionTypes.SELECT_PORTFOLIO: {
            return {
                ...state,
                activePortfolio: action.portfolio
            }
        }

        case fromActions.AgencyAnalyticsActionTypes.CHANGE_PORTFOLIO_GRID_VIEWS: {
            return {
                ...state, 
                gridViews: Object.assign({}, state.gridViews, {[action.portfolio.guid]: action.selectedViews})
            };
        }

        case fromActions.AgencyAnalyticsActionTypes.EXPAND_NODE: {
            const id = action.node.treePath;
            const expandedNodes = state.expandedNodes.filter((p) => p !== id);
            return {
                ...state ,
                expandedNodes: [id, ...expandedNodes]
            }
        }
        
        case fromActions.AgencyAnalyticsActionTypes.COLLAPSE_NODE: {
            const id = action.node.treePath;
            const expandedNodes = state.expandedNodes.filter((p) => p !== id);
            return {
                ...state,
                expandedNodes: [...expandedNodes]
            }
        }

        default: {
            return state;
        }
    }
}

export const getMode = (state: State) => state.mode;

export const getLookups = (state: State) => state.lookups;
export const getLookupsLoading = (state: State) => state.lookupsLoading;
export const getLookupsLoaded = (state: State) => state.lookupsLoaded;
export const getLookupsError = (state: State) => state.lookupsError;

export const getPortfolioIds = (state: State) => state.portfolioIds;
export const getPortfolioEntities = (state: State) => state.portfolioEntities;
export const getPortfoliosLoading = (state: State) => state.portfoliosLoading;
export const getPortfoliosLoaded = (state: State) => state.portfoliosLoaded;
export const getPortfoliosError = (state: State) => state.portfoliosError;

export const getSearchResults = (state: State) => state.searchResults;
export const getSearchingStatus = (state: State) => state.searching;
export const getSearchedStatus = (state: State) => state.searched;
export const getSearchError = (state: State) => state.searchError;

export const getValidSecurities = (state: State) => state.validSecurites;
export const getValidatingSecurities = (state: State) => state.validatingSecurities;
export const getValidatedSecurities = (state: State) => state.validatedSecurities;
export const getValidatingSecuritiesError = (state: State) => state.validatingSecuritiesError;

export const getNewPortfolio = (state: State) => state.newPortfolio;
export const getPortfolioCreating = (state: State) => state.portfolioCreating;
export const getPortfolioCreated = (state: State) => state.portfolioCreated;
export const getPortfolioCreationError = (state: State) => state.portfolioCreationError;

export const getActivePortfolio = (state: State) => state.activePortfolio;
export const getLoadedPortfolioIds = (state: State) => state.loadedPortfolioIds;


export const getPortfolioDetailsEntities = (state: State) => state.portfolioDetailsEntities;
export const getPortfolioDetailsLoading = (state: State) => state.portfolioDetailsLoading;
export const getPortfolioDetailsLoaded = (state: State) => state.portfolioDetailsLoaded;
export const getPortfolioDetailsError = (state: State) => state.portfolioDetailsError;

export const getPortfolioGridViews = (state: State) => state.gridViews;
export const getExpandedNodes = (state: State) => state.expandedNodes;