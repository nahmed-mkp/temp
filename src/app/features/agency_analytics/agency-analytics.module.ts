import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HighchartsChartModule } from 'highcharts-angular';

import * as fromSharedModules from './../../shared';

import { AgencyAnalyticsRoutingModule } from './agency-analytics-routing.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';

const FEATURE_CONTAINERS = [
    fromContainers.AgencyAnalyticsLayoutComponent,
    fromContainers.PortfoliosViewerLayoutComponent,
    fromContainers.PortfolioViewerLayoutComponent,
    fromContainers.AgencyDialsLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.PortfolioCreatorComponent,
    fromComponents.PortfolioSelectorComponent,
    fromComponents.PortfolioViewerComponent,
    fromComponents.SecuritySearchComponent,

    // Renderers
    fromComponents.ServicersRendererComponent,
    fromComponents.ServicersChartComponent,

    fromComponents.DelinquenciesRendererComponent,
    fromComponents.DelinquenciesChartComponent,

    fromComponents.QuartilesRendererComponent,
    fromComponents.QuartilesComponent,

    fromComponents.GeographiesRendererComponent,
    fromComponents.GeographiesComponent,

    fromComponents.OASPathsRendererComponent,
    fromComponents.OASPathsComponent,

    fromComponents.PPMProjectionsRendererComponent,
    fromComponents.PPMProjectionsComponent,

    fromComponents.ForwardPathsRendererComponent,
    fromComponents.ForwardPathsComponent,

    fromComponents.ActVsProjSummaryRendererComponent,
    fromComponents.ActVsProjSummaryComponent,

    fromComponents.ActVsProjHistoryRendererComponent,
    fromComponents.ActVsProjHistoryComponent,

    fromComponents.YBCalcConfirmationDialogComponent,
    fromComponents.DialsViewerComponent,
    fromComponents.DialNameDialogComponent,
    fromComponents.DialDeleteDialogComponent
];

const FEATURE_PROVIDERS = [
    fromServices.AgencyAnalyticsService,
    fromServices.AgencyDialsService
];

const FEATURE_GUARDS = [
    fromGuards.AgencyAnalyticsGuard,
    fromGuards.AgencyAnalyticsLookupsGuard,
    fromGuards.AgencyDialsGuard
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

        AgencyAnalyticsRoutingModule,

        StoreModule.forFeature('agencyAnalytics', reducers),

        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    entryComponents: [
        fromComponents.SecuritySearchComponent,
        fromComponents.ServicersRendererComponent,
        fromComponents.ServicersChartComponent,
        fromComponents.DelinquenciesRendererComponent,
        fromComponents.DelinquenciesChartComponent,
        fromComponents.QuartilesRendererComponent,
        fromComponents.QuartilesComponent,
        fromComponents.GeographiesRendererComponent,
        fromComponents.GeographiesComponent,
        fromComponents.OASPathsRendererComponent,
        fromComponents.OASPathsComponent,
        fromComponents.PPMProjectionsRendererComponent,
        fromComponents.PPMProjectionsComponent, 
        fromComponents.ForwardPathsRendererComponent,
        fromComponents.ForwardPathsComponent,
        fromComponents.ActVsProjSummaryRendererComponent,
        fromComponents.ActVsProjSummaryComponent,
        fromComponents.ActVsProjHistoryRendererComponent,
        fromComponents.ActVsProjHistoryComponent,
        fromComponents.YBCalcConfirmationDialogComponent,
        fromContainers.AgencyDialsLayoutComponent,
        fromComponents.DialsViewerComponent,
        fromComponents.DialNameDialogComponent,
        fromComponents.DialDeleteDialogComponent
    ]
})
export class AgencyAnalyticsModule { }
