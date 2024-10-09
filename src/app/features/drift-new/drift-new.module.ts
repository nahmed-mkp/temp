import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromSharedModules from './../../shared';
import * as fromRoutes from './drif-new-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
// import * as fromGuards from './guards';

import { effects, reducers } from './store';
import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

export const FEATURE_CONTAINERS = [
    fromContainers.DriftNewLayoutComponent
];

export const FEATURE_COMPONENTS = [
    fromComponents.DriftNewParamsComponent
];

export const FEATURE_SERVICES = [
    fromServices.DriftNewService
];

export const FEATURE_GUARDS = [

];


@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS
    ],
    imports: [ 
        CommonModule,
        AgGridModule.withComponents([]),
        
        HighchartsChartModule,

        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,

        fromRoutes.DriftNewRoutingModule,

        StoreModule.forFeature('driftsNew', reducers),
        EffectsModule.forFeature(effects)
        
    ],
    exports: [],
    providers: [
        ...FEATURE_SERVICES,
        ...FEATURE_GUARDS
    ],
})
export class DriftNewModule {}