import { Component, OnInit, HostBinding, OnDestroy, SimpleChanges, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from './../../store';
import moment from 'moment';

@Component({
    selector: 'app-pricing-engine-manual-marks-layout',
    templateUrl: './pricing-engine-manual-marks-layout.component.html',
    styleUrls: ['./pricing-engine-manual-marks-layout.component.scss']
})
export class PricingEngineManualMarksLayoutComponent implements OnInit, OnChanges {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    @Input() latestPortfolioDate: string;
    @Input() selectedPortfolioDate: Date;

    public userSelectedDate: Date;

    public data$: Observable<any>;
    public loading$: Observable<boolean>;

    constructor(private store: Store<fromStore.PricingEngineState>) { }

    ngOnInit() {
        this.data$ = this.store.select(fromStore.getManualMarksData);
        this.loading$ = this.store.select(fromStore.getManualMarksDataLoading);
        this.store.dispatch(new fromStore.UpdateSelectedDate(new Date()));
        this.store.dispatch(fromStore.loadManualMarks()); 
    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    public onDateChange(event) {
      this.userSelectedDate = event;
      this.store.dispatch(new fromStore.UpdateSelectedDate(this.userSelectedDate))
      this.store.dispatch(fromStore.loadManualMarks());
    }
}
