import { Directive, ElementRef, forwardRef, HostListener, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';
import { Subscription } from 'rxjs';
import { formatNumber } from '@angular/common';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: 'input[matCapitalInput]',
    providers: [
        { provide: MAT_INPUT_VALUE_ACCESSOR, useExisting: MatInputCapitalInputDirective },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MatInputCapitalInputDirective),
            multi: true
        }
    ]
})
export class MatInputCapitalInputDirective implements ControlValueAccessor {
    locale = 'en';
    decimalMarker = '.';

    constructor(private elementRef: ElementRef<HTMLInputElement>) {
        console.log('created directive');
    }

    private _value: string | null;

    get value(): string | null {
        return this._value;
    }

    @Input('value')
    set value(value: string | null) {
        this._value = value;
        this.formatValue(value);
    }

    @HostListener('input', ['$event.target.value'])
    onInput(value) {
        // here we cut any non numerical symbols
        this._value = value.replace(/[^\d.-]/g, '');

        // here to notify Angular Validators
        this._onChange(this._value);
    }

    _onChange(value: any): void {
    }

    @HostListener('blur')
    _onBlur() {
        /**
         * Adding thousand separators
         */
        this.formatValue(this._value);
    }

    @HostListener('focus')
    onFocus() {
        this.unFormatValue();
    }

    /**
     * ControlValueAccessor Implementation
     */
    writeValue(value: any): void {
        this._value = value;
        this.formatValue(this._value); // format Value
    }
    registerOnChange(fn: any): void {
        this._onChange = fn;
    }
    registerOnTouched(fn: any): void {
    }
    setDisabledState?(isDisabled: boolean): void {
    }

    /**
     * Helper Methods
     */

    private formatValue(value: string | null) {
        if (value !== null) {
            this.elementRef.nativeElement.value = this.numberWithCommas(value);
        } else {
            this.elementRef.nativeElement.value = '';
        }
    }

    private unFormatValue() {
        const value = this.elementRef.nativeElement.value;
        this._value = value.replace(/[^\d.-]/g, '');
        if (value) {
            this.elementRef.nativeElement.value = this._value;
        } else {
            this.elementRef.nativeElement.value = '';
        }
    }

    private numberWithCommas(value: string): string {
        if (typeof(value) === 'number') {
            value = Math.round(parseInt(value, null)).toString();
        }
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}
