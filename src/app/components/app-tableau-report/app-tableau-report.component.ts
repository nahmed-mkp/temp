import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import * as fromEnvironment from './../../environments';
import * as fromRootModels from '../../models';
import uuidv1 from 'uuid/v1';

@Component({
    selector: 'app-tableau-report',
    template: `<app-iframe [src]="tableauUrl" [height]="height"></app-iframe>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppTableauReportComponent implements OnInit {

    @Input() src: string;
    @Input() isUserSpecific: boolean;
    @Input() user: fromRootModels.AuthenticatedUser; // not used for now...
    @Input() height: string;
    @Output() onReportOpened: EventEmitter<void> = new EventEmitter<void>();

    private tableauServer: string = fromEnvironment.environment.tableauUrl;

    constructor() { }

    ngOnInit() {
        this.onReportOpened.emit();
    }

    get tableauUrl(): string {
        return `${this.tableauServer}${this.src}&uuid=${uuidv1()}&:refresh=y`;
    }
}

