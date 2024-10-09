import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ColDef, GridOptions, GridApi } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

@Component({
  selector: 'app-pnl-attribution-detail-viewer',
  templateUrl: './pnl-attribution-detail-viewer.component.html',
  styleUrls: ['./pnl-attribution-detail-viewer.component.scss']
})
export class PnlAttributionDetailViewerComponent implements OnInit, OnChanges {

  @Input() data: any;
  @Input() loading: boolean;
  @Input() loaded: boolean;

  private formattedData_leaf: any[];
  private formattedData_group: any;
  // private colDefs: ColDef[];

  private gridApi: GridApi;
  public customGridOption: GridOptions;

  constructor(private utilityService: UtilityService) {
    this.customGridCallBack = this.customGridCallBack.bind(this); 
    this._setFirstNodeExpand = this._setFirstNodeExpand.bind(this);
  }

  ngOnInit() {
    this.customGridOption = {
      // Column Def
      defaultColDef: {
        filter: 'agTextColumnFilter',
        suppressMenu: true,
        cellStyle: params => {
          let styleObj: any = {};
          if (typeof params.value === 'number') {
              styleObj = Object.assign(styleObj, {'justify-content': 'flex-end'});
          }
          return styleObj;
        },
        cellClass: 'right-border-light',

        valueGetter: params => {
          const targetField = params.colDef.field;
          if (params.node.group) {
            return this.formattedData_group[targetField];
          } else {
            return params.node.data[targetField];
          }
        },
        valueFormatter: params => {
          return  this.utilityService.formatNumberWithCommasAndDigitAdvance(0, {zeroCutOff: true})(params);
        },
        width: 75,
      },

      autoGroupColumnDef: {
        pinned: 'left',
        cellRendererParams: {
            suppressCount: true
        },
        headerName: 'Group',
        field: 'Date',
        sort: 'desc',
        cellClass: this._getIndentClass,
        comparator: (valueA, valueB, nodeA, nodeB) => {
          if (nodeA.group === false) {
            const dateA = (new Date(valueA)).getTime();
            const dateB = (new Date(valueB)).getTime();
            return dateA - dateB;
          } else {
            return 0
          }
        },
        width: 100,
      },
      columnDefs: [
        {headerName: 'TotalPL', field: 'TotalPL', headerTooltip: 'TotalPL'},
        {headerName: 'PricePL', field: 'PricePL', headerTooltip: 'PricePL'},
        {headerName: 'AccruedInterest', field: 'AccruedInterest', headerTooltip: 'AccruedInterest'},
        {headerName: 'FactorPaydownPL', field: 'FactorPaydownPL', headerTooltip: 'FactorPaydownPL'},
        {headerName: 'CloPayment', field: 'CloPayment', headerTooltip: 'CloPayment'},
        {headerName: 'RepoCharges', field: 'RepoCharges', headerTooltip: 'RepoCharges'},
        {headerName: 'FundAccrualCharges', field: 'FundAccrualCharges', headerTooltip: 'FundAccrualCharges'},
        {headerName: 'RepoFXPL', field: 'RepoFXPL', headerTooltip: 'RepoFXPL'},
        {headerName: 'TicketCharges', field: 'TicketCharges', headerTooltip: 'TicketCharges'},
        {headerName: 'Commission', field: 'Commission', headerTooltip: 'Commission'},
        {headerName: 'MonthEndAdjustment', field: 'MonthEndAdjustment', headerTooltip: 'MonthEndAdjustment'},

        { headerName: 'group', field: 'group', rowGroup: true, hide: true}
      ],

      // Outlook 
      sideBar: false,
      suppressAggFuncInHeader: true,

      rowClass: 'medium-row',
      rowHeight: 22,
      groupHeaderHeight: 24,
      headerHeight: 24,
      floatingFiltersHeight: 28,
      showToolPanel: false,
      excelStyles: [
        {
          id: 'indent-1',
          alignment: { indent: 1 },
          dataType: 'string',
        },
      ],

      // Event 
      onFirstDataRendered: params => {
        this._setFirstNodeExpand();
      },

      // Misc Behavior
      rowSelection: 'single',
      context: this,
      statusBar: {
          statusPanels: [
          {statusPanel: 'agAggregationComponent', statusPanelParams: {aggFuncs: ['sum', 'avg']}},
          {statusPanel: 'AppGridCustomStatusBarCellValueComponent' },
        ]
      },
      getContextMenuItems: params => {

        const customExport = {
            name: 'Excel Export',
            action: () => {
                this.gridApi.exportDataAsExcel({
                    processRowGroupCallback: params => params.node.key,
                });
            }
        }
        // return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', customExport,'separator', customGrouping];
        return ['copy', 'copyWithHeaders', 'separator', customExport];
      },

      // Framework
      frameworkComponents: {
        'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent
      },
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data && changes.data.currentValue) {
      this.formattedData_leaf = this._formatData(changes.data.currentValue, 'leaf');
      this.formattedData_group = this._formatData(changes.data.currentValue, 'group')[0];
      // this.colDefs = this._createColumnDefs(changes.data.currentValue);
      if (this.gridApi) {
        this.gridApi.setRowData(this.formattedData_leaf);
        // this.gridApi.setColumnDefs(this.colDefs);
        setTimeout(() => this._setFirstNodeExpand(), 100)
      }
    } 
  }

