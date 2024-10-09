import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromSharedModules from './../../shared';

import * as fromRoutes from './public-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';

const FEATURE_CONTAINERS = [
    fromContainers.PublicLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.AboutComponent,
    fromComponents.LandingComponent,
    fromComponents.LoginComponent
];

const FEATURE_PROVIDERS = [
];

const FEATURE_GUARDS = [

];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS
    ],
    imports: [
        CommonModule,

        fromRoutes.PublicRoutingModule,

        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule
    ],
    exports: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS
    ]
})
export class PublicModule { }
