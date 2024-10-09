import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import * as fromContainers from './containers';
// import * as fromGuards from './guards';

const routes: Routes = [
    { 
        path: '', 
        component: fromContainers.DriftNewLayoutComponent 
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DriftNewRoutingModule {}
