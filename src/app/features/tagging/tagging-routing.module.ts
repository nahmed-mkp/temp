import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromGuards from './guards';


const routes: Routes = [
    {
        path: '',
        canActivate: [fromGuards.TagListGuard, fromGuards.TaggingLookupGuard],
        component: fromContainers.TaggingLayoutComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TaggingRoutingModule { }
