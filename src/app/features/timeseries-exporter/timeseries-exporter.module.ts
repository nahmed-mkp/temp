import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';
import * as fromRoutes from './timeseries-exporter-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { effects, reducers } from './store';
import * as fromMarketDataSearch from './../../shared/custom/market-data-search/market-data-search.module';


const FEATURE_CONTAINERS = [
    fromContainers.TimeseriesExporterLayoutComponent,
    fromContainers.TimeseriesExporterEditiorLayoutComponent,
    fromContainers.TimeseriesExporterNewMonitorCreateDialogComponent,
];

const FEATURE_COMPONENTS = [
    fromComponents.TimeseriesExporterParamsComponent,
    fromComponents.TimeseriesMonitorComponent,
    fromComponents.TimeseriesExporterEditorComponent,
    fromComponents.TimeseriesExporterItemsComponent,
    fromComponents.TimeseriesExporterMarketDataSearchCellEditorComponent,
    fromComponents.TimeseriesViewerComponent,
    fromComponents.SecuritySearchCellEditorComponent,
    fromComponents.SecuritySearchComponent,
    fromComponents.MarketDataTypeCellEditorComponent
];

const FEATURE_PROVIDERS = [
    fromServices.TimeseriesExporterService
];

const FEATURE_GUARDS = [
    fromGuards.TimeseriesExporterGuard
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
        fromMarketDataSearch.MarketDataSearchModule,
        fromRoutes.TimeseriesExporterRoutingModule,
        // store
        StoreModule.forFeature('timeseriesExporter', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class TimeseriesExporterModule { }
