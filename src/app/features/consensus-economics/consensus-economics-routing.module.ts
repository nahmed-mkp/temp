
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
    {
        path: '',
        component: fromContainers.ConsensusEconomicsLayoutComponent,
        data: {
            title: 'Consensus Economics'
        },
        children: [
            {
                path: '', redirectTo: 'extractions', pathMatch: 'full'
            },
            {
                path: 'extractions',
                canActivate: [fromGuards.ExtractionsGuard],
                component: fromContainers.ConsensusEconomicsExtractionsLayoutComponent,
                data: {
                    title: 'Consensus Economics - Extractions'
                }
            },
            {
                path: 'constituents',
                canActivate: [fromGuards.ConstituentsGuard],
                component: fromContainers.ConsensusEconomicsConstituentsLayoutComponent,
                data: {
                    title: 'Consensus Economics - Constituents'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsensusEconomicsRoutingModule { }
