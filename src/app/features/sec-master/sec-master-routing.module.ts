import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';

const routes: Routes = [
    {
        path: '',
        component: fromContainers.SecMasterLayoutComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'global'
            },
            {
                path: 'global',
                canActivate: [
                    fromGuards.SecMasterGlobalGuard,
                    fromGuards.SecMasterLookupsGuard,
                    fromGuards.SecurityTagsGuard
                ],
                component: fromContainers.SecurityMasterTabLayoutComponent
            },
            {
                path: 'rcpm',
                canActivate: [
                    fromGuards.SecMasterGuard,
                    fromGuards.SecurityTagsGuard
                ],
                component: fromContainers.RCPMSecurityMasterLayoutComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SecurityMasterRoutingModule { }
