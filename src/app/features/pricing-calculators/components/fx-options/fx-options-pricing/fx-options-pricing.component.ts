import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FxOptionForm, FxOptionOutput, FxOptionRes } from '../../../models';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import * as fromStore from './../../../store';
import {MatLegacyDialog as MatDialog} from '@angular/material/legacy-dialog';
import { FxOptionsDialogComponent } from '../fx-options-pricing-dialog/fx-options-pricing-dialog.component';
import { FxOptionsDialogAltComponent } from '../fx-options-pricing-dialog-alt/fx-options-pricing-dialog-alt.component';
import { UntypedFormControl } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { Moment } from 'moment';

@Component({
  selector: 'app-pricer-fxoption',
  templateUrl: './fx-options-pricing.component.html',
  styleUrls: ['./fx-options-pricing.component.scss'],
})

export class FXOptionsPricingComponent implements OnInit, OnChanges {

  @ViewChild('underlying') underlyingCurrSelect: MatSelect;
  @ViewChild('notionalCurr') notionalCurrSelect: MatSelect;
  @ViewChild('quoteCurr') quoteCurrSelect: MatSelect;
  @ViewChild('callPut') callPutSelect: MatSelect;
  @ViewChild('upDown') upDownSelect: MatSelect;
  @ViewChild('inOut') inOutSelect: MatSelect;
  @ViewChild('maturityDate', { read: MatInput }) maturityDate: MatInput;

  @Input() data: FxOptionForm;
  @Input() fxOutput: any;
  @Input() currArr: string[] = [];
  @Input() typeArr: string[];
  @Input() optionChoice: string;
  @Input() loading: boolean;
  @Input() calculating: boolean;

  public _quoteCurr: string;
  public _notionalCurr: string;
  public _notional = '1,000,000';
  public _inputVol: number;
  public _strike = null;
  public _inputDelta: number;
  public _inputPrice: number;
  public maxDate = new Date();
  public minDate = new Date(2022, 4, 3);
  public filteredCurrencies: string[] = [];
  public mutuallyExclusive: any = [false, ''];
  public _barrier: number;

  public initValuationDate = new UntypedFormControl(new Date());
  public initMaturityDate = new UntypedFormControl(null);

  private _curr: string;
  private _optionType: string;
  private _callType = 'None';
  private _maturityDate: string;
  private _valuationDate = moment(new Date()).format('YYYY-MM-DD');
  private _upDown: string;
  private _inOut: string;

  constructor(
    private store: Store<fromStore.PricingCalculatorsState>,
    public dialog: MatDialog
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(FxOptionsDialogComponent);
  }

  openAltDialog() {
    const dialogRef = this.dialog.open(FxOptionsDialogAltComponent);
  }

  onCurrSelect(event): void {
    const curr_arr = event.value.match(/.{1,3}/g);
    this.currArr = curr_arr;
    this._curr = event.value;
    this._notionalCurr = this.currArr[0];
    this._quoteCurr = this.currArr[0];
  }

  onNotionalInput(event): void {
    this._notional = Number(event.target.value).toLocaleString(undefined, {maximumFractionDigits: 8});
  }

  onStrikeInput(event): void {
    if (event.target.value === '') {
      this.mutuallyExclusive = [false, ''];
      this._strike = '';
    } else {
      this._strike = Number(event.target.value).toLocaleString(undefined, {maximumFractionDigits: 8});
      this.mutuallyExclusive = [true, 'strike'];
    }
  }

  onQuoteSelect(event): void {
    this._quoteCurr = event.value;
  }

  onNotionalSelect(event): void {
    this._notionalCurr = event.value;
  }

  onOptionTypeSelect(event): void {
    this._optionType = event.value;
    this.optionChoice = event.value;
    this.clearValues();
  }

  clearValues(): void {
    this._strike = null;
    this._inputVol = null;
    this._inputPrice = null;
    this._notional = '1,000,000';
    this._barrier = null;
    this.underlyingCurrSelect.options.forEach((data: MatOption) => data.deselect());
    this.notionalCurrSelect.options.forEach((data: MatOption) => data.deselect());
    this.quoteCurrSelect.options.forEach((data: MatOption) => data.deselect());
    this.callPutSelect.options.forEach((data: MatOption) => data.deselect());
    this.upDownSelect.options.forEach((data: MatOption) => data.deselect());
    this.inOutSelect.options.forEach((data: MatOption) => data.deselect());
    this.maturityDate.value = '';
    this.mutuallyExclusive = [false, ''];
  }

  onCallTypeSelect(event): void {
    this._callType = event.value;
  }

  onMaturityDateSelect(event): void {
    const formattedDate = moment(event.value).format('MM-DD-YYYY');
    this._maturityDate = formattedDate;
  }

  onValuationDateSelect(event): void {
    const formattedDate = moment(event.value).format('MM-DD-YYYY');
    this._valuationDate = formattedDate;
  }

  onBarrierInput(event): void {
    this._barrier = Number(event.target.value);
  }

  onUpDownSelect(event): void {
    this._upDown = event.value;
  }

  onInOutSelect(event): void {
    this._inOut = event.value;
  }

  onDeltaInput(event): void {
    if (event.target.value === '') {
      this.mutuallyExclusive = [false, ''];
      this._inputDelta = 0;
    } else {
      this._inputDelta = event.target.value;
      this.mutuallyExclusive = [true, 'inputDelta'];
    }
  }

  onPriceInput(event): void {
    if (event.target.value === '') {
      this.mutuallyExclusive = [false, ''];
      this._inputPrice = 0;
    } else {
      this._inputPrice = event.target.value;
      this.mutuallyExclusive = [true, 'inputPrice'];
    }
  }

