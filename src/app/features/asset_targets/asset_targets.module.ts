import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HighchartsChartModule } from 'highcharts-angular';

import * as fromSharedModules from './../../shared';

import { AssetTargetsRoutingModule } from './asset_targets-routing.module';
import * as fromContainers from './containers';
import { effects as scenarioEffects, reducers as scenarioReducers} from '../scenario-management/store'
import * as fromScenarioServices from '../scenario-management/services'
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.AssetTargetsLayoutComponent,
    fromContainers.AssetTargetsGridLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.AssetTargetsParamsComponent,
    fromComponents.AssetTargetsComponent,
    fromComponents.AssetTargetSecurityCellRendererComponent,
    fromComponents.AssetTargetsHistoryViewerComponent,
    fromComponents.AssetTargetEditorViewerComponent,
    fromComponents.AssetTargetScenarioProbabilityViewerComponent,
    fromComponents.AssetTargetScenarioTargetViewerComponent,
    fromComponents.AssetTargetEditorViewerComponent,
    fromComponents.AssetTargetsCalculatorComponent
];

const FEATURE_PROVIDERS = [
    fromServices.AssetTargetsService,
    fromScenarioServices.ScenarioManagementService
];

const FEATURE_GUARDS = [
    fromGuards.AssetTargetsGuard
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

        AssetTargetsRoutingModule,

        StoreModule.forFeature('assetTargets', reducers),
        StoreModule.forFeature('scenarioManagement', scenarioReducers),

        EffectsModule.forFeature(effects),
        EffectsModule.forFeature(scenarioEffects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    entryComponents: [
        fromComponents.AssetTargetSecurityCellRendererComponent,
        fromComponents.AssetTargetsHistoryViewerComponent,
        fromComponents.AssetTargetEditorViewerComponent
    ]
})
export class AssetTargetsModule { }
