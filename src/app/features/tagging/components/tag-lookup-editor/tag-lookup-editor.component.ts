import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { BehaviorSubject } from 'rxjs';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
    selector: 'app-tag-lookup-editor',
    templateUrl: './tag-lookup-editor.component.html',
    styleUrls: ['./tag-lookup-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagLookupEditorComponent implements ICellRendererAngularComp, AfterViewInit {

    @ViewChild('input', { read: ViewContainerRef }) public input: ViewContainerRef;
    @ViewChild('matAutocomplete') public matAutocomplete: MatAutocomplete;

    public values: any[];
    public selectedValue: any;

    public tagCtrl = new UntypedFormControl();
    public filteredValues$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    public params: any;

    constructor() { }

    agInit(params: any): void {
        this.values = params.values;
        this.params = params;

        this.tagCtrl.valueChanges
            .subscribe((value) => {
                if (value === '' || value === null) {
                    this.filteredValues$.next(this.values);
                } else {
                    this.filteredValues$.next(this._filter(value));
                }
            });

        this.setValue(params.value);
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.input.element.nativeElement.focus());
    }

    refresh(params: any): boolean {
        this.values = params.values;
        this.setValue(params.value);
        return true;
    }

    getValue(): any {
        return this.tagCtrl.value;
    }

    onValueChanged(e: any): any {
        this.setValue(e.target.value);
    }

    onSelectionChanged(value: any): any {
        this.setValue(value);
    }

    public setValue(value: string): void {
        this.selectedValue = value;
        this.tagCtrl.setValue(this.selectedValue);
    }

    private _filter(inputValue: string): string[] {
        const filterValue = inputValue.toLowerCase();
        return this.values.filter(value => value.toLowerCase().includes(filterValue) && value !== '');
    }

}
