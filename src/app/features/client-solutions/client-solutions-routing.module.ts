import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'performance',
        pathMatch: 'full'
    },
    {
        path: 'performance',
        canActivate: [fromGuards.FundsGuard, fromGuards.BenchmarksGuard],
        component: fromContainers.ClientSolutionsLayoutComponent
    },
    {
        path: 'reports',
        component: fromContainers.ReportsLayoutComponent
    },
    {
        path: 'cliffwater',
        component: fromContainers.ClientSolutionsCliffwaterLayoutComponent,
    },
    {
        path: 'shareclass',
        canActivate: [fromGuards.CapitalFlowsGuard],
        component: fromContainers.ClientSolutionsInvestorRelationsLayoutComponent,
    },
    {
        path: 'snapshots',
        canActivate: [fromGuards.FundsGuard, fromGuards.SnapshotGuard],
        component: fromContainers.ClientSolutionsSnapshotsLayoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientSolutionsRoutingModule { }
