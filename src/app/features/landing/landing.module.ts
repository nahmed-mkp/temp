import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';

import * as fromContainers from './containers';

const FEATURE_CONTAINERS = [
    fromContainers.LandingLayoutComponent
];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS
    ],
    imports: [
        CommonModule,

        LandingRoutingModule
    ],
    exports: [

    ],
    providers: [

    ],
})
export class LandingModule {
}
