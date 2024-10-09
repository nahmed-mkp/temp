import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
    {
        path: '',
        component: fromContainers.MacroPackageLayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'equities'
            },
            {
                path: 'equities',
                canActivate: [
                    fromGuards.EquitiesAnalyticsGuard
                ],
                component: fromContainers.EquitiesPackageLayoutComponent
            },
            {
                path: 'credit',
                canActivate: [
                    fromGuards.CreditAnalyticsGuard
                ],
                component: fromContainers.CreditPackageLayoutComponent
            },
            {
                path: 'commodities',
                canActivate: [
                    fromGuards.CommoditiesAnalyticsGuard
                ],
                component: fromContainers.CommoditiesPackageLayoutComponent
            },
            {
                path: 'inflation',
                canActivate: [
                    fromGuards.InflationAnalyticsGuard
                ],
                component: fromContainers.InflationPackageLayoutComponent
            }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MacroAnalyticsPackageRoutingModule { }
