import { Action } from '@ngrx/store';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum AssetSwapsActionTypes {
    LOAD_ASSET_SWAPS = '[PricingEngine] Load asset swaps',
    LOAD_ASSET_SWAPS_COMPLETE = '[PricingEngine] Load asset swaps complete',
    LOAD_ASSET_SWAPS_FAILED = '[PricingEngine] Load asset swaps Failed',
}





/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class LoadAssetSwaps implements Action {
    readonly type = AssetSwapsActionTypes.LOAD_ASSET_SWAPS;
}

export class LoadAssetSwapsComplete implements Action {
    readonly type = AssetSwapsActionTypes.LOAD_ASSET_SWAPS_COMPLETE;

    constructor(public payload: any) { }
}

export class LoadAssetSwapsFailed implements Action {
    readonly type = AssetSwapsActionTypes.LOAD_ASSET_SWAPS_FAILED;

    constructor(public payload: string) { }
}









/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type AssetSwapsActions
    = LoadAssetSwaps
    | LoadAssetSwapsComplete
    | LoadAssetSwapsFailed;