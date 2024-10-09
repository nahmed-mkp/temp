import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HighchartsChartModule } from 'highcharts-angular';


import * as fromSharedModules from './../../shared';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
// import * as fromGuards from './guards';

import { MarketDataRatesRoutingModule } from './market-data-rates-routing.module';
import { reducers, effects } from './store';
import { UtilityService } from 'src/app/services';

export const CONTAINERS = [
  fromContainers.MarketDataCurvesLayoutComponent,
  fromContainers.MarketDataForwardRatesLayoutComponent,
  fromContainers.MarketDataRatesTabLayoutComponent,
  fromContainers.MarketDataParRateLayoutComponent,
  fromContainers.MarketDataQEForecastLayoutComponent,
  fromContainers.MarketDataFuturesBasisLayoutComponent,
  fromContainers.MarketDataInflationSwapsLayoutComponent
];

export const COMPONENTS = [
  fromComponents.MarketDataCurvesViewerComponent,
  fromComponents.MarketDataRatesParamsToolbarComponent,
  fromComponents.RatesCentralbankOisRateViewerComponent,
  fromComponents.RatesForwardSwapRatesViewerComponent,
  fromComponents.RatesInflationSwapsRatesViewerComponent,
  fromComponents.RatesOisYearEndPricingViewerComponent,
  fromComponents.MarketDataParRateViewerComponent,
  fromComponents.RatesOisQuarterEndForecastViewerComponent,
  fromComponents.MarketDataFuturesBasisPlotViewerComponent,
  fromComponents.RatesInflationSwapPlotViewerComponent,
  fromComponents.RatesStepChartsViewerComponent
];

export const PROVIDERS = [
  fromServices.MarketDataRatesService
];

export const GUARDS = [];

@NgModule({
  declarations: [
    ...CONTAINERS,
    ...COMPONENTS,
  ],

  imports: [
    CommonModule,
    HighchartsChartModule,

    fromSharedModules.NativeModule,
    fromSharedModules.MaterialModule,
    fromSharedModules.VendorModule,
    fromSharedModules.CustomModule,

    MarketDataRatesRoutingModule,

    StoreModule.forFeature('marketDateRates', reducers),
    EffectsModule.forFeature(effects)
  ],

  providers: [
    ...PROVIDERS,
    ...GUARDS
  ]
})
export class MarketDataRatesModule { }
