import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';


const routes: Routes = [
    {
        path: 'synthetic-trades',
        component: fromContainers.BluePearlSyntheticTradesLayout,
        canActivate: [fromGuards.BluePearlGuard],
    },
    {
      path: 'settlement-ladder',
      component: fromContainers.BluePearlSettlementLadderLayout,
      canActivate: [fromGuards.BluePearlGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BluePearlRoutingModule { }

