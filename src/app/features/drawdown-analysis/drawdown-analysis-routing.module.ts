import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainer from './containers';

const routes: Routes = [
  {
    path: '',
    component: fromContainer.DrawdownAnalysisLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrawdownAnalysisRoutingModule { }
