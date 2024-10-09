import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges,
         Output, EventEmitter, OnDestroy, ViewEncapsulation } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatLegacyChipInputEvent as MatChipInputEvent} from '@angular/material/legacy-chips';
import { UntypedFormControl } from '@angular/forms';
import uuidv1 from 'uuid/v1';
import { startWith, map } from 'rxjs/operators';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import * as fromModels from './../../models/option-vols.models';
import { OptionVolsSettingLayoutDialogComponent } from '../../containers/option-vols-setting-layout-dialog/option-vols-setting-layout-dialog.component';
import { Observable } from 'rxjs';
import { transition, style, animate, trigger } from '@angular/animations';

@Component({
    selector: 'app-option-vols-toolbar',
    templateUrl: './option-vols-toolbar.component.html',
    styleUrls: ['./option-vols-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('fade', [
        //   transition('inactive => active', [ 
        //     style({transform: 'translateY(0)'}),
        //     animate(500, style({ opacity: 1, display: 'block',  transform: 'translateY(100%)' }))
        //   ]),
        //   transition('active => inactive', [
        //     style({ opacity: 0, display:'none'})
        //   ])
        ])
      ]
})
export class OptionVolsToolbarComponent implements OnInit, OnChanges, OnDestroy {

    @Input() tickers: string[];
    @Input() optionVolsParameters: fromModels.IOptionVolRequest;
    @Input() sizingCapitals: fromModels.SizingCapital[];
    @Input() pricingMethod: 'strike' | 'delta';

    @Output() changePricingMethod = new EventEmitter<'strike' | 'delta'>();
    @Output() submitOptionVolsParameters = new EventEmitter<{request: fromModels.IOptionVolRequest, newTab: boolean}>();

    public parameterVisibility: string = "inactive"

    public set1: any = {
        target: 100,
        deltas: [10, 15, 20, 30, 40, 50],
        useCache: true,
        volType: 'monthly',
        ticker: 'TYU0 Comdty',
        numExpiries: 3,
        includeOTMOptions: true,
        capital: '1,400,000,000',
        guid: '5db41210-ca2e-11ea-b06a-b52331099bb4',
        templateType: 'FixedIncome',
    };

    public set2: any = {
        ticker: 'TYU0 COMDTY',
        deltas: [10, 15, 20, 30, 40, 50],
        numExpiries: 3,
        includeOTMOptions: true,
        volType: 'quarterly',
        capital: '1,400,000,000',
        target: 100,
        useCache: true,
        guid: '32b8715e-465e-4b24-aff2-383cf0bb3006',
        templateType: 'Equity',
    };

    public set3: any = {
        ticker: 'USDBRL',
        deltas: [10, 15, 20, 30, 40, 50],
        strikes: [],
        delta_or_strike: '',
        numExpiries: 3,
        includeOTMOptions: true,
        volType: 'daily',
        capital: '1,400,000,000',
        target: '100',
        targetNotional: '100,000,000',
        useCache: true,
        guid: '32b8715e-465e-4b24-aff2-383cf0bb3006',
        templateType: 'FX',
    };

    public optionVolsParametersTemp = this.set3;

    public templates = [
        {'templateType': 'Equity', 'displayName': 'Other'},
        {'templateType': 'FixedIncome', 'displayName': 'FixedIncome'},
        {'templateType': 'FX', 'displayName': 'Currency'}
    ];

    public tickerFormControl = new UntypedFormControl();
    public filteredTickers$: Observable<string[]>;
    public capitalFormControl = new UntypedFormControl();
    public filteredCapitals$: Observable<fromModels.SizingCapital[]>;

    public targetSet = 1;

    private dialogRef: MatDialogRef<OptionVolsSettingLayoutDialogComponent>;
    public notionalOrSize: 'notional' | 'size' = 'size';

    public selectedExpiries: string[] = [];

    readonly separatorKeysCodes: number[] = [ENTER, COMMA];

    constructor(private dialog: MatDialog) { }

    ngOnInit(): void {
        this.tickerFormControl.setValue(undefined);
        this.capitalFormControl.setValue(undefined);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.pricingMethod && changes.pricingMethod.currentValue){
            this.optionVolsParametersTemp.delta_or_strike = changes.pricingMethod.currentValue;
        }

        if (changes.optionVolsParameters && changes.optionVolsParameters.currentValue) {

            this.optionVolsParametersTemp = JSON.parse(JSON.stringify(changes.optionVolsParameters.currentValue));

            this.optionVolsParametersTemp.capital = this.optionVolsParametersTemp.capital.toLocaleString();
            this.optionVolsParametersTemp.target = this.optionVolsParametersTemp.target && this.optionVolsParametersTemp.target.toLocaleString();
            this.optionVolsParametersTemp.targetNotional = this.optionVolsParametersTemp.targetNotional && this.optionVolsParametersTemp.targetNotional.toLocaleString();

            if (this.optionVolsParametersTemp.ticker) {
                this.tickerFormControl.setValue(this.optionVolsParametersTemp.ticker);
            }
        }

        if (changes.tickers && changes.tickers.currentValue) {
            this.filteredTickers$ = this.tickerFormControl.valueChanges.pipe(
                startWith(''),
                map(text => {
                    const result = text ? this.tickers.filter(ticker => ticker.toLowerCase().includes(text.toLowerCase())) : this.tickers.slice();
                    return result;
                })
            );
        }

