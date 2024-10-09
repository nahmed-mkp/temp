import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AgGridModule } from 'ag-grid-angular';

import 'ag-grid-enterprise';
import { HighchartsChartModule } from 'highcharts-angular';

import * as fromSharedModules from '../../shared';
import * as fromRoutes from './scenario-analysis-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.ScenarioAnalysisLayoutComponent,
    fromContainers.ScenarioAnalysisConfigLayoutComponent,
    fromContainers.ScenarioAnalysisConfigFooterLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.ScenarioAnalysisPortfolioGridViewerComponent,
    fromComponents.ScenarioAnalysisImportDialogViewerComponent,
    fromComponents.ScenarioAnalysisNewPortfolioDialogViewerComponent,
    fromComponents.ScenarioAnalysisGenShocksGridViewerComponent,
    fromComponents.ScenarioAnalysisCustomShocksGridViewerComponent,
    fromComponents.ScenarioAnalysisDeleteCellRendererComponent,
    fromComponents.ScenarioAnalysisSIDDropdownCellRendererComponent
];

const FEATURE_PROVIDERS = [
    fromServices.ScenarioAnalysisService
];

const FEATURE_GUARDS = [
    fromGuards.ScenarioAnalysisGuard
];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
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

        fromRoutes.ScenarioAnalysisRoutingModule,

        StoreModule.forFeature('scenarioAnalysis', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    entryComponents: [
        
    ]
})
export class ScenarioAnalysisModule { }
