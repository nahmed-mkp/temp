import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromSharedModules from './../../shared';
import { PricingCalculatorsRoutingModule } from './pricing-calculators-routing.module';
import * as fromContainers from './containers';
import * as fromComponents from './components';
import * as fromServices from './services';

import { effects, reducers } from './store';
import { FxOptionsDialogComponent, FxOptionsDialogAltComponent } from './components';

export const CONTAINERS = [
    fromContainers.PricingCalculatorLayoutComponent,
    fromContainers.PricingCalculatorSwapsLayoutComponent,
    fromContainers.PricingCalculatorSwaptionsLayoutComponent,
    fromContainers.PricingCalculatorFXOptionLayoutComponent,
    fromContainers.PricingCalculatorOptionsLayoutComponent,
];

export const COMPONENTS = [
    // Swaps
    fromComponents.SwapsPricingComponent,

    // Swaptions
    fromComponents.SwaptionsPricingComponent,

    // FX Options
    fromComponents.FXOptionsPricingComponent,

    // Options
    fromComponents.OptionsPricingComponent,

    fromComponents.PricingCalculatorGeneralFormComponent,

    fromComponents.FxOptionsDialogComponent,

    fromComponents.FxOptionsDialogAltComponent
];

const FEATURE_PROVIDERS = [
    fromServices.CalculationInputService,
    fromServices.CalculatorService,
];


@NgModule({
    declarations: [
        ...CONTAINERS,
        ...COMPONENTS,
    ],
    imports: [
        CommonModule,
        fromSharedModules.NativeModule,
        fromSharedModules.MaterialModule,
        fromSharedModules.VendorModule,
        fromSharedModules.CustomModule,
        PricingCalculatorsRoutingModule,
        StoreModule.forFeature('pricers', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        ...FEATURE_PROVIDERS
    ]
})
export class PricingCalculatorsModule { }
