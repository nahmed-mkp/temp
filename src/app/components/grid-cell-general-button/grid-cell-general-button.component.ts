import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-grid-cell-general-button',
    templateUrl: './grid-cell-general-button.component.html',
    styleUrls: ['./grid-cell-general-button.component.scss']
})
export class GridCellGeneralButtonComponent implements ICellRendererAngularComp {

    private params: any;
    public buttonText: string;
    public isIconButton: boolean;
    public icon: string;

    constructor() { }

    agInit(params: any) {
        this.params = params;
        this.buttonText = params.buttonText;
        this.isIconButton = params.isIconButton;
        this.icon = params.icon;
    }

    refresh(params: any): boolean {
        return false;
    }

    public onClick() {
        if (this.params.click) {
            this.params.click(this.params);
        }
    }

}
