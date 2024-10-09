import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { ChartModule } from 'angular-highcharts';
import { HighchartsChartModule } from 'highcharts-angular';

import * as fromSharedModules from './../../shared';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';
import { ClientSolutionsRoutingModule } from './client-solutions-routing.module';


const FEATURE_CONTAINERS = [
    fromContainers.ClientSolutionsLayoutComponent,
    fromContainers.FundPerformanceLayoutComponent,
    fromContainers.ReportsLayoutComponent,
    fromContainers.ClientSolutionAddReturnLayoutDialogComponent,
    fromContainers.ClientSolutionsCliffwaterLayoutComponent,
    fromContainers.ClientSolutionsSnapshotsLayoutComponent,
    fromContainers.ClientSolutionsSnapshotsInnerLayoutComponent,
    fromContainers.ClientSolutionsRefreshDataDialogLayoutComponent,

    fromContainers.ClientSolutionsInvestorRelationsLayoutComponent,
    fromContainers.ClientSolutionsInvestorRelationsFundLayoutComponent,
    fromContainers.ClientSolutionsInvestorRelationsFirmLayoutComponent,

    fromContainers.ClientSolutionsCapitalFlowsLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.ClientSolutionsPerfToolbarComponent,

    fromComponents.ClientSolutionsFundAlphaBetaViewerComponent,
    fromComponents.ClientSolutionsFundCorrelationViewerComponent,
    fromComponents.ClientSolutionsFundDrawdownViewerComponent,
    fromComponents.ClientSolutionsFundHistogramViewerComponent,
    fromComponents.ClientSolutionsFundNetReturnViewerComponent,
    fromComponents.ClientSolutionsFundStatisticsViewerComponent,
    fromComponents.ClientSolutionsFundTimeseriesViewerComponent,
    fromComponents.ClientSolutionsCliffwaterViewerComponent,

    fromComponents.ClientSolutionsSnapshotsToolbarComponent,
    fromComponents.ClientSolutionsSnapshotComponent,
    fromComponents.ClientSolutionsSnapshotsSummaryStatsComponent,
    fromComponents.ClientSolutionsSnapshotsCorrelationMatrixComponent,

    fromComponents.ClientSolutionsInvestorRelationsFirmAumBalancesComponent,
    fromComponents.ClientSolutionsInvestorRelationsFirmListComponent,
    fromComponents.ClientSolutionsInvestorRelationsFirmTop10Component,
    fromComponents.ClientSolutionsInvestorRelationsFirmInvestorTypeComponent,
    fromComponents.ClientSolutionsInvestorRelationsFirmRegionComponent,

    fromComponents.ClientSolutionsInvestorRelationsFundAumBalancesComponent,
    fromComponents.ClientSolutionsInvestorRelationsFundTop10Component,
    fromComponents.ClientSolutionsInvestorRelationsFundInvestorTypeComponent,
    fromComponents.ClientSolutionsInvestorRelationsFundRegionComponent,

    fromComponents.ClientSolutionsInvestorsComponent,
    fromComponents.ClientSolutionsStatementsComponent,
    fromComponents.ClientSolutionsExceptionsComponent,

    fromComponents.ClientSolutionsCapitalFlowsComponent,
    fromComponents.ClientSolutionsCapitalFlowsChartComponent,
    fromComponents.ClientSolutionsCapitalFlowStatsComponent,
    fromComponents.ClientSolutionsProjectedAUMComponent,
    fromComponents.ClientSolutionsCapitalFlowFormComponent,
    fromComponents.CapitalFlowDeleteConfirmationDialogComponent,
    fromComponents.ClientSolutionsInvestorFormComponent,
    fromComponents.InvestorDeleteConfirmationDialogComponent
];

const FEATURE_PROVIDERS = [
    fromServices.FundPerformanceService,
    fromServices.BenchmarkService,
    fromServices.ChartTransformationService,
    fromServices.CliffwaterService,
    fromServices.SnapshotService,
    fromServices.InvestorRelationsService,
    fromServices.CapitalFlowsService
];

const FEATURE_GUARDS = [
    fromGuards.FundsGuard,
    fromGuards.BenchmarksGuard,
    fromGuards.SnapshotGuard,
    fromGuards.ClientSolutionsGuard,
    fromGuards.CapitalFlowsGuard
];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS,
    ],
    imports: [
        AgGridModule.withComponents([]),
        ChartModule,
        HighchartsChartModule,
        CommonModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        ClientSolutionsRoutingModule,
        // store
        StoreModule.forFeature('clientSolutions', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class ClientSolutionsModule { }
