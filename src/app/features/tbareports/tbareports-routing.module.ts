import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [{
    path: '',
    component: fromContainers.TbaReportsContainerComponent,
    data: {
        title: 'TBA Reports'
    },
    children: [
    {
        path: '',
        redirectTo: 'oas',
        pathMatch: 'full'
    },
    {
        path: 'oas',
        component: fromContainers.TimeseriesContainerComponent,
        canActivate: [fromGuards.TimeseriesGuard, fromGuards.CouponsGuard, fromGuards.MetricTypesGuard],
        data: {
            title: 'OAS Charts'
        }
    },
    {
        path: 'download',
        component: fromContainers.ParserContainerComponent,
        canActivate: [fromGuards.ParserGuard],
        data: {
            title: 'TBA Parser'
        }
    }]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TbaReportsRoutingModule { }
