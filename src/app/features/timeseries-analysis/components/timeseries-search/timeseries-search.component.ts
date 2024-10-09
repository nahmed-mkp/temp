import { ChangeDetectionStrategy, Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';

import * as fromModels from './../../models/timeseries.models';

@Component({
    selector: 'app-timeseries-search',
    templateUrl: './timeseries-search.component.html',
    styleUrls: ['./timeseries-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesSearchComponent implements OnInit {
    
    public searchForm: FormGroup;    

    public selectedTimeseries: fromModels.ITimeseries[] = [];

    @Input() searchResults: fromModels.ITimeseries[]
    @Input() searching: boolean;
    @Input() searched: boolean;
    @Input() searchError: string;

    @Output() searchTimeseries: EventEmitter<fromModels.ITimeseriesSearch> = new EventEmitter<fromModels.ITimeseriesSearch>();

    private KEY_CODE_ENTER = 13;
    private KEY_CODE_DOWN = 40;
    private KEY_CODE_UP = 38;

    public handleKeyUpEvent_debounce: any;

    constructor(private fb: FormBuilder) {
        this.searchForm = this.fb.group({
            'searchText': [null, Validators.required]
        });

        this.handleKeyUpEvent_debounce = _.debounce(this.handleKeyUpEvent.bind(this), 500);
    }

    ngOnInit(): void { }

    public handleKeyUpEvent(e: any): void {
        const searchTerm = {'criteria': e.target.value as string};
        const code = e.keyCode;

        if (code === this.KEY_CODE_DOWN || code === this.KEY_CODE_UP) {
            e.stopPropagation();
            return;
        }
        switch (code) {

            case this.KEY_CODE_ENTER:
                // this.showGrid$.next(false);
                break;

            default:
                this.searchTimeseries.emit(searchTerm);
                break;
        }
    }
}
