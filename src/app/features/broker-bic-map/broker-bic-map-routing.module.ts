import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'Broker'
    },
    {
        path: 'Broker',
        component: fromContainers.BrokerBicMapLayoutComponent,
        canActivate: [fromGuards.BrokerGuard],
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrokerBicMapRoutingModule { }
