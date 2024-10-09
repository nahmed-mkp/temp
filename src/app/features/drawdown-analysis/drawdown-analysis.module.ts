import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

import * as fromSharedModules from './../../shared';
import { DrawdownAnalysisRoutingModule } from './drawdown-analysis-routing.module';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromServices from './services';
import  {effects, reducers } from './store';


const FEATURE_CONTAINERS = [
  fromContainers.DrawdownAnalysisLayoutComponent
]

const FEATURE_COMPONENTS = [
  fromComponents.DrawdownAnalysisListViewerComponent,
  fromComponents.DrawdownAnalysisTimeseriesViewerComponent
]

const FEATURE_PROVIDERS = [
  fromServices.DrawdownService
]

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS,
    ],
    imports: [
        AgGridModule.withComponents([]),
        ChartModule,
        HighchartsChartModule,
        CommonModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        DrawdownAnalysisRoutingModule,
        // store
        StoreModule.forFeature('agencyAnalyticsDrawdown', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [...FEATURE_PROVIDERS],
    exports: []
})
export class DrawdownAnalysisModule { }
