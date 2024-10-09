import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'swaps',
        // component: fromContainers.PricingEngineGeneralLayoutComponent
    },
    {
        path: 'swaps',
        pathMatch: 'full',
        component: fromContainers.PricingEngineGeneralLayoutComponent
    },
    {
        path: ':tab',
        pathMatch: 'full',
        component: fromContainers.PricingEngineGeneralLayoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PricingEngineRoutingModule { }