        if (changes.sizingCapitals && changes.sizingCapitals.currentValue) {

            if (this.sizingCapitals.length && this.sizingCapitals.length > 0) {
                const defaultCapital = this.sizingCapitals.filter(capital => capital.default)[0];
                this.optionVolsParametersTemp.capital = defaultCapital && defaultCapital.capital && defaultCapital.capital.toLocaleString();
            }

            this.filteredCapitals$ = this.capitalFormControl.valueChanges.pipe(
                map(num => {
                    if (this.sizingCapitals.length && this.sizingCapitals.length > 0) {
                        return this.sizingCapitals;
                    } else {
                        return [];
                    }
                })
            );
        }
    }

    ngOnDestroy() { }

    onSubmit(newTab): void {
        const newGuid = uuidv1();
        // const newGuid = 'd5efcab0-e957-11ea-8cb0-e3cac6d3fb6e'; <-- For FX
        const temp =  JSON.parse(JSON.stringify(this.optionVolsParametersTemp));
        temp.capital = parseFloat(temp.capital.replace(/,/g, ''));
        temp.target = temp.target && parseFloat(temp.target.replace(/,/g, ''));
        temp.targetNotional = temp.targetNotional && parseFloat(temp.targetNotional.replace(/,/g, ''));
        temp.guid = newGuid;
        const deltasNumber = temp.deltas.map(str => parseFloat(str));
        temp.deltas = deltasNumber;
        // temp.guid = '13b0aed9-2b98-47dd-a00b-4c1ea1ec0ad1';

        if (this.notionalOrSize === 'notional') {
            delete temp['target'];
        } else if (this.notionalOrSize === 'size') {
            delete temp['targetNotional'];
        }

        if (this.selectedExpiries.length > 0) {
            temp['expiries'] = [...this.selectedExpiries];
        } else  {
            temp['expiries'] = [];
        }
        this.submitOptionVolsParameters.emit({request: temp, newTab: newTab});
    }

    add(event: MatChipInputEvent, pricingMethod: string): void {
        const input = event.input;
        const value = event.value;
        const arr = pricingMethod === 'delta' ? this.optionVolsParametersTemp.deltas : this.optionVolsParametersTemp.strikes;
        // Add our fruit
        if ((value || '').trim()) {
          arr.push(Number(value.trim()));
        }
        // Reset the input value
        if (input) {
          input.value = '';
        }
    }

    remove(value, pricingMethod): void {
        const arr = pricingMethod === 'delta' ? this.optionVolsParametersTemp.deltas : this.optionVolsParametersTemp.strikes;
        const index = arr.indexOf(value);
        if (index >= 0) {
            arr.splice(index, 1);
        }
    }


    removeCommas() {
        this.optionVolsParametersTemp.capital = this.optionVolsParametersTemp.capital.replace(/,/g, '');
    }

    addCommas() {
        const number = parseFloat(this.optionVolsParametersTemp.capital);
        this.optionVolsParametersTemp.capital = number.toLocaleString();
    }

    removeCommas_general(event, field) {
        this.optionVolsParametersTemp[field] = this.optionVolsParametersTemp[field].replace(/,/g, '');
    }

    addCommas_general(event, field) {
        const number = parseFloat(this.optionVolsParametersTemp[field]);
        this.optionVolsParametersTemp[field] = number.toLocaleString();
    }
    
    changeParameterVisibility() {
        this.parameterVisibility = this.parameterVisibility === "active" ? "inactive" : "active";
    }

    public onSetChange() {
        if (this.targetSet === 1) {
            this.optionVolsParametersTemp = this.set1;
        } else {
            this.optionVolsParametersTemp = this.set2;
        }
    }

    public openSetting() {
        this.dialogRef = this.dialog.open(OptionVolsSettingLayoutDialogComponent, {
            hasBackdrop: false,
            panelClass: 'event-analysis-pop-up-panel',
            width: '30rem',
            height: '25rem',
        });
    }

    isDateSelected = (e: any): string => {
        const date = this.formatDate(e);
        return this.selectedExpiries.find(x => x === date) ? 'selected' : '';
    }

    selectDate = (e: any, calendar: any)  => {
        const date = this.formatDate(e);
        const index = this.selectedExpiries.findIndex(x => x === date);
        if (index < 0) {
            this.selectedExpiries.push(date);
        } else {
            this.selectedExpiries.splice(index, 1);
        }
        calendar.updateTodaysDate();
    }

    removeDate = (e: any): void => {
        const date = this.formatDate(e);
        const index = this.selectedExpiries.findIndex(x => x === date);
        this.selectedExpiries.splice(index, 1);
    }

    sortedDates = (dates: string[]): any[] => {
        if (dates.length === 0) {
            return [];
        } else {
            const result = [];
            dates.forEach((date) => {
                const year = parseInt(date.substring(0, 4), 10);
                const month = parseInt(date.substring(5, 7), 10) - 1;
                const day = parseInt(date.substring(8, 10), 10);
                result.push(new Date(year, month, day));
            });
            const resultDates = result.sort((a, b) => a - b).map((dt) => this.formatDateMMDDYYYY(dt));
            return resultDates;
        }
    }

    // utility -----------------------
    public format(value) {
        return value.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    formatDate = (e: any): string => {
        return e.getFullYear() + '-' + ('00' + (e.getMonth() + 1)).slice(-2) + '-' + ('00' + e.getDate()).slice(-2);
    }

    formatDateMMDDYYYY = (e: any): string => {
        return ('00' + (e.getMonth() + 1)).slice(-2) + '/' + ('00' + e.getDate()).slice(-2) + '/' + e.getFullYear();
    }

    handlePricingMethodChange(e: any){
        this.changePricingMethod.emit(e.value);
    }
}
