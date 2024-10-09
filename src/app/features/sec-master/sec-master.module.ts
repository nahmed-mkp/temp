import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HighchartsChartModule } from 'highcharts-angular';

import { SecurityMasterRoutingModule } from './sec-master-routing.module';
import * as fromSharedModules from './../../shared';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';
import { SecurityMasterTabLayoutComponent } from './containers/security-master-tab-layout/security-master-tab-layout.component';
import { SecurityMasterMarketDataDefaultsLayoutComponent } from './containers/security-master-market-data-defaults-layout/security-master-market-data-defaults-layout.component';
import { SecurityMasterFuturesInfoLayoutComponent } from './containers/security-master-futures-info-layout/security-master-futures-info-layout.component';
import { SecurityMasterMarketDataDefaultsViewerComponent } from './components/security-master-market-data-defaults-viewer/security-master-market-data-defaults-viewer.component';
import { SecurityMasterFuturesInfoViewerComponent } from './components/security-master-futures-info-viewer/security-master-futures-info-viewer.component';
import { ReactiveFormsModule } from '@angular/forms';


const FEATURE_CONTAINERS = [
    fromContainers.SecMasterLayoutComponent,
    fromContainers.SecurityMasterTabLayoutComponent,
    fromContainers.SecurityMasterCreateLayoutComponent,
    fromContainers.SecurityMasterEditLayoutComponent,
    fromContainers.SecurityMasterMarketDataDefaultsLayoutComponent,
    fromContainers.SecurityMasterFuturesInfoLayoutComponent,
    fromContainers.SecurityMasterBbgDataMapLayoutComponent,
    fromContainers.GlobalSecMasterLayoutComponent,

    fromContainers.RCPMSecurityMasterLayoutComponent,
    fromContainers.SecMasterConfigDownstreamMappingLayoutComponent,
    fromContainers.SecurityMasterReconciliationLayoutComponent,
    fromContainers.SecurityMasterReconciliationDetailGridLayoutComponent,
    fromContainers.SecurityMasterSecurityViewerTabLayoutComponent,
    fromContainers.SecurityMasterSecuritySearchLayoutComponent,
    fromContainers.SecurityMasterFuturesInfoEditorDialogLayoutComponent,
    fromContainers.SecurityMasterFuturesInfoCloneDialogLayoutComponent,

    fromContainers.SecurityMasterCreateHistoryLayoutComponent,
    fromContainers.SecurityMasterUpdateHistoryLayoutComponent,

    fromContainers.SecurityMasterDeleteLayoutComponent,
    fromContainers.SecurityMasterDoNotUpdateFlagLayoutComponent,
];

const FEATURE_COMPONENTS = [

    // Global Security Master
    fromComponents.GlobalSecMasterComponent,
    fromComponents.FuturesRootComponent,
    fromComponents.SecurityMasterMarketDataDefaultsViewerComponent,
    fromComponents.SecurityMasterFuturesInfoViewerComponent,

    // Create Security
    fromComponents.CreateSecurityComponent,
    fromComponents.CreateSecurityAdditionalDialogComponent,
    fromComponents.SecuritySearchComponent,
    fromComponents.SecurityMasterUserActivityViewerComponent,
    fromComponents.SecurityMasterSecurityViewerSubtabComponent,
    fromComponents.SecurityMasterUserActivityProgressBarComponent,
    fromComponents.SecurityMasterSecurityViewerSubtabRulesComponent,


    // RCPM Security Master
    fromComponents.SecMasterToolbarComponent,
    fromComponents.SecMasterSearchResultsComponent,
    fromComponents.SecMasterDetailsComponent,
    fromComponents.SecMasterMarketDataComponent,

    fromComponents.SecurityMasterBbgDataMapViewerComponent,
    fromComponents.SecurityMasterConfigDownstreamMappingViewerComponent,

    // Reconciliation
    fromComponents.SecurityMasterReconciliationMatchViewerComponent,
    fromComponents.SecurityMasterReconciliationUnmatchViewerComponent,
    fromComponents.SecurityMasterReconciliationDetailGridViewerComponent,
    fromComponents.SecurityMasterReconciliationDetailGridDeepViewerComponent,

    // History
    fromComponents.SecurityMasterCreateHistoryViewerComponent,
    fromComponents.SecurityMasterUpdateHistoryViewerComponent,

    // Delete-Rename
    fromComponents.SecurityMasterDeleteViewerComponent,

    // Do not update flag
    fromComponents.SecurityMasterDoNotUpdateFlagViewerComponent
];

const FEATURE_PROVIDERS = [
    fromServices.SecMasterService,
    fromServices.SecMasterGlobalService,
    fromServices.FuturesRootService,
    fromServices.SecMasterBbgDataMapService,
    fromServices.ConfigDownstreamMappingService,
    fromServices.SecMasterReconciliationService,
    fromServices.SecMasterHistoryService,
    fromServices.DividendService,
];

const FEATURE_GUARDS = [
    fromGuards.SecMasterGlobalGuard,
    fromGuards.SecMasterLookupsGuard,
    fromGuards.SecMasterGuard,
    fromGuards.SecurityTagsGuard
];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS,
        SecurityMasterTabLayoutComponent,
        SecurityMasterMarketDataDefaultsLayoutComponent,
        SecurityMasterFuturesInfoLayoutComponent,
        SecurityMasterMarketDataDefaultsViewerComponent,
        SecurityMasterFuturesInfoViewerComponent,
    ],
    imports: [
        CommonModule,
        HighchartsChartModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        ReactiveFormsModule,
        SecurityMasterRoutingModule,
        StoreModule.forFeature('securityMaster', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
    exports: []
})
export class SecurityMasterModule { }
