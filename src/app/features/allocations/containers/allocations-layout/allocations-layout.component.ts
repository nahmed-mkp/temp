import { Component, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import * as fromStore from '../../store';
import * as fromModels from '../../models/agreements.models';


@Component({
    selector: 'app-allocations-layout',
    templateUrl: './allocations-layout.component.html',
    styleUrls: ['./allocations-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeAllocationsLayoutComponent implements OnInit, OnDestroy {


    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

}
