import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HighchartsChartModule } from 'highcharts-angular';

import * as fromSharedModules from './../../shared';

import { AllocationsRoutingModule } from './allocations-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromDirectives from './directives';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';
import { AppCustomGridCellCheckboxComponent, AppCustomGridCellCrudOperationComponent } from 'src/app/components';

const FEATURE_CONTAINERS = [
    fromContainers.TradeAllocationsLayoutComponent,
    fromContainers.TradeAgreementsLayoutComponent,
    fromContainers.SimulatorLayoutComponent,
    fromContainers.CapitalsLayoutComponent,
    fromContainers.TradeNameAllocationRebalancerLayoutComponent,
    fromContainers.CapitalsBottomSheetLayoutComponent,

    fromContainers.CapitalsFundEditorDialogComponent,
    fromContainers.CapitalsCrosspodEditorDialogComponent,
    fromContainers.CapitalsChangePreviewDialogComponent
];

const FEATURE_COMPONENTS = [

    // Trade Agreements
    fromComponents.TradeAgreementsComponent,
    fromComponents.AllocationSimulatorComponent,
    fromComponents.AgreementDeleteConfirmationDialogComponent,
    fromComponents.AgreementResetConfirmationDialogComponent,

    // Capitals
    fromComponents.CapitalsParametersComponent,
    fromComponents.PodStrategyAllocationComponent,
    fromComponents.TradeNameAllocationComponent,

    // Capital Calculations...
    fromComponents.CapitalsCalculatorComponent,
    fromComponents.FundCapitalsInputComponent,
    fromComponents.CrossPodMatrixComponent,
    fromComponents.CrosspodMatrixPercentDiffComponent,
    fromComponents.FundMatrixComponent,
    fromComponents.CapitalFlowsComponent,
    fromComponents.CapitalHistoryComponent,
    fromComponents.FundCapitalPreviewComponent,
    fromComponents.PodCapitalPreviewComponent,

    // TradeName Allocations
    fromComponents.TradeNameAllocationRebalanceComponent,
    fromComponents.CapitalWorkflowDialogComponent,

    // TradeName creation
    fromComponents.TradeNameCreationComponent,
    fromComponents.MultiAllocTradeNamesComponent,

    fromDirectives.MatInputCapitalInputDirective,

    // RendererComponents
    fromComponents.StrategyRendererComponent,
    fromComponents.TradenameRendererComponent,
    fromComponents.CrossPodMatrixCellRendererComponent
];

const FEATURE_PROVIDERS = [
    fromServices.TradeAgreementsService,
    fromServices.AllocationsService,
    fromServices.CapitalsService,
    fromServices.TradeNameAllocationService,
    fromServices.TradeNameService
];

const FEATURE_GUARDS = [
    fromGuards.TradeAgreementTypesGuard,
    fromGuards.TradeAgreementsGuard,
    fromGuards.AllocationTriggersGuard,
    fromGuards.TradeAgreementSecTypesGuard,
    fromGuards.TradeAgreementAllocationCacheGuard,
    fromGuards.CapitalsGuard,
    fromGuards.TradeNameAllocationRebalancerGuard,
    fromGuards.TradeNameGuard,
    fromGuards.TradeNameMultiAllocGuard
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
        AllocationsRoutingModule,
        StoreModule.forFeature('allocations', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ]
})
export class AllocationsModule { }
