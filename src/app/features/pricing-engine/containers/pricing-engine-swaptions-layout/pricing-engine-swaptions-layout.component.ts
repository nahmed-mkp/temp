import { Component, OnInit, HostBinding, OnDestroy, SimpleChanges, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from '../../models';
import moment from 'moment';

@Component({
    selector: 'app-pricing-engine-swaptions-layout',
    templateUrl: './pricing-engine-swaptions-layout.component.html',
    styleUrls: ['./pricing-engine-swaptions-layout.component.scss']
})
export class PricingEngineSwaptionsLayoutComponent implements OnInit, OnDestroy, OnChanges {

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
    private isEditing = false;

    public swaptionOwnershipData$: Observable<any>;
    public swaptionOwnershipDataLoading$: Observable<boolean>;

    constructor(private store: Store<fromStore.PricingEngineState>) { }

    ngOnInit() {
        this.data$ = this.store.select(fromStore.getSwaptionsData);
        this.timeStamp$ = this.store.select(fromStore.getSwaptionsTimeStamp);
        this.loading$ = this.store.select(fromStore.getSwaptionsLoading);

        this.swaptionOwnershipData$ = this.store.select(fromStore.getSwaptionOwnership);
        this.swaptionOwnershipDataLoading$ = this.store.select(fromStore.getSwaptionOwnershipLoading);

        this.securityDetail$ = this.store.select(fromStore.getSwaptionDetail);
        this.securityDetailLoading$ = this.store.select(fromStore.getSwaptionDetailLoading);
        
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

    public onSwaptionUpdate(event: {payload: fromModels.SwaptionUpdateReq, field: string}) {
        event.payload['mode'] = this.mode;
        event.payload['as_of_date'] = moment(this.selectedDate).format('MM-DD-YYYY');
        event.payload['carryClose'] = true;
        const action = new fromStore.UpdateSwaption(event.payload);
        const obj = { payload: event.payload, action: action };
        event.payload[event.field] === null ? this.store.dispatch(action) : this.openPopup.emit(obj)
    }

    public onSwaptionSelected(event: number) {
        this.store.dispatch(new fromStore.LoadSwaptionOwnership({
            sid: event,
            asOfDate: this.selectedDate,
        }));

        this.store.dispatch(new fromStore.LoadSwaptionDetail(event));
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
        this.store.dispatch(new fromStore.LoadSwaptions({
            asOfDate: this.selectedDate,
            mode: this.mode,
            assetClass: 'swaptions',
        }));
    }

}