  customGridCallBack(params) {
    this.gridApi = params.api;

    if (this.formattedData_leaf) {
      this.gridApi.setRowData(this.formattedData_leaf);
      setTimeout(() => this._setFirstNodeExpand(), 100)
    }

    // if (this.colDefs) {
    //   this.gridApi.setColumnDefs(this.colDefs);
    // }
  }

  // Utitlity --------------------------------------------------
  private _formatData(rawData, type: string) {
    const columnNames = rawData.columns || [];
    const groupName = rawData.total &&  rawData.total[0] && rawData.total[0][0];

    const data = type === 'leaf' ? (rawData.daily || [])  : (rawData.total || []);
    const formattedData = data.map(element => {
      const formattedObj: any = {};
      columnNames.forEach((name, index) => {
        formattedObj[name] = element[index];

        if (type === 'leaf') {
          formattedObj['group'] = groupName
        }
      });
      return formattedObj;
    });
    return formattedData;
  }


  // private _createColumnDefs(rawData): ColDef[] {
  //   const columnNames = rawData.columns || [];
  //   const colDefs: ColDef[] = columnNames.map(name => {
  //     if (name !== 'Date') {
  //       return {
  //         headerName: name,
  //         field: name,
  //         headerTooltip: name,
  //         valueGetter: params => {
  //           const targetField = params.colDef.field;
  //           if (params.node.group) {
  //             return this.formattedData_group[targetField];
  //           } else {
  //             return params.node.data[targetField];
  //           }
  //         },
  //         valueFormatter: params => {
  //           return  this.utilityService.formatNumberWithCommasAndDigitAdvance(0, {zeroCutOff: true})(params);
  //         },
  //         width: 75
  //       };
  //     } else {
  //       return {
  //         headerName: name,
  //         field: name,
  //         hide: true,
  //         width: 75,
  //       };
  //     }
  //   });

  //   colDefs.push({
  //     headerName: 'group',
  //     field: 'group',
  //     rowGroup: true,
  //     hide: true,
  //   })
  //   return colDefs
  // }

  private _getIndentClass(params) {
    let indent = 0;
    let node = params.node;
    while (node && node.parent) {
      indent++;
      node = node.parent;
    }
    return ['indent-' + indent];
  }

  private _setFirstNodeExpand() {
    const firstNode = this.gridApi.getDisplayedRowAtIndex(0);
    if (firstNode) {
      firstNode.setExpanded(true);
    }
  }
}
