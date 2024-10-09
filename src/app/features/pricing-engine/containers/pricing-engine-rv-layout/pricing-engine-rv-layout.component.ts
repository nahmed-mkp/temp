import { Component, OnInit, HostBinding, OnDestroy, SimpleChanges, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from './../../store';
import moment from 'moment';

@Component({
    selector: 'app-pricing-engine-rv-layout',
    templateUrl: './pricing-engine-rv-layout.component.html',
    styleUrls: ['./pricing-engine-rv-layout.component.scss']
})
export class PricingEngineRvLayoutComponent implements OnInit, OnChanges, OnDestroy {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    @Input() latestPortfolioDate: string;
    @Input() selectedPortfolioDate: Date;

    public userSelectedDate: Date;

    public data$: Observable<any>;
    public loading$: Observable<boolean>;

    public mode: 'live' | 'close' = 'live';
    public isCurrentDate = true;

    private timer: any;
    private isEditing = false;

    constructor(private store: Store<fromStore.PricingEngineState>) { }

    ngOnInit() {
        this.data$ = this.store.select(fromStore.getRvData);
        this.loading$ = this.store.select(fromStore.getRvDataLoading);

        this.store.dispatch(new fromStore.UpdateSelectedDate(new Date()))

        this.onLoadData();
        this.setupTimer();
    }

    ngOnChanges(changes: SimpleChanges): void {
      if(changes.latestPortfolioDate && changes.latestPortfolioDate.currentValue){
        const date = moment(this.latestPortfolioDate, 'MM-DD-YYYY').toDate();
        this.userSelectedDate = date;
        this.store.dispatch(new fromStore.UpdateSelectedDate(date))
      }      
    }

    public onSecNameSelected(payload: any) {
      if(payload['previousSourceMdid']){
        this.store.dispatch(fromStore.loadMdidEnrichedData(payload));
      } else {
        this.store.dispatch(fromStore.loadUserInputEnrichedData(payload));    
      }
    }

    public onDateChange(event) {
      this.userSelectedDate = event;
      const currentDate = (new Date()).toDateString();
      if (this.userSelectedDate.toDateString() === currentDate) {
          this.store.dispatch(new fromStore.UpdateSelectedDate(this.userSelectedDate))
          this.isCurrentDate = true;
          this.mode = 'live';
      } else {
          this.store.dispatch(new fromStore.UpdateSelectedDate(this.userSelectedDate))
          this.isCurrentDate = false;
          this.mode = 'close';
      }
      this.onLoadData();
      this.setupTimer();
    }

    public onModeChange() {
        this.mode = this.mode === 'live' ? 'close' : 'live';
        this.onLoadData();
        this.setupTimer();
    }

    ngOnDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
        this.store.dispatch(new fromStore.ResetSwapDetail);
    }

    // ------------------------------------------------------------------------

    private setupTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
          if (this.isEditing === false) {
            this.onLoadData();
          }
        }, 20000);
    }

    private onLoadData() {
        this.store.dispatch(fromStore.loadRVTrades());
    }


    onSecDeletionRequested(mdidArr: number[]){
      this.store.dispatch(fromStore.deleteSecsFromRvTrades(mdidArr));
    }

    public onEditing(event: boolean) {
      this.isEditing = event;
    }

}
