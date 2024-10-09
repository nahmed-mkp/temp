import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import { RcpmPnlRecRoutingModule } from './rcpm-pnl-rec-routing.module';
import * as fromSharedModules from './../../shared';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';
import * as fromGuards from './guards';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effect } from './store';
import { UtilityService } from 'src/app/services';

export const CONTAINERS = [
  fromContainers.RcpmPnlRecLayoutComponent,
  fromContainers.PrizmSEIPnlRecLayoutComponent
];

export const COMPONENTS = [
  fromComponents.RcpmPnlRecViewerComponent,
  fromComponents.CRDPosRecViewerComponent,
  fromComponents.PrizmRcpmPricerRecViewerComponent,
  fromComponents.PrizmSEIActiveRecBuilderComponent,
  fromComponents.PrizmSEIPnlViewerComponent,
  fromComponents.PrizmSEIPnlRecViewerComponent
];

export const PROVIDERS = [
  fromServices.RCPMPnlRecService,
  fromServices.PrizmSEIPnlRecService
];

export const GUARDS = [
  fromGuards.PnlRecGuard
];

@NgModule({
  declarations: [
    ...CONTAINERS,
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),

    fromSharedModules.NativeModule,
    fromSharedModules.MaterialModule,
    fromSharedModules.VendorModule,
    fromSharedModules.CustomModule,

    RcpmPnlRecRoutingModule,

    StoreModule.forFeature('RCPMPnlRec', reducers),
    EffectsModule.forFeature(effect)
  ],
  providers: [
    ...PROVIDERS,
    ...GUARDS
  ]
})
export class RcpmPnlRecModule { }
