import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import { SocketRoutingModule } from './sockets-dashboard-routing.module';
import * as fromSharedModules from '../../shared';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';
import { HighchartsChartModule } from 'highcharts-angular';

const FEATURE_CONTAINERS = [
    fromContainers.SocketsLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.SocketsOverviewComponent
];

const FEATURE_PROVIDERS = [
    fromServices.SocketService
];

const FEATURE_GUARDS = [
    fromGuards.SocketsGuard
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
        SocketRoutingModule,
        StoreModule.forFeature('socketDashboard', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class SocketModule { }
