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

import { SNRDashboardsRoutingModule } from './snr-dashboards-routing.module';

const FEATURE_CONTAINERS = [
    fromContainers.SNRDashboardsLayoutComponent,
    fromContainers.SNRMacroDashboardsLayoutComponent,
    fromContainers.SnrMacroDashboardSummaryLayoutComponent,
    fromContainers.SnrMacroDashboardDetailLayoutComponent,
    fromContainers.SnrDashboardCountryLayoutComponent,
];

const FEATURE_COMPONENTS = [
    fromComponents.SnrMacroToolbarComponent,
    fromComponents.SnrMacroQuarterlyGdpPlotViewerComponent,
    fromComponents.SnrMacroMonthlyGdpPlotViewerComponent,
    fromComponents.SnrMacroMonthlyInflationPlotViewerComponent,
    fromComponents.SnrMacroDecompositionPlotViewerComponent,
    fromComponents.SnrMacroGeneralPlotViewerComponent,
    fromComponents.SnrMacroGeneralMonthlyPlotViewerComponent,
    fromComponents.SnrAssetTargetViewerComponent
];

const FEATURE_GUARDS = [
    fromGuards.SNRMacroGuard
];

const FEATURE_PROVIDERS = [
    fromServices.SNRDashboardService
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
        SNRDashboardsRoutingModule,
        StoreModule.forFeature('snr', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class SNRDashboardsModule { }
