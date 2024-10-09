import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoggerOptions, storeLogger } from 'ngrx-store-logger';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';

import * as fromFactories from './factories';
import * as fromSharedModules from './shared';


import * as fromRoutes from './app-routing.module';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { effects, reducers, LoginActionTypes } from './store';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

const ROOT_SERVICES = [
  fromServices.LoginService,
  fromServices.AuthService,
  fromServices.UtilityService,
  // fromServices.FileUploadService,
];

const ROOT_GUARDS = [
  ...fromGuards.guards
];

/** Meta Reducers **/

/**
 * Use ngrx/store-logger to log all events dispatched via the store.
 */
export function logger(reducer: any): any {
  const options: LoggerOptions = {};
  return storeLogger(options)(reducer);
}

/**
 * Clear out state when a logout event is dispatched.
*/
export function logout(reducer: any): any {
  return (state, action) => {
    return reducer(action.type === LoginActionTypes.LOGOUT ? undefined : state, action);
  };
}

/**
 * Apply metaReducers such as -
 * a. Logger -> This will log all actions dispatched via a store. Uses ngrx storeLogger.
 * b. Logout -> This will return undefined state to clear out entire state when a logout action is dispatched.
 */
export const metaReducers = environment.production ? [] : [logger, logout];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    FlexLayoutModule,

    fromSharedModules.NativeModule,
    fromSharedModules.MaterialModule,
    fromSharedModules.VendorModule,
    fromSharedModules.CustomModule,

    fromRoutes.AppRoutingModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),

    StoreRouterConnectingModule,

    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 5 }) : StoreDevtoolsModule.instrument({ maxAge: 10 }),

  ],
  providers: [
    ...ROOT_SERVICES,
    ...ROOT_GUARDS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: fromFactories.TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: fromFactories.HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
