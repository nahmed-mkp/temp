import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';
import * as fromRoutes from './sizing-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import {effects, reducers } from './store';

import * as fromMarketDataSearch from './../../shared/custom/market-data-search/market-data-search.module';
import { MarketDataSearchAggridCellEditorLayoutComponent, MarketDataTypeSearchAggridCellEditorLayoutComponent } from 'src/app/shared/custom/market-data-search/containers';
import { MarketDateSearchAggridCellEditorInnerComponent } from 'src/app/shared/custom/market-data-search/components';


const FEATURE_CONTAINERS = [
  fromContainers.SizingSheetLayoutComponent
];

const FEATURE_COMPONENTS = [
  fromComponents.SizingSheetViewerComponent,
  fromComponents.SizingSheetConfigurationComponent,
  fromComponents.SizingSheetSecuritiesComponent,
  fromComponents.SizingSheetSecurityRendererComponent,
  fromComponents.SizingSheetDefaultCapitalComponent
];

const FEATURE_PROVIDERS = [
  fromServices.SizingService
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
        fromRoutes.SizingRoutingModule,
        fromMarketDataSearch.MarketDataSearchModule,
        // store
        StoreModule.forFeature('tradeSizing', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [...FEATURE_PROVIDERS],
    exports: []
})
export class SizingModule { }
