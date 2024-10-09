import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import * as fromSharedModules from './../../shared';
import * as fromContainers from './containers';
import * as fromRoutes from './private-routing.module';

import { UtilityService, AuthService } from 'src/app/services';


const FEATURE_CONTAINERS = [
    fromContainers.PrivateLayoutComponent,
    fromContainers.SearchDialogComponent
];

const FEATURE_COMPONENTS = [
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
        DragDropModule,
        fromRoutes.PrivateRoutingModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        fromSharedModules.SearchModule,
        fromSharedModules.TreeNavigationModule
    ],
    exports: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS
    ],
    providers: [
        ...FEATURE_PROVIDERS,
        ...FEATURE_GUARDS,
        UtilityService,
        AuthService
    ]
})
export class PrivateModule { }
