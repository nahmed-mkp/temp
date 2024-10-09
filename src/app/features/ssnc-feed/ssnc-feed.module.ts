import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';
import * as fromRoutes from './ssnc-feed-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.SSNCFeedLayout,
    fromContainers.SSNCParamsToolbarLayout,
    fromContainers.SSNCFeedTabLayout

];

const FEATURE_COMPONENTS = [
    fromComponents.SSNCFeedViewer,
    fromComponents.SSNCSummaryViewer,
    fromComponents.SSNCFeedDialogInfoViewer,
    fromComponents.FileDownloadCellRenderer
];

const FEATURE_PROVIDERS = [
    fromServices.SSNCFeedService
];

const FEATURE_GUARDS = [
    fromGuards.SSNCFeedGuard
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
        fromRoutes.SSNCFeedRoutingModule,
        // store
        StoreModule.forFeature('ssnc-feed', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: [],
    entryComponents: [
        fromComponents.FileDownloadCellRenderer
    ]
})
export class SSNCFeedModule { }
