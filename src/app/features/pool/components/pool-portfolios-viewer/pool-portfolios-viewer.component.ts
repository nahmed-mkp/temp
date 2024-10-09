import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GridOptions, GridApi, ColumnApi, SortController } from 'ag-grid-community';
import { MatLegacySnackBar as MatSnackBar, MatLegacySnackBarRef as MatSnackBarRef } from '@angular/material/legacy-snack-bar';

import * as fromModels from './../../models';
import { PoolToolbarComponent } from '../pool-toolbar/pool-toolbar.component';
import { AuthService } from 'src/app/services';


@Component({
  selector: 'app-pool-portfolios-viewer',
  templateUrl: './pool-portfolios-viewer.component.html',
  styleUrls: ['./pool-portfolios-viewer.component.scss']
})
export class PoolPortfoliosViewerComponent implements OnInit, OnChanges, OnDestroy {

  @Input() portfolios?: fromModels.Portfolio[];
  @Output() viewPortfolioDetail = new EventEmitter();
  @Output() onSetShortcutPortfolios = new EventEmitter<{cashPortfolio: number; deliverablePortfolio: number; tbaPortfolio: number}>();

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private snackBarRef: MatSnackBarRef<PoolToolbarComponent>;

  // Grid Meta Setup --------------------------------------------------------------------------------

  public customGridOption: GridOptions = {

    // Grid basic setup
    defaultColDef: {
      filter: 'agTextColumnFilter',
      enableValue: true,
      allowedAggFuncs: ['sum', 'min', 'max'],
      enableCellChangeFlash: true,
    },
    columnDefs: [
      {headerName: 'Name', field: 'name', hide: true},
      {headerName: 'sortId', field: 'sortId', sort: 'asc', hide: true}
      // {headerName: 'Owner', field: 'owner'},
      // {headerName: 'Created On', field: 'portfolioDate'},
      // {headerName: 'Type', field: 'portfolioType'},
      // {headerName: 'Visibility', field: 'visibility'},
    ],
    autoGroupColumnDef: {
      headerName: 'Hierarchy',
      cellRendererParams: {
        suppressCount: true,
        innerRenderer: 'iconRender'
      },
      comparator: (valueA, valueB, nodeA, nodeB) => {
        if (nodeA.level === 4) {
          const dateA = (new Date(valueA)).getTime();
          const dateB = (new Date(valueB)).getTime();
          return dateA - dateB;
        } else if (nodeA.level === 3) {
          return parseInt(valueA, 10) - parseInt(valueB, 10);
        } else {
          return 0;
        }
      },
      sort: 'desc'
    },

    // columns functional feature
    enableSorting: true,
    enableFilter: true,
    floatingFilter: true,
    enableColResize: true,

    // rows functional feature
    enableRangeSelection: true,

    // Event handling
    // onGridReady: this.onGridReady.bind(this),
    onRowDoubleClicked: event => {
      if (event.data) {
        this.viewPortfolioDetail.emit(event.data.portfolioId);
      }
    },

    // Tree Structure Setup
    treeData: true,
    getDataPath: data => {
      return data.orgHierarchy;
    },

    // Custom compoent function
    components: {
      iconRender: this.getIconRender()
    },

    // Custom context menu
    getContextMenuItems: params => {
      const expandTree = {
        name: 'Expand All',
        icon: '<i class="material-icons small-menu-icon">unfold_more</i>',
        action: () => params.api.expandAll()
      }
      const collapseTree = {
        name: 'Collapse All',
        icon: '<i class="material-icons small-menu-icon">unfold_less</i>',
        action: () => params.api.collapseAll()
      }
      return ['copy', 'copyWithHeaders', 'paste', 'separator', expandTree, collapseTree,'separator','csvExport', 'excelExport']
    },

    rowClass: 'medium-row',
    rowHeight: 22,
    headerHeight: 0,
    floatingFiltersHeight: 24,

    onFilterModified: params => {
      const filteredModel = params.api.getFilterModel();
      if (filteredModel['ag-Grid-AutoColumn']) {
        const filteredValue = params.api.getFilterModel()['ag-Grid-AutoColumn']['filter'].toLowerCase();
        this.bringFilteredPortfolioInView(filteredValue);
      }
    },
    onFirstDataRendered: params => {
      this.expandLevels();
    }
  }

  public extraOption = {sizeColumnsToFit: true};

  // Initialization -----------------------------------------------------------------------------------

  constructor(private snackBar: MatSnackBar, private authService: AuthService) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
    this.bringFilteredPortfolioInView = this.bringFilteredPortfolioInView.bind(this);
    this.expandLevels = this.expandLevels.bind(this);
  }

  ngOnInit() {
    // setTimeout(() => {
    //   this.snackBarRef = this.snackBar.openFromComponent(PoolToolbarComponent, {
    //     verticalPosition: 'top',
    //     panelClass: 'pool-toolbar'
    //   });
    // }, 0)
    console.log('user', this.authService.getUser());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.portfolios && changes.portfolios.currentValue) {
      this.portfolios = this.portfolios.map(this.makeTreePath);
      if (this.gridApi) {
        this.gridApi.setRowData(this.portfolios);
      }
      const targetPortfolioArraySort = this.portfolios.filter(portfolio => portfolio.portfolioType === 'BATCH' && portfolio.owner === 'mkprisk').sort((a,b) => a.sortId - b.sortId);
      // console.log('mkprisk', targetPortfolioArraySort);
      const cashPortfolio = targetPortfolioArraySort[0];
      const deliverablePortfolio = targetPortfolioArraySort[1];
      const tbaPortfolio = targetPortfolioArraySort[2];
      this.onSetShortcutPortfolios.emit({
        cashPortfolio: cashPortfolio.portfolioId,
        deliverablePortfolio: deliverablePortfolio.portfolioId,
        tbaPortfolio: tbaPortfolio.portfolioId,
      });
    }
  }

  ngOnDestroy() {
    // this.snackBarRef.dismiss();
  }

  customGridCallBack(params) {
    // this will expose the gridApi and the gridColumnApi to the component scope
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    if (this.portfolios) {
      this.gridApi.setRowData(this.portfolios);
    }
    // this.gridApi.sizeColumnsToFit();
  }

  // Utility function ------------------------------------------------------------------------------------

  makeTreePath(portfolio: fromModels.Portfolio) {
    const [month, day, year] = portfolio.portfolioDate.split('/');
    const treePath = [portfolio.visibility, portfolio.portfolioType, portfolio.owner, year, year + '-' + month, portfolio.name ];
    return Object.assign({}, portfolio, {orgHierarchy: treePath});
  }

  getIconRender() {
    class IconRender {
      private eGui;

      init(params) {
        const tempDiv = document.createElement("div");
        const level = params.node.level;
        let icon
        switch (level) {
          case 0:
            if(params.value.toLowerCase()==='public') icon = 'visibility';
            if(params.value.toLowerCase()==='private') icon = 'visibility_off';
            break;
          case 1:
            icon = 'chrome_reader_mode';
            break;
          case 2:
            icon = 'person';
            break;
          case 3:
            icon = 'date_range';
            break;
          case 4:
            icon = 'event';
            break;
          case 5:
            icon = 'assignment';
            break;
          default:
            break;
        }
        tempDiv.innerHTML = `<span class="icon-cell"><i class='material-icons'>${icon}</i><i>${params.value}</i></span>`;
        this.eGui = tempDiv.firstChild;
      }

      getGui() {
        return this.eGui;
      }
    }

    return IconRender;
  }

  bringFilteredPortfolioInView(value) {
    this.gridApi.forEachLeafNode(rowNode => {
      if (rowNode.data.name.toLowerCase().includes(value)) {
        let rowNodeParent = rowNode.parent;
        while (rowNodeParent) {
          rowNodeParent.setExpanded(true);
          rowNodeParent = rowNodeParent.parent;
        }
      }
    });
  }

  expandLevels() {
    this.gridApi.forEachNode(node => {
      if (node.level === 0 || node.level === 1) {
        node.setExpanded(true);
      }
    });
  }
}
