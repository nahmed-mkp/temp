import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import * as fromContainers from './containers';
import * as fromGuards from './guards';


const routes: Routes = [
    {
        path: '',
        component: fromContainers.ProjectsLayoutComponent,
        canActivate: [fromGuards.ProjectsGuard],
        data: {
            title: 'External Report Projects'
        }
    }, {
        path: 'new',
        component: fromContainers.NewProjectLayoutComponent,
        canActivate: [fromGuards.ProjectsGuard],
        data: {
            title: 'External Report - New Project'
        }
    }, {
        path: ':projectShortCode',
        component: fromContainers.WorkbooksLayoutComponent,
        canActivate: [fromGuards.ProjectsGuard],
        data: {
            title: 'External Report Project'
        }
    }, {
        path: ':projectShortCode/new',
        component: fromContainers.NewWorkbookLayoutComponent,
        canActivate: [fromGuards.ProjectsGuard],
        data: {
            title: 'External Report - New Workbook'
        }
    }, {
        path: ':projectShortCode/workbooks/:workbookShortCode',
        component: fromContainers.ReportsLayoutComponent,
        canActivate: [fromGuards.ProjectsGuard],
        data: {
            title: 'External Report Workbook'
        }
    }, {
        path: ':projectShortCode/workbooks/:workbookShortCode/new',
        component: fromContainers.NewReportLayoutComponent,
        canActivate: [fromGuards.ProjectsGuard],
        data: {
            title: 'External Report - New Report'
        }
    }, {
        path: ':projectShortCode/workbooks/:workbookShortCode/reports/:reportShortCode',
        component: fromContainers.ReportLayoutComponent,
        canActivate: [fromGuards.ProjectsGuard],
        data: {
            title: 'External Report'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportsRoutingModule { }

