import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import * as _ from 'lodash';

@Component({
  selector: 'app-option-vols-fx-surface-result-viewer',
  templateUrl: './option-vols-fx-surface-result-viewer.component.html',
  styleUrls: ['./option-vols-fx-surface-result-viewer.component.scss']
})
export class OptionVolsFxSurfaceResultViewerComponent implements OnInit, OnChanges {

  @Input() result: any;
  @Output() adjustSize = new EventEmitter<number>();

  private gridApi: GridApi;
  public extraOption = {sizeColumnsToFit: true};
  private formattedData: any;
  private expiryDateMapping: any = {};

  public customGridOption: GridOptions;

  constructor(private utilityService: UtilityService) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.result && changes.result.currentValue) {

      if (this.result.surface && this.result.surface.length > 0) {
        this.formattedData = this.formateData(this.result.surface);
        this.createExpiryDateMapping(this.result.surface);
        if (this.gridApi) {
          this.gridApi.setRowData(this.formattedData);
          this.gridApi.sizeColumnsToFit();
          this.onAdjustGridSize();
        }
      }

      const targetColorCoder = this.columnColorCoding();

      this.customGridOption = {

        defaultColDef: {
          cellStyle: params => {
            return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
          },
          suppressMenu: true,
          suppressSorting: true,
        },

        autoGroupColumnDef: {
          headerName: this.result['ccyPair'],
          cellRendererParams: {
            suppressCount: true,
          },
          headerClass: 'ag-grid-dark-blue-header',
          cellClass: ['right-border', 'ag-grid-dark-blue-header'],
          cellStyle: {
            'font-weight' : 'bold'
          },
          sort: 'asc',
          comparator: (valueA, valueB) => {
            valueA = parseInt(valueA, 10);
            valueB = parseInt(valueB, 10);
            if (valueA > 0 && valueB < 0) {
              return -1;
            } else if (valueA < 0 && valueB > 0) {
              return 1;
            } else {
              return valueA - valueB;
            }
          }
        },

        columnDefs: [
          {headerName: 'Delta', field: 'delta', rowGroup: true, cellClass: ['right-border', 'ag-grid-dark-blue-header']},
          {headerName: 'Value', field: 'value', aggFunc: 'sum', cellClass: 'right-border', valueFormatter: this.utilityService.formatNumberAdvance(2),
          cellStyle: params => {
            return {
              background: this.utilityService.getTransparentColorValue(targetColorCoder(Math.abs(params.value))),
              'justify-content': 'flex-end'
            }
          }
        },
          {headerName: 'Expiry', field: 'expiry', pivot: true, cellClass: 'right-border', pivotComparator: this.pivotComparator.bind(this)},
        ],

        getContextMenuItems: (params) => {
          return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport'];
        },

        context: this,
        suppressRowTransform: true,
        suppressAggFuncInHeader: true,

        groupHeaderHeight: 30,
        rowHeight: 20,
        headerHeight: 25,
        rowBuffer: 500,

        pivotMode: true,
        processSecondaryColDef: colDef => {
          const date = this.expiryDateMapping[colDef.pivotKeys[0]].date;
          colDef.headerName = date;
          colDef.headerClass = 'ag-grid-light-blue-header';
        },
        processSecondaryColGroupDef: colGroupDef => {
          // console.log('process secondeary', colGroupDef);
          const days = this.expiryDateMapping[colGroupDef.headerName].days;
          colGroupDef.headerName = `${colGroupDef.headerName}(${days})`;
          colGroupDef.headerClass = 'ag-grid-dark-blue-header';
        }
      };


    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    if (this.formattedData) {
      this.gridApi.setRowData(this.formattedData);
      this.gridApi.refreshHeader();
    } else {
      this.gridApi.setRowData([]);
    }
    this.gridApi.sizeColumnsToFit();
    this.onAdjustGridSize();
  }

  private onAdjustGridSize() {

    const uniqueDeltaValues =  _.uniqBy(this.formattedData, 'delta');
    const finalheight = uniqueDeltaValues.length * 20 + 30 + 25 + 15;
    this.adjustSize.emit(finalheight);
  }

  private formateData(data) {
    const formattedData = [];

    data.forEach(element => {
      const valueKeys = Object.keys(element).filter(key => this.isNumber(key));
      valueKeys.forEach(key => {
        formattedData.push({
          delta: key,
          value: element[key],
          expiry: element['expiry'],
          expiry_date: element['expiry_date']
        });
      });
    });

    // console.log('formattedData', formattedData);
    return formattedData;
  }

  private isNumber(value) {
    return !isNaN(parseFloat(value)) && !isNaN(value - 0);
  }

  private createExpiryDateMapping(data) {
    const uniqueExpiry = _.uniqBy(data, 'expiry');
    const today = (new Date()).toLocaleDateString();
    uniqueExpiry.forEach(element => {
      this.expiryDateMapping[element['expiry']] = {
        date: element['expiry_date'],
        days: this.countDayDifference(today, element['expiry_date'])
      }
    })
  } 

  private countDayDifference(firstDay, secondDay) {
    const oneDay = 24* 60 * 60 * 1000;
    const firstDate = (new Date(firstDay)).getTime();
    const secondDate = new Date(secondDay).getTime();
    const diff = Math.round(Math.abs((secondDate - firstDate) / oneDay));
    return diff;
  }

  private pivotComparator(a, b) {
    // console.log('comparator', a);
    return this.expiryDateMapping[a].days - this.expiryDateMapping[b].days;
  }

  private columnColorCoding() {
    return this.generateColorCoder('value', this.formattedData, 'redGreenYellow');
  }

  private generateColorCoder(field: string, data: any[], type: string) {
    const [targetMin, targetMax] = this.getMinMax(field, data);
    let targetColorCoder;
    if (type === 'redGreenYellow') {
      targetColorCoder = this.utilityService.redGreenYellowColorCoder(targetMin, targetMax);
    }

    return targetColorCoder;
  }

  private getMinMax(field, data) {
    let valueArray;
    valueArray = data.map(element => Math.abs(element[field]));
    return [Math.min(...valueArray), Math.max(...valueArray)];
  }

}
