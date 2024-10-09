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
import {effects, reducers } from './store';
import { EventAnalysisRoutingModule } from './event-analysis-routing.module';

import * as fromMarketDataSearch from './../../shared/custom/market-data-search/market-data-search.module';
import { MarketDataSearchCellEditorComponent } from 'src/app/shared/custom/market-data-search/containers';

const FEATURE_CONTAINERS = [
  fromContainers.EventAnalysisLayoutComponent,
  fromContainers.EventCalendarManagementLayoutDialogComponent,
  fromContainers.EventAnalysisRecordsLayoutDialogComponent,
];

const FEATURE_COMPONENTS = [
  fromComponents.EventAnalysisArchiveRecordsViewerComponent,
  fromComponents.EventAnalysisConfigurationPanelComponent,
  fromComponents.EventAnalysisFormulaTimeseriesSettingComponent,
  fromComponents.EventAnalysisRawdataViewerComponent,
  fromComponents.EventAnalysisPlotViewerComponent,
  fromComponents.EventAnalysisEventPlotViewerComponent,
  fromComponents.EventAnalysisStatisticViewerComponent,
  fromComponents.EventAnalysisResultPopupComponent,
  fromComponents.EventAnalysisEventCalendarManagementDialogComponent,
  fromComponents.EventAnalysisCreateCalenderDialogComponent,
  fromComponents.EventAnalysisFourmulaTimeseriesVariablesDialogComponent,
  fromComponents.EventAnalysisCreateArchiveRecordDialogComponent,
  fromComponents.EventAnalysisCustomFunctionsDialogComponent,
  fromComponents.RegressionAnalysisSubsettingComponent,
  fromComponents.EventAnalysisCellVisibilityIconComponent,
  fromComponents.EventAnalysisCellDeleteIconComponent,
];
 
const FEATURE_PROVIDERS = [
  fromServices.EventAnalysisService
];

const FEATURE_GUARDS = [
  fromGuards.EventCalenderGuard,
  fromGuards.PreprocessOptionsGuard,
  fromGuards.ActiveConfigurationGuard,
  fromGuards.CustomFunctionsGuard
]

@NgModule({
    declarations: [
        ...FEATURE_COMPONENTS,
        ...FEATURE_CONTAINERS,
    ],
    imports: [
        AgGridModule.withComponents([]),
        CommonModule,
        HighchartsChartModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        fromMarketDataSearch.MarketDataSearchModule,
        EventAnalysisRoutingModule,
        StoreModule.forFeature('eventAnalysis', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS,
    ],
    exports: []
})
export class EventAnalysisModule { }
