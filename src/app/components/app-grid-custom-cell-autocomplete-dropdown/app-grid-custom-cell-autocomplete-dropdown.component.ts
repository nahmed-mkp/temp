import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
    selector: 'app-app-grid-custom-cell-autocomplete-dropdown',
    templateUrl: './app-grid-custom-cell-autocomplete-dropdown.component.html',
    styleUrls: ['./app-grid-custom-cell-autocomplete-dropdown.component.scss']
})
export class AppGridCustomCellAutocompleteDropdownComponent implements ICellEditorAngularComp, AfterViewInit {

    @ViewChild('target') private elementRef: ElementRef;

    private params: any;
    public data: any[];
    public selectedData: any;
    public targetField: string;
    public displayField: string;
    public initialValue: string;

    public myControl = new UntypedFormControl();
    public filteredOptions$: Observable<any[]>;

    constructor() {
        this.displayFn = this.displayFn.bind(this);
    }

    agInit(params: any): void {
        this.params = params;
        this.data = this.params['dropDownData'];
        this.targetField = this.params['targetField'];
        this.initialValue = this.params['initialValue'] || this.params.value || '';
        this.displayField = this.params['displayField'] || this.params['targetField'];

        this.myControl.setValue(this.initialValue);


        this.filteredOptions$ = this.myControl.valueChanges.pipe(
            startWith(this.initialValue),
            map(value => typeof value === 'string' ? value : value[this.targetField]),
            map(value => value !== '' ? this._filter(value) : this.data)
        )
    }

    ngAfterViewInit(): void {
        this.elementRef.nativeElement.focus();
    }

    getValue() {
        return this.selectedData;
    }

    public onOptionSelected(event) {
        this.selectedData = event;
    }

    public displayFn(option: any) {
        return typeof option === 'string' ? option : option[this.displayField]
        // return option && option[this.displayField];
    }

    private _filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.data.filter(option => option[this.targetField].toLowerCase().includes(filterValue));
    }
 }
