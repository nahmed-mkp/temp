import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'moving-correlation'
    },
    {
        path: 'moving-correlation',
        component: fromContainers.CorrelationLayoutComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovingCorrelationRoutingModule { }
