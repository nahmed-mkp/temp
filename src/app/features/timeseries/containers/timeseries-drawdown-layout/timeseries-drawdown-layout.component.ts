import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { GridApi, ColumnApi, GridOptions, ColDef } from 'ag-grid-community';
import moment from 'moment';
import { UtilityService } from 'src/app/services';
import * as fromStore from '../../store';
import * as fromModels from '../../models';

@Component({
  selector: 'app-timeseries-drawdown-layout',
  templateUrl: './timeseries-drawdown-layout.component.html',
  styleUrls: ['./timeseries-drawdown-layout.component.scss']
})
export class TimeseriesDrawdownLayoutComponent implements OnChanges{

  @Input() currTab: fromModels.ITab;
  @Input() drawdownData: any;
  @Input() drawdownDataLoading: boolean;
  @Input() selectedDrawdownDataTimeseries: string;
  @Input() selectedPoint: {date: string; value: number};
  
  @Output() onSelectedDrawdownTimeseriesChanged: EventEmitter<string> = new EventEmitter<string>();

  public timeseriesArr: any;
  public window: number = 21;
  public observation: number = 30;
  public calcMethod: string = 'percentage'; 
  public direction: string = 'long'; 
  public selectedTs: string = '';

  constructor(private store: Store<fromStore.State>, private utilities: UtilityService) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes.currTab && changes.currTab.currentValue){
      this.timeseriesArr = this.currTab.portfolio.timeseries;


      if(changes && changes.selectedDrawdownDataTimeseries){
        this.selectedTs = this.selectedDrawdownDataTimeseries
      }
    }
  }

  submitDrawdownParams(){
    let payload: fromModels.IDrawdownReq = {
      params:{
        calc_method: this.calcMethod,
        direction: this.direction, 
        observation: this.observation,
        window: this.window
      },
    }
    this.store.dispatch(fromStore.loadDrawdownData(payload));
  }

  resetDrawdownParams(){
    
  }

  handleSelectedDrawdownTsChange(event){
    this.onSelectedDrawdownTimeseriesChanged.emit(event.value)
  } 

}