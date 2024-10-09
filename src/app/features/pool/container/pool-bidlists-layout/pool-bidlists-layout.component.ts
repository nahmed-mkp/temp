import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, Subject } from 'rxjs';

import * as fromModels from './../../models';
import * as fromStore from './../../store';
import { GridOptions, ColDef } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';


@Component({
  selector: 'app-pool-bidlists-layout',
  templateUrl: './pool-bidlists-layout.component.html',
  styleUrls: ['./pool-bidlists-layout.component.scss']
})
export class PoolBidlistsLayoutComponent implements OnInit, OnDestroy {

  @Input() activePortfolioIds: string[];

  public firstPanelData$: Observable<any>;
  public firstPanelLoading$: Observable<boolean>;

  public secondPanelData$: Observable<any>;
  public secondPanelLoading$: Observable<boolean>;

  public fourthPanelData$: Observable<any>;
  public fourthPanelLoading$: Observable<boolean>;

  public thirdPanelData$: Observable<any>;
  public thirdPanelDataOriginData: any[];
  public thirdPanelDataFilterdData$ = new Subject<any[]>();;
  public thirdPanelLoading$: Observable<boolean>;

  private subscription: Subscription;
  private lookupsSubscription: Subscription;
  private timer;

  private filterResetFuns: any[] = [];

  private filter: {
    key: string;
    values: string[];
  } = {
    key: undefined,
    values: undefined,
  }

  public firstPanel_GridOptions: GridOptions = {
    columnDefs: [
      {headerName: 'AsOfDate', field: 'AsOfDate'},
      {headerName: 'Dealer', field: 'Dealer'},
      {headerName: 'NumOffers', field: 'NumOffers'},
      {headerName: 'OrigFace', field: 'OrigFace', valueGetter: this.utilityService.formatNumber(2), valueFormatter: this.utilityService.formatNumberWithCommas},
      {headerName: 'CurrFace', field: 'CurrFace',  valueGetter: this.utilityService.formatNumber(2), valueFormatter: this.utilityService.formatNumberWithCommas},
      {headerName: 'Description', field: 'Description'},
      {headerName: 'LastUpdated', field: 'LastUpdated', valueFormatter: this.utilityService.formatTimestamp('ETA'), cellStyle: {'justify-content': 'flex-start'}},
      {headerName: 'BidListPortfolio', field: 'BidListPortfolio'},
    ],
    onRowClicked: params => {
      params.context.filter.key = 'BidListPortfolio';
      params.context.filter.values = params.api.getSelectedRows().map(row => row['BidListPortfolio']);
      if (params.context.filter.values.includes('ALL') || params.context.filter.values.length === 0) {
        params.context.thirdPanelDataFilterdData$.next(this.thirdPanelDataOriginData);
      } else {
        // params.context.filter.value = params.data['BidListPortfolio'];
        const filterData = params.context.activateFiltering();
        params.context.thirdPanelDataFilterdData$.next(filterData);
      }

    },
    context: this,
    rowSelection: 'multiple',
    rowMultiSelectWithClick: true,
    deltaRowDataMode: true,
    getRowNodeId: params => {
      return params['Dealer']
    }
  }

  // public secondPanel_GridOptions: GridOptions = {
  //   columnDefs: [
  //     {headerName: 'Bucket', field: 'Bucket'},
  //     {headerName: 'NumOffers', field: 'NumOffers'},
  //     {headerName: 'OrigFace', field: 'OrigFace', valueGetter: this.utilityService.formatNumber(2), valueFormatter: this.utilityService.formatNumberWithCommas},
  //     {headerName: 'CurrFace', field: 'CurrFace', valueGetter: this.utilityService.formatNumber(2), valueFormatter: this.utilityService.formatNumberWithCommas},
  //     {headerName: 'PctTotalCurr', field: 'PctTotalCurr', valueGetter: this.utilityService.formatNumber(2), valueFormatter: this.utilityService.formatNumberWithCommas},
  //   ],
  //   onRowClicked: params => {
  //     params.context.filter.key = 'Bucket';
  //     params.context.filter.value = params.data['Bucket'];
  //     params.context.activateFiltering();
  //   },
  //   context: this
  // }

