import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import * as fromSharedModules from './../../shared';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { ReportsRoutingModule } from './reports-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UtilityService } from 'src/app/services';
import { reducers, effects } from './store';

export const CONTAINERS = [
    fromContainers.WorkbooksLayoutComponent,
    fromContainers.NewWorkbookLayoutComponent,
    fromContainers.ProjectsLayoutComponent,
    fromContainers.NewProjectLayoutComponent,
    fromContainers.ReportsLayoutComponent,
    fromContainers.ReportLayoutComponent,
    fromContainers.NewReportLayoutComponent
];

export const COMPONENTS = [
    fromComponents.ProjectItemsComponent,
    fromComponents.ProjectComponent,
    fromComponents.ProjectFormComponent,
    fromComponents.WorkbookItemsComponent,
    fromComponents.WorkbookComponent,
    fromComponents.WorkbookFormComponent,
    fromComponents.ReportItemsComponent,
    fromComponents.ReportViewComponent,
    fromComponents.ReportFormComponent,
    fromComponents.ReportIFrameComponent
];

export const PROVIDERS = [
    fromServices.ReportsService,
    UtilityService
];

export const GUARDS = [
    fromGuards.ProjectsGuard
];

@NgModule({
    declarations: [
        ...CONTAINERS,
        ...COMPONENTS,
    ],
    imports: [
        CommonModule,
        AgGridModule.withComponents([]),

        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,

        ReportsRoutingModule,

        StoreModule.forFeature('reports', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...PROVIDERS,
        ...GUARDS
    ]
})
export class ReportsModule { }
