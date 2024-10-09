import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';
import * as fromRoutes from './sovereign-cds-spreads-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.SovereignCDSSpreadsLayoutComponent,
    fromContainers.SovereignCdsSpreadsParamsLayout

];

const FEATURE_COMPONENTS = [
    fromComponents.SovereignCDSSpreadsViewerComponent
];

const FEATURE_PROVIDERS = [
    fromServices.SovereignCdsSpreadsService
];

const FEATURE_GUARDS = [
    fromGuards.SovereignCdsSpreadsGuard
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
        fromRoutes.SovereignsCdsSpreadsRoutingModule,
        // store
        StoreModule.forFeature('sovereign-cds-spreads', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: [],
})
export class SovereignCdsSpreadsModule { }
