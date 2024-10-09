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
import * as fromGuards from './guards';
import {effects, reducers } from './store';
import { ExposureLadderRoutingModule } from './exposure-ladder-routing.module';
import { UtilityService } from 'src/app/services';

const FEATURE_CONTAINERS = [
  fromContainers.ExposureLadderLayoutComponent,

];

const FEATURE_COMPONENTS = [
  fromComponents.ExposureLadderViewerComponent
];
 
const FEATURE_PROVIDERS = [
  fromServices.ExposureLadderService,
  UtilityService,
];

const FEATURE_GUARDS = [
  fromGuards.ExposureLadderGuard
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
        ExposureLadderRoutingModule,
        StoreModule.forFeature('exposureLadder', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})

export class ExposureLadderModule { }
