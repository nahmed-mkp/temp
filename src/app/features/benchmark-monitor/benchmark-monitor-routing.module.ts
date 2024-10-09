import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';


const routes: Routes = [
    {
        path: '',
        component: fromContainers.BenchmarkMonitorLayoutComponent,
        children: [
            {path: '', redirectTo: 'tba', pathMatch: 'full'},
            {path: 'tba', component: fromContainers.BenchmarkMonitorTbaLayoutComponent},
            {path: 'cdx', component: fromContainers.BenchmarkMonitorCdxLayoutComponent}
        ]
    },
    // {
    //     path: 'tba',
    //     component: fromContainers.SizingSheetLayoutComponent
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BenchmarkMonitorRoutingModule {}