import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { GridApi, ColumnApi, GridOptions, RowNode } from 'ag-grid-community';
import * as _ from 'lodash';

import * as fromModels from './../../models/tradename.models';

import { UtilityService } from 'src/app/services';

 function customAllocationValidator(ctrl: UntypedFormControl): any {
    const form = ctrl.parent;
    if (!form) {
        return null;
    }
    const allocStrategy = form.get('allocStrategy');
    const allocReason = form.get('customAllocationReason');

    if (allocStrategy !== null && allocStrategy.value === 'Custom') {
        if (allocReason !== null && allocStrategy.touched && (allocReason.value === null || (allocReason.value.length < 5))) {
            return { 'noAllocReason': true };
        }
    }
    return null;
}

@Component({
    selector: 'app-tradename-creation',
    templateUrl: './tradename-creation.component.html',
    styleUrls: ['./tradename-creation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeNameCreationComponent implements OnInit, OnDestroy, OnChanges {

    @Input() pmPodDetails: any;
    @Input() pmPodDetailsLoading: boolean;
    @Input() pmPodDetailsLoaded: boolean;
    @Input() pmPodDetailsError: string;

    @Input() clientServicesTradeThemes: any[];

    @Input() pms: fromModels.PortfolioManager[];
    @Input() creatingTradeName: boolean;
    @Input() createdTradeName: boolean;
    @Input() createTradeNameSuccessMessage: string;
    @Input() createTradeNameFailureMessage: string;

    @Output() createTradeName = new EventEmitter<fromModels.INewTradeName>();

    public filteredPMs$ = new BehaviorSubject<fromModels.PortfolioManager[]>([]);
    public filteredMacroThemes$ = new BehaviorSubject<string[]>([]);
    public filteredUserSortTags$ = new BehaviorSubject<string[]>([]);
    public isValid$ = new BehaviorSubject<boolean>(true);

    public isCustomStrategy = false;
    public selectedAllocationsOriginal: any[] = [];
    public selectedAllocations: any[] = [];
    public selectedPM: fromModels.PortfolioManager;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    // public showAllPmPods = false;
    // public showAllPods = true;
    public podDisplayMode: string;

    public size = 25;
    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
        },
        getRowNodeId: data => data.PodID,
        getRowStyle: params => {
            if (params.node.rowPinned) {
                return { 'background-color': '#c8f1f9', 'font-weight': 'bold'};
            }
        },
        columnDefs: [
            {
                colId: 'podId',
                headerName: 'PodID',
                field: 'PodID',
                hide: true
            },
            {
                colId: 'podName',
                headerName: 'PodName',
                width: 450,
                sort: 'asc',
                field: 'PodDisplayName'
            },
            {
                colId: 'default',
                headerName: 'Default',
                field: 'Default',
                valueFormatter: this.utilities.formatPercentNumberDivide100Formatter(2),
                cellStyle: (params) => {
                    if (!params.node.rowPinned) {
                        return { 'background-color': '#d2d6d7', 'justify-content': 'flex-end' }
                    }
                }
            },
            {
                colId: 'amtAlloc',
                headerName: 'AmtAlloc',
                field: 'AmtAlloc',
                valueFormatter: this.utilities.formatPercentNumberDivide100Formatter(2),
                cellStyle: (params) => {
                    if (!params.node.rowPinned) {
                        return params.data.isCustomStrategy ?
                            { 'background-color': '#faf9cf', 'justify-content': 'flex-end' } :
                            { 'background-color': '#d2d6d7', 'justify-content': 'flex-end' };
                    }
                },
                editable: (params) => {
                    return params.data.isCustomStrategy;
                },
                valueSetter: params => {
                    try {
                        const newValue = params.newValue;
                        const number = Number(newValue);
                        if (!isNaN(number)) {
                            const newFloatVal = parseFloat(newValue);
                            params.data[params.colDef.field] = newFloatVal;
                            params.data['isChanged'] = true;
                            this.gridApi.setPinnedBottomRowData([this.getTotalsRow()]);
                            return true;
                        } else {
                            return false;
                        }
                    } catch (e) {
                        return false;
                    }
                },
                hide: !this.isCustomStrategy
            },
            {
                colId: 'pctAlloc',
                headerName: 'PctAlloc',
                field: 'PctAlloc',
                valueFormatter: this.utilities.formatPercentNumberDivide100Formatter(2),
                cellStyle: (params) => {
                    if (!params.node.rowPinned) {
                        return params.data.isCustomStrategy ?
                            { 'background-color': '#faf9cf', 'justify-content': 'flex-end' } :
                            { 'background-color': '#d2d6d7', 'justify-content': 'flex-end' };
                    }
                },
                editable: (params) => {
                    return params.data.isCustomStrategy;
                },
                valueSetter: params => {
                    try {
                        const newValue = params.newValue;
                        const number = Number(newValue);
                        if (!isNaN(number)) {
                            const newFloatVal = parseFloat(newValue);
                            params.data[params.colDef.field] = newFloatVal;
                            params.data['isChanged'] = true;
                            this.gridApi.setPinnedBottomRowData([this.getTotalsRow()]);
                            return true;
                        } else {
                            return false;
                        }
                    } catch (e) {
                        return false;
                    }
                }
            }
        ]
    };

    public tradenameForm = this.fb.group({
        primaryPM: ['', Validators.required],
        allocStrategy: ['', Validators.required],
        tradeName: ['', [Validators.minLength(5), Validators.required]],
        isFXHedged: [false, Validators.required],
        clientTheme: ['', Validators.required],
        macroTheme: [''],
        userSortTag3: [''],
        customAllocationReason: ['', customAllocationValidator]
    });

    constructor(private fb: UntypedFormBuilder, private utilities: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void {
        this.tradenameForm.get('primaryPM').valueChanges
            .subscribe((val) => {
                if (val) {
                    this.filteredPMs$.next(this._filterPMs(val));
                } else {
                    this.filteredPMs$.next(this.pms);
                }
            });

        this.tradenameForm.get('macroTheme').valueChanges
            .subscribe((val) => {
                if (val) {
                    this.filteredMacroThemes$.next(this._filterMacroThemes(val));
                } else {
                    this.filteredMacroThemes$.next(this.pmPodDetails.macroThemes);
                }
            });

        this.tradenameForm.get('userSortTag3').valueChanges
            .subscribe((val) => {
                if (val) {
                    this.filteredUserSortTags$.next(this._filterUserSortTag(val));
                } else {
                    this.filteredUserSortTags$.next(this.pmPodDetails.userSortTags);
                }
            });

        setTimeout(() => console.log('pm pod detail', this.pmPodDetails), 2000);

    }

    ngOnDestroy(): void {
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (changes && changes.pms) {
            if (changes && changes.pms.currentValue && changes.pms.currentValue.length > 0) {
                this.filteredPMs$.next(changes.pms.currentValue);
            }
        }

        if (changes && changes.pmPodDetails) {
            if (changes && changes.pmPodDetails.currentValue && changes.pmPodDetails.currentValue.macroThemes &&
                changes.pmPodDetails.currentValue.macroThemes.length > 0) {
                this.filteredMacroThemes$.next(changes.pmPodDetails.currentValue.macroThemes);
            }

            if (changes && changes.pmPodDetails.currentValue && changes.pmPodDetails.currentValue.userSortTags &&
                changes.pmPodDetails.currentValue.userSortTags.length > 0) {
                this.filteredUserSortTags$.next(changes.pmPodDetails.currentValue.userSortTags);
            }
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        this.setColumnDefs();
    }

    submitForm(): void {
        if (this.tradenameForm.valid && this.checkAllocations()) {
            const formValue = this.tradenameForm.value;
            const result = {
                'tradeName': formValue['tradeName'],
                'allocStrategy': formValue['allocStrategy'],
                'clientTheme': formValue['clientTheme'],
                'macroTheme': formValue['macroTheme'],
                'userSortTag3': formValue['userSortTag3'],
                'isFXHedged': formValue['isFXHedged'],
                'crdTradeIDPrefix': formValue['primaryPM']['crdTradeIDPrefix'],
                'pmUserId': formValue['primaryPM']['userID'],
                'customAllocationReason': formValue['customAllocationReason'],
                'allocations': []};
            const allocations = [];
            if (this.gridApi) {
                this.gridApi.forEachNode((node: RowNode) => {
                    allocations.push({'PodID': node.data['PodID'],
                                      'PctAlloc': node.data['PctAlloc'],
                                      'AmtAlloc': node.data['AmtAlloc'],
                                      'Strategy': result['allocStrategy']});
                });
            }
            result['allocations'] = allocations;
            this.createTradeName.emit(result);
        }
    }

    resetForm(): void {
        this.tradenameForm.reset();
        this.tradenameForm.markAsPristine();
        this.selectedAllocations = [];
        this.selectedAllocationsOriginal = [];
        this.isCustomStrategy = false;
        const ctrls = this.tradenameForm.controls;
        for (const name in ctrls) {
            ctrls[name].markAsUntouched();
            ctrls[name].markAsPristine();
            ctrls[name].setErrors(null);
        }
    }

    public findInvalidControls() {
        const invalid = [];
        const controls = this.tradenameForm.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                invalid.push(name);
            }
        }
        return invalid;
    }

    displayPM(val: fromModels.PortfolioManager): string {
        return (val && val.name) ? val.name : null;
    }

    selectPM(e: MatAutocompleteSelectedEvent): void {
        const pm = e.option.value;
        this.selectedPM = pm;
        this.tradenameForm.get('primaryPM').setValue(pm);
        if (pm.defaultSelectedStrategy) {
            this.tradenameForm.get('allocStrategy').setValue(pm.defaultSelectedStrategy);
            this.selectStrategy(pm.defaultSelectedStrategy);
        }
    }

    onSelectStrategy(e: MatAutocompleteSelectedEvent): void {
        this.selectStrategy(e.option.value);
    }

    onSelectCSTradeTheme(e: MatAutocompleteSelectedEvent): void {

    }

    selectStrategy(allocStrategy: string): void {
        let allocStrategyToUse = allocStrategy;
        if (allocStrategy === 'Custom') {
            this.isCustomStrategy = true;
            allocStrategyToUse = this.selectedPM ? this.selectedPM.defaultSelectedStrategy : 'Custom';
        } else {
            this.podDisplayMode = undefined;
            this.isCustomStrategy = false;
            // this.showAllPmPods = false;
            // this.showAllPods = false;
        }

        let allocations;
        if (allocStrategy === 'Custom' && this.podDisplayMode === 'showAllPmPods') {
            allocations = this.getAllPmPods(this.pmPodDetails.allocations, this.selectedPM.strategies, allocStrategyToUse);
        } else if (allocStrategy === 'Custom' && this.podDisplayMode === 'showAllPods') {
            allocations = this.getAllPods(this.pmPodDetails.allocations, allocStrategyToUse);
        } else {
            allocations = this.pmPodDetails.allocations[allocStrategyToUse];
        }

        if (allocations) {
            this.selectedAllocations = allocations.map((allocation) => {
                return Object.assign({}, allocation, { 'isCustomStrategy': this.isCustomStrategy });
            });
            this.selectedAllocationsOriginal = [...this.selectedAllocations];
        } else {
            this.selectedAllocations = [];
            this.selectedAllocationsOriginal = [];
        }
        this.gridApi.setRowData(this.selectedAllocations);
        this.setColumnDefs();
        this.gridApi.setPinnedBottomRowData([this.getTotalsRow()]);
    }

    onSizeChange(size: number) {
        this.gridApi.refreshCells({ columns: ['size'] });
    }

    public onTradeNameChange() {
        const currentTradeName = this.tradenameForm.value['tradeName'];
        this.tradenameForm.controls['userSortTag3'].setValue(currentTradeName);
    }

    getThemeCode(themeId: number){
        return this.clientServicesTradeThemes.find( theme => theme.Id === themeId).Code
    }

    private _filterPMs(value: string): any[] {
        let result = this.pms;
        if (value && value.length > 0) {
            result = this.pms.filter((pm) => pm.name.toLowerCase().startsWith(value.toLowerCase()));
        }
        return result;
    }

    private _filterMacroThemes(value: string): any[] {
        let result = this.pmPodDetails.macroThemes;
        if (value && value.length > 0) {
            result = this.pmPodDetails.macroThemes.filter((macroTheme) => macroTheme.toLowerCase().startsWith(value.toLowerCase()));
        }
        return result;
    }

    private _filterUserSortTag(value: string): any[] {
        let result = this.pmPodDetails.userSortTags;
        if (value && value.length > 0) {
            result = this.pmPodDetails.userSortTags.filter((userSortTag) => userSortTag.toLowerCase().startsWith(value.toLowerCase()));
        }
        return result;
    }

    private setColumnDefs(): void {
        if (this.gridColumnApi) {
            this.gridColumnApi.setColumnVisible('amtAlloc', this.isCustomStrategy);
            setTimeout(() => {
                this.gridApi.refreshView();
                this.gridApi.sizeColumnsToFit();
            }, 0);
        }
    }

    private getTotalsRow(): any {
        const result = {};
        result['PodID'] = -1;
        result['PodDisplayName'] = 'Totals';
        const aggCols = ['Default', 'PctAlloc', 'AmtAlloc'];
        let totalPctAlloc = 0.0;
        aggCols.map((aggCol) => {
            let total = 0.0;
            this.gridApi.forEachNode((node: RowNode) => {
                if (node.data[aggCol]) {
                    total += Number(node.data[aggCol]);
                }
                if (aggCol === 'PctAlloc') {
                    totalPctAlloc += Number(node.data[aggCol]);
                }
            });
            result[aggCol] = total;
            this.checkAllocations();
        });
        return result;
    }

    private checkAllocations(): boolean {
        let result = false;
        if (this.gridApi) {
            let pctTotal = 0.0;
            this.gridApi.forEachNode((node: RowNode) => {
                if (node.data['PctAlloc']) {
                    pctTotal += node.data['PctAlloc'];
                }
            });
            if (Math.abs(pctTotal - 100.0) < .01) {
                result = true;
            }
        }
        this.isValid$.next(result);
        return result;
    }

    public resetAllocationGrid(e: any): void {
        this.selectedAllocations = [...this.selectedAllocationsOriginal];
        this.gridApi.setRowData([]);
        this.setColumnDefs();
        this.gridApi.setRowData(this.selectedAllocations);
        this.gridApi.setPinnedBottomRowData([this.getTotalsRow()]);
    }

    private getAllPmPods(allocation, strategies, defaultStrategy) {
        const defaultCollection: any = {}
        allocation[defaultStrategy].forEach(element => {
            defaultCollection[element.PodName] = Object.assign({},element) ;
        });
        const collection = _.flatten(strategies.map(strategy => allocation[strategy])).filter(element => element !== undefined);
        const uniquePods =  _.uniqBy(collection, 'PodName');
        const collectionWithCorrectedPercentage = {};
        uniquePods.forEach(pod => {
            const podCopy = Object.assign({}, pod)
            podCopy.Default = 0;
            podCopy.PctAlloc = 0;
            podCopy.AmtAlloc = 0;
            collectionWithCorrectedPercentage[pod.PodName] = podCopy;
        });

        let result = Object.assign({}, collectionWithCorrectedPercentage, defaultCollection);
        result = Object.keys(result).map(key => result[key]);
        return result;
    }

    private getAllPods(allocation, defaultStrategy) {
        const defaultCollection: any = {}
        allocation[defaultStrategy].forEach(element => {
            defaultCollection[element.PodName] = Object.assign({}, element) ;
        });

        const allPods = _.flatten(Object.keys(allocation).map(key => allocation[key]));
        const allUniquePods = _.uniqBy(allPods, 'PodName');
        const allUniquePodsWithCorrectedPercentage = {};
        allUniquePods.forEach(pod => {
            const podCopy = Object.assign({}, pod)
            podCopy.Default = 0;
            podCopy.PctAlloc = 0;
            podCopy.AmtAlloc = 0;
            allUniquePodsWithCorrectedPercentage[pod.PodName] = podCopy;
        });
        let result = Object.assign({}, allUniquePodsWithCorrectedPercentage, defaultCollection);
        result = Object.keys(result).map(key => result[key]);
        return result;
    }

    public onPodDisplayModeChange() {
        this.selectStrategy('Custom');
    }
}
