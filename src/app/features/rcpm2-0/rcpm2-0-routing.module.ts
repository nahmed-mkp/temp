import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.RcpmLayoutComponent,
    data: {
      title: 'Live Positions & Risks'
    },
    children: [
      {
        path: '',
        redirectTo: 'position',
        pathMatch: 'full'
      },
      {
        path: 'position',
        component: fromContainers.RcpmPositionTabLayoutComponent,
        canActivate: [fromGuards.PositionGuard],
        data: {
          title: 'Position'
        }
      },
      {
        path: 'pnl-attr',
        component: fromContainers.RcpmPnlAttributionLayoutComponent,
        data: {
          title: 'PnL Attribution'
        }
      },
      {
        path: 'shockanalysis',
        component: fromContainers.ShockAnalysisLayoutComponent,
        data: {
          title: 'Shock Analysis'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Rcpm20RoutingModule { }
