import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromMaterial from '../../material/material.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';

import { effects, reducers } from './store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { VendorModule } from '../../vendor/vendor.module';


export const FEATURE_CONTAINERS = [
    fromContainers.MarketDataSearchLayoutComponent,
    fromContainers.MarketDataSearchCellEditorComponent,
    fromContainers.MarketDataSearchTimeseriesExporterLayoutComponent,
    fromContainers.MarketDataSecuritySearchTimeseriesExporterLayoutComponent,
    fromContainers.MarketDataSearchAggridCellEditorLayoutComponent,
    fromContainers.MarketDataTypeSearchAggridCellEditorLayoutComponent,
    fromContainers.MarketDataEnhancedSearchLayoutComponent,
];

export const FEATURE_COMPONENTS = [
    fromComponents.MarketDataSearchComponent,
    fromComponents.MarketDataSearchGeneralComponent,
    fromComponents.MarketDataSecuritySearchComponent,
    fromComponents.MarketDateSearchAggridCellEditorInnerComponent,
    fromComponents.MarketDataEnhancedSearchInnerComponent,
];

export const FEATURE_GUARDS = [];

export const FEATURE_PROVIDERS = [
    fromServices.MarketDataSearchService
];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS,
    ],
    imports: [
        CommonModule,

        fromMaterial.MaterialModule,
        VendorModule,

        StoreModule.forFeature('marketDataSearch', reducers),
        EffectsModule.forFeature(effects)
    ],
    exports: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS
    ],
    providers: [
        ...FEATURE_GUARDS,
        ...FEATURE_PROVIDERS
    ],
})
export class MarketDataSearchModule {}
