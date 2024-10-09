import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HighchartsChartModule } from 'highcharts-angular';

import * as fromSharedModules from './../../shared';

import * as fromComponents from './components';

import { ShockAnalysisRoutingModule } from './shock-analysis-routing.module';

// const FEATURE_CONTAINERS = [
//     fromContainers.RiskSpanLayoutComponent,
//     fromContainers.RiskSpanMultiPlotLayoutComponent,
//     fromContainers.RiskSpanRequestLayoutComponent
// ];

const FEATURE_COMPONENTS = [
    fromComponents.ShockAnalysisLayoutComponent
];

const FEATURE_GUARDS = [
    
]

const FEATURE_PROVIDERS = [
    
]

@NgModule({
    declarations: [
        ...FEATURE_COMPONENTS,
    ],
    imports: [
        CommonModule,
        AgGridModule.withComponents([]),
        HighchartsChartModule,

        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,

        ShockAnalysisRoutingModule,
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class ShockAnalysisModule { }
