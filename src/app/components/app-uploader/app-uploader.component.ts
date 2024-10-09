import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';

export interface FileItemStatus {
    file: string;
    status: string;
    data?: any;
}

import * as fromStore from '../../store';
import * as fromModels from '../../models';

@Component({
    selector: 'app-uploader',
    templateUrl: './app-uploader.component.html',
    styleUrls: ['./app-uploader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppUploaderComponent implements OnInit {

    public hasBaseDropZoneOver = false;

    uploader: FileUploader;
    response: any;

    @Input() url: string;
    @Input() disableMultipart = false;
    @Input() allowMultiple = false;
    @Input() allowSingle = true;
    @Input() showQueue = true;
    @Input() showResponse = false;
    @Input() additionalInputData: any = null;

    @Output() onFailedItem: EventEmitter<FileItemStatus> = new EventEmitter<FileItemStatus>();
    @Output() onSuccessItem: EventEmitter<FileItemStatus> = new EventEmitter<FileItemStatus>();

    private authToken: string;

    constructor(private store: Store<fromStore.RootState>) {
        this.store.select(fromStore.getAuthenticatedUser)
            .subscribe((user: fromModels.IAuthenticatedUser) => {
                this.authToken = user.accessToken;
        });

    }

    ngOnInit() {
        this.uploader = new FileUploader({url: this.url,  authToken: `Bearer ${this.authToken}`, additionalParameter: this.additionalInputData ? this.additionalInputData : {}});
        console.warn(this.uploader)
        this.uploader.onErrorItem = ((item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            this.onFailedItem.emit({file: item._file.name, status: response});
        });
        this.uploader.onSuccessItem = ((item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
            this.onSuccessItem.emit({file: item._file.name, status: response});
        });
        this.hasBaseDropZoneOver = false;
        this.response = null;
        this.uploader.response.subscribe( res => this.response = res );
    }

    ngOnChanges(changes: SimpleChanges): void {
      //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
      //Add '${implements OnChanges}' to the class.
      if(changes && changes.additionalInputData && changes.additionalInputData.currentValue){
        console.warn(this.additionalInputData)
      }
    }
    

    public fileOverBase(e: any): void {
      this.hasBaseDropZoneOver = e;
    }
}
