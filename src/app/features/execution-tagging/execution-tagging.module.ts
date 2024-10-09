import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';
import * as fromRoutes from './execution-tagging-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.ExecutionTaggingLayout,
    fromContainers.ExecutionTaggingToolbarLayout

];

const FEATURE_COMPONENTS = [
    fromComponents.ExecutionTaggingGridViewer,
    fromComponents.ExecutionTaggingReasonCellRenderer,
    fromComponents.ExecutionTaggingReasonEditorViewer,
    fromComponents.ExecutionTaggingDeleteCellRendererComponent
];

const FEATURE_PROVIDERS = [
    fromServices.ExecutionTaggingService
];

const FEATURE_GUARDS = [
    fromGuards.ExecutionTaggingGuard
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
        fromRoutes.ExecutionTaggingRoutingModule,
        // store
        StoreModule.forFeature('execution-tagging', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: [],
    entryComponents: []
})
export class ExecutionTaggingModule { }
