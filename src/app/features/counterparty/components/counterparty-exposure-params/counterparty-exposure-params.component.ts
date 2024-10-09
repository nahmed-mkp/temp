import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

import * as moment from 'moment';

@Component({
    selector: 'app-counterparty-exposure-params',
    templateUrl: './counterparty-exposure-params.component.html',
    styleUrls: ['./counterparty-exposure-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterpartyExposureParamsComponent implements OnInit {

    public constructor() {}

    ngOnInit(): void {
    }
}
