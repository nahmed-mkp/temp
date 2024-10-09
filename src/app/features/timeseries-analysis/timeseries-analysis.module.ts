import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';

import * as fromRoutes from './timeseries-analysis-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';

import { effects } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.TimeseriesAnalysisLayoutComponent,
    fromContainers.TimeseriesWatchlistLayoutComponent,
    fromContainers.TimeseriesViewerLayoutComponent,
    fromContainers.TimeseriesSearchLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.TimeseriesWatchlistComponent,
    fromComponents.TimeseriesWatchListEditorComponent,
    fromComponents.TimeseriesSearchComponent
];

const FEATURE_PROVIDERS = [
    fromServices.TimeseriesSearchService,
    fromServices.TimeseriesAnalysisService
];

const FEATURE_GUARDS = [    
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

        fromRoutes.TimeseriesAnalysisRoutingModule
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    entryComponents: [
        fromContainers.TimeseriesSearchLayoutComponent
    ],
    exports: []
})
export class TimeseriesAnalysisModule { }
