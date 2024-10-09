import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import * as moment from 'moment';

import * as fromModels from '../../models';
import { Observable } from 'rxjs';
// import { FileItemStatus } from '../../../../components';

@Component({
    selector: 'app-tbareports-parser-request',
    templateUrl: './parser-request.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParserRequestComponent implements OnInit {

    @Input() missingDates: fromModels.MissingDate[];
    @Input() currentStep: fromModels.Step;
    @Input() request: fromModels.ParserRequest;
    @Input() cacheKey: string;
    @Input() results: any[];

    @Output() onUpdateRequest: EventEmitter<fromModels.ParserRequest> = new EventEmitter<fromModels.ParserRequest>();
    @Output() onFileUploadSuccess: EventEmitter<string> = new EventEmitter<string>();
    @Output() onFileUploadError: EventEmitter<string> = new EventEmitter<string>();
    @Output() onSaveResults: EventEmitter<string> = new EventEmitter<string>();
    @Output() onRefreshCache: EventEmitter<string> = new EventEmitter<string>();

    public dealers: string[] = ['BCI', 'GS', 'JPM'];

    constructor() { }

    ngOnInit() { }

    public changeDealer(e: any): void {
        this.onUpdateRequest.emit(Object.assign({}, this.request, {dealer: e.value}));
    }

    public changeDate(e: any): void {
        this.onUpdateRequest.emit(Object.assign({}, this.request, {asOfDate: moment(e.value).toDate()}));
    }

    public uploadSuccess(status: fromModels.FileItemStatus): void {
        this.onFileUploadSuccess.emit(status.status.replace(/\"/g, ''));
    }

    public uploadFailure(status: fromModels.FileItemStatus): void {
        this.onFileUploadError.emit(status.status.replace(/\"/g, ''));
    }

    public saveResults(): void {
        this.onSaveResults.emit(this.cacheKey);
    }

    public refreshCache(plotType: string): void {
        this.onRefreshCache.emit(plotType);
    }

}
