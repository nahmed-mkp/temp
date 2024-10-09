import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';
import * as fromRoutes from './rate-card-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.RateCardLayoutComponnet,
    fromContainers.RateCardToolbarLayoutComponnet
];

const FEATURE_COMPONENTS = [
    fromComponents.RateByFundBucketViewerComponnet,
    fromComponents.RateByFundSecurityViewerComponent,
    fromComponents.RateCardCellRendererComponent,
    fromComponents.RateCardViewerComponent,
    fromComponents.FundingChargesViewerComponent,
    fromComponents.RateCardTimeseriesViewerComponent,
    fromComponents.RateBySecurityEquityViewerComponent
];

const FEATURE_PROVIDERS = [
    fromServices.RateCardService
];

const FEATURE_GUARDS = [
    fromGuards.RateCardGuard
];

@NgModule({
    declarations: [
        ...FEATURE_COMPONENTS,
        ...FEATURE_CONTAINERS,
    ],
    imports: [
        AgGridModule.withComponents([]),
        CommonModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        fromRoutes.RateCardRoutingModule,

        StoreModule.forFeature('ratecard', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: [],
    entryComponents: [
        fromComponents.RateCardCellRendererComponent        
    ]
})
export class RateCardModule { }
