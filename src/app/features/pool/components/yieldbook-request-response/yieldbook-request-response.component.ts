import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import * as moment from 'moment';
import * as fromModels from '../../models/yieldbook.models';


@Component({
    selector: 'app-yieldbook-request-response',
    templateUrl: './yieldbook-request-response.component.html',
    styleUrls: ['./yieldbook-request-response.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class YieldbookRequestResponseComponent implements OnInit {

    public requestLogs = [];
    public customGridOption = {};
    public extraOption = {}

    @Input() request: fromModels.IYieldbookRequest;
    @Input() response: fromModels.IYieldbookResponse;

    constructor() { }

    ngOnInit(): void { }

    customGridCallBack() {}

    selectedTabChange(event) {}

}
