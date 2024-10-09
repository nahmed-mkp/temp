import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';
import { HighchartsChartModule } from 'highcharts-angular';

import * as fromSharedModules from './../../shared';

import { OptionVolsRoutingModule } from './option-vols-routing.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';
import { SizingService } from '../sizing/services';

const FEATURE_CONTAINERS = [
    fromContainers.OptionVolsLayoutComponent,
    fromContainers.OptionVolsAnalysisResultLayoutComponent,
    fromContainers.OptionVolsSettingLayoutDialogComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.OptionVolsToolbarComponent,
    fromComponents.OptionChainComponent,
    fromComponents.OptionVolsEquityResultViewerComponent,
    fromComponents.OptionVolsEquityResultCustomHeaderComponent,
    fromComponents.OptionVolsCommodityResultViewerComponent,
    fromComponents.OptionVolsCommodityResultCustomHeaderComponent,
    fromComponents.OptionVolsFXResultViewerComponent,
    fromComponents.OptionVolsFXResultCustomHeaderComponent,

    fromComponents.OptionVolsSettingViewerComponent,
    fromComponents.OptionVolsSupportedTickersViewerComponent,
    fromComponents.OptionVolsFuturesMappingViewerComponent,
    fromComponents.OptionVolsFxSurfaceResultViewerComponent,
    fromComponents.OptionVolsFxForwardResultViewerComponent,
];


const FEATURE_PROVIDERS = [
    fromServices.OptionVolsService,
    SizingService,
];

const FEATURE_GUARDS = [
    fromGuards.OptionVolsGuard
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
        OptionVolsRoutingModule,
        StoreModule.forFeature('optionVols', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ]
})
export class OptionVolsModule { }
