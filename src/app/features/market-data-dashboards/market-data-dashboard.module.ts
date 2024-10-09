import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MarketDataDashboardRoutingModule } from './market-data-dashboard-routing.module';

import * as fromSharedModules from '../../shared';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { effects, reducers } from './store';
import { HighchartsChartModule } from 'highcharts-angular';


const FEATURE_CONTAINERS = [
    fromContainers.MarketDataDashboardLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.BondDashboardComponent,
    fromComponents.BondDashboardChartViewerComponent,
    fromComponents.BondDashboardChartSpreadViewerComponent,
    fromComponents.BillsShortCouponDashboardComponent,
    fromComponents.BillsShortCouponsDashboardChartViewerComponent
];

const FEATURE_PROVIDERS = [
    fromServices.MarketDataDashboardService
];

const FEATURE_GUARDS = [
    fromGuards.MarketDataDashboardGuard
];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS
    ],
    imports: [
        CommonModule,
        HighchartsChartModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        MarketDataDashboardRoutingModule,
        StoreModule.forFeature('dashboard', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS
    ]
})
export class MarketDataDashboardModule { }
