import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs'

import * as fromModels from '../../models';
import * as fromStore from '../../store';

@Component({
  selector: 'app-euro-rates-layout',
  templateUrl: './euro-rates-layout.component.html',
  styleUrls: ['./euro-rates-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EuroRatesLayoutComponent implements OnInit, OnDestroy {

  public euroRateFiles$: Observable<fromModels.EuroRateFile[]>;
  public euroRateFilesLoadingStatus$: Observable<boolean>;
  public euroRateFileDownloadProgress$: Observable<any>;
  public euroRateFilesComplete$: Observable<{
    "avaliable-file": fromModels.EuroRateFile[],
    "download-file": fromModels.EuroRateFile[],
  }>;

  // Real Time
  // public euroRateRealTimeConnection$: Observable<boolean>;
  // public euroRateFileDownloadProgress$: Observable<number>;
  // public euroRateGeneralEventUpdate$: Observable<string>;
  // public euroRateFileOrder$ : Observable<any>;
  private subscription: Subscription;
  // private timerForUpdatingFileDownloadStatus: any;

  constructor( private store: Store<fromStore.EuroRateState>,) { }

  ngOnInit() {
    this.euroRateFiles$ = this.store.select(fromStore.getEuroRatesFileListWithDownloadProgress);
    this.euroRateFilesComplete$ = this.store.select(fromStore.getEuroRatesFileWithSortedOrderAndDownloadProgress);
    this.euroRateFilesLoadingStatus$ = this.store.select(fromStore.getloadingEuroRatesFileListStatus);
    this.euroRateFileDownloadProgress$ = this.store.select(fromStore.getFileDownloadProgress);

    this.subscription = this.euroRateFilesComplete$.subscribe(files => {
      const queueIdes = [];
      files["download-file"].forEach(file => {
        if(file.queueId !== null && file.progress !== 100) queueIdes.push(file.queueId)
      });

      if(queueIdes.length > 0) {
        setTimeout(() => {
          this.store.dispatch(new fromStore.GetFileDownloadProgress(queueIdes));
        }, 3000)
        
      }
    })

    // //Real Time
    // this.euroRateRealTimeConnection$ = this.store.select(fromStore.getEuroRateRealTimeConnection);
    // this.subscription = this.euroRateRealTimeConnection$.subscribe(status => {
    //   if(status === true) {
    //     this.store.dispatch(new fromStore.UpdateFileDownloadProgress());
    //     this.store.dispatch(new fromStore.listenToChangeFileOrder());
    //   }
    // });
    // this.euroRateFileDownloadProgress$ = this.store.select(fromStore.getEuroRateFileDownloadProgress);
    // this.euroRateGeneralEventUpdate$ = this.store.select(fromStore.getEuroRateGeneralEventUpdate);
    // this.euroRateFileOrder$ = this.store.select(fromStore.getEuroRateFileOrder);
  }

  ngOnDestroy() {
    if(this.subscription) this.subscription.unsubscribe();
    // this.store.dispatch(new fromStore.RemoveEuroRateRealTimeConnection());
  }

  startDownload(payload: fromModels.requestFilesDownloadPayload[]) {
    console.log('download file', payload);
    this.store.dispatch(new fromStore.DownloadFiles(payload));
  }

  removeFileFromQueue(payload: number) {
    console.log('queue id', payload);
    this.store.dispatch(new fromStore.UnqueueDownloadingFile(payload));
  }

  resetFileStatus(ids: number[]) {
    this.store.dispatch(new fromStore.ResetFileStatus(ids));
  }

  changeFileOrder(payload: fromModels.fileOrderChangeRecord) {
    this.store.dispatch(new fromStore.changeFileOrder(payload));
  }
  

  // removeEuroRateRealTimeConnection() {
  //   this.store.dispatch(new fromStore.RemoveEuroRateRealTimeConnection());
  // }

  // toggleRealTime(status: boolean) {
  //   if(status) this.store.dispatch(new fromStore.UpdateFileDownloadProgress());
  //   else this.store.dispatch(new fromStore.RemoveEuroRateRealTimeConnection());
  // }


}
