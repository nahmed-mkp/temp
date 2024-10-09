import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromContainers from './containers';
import * as fromNative from './../../native/native.module';
import * as fromMaterial from './../../material/material.module';

const FEATURE_CONTAINERS = [
    fromContainers.SearchLayoutComponent
];

const FEATURE_COMPONENTS = [
];

const FEATURE_PROVIDERS = [
];

const FEATURE_GUARDS = [
];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS
    ],
    imports: [
        CommonModule,
        fromNative.NativeModule,
        fromMaterial.MaterialModule
    ],
    exports: [
        ...FEATURE_CONTAINERS
    ],
    providers: [],
})
export class SearchModule {}