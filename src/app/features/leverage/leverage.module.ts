import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { LeverageRoutingModule } from './leverage-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';
import { UtilityService } from 'src/app/services';

export const CONTAINERS = [
    fromContainers.LeverageLayoutComponent
];

export const COMPONENTS = [
    fromComponents.LeverageParamsComponent,
    fromComponents.LeverageComponent
];

export const PROVIDERS = [
    fromServices.LeverageService,
    UtilityService
];

export const GUARDS = [
    fromGuards.LeverageGuard
];

@NgModule({
    declarations: [
        ...CONTAINERS,
        ...COMPONENTS
    ],
    imports: [
        CommonModule,
        AgGridModule.withComponents([]),

        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,

        LeverageRoutingModule,

        StoreModule.forFeature('leverage', reducers),
        EffectsModule.forFeature(effects)
    ],

    providers: [
        ...PROVIDERS,
        ...GUARDS
    ]
})
export class LeverageModule { }
