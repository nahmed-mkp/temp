import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.JpmAgencyDeliverablesLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class jpmAgencyDeliverablesRoutingModule { }
