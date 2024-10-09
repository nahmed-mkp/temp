import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HighchartsChartModule } from 'highcharts-angular';

import { MarketDataRoutingModule } from './market-data-routing.module';
import * as fromSharedModules from '../../shared';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import { effects, reducers } from './store';
import * as fromMarketDataSearch from './../../shared/custom/market-data-search/market-data-search.module';



const FEATURE_CONTAINERS = [
    fromContainers.MarketDataLayoutComponent,
    fromContainers.MarketDataBackfillDialogComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.MarketDataToolbarComponent,
    fromComponents.MarketDataSearchResultsComponent,
    fromComponents.MarketDataDetailViewerComponent,
    fromComponents.MarketDataTimeseriesGridViewerComponent,
    fromComponents.MarketDataTimeseriesPlotViewerComponent
];

const FEATURE_PROVIDERS = [
    fromServices.MarketDataService
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
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        fromMarketDataSearch.MarketDataSearchModule,
        // MarketDataRoutingModule,
        StoreModule.forFeature('MarketData', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS,
    ]
})
export class MarketDataModule { }
