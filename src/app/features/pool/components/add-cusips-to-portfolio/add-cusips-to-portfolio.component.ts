import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';

import * as fromModels from './../../models/bidlist-parser.models';
import { GridOptions, GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-add-cusips-to-portfolio',
  templateUrl: './add-cusips-to-portfolio.component.html',
  styleUrls: ['./add-cusips-to-portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddCusipsToPortfolioComponent implements OnInit {

  @Input() expressions: fromModels.IBidlistParserExpression[];
  @Input() expressionsLoading: boolean;
  @Input() expressionsLoaded: boolean;
  @Input() expressionsError: string;

  @Input() portfolio: fromModels.IBidlistParserResult[];
  @Input() portfolioLoading: boolean;
  @Input() portfolioLoaded: boolean;
  @Input() portfolioError: string;

  @Output() closeSideNav = new EventEmitter<boolean>();
  @Output() parseUserInputCusip = new EventEmitter<string>();
  @Output() addCusipsToPortfolio = new EventEmitter<string[]>();

  public cusips = new Subject();
  public cusipString = '';
  public displayedColumns = ['cusip', 'blbgName', 'origFace'];

  private gridApi: GridApi;

  public customGridOption: GridOptions = {
    defaultColDef: {
      filter: 'agTextColumnFilter',
      enableRowGroup: true,
      cellStyle: params => {
        if (typeof params.value === 'number') {
          return {'justify-content': 'flex-end'};
        }
      },
      cellClass: 'righ-border-ag-cell'
    },
    columnDefs: [
      {headerName: 'Cusip', field: 'Cusip'},
      {headerName: 'BlbgName', field: 'BlbgName'},
      {headerName: 'BidOrigFace', field: 'BidOrigFace'},
      // {headerName: 'OfferOrigFace', field: 'OfferOrigFace'},
      // {headerName: 'Score', field: 'Score'},
    ]
  };

  public extraOption = {sizeColumnsToFit: true};

  constructor() {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {}

  addCusips() {
    // this.addCusipsToPortfolio.emit(this.cusipArray);
    // this.cusips.next([]);
    // this.cusipString = '';
    const cusipArray = this.portfolio.map(item => item.Cusip);
    this.addCusipsToPortfolio.emit(cusipArray);
    this.onclose();
  }

  cusipsChange() {
    this.parseUserInputCusip.emit(this.cusipString);
  }

  onReset() {
    this.cusips.next();
    this.cusipString = '';
    this.portfolio = [];
  }

  onclose() {
    this.closeSideNav.emit(true);
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
  }

}
