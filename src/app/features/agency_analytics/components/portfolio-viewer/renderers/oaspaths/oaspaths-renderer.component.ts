import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { OASPathsComponent } from './oaspaths.component';

import { IBond,  } from './../../../../models/renderer.models';

@Component({
    template: `<button mat-raised-button (click)="showOASPaths()">...</button>`
})
export class OASPathsRendererComponent implements ICellRendererAngularComp {

    public params: any;
    public bond: IBond[] = [];
    public oasPaths: any[] = [];

    constructor(private dialog: MatDialog) { }

    refresh(params: any): boolean {
        return true;
    }

    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    }

    agInit(params: any): void {
        this.params = params;
        this.bond = params.bond || null;
        this.oasPaths = params.oasPaths || [];
    }

    showOASPaths(): void {
        this.dialog.open(OASPathsComponent, {
            panelClass: ['event-analysis-pop-up-panel', 'tool-bar-border-radius'],
            hasBackdrop: true,
            data: { 'oasPaths': this.oasPaths, 'bond': this.bond },
            width: '70rem',
            height: '50rem'
        });
    }
}
