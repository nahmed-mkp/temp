import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';
import * as fromRoutes from './tagging-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { effects, reducers } from './store';
import { SecurityEditorModule } from '../security-editor/security-editor.module';
import { MarketDataModule } from '../market-data/market-data.module';

const FEATURE_CONTAINERS = [
    fromContainers.TaggingLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.TradeNameTaggingComponent,
    fromComponents.PositionTaggingComponent,
    fromComponents.TaggingParamsComponent,
    fromComponents.TagLookupEditorComponent,

    fromComponents.TagChangeResetConfirmationComponent,
    fromComponents.MessageDialogConfirmationComponent,
    fromComponents.CheckboxCellRendererComponent
];

const FEATURE_PROVIDERS = [
    fromServices.TaggingService
];

const FEATURE_GUARDS = [
    fromGuards.TagListGuard,
    fromGuards.TaggingLookupGuard
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
        SecurityEditorModule,
        MarketDataModule,
        fromRoutes.TaggingRoutingModule,
        // store
        StoreModule.forFeature('tagging', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class TaggingModule { }