  public thirdPanel_GridOptions: GridOptions = {
    columnDefs: [
      {headerName: 'AsOfDate', field: 'AsOfDate', valueFormatter: this.utilityService.formatDate, cellStyle: {'justify-content': 'flex-start'}},
      {headerName: 'InPosition', field: 'InPosition'},
      {headerName: 'BidListPortfolio', field: 'BidListPortfolio', hide:true},
      {headerName: 'Dealer', field: 'Dealer'},      
      {headerName: 'Bucket', field: 'Bucket'},
      {headerName: 'MktTkr', field: 'MktTkr'},
      {headerName: 'OrigTerm', field: 'OrigTerm'},
      {headerName: 'PoolNr', field: 'PoolNr'},            
      {headerName: 'Cusip', field: 'Cusip'},
      {headerName: 'Bid_OrigFace', field: 'Bid_OrigFace', valueGetter: this.utilityService.formatNumber(2), valueFormatter: this.utilityService.formatNumberWithCommas},
      {headerName: 'Bid_CurrFace', field: 'Bid_CurrFace', valueGetter: this.utilityService.formatNumber(2), valueFormatter: this.utilityService.formatNumberWithCommas},
      {headerName: 'Factor', field: 'Factor', hide:true},
      {headerName: 'PayUp', field: 'PayUp'},
      {headerName: 'PayUp_Tick', field: 'PayUp_Tick'},
    ],

    getContextMenuItems: (params) => {

      const unSelectAllRows = {
        name: 'Unselected All Rows',
        icon: '<i class="material-icons small-menu-icon">clear</i>',
        action: () => {
          params.api.deselectAll();
        }
      };

      const addCusipsToNewTab = {
        name: 'Add Cusips to New Tab',
        action: () => {
          params.context.createNewPortfolio();
          setTimeout(() => {
            const targetActivePortfolioId = params.context.activePortfolioIds[params.context.activePortfolioIds.length - 1];
            const rangeCellValues: string[] = params.context.utilityService.getRangesCellValues(params.api.getRangeSelections(), params.api);
            params.context.store.dispatch(new fromStore.LoadIndicativesFromUserInput({portfolioGuid: targetActivePortfolioId, cusips: rangeCellValues}));
          }, 100);
        }
      }

      return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator', unSelectAllRows, addCusipsToNewTab];
    },

    rowSelection: 'multiple',
    rowMultiSelectWithClick: true,
    context: this,
    enableRangeSelection: true,
    deltaRowDataMode: true,
    getRowNodeId: params => {
      return params['Dealer'] + params['Cusip'] + params['PayUp']
    }
  }

  public fourthPanel_GridOptions: GridOptions = {
    columnDefs: [
      {headerName: 'AsOfDate', field: 'AsOfDate'},
      {headerName: 'Dealer', field: 'Dealer'},
      {headerName: 'DealerCode', field: 'DealerCode'},
      {headerName: 'UpdateDate', field: 'UpdateDate', valueFormatter: this.utilityService.formatTimestamp('ETA'), cellStyle: {'justify-content': 'flex-start'}},
    ],
    // onRowClicked: params => {
    //   params.context.filter.key = 'Bucket';
    //   params.context.filter.value = params.data['Bucket'];
    //   params.context.activateFiltering();
    // },
    context: this,

    getRowStyle: params => {
      const currentDate = (new Date()).toLocaleDateString();
      const nodeDate = new Date(params.data['UpdateDate']).toLocaleDateString();
      if (nodeDate !== currentDate) {
        return {
          color: 'red'
        }
      }
    },
    deltaRowDataMode: true,
    getRowNodeId: params => {
      return params['Dealer'];
    }
  }

  public indicativeData_colDefs: ColDef[];

  public startDate;
  public endDate;

  constructor(private store: Store<fromStore.State>, private utilityService: UtilityService) {
    this.activateFiltering = this.activateFiltering.bind(this);
    this.createNewPortfolio = this.createNewPortfolio.bind(this);
  }

