import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [
      fromGuards.EventCalenderGuard,
      fromGuards.PreprocessOptionsGuard,
      fromGuards.ActiveConfigurationGuard,
      fromGuards.CustomFunctionsGuard,
    ],
    component: fromContainers.EventAnalysisLayoutComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventAnalysisRoutingModule { }
