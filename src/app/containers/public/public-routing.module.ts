import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import * as fromContainers from './containers';
import * as fromComponents from './components';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: fromComponents.LoginComponent,
        data: {
            title: 'Please sign in'
        }
    },
    {
        path: 'about',
        component: fromComponents.AboutComponent,
        data: {
            title: 'About Market Analytics Platform'
        }
    },
    {
        path: 'landing',
        component: fromComponents.LandingComponent,
        data: {
            title: `Welcome to MKP's Market Analytics Platform`
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicRoutingModule {}
