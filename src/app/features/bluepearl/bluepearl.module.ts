import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromSharedModules from '../../shared';

import { BluePearlRoutingModule } from './bluepearl-routing.module'
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.BluePearlSyntheticTradesLayout,
    fromContainers.BluePearlSettlementLadderLayout,
    fromContainers.BluePearlSettlementLadderToolbarLayout
];

const FEATURE_COMPONENTS = [
    fromComponents.BluePearlSyntheticTradesViewer,
    fromComponents.BluePearlSettlementLadderViewer,
    fromComponents.BluePearlRepoDialogViewerComponent
];

const FEATURE_PROVIDERS = [
    fromServices.BluePearlService,
];

const FEATURE_GUARDS = [
    fromGuards.BluePearlGuard
];

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
        BluePearlRoutingModule,
        StoreModule.forFeature('bluepearl', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS,
    ],
    exports: []
})
export class BluePearlModule { }
