import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';

import { BenchmarkPortfolioRoutingModule } from './benchmark-portfolio-routing.module';

const FEATURE_CONTAINERS = [
    fromContainers.BenchmarkPortfolioLayoutComponent,
    fromContainers.BenchmarkPortfolioTradesLayoutComponent,
    fromContainers.BenchmarkFileUploadLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.BenchmarkTradeParamsComponent,
    fromComponents.BenchmarkTradesComponent

];

const FEATURE_GUARDS = [
    fromGuards.TradesGuard
];

const FEATURE_PROVIDERS = [
    fromServices.BenchmarkTradesService
];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS,
    ],
    imports: [
        CommonModule,
        AgGridModule.withComponents([]),
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        BenchmarkPortfolioRoutingModule,
        StoreModule.forFeature('benchmarkPortfolio', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class BenchmarkPortfolioModule { }
