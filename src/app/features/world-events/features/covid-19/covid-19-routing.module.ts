import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
    {
        path: '',
        component: fromContainers.CovidLayoutComponent,
        canActivate: [fromGuards.CovidCountryGuard, fromGuards.CovidDataGuard,
                      fromGuards.CovidUSGuard, fromGuards.CovidUSStatesGuard],
        data: {
            title: 'COVID-19'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class Covid19RoutingModule { }
