import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';

const routes: Routes = [
    {
        path: 'blotter/',
        redirectTo: 'dividend'
    },
    {
        path: 'dividend',
        component: fromContainers.BlotterDividendLayoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BlotterRoutingModule { }
