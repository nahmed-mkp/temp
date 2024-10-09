import { Component, HostBinding, Input, OnChanges, SimpleChanges, ViewChild, ChangeDetectionStrategy, AfterViewInit, Output, EventEmitter} from '@angular/core';
import { MatLegacyTabGroup as MatTabGroup } from '@angular/material/legacy-tabs';
import { Store } from '@ngrx/store';
import * as fromModels from '../../models';
import * as fromStore from '../../store';


@Component({
  selector: 'app-timeseries-tab-layout',
  templateUrl: './timeseries-tab-layout.component.html',
  styleUrls: ['./timeseries-tab-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesTabLayoutComponent implements OnChanges {

  @ViewChild('tabs') tabGroup: MatTabGroup;
  @HostBinding('class') classes = 'vertical-flex-full-height';

  @Input() currTab: fromModels.ITab;
  @Input() startDate: Date;
  @Input() endDate: Date;

  @Input() drawdownData: any;
  @Input() drawdownDataLoading: boolean;

  @Input() selectedDrawdownDataTimeseries: number;
  @Input() selectedDrawdownDataTimeseriesRow: any;
  
  @Output() onSelectedDrawdownTimeseriesChanged: EventEmitter<string> = new EventEmitter<string>();
  @Output() onRegressionViewChanged: EventEmitter<string> = new EventEmitter<string>();

  public axisArr = [];
  public selectedPoint: {
    date: string;
    value: number;
  };

  constructor(private store: Store<fromStore.State>) {}

  ngOnChanges(changes: SimpleChanges){
    if(changes && changes.currTab && changes.currTab.currentValue && changes.currTab.currentValue !== changes.currTab.previousValue){
      this.axisArr = [];
      if(this.currTab && this.currTab.portfolio && this.currTab.portfolio.timeseries){
        this.currTab.portfolio.timeseries.map( series => {
          this.axisArr.push(series.axis);
        })
      }
      if(this.currTab && this.currTab.portfolio && this.currTab.portfolio.derivedTimeseries){
        this.currTab.portfolio.derivedTimeseries.map( series => {
          this.axisArr.push(series.axis);
        })
      }
    }
  }

  handleChartConfigChanged(config: any){
    // this.store.dispatch(fromStore.updateChartConfig(config))
  }
  
  handleSelectedDrawdownTsChanged(tsLabel: string){
    this.onSelectedDrawdownTimeseriesChanged.emit(tsLabel)
  }

  handleRegressionViewChanged(view: string){
    this.onRegressionViewChanged.emit(view);
  }

  handlePointSelected(point){
    this.selectedPoint = point;
  }
}
