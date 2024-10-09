import { createAction } from "@ngrx/store";
import * as fromModels from '../../models';

export const loadMultiAssetOptions = createAction('[Pricing Engine] Load multi asset options', (payload: fromModels.MultiAssetOptionsDataReq) => ({payload}));
export const loadMultiAssetOptionsComplete = createAction('[Pricing Engine] Load multi asset options complete', (res: any) => ({res}));
export const loadMultiAssetOptionsFailed = createAction('[Pricing Engine] Load multi Asset options failed', (err: string) => ({err}));

export const loadMultiAssetOptionsOwnership = createAction('[Pricing Engine] Load multi asset options ownership', (payload: fromModels.SecurityOwnershipReq) => ({payload}));
export const loadMultiAssetOptionsOwnershipComplete = createAction('[Pricing Engine] Load multi asset options ownership complete', (res: any) => ({res}));
export const loadMultiAssetOptionsOwnershipFailed = createAction('[Pricing Engine] Load multi asset options ownership failed', (err: string) => ({err}));

export const loadMultiAssetOptionsDetail = createAction('[Pricing Engine] Load multi asset options detail', (sid: number) => ({sid}));
export const loadMultiAssetOptionsDetailComplete = createAction('[Pricing Engine] Load multi asset options detail complete', (res: any) => ({res}));
export const loadMultiAssetOptionsDetailFailed = createAction('[Pricing Engine] Load multi asset options detail failed', (err: string) => ({err}));

export const updateMultiAssetOption = createAction('[Pricing Engine] Update multi asset option', (payload: fromModels.MultiAssetOptionUpdateReq) => ({payload}));
export const updateMultiAssetOptionComplete = createAction('[Pricing Engine] Update multi asset option complete', (res: any) => ({res}));
export const updateMultiAssetOptionFailed = createAction('[Pricing Engine] Update multi asset option failed', (err: string) => ({err}));
