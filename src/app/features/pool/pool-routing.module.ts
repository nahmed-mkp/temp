import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './container';
import * as fromComponents from './components';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.PoolLayoutComponent,
    data: {
      title: 'Pool Viewer'
    },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'portfolios'
      },
      {
        path: 'portfolios',
        canActivate: [
          fromGuards.PortfoliosGuard,
          fromGuards.DialsGuard,
          fromGuards.DefaultScenariosGurad,
          fromGuards.ConfigurationsGurad,
          fromGuards.PoolLayoutsGurad,
          fromGuards.PoolItemsGroupingsGuard,
          fromGuards.RiskFreeRateGuard,
          fromGuards.BidlistParserGuard,
          fromGuards.LookupsGuard
        ],
        component: fromContainers.PoolPortfoliosItemsLayoutComponent
      },
      // {
      //   path: 'portfolios/:id',
      //   component: fromContainers.PoolPortfoliosItemsLayoutComponent
      // },
      {
        path: 'dials',
        canActivate: [fromGuards.DialsGuard],
        component: fromContainers.DialsLayoutComponent
      },
      {
        path: 'yieldbook',
        canActivate: [fromGuards.YielbookGuard],
        component: fromContainers.YieldbookLayoutComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoolRoutingModule { }
