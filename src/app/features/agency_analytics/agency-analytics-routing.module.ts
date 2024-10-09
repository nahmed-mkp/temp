import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
    {
        path: '',
        component: fromContainers.AgencyAnalyticsLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'portfolios',
                pathMatch: 'full'
            },
            {
                path: 'portfolios',
                component: fromContainers.PortfoliosViewerLayoutComponent,
                canActivate: [
                    fromGuards.AgencyAnalyticsGuard, 
                    fromGuards.AgencyAnalyticsLookupsGuard,
                    fromGuards.AgencyDialsGuard
                ],
                data: {
                    title: 'Agency Analytics - PoolViewer'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AgencyAnalyticsRoutingModule { }
