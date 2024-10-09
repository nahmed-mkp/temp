import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'cdsspreads',
        pathMatch: 'full'
    },
    {
        path: 'cdsspreads',
        canActivate: [fromGuards.CounterpartyCDSSpreadsGuard],
        component: fromContainers.CounterpartyCDSSpreadLayoutComponent,
        data: {
            title: 'Counterparty CDS Spreads'
        }
    },
    // {
    //     path: 'exposure',
    //     component: fromContainers.CounterpartyExposureLayoutComponent,
    //     data: {
    //         title: 'Counterparty Exposure'
    //     }
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CounterpartyRoutingModule {}
