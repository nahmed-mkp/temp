import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';
import { UtilityService } from 'src/app/services';

@Component({
  selector: 'app-factors-tab',
  templateUrl: './factors-tab.component.html',
  styleUrls: ['./factors-tab.component.scss']
})
export class FactorsTabComponent implements OnInit, OnChanges {

  @Input() gridData;
  @Input() dataLoaded;
 
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private updateCols: boolean = true;
  public extraOption = {sizeColumnsToFit: true};
  
  public customGridOption: GridOptions = {
    groupDefaultExpanded: 1,
    rowHeight: 16,
    statusBar: {
      statusPanels: [
          {
              statusPanel: 'agAggregationComponent',
              statusPanelParams: {
                  aggFuncs: ['sum']
              }
          },
          {
              statusPanel: 'AppGridCustomStatusBarCellValueComponent',
              statusPanelParams: {
                  fractionDigits: 3
              }
          },
      ],
    },
    frameworkComponents: {
      'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent
    },
    columnDefs: []
  }

  customGridCallBack(params: {api: GridApi, columnApi: ColumnApi}) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  constructor(private utilityService: UtilityService) { 
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {}
  
  ngOnChanges(changes: { gridData: SimpleChange }){
    if (changes && changes.gridData && changes.gridData.currentValue && changes.gridData.currentValue.data) {
      if(this.updateCols){
        this.generateCols();
        this.updateCols = false;
      }
    }
  }

  private generateCols() {
    let newColDefs = [...this.customGridOption.columnDefs];

    const cols = Object.keys(this.gridData.data[0]);
    const countries: [] = this.gridData.countries;

    let groupedCols = []
    let nonGroupedCols = [];

    // create sub arrs based on countries 
    let subArrs = [];
    countries.map(country => {
      subArrs.push({country: `${country}`, items: []})
    })

    // populate subarrs with matching data
    subArrs.map( subArr => {
      const country = subArr.country;
      const items = subArr.items;
      cols.map( (column: string, i) => {
        if(column.includes(country)){
          let headerName = column.replace(country, "").replace("_", "")
          items.push({headerName: `${headerName}`, field: `${column}`, headerTooltip: `${headerName}`, cellStyle: this.createDashedBorder(), valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(3)})
          groupedCols.push(column)
        }
      })
    })

    // get non grouped cols and them to colDefs
    nonGroupedCols = cols.filter(x => !groupedCols.includes(x));
    nonGroupedCols.map(col => {
      if(!col.includes('uid')){

        let addRow: boolean = true;

        if(col.includes('Security')){
          newColDefs.push({
            headerName: `${col}`, 
            pinned: 'left',
            cellStyle: this.adjustFontSize(),
            headerTooltip: `${col}`,
            field: `${col}`, 
          })
          addRow = false;
        }

        if(col.includes('rsquare')){
          newColDefs.push({
            headerName: 'R²', 
            field: `${col}`, 
            headerTooltip: 'R²',
            cellStyle: this.createDashedBorder(),              
            valueFormatter: (params) =>  {
              let val = params.value * 100;
              let formattedVal = val.toLocaleString('en-US', { maximumFractionDigits: 0, minimumFractionDigits: 0 });
              return `${formattedVal}%`;
            }
          })
          addRow = false;
        } 
        
        if(addRow){
          newColDefs.push({
            headerName: `${col}`, 
            headerTooltip: `${col}`,
            field: `${col}`, 
            cellStyle: this.createDashedBorder(), 
            valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(3)
          })
        }
      }
    })

    // add grouped cols to colDefs
    subArrs.map( subArr => {
      const country = subArr.country;
      const items = subArr.items;
      newColDefs.push({headerName: `${country}`, children: items})
    })

    if (this.gridApi) {
      this.customGridOption.columnDefs = newColDefs;
      this.gridApi.setColumnDefs(newColDefs);
    }
  }

  createDashedBorder(){
    return {'border-left': '0.2px dotted #d7d7d7;' , 'justify-content': 'flex-end', 'font-size': '11px'};
  }

  adjustFontSize(){
    return {'font-size': '11px'};
  }
}


