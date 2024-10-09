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
import { AgencyMarketColorRoutingModule } from './agency-market-color-routing.module';

const FEATURE_CONTAINERS = [
  fromContainers.AgencyMarketColorLayoutComponent
];
const FEATURE_COMPONENTS = [
  fromComponents.AgencyMarketColorViewerComponent
];
const FEATURE_PROVIDERS = [];
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
        AgencyMarketColorRoutingModule
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS,
    ],
    exports: []
})
export class AgencyMarketColorModule { }
