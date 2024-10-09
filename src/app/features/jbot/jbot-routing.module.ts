import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: 'general',
    canActivate: [
      fromGuards.JbotGuard
    ],
    component: fromContainers.JbotLayoutComponent
  },
  {
    path: 'tech',
    canActivate: [
      fromGuards.JbotTechGuard
    ],
    component: fromContainers.JbotTechLayoutComponent
  },
  {
    path: 'monitor',
    canActivate: [
      fromGuards.JbotMonitorGuard
    ],
    component: fromContainers.JbotMonitorLayoutComponent
  },
  {
    path: 'summary',
    canActivate: [
      fromGuards.JbotSummaryGuard
    ],
    component: fromContainers.JBotSummaryLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JbotRoutingModule { }
