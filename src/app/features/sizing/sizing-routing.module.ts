import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'sizing-sheet'
    },
    {
        path: 'sizing-sheet',
        component: fromContainers.SizingSheetLayoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SizingRoutingModule {}