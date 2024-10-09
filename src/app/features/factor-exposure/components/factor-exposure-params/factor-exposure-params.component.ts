import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatLegacySlideToggleChange as MatSlideToggleChange } from '@angular/material/legacy-slide-toggle';
import { Store } from '@ngrx/store';
import { emit } from 'process';
import * as fromModels from '../../models/factor-exposure.models';
import * as fromStore from '../../store';

@Component({
    selector: 'app-factor-exposure-params',
    templateUrl: './factor-exposure-params.component.html',
    styleUrls: ['./factor-exposure-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeverageParamsComponent implements OnInit, OnChanges {

    @Input() activeDate: string;
    @Input() activeGrouping: string;

    @Input() dateDropdownData: string[];
    @Input() groupingDropdownData: string[];
    @Input() timestamp: string;

    @Input() useUSDFilter: boolean;
    @Input() useBpsToFundFilter: boolean;
    @Input() useBpsToPodFilter: boolean;
    @Input() useNullSecFilter: boolean;

    @Output() dateChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() groupingChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() changeParams: EventEmitter<any> = new EventEmitter<any>();
    @Output() updateDisplayFilters: EventEmitter<any> = new EventEmitter<any>();
    @Output() updateNullSecFilter: EventEmitter<any> = new EventEmitter<any>();

    constructor(private store: Store<fromStore.FactorExposureState>) { }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.activeDate && changes.activeDate.currentValue){
            this.activeDate = changes.activeDate.currentValue.replaceAll("-", "/");
        }
    }

    public onDateChanged(e: MatSelectChange): void {
        this.activeDate = e.value;
        const param: fromModels.IFactorExposureParams = { 'activeDate': e.value, 'activeGrouping': this.activeGrouping };
        if (this._checkParams()) {
            this.onParamChanged(param);
        }
    }

    public onGroupingChanged(e: MatSelectChange): void {
        this.activeGrouping = e.value;
        const param: fromModels.IFactorExposureParams = { 'activeDate': this.activeDate, 'activeGrouping': e.value };
        if (this._checkParams()) {
            this.onParamChanged(param);
        }
    }

    public onChangeDisplayMode(e: any){
        let output = {
            'USD': this.useUSDFilter,
            'bpsToFund': this.useBpsToFundFilter,
            'bpsToPod': this.useBpsToPodFilter
        }

        switch(e){
            case '$':
                output.USD = !this.useUSDFilter
                break;
            case 'bpsToFund':
                output.bpsToFund = !this.useBpsToFundFilter
                break;
            case 'bpsToPod':
                output.bpsToPod = !this.useBpsToPodFilter
                break;
        }
        this.updateDisplayFilters.emit(output)
    }

    public onToggle(e: MatSlideToggleChange){
        this.updateNullSecFilter.emit(e.checked)
    }

    private _checkParams() {
        if (this.activeDate && this.activeGrouping) {
            return true;
        }
    }

    private onParamChanged(e: any): void {
        this.changeParams.emit(e);
    }

}
