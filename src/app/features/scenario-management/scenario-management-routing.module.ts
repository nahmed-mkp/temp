import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import * as fromContainers from './containers';
import * as fromGuards from './guards';


const routes: Routes = [
    {
        path: '',
        canActivate: [fromGuards.ScenarioManagementGuard],
        component: fromContainers.ScenarioManagementLayoutComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScenarioManagementRoutingModule {}
