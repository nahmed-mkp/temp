import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';

@Component({
  selector: 'app-bluepearl-synthetic-trades-layout',
  templateUrl: './bluepearl-synthetic-trades-layout.component.html',
  styleUrls: ['./bluepearl-synthetic-trades-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BluePearlSyntheticTradesLayout {

  public syntheticTradeData$: Observable<any>;

  constructor(private store: Store<fromStore.BluePearlState>) {
      this.syntheticTradeData$ = this.store.select(fromStore.getBluePearlSyntheticTrades);
  }

  ngOnInit(): void {
      this.store.dispatch(fromStore.loadSyntheticTrades());
  }

}

