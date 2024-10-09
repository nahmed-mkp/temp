
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromGuards from './guards';
import * as fromContainers from './containers';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'portfolio'
    },
    {
        path: 'portfolio',
        children: [{
            path: '',
            pathMatch: 'full',
            redirectTo: 'scratchpad'
        },
        {
            path: 'scratchpad',
            pathMatch: 'full',
            canActivate: [
                fromGuards.ScratchpadGuard
            ],
            component: fromContainers.TimeseriesLayoutComponent,
        },
        {
            path: ':guid',
            component: fromContainers.TimeseriesLayoutComponent,
        }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TimeseriesRoutingModule { }
