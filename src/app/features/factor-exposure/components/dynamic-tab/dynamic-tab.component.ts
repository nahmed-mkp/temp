import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridOptions, RowNode, ValueGetterParams } from 'ag-grid-community';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';
import * as d3Chromatic from 'd3-scale-chromatic';
import * as _ from 'lodash';
import {
    createDashedBorder,
    getDistinctValues,
    formatNumberWithCommasAndDigitBlankNaNs,
    getNonlinearDataForFirm, 
    getNonlinearDataPathAdvance,
    isRowPinned,
    _normalize_value
  } from './utility';


@Component({
  selector: 'app-factor-exposure-dynamic-tab',
  templateUrl: './dynamic-tab.component.html',
  styleUrls: ['./dynamic-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DynamicTabComponent implements OnChanges {

  @Input() nonlinearData:  {data: any, columns: [], countries: []};
  @Input() nonlinearDataLoaded: boolean;

  @Input() linearData: any;
  @Input() linearDataLoaded: boolean;

  @Input() activeGrouping: string;
  @Input() activeGroupingArray: string[];

  @Input() useUSDFilter: boolean;
  @Input() useBpsToFundFilter: boolean;
  @Input() useBpsToPodFilter: boolean;
  @Input() useNullSecFilter: boolean;

  @Input() privilegedAccess: boolean;
  @Input() groupingNameAndIdMaping: any;

  @Input() userSettings: any;

  public selectedLayoutNonlinearData: any;
  public selectedLayoutLinearData: any;
  public tabSwitchBuffer = false;

  private factorFields = [];
  private factorValues = [];

  private bpsToFundFields = [];
  private bpsToFundValues = [];

  private bpsToPodFields = [];
  private bpsToPodValues = [];

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  private grouping: string[];
  private columns: string[];

  private updateLinearCols = true;
  private updateNonlinearCols = true;
  private updateColoring = true;

  public extraOption = {};
  public customGridOption: GridOptions = {

    defaultColDef: {
      sortable: true
    },

    autoGroupColumnDef: {
      pinned: 'left',
      cellRendererParams: {
        suppressCount: true,
      },
      headerName: 'Group',
      field: 'Position',
      cellRenderer: 'agGroupCellRenderer',
      width: 375,
      sort: 'asc'
    },

    valueCache: true,
    suppressAggFuncInHeader: true,
    getRowNodeId: data => data['Id'],
    rowClass: 'medium-row',
    rowHeight: 16,
    headerHeight: 24,
    deltaRowDataMode: true,
    groupDefaultExpanded: 1,
    suppressColumnVirtualisation: false,

    getContextMenuItems: params => {

      const getNonlinearDataPath = {
          name: 'Get Nonlinear Data Path (Dev)',
          icon: '<i class="material-icons small-menu-icon">construction</i>',
          action: () => {
              const path = getNonlinearDataPathAdvance(params.node);
              const targetColumnIndex = this.columns.indexOf(params.column.getColId());
              setTimeout(() => alert('Nonlinear Data Path is: ' + path + '\n targetColumn Index: ' + targetColumnIndex), 100);
          }
        };

      return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator', getNonlinearDataPath];
    },

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
    context: this,
    frameworkComponents: {
      'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
    },
    columnDefs: []
  };

  customGridCallBack(params: {api: GridApi, columnApi: ColumnApi}) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  constructor() {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.activeGrouping) {
      this.tabSwitchBuffer = true;
      setTimeout( () => this.tabSwitchBuffer = false , 1500);
    }

    // initialize the grid with linear data
    if (changes.linearData && changes.linearData.currentValue && changes.linearData.currentValue.length > 0 && this.gridApi) {

      this.selectedLayoutLinearData = this.linearData.find( item =>item.grouping === this.activeGrouping);

      // map missing fields
      this.selectedLayoutLinearData.data.map(item => {
        item.Fund = item.FundName;
        item.Pod = item.PodName;
        item.Position = item.SecurityName;
        item.CrossPod = item.CrossPodName;
      });
      this.grouping = this.selectedLayoutLinearData.grouping && this.selectedLayoutLinearData.grouping.split('|') || undefined;

      if (this.updateLinearCols) {
        this.updateLinearColumnDef();
        this.updateLinearCols = false;
      }

      if (this.selectedLayoutLinearData.data.length > 0) {
        setTimeout( () => this.refreshValues(), 1000);
        //this.gridApi.setRowData(this.selectedLayoutLinearData.data);

        // apply null sec filter (if needed) when opening a new tab
        if (this.useNullSecFilter) {
          this.editNullSecVisibility(this.useNullSecFilter);
        }

        // collapse and reopen rows to allow value getters to run
        const firstRow = this.gridApi.getDisplayedRowAtIndex(0);
        this.gridApi.collapseAll();
        setTimeout( () => {
          this.gridApi.setRowNodeExpanded(firstRow, true);
        }, 500 );
      }
    }

    // append nonlinear data to the corresponding columns
    if (changes.nonlinearData && changes.nonlinearData.currentValue && this.gridApi) {
      // @ts-ignore
      this.selectedLayoutNonlinearData = this.nonlinearData.find( item =>item.grouping === this.activeGrouping).data;
      this.columns = this.selectedLayoutNonlinearData.columns || [];

      if (this.grouping) {
        if (this.updateNonlinearCols) {
          this.updateNonlinearColumnDef();
          this.updateNonlinearCols = false;
        }
      }

    }

    if ((changes.useUSDFilter || changes.useBpsToFundFilter || changes.useBpsToPodFilter) && this.gridApi) {
      this.editColVisibility();
      if (this.useNullSecFilter) {
        this.editNullSecVisibility(true);
      }
    }

    // collapse and reopen rows to allow null tradeNames to hide
    if ( changes.useNullSecFilter && this.gridApi) {
      this.editNullSecVisibility(this.useNullSecFilter);
      const firstRow = this.gridApi.getDisplayedRowAtIndex(0);
      this.gridApi.collapseAll();
      setTimeout( () => {
        this.gridApi.setRowNodeExpanded(firstRow, true);
      }, 500 );
    }
  }

  // ******* COL DEFS ********* //

  private updateNonlinearColumnDef() {
    const newColDefs = [...this.customGridOption.columnDefs];
    const cols = [...this.selectedLayoutNonlinearData.columns];
    const countries: [] = this.selectedLayoutNonlinearData.countries;

    const groupedCols = [];
    let nonGroupedCols = [];

    // create sub arrs based on countries
    const subArrs = [];
    countries.map(country => {
      subArrs.push({country: `${country}`, items: []});
    });

    // populate subarrs with matching data
    subArrs.map( subArr => {
      const country = subArr.country;
      const items = subArr.items;
      cols.map( (column: string, i) => {
        if (column.includes(country)) {

          this.factorFields.push(column);
          this.bpsToFundFields.push(`${column}-bpsToFund`);
          this.bpsToPodFields.push(`${column}-bpsToPod`);

          const headerName = column.replace(country, '').replace('__x_beta', '');

          items.push({
            headerName: `${headerName} (K)`,
            field: `${column}`,
            width: 85,
            cellStyle: (params) => this.colorCell(params, this.factorValues),
            headerTooltip: `${headerName} ($)`,
            valueFormatter: (params) => {
              if (params.value) {
                return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'thousand');
              } else {
                return '';
              }
            },
            valueGetter:  (params) =>  this.setNonlinearValueGetter(params, '$', column)
          });

          items.push({
            headerName: `${headerName} (bpsToFund)`,
            field: `${column}-bpsToFund`,
            width: 85,
            hide: true,
            cellStyle: (params) => this.colorCell(params, this.bpsToFundValues),
            headerTooltip: `${headerName} (bpsToFund)`,
            valueFormatter: (params) => {
              if (params.value) {
                return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'one');
              } else {
                return '';
              }
            },
            valueGetter:  (params) =>  this.setNonlinearValueGetter(params, 'bpsToFund', column)
          });

          items.push({
            headerName: `${headerName} (bpsToPod)`,
            field: `${column}-bpsToPod`,
            width: 85,
            hide: true,
            cellStyle: (params) => this.colorCell(params, this.bpsToPodValues),
            headerTooltip: `${headerName} (bpsToPod)`,
            valueFormatter: (params) => {
              if (params.value) {
                return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'one');
              } else {
                return '';
              }
            },
            valueGetter:  (params) =>  this.setNonlinearValueGetter(params, 'bpsToPod', column)
          });

          groupedCols.push(column);
        }
      });
    });

    // add grouped cols to colDefs
    subArrs.map( subArr => {
      const country = subArr.country;
      const items = subArr.items;
      const convertedCountryName = this.userSettings.settings.supportedCurrencies[country];
      newColDefs.push({headerName: `${convertedCountryName}`, children: items});
    });

    // get non grouped cols and them to colDefs
    nonGroupedCols = cols.filter(x => !groupedCols.includes(x));
    nonGroupedCols.map(col => {
      if (!col.includes('uid')) {

        const isNonFactor: boolean = (col.includes('Security') || col.includes('Beta') || col.includes('rSquared') || col.includes('RSquared'));

        const headerName = col.replace('_x_beta', '');
        const headerTooltip = isNonFactor ? headerName : headerName + ' ($)';

        const types = isNonFactor ? ['nonlinear'] : ['nonlinear', 'bpsToFund', 'bpsToPod'];

        if (!isNonFactor) {
          this.factorFields.push(col);
        }

        const template = {
          width: 70,
          headerName: headerName,
          cellStyle: isNonFactor ? createDashedBorder() : (params) => this.colorCell(params, this.factorValues),
          headerTooltip: headerTooltip,
          field: col,
          hide: false,
          pinned: isRowPinned(col),
          valueFormatter: (params) => {
            if (params.value) {
              return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'thousand');
            } else {
              return '';
            }
          },
          valueGetter:  (params) => this.setNonlinearValueGetter(params, '$' , col),
          aggFunc: null
        };

        if (col.includes('Beta')) {
          template.headerName = `${headerName} (K)`;
        }

        if (col.includes('rSquaredSquared')) {
          if (this.privilegedAccess) {
            template.headerName = 'Factor R²',
            template.headerTooltip = ' R² from Factors',
            template.valueFormatter = (params) => {
              if (params.value) {
                return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'percent');
              }
            };
          }
        }

        if (col.includes('RSquared')) {
          template.headerName = 'R²',
          template.width = 40,
          template.headerTooltip = 'R² from Directionality',
          template.valueFormatter = (params) => {
            if (params.value) {
              return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'percent');
            }
          };
        }

        if (col.includes('ERI')) {
          template.headerName = `${headerName} (K)`,
          template.width = 60,
          template.headerTooltip = 'EM Risk Index ($)';
        }

        if (col.includes('GRI')) {
          template.headerName = `${headerName} (K)`,
          template.width = 60,
          template.headerTooltip = `${headerName} ($)`;
        }

        newColDefs.push(template)

        // create bps colDefs for applicable cols
        if (types.includes('bpsToFund')) {
          const bpsToFundTemplate = {...template};
          bpsToFundTemplate.hide = true;
          bpsToFundTemplate.field = `${col}-bpsToFund`;
          bpsToFundTemplate.headerName = bpsToFundTemplate.headerName.replace('(K)', '') + ' (bpsToFund)';
          bpsToFundTemplate.headerTooltip = bpsToFundTemplate.headerTooltip + '(bpsToFund)';
          bpsToFundTemplate.cellStyle = (params) => this.colorCell(params, this.bpsToFundValues);
          bpsToFundTemplate.valueGetter = (params) => this.setNonlinearValueGetter(params, 'bpsToFund' , template.field);
          bpsToFundTemplate.valueFormatter = (params) => {
            if (params.value) {
              return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'tens');
            } else {
              return '';
            }
          };
          newColDefs.push(bpsToFundTemplate);
        }

        if (types.includes('bpsToPod')) {
          const bpsToPodTemplate = {...template};
          bpsToPodTemplate.hide = true;
          bpsToPodTemplate.field = `${col}-bpsToPod`;
          bpsToPodTemplate.headerName = bpsToPodTemplate.headerName.replace('(K)', '')  + ' (bpsToPod)';
          bpsToPodTemplate.headerTooltip = bpsToPodTemplate.headerTooltip + '(bpsToPod)';
          bpsToPodTemplate.cellStyle = (params) => this.colorCell(params, this.bpsToPodValues);
          bpsToPodTemplate.valueGetter = (params) => this.setNonlinearValueGetter(params, 'bpsToPod' , template.field);
          bpsToPodTemplate.valueFormatter = (params) => {
            if (params.value) {
              return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'tens');
            } else {
              return '';
            }
          };
          newColDefs.push(bpsToPodTemplate);
        }

      }
    });

    if (this.gridApi) {
      const linearCols = [];
      let nonlinearCols = [];

      newColDefs.map(item => {
        // @ts-ignore (move nonlinear cols to the front of the colDef)
        if (this.selectedLayoutNonlinearData.columns.includes(item.field) || (item.children)) {
          nonlinearCols.push(item);
        } else {
          if (item.headerName.includes('ERI') || item.headerName.includes('GRI')) {
            linearCols.unshift(item);
          } else {
            linearCols.push(item);
          }
        }
      });
     
      let forceGroupedCols = nonlinearCols.filter(  col => {
        return ['Security', 'Beta', 'rSquaredSquared', 'RSquared'].includes(col.field)
      })


      nonlinearCols = nonlinearCols.filter( col => {
        return !['Security', 'Beta', 'rSquaredSquared', 'RSquared'].includes(col.field)
      })


      nonlinearCols.push({
        headerName:'',
        children: forceGroupedCols
      })

      const output = nonlinearCols.concat(linearCols);
      this.customGridOption.columnDefs = output;
      this.editColVisibility();
    }
  }

  private updateLinearColumnDef() {

    const valueFormatter = (params) => {
      if (params.value) {
        return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'thousand');
      }
    };

    const colDefs = [...this.customGridOption.columnDefs];

    colDefs.push({
      headerName: 'Fund Capital (K)',
      field: 'FundCapital',
      cellStyle: createDashedBorder(),
      width: 105,
      hide: true,
      // pinned: 'left',
      valueGetter: params => this.setLinearValueGetter(params,  '$' , 'FundCapital'),
      valueFormatter: valueFormatter
    });

    colDefs.push({
      headerName: 'Fund Levered Capital (K)',
      field: 'FundLeveredCapital',
      cellStyle: createDashedBorder(),
      width: 150,
      // pinned: 'left',
      hide: true,
      valueGetter: params => this.setLinearValueGetter(params, '$', 'FundLeveredCapital'),
       valueFormatter: valueFormatter
    });

    colDefs.push({
      headerName: 'Pod Capital (K)',
      field: 'PodCapital',
      cellStyle: createDashedBorder(),
      width: 100,
      // pinned: 'left',
      hide: true,
      valueGetter: params => this.setLinearValueGetter(params, '$', 'PodCapital'),
      valueFormatter: valueFormatter
    });

    colDefs.push({
      headerName: 'Pod Levered Capital (K)',
      field: 'PodLeveredCapital',
      cellStyle: createDashedBorder(),
      hide: true,
      width: 145,
      // pinned: 'left',
      valueGetter: params => this.podLeveredCapitalGetter(params.node),
      valueFormatter: valueFormatter
    });

    colDefs.push({
      headerName: 'Capital (K)',
      field: 'PodLeveredCapital',
      cellStyle: createDashedBorder(),
      hide: true,
      width: 145,
      // pinned: 'left',
      valueGetter: params => this.capitalGetter(params),
      valueFormatter: valueFormatter
    });

    colDefs.push({
      headerName: 'Qty (K)',
      field: 'Qty',
      cellStyle: createDashedBorder(),
      width: 80,
      hide: true,
      aggFunc: 'sum',
      valueGetter: params => this.setLinearValueGetter(params, '$', 'Qty'),
      valueFormatter: valueFormatter
    });

    colDefs.push({
      headerName: 'MV USD',
      field: 'mvUSD',
      hide: true,
      cellStyle: createDashedBorder(),
      width: 70,
      valueGetter: params => this.setLinearValueGetter(params, '$', 'mvUSD'),
      valueFormatter: valueFormatter
    });

    colDefs.push({
      headerName: 'Notional (K)',
      field: 'notional',
      cellStyle: createDashedBorder(),
      width: 85,
      aggFunc: 'sum',
      hide: true,
      valueGetter: params => this.setLinearValueGetter(params, '$', 'notional'),
      valueFormatter: valueFormatter
    });

    colDefs.push({
      headerName: 'Cmdty + 1%',
      headerTooltip: 'Cmdty + 1% ($)',
      cellStyle: createDashedBorder(),
      field: 'CmdtyPlus1Pct',
      width: 100,
      valueGetter: (params) => this.setLinearValueGetter(params, '$', 'CmdtyPlus1Pct'),
      valueFormatter: (params) => {
        if (params.value) {
          return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'one');
        } else {
          return '';
        }
      }
    });

    colDefs.push({
      headerName: 'Cmdty + 1% (bpsToFund)',
      headerTooltip: 'Cmdty + 1% (bpsToFund)',
      cellStyle: createDashedBorder(),
      field: 'CmdtyPlus1Pct',
      width: 100,
      hide: true,
      valueGetter: (params) => this.setLinearValueGetter(params, 'bpsToFund', 'CmdtyPlus1Pct'),
      valueFormatter: (params) => {
        if (params.value) {
          return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'one');
        } else {
          return '';
        }
      },
    });

    colDefs.push({
      headerName: 'Cmdty + 1% (bpsToPod)',
      headerTooltip: 'Cmdty + 1% (bpsToPod)',
      cellStyle: createDashedBorder(),
      field: 'CmdtyPlus1Pct',
      width: 100,
      hide: true,
      valueGetter: (params) => this.setLinearValueGetter(params, 'bpsToPod', 'CmdtyPlus1Pct'),
      valueFormatter: (params) => {
        if (params.value) {
          return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'one');
        } else {
          return '';
        }
      },
    });

    colDefs.push({
      headerName: 'Equity + 1%',
      headerTooltip: 'Equity + 1% ($)',
      cellStyle: createDashedBorder(),
      field: 'EquityPlus1Pct',
      width: 100,
      valueGetter: (params) => this.setLinearValueGetter(params, '$', 'EquityPlus1Pct'),
      valueFormatter: (params) => {
        if (params.value) {
          return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'one');
        } else {
          return '';
        }
      }
    });

    colDefs.push({
      headerName: 'Equity + 1% (bpsToFund)',
      headerTooltip: 'Equity + 1%  (bpsToFund)',
      cellStyle: createDashedBorder(),
      field: 'EquityPlus1Pct',
      width: 100,
      hide: true,
      valueGetter: (params) => this.setLinearValueGetter(params, 'bpsToFund', 'EquityPlus1Pct'),
      valueFormatter: (params) => {
        if (params.value) {
          return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'one');
        } else {
          return '';
        }
      },
    });

    colDefs.push({
      headerName: 'Equity + 1% (bpsToPod)',
      headerTooltip: 'Equity + 1% (bpsToPod)',
      cellStyle: createDashedBorder(),
      field: 'EquityPlus1Pct',
      width: 100,
      hide: true,
      valueGetter: (params) => this.setLinearValueGetter(params, 'bpsToPod', 'EquityPlus1Pct'),
      valueFormatter: (params) => {
        if (params.value) {
          return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'one');
        } else {
          return '';
        }
      },
    });

    colDefs.push({
      headerName: 'Rate + 1bp',
      headerTooltip: 'Rate + 1bp ($)',
      cellStyle: createDashedBorder(),
      field: 'RatePlus1bp',
      width: 100,
      valueGetter: (params) => this.setLinearValueGetter(params, '$', 'RatePlus1bp'),
      valueFormatter: (params) => {
        if (params.value) {
          return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'one');
        } else {
          return '';
        }
      }
    });

    colDefs.push({
      headerName: 'Rate + 1bp (bpsToFund)',
      headerTooltip: 'Rate + 1bp (bpsToFund)',
      cellStyle: createDashedBorder(),
      field: 'RatePlus1bp',
      width: 100,
      hide: true,
      valueGetter: (params) => this.setLinearValueGetter(params, 'bpsToFund', 'RatePlus1bp'),
      valueFormatter: (params) => {
        if (params.value) {
          return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'one');
        } else {
          return '';
        }
      },
    });

    colDefs.push({
      headerName: 'Rate + 1bp (bpsToPod)',
      headerTooltip: 'Rate + 1bp (bpsToPod)',
      cellStyle: createDashedBorder(),
      field: 'RatePlus1bp',
      width: 100,
      hide: true,
      valueGetter: (params) => this.setLinearValueGetter(params, 'bpsToPod', 'RatePlus1bp'),
      valueFormatter: (params) => {
        if (params.value) {
          return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'one');
        } else {
          return '';
        }
      },
    });

    colDefs.push({
      headerName: 'USD - 1%',
      headerTooltip: 'USD - 1% ($)',
      cellStyle: createDashedBorder(),
      field: 'USDMinus1Pct',
      width: 100,
      valueGetter: (params) => this.setLinearValueGetter(params, '$', 'USDMinus1Pct'),
      valueFormatter: (params) => {
        if (params.value) {
          return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'one');
        } else {
          return '';
        }
      }
    });

    colDefs.push({
      headerName: 'USD - 1% (bpsToFund)',
      headerTooltip: 'USD - 1% (bpsToFund)',
      cellStyle: createDashedBorder(),
      field: 'USDMinus1Pct',
      hide: true,
      width: 100,
      valueGetter: (params) => this.setLinearValueGetter(params, 'bpsToFund', 'USDMinus1Pct'),
      valueFormatter: (params) => {
        if (params.value) {
          return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'one');
        } else {
          return '';
        }
      },
    });

    colDefs.push({
      headerName: 'USD - 1% (bpsToPod)',
      headerTooltip: 'USD - 1% (bpsToPod)',
      cellStyle: createDashedBorder(),
      field: 'USDMinus1Pct',
      hide: true,
      width: 100,
      valueGetter: (params) => this.setLinearValueGetter(params, 'bpsToPod', 'USDMinus1Pct'),
      valueFormatter: (params) => {
        if (params.value) {
          return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'one');
        } else {
          return '';
        }
      },
    });

    colDefs.push({
      headerName: 'Firm',
      field: 'Firm',
      rowGroup: true,
      rowGroupIndex: 0,
      hide: true,
    });

    this.grouping.forEach((name, index) => {
        let colDef: ColDef;
        if (name !== 'Position') {
            colDef = {
                headerName: name,
                field: name,
                rowGroup: true,
                rowGroupIndex: index + 1,
                hide: true
            };
        } else {
            colDef = {
                headerName: name,
                field: name,
                hide: true,
            };
        }
        colDefs.unshift(colDef);
    });

    if (this.gridApi) {
      this.customGridOption.columnDefs = colDefs;
      this.editColVisibility();
    }
  }

  // ******* VALUE GETTERS ********* //

  nonLinearValueGetter(params: ValueGetterParams, column: string) {
    let nonlinearData;
    if (params.node.group === false) {
      nonlinearData =
        this.groupingNameAndIdMaping &&
        this.nonlinearDataLoader(
          params,
          params.node.data[params.colDef.field]
        );
    } else {
      nonlinearData =
        this.groupingNameAndIdMaping &&
        this.nonlinearDataLoader(params, column);
    }
    if (
      nonlinearData === null ||
      nonlinearData === undefined ||
      nonlinearData === ''
    ) {
      nonlinearData = '';
    }

    return nonlinearData;
  }

  linearValueGetter(params: ValueGetterParams, column: string) {
    if (params.node.group === true) {
      return getDistinctValues(
        params.node.allLeafChildren.map(
          (node) => node.data[column]
        )
      );
    } else {
      return params.node.data[column];
    }
  }

  podLeveredCapitalGetter(node: RowNode) {
    if ( this.checkPodOrCrossPodNotPresentInBetweenCrossFundGroupingPath(node)) {
      return null;
    }
    if (node.group === true) {
      return getDistinctValues(
        node.allLeafChildren.map(
          (node) => node.data['PodLeveredCapital']
        )
      );
    } else {
      return node.data['PodLeveredCapital'];
    }
  }

  capitalGetter(params: ValueGetterParams) {

    const targetColumn = 'FundCapital';
    const mergeColumn = 'PodLeveredCapital';

    if (params.node.level === 0 && params.node.group === false) {
      // no grouping, every is flat;
      return params.node.data[targetColumn];
    } else if (
      params.node.level === 0
    ) {
      // at the root level and it is firm
      return getDistinctValues(
        params.node.allLeafChildren.map(
          (node) => node.data[targetColumn]
        )
      );
    } else {
      if (
        this.activeGroupingArray.includes('Fund') === false &&
        this.activeGroupingArray.includes('Pod') === false &&
        this.activeGroupingArray.includes('CrossFund') === false &&
        this.activeGroupingArray.includes('CrossPod') === false
      ) {
        return params.api.getValue(
          'FundCapital',
          params.node.parent
        );
      } else {
        const fundNameGroupLevelIndex =
        this.activeGroupingArray.indexOf('Fund');
        const podNameGroupLevelIndex =
        this.activeGroupingArray.indexOf('Pod');
        const CrossFundGroupLevelIndex =
        this.activeGroupingArray.indexOf('CrossFund');
        const CrossPodNameGroupLevelIndex =
        this.activeGroupingArray.indexOf('CrossPod') ;
        const currentLevel = params.node.level;

        if (
          currentLevel === fundNameGroupLevelIndex &&
          (fundNameGroupLevelIndex < podNameGroupLevelIndex ||
            podNameGroupLevelIndex === -1)
        ) {
          return getDistinctValues(
            params.node.allLeafChildren.map(
              (node) => node.data[targetColumn]
            )
          );
        } else if (currentLevel === podNameGroupLevelIndex) {
          return getDistinctValues(
            params.node.allLeafChildren.map(
              (node) => node.data[mergeColumn]
            )
          );
        } else if (
          currentLevel === CrossFundGroupLevelIndex &&
          (CrossFundGroupLevelIndex < CrossPodNameGroupLevelIndex ||
            CrossPodNameGroupLevelIndex === -1)
        ) {
          return getDistinctValues(
            params.node.allLeafChildren.map(
              (node) => node.data[targetColumn]
            )
          );
        } else if (currentLevel === CrossPodNameGroupLevelIndex) {
          return getDistinctValues(
            params.node.allLeafChildren.map(
              (node) => node.data[mergeColumn]
            )
          );
        } else if (
          (podNameGroupLevelIndex !== -1 &&
            currentLevel > podNameGroupLevelIndex) ||
          (CrossPodNameGroupLevelIndex !== -1 &&
            currentLevel > CrossPodNameGroupLevelIndex)
        ) {

          if (
            params.node.group === true &&
            (currentLevel === fundNameGroupLevelIndex ||
              currentLevel === CrossFundGroupLevelIndex)
          ) {
            return getDistinctValues(
              params.node.allLeafChildren.map(
                (node) => node.data[mergeColumn]
              )
            );
          } else {
            return params.api.getValue(
              'PodLeveredCapital',
              params.node.parent
            );
          }
        } else {
         return params.api.getValue(
            'FundCapital',
            params.node.parent
          );
        }
      }
    }
  }

  bpsToFundGetter(params: ValueGetterParams, originalVal: any) {

    const useFundLeveredCapital: boolean = this.useFundLeveredCapital(params.node);
    const fundLeveredValue = params.getValue('FundLeveredCapital');

    const fundValue = params.getValue('FundCapital');
    const targetValue = originalVal;

    if (useFundLeveredCapital) {
      // return 'FundLevCap'
      this.bpsToFundValues.push(((targetValue / fundLeveredValue) * 10000));
      return ((targetValue / fundLeveredValue) * 10000);
    }

    if ((targetValue && fundValue) && targetValue !== 0 && fundValue !== 0) {
      this.bpsToFundValues.push(((targetValue / fundValue) * 10000));
      //  return 'FundCap'
      this.bpsToFundValues.push(((targetValue / fundValue) * 10000));
      return ((targetValue / fundValue) * 10000);
    } else {
      return null;
    }
  }

  bpsToPodGetter(params: ValueGetterParams, originalValue: any) {

    const useFundLeveredCapital: boolean = this.useFundLeveredCapital(params.node);
    const targetPodLevel = this.activeGroupingArray.indexOf('Pod');
    const targetCrossPodLevel = this.activeGroupingArray.indexOf('CrossPod');
    const myCurrentGroupingLevel = params.node.level;

    let targetPodValue;

    // check for special case (where there is no crossPod/pod in between crossfund and its ancestor)
    if (this.checkPodOrCrossPodNotPresentInBetweenCrossFundGroupingPath(params.node)) {
      targetPodValue = params.getValue('FundLeveredCapital'); 
    }

    if (targetPodLevel === -1 && targetCrossPodLevel === -1) {
      // Use fund capital if podName and crossPodName are not in the grouping
      targetPodValue = params.getValue('FundCapital');
    } else {
      const podLevelCollection = [
        targetPodLevel,
        targetCrossPodLevel,
      ].filter((num) => num !== -1);
      const podTrigger = Math.min(...podLevelCollection);
      if (myCurrentGroupingLevel >= podTrigger) {
        // if pod or crossPod is an ancestor of current level ... or is current level
        targetPodValue = params.getValue('PodLeveredCapital'); // use the level pod Value
      } else {
        // if the current grouping level is smaller than the pod level
        targetPodValue = params.getValue('FundLeveredCapital'); // use the level pod Value
      }
    }

    if (
      originalValue !== undefined &&
      targetPodValue !== undefined &&
      targetPodValue !== 0 &&
      originalValue !== 0
    ) {
      this.bpsToPodValues.push(((originalValue / targetPodValue) * 10000));
      return ((originalValue / targetPodValue) * 10000);
    } else {
      return null;
    }
  }

  setNonlinearValueGetter(params: ValueGetterParams, displayMode: string, column: string) {

    if (displayMode === '$') {
      this.factorValues.push(this.nonLinearValueGetter(params, column));
      return this.nonLinearValueGetter(params, column);
    }

    if (displayMode === 'bpsToFund') {
      const originalVal = this.nonLinearValueGetter(params, column);
      return this.bpsToFundGetter(params, originalVal);
    }

    if (displayMode === 'bpsToPod') {
      const originalVal = this.nonLinearValueGetter(params, column);
      return this.bpsToPodGetter(params, originalVal);
    }

  }

  setLinearValueGetter(params: ValueGetterParams, displayMode: string, column: string) {

    if (displayMode === '$') {
      return this.linearValueGetter(params, column);
    }

    if (displayMode === 'bpsToFund') {
      const originalValue = this.linearValueGetter(params, column);
      return this.bpsToFundGetter(params, originalValue);
    }

  if (displayMode === 'bpsToPod') {
      const originalValue = this.linearValueGetter(params, column);
      return this.bpsToPodGetter(params, originalValue);
    }
  }

  // ******* NON-LINEAR UTILITY ********* //

  public searchForNonlinearData(dataPath, targetColumn) {
    const targetIndex = this.columns.indexOf(targetColumn);
    const targetLevelData = dataPath.reduce((tree, path, currentIndex) => {
      const adjusted_path = path.replaceAll('_', '|');
      if (tree) {
          if (currentIndex === 0) {
              return tree[1].branches[path];
          } else if (tree.branches) {
              return tree.branches[adjusted_path];
          } else if (tree.leaves) {
              return tree.leaves[adjusted_path];
          } else {
              return (tree);
          }
      }
    }, this.selectedLayoutNonlinearData.data);

    // Only copy values if current depth matches tree depth 
    if (targetLevelData !== undefined && dataPath.length === targetLevelData.level) {
        const finalResult = targetLevelData.data ?  targetLevelData.data[targetIndex] : 0;
        return finalResult;
    } else {
        return undefined;
    }
  }

  public nonlinearDataLoader(params: ValueGetterParams, field?: string) {
    const targetField = params.colDef.field;
    let nonLinearData = '';

    if (params.node.field === 'Firm' && params.node.level === 0) {
      return getNonlinearDataForFirm(
        targetField,
        this.selectedLayoutNonlinearData
      );
    } else {
      const formatTreePath = getNonlinearDataPathAdvance(params.node);
      // bpsToFund or bpsToPod cannot use targetField, so this solves that bug
      if(targetField.includes('bpsToFund') || targetField.includes('bpsToPod')){
        nonLinearData = formatTreePath ? this.searchForNonlinearData(formatTreePath, field) : '';
      } else {
        nonLinearData = formatTreePath ? this.searchForNonlinearData(formatTreePath, targetField) : '';
      }
      return nonLinearData;
    }
  }

  // ******* UTILITY ********* //

  public checkPodOrCrossPodNotPresentInBetweenCrossFundGroupingPath(node: RowNode) {
    const currentLevel = node.level;
    const podNameLevel = this.grouping.indexOf('podName');
    const crossPodNameLevel = this.grouping.indexOf('CrossPodName');
    const crossFundLevel = this.grouping.indexOf('CrossFund');

    if (crossFundLevel === -1) {
      return false;
    }

    if (podNameLevel === -1 && crossPodNameLevel === -1) {
      if (currentLevel <= crossFundLevel) {
        return true;
      }
    } else {
      if (crossPodNameLevel !== -1) {
        if (
          crossPodNameLevel > crossFundLevel &&
          currentLevel <= crossFundLevel
        ) {
          return true;
        } else if (crossPodNameLevel < crossFundLevel) {
          return false;
        }
      }

      if (podNameLevel !== -1) {
        if (podNameLevel > crossFundLevel && currentLevel <= crossFundLevel) {
          return true;
        } else if (podNameLevel < crossFundLevel) {
          return false;
        }
      }
    }
  }

  public useFundLeveredCapital(node: RowNode) {
    const currentLevel = node.level;
    const fundLevel = this.grouping.indexOf('Fund');
    const crossFundLevel = this.grouping.indexOf('CrossFund');

    const relevantLevels = [node.level];

    if (fundLevel > -1) {
      relevantLevels.push(fundLevel);
    }

    // if Fund is not an ancestors of the current grouping level
    if (Math.min(...relevantLevels) === currentLevel ) {
      // if current level is one of the four named categories
      if (relevantLevels.filter(x => x === currentLevel).length > 1) {
        // if currentLevel is crossFund
        return currentLevel === crossFundLevel ? true :  false;
      }
      return true;
    }
  }

  public editColVisibility = () => {

    const showVal: boolean = this.useUSDFilter;
    const showFund: boolean = this.useBpsToFundFilter;
    const showPod: boolean = this.useBpsToPodFilter;

    this.customGridOption.columnDefs.map( (col: any) => {
      if (col.children) {
        col.children.map( childCol => {
          if (childCol.headerTooltip && childCol.headerTooltip.includes('$')) {
            childCol.hide = showVal ? false : true;
          }

          if (childCol.headerName.includes('bpsToFund')) {
            childCol.hide = showFund ? false : true;
          }

          if (childCol.headerName.includes('bpsToPod')) {
            childCol.hide = showPod ? false : true;
          }
        });
      } else {
        if (col.headerTooltip && col.headerTooltip.includes('$')) {
          col.hide = showVal ? false : true;
        }

        if (col.headerName.includes('bpsToFund')) {
          col.hide = showFund ? false : true;
        }

        if (col.headerName.includes('bpsToPod')) {
          col.hide = showPod ? false : true;
        }
      }
    });

    this.gridApi.setColumnDefs([]);
    this.gridApi.setColumnDefs(this.customGridOption.columnDefs);

  }

  public editNullSecVisibility = (applyFilter: boolean) => {
    this.gridApi.forEachNode( node => {

        // hide macroTheme rows where all tradeName children contain no sec data
        if (node.field === 'MacroTheme') {
          const children = node.childrenAfterGroup;
          const filteredArr = children.filter( (node: RowNode) => this.gridApi.getValue('Security', node) === '' );
          if (filteredArr.length === children.length) {
            node.rowHeight = applyFilter ? 0 : 16;
          }
        }

        // hide tradeName rows where no sec data is present
        if (node.field === 'TradeName') {
          if (this.gridApi.getValue('Security', node) === '') {
            node.rowHeight = applyFilter ? 0 : 16;
          }
        }

    });
  }

  colorCell(params: any, relativeArr: any) {
    const value = _normalize_value(params.value, relativeArr);
    if (params.value < 0) {
      let color = d3Chromatic.interpolateOranges(value);
      color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
      return { 'background-color': color, 'border-left': '0.2px dotted #d7d7d7;', 'justify-content': 'flex-end' };
    } else if (params.value > 0) {
      let color = d3Chromatic.interpolateBlues(value);
      color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
      return { 'background-color': color, 'border-left': '0.2px dotted #d7d7d7;' , 'justify-content': 'flex-end'};
    } else {
      return createDashedBorder();
    }
  }

  refreshValues(){
    this.gridApi.refreshCells();
    this.gridApi.setRowData([])
    this.gridApi.setRowData(this.selectedLayoutLinearData.data)
  }

}
