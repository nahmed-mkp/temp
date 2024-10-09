import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlotterRoutingModule } from './blotter-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromSharedModules from './../../shared';
import { effects, reducers } from './store';
import { GridCellDatePickerComponent } from 'src/app/components';

const CONTAINERS = [
    fromContainers.BlotterDividendLayoutComponent,
    fromContainers.BlotterGeneralLayoutComponent,
    fromContainers.BlotterDividendAllocationModifierDialogComponent,
]

const COMPONENTS = [
    fromComponents.BlotterDividendViewerComponent,
    fromComponents.BlotterDividendAllocationViewerComponent
]

const PROVIDERS = [
    fromServices.DividendService
]

@NgModule({
    declarations: [
        ...CONTAINERS,
        ...COMPONENTS,
    ],
    imports: [
        CommonModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        BlotterRoutingModule,
        StoreModule.forFeature('blotter', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...PROVIDERS
    ]
})
export class BlotterModule { }
