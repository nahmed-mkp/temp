import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as fromServices from './services';
import { effects, reducers } from './store';

const PROVIDERS = [
    fromServices.SocketService
];

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,

        StoreModule.forFeature('sockets', reducers),
        EffectsModule.forFeature(effects)
    ],
    exports: [
    ],
    providers: [
        ...PROVIDERS
    ],
})
export class SocketsModule { }
