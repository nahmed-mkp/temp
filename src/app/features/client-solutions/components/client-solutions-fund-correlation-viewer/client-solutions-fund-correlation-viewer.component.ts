import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GridOptions, GridApi, ColumnApi, ColDef } from 'ag-grid-community';

import { UtilityService } from 'src/app/services';
import * as fromModels from './../../models';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

@Component({
  selector: 'app-client-solutions-fund-correlation-viewer',
  templateUrl: './client-solutions-fund-correlation-viewer.component.html',
  styleUrls: ['./client-solutions-fund-correlation-viewer.component.scss']
})
export class ClientSolutionsFundCorrelationViewerComponent implements OnInit, OnChanges {

  @Input() data: any[];
  @Input() loading: boolean;
  @Input() benchmarkCodeMap: any;
  @Input() fundEntity: {[id: string]: fromModels.IFund};

  @Input() title: string;

  public extraOption = {sizeColumnsToFit: true};
  public customGridOption: GridOptions;
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private dynamicColDefs: ColDef[];

  constructor(private utilityService: UtilityService) { 
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
    this.customGridOption = this._createGridOption();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0) {
      this.dynamicColDefs = this._createDynamicColumns(this.data);
      if (this.gridApi) {
        this.gridApi.setColumnDefs(this.dynamicColDefs);
      }
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    if (this.dynamicColDefs) {
      this.gridApi.setColumnDefs(this.dynamicColDefs);
    }
  }

  onDownloadData() {
    this.gridApi.exportDataAsCsv({
      fileName: `${this.title} vs Benchmarks (Correlation Matrix)`
    });
  }

   // Utility -----

  private _createGridOption(): GridOptions {
    return {
      defaultColDef: {
        suppressMenu: true,
        valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2),
        cellStyle: params => {
          return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
        },
        cellClass: 'right-border-light',
        headerClass: 'ag-header-wrap'
      },
      columnDefs: [],
      getRowClass: params => {
        if (params.node.rowIndex % 2 === 0) {
          return ['even-row-shaded-effect', 'ultra-small-row'];
        } else {
          return ['ultra-small-row'];
        }
      },

      rowHeight: 18,
      sideBar: false,
      showToolPanel: false,
      headerHeight: 50,

      statusBar: {
        statusPanels: [
          {statusPanel: 'agAggregationComponent'},
          {statusPanel: 'AppGridCustomStatusBarCellValueComponent'},
        ],
      },

      frameworkComponents: {
        'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
      }
    };
  }

  private _createDynamicColumns(data: any): ColDef[] {
    const colDefs: ColDef[] = data.map(element => {
      if (element.code.startsWith('MKP')) {
        return {
          headerName: this.fundEntity && this.fundEntity[element.code]['description'] || element.code,
          headerClass: ['ag-header-wrap', 'yellow-header'],
          field: element.code,
          valueGetter: `data.corr['${element.code}']`,
          cellClass: 'yellow-cell'
        };
      } else {
        return {
          headerName: this.benchmarkCodeMap && this.benchmarkCodeMap[element.code]['description'] || element.code,
          field: element.code,
          valueGetter: `data.corr['${element.code}']`,
          cellClass: (params) => {
            if (params.node.rowIndex === 0) {
              return 'yellow-cell';
            }
          }
        };
      }


    });
    colDefs.unshift({
      headerName: 'Benchmark',
      field: 'code',
      width: 300,
      suppressSizeToFit: true,
      valueFormatter: params => {
        if (params.value.startsWith('MKP')) {
          return this.fundEntity[params.value]['description'] || params.value;
        } else {
          return this.benchmarkCodeMap[params.value]['description'] || params.value;
        }
      },
      cellClass: (params) => {
        if (params.node.rowIndex === 0) {
          return 'yellow-cell';
        }
      }
    });
    return colDefs;
  }

}
