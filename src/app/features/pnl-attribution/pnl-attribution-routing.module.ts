import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
    {
        path: '',
        // canActivate: [fromGuards.PnlAttributionGuard],
        pathMatch: 'full',
        component: fromContainers.PnlAttributionLayoutComponent
    },
    {
        path: ':guid',
        canActivate: [fromGuards.PnlAttributionReadonlyGuard],
        component: fromContainers.PnlAttributionLayoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PnlAttributionRoutingModule { }
