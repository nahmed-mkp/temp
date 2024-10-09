import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';


const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        // redirectTo: 'fxoptions',
        component: fromContainers.PricingCalculatorLayoutComponent
    },
    {
        path: 'swaps',
        pathMatch: 'full',
        component: fromContainers.PricingCalculatorLayoutComponent
    },
    {
        path: ':tab',
        pathMatch: 'full',
        component: fromContainers.PricingCalculatorLayoutComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PricingCalculatorsRoutingModule { }
