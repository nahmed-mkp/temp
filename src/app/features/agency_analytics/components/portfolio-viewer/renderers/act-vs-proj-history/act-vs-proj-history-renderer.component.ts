import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { ActVsProjHistoryComponent } from './act-vs-proj-history.component';

import { IBond } from '../../../../models/renderer.models';

@Component({
    template: `<button mat-raised-button (click)="showHistory()">...</button>`
})
export class ActVsProjHistoryRendererComponent implements ICellRendererAngularComp {

    public params: any;
    public bond: IBond[] = [];
    public history: any[] = [];

    constructor(private dialog: MatDialog) { }

    refresh(params: any): boolean {
        return true;
    }

    afterGuiAttached?(params?: IAfterGuiAttachedParams): void {
    }

    agInit(params: any): void {
        this.params = params;
        this.bond = params.bond || null;
        this.history = params.history || [];
    }

    showHistory(): void {
        this.dialog.open(ActVsProjHistoryComponent, {
            panelClass: ['event-analysis-pop-up-panel', 'tool-bar-border-radius'],
            hasBackdrop: true,
            data: { 'history': this.history, 'bond': this.bond },
            width: '50rem',
            height: '50rem'
        });
    }
}
