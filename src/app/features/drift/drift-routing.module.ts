import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
    {
        path: '',
        component: fromContainers.DriftLayoutComponent,
        canActivate: [fromGuards.DriftGuard],
        data: {
            title: 'Portfolio & Position Drift'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DriftRoutingModule { }
