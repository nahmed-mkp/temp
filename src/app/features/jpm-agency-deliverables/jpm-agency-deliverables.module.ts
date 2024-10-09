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
import { jpmAgencyDeliverablesRoutingModule } from './jpm-agency-deliverables-routing.module';
import { effects, reducers } from './store';


const FEATURE_CONTAINERS = [
  fromContainers.JpmAgencyDeliverablesLayoutComponent
];
const FEATURE_COMPONENTS = [
  fromComponents.JpmAgencyDataGridViewerComponent,
  fromComponents.JpmAgencyConfigGridViewerComponent
];
const FEATURE_PROVIDERS = [
  fromServices.JpmAgencyDeliverableService,
];

const FEATURE_GUARDS = [];

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
        jpmAgencyDeliverablesRoutingModule,

        StoreModule.forFeature('jpmAgencyDeliverables', reducers),

        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS,
    ],
    exports: []
})
export class JpmAgencyDeliverablesModule { }
