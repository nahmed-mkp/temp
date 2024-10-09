import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

import * as fromSharedModules from './../../shared';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';
import { CommissionsRoutingModule } from './commissions-routing.module';


const FEATURE_CONTAINERS = [
    fromContainers.CommissionsLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.CommissionsToolbarComponent,
    fromComponents.CommissionsComponent,
    fromComponents.CommissionsUploadProgressDialogComponent,
    fromComponents.CommissionsInstructionsDialogComponent
];

const FEATURE_PROVIDERS = [
    fromServices.CommissionsService
];

const FEATURE_GUARDS = [
    fromGuards.CommissionsGuard
];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS,
    ],
    imports: [
        AgGridModule.withComponents([]),
        ChartModule,
        HighchartsChartModule,
        CommonModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        CommissionsRoutingModule,
        // store
        StoreModule.forFeature('commissions', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class CommissionsModule { }
