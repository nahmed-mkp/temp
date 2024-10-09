import * as fromRoot from '../../../../store';

import { createFeatureSelector } from '@ngrx/store';

import * as fromAgency from './agency.reducer';
import * as fromAssetSwaps from './asset-swaps.reducer';
import * as fromEquities from './equities.reducer';
import * as fromFutures from './futures.reducer';
import * as fromFx from './fx.reducer';
import * as fromNonAgency from './non-agency.reducer';
import * as fromOptions from './options.reducer';
import * as fromRepo from './repo.reducer';
import * as fromSwaps from './swaps.reducer';
import * as fromSwaptions from './swaptions.reducer';
import * as fromSynthetics from './synthetics.reducer';
import * as fromTreasury from './treasury.reducer';
import * as fromUi from './ui.reducer';
import * as fromMultiAssetOptions from './multi-asset-options.reducer';
import * as fromRV from './rv.reducer';
import * as fromManualMarks from './manual-marks.reducer';
import * as fromBVALBondPrices from './bval.reducer';

export interface PricingEngineState {
    agency: fromAgency.AgencyState;
    assetSwaps: fromAssetSwaps.AssetSwapsState;
    equities: fromEquities.EquitiesState;
    futures: fromFutures.FuturesState;
    fx: fromFx.FxState;
    nonAgency: fromNonAgency.NonAgencyState;
    options: fromOptions.OptionsState;
    repo: fromRepo.RepoState;
    swaps: fromSwaps.SwapsState;
    swaptions: fromSwaptions.SwaptionsState;
    synthetics: fromSynthetics.SyntheticsState;
    treasury: fromTreasury.TreasuryState;
    ui: fromUi.UiState;
    multiAssetOptions: fromMultiAssetOptions.State,
    rv: fromRV.State,
    manualMarks: fromManualMarks.State,
    bvalBondPrices: fromBVALBondPrices.State
}
export interface State extends fromRoot.RootState {
    'pricingEngine': PricingEngineState;
}

export const reducers = {
    agency: fromAgency.reducer,
    assetSwaps: fromAssetSwaps.reducer,
    equities: fromEquities.reducer,
    futures: fromFutures.reducer,
    fx: fromFx.reducer,
    nonAgency: fromNonAgency.reducer,
    options: fromOptions.reducer,
    repo: fromRepo.reducer,
    swaps: fromSwaps.reducer,
    swaptions: fromSwaptions.reducer,
    synthetics: fromSynthetics.reducer,
    treasury: fromTreasury.reducer,
    ui: fromUi.reducer,
    multiAssetOptions: fromMultiAssetOptions.reducer,
    rv: fromRV.reducer,
    manualMarks: fromManualMarks.reducer,
    bvalBondPrices: fromBVALBondPrices.reducer
};

export const getPricingEngineFeatureState = createFeatureSelector<PricingEngineState>('pricingEngine');




