import { Action, createAction } from '@ngrx/store';
import { IScenarioProbabilityUpdate, IScenarioTargetUpdate, IOverridePayload } from '../../models';
import * as fromModels from '../../models';


export const checkUserAccess = createAction('[AssetTargets] Check user access');
export const checkUserAccessComplete = createAction('[AssetTargets] Check user access complete', (payload: any) => ({payload}));
export const checkUserAccessFailed = createAction('[AssetTargets] Check user access failed', (err: string) => ({err}));

export const checkAssetType = createAction('[AssetTargets] Change asset type', (payload: 'fv' | 'st') => ({payload}));
export const checkEditorAssetType = createAction('[AssetTargets] Change editor asset type',  (payload: 'fv' | 'st') => ({payload}));

export const checkUserLimitedAccess = createAction('[AssetTargets] Check user limited access');
export const checkUserLimitedAccessComplete = createAction('[AssetTargets] Check user limited access complete', (payload: any) => ({payload}));
export const checkUserLimitedAccessFailed = createAction('[AssetTargets] Check user limited access failed', (err: string) => ({err}));

export const loadAssetTargets = createAction('[AssetTargets] Load asset targets', (assetType: string) => ({assetType}));
export const loadAssetTargetsComplete = createAction('[AssetTargets] Load asset targets complete', (payload: any) => ({payload}));
export const loadAssetTargetsFailed = createAction('[AssetTargets] Load asset targets failed', (err: string) => ({err}));

export const loadEditorAssetTargets = createAction('[AssetTargets] Load editor asset targets', (payload: string) => ({payload}));
export const loadEditorAssetTargetsComplete = createAction('[AssetTargets] Load editor asset targets complete', (payload: any) => ({payload}));
export const loadEditorAssetTargetsFailed = createAction('[AssetTargets] Load editor asset targets failed', (err: string) => ({err}));

export const loadHistoricalAssetTargets = createAction('[AssetTargets] Load editor historical  asset targets', (payload: {assetType: string, date: Date}) => ({payload}));
export const loadHistoricalAssetTargetsComplete = createAction('[AssetTargets] Load editor historical asset targets complete', (payload: any) => ({payload}));
export const loadHistoricalAssetTargetsFailed = createAction('[AssetTargets] Load editor historical asset targets failed', (err: string) => ({err}));

export const loadTestAssetTargets = createAction('[AssetTargets] Load editor test asset targets', (payload: string) => ({payload}));
export const loadTestAssetTargetsComplete = createAction('[AssetTargets] Load editor test asset targets complete', (payload: any) => ({payload}));
export const loadTestAssetTargetsFailed = createAction('[AssetTargets] Load editor test asset targets failed', (err: string) => ({err}));

export const changeShowLevel = createAction('[Asset Targets] Change show levels', (payload: boolean) => ({payload}))

export const changeAssetType = createAction('[Asset Targets] Change asset type', (payload: 'fv' | 'st') => ({payload}));
export const changeEditorAssetType = createAction('Asset Targets] Change editor asset type', (payload: 'fv' | 'st') => ({payload}));

export const loadAssetTargetTimeseries = createAction('[AssetTargets] Load asset target timeseries', (payload: {assetType: string, date: Date}) => ({payload}));
export const loadAssetTargetTimeseriesComplete = createAction('[AssetTargets] Load asset target timeseries complete', (payload: any) => ({payload}));
export const loadAssetTargetTimeseriesFailed = createAction('[AssetTargets] Load asset target timeseries failed', (err: string) => ({err}));

export const overrideAssetTargetProbability = createAction('[AssetTargets] Override probability', (payload: IOverridePayload) => ({payload}));
export const deleteOverrideProbability = createAction('[AssetTargets] Delete override probability', (payload: IOverridePayload) => ({payload}));
export const deleteAllOverrides = createAction('[AssetTargets] Delete all overrides');

export const loadScenarioTargetDashboardData = createAction('[AssetTargets] Load scenario target dashboard data', (assetType: string) => ({assetType}))
export const loadScenarioTargetDashboardDataComplete = createAction('[AssetTargets] Load scenario target dashboard data complete', (payload: any) => ({payload}))
export const loadScenarioTargetDashboardDataFailed = createAction('[AssetTargets] Load scenario target dashboard data failed', (err: string) => ({err}))

export const updateScenarioTarget = createAction('[AssetTargets] Update scenario target', (payload: {assetType: string, data: IScenarioTargetUpdate}) => ({payload}))
export const updateScenarioTargetComplete = createAction('[AssetTargets] Update scenario target complete', (payload: any) => ({payload}))
export const updateScenarioTargetFailed = createAction('[AssetTargets] Update scenario target failed', (err: string) => ({err}))

export const loadScenarioProbabilityDashboardData = createAction('[AssetTargets] Load scenario probability dashboard data', (assetType: string) => ({assetType}))
export const loadScenarioProbabilityDashboardDataComplete = createAction('[AssetTargets] Load scenario probability dashboard data complete', (payload: any) => ({payload}))
export const loadScenarioProbabilityDashboardDataFailed = createAction('[AssetTargets] Load scenario probability dashboard data failed', (err: string) => ({err}))

export const updateScenarioProbability = createAction('[AssetTargets] Update scenario probability', (payload: {assetType: string, data: IScenarioProbabilityUpdate}) => ({payload}))
export const updateScenarioProbabilityComplete = createAction('[AssetTargets] Update scenario probability complete', (payload: any) => ({payload}))
export const updateScenarioProbabilityFailed = createAction('[AssetTargets] Update scenario probability failed', (err: string) => ({err}))

export const updateScenarioSortOrder = createAction('[AssetTargets] Update scenario sort order', (payload: fromModels.ISortOrderUpdatePayload[]) => ({payload}));
export const updateScenarioSortOrderComplete = createAction('[AssetTargets] Update scenario sort order complete');
export const updateScenarioSorderOrderFailed = createAction('[AssetTargets] Update scenario sort order failed', (err: string) => ({err}));

export const getSupportedCalculatorCountries = createAction('[AssetTargets] Get supported calculator countries');
export const getSupportedCalculatorCountriesComplete = createAction('[AssetTargets] Get supported calculator countries complete', (payload: any) => ({payload}));
export const getSupportedCalculatorCountriesFailed = createAction('[AssetTargets] Get supported calculator countries failed', (err: string) => ({err}));

export const loadCalculatorInputsByCountry = createAction('[AssetTargets] Load calculator inputs by country', (country: string) => ({country}))
export const loadCalculatorInputsByCountryComplete = createAction('[AssetTargets] Load calculator inputs by country complete', (res: fromModels.ICalculatorInput[], country: string) => ({res, country}))
export const loadCalculatorInputsByCountryFailed = createAction('[AssetTargets] Load calculator inputs by country failed', (err: string) => ({err}))

export const saveEditedCalculatorInputs = createAction('[AssetTargets] Save edited calculator inputs', (payload: { country: string, data: any}) => ({payload}));
export const removeEditedCalculatorInputs = createAction('[AssetTargets] Remove edited calculator inputs', (country: string) => ({country}))