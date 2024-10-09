
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
    {
        path: '',
        // redirectTo: 'macro',
        pathMatch: 'full',
        canActivate: [fromGuards.SNRMacroGuard],
        component: fromContainers.SNRDashboardsLayoutComponent,
    },
    {
        path: 'macro',
        pathMatch: 'full',
        canActivate: [fromGuards.SNRMacroGuard],
        component: fromContainers.SNRDashboardsLayoutComponent,
    },
    {
        path: 'macro/:tab',
        pathMatch: 'full',
        canActivate: [fromGuards.SNRMacroGuard],
        component: fromContainers.SNRDashboardsLayoutComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SNRDashboardsRoutingModule { }
