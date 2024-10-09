import { Component, OnInit, Input, EventEmitter, ChangeDetectionStrategy, Output, ViewChild, ElementRef } from '@angular/core';

// import * as fromUtils from '../../../../factories/utils';

import * as fromModels from '../../models';
import * as fromRootModels from '../../../../models';

@Component({
    selector: 'app-ext-report-iframe',
    templateUrl: './report-iframe.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportIFrameComponent implements OnInit {

    @Input() report: fromModels.Report;
    @Input() user: fromRootModels.AuthenticatedUser;
    @Output() onReportOpened: EventEmitter<fromModels.Report> = new EventEmitter<fromModels.Report>();

    constructor() { }

    ngOnInit() { }

    public reportOpened(e: any): void {
        if (this.report) {
            this.onReportOpened.emit(this.report);
        }
    }

    public getEmailLink(): string {
        return '';
        // return this.mailToService.buildMailToLink(this.getEmailHeader(), this.getEmailBody());
    }

    private getEmailHeader(): string {
        return 'Missing%20Report%20Link';
    }

    private getEmailBody(): string {
        return `The following ${this.report.type} link does not exist!%0A%0A${this.report.url}`;
    }


}
