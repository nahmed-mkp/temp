import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HighchartsChartModule } from 'highcharts-angular';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';
import { MovingCorrelationRoutingModule } from './moving-correlation-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import  {effects, reducers } from './store';

const FEATURE_CONTAINERS = [
  fromContainers.CorrelationLayoutComponent
];

const FEATURE_COMPONENTS = [
  fromComponents.CorrelationTimeseriesViewerComponent,
  fromComponents.CorrelationWindowsViewerComponent
];

const FEATURE_PROVIDERS = [
  fromServices.CorrelationService
];

@NgModule({
    declarations: [
        ...FEATURE_COMPONENTS,
        ...FEATURE_CONTAINERS,
    ],
    imports: [
        AgGridModule.withComponents([]),
        // HighchartsChartModule,
        CommonModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        MovingCorrelationRoutingModule,
        // store
        StoreModule.forFeature('agencyAnalyticsMovingCorrelation', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [...FEATURE_PROVIDERS],
    exports: []
})
export class MovingCorrelationModule { }
