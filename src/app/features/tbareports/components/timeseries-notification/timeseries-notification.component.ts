import { Component, OnInit, Input, Output, ChangeDetectionStrategy, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-tbareports-notification',
    templateUrl: './timeseries-notification.component.html',
    styleUrls: ['./timeseries-notification.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesCacherNotificationComponent implements OnInit {

    @Input() error: string;
    @Input() completionStatus: string;
    @Input() oasCacheFailedStatus: string;
    @Input() oasCacheSuccessStatus: string;
    @Input() tsyCacheFailedStatus: string;
    @Input() tsyCacheSuccessStatus: string;
    @Input() oasCacheRefreshingStatus: boolean;
    @Input() tsyOasCacheRefreshingStatus: boolean;

    @Output() statusCleared: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    ngOnInit(): void { }

    clearStatus(type: string): void {
        this.statusCleared.emit(type);
    }
}
