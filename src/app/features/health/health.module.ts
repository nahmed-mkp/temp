import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HighchartsChartModule } from 'highcharts-angular';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import { HealthRoutingModule } from './health-routing.module';
import * as fromSharedModules from './../../shared';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.HealthLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.HealthSnapshotComponent,
    fromComponents.BloombergSnapshotComponent,
    fromComponents.JobSchedulerSnapshotComponent,
    fromComponents.CalcServerSnapshotComponent,
    fromComponents.RiskServerSnapshotComponent,
    fromComponents.ProcessRestartConfirmationComponent,
    fromComponents.AppHistoryComponent,
    fromComponents.AppHistoryViewerComponent,
    fromComponents.ProcessMonitorComponent
];

const FEATURE_PROVIDERS = [
    fromServices.HealthService
];

const FEATURE_GUARDS = [
    fromGuards.HealthStatusGuard
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
        HealthRoutingModule,
        StoreModule.forFeature('health', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class HealthModule { }
