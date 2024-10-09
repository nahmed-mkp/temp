import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromBVALBondPrices from '../reducers/bval.reducer';

export const getBVALBondPricesState = createSelector(
    fromFeature.getPricingEngineFeatureState,
    (state: fromFeature.PricingEngineState) => state.bvalBondPrices
);

/* ============= AS OF DATE ================= */

export const getBVALPricesAsOfDate = createSelector(
    getBVALBondPricesState,
    fromBVALBondPrices.getAsOfDate
);


/* ============== BVAL Bond Prices ================= */

export const getBVALBondPrices = createSelector(
    getBVALBondPricesState,
    fromBVALBondPrices.getBvalBondPricesData
);

export const getBVALBondPricesLoading = createSelector(
    getBVALBondPricesState,
    fromBVALBondPrices.getBvalBondPricesDataLoading
);

export const getBVALBondPricesLoaded = createSelector(
    getBVALBondPricesState,
    fromBVALBondPrices.getBvalBondPricesDataLoaded
);

export const getBVALBondPricesError = createSelector(
    getBVALBondPricesState,
    fromBVALBondPrices.getBvalBondPricesDataError
);

/* ============= BVAL Bond Price History ================= */

export const getBVALBondPriceHistory = createSelector(
    getBVALBondPricesState,
    fromBVALBondPrices.getBvalBondPriceHistoryData
);

export const getBVALBondPriceHistoryLoading = createSelector(
    getBVALBondPricesState,
    fromBVALBondPrices.getBvalBondPriceHistoryDataLoading
);

export const getBVALBondPriceHistoryLoaded = createSelector(
    getBVALBondPricesState,
    fromBVALBondPrices.getBvalBondPriceHistoryDataLoaded
);

export const getBVALBondPriceHistoryError = createSelector(
    getBVALBondPricesState,
    fromBVALBondPrices.getBvalBondPriceHistoryDataError
);
