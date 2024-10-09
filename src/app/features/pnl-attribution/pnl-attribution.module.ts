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

import { PnlAttributionRoutingModule } from './pnl-attribution-routing.module';
import { PnlAttributionPodCapitalsReportViewerComponent } from './components/pnl-attribution-pod-capitals-report-viewer/pnl-attribution-pod-capitals-report-viewer.component';

const FEATURE_CONTAINERS = [
    fromContainers.PnlAttributionLayoutComponent,
    fromContainers.PnlAttributionReportLayoutComponent,
    fromContainers.PnlAttributionDetailGridLayoutComponent,
    fromContainers.PnlAttributionCustomGroupingDialogComponent,
    fromContainers.PnlAttributionSubLayoutComponent,
    fromContainers.PnlAttributionNewLayoutConfirmationDialogComponent,
    fromContainers.PnlAttributionTimeseriesLayoutComponent,
    fromContainers.PnlAttributionDetailLayoutComponent,
    fromContainers.PnlAttributionTabLayoutComponent,
];

const FEATURE_COMPONENTS = [
    fromComponents.PnlAttributionParamsComponent,
    fromComponents.PnlAttributionViewerComponent,
    fromComponents.YearSelectorComponent,
    fromComponents.PnlAttributionReportViewerComponent,
    fromComponents.PnlAttributionDetailGridViewerComponent,
    
    fromComponents.PnlAttributionTimeseriesGridViewerComponent,
    fromComponents.PnlAttributionTimeseriesHistogramViewerComponent,
    fromComponents.PnlAttributionTimeseriesPlotViewerComponent,
    fromComponents.PnlAttributionDetailViewerComponent,
    fromComponents.PnlAttributionParamsReadonlyComponent,
    fromComponents.PnlAttributionCapitalReportViewerComponent,
    fromComponents.PnlAttributionPodCapitalsReportViewerComponent,
    fromComponents.PnlAttributionCapitalsReportEomViewerComponent,
    fromComponents.PnlAttributionPodCapitalsEOMReportViewerComponent
];

const FEATURE_GUARDS = [
    fromGuards.PnlAttributionGuard,
    fromGuards.PnlAttributionReadonlyGuard
];

const FEATURE_PROVIDERS = [
    fromServices.PnlAttributionService
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
        PnlAttributionRoutingModule,
        StoreModule.forFeature('attribution', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class PnlAttributionModule { }
