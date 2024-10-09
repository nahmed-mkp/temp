import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'bonds',
        // component: fromContainers.MarketDataDashboardLayoutComponent
    },
    {
        path: ':tab',
        pathMatch: 'full',
        canActivate: [fromGuards.MarketDataDashboardGuard],
        component: fromContainers.MarketDataDashboardLayoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MarketDataDashboardRoutingModule {}
