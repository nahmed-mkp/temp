import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';
import * as fromRoutes from './benchmark-monitor-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import { effects, reducers } from './store';



const FEATURE_CONTAINERS = [
  fromContainers.BenchmarkMonitorLayoutComponent,
  fromContainers.BenchmarkMonitorTbaLayoutComponent,
  fromContainers.BenchmarkMonitorCdxLayoutComponent,
]

const FEATURE_COMPONENTS = [
  fromComponents.BenchmarkMonitorTbaViewerComponent
];

const FEATURE_PROVIDERS = [
  fromServices.BenchmarkMonitorService
];



@NgModule({
    declarations: [
        ...FEATURE_COMPONENTS,
        ...FEATURE_CONTAINERS,
    ],
    imports: [
        AgGridModule.withComponents([]),
        CommonModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        fromRoutes.BenchmarkMonitorRoutingModule,
        StoreModule.forFeature('benchmarkMonitor', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [...FEATURE_PROVIDERS],
    exports: []
})

export class BenchmarkMonitorModule { }

