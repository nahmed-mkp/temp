import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';

const routes: Routes = [
    {
        path: '',
        component: fromContainers.WorldEventsLayoutComponent,
        data: {
            title: 'World Events'
        },
        children: [
            { path: '', redirectTo: 'covid-19', pathMatch: 'full' },
            { path: 'covid-19', loadChildren: () => import('./features/covid-19/covid-19.module').then(m => m.Covid19Module), data: { title: 'COVID-19' } },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorldEventsRoutingModule { }
