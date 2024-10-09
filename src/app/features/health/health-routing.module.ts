import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromGuards from './guards';
import * as fromContainers from './containers';

const routes: Routes = [
    {
        path: '',
        canActivate: [fromGuards.HealthStatusGuard],
        component: fromContainers.HealthLayoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HealthRoutingModule { }
