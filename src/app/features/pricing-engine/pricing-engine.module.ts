import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromSharedModules from './../../shared';
import * as fromContainer from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import { effects, reducers } from './store';

import { PricingEngineRoutingModule } from './pricing-engine-routing.module';
import { SecurityEditorModule } from '../security-editor/security-editor.module';

export const CONTAINERS = [
    fromContainer.PricingEngineGeneralLayoutComponent,
    fromContainer.PricingEngineAgencyLayoutComponent,
    fromContainer.PricingEngineAssetSwapsLayoutComponent,
    fromContainer.PricingEngineEquititesLayoutComponent,
    fromContainer.PricingEngineFuturesLayoutComponent,
    fromContainer.PricingEngineFxLayoutComponent,
    fromContainer.PricingEngineNonAgencyLayoutComponent,
    fromContainer.PricingEngineOptionsLayoutComponent,
    fromContainer.PricingEngineRepoLayoutComponent,
    fromContainer.PricingEngineSwapsLayoutComponent,
    fromContainer.PricingEngineSwaptionsLayoutComponent,
    fromContainer.PricingEngineSyntheticsLayoutComponent,
    fromContainer.PricingEngineTreasuryLayoutComponent,
    fromContainer.PricingEnginePopupViewerComponent,
    fromContainer.PricingEngineMultiAssetOptionLayoutComponent,
    fromContainer.PricingEngineRvLayoutComponent,
    fromContainer.PricingEngineManualMarksLayoutComponent,
    fromContainer.PricingEngineBVALBondsLayoutComponent
];

export const COMPONENTS = [
    fromComponents.PricingEngineAgencyViewerComponent,
    fromComponents.PricingEngineAssetSwapsViewerComponent,
    fromComponents.PricingEngineEquititesViewerComponent,
    fromComponents.PricingEngineFuturesViewerComponent,

    fromComponents.PricingEngineFxViewerComponent,
    fromComponents.PricingEngineFxCurveComponent,

    fromComponents.PricingEngineNonAgencyViewerComponent,
    fromComponents.PricingEngineOptionsViewerComponent,
    fromComponents.PricingEngineRepoViewerComponent,

    fromComponents.PricingEngineSwapsViewerComponent,
    fromComponents.PricingEngineSecurityDetailsViewerComponent,
    fromComponents.PricingEngineOwnwerViewerComponent,

    fromComponents.PricingEngineSwaptionsViewerComponent,
    fromComponents.PricingEngineSyntheticsViewerComponent,
    fromComponents.PricingEngineTreasuryViewerComponent,
    fromComponents.PricingEngineTreasuryAuctionViewerComponent,
    
    fromComponents.PricingEngineMultiAssetOptionViewerComponent,
    fromComponents.PricingEngineRvViewerComponent,

    fromComponents.PricingEngineRvAutocompleteCellRendererComponent,
    fromComponents.PricingEngineManualMarksViewerComponent,

    fromComponents.PricingEngineBVALBondsViewerComponent,
    fromComponents.PricingEngineBVALRendererComponent,
    fromComponents.PricingEngineBVALAutocompleteCellRendererComponent
];

const FEATURE_PROVIDERS = [
    fromServices.PricingEngineService,
    fromServices.PricingEngineUtilityService
]


@NgModule({
    declarations: [
        ...CONTAINERS,
        ...COMPONENTS,
    ],
    imports: [
        CommonModule,

        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,

        PricingEngineRoutingModule,

        SecurityEditorModule,

        StoreModule.forFeature('pricingEngine', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS
    ],
    entryComponents: [
        fromContainer.PricingEnginePopupViewerComponent,
        fromComponents.PricingEngineBVALRendererComponent,
        fromComponents.PricingEngineBVALAutocompleteCellRendererComponent
    ]
})
export class PricingEngineModule { }
