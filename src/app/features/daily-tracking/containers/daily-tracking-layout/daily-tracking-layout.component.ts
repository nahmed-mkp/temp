import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, BehaviorSubject, combineLatest } from 'rxjs'

import * as fromModels from '../../models';
import * as fromStore from '../../store';

import * as moment from 'moment';

import { AuthService } from 'src/app/services';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-daily-tracking-layout',
  templateUrl: './daily-tracking-layout.component.html',
  styleUrls: ['./daily-tracking-layout.component.scss']
})
export class DailyTrackingLayoutComponent implements OnInit, OnDestroy {

  public asOfDate$: Observable<string>;
  public tsySwaps$: Observable<fromModels.TsySwap[]>;
  public mbsRaws$: Observable<any[]>;
  public mbsRisks$: Observable<any[]>;
  public mbsOas$: Observable<any[]>;
  public csCloses$: Observable<any[]>;

  public useSOFR$: Observable<boolean>;
  public useSOFRSubscription$: Subscription;

  public useLegacy$: Observable<boolean>;
  public useLegacySubscription$: Subscription;

  public date = moment().format('MM/DD/YYYY');
  public dateSubscription$: Subscription;

  public loadingStatus$: Observable<boolean>;
  private timer: any;

  public mode$: Observable<string>;
  public modeSubscription$: Subscription;
  public streamingStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public mode: string;
  public compaceViewingMode: boolean;
  public useSOFR: boolean;
  public useLegacy: boolean;

  public restartingTradewebExcel$: Observable<boolean>;
  public restartedTradewebExcel$: Observable<boolean>;
  public restartTradewebExcelError$: Observable<string>;
  public restartTradewebSubscription$: Subscription;

  public intradayMetadata$: Observable<fromModels.IntradayMetaData>;
  public intradayMetadataLoading$: Observable<boolean>;
  public intradayMetadataLoaded$: Observable<boolean>;
  public intradayMetadataError$: Observable<string>;

  public showDurations = false;

  constructor(
    private store: Store<fromStore.DailyTrackingState>,
    public authService: AuthService, 
    private snackbar: MatSnackBar, ) {
    if (window.location.href.includes('compact')) {
      this.compaceViewingMode = true;
    } else {
      this.compaceViewingMode = false;
    }
  }

  ngOnInit() {
    this.tsySwaps$ = this.store.select(fromStore.getTsySwaps);
    this.mbsRaws$ = this.store.select(fromStore.getMbsRaws);
    this.mbsRisks$ = this.store.select(fromStore.getMbsRisks);
    this.mbsOas$ = this.store.select(fromStore.getMbsOas);
    this.csCloses$ = this.store.select(fromStore.getCSCloses);
    this.loadingStatus$ = this.store.select(fromStore.getDataLoadingState);

    this.useSOFR$ = this.store.select(fromStore.getUseSOFR);
    this.useSOFRSubscription$ = this.useSOFR$
      .subscribe((useSOFR) => {
        this.useSOFR = useSOFR;
        const dt_mmt = moment(this.date, 'MM/DD/YYYY');
        if (dt_mmt < moment(moment().format('MM/DD/YYYY'), 'MM/DD/YYYY')) {
          this.toggleStreaming(false);
          this._loadHistoricalData({ mode: 'close', useLegacy: this.useLegacy, useSOFR: this.useSOFR, asOfDate: this.date });
        } else if (this.mode === 'close') {
          this.toggleStreaming(false);
          this._loadData({ mode: 'close', useLegacy: this.useLegacy, useSOFR: this.useSOFR });
        } else {
          this.toggleStreaming(true);
        }
      });

    this.useLegacy$ = this.store.select(fromStore.getLegacyMode);
    this.useLegacySubscription$ = this.useLegacy$
      .subscribe((useLegacy) => {
        this.useLegacy = useLegacy;
        const dt_mmt = moment(this.date, 'MM/DD/YYYY');
        if (dt_mmt < moment(moment().format('MM/DD/YYYY'), 'MM/DD/YYYY')) {
          this.toggleStreaming(false);
          this._loadHistoricalData({ mode: 'close', useLegacy: this.useLegacy, useSOFR: this.useSOFR, asOfDate: this.date });
        } else if (this.mode === 'close') {
          this.toggleStreaming(false);
          this._loadData({ mode: 'close', useLegacy: this.useLegacy, useSOFR: this.useSOFR });
        } else {
          this.toggleStreaming(true);
        }
      });

    this.mode$ = this.store.select(fromStore.getMode);
    this.modeSubscription$ = this.mode$
      .subscribe((mode) => {
        this.mode = mode;
        const dt_mmt = moment(this.date, 'MM/DD/YYYY');
        if (dt_mmt < moment(moment().format('MM/DD/YYYY'), 'MM/DD/YYYY')) {
          this.toggleStreaming(false);
          this._loadHistoricalData({ mode: 'close', useLegacy: this.useLegacy, useSOFR: this.useSOFR, asOfDate: this.date });
        } else if (mode === 'close') {
          this.toggleStreaming(false);
          this._loadData({ mode: 'close', useLegacy: false, useSOFR: true });
        } else {
          this.toggleStreaming(true);
        }
      });

    this.asOfDate$ = this.store.select(fromStore.getAsOfDate);
    this.dateSubscription$ = this.asOfDate$
      .subscribe((date) => {
        if (date) {
          this.date = date;
          const dt_mmt = moment(this.date, 'MM/DD/YYYY');
          if (dt_mmt < moment(moment().format('MM/DD/YYYY'), 'MM/DD/YYYY')) {
            this.toggleStreaming(false);
            this._loadHistoricalData({ mode: 'close', useLegacy: this.useLegacy, useSOFR: this.useSOFR, asOfDate: this.date });
          } else {
            this.toggleStreaming(true);
          }
        }
      });

    this.restartingTradewebExcel$ = this.store.select(fromStore.getTradewebExcelRestartingStatus);
    this.restartedTradewebExcel$ = this.store.select(fromStore.getTradewebExcelRestartedStatus);
    this.restartTradewebExcelError$ = this.store.select(fromStore.getTradewebExcelRestartErrorStatus);

    this.restartTradewebSubscription$ = combineLatest(this.restartingTradewebExcel$,
      this.restartedTradewebExcel$, this.restartTradewebExcelError$).subscribe(
        ([restartingTradeweb, restartedTradeweb, restartError]) => {
          if (restartingTradeweb) {
            this.snackbar.open('Restarting Tradeweb! Please wait...', '', {duration: 3000});
          } else if (restartedTradeweb) {
            this.snackbar.open('Tradeweb restarted! Give it a couple more minutes...', '', { duration: 3000 });
          } else if (restartError !== undefined)  {
            this.snackbar.open('Failed to restart tradeweb. Please contact AppDev!', '', { duration: 3000 });
          }
        });

    this.intradayMetadata$ = this.store.select(fromStore.getTrackingIntrdayMetadata);
    this.intradayMetadataLoading$ = this.store.select(fromStore.getTrackingIntrdayMetadataLoading);
    this.intradayMetadataLoaded$ = this.store.select(fromStore.getTrackingIntrdayMetadataLoaded);
    this.intradayMetadataError$ = this.store.select(fromStore.getTrackingIntrdayMetadataError);

    // Load Intraday Meta data 
    this.store.dispatch(new fromStore.LoadIntradayMetaData());
  }

