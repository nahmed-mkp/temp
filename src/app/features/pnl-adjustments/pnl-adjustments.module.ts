import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';
import * as fromRoutes from './pnl-adjustments-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.PnlAdjustmentsLayoutComponent,
    fromContainers.PnlAdjustmentsParamsToolbarLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.PnlAdjustmentsGridViewerComponent,
    fromComponents.PnlAdjustmentsUploadDialogViewerComponent,
    fromComponents.PnlDownloadButtonCellRendererComponent,
    fromComponents.PnlAdjustmentsDownloadDialogViewerComponent
];

const FEATURE_PROVIDERS = [
    fromServices.PnlAdjustmentsService
];

const FEATURE_GUARDS = [
    fromGuards.PnlAdjustmentsGuard
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
        fromRoutes.PnlAdjustmentsRoutingModule,
        // store
        StoreModule.forFeature('pnl-adjustments', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: [],
})
export class PnlAdjustmentsModule { }
