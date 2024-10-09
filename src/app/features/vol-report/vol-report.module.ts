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
import { VolReportRoutingModule } from './vol-report-routing.module';
import {effects, reducers } from './store';

const FEATURE_CONTAINERS = [
  fromContainers.VolReportLayoutComponent,
  fromContainers.VolReportTimeseriesDialogLayoutComponent
];

const FEATURE_COMPONENTS = [
  fromComponents.VolReportViewerComponent,
  fromComponents.VolReportInfoDialogComponent,
  fromComponents.CustomCheckboxComponent,
  fromComponents.VolReportTimeseriesViewerComponent
];

const FEATURE_PROVIDERS = [
  fromServices.VolReportService
];

const FEATURE_GUARDS = [
  fromGuards.VolReportGuard
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
        VolReportRoutingModule,
        StoreModule.forFeature('volReport', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class VolReportModule { }
