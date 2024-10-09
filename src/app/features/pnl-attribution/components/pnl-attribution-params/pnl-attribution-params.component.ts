import { EventEmitter, Output, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { YearSelectorComponent } from '../year-selector/year-selector.component';

import * as fromModels from './../../models';
import { PnlAttributionReportLayoutComponent } from '../../containers';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
@Component({
    selector: 'app-pnl-attribution-params',
    templateUrl: './pnl-attribution-params.component.html',
    styleUrls: ['./pnl-attribution-params.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PnlAttributionParamsComponent implements OnInit, OnChanges {

    @Input() request: fromModels.IAttributionRequest;
    @Input() gridDisplayMode: any = {};
    @Input() layoutCollection: any;
    @Input() commonGroupingsMainCategory: string[] = [];
    @Input() commonGroupingsByCategory: any = {};

    @Input() reclassifyRepoToggleValue: boolean;
    @Input() excludeFundingToggleValue: boolean;
    @Input() includeBetaToggleValue: boolean;

    @Input() layoutNames: any

    @Output() runAttribution: EventEmitter<fromModels.IAttributionRequest> = new EventEmitter<fromModels.IAttributionRequest>();
    @Output() changeGridDisplayMode = new EventEmitter<any>(); 
    @Output() selectedLayout = new EventEmitter<{layoutName: string; openNewTab: boolean}>();
    @Output() applyCommonGrouping = new EventEmitter<string[]>();

    @Output() toggleReclassifyRepo = new EventEmitter<boolean>();
    @Output() toggleExcludeFunding = new EventEmitter<boolean>();
    @Output() toggleIncludeBetaAdjustment = new EventEmitter<boolean>();

    public startDate: Date;
    public endDate: Date;


    constructor(private _bottomSheet: MatBottomSheet, private ref: ChangeDetectorRef, private dialog: MatDialog) { }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.request && changes.request.currentValue) {
            this.startDate = this.request.startDate;
            this.endDate = this.request.endDate;
        }
    }

    // public onDateChanged(e: MatDatepickerInputEvent<Date>, type: string): void {
    //     const newRequest = Object.assign({}, this.request);
    //     if (type === 'startDate') { 
    //         newRequest.startDate = e.value;
    //     } else {
    //         newRequest.endDate = e.value;
    //     }
    //     this.request = newRequest;
    // }

    public openYearSelector(): void {
        const ref = this._bottomSheet.open(YearSelectorComponent);
        ref.afterDismissed().subscribe((year) => {
            if (year) {
                setTimeout(() => {
                    const startDate = new Date(year, 0, 1);
                    let endDate = new Date(year, 11, 31);
                    if (endDate > new Date()) {
                        endDate = new Date();
                    }
                    this.startDate = startDate;
                    this.endDate = endDate;
                    // this.request = Object.assign({}, this.request, {
                    //     'startDate': this._getTimezoneUnawareDate(startDate),
                    //     'endDate': this._getTimezoneUnawareDate(endDate)
                    // });
                    this.ref.markForCheck();
                }, 200);
            }
        });
    }

    public onRunAttribution(): void {
        this.request.startDate = this.startDate;
        this.request.endDate = this.endDate;
        this.request.reclassifyRepo = this.reclassifyRepoToggleValue;
        this.request.excludeFunding = this.excludeFundingToggleValue;
        this.request.includeBetaAdjustment = this.includeBetaToggleValue;
        this.runAttribution.emit(this.request);
    }


    // public getYears(): number[] { 
    //     const result = [];
    //     const startYear = 2010;
    //     let curYear = new Date().getUTCFullYear();
    //     while (curYear >= startYear) { 
    //         result.push(curYear);
    //         curYear -= 1;
    //     }
    //     return result;
    // }

    public onOpenReport() {
        this.dialog.open(PnlAttributionReportLayoutComponent, {
            panelClass: 'event-analysis-pop-up-panel',
            width: '80rem',
            height: '50rem',
            hasBackdrop: false,
            data: {
                startDate: this.request.startDate,
                endDate: this.request.endDate,
            }
        })
    }

    public onChangeDisplayCopy(targetKey: string, targetKey2?: string) {
        let updateDisplayMode = {
            [targetKey]: !this.gridDisplayMode[targetKey]
        };
        if (targetKey2) {
            updateDisplayMode = {...updateDisplayMode, [targetKey2]: !this.gridDisplayMode[targetKey2]}
        }
        this.changeGridDisplayMode.emit(updateDisplayMode);
    }

    public onSelectNewlayout(event, layoutName: string, openNewTab: boolean) {
        event.stopPropagation();
        this.selectedLayout.emit({layoutName, openNewTab});

        setTimeout(() => this.onRunAttribution(), 500);
    }

    public onApplyCommonGrouping(grouping) {
        this.applyCommonGrouping.emit(grouping);
    }


    onToggleReclassifyRepo(e: MatSlideToggleChange) {
        this.toggleReclassifyRepo.emit(e.checked)
    }

    onToggleExcludeFunding(e: MatSlideToggleChange) {
        this.toggleExcludeFunding.emit(e.checked)
    }

    onToggleBetaAdjustment(e: MatSlideToggleChange) {
        this.toggleIncludeBetaAdjustment.emit(e.checked);
    }

    // -------------------------------------------

    private _getTimezoneUnawareDate(dateValue: Date): Date { 
        const dateWithNoTimezone = new Date(
            dateValue.getUTCFullYear(),
            dateValue.getUTCMonth(),
            dateValue.getUTCDate(),
            dateValue.getUTCHours(),
            dateValue.getUTCMinutes(),
            dateValue.getUTCSeconds()
         );
         return dateWithNoTimezone;
     }
}
