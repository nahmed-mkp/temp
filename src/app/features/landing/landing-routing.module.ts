import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import * as fromContainers from './containers';

const routes: Routes = [
    { path: '', component: fromContainers.LandingLayoutComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LandingRoutingModule {}
