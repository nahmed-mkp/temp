import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { startWith, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { GridApi, ColumnApi, GridOptions } from 'ag-grid-community';

import * as fromModels from './../../models';
import { UtilityService } from 'src/app/services';


@Component({
  selector: 'app-security-editor-market-data-viewer',
  templateUrl: './security-editor-market-data-viewer.component.html',
  styleUrls: ['./security-editor-market-data-viewer.component.scss']
})
export class SecurityEditorMarketDataViewerComponent implements OnInit, OnChanges {

    @Input() selectedSID: number;
    @Input() marketData: fromModels.IMarketData[];
    @Input() marketDataLoading: boolean;
    @Input() marketDataLoaded: boolean;
    @Input() marketDataError: string;

    @Input() selectedMDID: number;
    @Input() marketDataPoints: fromModels.IMarketDataPoint[];
    @Input() marketDataPointsLoading: boolean;
    @Input() marketDataPointsLoaded: boolean;
    @Input() marketDataPointsError: string;

    @Output() securitySelected = new EventEmitter<number>();
    @Output() selectMarketData: EventEmitter<fromModels.IMarketData> = new EventEmitter<fromModels.IMarketData>();

    public marketDataForm: UntypedFormGroup;
    public selectedMarketData: fromModels.IMarketData;
    public filteredTypes$: Subject<fromModels.IMarketData[]> = new Subject<fromModels.IMarketData[]>();

    private gridApi: GridApi;

    public size = 25;
    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            cellRenderer: 'agAnimateShowChangeCellRenderer',
        },
        floatingFilter: true,
        deltaRowDataMode: false,
        columnDefs: [
            {
                headerName: 'Date',
                field: 'date',
                editable: false,
                filter: 'agDateColumnFilter',
                width: 300
            },
            {
                headerName: 'Closes',
                field: 'eod_value',
                editable: false,
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(6),
                cellStyle: { 'justify-content': 'end'}
            },
            {
                headerName: 'Live',
                field: 'live_value',
                editable: false,
                filter: 'agNumberColumnFilter',
                valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(6),
                cellStyle: { 'justify-content': 'end'}
            },
            {
                headerName: 'Close [Ts]',
                field: 'eod_ts',
                editable: false,
                filter: 'agTextColumnFilter'
            },
            {
                headerName: 'Live [Ts]',
                field: 'live_ts',
                editable: false,
                filter: 'agTextColumnFilter'
            },
            {
                headerName: 'MDID',
                field: 'mdid',
                editable: false
            }
        ]
    };

    constructor(private formBuilder: UntypedFormBuilder, private utilityService: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {
        this.marketDataForm = this.formBuilder.group({
            marketDataType: new UntypedFormControl()
        });

        this.onChanges();
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes && changes.marketData && changes.marketData.currentValue && changes.marketData.currentValue.length > 0) {
            this.filteredTypes$.next(changes.marketData.currentValue);
            this.marketDataForm.reset();
            this.selectedMarketData = null;

            // Set Default to Price and load data automatically
            this.selectedMarketData = this.marketData.filter(element => element.type.toLowerCase() === 'price')[0] || null;
            if (this.selectedMarketData) {
                this.marketDataForm.setValue({
                    marketDataType: this.selectedMarketData
                });
                this.selectMarketData.emit(this.selectedMarketData);
            }
        }

        if (changes.marketDataPoints && changes.marketDataPoints.currentValue && this.gridApi) {
            this.gridApi.setRowData(changes.marketDataPoints.currentValue);
        }
    }

    onChanges(): void {
        this.marketDataForm.get('marketDataType').valueChanges
            .pipe(
                startWith(''),
                debounceTime(10),
                distinctUntilChanged()
            )
            .subscribe((val) => {
                this.filterMarketDataTypes(val);
            });
    }

    filterMarketDataTypes(val: string): void {
        if (this.marketData && this.marketData.length > 0 && (val && val.length > 0)) {
            const filteredTypes = this.marketData.filter((marketData) =>
                marketData.type.toLowerCase().startsWith(val.toLowerCase()));
            this.filteredTypes$.next(filteredTypes);
        } else {
            if (this.marketData) {
                this.filteredTypes$.next(this.marketData);
            }
        }
    }


    selectMarketDataType(e: MatAutocompleteSelectedEvent): void {
        this.selectedMarketData = e.option.value;
        this.selectMarketData.emit(this.selectedMarketData);
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        if (this.marketDataPoints.length > 0) { 
            this.gridApi.setRowData(this.marketDataPoints); 
        }
    }

    onSizeChange(size: number) {
        this.gridApi.refreshCells({ columns: ['size'] });
    }

    displayMarketData(val: fromModels.IMarketData): string {
        if (val) {
            return val.type + ': ' + val.mdid.toString();
        }
        return null;
    }

}
