import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AgGridModule } from 'ag-grid-angular';
import { HighchartsChartModule } from 'highcharts-angular';

import * as fromSharedModules from '../../shared';

import { CounterpartyRoutingModule } from './counterparty-routing.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { reducers, effects } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.CounterpartyCDSSpreadLayoutComponent,
    fromContainers.CounterpartyExposureLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.CounterpartyCDSSpreadViewerComponent,
    fromComponents.CounterpartyExposureParamsComponent
];

const FEATURE_PROVIDERS = [
    fromServices.CounterpartyExposureService,
    fromGuards.CounterpartyCDSSpreadsGuard
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

        CounterpartyRoutingModule,

        StoreModule.forFeature('exposures', reducers),

        EffectsModule.forFeature(effects)
    ],
    exports: [
    ],
    providers: [
        ...FEATURE_PROVIDERS
    ],
})
export class CounterpartyModule {}
