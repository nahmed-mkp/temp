import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';
import * as fromRoutes from './tradename-helper-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { effects, reducers } from './store';
import { AppCustomGridCellCheckboxComponent } from 'src/app/components';


const FEATURE_CONTAINERS = [
    fromContainers.TradeNameHelperLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.TradeNameHelperTaxLotsComponent,
    fromComponents.TradeNameHelperTradeNamesComponent,
    fromComponents.TradeNameHelperCountersComponent,
    fromComponents.TradeNameReinstateConfirmationDialogComponent,
    fromComponents.TradeNameRenameConfirmationDialogComponent
];

const FEATURE_PROVIDERS = [
    fromServices.TradeNameHelperService
];

const FEATURE_GUARDS = [
    fromGuards.TradeNameHelperGuard
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
        fromRoutes.TradeNameHelperRoutingModule,
        // store
        StoreModule.forFeature('tradeNameHelper', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class TradeNameHelperModule { }
