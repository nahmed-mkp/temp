import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
    {
        path: '',
        component: fromContainers.TradeAllocationsLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'agreements',
                pathMatch: 'full'
            },
            {
                path: 'agreements',
                component: fromContainers.TradeAgreementsLayoutComponent,
                canActivate: [fromGuards.TradeAgreementTypesGuard, fromGuards.TradeAgreementsGuard,
                    fromGuards.TradeAgreementSecTypesGuard],
                data: {
                    title: 'Allocations - Trade Agreements'
                }
            },
            {
                path: 'eligibility',
                component: fromContainers.SimulatorLayoutComponent,
                canActivate: [fromGuards.TradeAgreementAllocationCacheGuard],
                data: {
                    title: 'Allocations - Fund Eligibility'
                }
            },
            {
                path: 'capitals',
                component: fromContainers.CapitalsLayoutComponent,
                canActivate: [fromGuards.CapitalsGuard],
                data: {
                    title: 'Capitals'
                }
            },
            {
                path: 'tradenames',
                component: fromContainers.TradeNameAllocationRebalancerLayoutComponent,
                canActivate: [fromGuards.TradeNameAllocationRebalancerGuard, fromGuards.TradeNameGuard, fromGuards.TradeNameMultiAllocGuard],
                data: {
                    title: 'TradeNames & Allocations'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AllocationsRoutingModule { }
