import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromSharedModules from '../../shared';

import { ResearchChartsRoutingModule } from './research-charts-routing.module';


import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.ResearchChartsLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.ResearchChartsBrowserComponent,
    fromComponents.ResearchChartsGalleryComponent,
    fromComponents.ResearchChartDialogComponent
];


const FEATURE_PROVIDERS = [    
    fromServices.ResearchChartService
];

const FEATURE_GUARDS = [    
    fromGuards.ResearchChartsGuard
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
        ResearchChartsRoutingModule,
        StoreModule.forFeature('researchCharts', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ]
})
export class ResearchChartsModule { }
