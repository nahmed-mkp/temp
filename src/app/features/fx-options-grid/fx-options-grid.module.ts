
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HighchartsChartModule } from 'highcharts-angular';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import { FXOptionsGridRoutingModule } from './fx-options-grid-routing.module';
import * as fromSharedModules from './../../shared';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.FXOptionsGridLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.FXOptionsSummaryComponent,
    fromComponents.FXOptionsTabComponent,
    fromComponents.FXOptionsSummaryViewerComponent,
    fromComponents.FXOptionsViewerComponent
];

const FEATURE_PROVIDERS = [
    fromServices.FXOptionsGridService
];

const FEATURE_GUARDS = [
];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS,
    ],
    imports: [
        CommonModule,
        HighchartsChartModule,
        AgGridModule.withComponents([]),
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        FXOptionsGridRoutingModule,
        StoreModule.forFeature('optionsGrid', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class FXOptionsGridModule { }
