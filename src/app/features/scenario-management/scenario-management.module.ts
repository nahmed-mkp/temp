import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HighchartsChartModule } from 'highcharts-angular';
import * as fromSharedModules from '../../shared';
import { ScenarioManagementRoutingModule } from './scenario-management-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.ScenarioManagementLayoutComponent
];

const FEATURE_COMPONENTS = [
   fromComponents.ScenarioManagementCountryViewerComponent,
   fromComponents.ScenarioManagementForecastViewerComponent,
   fromComponents.ScenarioManagementRconVarViewerComponent,
   fromComponents.ScenarioManagementScenarioViewerComponent,
   fromComponents.ScenarioManagementForecastPeriodViewerComponent,
   fromComponents.ScenarioManagementEconvarDialogViewer,
   fromComponents.ScenarioManagementForecastPeriodDialogViewer,
   fromComponents.ScenarioManagementScenarioDialogViewer,
   fromComponents.ScenarioManagementConfirmCloseDialog,
   fromComponents.ScenarioManagementForecastDialogViewer
];

const FEATURE_PROVIDERS = [
    fromServices.ScenarioManagementService
];

const FEATURE_GUARDS = [
    fromGuards.ScenarioManagementGuard
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

        ScenarioManagementRoutingModule,

        StoreModule.forFeature('scenarioManagement', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    entryComponents: [
        fromComponents.ScenarioManagementEconvarDialogViewer,
        fromComponents.ScenarioManagementForecastPeriodDialogViewer,
        fromComponents.ScenarioManagementScenarioDialogViewer
    ]
})
export class ScenarioManagementModule { }
