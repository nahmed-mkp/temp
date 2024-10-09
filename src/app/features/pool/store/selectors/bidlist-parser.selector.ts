import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromBidlistParsers from '../reducers/bidlist-parser.reducers';

/**
 * BidlistParser Selector
 */
export const getBidlistParserState = createSelector(
    fromFeature.getAgencyAnalyticsState,
    (state: fromFeature.AgencyAnalyticsState) => state.bidlistParsers
);

export const getBidlistParserExpressionsLoadingStatus = createSelector(
    getBidlistParserState,
    fromBidlistParsers.getExpressionsLoading
);

export const getBidlistParserExpressionsLoadedStatus = createSelector(
    getBidlistParserState,
    fromBidlistParsers.getExpressionsLoaded
);

export const getBidlistParserExpressionsError = createSelector(
    getBidlistParserState,
    fromBidlistParsers.getExpressionsError
);

export const getBidlistParserExpressions = createSelector(
    getBidlistParserState,
    fromBidlistParsers.getExpressions
);

export const getBidlistParserPortfolioIds = createSelector(
    getBidlistParserState,
    fromBidlistParsers.getPortfolioIds
);

export const getBidlistParserPortfolioEntities = createSelector(
    getBidlistParserState,
    fromBidlistParsers.getPortfolioEntities
);

export const getBidlistParserRequestLoading = createSelector(
    getBidlistParserState,
    fromBidlistParsers.getPortfolioRequestLoading
);

export const getBidlistParserRequestLoaded = createSelector(
    getBidlistParserState,
    fromBidlistParsers.getPortfolioRequestLoaded
);

export const getBidlistParserRequestError = createSelector(
    getBidlistParserState,
    fromBidlistParsers.getPortfolioRequestError
);

export const getBidlistParserSelectedPortfolioId = createSelector(
    getBidlistParserState,
    fromBidlistParsers.getPortfolioRequestSelectedPortfolioId
);

export const getBidlistParserSelectedPortfolio = createSelector(
    getBidlistParserSelectedPortfolioId,
    getBidlistParserPortfolioEntities,
    (selectedId, entities) => {
        return entities[selectedId];
    }
);