  onVolumeInput(event): void {
    this._inputVol = event.target.value;
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      const outputModel: FxOptionOutput = {
        underlying: this._curr,
        notional: parseFloat(this._notional.replace(/,/g, '')),
        optionType: this._optionType,
        callPut: this._optionType === 'Touch' ? null : this._callType,
        maturity: this._maturityDate,
        asOfDate: this._valuationDate,
        strike: this._strike ? parseFloat(this._strike.replace(/,/g, '')) : null,
        notionalCurrency: this._notionalCurr,
        quotedCurrency: this._quoteCurr,
        barrier: this._barrier ? this._barrier : null,
        upDown: this._upDown ? this._upDown : null,
        inOut: this._inOut ? this._inOut : null,
        inputDelta: this._inputDelta ? Number(this._inputDelta) : null,
        inputVol: this._inputVol ? Number(this._inputVol) : null,
        inputPrice: this._inputPrice ? Number(this._inputPrice) : null
      };
      this.store.dispatch(new fromStore.LoadOutputs(outputModel));
    }
  }

  isNull(element, index, array): boolean {
    return ( element === null || element === undefined);
  }

  filterUnderlying(event) {
    const filterText = event.toUpperCase();
    this.filteredCurrencies = this.data.supportedCurrencies.filter ( curr =>
      curr.includes(filterText)
    );
  }

  isFormValid(): boolean {

    let isValid = true;

    const requiredFieldsArr: any[] = [
      this._optionType,
      this._curr,
      this._quoteCurr,
      this._notionalCurr,
      this._callType,
      this._maturityDate,
      this._notional
    ];

    if (this.optionChoice === 'Barrier' || this.optionChoice === 'Touch') {
      requiredFieldsArr.push(this._barrier);
      requiredFieldsArr.push(this._upDown);
      requiredFieldsArr.push(this._inOut);
    }

    // check mandatory fields for values
    requiredFieldsArr.map((field, index) => {
      if (field === undefined) {
        isValid = false;
      }
    });

    // @ts-ignore
    if (isValid === false) {
      this.openDialog();
      return isValid;
    }

    // one of the following must contain a value (strike, input delta, input price, input vol)
    if (this.mutuallyExclusive[0] === false && this._optionType !== 'Touch') {
      isValid = false;
      this.openAltDialog();
      return isValid;
    }

    return isValid;
  }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {

    this.filteredCurrencies = this.data.supportedCurrencies;

    if (changes && changes.data && changes.data.currentValue && changes.data.currentValue.optionTypes) {
      this.typeArr = Object.keys(changes.data.currentValue.optionTypes);
    }

    // frontend data modification for specific fields
    if (this.fxOutput.data) {

      for (const key of Object.keys(this.fxOutput.data.price)) {
        if (this._quoteCurr !== key && key !== 'USD') {
          delete this.fxOutput.data.price[key];
        }
      }

      for (const key of Object.keys(this.fxOutput.data.delta)) {
        if (this._quoteCurr !== key && key !== 'USD') {
          delete this.fxOutput.data.delta[key];
        }
      }

      for (const key of Object.keys(this.fxOutput.data.delta01)) {
        if (this._quoteCurr !== key && key !== 'USD') {
          delete this.fxOutput.data.delta01[key];
        }
      }

      for (const key of Object.keys(this.fxOutput.data.gamma01)) {
        if (this._quoteCurr !== key && key !== 'USD') {
          delete this.fxOutput.data.gamma01[key];
        }
      }

      for (const key of Object.keys(this.fxOutput.data.premium)) {
        if (this._quoteCurr !== key && key !== 'USD') {
          delete this.fxOutput.data.premium[key];
        }
      }

      for (const key of Object.keys(this.fxOutput.data.vega01)) {
        if (this._quoteCurr !== key && key !== 'USD') {
          delete this.fxOutput.data.vega01[key];
        }
      }

      for (const key of Object.keys(this.fxOutput.data.theta1d)) {
        if (this._quoteCurr !== key && key !== 'USD') {
          delete this.fxOutput.data.theta1d[key];
        }
      }


      const optionType = this.fxOutput.data.optionType;
      this.fxOutput.data.optionType = optionType.charAt(0).toUpperCase() + optionType.slice(1);

      if (this.fxOutput.data.callType === 'C') {
        this.fxOutput.data.callType = 'Call';
      }
      if (this.fxOutput.data.callType === 'P') {
        this.fxOutput.data.callType = 'Put';
      }

      this.fxOutput.data.strike = parseFloat((this.fxOutput.data.strike));
      this.fxOutput.data.break_even = parseFloat(Number(this.fxOutput.data.break_even).toFixed(4)).toLocaleString(undefined, {minimumFractionDigits: 4});
      this.fxOutput.data.intrinsic_value = parseFloat(Number(this.fxOutput.data.intrinsic_value).toFixed(4)).toLocaleString(undefined, {minimumFractionDigits: 4});
      this.fxOutput.data.pct_otm =  parseFloat(Number(this.fxOutput.data.pct_otm).toFixed(4)).toLocaleString(undefined, {minimumFractionDigits: 4});

      for (const key of Object.keys(this.fxOutput.data.price)) {
        this.fxOutput.data.price[key] = parseFloat(Number(this.fxOutput.data.price[key]).toFixed(4)).toLocaleString(undefined, {minimumFractionDigits: 4});
      }

      for (const key of Object.keys(this.fxOutput.data.premium)) {
        this.fxOutput.data.premium[key] = parseFloat(Number(this.fxOutput.data.premium[key]).toFixed(4)).toLocaleString(undefined, {minimumFractionDigits: 4});
      }
    }
  }
}
