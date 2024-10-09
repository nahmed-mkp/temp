
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';

const routes: Routes = [
    {
        path: '',
        component: fromContainers.SubscriptionsLayoutComponent,
        data: {
            title: 'Subscriptions Demo'
        },
        children: [
            {
                path: '',
                redirectTo: 'demo',
                pathMatch: 'full'
            },
            {
                path: 'demo',
                component: fromContainers.LiveGridLayoutComponent,
                data: {
                    title: 'Subscriptions Demo'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubscriptionsRoutingModule { }
