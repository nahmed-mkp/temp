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

import { RiskSpanRoutingModule } from './risk-span-routing.module';

const FEATURE_CONTAINERS = [
  fromContainers.RiskSpanLayoutComponent,
  fromContainers.RiskSpanMultiPlotLayoutComponent,
  fromContainers.RiskSpanRequestLayoutComponent
];

const FEATURE_COMPONENTS = [

  // Result viewer
  fromComponents.RiskSpanPlotViewerComponent,
  fromComponents.RiskSpanRawDataViewerComponent,
  fromComponents.RiskSpanConfigurationPanelComponent,
  fromComponents.RiskSpanRecordsViewerDialogComponent,
  fromComponents.RiskSpanQueryViewerComponent,

  // Request
  fromComponents.RiskSpanRequestComponent,
  fromComponents.RiskSpanFilterComponent,
  fromComponents.RiskSpanBucketComponent
];

const FEATURE_GUARDS = [
  fromGuards.RiskSpanSchemaGuard
]

const FEATURE_PROVIDERS = [
  fromServices.RiskSpanService,
  fromServices.RiskSpanRequestService
]

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
        RiskSpanRoutingModule,
        StoreModule.forFeature('riskSpan', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class RiskSpanModule { }
