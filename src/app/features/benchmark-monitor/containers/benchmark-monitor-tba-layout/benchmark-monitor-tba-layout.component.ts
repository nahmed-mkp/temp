import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';


@Component({
  selector: 'app-benchmark-monitor-tba-layout',
  templateUrl: './benchmark-monitor-tba-layout.component.html',
  styleUrls: ['./benchmark-monitor-tba-layout.component.scss']
})
export class BenchmarkMonitorTbaLayoutComponent implements OnInit {

  @HostBinding('class') classes = 'standard-grid-layout';

  public tbaData$: Observable<any[]>;

  constructor(private store: Store<fromStore.BenchmarkMonitorState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadTbaData());

    this.tbaData$ = this.store.select(fromStore.getTbaData);
  }

}
