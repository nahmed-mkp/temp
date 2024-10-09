import { createSelector } from '@ngrx/store';

import * as fromRateCard from '../reducers/rate-card.reducers';
import * as fromFeature from '../reducers';
import * as fromModels from './../../models/rate-card.model';
import { withLatestFrom } from 'rxjs/operators';

export const getRateCardStateSlice = createSelector(
    fromFeature.getRateCardState,
    (state: fromFeature.RateCardState) => state.rateCard
);


export const getGroupingData = createSelector(
    getRateCardStateSlice,
    fromRateCard.getGroupingData
)

export const getGroupingDataLoading = createSelector(
    getRateCardStateSlice,
    fromRateCard.getGroupingDataLoading
)

// ===========  DATES  ============= //

export const getStartDate = createSelector(
    getRateCardStateSlice,
    fromRateCard.getStartDate
)

export const getEndDate = createSelector(
    getRateCardStateSlice,
    fromRateCard.getEndDate
)

// ===========  CURRENCIES  ============= //

export const getCurrencies = createSelector(
    getRateCardStateSlice,
    fromRateCard.getCurrencies
)

export const getSelectedCurrencies = createSelector(
    getRateCardStateSlice,
    fromRateCard.getSelectedCurrencies
)

// ===========  SEC TYPES  ============= //

export const getSecTypes = createSelector(
    getRateCardStateSlice,
    fromRateCard.getSecTypes
)

export const getSelectedSecTypes = createSelector(
    getRateCardStateSlice,
    fromRateCard.getSelectedSecTypes
)

// ===========  RATE BY FUND AND BUCKET ============= //

export const getRateByFundAndBucket = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateByFundAndBucket
)

export const getRateByFundAndBucketLoading = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateByFundAndBucketLoading
)

export const getRateByFundAndBucketLoaded = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateByFundAndBucketLoaded
)

export const getRateByFundAndBucketError = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateByFundAndBucketError
)


// ===========  RATE BY FUND AND SECURITY ============= 

export const getRateByFundAndSecurity = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateByFundAndSecurity
)

export const getRateByFundAndSecurityLoading = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateByFundAndSecurityLoading
)

export const getRateByFundAndSecurityLoaded = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateByFundAndSecurityLoaded
)

export const getRateByFundAndSecurityError = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateByFundAndSecurityError
)

// ===========  RATE BY EQUITY =============
export const getRateByEquity = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateByEquity
)

export const getRateByEquityLoading = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateByEquityLoading
)

export const getRateByEquityLoaded = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateByEquityLoaded
)

export const getRateByEquityError = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateByEquityError
)

export const getRateSecurityEquityTimeseriesData = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardSecurityEquityTimeseriesData
)

export const getRateSecurityEquityTimeseriesDataLoading = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardSecurityEquityTimeseriesDataLoading
)

export const getRateSecurityEquityTimeseriesDataLoaded = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardSecurityEquityTimeseriesDataLoaded
)

export const getRateSecurityEquityTimeseriesDataError = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardSecurityEquityTimeseriesDataError
)

export const getRateSecurityEquityTimeseriesSecName = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardSecurityEquityTimeseriesSecName
)


// ===========  RATE CARD  ============= 

export const getRateCard = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCard
)

export const getRateCardLoading = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardLoading
)

export const getRateCardLoaded = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardLoaded
)

export const getRateCardError = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardError
)

// ===========  RATE CARD ADMIN FUND/BUCKET TIMESERIES  ============= 

export const getRateCardAdminFundBucketSecName = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardAdminFundBucketSecName
)

export const getRateCardAdminFundBucketTimeseriesData = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardAdminFundBucketTimeseriesData
)

export const getRateCardAdminFundBucketTimeseriesDataLoading = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardAdminFundBucketTimeseriesDataLoading
)

export const getRateCardAdminFundBucketTimeseriesDataLoaded = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardAdminFundBucketTimeseriesDataLoaded
)

// ===========  RATE CARD ADMIN FUND/SEC TIMESERIES  ============= 

export const getRateCardAdminFundSecName = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardAdminFundSecName
)

export const getRateCardAdminFundSecTimeseriesData = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardAdminFundSecTimeseriesData
)

export const getRateCardAdminFundSecTimeseriesDataLoading = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardAdminFundSecTimeseriesDataLoading
)

export const getRateCardAdminFundSecTimeseriesDataLoaded = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardAdminFundSecTimeseriesDataLoaded
)

// ===========  RATE CARD TIMESERIES  ============= 

export const getRateCardTimeseriesSecName = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardTimeseriesSecName
)

export const getRateCardTimeseriesData = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardTimeseriesData
)

export const getRateCardTimeseriesDataLoading = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardTimeseriesDataLoading
)

export const getRateCardTimeseriesDataLoaded = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardTimeseriesDataLoaded
)

export const getRateCardTimeseriesDataError = createSelector(
    getRateCardStateSlice,
    fromRateCard.getRateCardTimeseriesDataError
)

// ===========  FUNDING CHARGES  ============= 

export const getFundingCharges = createSelector(
    getRateCardStateSlice,
    fromRateCard.getFundingCharges
)

export const getFundingChargesLoading = createSelector(
    getRateCardStateSlice,
    fromRateCard.getFundingChargesLoading
)

export const getFundingChargesLoaded = createSelector(
    getRateCardStateSlice,
    fromRateCard.getFundingChargesLoaded
)

export const getFundingChargesError = createSelector(
    getRateCardStateSlice,
    fromRateCard.getFundingChargesError
)