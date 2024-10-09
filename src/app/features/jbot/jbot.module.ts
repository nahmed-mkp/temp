import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HighchartsChartModule } from 'highcharts-angular';

import * as fromSharedModules from './../../shared';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';
import { JbotRoutingModule } from './jbot-routing.module';

const FEATURE_CONTAINERS = [
  fromContainers.JbotLayoutComponent,
  fromContainers.JbotTimeseriesDialogLayoutComponent,
  fromContainers.JbotTechLayoutComponent,
  fromContainers.JbotMonitorLayoutComponent,
  fromContainers.JBotSummaryLayoutComponent
];

const FEATURE_COMPONENTS = [
  fromComponents.JbotViewerComponent,
  fromComponents.JbotTimeseriesViewerComponent,
  fromComponents.JbotTechViewerComponent,
  fromComponents.JbotMonitorViewerComponent,
  fromComponents.JbotSummaryViewerComponent,
  fromComponents.JbotHeatmapComponent
];

const FEATURE_PROVIDERS = [
  fromServices.JbotService,
  fromServices.ColorCodingService,
  fromServices.JbotTechService,
  fromServices.JbotMonitorService,
  fromServices.JbotSummaryService,
];

const FEATURE_GUARDS = [
  fromGuards.JbotGuard,
  fromGuards.JbotTechGuard,
  fromGuards.JbotMonitorGuard,
  fromGuards.JbotSummaryGuard,
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
        JbotRoutingModule,
        StoreModule.forFeature('jbot', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class JbotModule { }
