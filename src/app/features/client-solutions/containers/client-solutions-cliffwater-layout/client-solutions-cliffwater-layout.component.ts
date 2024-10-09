import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-solutions-cliffwater-layout',
  templateUrl: './client-solutions-cliffwater-layout.component.html',
  styleUrls: ['./client-solutions-cliffwater-layout.component.scss']
})
export class ClientSolutionsCliffwaterLayoutComponent implements OnInit {

  @HostBinding('class') classes = 'vertical-flex-full-height';

  public selectedFund = 'MKP Opportunity';
  public selectedDate: Date;

  public data$: Observable<any[]>;
  public loading$: Observable<boolean>;

  private downloadFileFunc: any;

  constructor(private store: Store<fromStore.State>) { }

  ngOnInit() {
    this.data$ = this.store.select(fromStore.getCliffwaterData);
    this.loading$ = this.store.select(fromStore.getCliffwaterDataLoadingStatus);
  }

  public onSelectedFundChange() {
    this.store.dispatch(new fromStore.LoadCliffwaterData({
      asOfDate: this.selectedDate,
      fund: this.selectedFund
    }));
  }

  public onDateChange() {
    this.store.dispatch(new fromStore.LoadCliffwaterData({
      asOfDate: this.selectedDate,
      fund: this.selectedFund
    }));
  }

  public downloadFile(event) {
    this.downloadFileFunc = event;
  }

  public onDownload() {
    this.downloadFileFunc();
  }

}
