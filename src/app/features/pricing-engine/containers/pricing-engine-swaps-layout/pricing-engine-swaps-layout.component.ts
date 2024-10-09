import { Component, OnInit, HostBinding, OnDestroy, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import { Observable } from 'rxjs';

import * as fromModels from '../../models';
import moment from 'moment';

@Component({
    selector: 'app-pricing-engine-swaps-layout',
    templateUrl: './pricing-engine-swaps-layout.component.html',
    styleUrls: ['./pricing-engine-swaps-layout.component.scss']
})
export class PricingEngineSwapsLayoutComponent implements OnInit, OnDestroy, OnChanges {

    @HostBinding('class') classes = 'vertical-flex-full-height';
    @Input() latestPortfolioDate: string;

    @Output() openPopup = new EventEmitter<any>();
    
    public data$: Observable<any>;
    public loading$: Observable<boolean>;
    public timeStamp$: Observable<any>;

    public swapOwnershipData$: Observable<any>;
    public swapOwnershipDataLoading$: Observable<boolean>;

    public securityDetail$: Observable<any>;
    public securityDetailLoading$: Observable<boolean>;

    public selectedDate: Date = new Date();
    public mode: 'live' | 'close' = 'live';
    public isCurrentDate = true;
    public showDetailInfo = false;

    private timer: any;
    private isEditing = false;

    constructor(private store: Store<fromStore.PricingEngineState>) { }

    ngOnChanges(changes: SimpleChanges): void {
        //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
        //Add '${implements OnChanges}' to the class.
        if(changes.latestPortfolioDate && changes.latestPortfolioDate.currentValue){
            const date = moment(this.latestPortfolioDate, 'MM-DD-YYYY').toDate();
            this.selectedDate = date;
            this.store.dispatch(new fromStore.UpdateSelectedDate(date))
        }
    }

    ngOnInit() {
        this.data$ = this.store.select(fromStore.getSwapsData);
        this.timeStamp$ = this.store.select(fromStore.getSwapsTimeStamp);
        this.loading$ = this.store.select(fromStore.getSwapsLoading);

        this.swapOwnershipData$ = this.store.select(fromStore.getSwapOwnership);
        this.swapOwnershipDataLoading$ = this.store.select(fromStore.getSwapOwnershipLoading);

        this.securityDetail$ = this.store.select(fromStore.getSwapDetail);
        this.securityDetailLoading$ = this.store.select(fromStore.getSwapDetailLoading);

        this.onLoadData();
        this.setupTimer();
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

    public onSwapSelected(event: number) {
        this.store.dispatch(new fromStore.LoadSwapOwnership({
            sid: event,
            asOfDate: this.selectedDate,
        }));

        this.store.dispatch(new fromStore.LoadSwapDetail(event));
    }

    public onSwapUpdate(event: {payload: fromModels.SwapUpdateReq, field: string }) {
       event.payload['mode'] = this.mode;
       event.payload['as_of_date'] = moment(this.selectedDate).format('MM-DD-YYYY');
       event.payload['carryClose'] = true;
       const action = new fromStore.UpdateSwap(event.payload);
       const obj = { payload: event.payload, action: action };
       event.payload[event.field] === null ? this.store.dispatch(action) : this.openPopup.emit(obj)
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
        this.store.dispatch(new fromStore.LoadSwaps({
            asOfDate: this.selectedDate,
            mode: this.mode,
            assetClass: 'swaps',
        }));
    }

}
