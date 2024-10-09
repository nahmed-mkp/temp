import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HighchartsChartModule } from 'highcharts-angular';

import { Rcpm20RoutingModule } from './rcpm2-0-routing.module';

import * as fromSharedModules from './../../shared';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromRenderers from './renderers';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effect } from './store';

import { UtilityService } from 'src/app/services';
import { SecurityEditorModule } from '../security-editor/security-editor.module';

export const CONTAINERS = [
  fromContainers.RcpmLayoutComponent,
  fromContainers.RcpmPnlAttributionLayoutComponent,
  fromContainers.RcpmPositionLayoutComponent,
  fromContainers.RcpmPositionTabLayoutComponent,
  fromContainers.RcpmPositionInfoLayoutComponent,
  fromContainers.RcpmSimulationLayoutComponent,
  fromContainers.RcpmDirectionalityLayoutComponent,
  fromContainers.RcpmPnLLayoutComponent,

  fromContainers.ShockAnalysisLayoutComponent
];

export const COMPONENTS = [
  fromComponents.RcpmPositionViewerComponent,
  fromComponents.RcpmPnlAttrViewerComponent,
  fromComponents.RcpmPositionExecutionViewerComponent,
  fromComponents.RcpmPositionTaxLotsViewerComponent,
  fromComponents.RcpmModeChangePromoteDialogComponent,
  fromComponents.RcpmPositionInfoViewerComponent,
  fromComponents.RcpmTradeNameCreationComponent,
  fromComponents.RcpmDirectionalityComponent,
  fromComponents.RcpmDirectionalityPlotGridViewerComponent,
  fromComponents.RcpmDirectionalityRegressionViewerComponent,
  fromComponents.RcpmSimulationViewerComponent,
  fromComponents.RcpmSimulationHistogramViewerComponent,
  fromComponents.RcpmSimulationPlotViewerComponent,
  fromComponents.RcpmPnlPlotViewerComponent,
  fromComponents.RcpmPnlDataViewerComponent,
  fromComponents.RcpmPnlMonthlyViewerComponent,
  fromComponents.RcpmMissingClosesDialogComponent,
  fromRenderers.RCPMMonthlyPnLCellComponent,

  fromComponents.ShockAnalysisInfoBarComponent
];

export const PROVIDERS = [
  fromServices.RCPM2PositionService,
  fromServices.ShocksAnalysisService,
  fromServices.LayoutService,
  fromServices.RcpmTradeNameService,
  fromServices.SimulationService,
  fromServices.DirectionalityService,
  fromServices.ReturnsService,
  fromServices.DirectionalityViewerService,
  fromServices.PositionViewerService,
  fromServices.DataRetrievalMethodService,
  UtilityService,
];

export const GUARDS = [
  fromGuards.RcpmTradeNameGuard,
  fromGuards.PositionGuard,
];

@NgModule({
    declarations: [
        ...CONTAINERS,
        ...COMPONENTS,
    ],
    imports: [
        CommonModule,
        AgGridModule.withComponents([]),
        HighchartsChartModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        SecurityEditorModule,
        Rcpm20RoutingModule,
        StoreModule.forFeature('RCPM2', reducers),
        EffectsModule.forFeature(effect)
    ],
    providers: [
        ...PROVIDERS,
        ...GUARDS
    ]
})
export class Rcpm20Module { }
