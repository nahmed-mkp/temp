import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { MatSelect } from '@angular/material/select';

@Component({
    selector: 'app-app-grid-custom-cell-multi-types-editor',
    templateUrl: './app-grid-custom-cell-multi-types-editor.component.html',
    styleUrls: ['./app-grid-custom-cell-multi-types-editor.component.scss']
    })
export class AppGridCustomCellMultiTypesEditorComponent implements ICellEditorAngularComp, AfterViewInit {

    @ViewChild('target') private elementRef: ElementRef;
    @ViewChild('targetSelect') private matSelect: MatSelect;

    private params: any;
    public data: any[];
    public targetData: any;
    public type: string;


    agInit(params: any): void {
        this.params = params;
        this.data = this.params['dropDownData'];
        this.type = this.params['type'];
        this.targetData = this.params.value;
    }

    ngAfterViewInit(): void {
        if (this.type !== 'boolean') {
            this.elementRef.nativeElement.focus();
        } else {
            this.matSelect.focus();
        }
    }

    getValue() {
        return this.targetData;
    }

    public onOptionSelected(event) {
        this.targetData = event;
    }

}
