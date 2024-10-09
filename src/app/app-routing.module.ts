import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromCustomComponents from './components';
import * as fromGuards from './guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },
  {
    path: 'app',
    loadChildren: () => import('./containers/private/private.module').then(m => m.PrivateModule),
    canActivate: [ fromGuards.AuthGuard, fromGuards.UserLockGuard ],
    // canActivate: [ fromGuards.AuthGuard],
  },
  {
    path: 'public',
    loadChildren: () => import('./containers/public/public.module').then(m => m.PublicModule)
  },
  {
    path: 'unauthorized',
    component: fromCustomComponents.AppUnauthorizedComponent
  },
  {
    path: '**',
    component: fromCustomComponents.AppNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
