import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import * as fromContainers from './containers';

const routes: Routes = [
    {
        path: '',
        // canActivate: [],
        component: fromContainers.TimeseriesAnalysisLayoutComponent
    }];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TimeseriesAnalysisRoutingModule { }
