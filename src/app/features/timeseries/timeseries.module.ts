import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularSplitModule } from 'angular-split';
import * as fromComponents from './components';
import * as fromContainers from './containers';
import * as fromSharedModules from './../../shared';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { effects, reducers } from './store';
import { TimeseriesRoutingModule } from './timeseries-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HighchartsChartModule } from 'highcharts-angular';
import { AgGridModule } from 'ag-grid-angular';

const FEATURE_CONTAINERS = [
    fromContainers.TimeseriesLayoutComponent,
    fromContainers.TimeseriesTabLayoutComponent,
    fromContainers.TimeseriesParamsToolbarLayoutComponent,
    fromContainers.TimeseriesFooterTabLayoutComponent,
    fromContainers.TimeseriesDrawdownLayoutComponent,
    fromContainers.TimeseriesTechIndicatorLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.TimeseriesGridViewerComponent,
    fromComponents.TimeseriesChartViewerComponent,
    fromComponents.TimeseriesDataViewerComponent,
    fromComponents.TimeseriesRenameCurrPortfolioDialogViewerComponent,
    fromComponents.TimeseriesImportPortfolioDialogViewerComponent,
    fromComponents.TimeseriesNewPortfolioDialogViewerComponent,
    fromComponents.TimeseriesAxisCellRendererComponent,
    fromComponents.TimeseriesRegressionCellRendererComponent,
    fromComponents.TimeseriesDeleteCellRendererComponent,
    fromComponents.TimeseriesFavoriteCellRendererComponent,
    fromComponents.TimeseriesStatisticsViewerComponent,
    fromComponents.TimeseriesDeletePortfolioDialogViewerComponent,
    fromComponents.TimeseriesDataSourceViewerComponent,
    fromComponents.TimeseriesDrawdownGridViewerComponent,
    fromComponents.TimeseriesRegressionViewerComponent,
    fromComponents.TimeseriesRenamePortfolioDialogViewerComponent,
    fromComponents.TimeseriesStatisticsRangeCellViewerComponent,
    fromComponents.TimeseriesStatTooltipRendererComponent,
    fromComponents.PortfolioUrlErrorDialogViewerComponent,
    fromComponents.TimeseriesTechIndicatorChartViewerComponent,
    fromComponents.TimeseriesDrawdownChartViewerComponent,
    fromComponents.TimeseriesVariableCellRendererComponent
];

const FEATURE_PROVIDERS = [
    fromServices.TimeseriesService
];

const FEATURE_GUARDS = [
    fromGuards.ScratchpadGuard
];


@NgModule({
    declarations: [
        ...FEATURE_COMPONENTS,
        ...FEATURE_CONTAINERS
    ],
    imports: [
        CommonModule,
        HighchartsChartModule,
        AgGridModule.withComponents([]),
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        fromSharedModules.TreeNavigationModule,
        AngularSplitModule,
        TimeseriesRoutingModule,

        StoreModule.forFeature('timeseries', reducers),
        EffectsModule.forFeature(effects)
    ],
    exports: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
})
export class TimeseriesModule {}