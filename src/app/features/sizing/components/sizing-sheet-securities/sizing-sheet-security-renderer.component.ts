import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'app-sizing-sheet-security-renderer',
    template: `<span>{{assetClass}}</span>`
})
export class SizingSheetSecurityRendererComponent implements ICellRendererAngularComp {

    public params: any;
    public assetClass: string;
    public status?: string;

    agInit(params: any): void {
        this.params = params;
        this.setAssetClassAndStatus(params);
    }

    refresh(params: any): boolean {
        this.params = params;
        this.setAssetClassAndStatus(params);
        return true;
    }

    private setAssetClassAndStatus(params) {
        this.assetClass = params.data ? params.data.assetClass : null;
        this.status = params.data ? params.data.status : null;
    }
}
