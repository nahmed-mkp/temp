import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';

import { ConsensusEconomicsRoutingModule } from './consensus-economics-routing.module';

const FEATURE_CONTAINERS = [
    fromContainers.ConsensusEconomicsLayoutComponent,
    fromContainers.ConsensusEconomicsConstituentsLayoutComponent,
    fromContainers.ConsensusEconomicsExtractionsLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.ConsensusEconomicsExtractionsComponent,
    fromComponents.ConsensusEconomicsConstituentsComponent
];

const FEATURE_GUARDS = [
    fromGuards.ExtractionsGuard,
    fromGuards.ConstituentsGuard
];

const FEATURE_PROVIDERS = [
    fromServices.ConsensusEconomicsService
];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS,
    ],
    imports: [
        CommonModule,
        AgGridModule.withComponents([]),

        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,

        ConsensusEconomicsRoutingModule,

        StoreModule.forFeature('consensusEconomics', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    entryComponents: [
    ],
    exports: []
})
export class ConsensusEconomicsModule { }
