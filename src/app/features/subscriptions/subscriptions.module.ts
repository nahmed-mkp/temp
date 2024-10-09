
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HighchartsChartModule } from 'highcharts-angular';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';

import * as fromSharedModules from './../../shared';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import { effects, reducers } from './store';

export const CONTAINERS = [
    fromContainers.SubscriptionsLayoutComponent,
    fromContainers.LiveGridLayoutComponent
];

export const COMPONENTS = [
    fromComponents.LiveGridComponent
];

export const PROVIDERS = [
    fromServices.SubscriptionService
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

        SubscriptionsRoutingModule,

        StoreModule.forFeature('subscriptions', reducers),
        EffectsModule.forFeature(effects)
    ],
    entryComponents: [],
    providers: [
        ...PROVIDERS
    ]

})
export class SubscriptionsModule { }
