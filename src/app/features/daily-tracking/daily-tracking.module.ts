import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HighchartsChartModule } from 'highcharts-angular';

import * as fromSharedModules from './../../shared';

import { DailyTrackingRoutingModule } from './daily-tracking-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
  fromContainers.DailyTrackingLayoutComponent,
  fromContainers.TrackingHistoryChartsLayoutComponent,
  fromContainers.MBSIntradayChartLayoutComponent,
  fromContainers.MBSHistoricalChartLayoutComponent
];

const FEATURE_COMPONENTS = [
  fromComponents.TsySwapViewerComponent,
  fromComponents.MbsRawViewerComponent,
  fromComponents.MbsRiskViewerComponent,
  fromComponents.UserInputFormComponent,
  fromComponents.CSClosesComponent,
  fromComponents.MbsOASViewerComponent,
  fromComponents.TrackingHistoryComponent,

  // Charts

  // OHLC
  fromComponents.OHLCChartComponent,
  fromComponents.OHLCParamSheetComponent,

  // Median Hourly
  fromComponents.MedianHourlyChartComponent,
  fromComponents.MedianHourlyParamSheetComponent,

  // Daily
  fromComponents.DailyChartComponent,
  fromComponents.DailyParamSheetComponent,

  fromComponents.DelayRendererComponent,
  fromComponents.MBSIntradayChartComponent,
  fromComponents.MBSHistoricalChartComponent,
  fromComponents.MBSTimeseriesSelectorComponent
];

const FEATURE_PROVIDERS = [
  fromServices.DailyTrackingService,
  fromServices.DailyTrackingUtilityService,
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

    DailyTrackingRoutingModule,
    StoreModule.forFeature('dailyTracking', reducers),
    EffectsModule.forFeature(effects)
  ],
  entryComponents: [
    fromComponents.OHLCParamSheetComponent,
    fromComponents.MedianHourlyParamSheetComponent,
    fromComponents.DailyParamSheetComponent,
    fromComponents.DelayRendererComponent,
    fromContainers.MBSIntradayChartLayoutComponent,
    fromComponents.MBSIntradayChartComponent,
    fromComponents.MBSTimeseriesSelectorComponent,
    fromComponents.MbsOASViewerComponent
  ],
  providers: [
    ...FEATURE_PROVIDERS,
  ]
})
export class DailyTrackingModule { }
