import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromSharedModules from './../../shared';

import { BrokerBicMapRoutingModule } from './broker-bic-map-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.BrokerBicMapLayoutComponent,
    fromContainers.BrokerBipMapEditorLayoutDialogComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.BrokerBicMapViewerComponent
];

const FEATURE_PROVIDERS = [
    fromServices.BrokerBicMapService,
];

const FEATURE_GUARDS = [
    fromGuards.BrokerGuard
];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS,
    ],
    imports: [
        CommonModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        BrokerBicMapRoutingModule,
        StoreModule.forFeature('brokerBicMap', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS,
    ],
    exports: []
})
export class BrokerBicMapModule { }
