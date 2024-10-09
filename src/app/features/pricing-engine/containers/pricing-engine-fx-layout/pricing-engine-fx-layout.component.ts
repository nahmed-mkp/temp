import { Component, OnInit, OnDestroy, HostBinding, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import moment from 'moment';

@Component({
    selector: 'app-pricing-engine-fx-layout',
    templateUrl: './pricing-engine-fx-layout.component.html',
    styleUrls: ['./pricing-engine-fx-layout.component.scss']
})
export class PricingEngineFxLayoutComponent implements OnInit, OnDestroy, OnChanges {

    @HostBinding('class') classes = 'vertical-flex-full-height';
    @Input() latestPortfolioDate: string;

    @Output() openPopup = new EventEmitter<any>();
    @Output() submitUpdatedPayload = new EventEmitter<any>();

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
    private isEditing = false;

    public fxOwnershipData$: Observable<any>;
    public fxOwnershipDataLoading$: Observable<boolean>;

    constructor(private store: Store<fromStore.PricingEngineState>) { }

    ngOnInit() {
        this.data$ = this.store.select(fromStore.getFxData);
        this.timeStamp$ = this.store.select(fromStore.getFxTimeStamp);
        this.loading$ = this.store.select(fromStore.getFxLoading);

        this.fxOwnershipData$ = this.store.select(fromStore.getFxOwnership);
        this.fxOwnershipDataLoading$ = this.store.select(fromStore.getFxOwnershipLoading);

        this.securityDetail$ = this.store.select(fromStore.getFxDetail);
        this.securityDetailLoading$ = this.store.select(fromStore.getFxDetailLoading);

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

    public onFxForwardUpdate(payload) {
        payload['mode'] = this.mode;
        payload['as_of_date'] = moment(this.selectedDate).format('MM-DD-YYYY');
        payload['carryClose'] = true;
        const action = new fromStore.UpdateFxForward(payload)
        const obj = { payload: payload , action: action}
        payload['mark_at_price'] === null ? this.store.dispatch(action) : this.openPopup.emit(obj);
    }

    public onEditing(event: boolean) {
        this.isEditing = event;
    }

    public onFxForwardSelected(event: number) {
        this.store.dispatch(new fromStore.LoadFxForwardOwnership({
            sid: event,
            asOfDate: this.selectedDate,
        }));
        this.store.dispatch(new fromStore.LoadFxForwardDetail(event));
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
        this.store.dispatch(new fromStore.LoadFx({
            asOfDate: this.selectedDate,
            mode: this.mode,
            assetClass: 'fx',
        }));
    }


}
