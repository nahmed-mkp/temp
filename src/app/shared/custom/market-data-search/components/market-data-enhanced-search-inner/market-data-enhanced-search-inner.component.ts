import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, OnChanges, SimpleChanges, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { Observable, Subject } from 'rxjs';

import * as fromModels from '../../models';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';


@Component({
  selector: 'app-market-data-enhanced-search-inner',
  templateUrl: './market-data-enhanced-search-inner.component.html',
  styleUrls: ['./market-data-enhanced-search-inner.component.scss']
})
export class MarketDataEnhancedSearchInnerComponent implements OnInit, OnChanges {

    @Input() value: string = null;
    @Input() searchResults: fromModels.SecuritySearchResult[];
    @Input() searching: boolean;
    @Input() customClass: string = '';
    @Input() placeholder: string;

    @Output() searchSecurities: EventEmitter<string> = new EventEmitter<string>();
    @Output() selectSecurity = new EventEmitter<fromModels.SecuritySearchResult>();

    @ViewChild('search') searchInputElement: ElementRef;

    public showGrid$ = new Subject<boolean>();

    private gridApi: GridApi;
    public extraOption = {sizeColumnsToFit: true};
    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            width: 150,
            // cellStyle: params => {
            //     return typeof params.value === 'number' ? {'justify-content': 'flex-end'} : { };
            // },
        },
        columnDefs: [
            // {headerName: 'Date', field: 'date', sort: 'desc',
            //     comparator: (valueA, valueB, nodeA, nodeB) => {
            //         const dateA = (new Date(valueA)).getTime();
            //         const dateB = (new Date(valueB)).getTime();
            //         return dateA - dateB;
            //     }},
            // {headerName: 'EOD Value', field: 'eod_value', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(4)},
            {headerName: 'SecurityName', field: 'SecurityName'},
            {headerName: 'SecurityType', field: 'SecurityType'},
            {headerName: 'Description', field: 'Description'},
            {headerName: 'BlbgName', field: 'BlbgName'},
            {headerName: 'Cusip', field: 'Cusip'},
            {headerName: 'SID', field: 'SID'},
            {headerName: 'sortOrder', field: 'sortOrder', sort: 'asc', hide: true},
        ],

        rowSelection: 'single',

        onRowSelected: params => {
            if (params.node.isSelected()) {
                this.selectSecurity.emit(params.data);
                this.value = params.data['SecurityName'];
                this.showGrid$.next(false);
            }
        }
    }

    private KEY_CODE_COLON = 186;
    private KEY_CODE_ENTER = 13;
    private KEY_CODE_DOWN = 40;
    private KEY_CODE_UP = 38;
    private KEY_CODE_ESC = 27;
    private KEY_CODE_TAB = 9;

    public handleKeyUpEvent_debounce: any;

    constructor(private utilityService: UtilityService) { 
        this.customGridCallBack = this.customGridCallBack.bind(this);

        this.handleKeyUpEvent_debounce = _.debounce(this.handleKeyUpEvent.bind(this), 500);
    }

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.searchResults && changes.searchResults.currentValue) {
            console.log('searchResults changes', this.searchResults); 

            if (this.searchResults.length && this.searchResults.length > 0) {
                this.showGrid$.next(true);
            } else {
                this.showGrid$.next(false);
            }
        }
    }

    AfterViewInit(): void {
        this.searchInputElement.nativeElement.value = this.value || null;
        setTimeout(() => this.searchInputElement.nativeElement.focus());
    }

    public handleKeyUpEvent(e: any): void {
        const searchTerm = e.target.value as string;
        const code = e.keyCode;

        if (code === this.KEY_CODE_DOWN || code === this.KEY_CODE_UP) {
            e.stopPropagation();
            return;
        }
        switch (code) {

        // case this.KEY_CODE_ESC:
        //     e.target.value = '';
      //     this.searchCriteria = { text: '', numCount: 10 };
      //     this.search$.next('');
      //     break;

        case this.KEY_CODE_ENTER:
            // this.searchSecurities.emit(searchTerm);
            this.showGrid$.next(false);
            break;

        default:
            // if (searchTerm.length >= 3) {
            this.searchSecurities.emit(searchTerm);
            //}
            break;
        }
    }

    public securitySelected(payload: MatAutocompleteSelectedEvent): void {
        if (payload.option.value) {
            this.selectSecurity.emit(payload.option.value);
        }
    }

    public displayFn(result?: any): string | undefined {
        return result ? result.SecurityName : undefined;
    }
    
    public customGridCallBack(params) {
        this.gridApi = params.api;
    }

    public onFocusout() {
        setTimeout(() => this.showGrid$.next(false), 100)
    }

    public onFocus() {
        if (this.searchResults.length && this.searchResults.length > 0) {
            this.showGrid$.next(true)
        }
    }

}
