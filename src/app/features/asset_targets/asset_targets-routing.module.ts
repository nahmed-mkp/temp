import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import * as fromContainers from './containers';
import * as fromGuards from './guards';


const routes: Routes = [
    {
        path: '',
        canActivate: [fromGuards.AssetTargetsGuard],
        component: fromContainers.AssetTargetsLayoutComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssetTargetsRoutingModule {}
