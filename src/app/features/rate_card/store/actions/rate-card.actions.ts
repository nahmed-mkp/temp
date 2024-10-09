import { createAction } from "@ngrx/store";
import * as fromModels from '../../models';

export const signOff = createAction('[Rate-Card] Sign Off');

export const changeSelectedCurrencies = createAction('[Rate-Card] Change selected currency', (selectedCurrencies: string[]) => ({ selectedCurrencies }));
export const changeSelectedSecTypes = createAction('[Rate-Card] Change selected sec types', (selectedSecTypes: string[]) => ({selectedSecTypes}));

export const changeStartDate = createAction('[Rate-Card] Change start date', (date: Date) => ({date}));
export const changeEndDate = createAction('[Rate-Card] Change end date', (date: Date) => ({ date }));

export const loadGroupingData = createAction('[Rate-Card] Load grouping data', (date: string) => ({date}));
export const loadGroupingDataComplete = createAction('[Rate-Card] Load grouping data complete', (res: any) => ({res}));
export const loadGroupingDataFailed = createAction('[Rate-Card] Load grouping data failed', (err: string) => ({err}));

export const loadRateCard = createAction('[Rate-Card] Load rate card', (payload: fromModels.IRateCardRequest) => ({ payload }));
export const loadRateCardComplete = createAction('[Rate-Card] Load rate card complete', (res: fromModels.IRateCard[]) => ({ res }));
export const loadRateCardFailed = createAction('[Rate-Card] Load rate card failed', (err: string) => ({ err }));

export const loadRateCardAdminFundSecTimeseriesData = createAction('[Rate-Card] Load rate card admin fund/sec timeseries data', (payload: fromModels.ITimeseriesRequest) => ({ payload }));
export const loadRateCardAdminFundSecTimeseriesDataComplete = createAction('[Rate-Card] Load rate card admin fund/sec timeseries data complete', (res: fromModels.IRateCard[]) => ({ res }));
export const loadRateCardAdminFundSecTimeseriesDataFailed = createAction('[Rate-Card] Load rate card admin fund/sec timeseries data failed', (err: string) => ({ err }));

export const loadRateCardAdminFundBucketTimeseriesData = createAction('[Rate-Card] Load rate card admin fund/bucket timeseries data', (payload: fromModels.ITimeseriesRequest) => ({ payload }));
export const loadRateCardAdminFundBucketTimeseriesDataComplete = createAction('[Rate-Card] Load rate card admin fund/bucket timeseries data complete', (res: fromModels.IRateCard[]) => ({ res }));
export const loadRateCardAdminFundBucketTimeseriesDataFailed = createAction('[Rate-Card] Load rate card admin fund/bucket timeseries data failed', (err: string) => ({ err }));

export const loadRateCardTimeseriesData = createAction('[Rate-Card] Load rate card timeseries data', (payload: fromModels.ITimeseriesRequest) => ({ payload }));
export const loadRateCardTimeseriesDataComplete = createAction('[Rate-Card] Load rate card timeseries data complete', (res: fromModels.IRateCard[]) => ({ res }));
export const loadRateCardTimeseriesDataFailed = createAction('[Rate-Card] Load rate card timeseries data failed', (err: string) => ({ err }));

export const loadSecurityEquityTimeseriesData = createAction('[Rate-Card] Load security equity timeseries data', (payload: fromModels.ITimeseriesRequest) => ({ payload }));
export const loadSecurityEquityTimeseriesDataComplete = createAction('[Rate-Card] Load security equity timeseries data complete', (res: fromModels.IRateCard[]) => ({ res }));
export const loadSecurityEquityTimeseriesDataFailed = createAction('[Rate-Card] Load security equity timeseries data failed', (err: string) => ({ err }));

export const loadFundingCharges = createAction('[Rate-Card] Load funding charges', (payload: fromModels.IFundingChargeRequest) => ({ payload }));
export const loadFundingChargesComplete = createAction('[Rate-Card] Load funding charges complete', (res: fromModels.IFundingCharge[]) => ({ res }));
export const loadFundingChargesFailed = createAction('[Rate-Card] Load funding charges failed', (err: string) => ({ err }));

export const loadRateByFundAndSecurity = createAction('[Rate-Card] Load rate by fund and security', (date: Date) => ({date}));
export const loadRateByFundAndSecurityComplete = createAction('[Rate-Card] Load rate by fund and security complete', (res: fromModels.IRateByFundAndSecurity[]) => ({res}));
export const loadRateByFundAndSecurityFailed = createAction('[Rate-Card] Load rate by fund and security failed', (err: string) => ({err}));

export const loadRateByFundAndBucket = createAction('[Rate-Card] Load rate by fund and bucket', (date: Date) => ({date}));
export const loadRateByFundAndBucketComplete = createAction('[Rate-Card] Load rate by fund and bucket complete', (res: fromModels.IRateByFundAndBucket[]) => ({res}));
export const loadRateByFundAndBucketFailed = createAction('[Rate-Card] Load rate by fund and bucket failed', (err: string) => ({ err }));

export const loadRateByEquity = createAction('[Rate-Card] Load rate by equity', (date: Date) => ({date}));
export const loadRateByEquityComplete = createAction('[Rate-Card] Load rate by equity complete', (res: fromModels.IRateByEquity[]) => ({res}));
export const loadRateByEquityFailed = createAction('[Rate-Card] Load rate by equity failed', (err: string) => ({err}));

export const saveFundAndBucketRate = createAction('[Rate-Card] Save rate by fund and bucket', (payload: fromModels.IBucketRateUpdate) => ({ payload }));
export const saveFundAndBucketRateComplete = createAction('[Rate-Card] Save rate by fund and bucket complete', (res: fromModels.IRateByFundAndBucket[]) => ({ res }));
export const saveFundAndBucketRateFailed = createAction('[Rate-Card] Save rate by fund and bucket failed', (err: string) => ({ err }));

export const saveFundAndSecurityRate = createAction('[Rate-Card] Save rate by fund and security', (payload: fromModels.ISecurityRateUpdate) => ({ payload }));
export const saveFundAndSecurityRateComplete = createAction('[Rate-Card] Save rate by fund and security complete', (res: fromModels.IRateByFundAndSecurity[]) => ({ res }));
export const saveFundAndSecurityRateFailed = createAction('[Rate-Card] Save rate by fund and security failed', (err: string) => ({ err }));

export const saveSecurityEquityRate = createAction('[Rate-Card] Save rate by equity', (payload: fromModels.ISecurityEquityRateUpdate) => ({ payload }));
export const saveSecurityEquityRateComplete = createAction('[Rate-Card] Save rate by equity complete', (res: fromModels.IRateByEquity[]) => ({ res }));
export const saveSecurityEquityRateFailed = createAction('[Rate-Card] Save rate by equity failed', (err: string) => ({ err }));
