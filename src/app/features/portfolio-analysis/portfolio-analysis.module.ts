import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HighchartsChartModule } from 'highcharts-angular';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import { PortfolioAnalysisRoutingModule } from './portfolio-analysis-routing.module';
import * as fromSharedModules from './../../shared';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import  {effects, reducers } from './store';

const FEATURE_CONTAINERS = [
  fromContainers.PortfolioAnalysisLayoutComponent
];

const FEATURE_COMPONENTS = [
  fromComponents.PortfolioAnalysisCorrMatrixViewerComponent,
  fromComponents.PortfolioAnalysisStatsViewerComponent,
  fromComponents.PortfolioAnalysisTimeseriesViewerComponent
];

const FEATURE_PROVIDERS = [
  fromServices.PortfolioAnalysisService
];

@NgModule({
    declarations: [
        ...FEATURE_COMPONENTS,
        ...FEATURE_CONTAINERS,
    ],
    imports: [
        AgGridModule.withComponents([]),
        HighchartsChartModule,
        CommonModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        PortfolioAnalysisRoutingModule,
        // store
        StoreModule.forFeature('agencyAnalyticsPortfolioAnalysis', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [...FEATURE_PROVIDERS],
    exports: []
})
export class PortfolioAnalysisModule { }
