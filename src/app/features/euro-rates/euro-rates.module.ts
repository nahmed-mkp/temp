import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { EuroRatesRoutingModule } from './euro-rates-routing.module';
import * as fromSharedModules from './../../shared';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import {effects, reducers } from './store';

const FEATURE_CONTAINERS = [
  fromContainers.EuroRatesLayoutComponent
];

const FEATURE_COMPONENTS = [
  fromComponents.EuroRatesViewerComponent,
  fromComponents.EuroRateFileDownloadErrorDialogComponent
];

const FEATURE_PROVIDERS = [
  fromServices.EuroRatesService
];

const FEATURE_GUARDS = [
  fromGuards.EuroRateGuard
]

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
        EuroRatesRoutingModule,
        StoreModule.forFeature('euroRates', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class EuroRatesModule { }
