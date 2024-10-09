import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HighchartsChartModule } from 'highcharts-angular';

import * as fromSharedModules from './../../../../shared';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';

import { Covid19RoutingModule } from './covid-19-routing.module';

export const FEATURE_CONTAINERS = [
    fromContainers.CovidLayoutComponent,
    fromContainers.CovidTimeseriesPlotLayoutComponent,
];

export const FEATURE_COMPONENTS = [
    fromComponents.CovidTimeseriesConfigurationComponent,
    fromComponents.CovidTimeseriesPlotViewerComponent,

    fromComponents.CovidWorldStatsComponent,
    fromComponents.CovidUSStatsComponent,
    fromComponents.CovidMobilityIndexComponent
];

export const FEATURE_PROVIDERS = [
    fromServices.CovidService
];

export const FEATURE_GUARDS = [
    fromGuards.CovidCountryGuard,
    fromGuards.CovidDataGuard,
    fromGuards.CovidUSGuard,
    fromGuards.CovidUSStatesGuard
];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS,
    ],
    imports: [
        CommonModule,
        AgGridModule.withComponents([]),
        HighchartsChartModule,

        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,

        Covid19RoutingModule,

        StoreModule.forFeature('covid', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class Covid19Module { }
