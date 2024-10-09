import { Component, OnInit, HostBinding, OnDestroy, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from '../../models';
import moment from 'moment';

@Component({
    selector: 'app-pricing-engine-futures-layout',
    templateUrl: './pricing-engine-futures-layout.component.html',
    styleUrls: ['./pricing-engine-futures-layout.component.scss']
})
export class PricingEngineFuturesLayoutComponent implements OnInit, OnDestroy, OnChanges {

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

    public swapOwnershipData$: Observable<any>;
    public swapOwnershipDataLoading$: Observable<boolean>;

    constructor(private store: Store<fromStore.PricingEngineState>) { }

    ngOnInit() {
        this.data$ = this.store.select(fromStore.getFuturesData);
        this.timeStamp$ = this.store.select(fromStore.getFuturesTimeStamp);
        this.loading$ = this.store.select(fromStore.getFuturesLoading);

        this.swapOwnershipData$ = this.store.select(fromStore.getSwapOwnership);
        this.swapOwnershipDataLoading$ = this.store.select(fromStore.getSwapOwnershipLoading);

        this.securityDetail$ = this.store.select(fromStore.getSwapDetail);
        this.securityDetailLoading$ = this.store.select(fromStore.getSwapDetailLoading);

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
            this.store.dispatch(new fromStore.UpdateSelectedDate(this.selectedDate));
            this.isCurrentDate = false;
            this.mode = 'close';
        }
        this.onLoadData();
        this.setupTimer();
    }

    public onRowSelected(event: number) {
        this.store.dispatch(new fromStore.LoadSwapOwnership({
            sid: event,
            asOfDate: this.selectedDate,
        }));
        this.store.dispatch(new fromStore.LoadSwapDetail(event));
    }

    public onFuturesUpdate(event: {payload: fromModels.FutureUpdateReq, field: string}) {
        event.payload['mode'] = this.mode;
        event.payload['as_of_date'] = moment(this.selectedDate).format('MM-DD-YYYY');
        event.payload['carryClose'] = true;
        const action = new fromStore.UpdateFutures(event.payload);
        const obj = { payload: event.payload, action: action };
        event.payload[event.field] === null ? this.store.dispatch(action) : this.openPopup.emit(obj)
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
        this.store.dispatch(new fromStore.LoadFutures({
            asOfDate: this.selectedDate,
            mode: this.mode,
            assetClass: 'futures',
        }));
    }

}
