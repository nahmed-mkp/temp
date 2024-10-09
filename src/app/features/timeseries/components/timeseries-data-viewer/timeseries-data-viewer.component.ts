import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import moment from 'moment';
import { UtilityService } from 'src/app/services';
import * as fromModels from '../../models';
import * as fromStore from '../../store';


@Component({
  selector: 'app-timeseries-data-viewer',
  templateUrl: './timeseries-data-viewer.component.html',
  styleUrls: ['./timeseries-data-viewer.component.scss']
})
export class TimeseriesDataViewerComponent implements OnChanges {

  @Input() currTab: fromModels.ITab;

  public idEnrichedData; 
  public extraOption = {sizeColumnsToFit: true};

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public customGridOption: GridOptions = {
      defaultColDef: {
          cellClass: 'right-border-light',
          headerClass: 'ag-header-wrap',
          filter: 'agTextColumnFilter',
          editable: false,
          enableCellChangeFlash: false,
          flex: 1
      },
      floatingFilter: true,
      suppressNoRowsOverlay: true,
      columnDefs: [],
      getRowNodeId: data => data.id,
      suppressFieldDotNotation: true,
      getContextMenuItems: params => {

        const csvExport = {
          name: 'CSV Export',
          action: () => {
            params.api.exportDataAsCsv({
              fileName: `${this.currTab.portfolio.name}`,
              processCellCallback: (params) => {
                const colDef = params.column.getColDef()
                if(colDef.field === 'Date'){
                  return moment(params.value).format('MM-DD-YYYY')
                }
                return params.value;
              },
            })
          }
        };

        const excelExport = {
          name: 'Excel Export',
          action: () => {
            params.api.exportDataAsExcel({
              fileName: `${this.currTab.portfolio.name}`,
              processCellCallback: (params) => {
                const colDef = params.column.getColDef()
                if(colDef.field === 'Date'){
                  return moment(params.value).format('MM-DD-YYYY')
                }
                return params.value;
              },
            })
          }
        };
        return ['copy', 'copyWithHeaders', 'separator', csvExport, excelExport];
      },
  };

  constructor(private store: Store<fromStore.State>, private utilities: UtilityService) {
      this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnChanges(changes: SimpleChanges){
   if(changes && changes.currTab && changes.currTab.currentValue){
      this.idEnrichedData = [...this.currTab.chartData]
      this.refreshGrid();
   }
  }

  refreshGrid(){
    if(this.gridApi){
      this.gridApi.setColumnDefs([])
      this.gridApi.setColumnDefs(this.generateColDefs())
      this.gridApi.sizeColumnsToFit();

      this.gridApi.setRowData([])
      this.gridApi.setRowData(this.idEnrichedData)
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.setColumnDefs(this.generateColDefs())

    this.idEnrichedData = [...this.currTab.chartData];

    this.idEnrichedData.map( (item, index) => {
      item.id = index;
    })
    this.gridApi.setRowData(this.idEnrichedData)
  }

  generateColDefs(){
    if(this.idEnrichedData && this.idEnrichedData.length > 0){
        let newColDefs: ColDef[] = []
        let keys = []

        this.currTab.portfolio.timeseries.map( ts => {
          if(ts['alias']){
            keys.push(ts['alias'])
          } else {
            keys.push(ts['label'])
          }
        })
      
      if (this.currTab.portfolio.derivedTimeseries) {
        this.currTab.portfolio.derivedTimeseries.map(ts => {
          if(ts['alias']){
            keys.push(ts['alias'])
          } else {
            keys.push(ts['label'])
          }
        })
      }

        newColDefs.push({
          headerName: 'Date',
          field: 'Date',
          sort: 'dsec',
          valueFormatter: params => params.data['Date'] ? moment(params.data['Date']).format('MM/DD/YYYY') : null
        })

        keys.map( (key, i) => {
            if(key === 'id'){
              null
            } else {
              newColDefs.push({
                headerName: key,
                field: key,
                valueFormatter: params => {
                  if(Number.isNaN(params.value)){
                    return ''
                  }
                  if(typeof(params.value) === 'number'){
                    return params.value.toFixed(2)
                  }
                }
              })
            }
        })

        return newColDefs;
    }
  }

}
