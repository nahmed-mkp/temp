import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reducers } from './store';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromNative from '../../native/native.module';
import * as fromMaterial from '../../material/material.module';
import { StoreModule } from '@ngrx/store';

const FEATURE_CONTAINERS = [
    fromContainers.TreeNavigationLayoutComponent
];

const FEATURE_COMPONENTS = [
    fromComponents.TreeNavigationPaneComponent
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
        fromNative.NativeModule,
        fromMaterial.MaterialModule,

        StoreModule.forFeature('treeNavigation', reducers)
    ],
    exports: [
        ...FEATURE_CONTAINERS,
        ...FEATURE_COMPONENTS
    ],
    providers: [],
})
export class TreeNavigationModule {}


