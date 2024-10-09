import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { ForwardPathsComponent } from './forwardpaths.component';

import { IBond, } from '../../../../models/renderer.models';

@Component({
    template: `<button mat-raised-button (click)="showFwdPaths()">...</button>`
})
export class ForwardPathsRendererComponent implements ICellRendererAngularComp {

    public params: any;
    public bond: IBond[] = [];
    public fwdPaths: any[] = [];

    constructor(private dialog: MatDialog) { }

    refresh(params: any): boolean {
        return true;
    }

    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    }

    agInit(params: any): void {
        this.params = params;
        this.bond = params.bond || null;
        this.fwdPaths = params.fwdPaths || [];
    }

    showFwdPaths(): void {
        this.dialog.open(ForwardPathsComponent, {
            panelClass: ['event-analysis-pop-up-panel', 'tool-bar-border-radius'],
            hasBackdrop: true,
            data: { 'fwdPaths': this.fwdPaths, 'bond': this.bond },
            width: '70rem',
            height: '50rem'
        });
    }
}
