import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as fromHighcharts from './highcharts-data.service';
import * as fromPureFunctions from './pure-functions.service';

const PROVIDERS = [
    fromHighcharts.HighchartsDataService,
    fromPureFunctions.PureFunctionsService
];

@NgModule({
    declarations: [
    ],
    imports: [
    ],
    exports: [
    ],
    providers: [
        ...PROVIDERS
    ],
})
export class UtilitiesModule { }
