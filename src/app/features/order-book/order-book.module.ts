import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HighchartsChartModule } from 'highcharts-angular';

import * as fromSharedModules from './../../shared';

import { OrderBookRoutingModule } from './order-book-routing.module';
import * as fromMarketDataSearch from './../../shared/custom/market-data-search/market-data-search.module';


import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.OrderBookLayoutComponent,
    fromContainers.OrderBookEmailDialogLayoutComponent,
    fromContainers.OrderBookHelpDialogLayoutComponent,
];

const FEATURE_COMPONENTS = [
    fromComponents.OrderBookParamsComponent,
    fromComponents.OrderBookComponent,
    fromComponents.OrderBookHistoryComponent,
    fromComponents.OrderBookNotesComponent,
    fromComponents.OrderEditorComponent
];


const FEATURE_PROVIDERS = [
    fromServices.OrderBookService
];

const FEATURE_GUARDS = [
    fromGuards.OrderBookGuard
];

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
        OrderBookRoutingModule,
        fromMarketDataSearch.MarketDataSearchModule,
        StoreModule.forFeature('orderBook', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ]
})
export class OrderBookModule { }
