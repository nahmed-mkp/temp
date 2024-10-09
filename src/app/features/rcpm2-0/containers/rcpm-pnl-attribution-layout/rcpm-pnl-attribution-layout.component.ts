import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';

@Component({
  selector: 'app-rcpm-pnl-attribution-layout',
  templateUrl: './rcpm-pnl-attribution-layout.component.html',
  styleUrls: ['./rcpm-pnl-attribution-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RcpmPnlAttributionLayoutComponent implements OnInit {

  public data$: Observable<any[]>;
  public loadingStatus$: Observable<boolean>;
  public activeAsOfDate: Date;

  constructor(private store: Store<fromStore.RCPM2State>) {
  }

  ngOnInit() {
  }

  asOfDateChange(event: Date) {
    const targetDate = event.toLocaleDateString().split('/').join('-');
    // this.store.dispatch(new fromStore.LoadExecutions(targetDate));
  }

}
