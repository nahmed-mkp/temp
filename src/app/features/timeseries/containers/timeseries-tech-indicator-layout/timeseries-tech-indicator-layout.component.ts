import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { GridApi, ColumnApi, GridOptions, ColDef } from 'ag-grid-community';
import moment from 'moment';
import { UtilityService } from 'src/app/services';
import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-timeseries-tech-indicator-layout',
  templateUrl: './timeseries-tech-indicator-layout.component.html',
  styleUrls: ['./timeseries-tech-indicator-layout.component.scss']
})
export class TimeseriesTechIndicatorLayoutComponent implements OnChanges{

  @Input() currTab: fromModels.ITab;
  @Input() startDate: Date;
  @Input() endDate: Date;

  public bbollingerStdDevUp: number = 2;
  public bbollingerStdDevDown: number = 2;
  public bbollingerWindow: number = 30;
  public bbollingerActive: boolean = false;

  public rsiWindow: number = 30;
  public rsiActive: boolean = false;

  public smaWindow: number = 9;
  public smaActive: boolean = false;

  public macdWindowFast: number = 12;
  public macdWindowSlow: number = 26;
  public macdWindowSignal: number = 9;
  public macdActive: boolean = false;

  constructor(private store: Store<fromStore.State>, private utilities: UtilityService) {}

  ngOnChanges(changes: SimpleChanges): void {

  }

  submitBBandsParams(){
    let bbandsReq: fromModels.IBollingerBandsReq = {
      startDate: moment(this.startDate).format('MM-DD-YYYY'),
      endDate: moment(this.endDate).format('MM-DD-YYYY'),
      guid: this.currTab.portfolio.guid,
      params: {
        stdevup: this.bbollingerStdDevUp,
        stdevdown: this.bbollingerStdDevDown,
        window: this.bbollingerWindow
      }
    }
    this.bbollingerActive = true;
    this.store.dispatch(fromStore.loadBollingerBandsData(bbandsReq))
  }

  submitRsiParams(){
    let rsiReq: fromModels.IRelativeStrengthIndicatorReq = {
      startDate: moment(this.startDate).format('MM-DD-YYYY'),
      endDate: moment(this.endDate).format('MM-DD-YYYY'),
      guid: this.currTab.portfolio.guid,
      params: {
        window: this.rsiWindow
      }
    }
    this.rsiActive = true;
    this.store.dispatch(fromStore.loadRelativeStrengthIndicatorData(rsiReq))
  }

  submitSmaParams(){
    let smaReq: fromModels.ISimpleMovingAvgReq = {
      startDate: moment(this.startDate).format('MM-DD-YYYY'),
      endDate: moment(this.endDate).format('MM-DD-YYYY'),
      guid: this.currTab.portfolio.guid,
      params: {
        window: this.smaWindow
      }
    }
    this.smaActive = true;
    this.store.dispatch(fromStore.loadSimpleMovingAvgData(smaReq))
  }

  submitMacdParams(){ 
    let macdReq: fromModels.IMovingAverageConvergenceDivergenceReq = {
      startDate: moment(this.startDate).format('MM-DD-YYYY'),
      endDate: moment(this.endDate).format('MM-DD-YYYY'),
      guid: this.currTab.portfolio.guid,
      params: {
        window_fast: this.macdWindowFast,
        window_slow: this.macdWindowSlow,
        window_signal: this.macdWindowSignal
      }
    }
    this.macdActive = true;
    this.store.dispatch(fromStore.loadMovingAverageConvergenceDivergenceData(macdReq))
  }

  clearIndicator(indicator: string){
    switch(indicator){
      case 'bbands':
        this.bbollingerActive = false;
        this.store.dispatch(fromStore.clearBollingerBandsData())
        break;
      case 'rsi':
        this.rsiActive = false;
        this.store.dispatch(fromStore.clearRelativeStrengthIndicatorData())
        break;
      case 'sma':
        this.smaActive = false;
        this.store.dispatch(fromStore.clearSimpleMovingAvgData())
        break;
      case 'macd':
        this.macdActive = false;
        this.store.dispatch(fromStore.clearMovingAverageConvergenceDivergenceData())
        break;
      default: 
        return
    }
  }

  isNotValid(indicator: string){
    switch(indicator){
      case 'bbands':
        return !this.bbollingerStdDevUp || !this.bbollingerStdDevDown || !this.bbollingerWindow
      case 'rsi':
        return !this.rsiWindow
      case 'sma':
        return !this.smaWindow
      case 'macd':
        return !this.macdWindowFast || !this.macdWindowSlow || !this.macdWindowSignal
      default: 
        return
    }
  }

}