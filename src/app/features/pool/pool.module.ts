import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MAT_LEGACY_DIALOG_DEFAULT_OPTIONS as MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/legacy-dialog';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HighchartsChartModule } from 'highcharts-angular';

import * as fromSharedModules from './../../shared';

import * as fromRoutes from './pool-routing.module';
import * as fromContainers from './container';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';
import { AuthService, UtilityService } from 'src/app/services';
import { RowGroupingComponentComponent } from './components/row-grouping-component/row-grouping-component.component';
import { ColumnGroupingComponentComponent } from './components/column-grouping-component/column-grouping-component.component';

const FEATURE_CONTAINERS = [
  fromContainers.PoolLayoutComponent,
  fromContainers.PoolPortfoliosLayoutComponent,
  fromContainers.PoolPortfoliosItemsLayoutComponent,

  fromContainers.DialsLayoutComponent,
  fromContainers.ScenarioGeneratorLayoutComponent,
  fromContainers.PoolConfigurationLayoutComponent,
  fromContainers.PoolScenarioPickerLayoutComponent,

  fromContainers.YieldbookLayoutComponent,
  fromContainers.PoolPortfolioCurveComparisonLayoutComponent,
  fromContainers.PoolBidlistsLayoutComponent,
];

const FEATURE_COMPONENTS = [
  fromComponents.PoolPortfoliosViewerComponent,
  fromComponents.PoolPortfoliosItemsViewerComponent,
  fromComponents.PoolPortfoliosItemsNotePopupComponent,
  fromComponents.CreateNewPortfolioPopupComponent,

  fromComponents.DialsSetSelectorComponent,
  fromComponents.DialsComponent,
  fromComponents.DialsSetCreateDialogComponent,

  fromComponents.AddCusipsToPortfolioComponent,
  fromComponents.PoolToolbarComponent,
  fromComponents.PoolGridLayoutConfigurationDialogComponent,
  fromComponents.PoolGridGroupingConfigurationDialogComponent,

  fromComponents.ScenarioGeneratorSelectorComponent,
  fromComponents.ScenarioGeneratorViewerComponent,
  fromComponents.PoolConfigurationViewerComponent,
  fromComponents.PoolConfigurationCustomCheckboxComponent,
  fromComponents.PoolScenarioPickerViewerComponent,
  fromComponents.YieldbookQueueMonitorViewerComponent,

  fromComponents.UpdateRiskFreeRateDialogComponent,

  fromComponents.YieldbookRequestsParamsComponent,
  fromComponents.YieldbookRequestLogsComponent,
  fromComponents.YieldbookRequestResponseComponent,
  fromComponents.YieldbookCustomCheckboxComponent,
  fromComponents.CutsomCellDateEditorComponent,

  fromComponents.PoolPortfolioCurveComparisonViewerComponent,
  fromComponents.PrepayRateCustomCellEditorComponent,
  fromComponents.PoolBidlistViewerComponent,
];

const FEATURE_PROVIDERS = [
  fromServices.PoolViewerService,
  fromServices.DialsService,
  fromServices.YieldbookService,
  fromServices.BidlistParserService,
  fromServices.IndicativesService,
  fromServices.LookupsService,
  AuthService,
  UtilityService
];

const FEATURE_GUARDS = [
  fromGuards.PortfoliosGuard,
  fromGuards.PortfoliosItemsGuard,
  fromGuards.YielbookGuard,
  fromGuards.DialsGuard,
  fromGuards.DefaultScenariosGurad,
  fromGuards.ConfigurationsGurad,
  fromGuards.PoolLayoutsGurad,
  fromGuards.PoolItemsGroupingsGuard,
  fromGuards.RiskFreeRateGuard,
  fromGuards.BidlistParserGuard,
  fromGuards.LookupsGuard,
];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS,
        RowGroupingComponentComponent,
        ColumnGroupingComponentComponent,
    ],
    imports: [
        AgGridModule.withComponents([]),
        CommonModule,
        HighchartsChartModule,
        fromRoutes.PoolRoutingModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        /** Store **/
        StoreModule.forFeature('agencyAnalytics', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS,
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
    ],
    exports: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS
    ]
})
export class PoolModule { }
