import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IStatusPanelParams, RangeSelectionChangedEvent, GridApi } from 'ag-grid-community';
import { IStatusPanelAngularComp } from 'ag-grid-angular';
import { UtilityService } from 'src/app/services';
import * as _ from 'lodash';

@Component({
  selector: 'app-app-grid-custom-status-bar-cell-ranges-statistic',
  templateUrl: './app-grid-custom-status-bar-cell-ranges-statistic.component.html',
  styleUrls: ['./app-grid-custom-status-bar-cell-ranges-statistic.component.scss']
})
export class AppGridCustomStatusBarCellRangesStatisticComponent implements IStatusPanelAngularComp {

  private params: IStatusPanelParams;
  public cellValue: any;
  private gridApi: GridApi;
  private _onRangeSelectionChanged_debounce: any;

  public result: any;

  constructor(private ref: ChangeDetectorRef, private utilityService: UtilityService) { }

  agInit(params: IStatusPanelParams): void {
    this.params = params;
    this.utilityService = params.context.utilityService;
    this.gridApi = params.api;
    this._onRangeSelectionChanged_debounce = _.debounce(this._onRangeSelectionChanged.bind(this), 300);

    this.params.api.addEventListener('rangeSelectionChanged', (event: RangeSelectionChangedEvent) => {
      this._onRangeSelectionChanged_debounce(event);
    });
  }

  refresh(): boolean {
    return false;
  }

  private _onRangeSelectionChanged (event: RangeSelectionChangedEvent) {


    const rangesCollection = []
    this.gridApi.forEachDetailGridInfo(detailGridInfo => {

      const rangeObj = {
        gridApi: detailGridInfo.api,
        ranges: detailGridInfo.api.getCellRanges()
      }
      rangesCollection.push(rangeObj);
    });
    rangesCollection.push({
        gridApi: this.gridApi,
        ranges: this.gridApi.getCellRanges()
    });

    // if (rangesCollection.length === 1 
    //   && rangesCollection[0].ranges.length === 1 
    //   && rangesCollection[0].ranges[0].columns.length === 1
    //   && rangesCollection[0].ranges[0].startRow === rangesCollection[0].ranges[0].endRow) {
    //   // meaning only once cell is selected, no need to turn on range statistic (clear result)
    //   return;
    // } else if (rangesCollection.length === 1 && rangesCollection[0].ranges.length === 0) {
    //   // meaning no range selection (clear result)
    //   return;
    // }

    if (this._checkValideRangeSelection(rangesCollection)) {
      const {sum, mean, min, max, counter} = this.utilityService.getMultipleGridsRangesSelectionStatistics(rangesCollection);
      this.result = {
        sum: sum && sum.toLocaleString(undefined, {maximumFractionDigits: 3}),
        mean: mean && mean.toLocaleString(undefined, {maximumFractionDigits: 3}),
        min: min && min.toLocaleString(undefined, {maximumFractionDigits: 3}),
        max: max && max.toLocaleString(undefined, {maximumFractionDigits: 3}),
        counter: counter
      };
    } else {
      this.result = null;
    }

    this.ref.markForCheck();
  }

  private _checkValideRangeSelection(rangesCollection: any[]): boolean {

    let totalCellCount = 0;

    for (let index = 0; index < rangesCollection.length; index++) {
      const currentRanges = rangesCollection[index].ranges;
      if (currentRanges.length > 1) {
        totalCellCount = 2;
        break;
      }

      if (currentRanges.length === 1) {
        if (currentRanges[0].columns.length > 1) {
          totalCellCount = 2;
          break;
        } else if (currentRanges[0].startRow !== currentRanges[0].endRow) {
          totalCellCount = 2;
          break;
        } else if (currentRanges[0].columns.length === 1 && currentRanges[0].startRow === currentRanges[0].endRow) {
          totalCellCount += 1;
          if (totalCellCount > 1) {
            break;
          }
        }
      }
    }

    if (totalCellCount > 1) {
      return true;
    } else {
      return false;
    }
  }
}
