import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromRCPMServices from '../rcpm2-0/services';
import * as fromGuards from './guards';
import {effects, reducers } from './store';
import { FactorExposureRoutingModule } from './factor-exposure-routing.module';
import { UtilityService } from 'src/app/services';

const FEATURE_CONTAINERS = [
  fromContainers.FactorExposureLayoutComponent,

];

const FEATURE_COMPONENTS = [
  fromComponents.LeverageParamsComponent,
  fromComponents.FactorsTabComponent,
  fromComponents.FactorExposureTabViewerComponent,
  fromComponents.DynamicTabComponent,
  fromComponents.HistogramViewerComponent
]
 
const FEATURE_PROVIDERS = [
  fromServices.FactorExposureService,
  fromRCPMServices.PositionViewerService
];

const FEATURE_GUARDS = [
  fromGuards.FactorExposureGuard,
  fromGuards.UserSettingsGuard
]

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
        FactorExposureRoutingModule,
        StoreModule.forFeature('factorExposure', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})

export class FactorExposureModule { }
