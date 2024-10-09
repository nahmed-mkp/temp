import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, AfterViewInit } from '@angular/core';

import * as fromEnvironments from './../../environments';
import * as fromRootModels from '../../models';

@Component({
    selector: 'app-ssrs-report',
    template: `<app-iframe [src]="SSRSUrl" [height]="height"></app-iframe>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppSSRSReportComponent implements OnInit, AfterViewInit {

    @Input() src: string;
    @Input() isUserSpecific: boolean;
    @Input() user: fromRootModels.AuthenticatedUser;
    @Input() height: string;
    @Output() onReportOpened: EventEmitter<void> = new EventEmitter<void>();

    private ssrsServer: string = fromEnvironments.environment.ssrsUrl;

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.onReportOpened.emit();
    }

    get SSRSUrl(): string {
        return `${this.ssrsServer}?${this.src}${this.getUserId()}&rs:embed=true`;
    }

    getUserId(): string {
        return (this.isUserSpecific && this.user) ? `&UserId=${this.user.id}` : '';
    }
}

