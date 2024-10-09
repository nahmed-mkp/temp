import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorldEventsRoutingModule } from './world-events-routing.module';

import * as fromContainers from './containers';

export const FEATURE_CONTAINERS = [
    fromContainers.WorldEventsLayoutComponent
];

@NgModule({
    declarations: [
        ...FEATURE_CONTAINERS
    ],
    imports: [
        CommonModule,
        WorldEventsRoutingModule,
    ],
    exports: []
})
export class WorldEventsModule { }
