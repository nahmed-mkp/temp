import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromSharedModules from '../../shared';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.SecurityEditorGeneralLayoutComponent,
    fromContainers.SecurityEditorGeneralDialogComponent,
];
const FEATURE_COMPONENTS = [
    fromComponents.SecurityEditorMarketDataViewerComponent,
    fromComponents.SecurityEditorSearcherComponent,
    fromComponents.SecurityEditorTagsViewerComponent,
    fromComponents.SecurityEditorSearchResultViewerComponent,
];
const FEATURE_PROVIDERS = [
    fromServices.SecurityEditorService
];
const FEATURE_GUARDS = [];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS,
    ],
    imports: [
        CommonModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        StoreModule.forFeature('securityEditorMaster', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS
    ],
    exports: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS,
    ]
})
export class SecurityEditorModule { }
