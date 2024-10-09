import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HighchartsChartModule } from 'highcharts-angular';

import { DriftRoutingModule } from './drift-routing.module';

import * as fromSharedModules from './../../shared';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effect } from './store';

import { UtilityService } from 'src/app/services';

export const CONTAINERS = [
    fromContainers.DriftLayoutComponent
];

export const COMPONENTS = [
    fromComponents.DriftParamsComponent,
    fromComponents.FundAllocsComponent,
    fromComponents.TradeNameDriftComponent,
    fromComponents.PositionDriftComponent,
    fromComponents.ExecutionDriftComponent,

    fromComponents.ActualVsDriftRendererComponent,
    fromComponents.TradenameRendererComponent
];

export const PROVIDERS = [
    fromServices.DriftService,
    UtilityService,
];

export const GUARDS = [
    fromGuards.DriftGuard
];

@NgModule({
    declarations: [
        ...CONTAINERS,
        ...COMPONENTS,
    ],
    imports: [
        CommonModule,
        AgGridModule.withComponents([]),
        HighchartsChartModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        DriftRoutingModule,
        StoreModule.forFeature('drifts', reducers),
        EffectsModule.forFeature(effect)
    ],
    providers: [
        ...PROVIDERS,
        ...GUARDS
    ]
})
export class DriftModule { }

