import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import { SharedModule } from '../../shared';

import { MomentModule } from 'angular2-moment';
import { HighchartsChartModule } from 'highcharts-angular';

import { TbaReportsRoutingModule } from './tbareports-routing.module';

import * as fromSharedModules from './../../shared';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';
import { effects, reducers } from './store';

export const FEATURE_CONTAINERS = [
    fromContainers.TbaReportsContainerComponent,
    fromContainers.TimeseriesContainerComponent,
    fromContainers.TimeseriesPlotsComponent,
    fromContainers.ParserContainerComponent
];

export const FEATURE_COMPONENTS =  [

    fromComponents.TimeseriesSelectorComponent,
    fromComponents.TimeseriesPlotComponent,
    fromComponents.TimeseriesCacherComponent,
    fromComponents.TimeseriesTableComponent,
    fromComponents.TimeseriesCacherNotificationComponent,

    fromComponents.ParserRequestComponent,
    fromComponents.MissingReportsComponent,
    fromComponents.ParserStepsComponent,
    fromComponents.ParserActionsComponent,
    fromComponents.ParserResultsComponent,
    fromComponents.ParserSaverComponent
];

export const FEATURE_GUARDS = [
    ...fromGuards.guards
];

export const FEATURE_DIRECTIVES = [];

export const FEATURE_MODULES = [];

export const FEATURE_PROVIDERS = [
    fromServices.ParserService,
    fromServices.TimeseriesService
];

export const THIRD_PARTY_MODULES = [
  MomentModule,
  HighchartsChartModule
];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS,
        ...FEATURE_DIRECTIVES
    ],
    imports: [
        CommonModule,
        TabsModule,
        FormsModule,

        // SharedModule,

        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,

        ...THIRD_PARTY_MODULES,
        ...FEATURE_MODULES,

        TbaReportsRoutingModule,

        /** Store **/
        StoreModule.forFeature('tbaReports', reducers),
        EffectsModule.forFeature(effects)
    ],
    exports: [],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ],
})
export class TbaReportsModule {}
