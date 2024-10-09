import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    canActivate: [fromGuards.RiskSpanSchemaGuard],
    component: fromContainers.RiskSpanLayoutComponent
  },
  {
    path: 'layout',
    canActivate: [fromGuards.RiskSpanSchemaGuard],
    component: fromContainers.RiskSpanRequestLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RiskSpanRoutingModule { }
