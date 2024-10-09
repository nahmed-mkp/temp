import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HighchartsChartModule } from 'highcharts-angular';

import { MacroAnalyticsPackageRoutingModule } from './macro-package-routing.module';
import * as fromSharedModules from './../../shared';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.MacroPackageLayoutComponent,
    fromContainers.EquitiesPackageLayoutComponent,
    fromContainers.CreditPackageLayoutComponent,
    fromContainers.CommoditiesPackageLayoutComponent,
    fromContainers.InflationPackageLayoutComponent,
    fromContainers.MacroPackageTimeseriesDialogLayoutComponent,
];

const FEATURE_COMPONENTS = [

    // Equities
    fromComponents.EquitiesDataTimeseriesViewerDialogComponent,
    fromComponents.EquitiesColumnRangeCellViewerComponent,
    fromComponents.EquitiesAnalyticsComponent,

    // Credit
    fromComponents.CreditAnalyticsComponent,

    // Commodities
    fromComponents.CommoditiesAnalyticsComponent,

    // Inflation
    fromComponents.InflationAnalyticsComponent,

    fromComponents.MacroPackageTimeseriesViewerComponent,
    fromComponents.MacroPackageTimeseriesPreviewTooltipComponent,
    fromComponents.MacroPackageDataTooltipComponent,
];

const FEATURE_PROVIDERS = [
    fromServices.MacroEquitiesService,
    fromServices.MacroCreditService,
    fromServices.MacroCommoditiesService,
    fromServices.MacroInflationService
];

const FEATURE_GUARDS = [
    fromGuards.EquitiesAnalyticsGuard,
    fromGuards.CreditAnalyticsGuard,
    fromGuards.CommoditiesAnalyticsGuard,
    fromGuards.InflationAnalyticsGuard
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
        MacroAnalyticsPackageRoutingModule,
        StoreModule.forFeature('macroAnalytics', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class MacroAnalyticsPackageModule { }
