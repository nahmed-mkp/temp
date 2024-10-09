import { Component, OnInit, HostBinding, ViewChild, AfterViewInit, SimpleChanges, Input, OnChanges, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import moment from 'moment';

import * as fromModels from './../../models';
import * as fromStore from '../../store';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
    selector: 'app-pricing-engine-bval-bonds-layout',
    templateUrl: './pricing-engine-bval-bonds-layout.component.html',
    styleUrls: ['./pricing-engine-bval-bonds-layout.component.scss']
})
export class PricingEngineBVALBondsLayoutComponent implements OnInit, OnChanges, OnDestroy {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    @Input() latestPortfolioDate: string;
    @Input() selectedPortfolioDate: Date;

    public userSelectedDate: Date;

    public data$: Observable<fromModels.IBVALBondPriceRes[]>;
    public loading$: Observable<boolean>;

    public isCurrentDate = true;

    private timer: any;
    private isEditing = false;
    
    public mode = 'live';

    constructor(private store: Store<fromStore.PricingEngineState>) { }

    ngOnInit() {
        this.data$ = this.store.select(fromStore.getBVALBondPrices);
        this.loading$ = this.store.select(fromStore.getBVALBondPricesLoading);

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

    public onDateChange(event) {
      this.userSelectedDate = event;
      const currentDate = (new Date()).toDateString();      
      if (this.userSelectedDate.toDateString() === currentDate) {
          this.store.dispatch(new fromStore.UpdateSelectedDate(this.userSelectedDate))
          this.isCurrentDate = true;
      } else {
          this.store.dispatch(new fromStore.UpdateSelectedDate(this.userSelectedDate))
          this.isCurrentDate = false;
      }
      this.onLoadData();
      this.setupTimer();
    }

    ngOnDestroy() {
        if (this.timer) {
            clearInterval(this.timer);
        }
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
        this.store.dispatch(fromStore.loadBVALBondPrices());
    }

    public onModeChanged(e: MatSlideToggleChange): void {
      if (e.checked) { 
        // enable timer
        this.onLoadData();
        this.setupTimer();
      } else { 
        // disable timer
        if (this.timer) {
            clearInterval(this.timer);
        }
      }
      
    }

}
