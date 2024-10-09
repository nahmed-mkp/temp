import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
    {
        path: '',
        component: fromContainers.BenchmarkPortfolioLayoutComponent,
        data: {
            title: 'Benchmark Portfolio'
        },
        children: [
            {
                path: '', redirectTo: 'trades', pathMatch: 'full'
            },
            {
                path: 'trades',
                canActivate: [fromGuards.TradesGuard],
                component: fromContainers.BenchmarkPortfolioTradesLayoutComponent,
                data: {
                    title: 'Benchmark Portfolio - Trades'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BenchmarkPortfolioRoutingModule { }
