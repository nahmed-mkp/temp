import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { MatLegacySlideToggleChange as MatSlideToggleChange } from '@angular/material/legacy-slide-toggle';

import * as moment from 'moment';
import * as fromModels from './../../models/leverage.models';

@Component({
    selector: 'app-leverage-params',
    templateUrl: './leverage-params.component.html',
    styleUrls: ['./leverage-params.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeverageParamsComponent implements OnInit, OnChanges {

    @Input() activeDate: string;
    @Input() selectedGrouping: string;
    @Input() isLive: boolean;

    @Input() leverageDates: string[];
    @Input() leverageDatesLoading: boolean;
    @Input() leverageDatesLoaded: boolean;
    @Input() leverageDatesError: string;

    @Input() supportedGroupings: string[];
    @Input() supportedGroupingsLoading: boolean;
    @Input() supportedGroupingsLoaded: boolean;
    @Input() supportedGroupingsError: string;

    @Input() maxTimeStamp: string;

    @Output() changeParameter: EventEmitter<fromModels.LeverageRequest> = new EventEmitter<fromModels.LeverageRequest>();

    // public selectedDate: string;

    public liveMode: boolean;

    constructor() { }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        // if (changes.activeDate && changes.activeDate.currentValue) {
        //     this.selectedDate = new Date(this.activeDate);
        // }
    }

    // public onActiveDateChanged(e: MatDatepickerInputEvent<Date>): void {
    //     this.selectedDate = e.value;
    //     this.activeDate = this.selectedDate.toLocaleDateString();
    //     const param = { 'asOfDate': this.activeDate, 'grouping': this.selectedGrouping, 'isLive': this.isLive };
    //     this.onParamChanged(param);
    // }

    public onGroupingChanged(e: MatSelectChange): void {
        this.selectedGrouping = e.value;
        const param = { 'asOfDate': this.activeDate, 'grouping': e.value, 'isLive': this.isLive };
        if (this._checkParams()) {
            this.onParamChanged(param);
        }
    }

    public onActiveDateChanged(e: MatSelectChange): void {
        this.activeDate = e.value;
        this._checkLiveMode();
        const param = { 'asOfDate': this.activeDate, 'grouping': this.selectedGrouping, 'isLive': this.isLive };
        if (this._checkParams()) {
            this.onParamChanged(param);
        }
    }

    public onModeChanged(e: MatSlideToggleChange): void {
        this.isLive = e.checked;
        const param = {'asOfDate': this.activeDate, 'grouping': this.selectedGrouping, 'isLive': e.checked};
        if (this._checkParams()) {
            this.onParamChanged(param);
        }
    }

    private onParamChanged(e: fromModels.LeverageRequest): void {
        this.changeParameter.emit(e);
    }

    private _checkParams() {
        if (this.activeDate && this.selectedGrouping) {
            return true;
        }
    }

    private _checkLiveMode() {
        if (this.leverageDates.indexOf(this.activeDate) === 0) {
            this.liveMode = true;
            this.isLive = true;
        } else {
            this.liveMode = false;
            this.isLive = false;
        }
    }
}
