import { Component, EventEmitter, HostBinding, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import moment from 'moment';
import * as fromModels from '../../models';

@Component({
  selector: 'app-pricing-engine-multi-asset-option-layout',
  templateUrl: './pricing-engine-multi-asset-option-layout.component.html',
  styleUrls: ['./pricing-engine-multi-asset-option-layout.component.scss']
})
export class PricingEngineMultiAssetOptionLayoutComponent implements OnInit {

  @HostBinding('class') classes = 'vertical-flex-full-height';
  @Input() latestPortfolioDate: any;

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

  public maoOwnershipData$: Observable<any>;
  public maoOwnershipDataLoading$: Observable<boolean>;

  constructor(private store: Store<fromStore.PricingEngineState>) { }


  ngOnInit() {
    this.data$ = this.store.select(fromStore.getMultiAssetOptionsData);
    this.timeStamp$ = this.store.select(fromStore.getMultiAssetOptionsTimeStamp);
    this.loading$ = this.store.select(fromStore.getMultiAssetOptionsLoading);
  
    this.maoOwnershipData$ = this.store.select(fromStore.getMultiAssetOptionsOwnership);
    this.maoOwnershipDataLoading$ = this.store.select(fromStore.getMultiAssetOptionsOwnershipLoading);

    this.securityDetail$ = this.store.select(fromStore.getMultiAssetOptionsDetail);
    this.securityDetailLoading$ = this.store.select(fromStore.getMultiAssetOptionsDetailLoading);


    this.store.dispatch(new fromStore.UpdateSelectedDate(new Date()))

    this.onLoadData();
    this.setupTimer();
  }

  ngOnChanges(changes: SimpleChanges): void {
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

  public onMultiAssetOptionUpdate(event: {payload: fromModels.MultiAssetOptionUpdateReq, field: string}) {
    event.payload['as_of_date'] = moment(this.selectedDate).format('MM-DD-YYYY');
    event.payload['carryClose'] = true;
    const action = fromStore.updateMultiAssetOption(event.payload);
    const obj = { payload: event.payload, action: action };
    event.payload[event.field] === null ? this.store.dispatch(action) : this.openPopup.emit(obj)
  }

  public onEditing(event: boolean) {
    this.isEditing = event;
  }

  public onChangeSideScreen() {
    this.showDetailInfo = !this.showDetailInfo;
}

public onMaoSelected(event: number) {
  this.store.dispatch(fromStore.loadMultiAssetOptionsOwnership({
      sid: event,
      asOfDate: this.selectedDate,
  }));

  this.store.dispatch(fromStore.loadMultiAssetOptionsDetail(event));
}

  private setupTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
        if (this.isEditing === false) {
            this.onLoadData();
        }
    }, 15000);
}

  private onLoadData() {
    this.store.dispatch(fromStore.loadMultiAssetOptions({
        asOfDate: this.selectedDate,
        mode: this.mode === 'live' ? 1 : 0,
        assetClass: 'mao',
    }));
}


}
