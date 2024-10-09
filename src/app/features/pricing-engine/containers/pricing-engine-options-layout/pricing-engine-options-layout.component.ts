import { Component, OnInit, HostBinding, OnDestroy, SimpleChanges, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from '../../models';
import moment from 'moment';

@Component({
    selector: 'app-pricing-engine-options-layout',
    templateUrl: './pricing-engine-options-layout.component.html',
    styleUrls: ['./pricing-engine-options-layout.component.scss']
})
export class PricingEngineOptionsLayoutComponent implements OnInit, OnDestroy, OnChanges {

    @HostBinding('class') classes = 'vertical-flex-full-height';
    @Input() latestPortfolioDate: string;

    @Output() openPopup = new EventEmitter<any>();

    public data$: Observable<any>;
    public loading$: Observable<boolean>;
    public timeStamp$: Observable<any>;

    public securityDetail$: Observable<any>;
    public securityDetailLoading$: Observable<boolean>;

    public selectedDate: Date = new Date();
    public mode: 'live' | 'close' = 'live';
    public isCurrentDate = true;
    public showDetailInfo = false;

    private timer: any;
    private isEditing: boolean = false;

    public optionOwnershipData$: Observable<any>;
    public optionOwnershipDataLoading$: Observable<boolean>;

    constructor(private store: Store<fromStore.PricingEngineState>) { }

    ngOnInit() {
        this.data$ = this.store.select(fromStore.getOptionsData);
        this.timeStamp$ = this.store.select(fromStore.getOptionsTimeStamp);
        this.loading$ = this.store.select(fromStore.getOptionsLoading);

        this.optionOwnershipData$ = this.store.select(fromStore.getOptionOwnership);
        this.optionOwnershipDataLoading$ = this.store.select(fromStore.getOptionOwnershipLoading);

        this.securityDetail$ = this.store.select(fromStore.getOptionDetail);
        this.securityDetailLoading$ = this.store.select(fromStore.getOptionDetailLoading);

        this.store.dispatch(new fromStore.UpdateSelectedDate(new Date()))

        this.onLoadData();
        this.setupTimer();
    }


    ngOnChanges(changes: SimpleChanges): void {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        if(changes.latestPortfolioDate && changes.latestPortfolioDate.currentValue){
            const date = moment(this.latestPortfolioDate, 'MM-DD-YYYY').toDate();
            this.selectedDate = date;
            this.store.dispatch(new fromStore.UpdateSelectedDate(date))
        }
    }
    
    ngOnDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.store.dispatch(new fromStore.ResetSwapDetail);
    }

    // Event --------------------------------------------------------------------

    public onModeChange() {
        this.mode = this.mode === 'live' ? 'close' : 'live';
        this.onLoadData();
        this.setupTimer();
    }

    public onDateChange() {
        const currentDate = (new Date()).toDateString();
        if (this.selectedDate.toDateString() === currentDate) {
            this.isCurrentDate = true;
            this.mode = 'live';
        } else {
            this.store.dispatch(new fromStore.UpdateSelectedDate(this.selectedDate))
            this.isCurrentDate = false;
            this.mode = 'close';
        }
        this.onLoadData();
        this.setupTimer();
    }

    public onOptionUpdate(event: {payload: fromModels.OptionUpdateReq, field: string}) {
        event.payload['mode'] = this.mode;
        event.payload['as_of_date'] = moment(this.selectedDate).format('MM-DD-YYYY');
        event.payload['carryClose'] = true;
        const action = new fromStore.UpdateOption(event.payload);
        const obj = { payload: event.payload, action: action };
        event.payload[event.field] === null ? this.store.dispatch(action) : this.openPopup.emit(obj)
    }

    public onOptionPriceMethodUpdate(event: {payload: fromModels.OptionPriceMethodUpdateReq, field:string}) {
        event.payload['mode'] = this.mode;
        const action = new fromStore.UpdateOptionPriceMethod(event.payload);
        const obj = { payload: event.payload, action:action };
        event.payload[event.field] === null ? this.store.dispatch(action) : this.openPopup.emit(obj)
    }

    public onOptionSelected(event: number) {
        this.store.dispatch(new fromStore.LoadOptionOwnership({
            sid: event,
            asOfDate: this.selectedDate,
        }));

        this.store.dispatch(new fromStore.LoadOptionsDetail(event));
    }

    public onEditing(event: boolean) {
        this.isEditing = event;
    }

    public onChangeSideScreen() {
        this.showDetailInfo = !this.showDetailInfo;
    }

    // ------------------------------------------------------------------------

    private setupTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            if (this.isEditing === false) {
                this.onLoadData();
            }
        }, 15000);
    }

    private onLoadData() {
        this.store.dispatch(new fromStore.LoadOptions({
            asOfDate: this.selectedDate,
            mode: this.mode,
            assetClass: 'options',
        }));
    }

}
