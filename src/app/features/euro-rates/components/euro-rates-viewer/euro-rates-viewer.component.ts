import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragExit} from '@angular/cdk/drag-drop';
import { MatLegacyCheckboxChange as MatCheckboxChange } from '@angular/material/legacy-checkbox';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacySlideToggleChange as MatSlideToggleChange } from '@angular/material/legacy-slide-toggle';

import * as fromModels from '../../models';
import { EuroRateFileDownloadErrorDialogComponent } from '../euro-rate-file-download-error-dialog/euro-rate-file-download-error-dialog.component';

@Component({
  selector: 'app-euro-rates-viewer',
  templateUrl: './euro-rates-viewer.component.html',
  styleUrls: ['./euro-rates-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EuroRatesViewerComponent implements OnInit, OnChanges {

  @Input() euroRateFiles:{
    "avaliable-file": fromModels.EuroRateFile[],
    "download-file": fromModels.EuroRateFile[],
  }
  @Input() euroRateFilesLoadingStatus: boolean;
  @Input() euroRateFileDownloadProgress: fromModels.fileDownFileProgress[]

  // //Real time
  @Input() euroRateRealTimeConnection: boolean;
  // @Input() euroRateFileDownloadProgress: number;
  // @Input() euroRateGeneralEventUpdate: string;
  // @Input() euroRateFileOrder: any;

  @Output() startDownload: EventEmitter<fromModels.requestFilesDownloadPayload[]> 
    = new EventEmitter<fromModels.requestFilesDownloadPayload[]>();
  @Output() removeFileFromQueue: EventEmitter<number> = new EventEmitter<number>();
  @Output() toggleRealTime: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() reloadFiles: EventEmitter<void> = new EventEmitter();
  @Output() resetFileStatus: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() fileOrderChange: EventEmitter<fromModels.fileOrderChangeRecord> 
    = new EventEmitter<fromModels.fileOrderChangeRecord>();

  private selectedFileIndex: number[] = [];

  public filesBacklog: fromModels.EuroRateFile[] = [];
  public filesInDownloadQueue: fromModels.EuroRateFile[] = [];
  // [{
  //   id: 1,
  //   fileName: 'test 1',
  //   lastModifiedTime: 1565900980854,
  //   processName: 'riskbbg',
  //   status: 'downloading',
  //   errors: null,
  //   queueId: 1,
  //   asOfDate: 'N/A',
  //   filePath: 'N/A',
  //   downloadPriority: 1
  // },{
  //   id: 2,
  //   fileName: 'test 2',
  //   lastModifiedTime: 1565900980854,
  //   processName: 'riskbbg',
  //   status: 'downloading',
  //   errors: null,
  //   queueId: 1,
  //   asOfDate: 'N/A',
  //   filePath: 'N/A',
  //   downloadPriority: 2
  // },{
  //   id: 3,
  //   fileName: 'test 3',
  //   lastModifiedTime: 1565900980854,
  //   processName: 'riskbbg',
  //   status: 'downloading',
  //   errors: null,
  //   queueId: 1,
  //   asOfDate: 'N/A',
  //   filePath: 'N/A',
  //   downloadPriority: 3
  // }]

  constructor(private dialog: MatDialog, private ref: ChangeDetectorRef) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if(changes.euroRateFiles && changes.euroRateFiles.currentValue) {
      this.filesBacklog = [];
      this.filesInDownloadQueue = [];
      // this.euroRateFiles.forEach(file => {
      //   file.fileName = file.filePath.split('\\').pop();
      //   if(file.queueId === null || file.status === 'Finished') this.filesBacklog.push(file);
      //   else this.filesInDownloadQueue.push(file);
      // });

      // if(this.filesInDownloadQueue.length > 0) {

      // }
      console.log('this.euroRateFiles', this.euroRateFiles)
      this.filesBacklog = this.euroRateFiles["avaliable-file"];
      this.filesInDownloadQueue = this.euroRateFiles["download-file"];
      this.remapPriority();
    }

    // if(changes.euroRateFileDownloadProgress && changes.euroRateFileDownloadProgress.currentValue) {
    //   this.filesInDownloadQueue.forEach((file,index) => {
    //     file.progress = file.progress >= 100 ? 100 : this.euroRateFileDownloadProgress * index
    //   });
    // }

    // if(changes.euroRateFileOrder && changes.euroRateFileOrder.currentValue) {
    //   console.log('file order change', this.euroRateFileOrder);
    //   const cloneArray = [...this.filesInDownloadQueue];
    //   this.filesInDownloadQueue = this.euroRateFileOrder.map(orderId => {
    //     return cloneArray.filter(file => file.id === orderId)[0]
    //   })
    // }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }

    console.log('container info', event.container, event.previousContainer);
    // const newFileOrder = event.container.data.map((file: any) => file.id)
    // this.fileOrderChange.emit(newFileOrder);

    this.manageFileOrderChanged(event);
    this.remapPriority();
  }

  openErrorReport(file: fromModels.EuroRateFile) {
    this.dialog.open(EuroRateFileDownloadErrorDialogComponent, {
      data: file.errors,
      width: '25rem',
      height: '15rem',
      hasBackdrop: false,
      panelClass: 'event-analysis-pop-up-panel',
    })
  }

  onStartDownload() {
    const requestFilesDownload = this.filesInDownloadQueue
      .filter(file => file.queueId === null)
      .map(file => {
        return {requestId: file.id, downloadPriority: file.downloadPriority}
      });
    this.startDownload.emit(requestFilesDownload);
  }

  onRemoveFileFromQueue(event: CdkDragExit) {
    if(event.item.data.queueId !== null) this.removeFileFromQueue.emit(event.item.data.queueId);
  }
  onClickRemoveFileFromQueue(file: fromModels.EuroRateFile) {
    if(file.queueId !== null) this.removeFileFromQueue.emit(file.queueId);
  }

  onRealTimeConnectionChanged(event: MatSlideToggleChange) {
    console.log('current value', event.checked);
    this.toggleRealTime.emit(event.checked);
  }

  onResetStatusToNotDownloaded(id: number) {
    console.log('reset status', id)
    this.resetFileStatus.emit([id]);
  } 

  // Uitility ----------------------------------------------
  
  remapPriority() {
    let priortyCounter = 1;
    this.filesInDownloadQueue.forEach(file => {
      if(file.queueId === null) {
        file.downloadPriority = priortyCounter;
        priortyCounter++;
      }
    })
  }

  manageFileOrderChanged(event: CdkDragDrop<string[]>) {

    let fileOrderChangeRecord: any = {};
    if(event.container.id === 'avaliable-file') {
      fileOrderChangeRecord["avaliable-file"] = event.container.data.map((file: any) => file.id)
      if(event.previousContainer.id === 'download-file') {
        fileOrderChangeRecord["download-file"] = event.previousContainer.data.map((file: any) => file.id)
      }
    } else {
      fileOrderChangeRecord["download-file"] = event.container.data.map((file: any) => file.id)
      if(event.previousContainer.id === 'avaliable-file') {
        fileOrderChangeRecord["avaliable-file"] = event.previousContainer.data.map((file: any) => file.id)
      }
    }
    this.fileOrderChange.emit(fileOrderChangeRecord);
  }
}