  ngOnInit() {
    this.endDate = new Date();
    this.startDate = new Date();
    this.TriggerperiodicDataLoading();

    this.lookupsSubscription = this.store.select(fromStore.getAgencyAnalyticsPoolViewerLookups).subscribe(lookupDic => {
      lookupDic.columns.columnDefs.forEach(column => {
        if (column.headerName === 'Indicative Data') {
          this.indicativeData_colDefs = this.createColumnDefs(column.children);
          this.thirdPanel_GridOptions.columnDefs = [...this.thirdPanel_GridOptions.columnDefs, ...this.indicativeData_colDefs];
          this.thirdPanel_GridOptions = Object.assign({}, this.thirdPanel_GridOptions);
        }
      });
    });
  
    this.firstPanelData$ = this.store.select(fromStore.getBidListsPanelData, {panelType: 'firstPanel'});
    this.firstPanelLoading$ = this.store.select(fromStore.getBidListsPanelLoading, {panelType: 'firstPanel'});
    this.secondPanelData$ = this.store.select(fromStore.getBidListsPanelData, {panelType: 'secondPanel'});
    this.secondPanelLoading$ = this.store.select(fromStore.getBidListsPanelLoading, {panelType: 'secondPanel'});
    this.fourthPanelData$ = this.store.select(fromStore.getBidListsPanelData, {panelType: 'fourthPanel'});
    this.fourthPanelLoading$ = this.store.select(fromStore.getBidListsPanelLoading, {panelType: 'fourthPanel'});

    this.subscription = this.store.select(fromStore.getBidListsPanelData, {panelType: 'thirdPanel'}).subscribe(data => {
      this.thirdPanelDataOriginData = data;

      if (this.filter.key === undefined || this.filter.values.includes('ALL')) {
        this.thirdPanelDataFilterdData$.next(data);
      } else {
        this.thirdPanelDataFilterdData$.next(data.filter(element => this.filter.values.includes(element[this.filter.key])));
      }
    });
    this.thirdPanelLoading$ = this.store.select(fromStore.getBidListsPanelLoading, {panelType: 'thirdPanel'});
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.lookupsSubscription) {
      this.lookupsSubscription.unsubscribe();
    }
  }

  onDateChange() {
    this.TriggerperiodicDataLoading();
    this.filter = {
      key: undefined,
      values: undefined,
    }
  }

  resetFilterFunction(event) {
    this.filterResetFuns.push(event);
  }

  onRetFilters() {
    this.filterResetFuns.forEach(func => func());
  }

  private loadBidlists() {
    this.store.dispatch(new fromStore.LoadBidlists({request_type: 1, start_date: this.startDate, end_date: this.endDate}));
    // this.store.dispatch(new fromStore.LoadBidlists({request_type: 2, start_date: this.startDate, end_date: this.endDate}));
    this.store.dispatch(new fromStore.LoadBidlists({request_type: 3, start_date: this.startDate, end_date: this.endDate}));
    this.store.dispatch(new fromStore.LoadBidlists({request_type: 4, start_date: this.startDate, end_date: this.endDate}));
  }

  private activateFiltering() {
    const filteredData = this.thirdPanelDataOriginData.filter(element => this.filter.values.includes(element[this.filter.key]));
    const targetCusip = filteredData.map(element => element['Cusip']);
    // this.store.dispatch(new fromStore.LoadIndicativesFromBidlists({cusips: targetCusip}));
    // this.thirdPanel_GridOptions.columnDefs = [...this.thirdPanel_GridOptions.columnDefs, ...this.indicativeData_colDefs];
    // this.thirdPanel_GridOptions = Object.assign({}, this.thirdPanel_GridOptions);

    return filteredData;
  }

  private createColumnDefs(columnDefsRaw) {

    const dynamicColDefs = columnDefsRaw.map(colDefRaw => {
      const basicColDef: ColDef = {
        headerName: colDefRaw.headerName,
        field: colDefRaw.field,
        width: colDefRaw.width,
        hide: colDefRaw.hide,
        editable: colDefRaw.editable,
        cellStyle: {'background-color': '#b0205c12'},
        pinned: colDefRaw.pinned,
        rowGroup: colDefRaw.rowGroup,
        headerTooltip: colDefRaw.headerName,
      };

      if (colDefRaw.type.includes('numberColumn')) {
        basicColDef.valueGetter = this.utilityService.formatNumber(colDefRaw.digit);
        basicColDef.valueFormatter = this.utilityService.formatNumberWithCommas;
        basicColDef.filter = 'agNumberColumnFilter';
        basicColDef.cellStyle = Object.assign({}, basicColDef.cellStyle, {'justify-content': 'flex-end'});
      } else if (colDefRaw.type.includes('textColumn')) {
        basicColDef.filter = 'agTextColumnFilter';
        basicColDef.valueFormatter = params => params.value;
      } 

      if (colDefRaw.cellStyle) {
        basicColDef.cellStyle = Object.assign({}, basicColDef.cellStyle, colDefRaw.cellStyle);
      }
      return basicColDef;
    });

    return dynamicColDefs;
  }

  private createNewPortfolio() {
    this.store.dispatch(new fromStore.CreateTempPortfolio());
  }


  public TriggerperiodicDataLoading() {
    this.store.dispatch(new fromStore.SetLoadIndicativesFromBidlistsOnOffSwitch(false));
    setTimeout(() => {
      clearInterval( this.timer);
      this.loadBidlists();
      this.timer = setInterval(() => {
        this.loadBidlists();
      }, 5 * 60 * 1000);
    }, 1000);

  }


}