  ngOnDestroy() {
    clearInterval(this.timer);
    if (this.modeSubscription$) {
      this.modeSubscription$.unsubscribe();
    }
    if (this.dateSubscription$) {
      this.dateSubscription$.unsubscribe();
    }
    if (this.restartTradewebSubscription$) {
      this.restartTradewebSubscription$.unsubscribe();
    }
    if (this.useSOFRSubscription$) {
      this.useSOFRSubscription$.unsubscribe();
    }
  }

  changeDate(date: string): void {
    this.date = date;
    if (this.date === moment().format('MM/DD/YYYY')) {
        // Enable Live streaming;
        this.toggleStreaming(true);
    } else {
        // Disable Live Streaming;
        this.toggleStreaming(false);
        this._loadHistoricalData({ mode: 'close', useLegacy: this.useLegacy, useSOFR: this.useSOFR, asOfDate: this.date});
    }
  }

  toggleStreaming(streamingStatus) {
    if (streamingStatus === true) {
      clearInterval(this.timer);
      this._loadData({ mode: 'live', useLegacy: this.useLegacy, useSOFR: this.useSOFR });
      this.timer = setInterval(() => this._loadData({ mode: 'live', useLegacy: this.useLegacy, useSOFR: this.useSOFR }), 2000);
      this.streamingStatus$.next(true);
    } else {
      clearInterval(this.timer);
      this.streamingStatus$.next(false);
    }
  }

  changeMode(e): void {
    this.store.dispatch(new fromStore.ChangeMode());
  }

  cellEditingStarted(e): void {
    this.toggleStreaming(false);
  }

  updateUserInputs(e: any): void {
    this.store.dispatch(new fromStore.UpdateUserInputs(e));
  }

  takeSnapshot(e: any): void {
    this.store.dispatch(new fromStore.TakeSnapshot());
  }

  useSOFRSpreads(payload: boolean): void {
    this.store.dispatch(new fromStore.ToggleLegacyMode(false));
    this.store.dispatch(new fromStore.ToggleSOFRSpreads(payload));
  }

  useLegacyMode(payload: boolean): void {
    this.store.dispatch(new fromStore.ToggleSOFRSpreads(!payload));
    this.store.dispatch(new fromStore.ToggleLegacyMode(payload));
  }

  restartTradewebExcel(): void {
    const curUser = this.authService.getUser();
    this.store.dispatch(new fromStore.RestartTradewebExcelSheet(curUser));
  }

  openCompactMode(e: any): void {
    window.open(window.location.href + '/compact', '_blank', 'width=1000,height=480,resizable=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,directories=no,status=no');
  }

  loadIntradayPlot(param: fromModels.IntradayRequestAndMetaData): void {
    var baseUrl = window.location.href;
    if (baseUrl.endsWith('/compact')) { 
      baseUrl = baseUrl.replace('/compact', '');
    }
    window.open(baseUrl + `/chart`, '_blank', 'width=1000,height=500,resizable=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,directories=no,status=no,title=Foobar');
    window.localStorage.setItem('dailyTrackingChart', JSON.stringify(param));
  }

  loadEODPlot(param: fromModels.EODRequestAndMetaData): void {
    var baseUrl = window.location.href;
    if (baseUrl.endsWith('/compact')) {
      baseUrl = baseUrl.replace('/compact', '');
    }
    window.open(baseUrl + `/eodchart`, '_blank', 'width=1000,height=500,resizable=no,toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,directories=no,status=no,title=Foobar');
    window.localStorage.setItem('dailyTrackingChartEOD', JSON.stringify(param));
  }
  

  private _loadData(payload: fromModels.ITrackingInput): void {
    this.store.dispatch(new fromStore.LoadData(payload));
  }

  private _loadHistoricalData(payload: fromModels.ITrackingInput): void {
    this.store.dispatch(new fromStore.LoadHistoricalData(payload));
  }

  public toggleShowDurations(showDurations: boolean): void { 
    this.showDurations = showDurations;
  }

}
