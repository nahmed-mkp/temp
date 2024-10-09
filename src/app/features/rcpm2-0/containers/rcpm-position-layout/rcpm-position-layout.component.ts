import { Component, OnInit, ChangeDetectionStrategy, HostBinding, OnDestroy, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';

import * as fromStore from '../../store';
import * as fromSocketStore from './../../../../shared/custom/sockets/store';
import * as fromModel from '../../models';
import moment from 'moment';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-rcpm-position-layout',
  templateUrl: './rcpm-position-layout.component.html',
  styleUrls: ['./rcpm-position-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RcpmPositionLayoutComponent implements OnInit, OnDestroy, OnChanges {

  @Input() positionLookups: any;
  @Input() mode: 'live' | 'close';
  @Input() source: 'RCPM' | 'PRIZM';

  // @Input() positionPresetLayout: any;
  @Input() nonlinearSupportGrouping: any;
  @Input() layout: string;
  // @Input() layoutState: any;
  @Input() isActive: boolean;
  @Input() currentDate: string;
  @Input() targetManager: string;
  @Input() selectedUserLayout: any;
  @Input() targetColumn: any;

  @Input() IsUnsettledClosingTradeStillAccruing: boolean;
  @Input() IsExcludeTestFundEnabled: boolean;

  @Output() updateLayout = new EventEmitter<{layout: string; newTab: boolean}>();
  @Output() boardcastDisplayColumns = new EventEmitter<any>();
  @Output() sendResetTimerFunction = new EventEmitter<any>();

  @HostBinding('class') classes = 'standard-grid-layout';

  // UI -------------------------------------------------

  public activateSpinning$: Observable<boolean>;
  public activateSpinning = true;

  public activeAsOfDate: Date;
  public maxLastUpdate: string;
  public filters: {[property: string]: number}[] = [];
  public tradersName: string[];
  public targetTrader: string;

  public subScreenOpen =  false;
  public activeSubScreen: 'execution' | 'tax' | 'simulation' | 'profitLoss';
  public selectedRow: any;

  public activeSideScreen: string;
  public activeSideScreenCollection: string[] = [];

  private refreshTimer: any;
  private refreshTimerForNonlinearData: any;
  private refreshTimerForNonlinearPnlData: any;
  public updateCycle = 15;               // 20 seconds refresh cycle default for general linear data
  public updateCycleNonlinear = 60 * 10; // 10 mins for nonlinear data loading
  public updateCycleNonlinearPnl = 30;   // 30 seconds refresh cycle for nonlinear pnl risk data loading
  public socketLivenessCheckInterval = 90;

  public positionUpdateTs$: Observable<string>;

  public rowGroupings: string[];
  public isOnCurrentDate$: Observable<boolean>;

  private subscription: Subscription[] = [];
  private firstDataFetchingFinished = false;
  private dataLoadingDelayTimer: any;
  private isLayoutManagementOpen = false;

  private selectDataPath: fromModel.DataPath;


  public avaliableLayouts: any = [];   // Remove ???
  public targetLayout: any[];          // Remove ???

  public excutionPanelFullyExpansionMode = false;
  // Data ------------------------------------------------------------------

  public positionAndGroupingData$: Observable<any[]>;

  public executionData$: Observable<any[]>;
  public positionloadingStatus$: Observable<boolean>;
  public executionloadingStatus$: Observable<boolean>;
  public combineDataLoadedStatus$: Observable<boolean>;

  public traders$: Observable<string[]>;
  public primaryGroupingNameIdMaping$: Observable<any>;

  public positionInfo$: Observable<any>;
  public positionInfoLoadingStatus$: Observable<boolean>;
  public positionInfoLoadedStatus$: Observable<boolean>;
  public positionInfoError$: Observable<string>;

  public nonlinearData$: Observable<any>;
  public nonlinearDataLoadingStatus$: Observable<boolean>;
  public nonlinearDataLoadedStatus$: Observable<boolean>;
  public nonlinearPnlData$: Observable<any>;
  public nonlinearPnlDataLoadingStatus$: Observable<boolean>;
  public nonlinearPnlDataLoadedStatus$: Observable<boolean>;

  public dataRetrievalMethod$: Observable<string>;
  public dataRetrievalMethod: string;

  // Sockets ---------------------------------------------------------------------------------------

  public socketChannelData$: Observable<any>;
  public socketConnections$: Observable<any>;

  // Layout Config and Style -----------------------------------------------------------------------

  public layoutStyle$: any;
  public layoutStyle: any;
  public positionStaticLayouts: any;

  public userGridConfig$: Observable<any>;
  public userGroupingStyle$: Observable<any>;
  public userLayoutStyle$: Observable<any>;
  public systemStyle$: Observable<any>;
  public userLayoutAndConfigLoading$: Observable<boolean>;
  public userLayoutAndConfigLoaded$: Observable<boolean>;

  // TradeName --------------------------------------------------------------------------------------

  public clientServicesTradeThemes$: Observable<any>;

  public pmPodDetails$: Observable<any>;
  public pmPodDetailsLoading$: Observable<boolean>;
  public pmPodDetailsLoaded$: Observable<boolean>;
  public pmPodDetailsError$: Observable<string>;
  public crossPodStratergyMapping$: Observable<any>;

  public pms$ = new Subject();
  public creatingTradeName$: Observable<boolean>;
  public createdTradeName$: Observable<boolean>;
  public createTradeNameSuccessMessage$: Observable<string>;
  public createTradeNameFailureMessage$: Observable<string>;

  public multiAllocTradeNames$: Observable<fromModel.IMultiAllocTradeName[]>;
  public multiAllocTradeNamesLoading$: Observable<boolean>;
  public multiAllocTradeNamesLoaded$: Observable<boolean>;
  public multiAllocTradeNamesError$: Observable<string>;

  public multiAllocationSplit$: Observable<fromModel.IMultiAllocationSplit[]>;
  public multiAllocationSplitLoading$: Observable<boolean>;
  public multiAllocationSplitLoaded$: Observable<boolean>;
  public multiAllocationSplitError$: Observable<string>;

  public pmPodDetailsSubscription$: Subscription;

  public selectedDataPath$: BehaviorSubject<fromModel.DataPath> = new BehaviorSubject<fromModel.DataPath>(null);

  public targetCommonGrouping$: Observable<string[]>;

  // Regression ---------------------------------------------------------------------------------------
  public regressionLoading$: Observable<boolean>;
  public regressionDynamicColumns$: Observable<any>;
  public regressionNonlinearData$: Observable<any>;
  public gridClearingStatus$: Observable<boolean>;
  public displayMode$: Observable<string>;

  public latestAvailableDate$: Observable<any>;

  constructor(private store: Store<fromStore.RCPM2State>, private globalStore: Store<fromSocketStore.SocketState>) {
    this.resetTimer = this.resetTimer.bind(this);

    this.isOnCurrentDate$ = this.store.select(fromStore.getIsOnCurrentDate);

    this.pmPodDetails$ = this.store.select(fromStore.getTradeNamePMPodDetails);
    this.pmPodDetailsLoading$ = this.store.select(fromStore.getTradeNameDetailsLoading);
    this.pmPodDetailsLoaded$ = this.store.select(fromStore.getTradeNameDetailsLoaded);
    this.pmPodDetailsError$ = this.store.select(fromStore.getTradeNameDetailsError);
    this.crossPodStratergyMapping$ = this.store.select(fromStore.getCrossPodStratergyMapping);

    this.clientServicesTradeThemes$ = this.store.select(fromStore.getClientServicesTradeThemes);

    this.creatingTradeName$ = this.store.select(fromStore.getTradeNameCreatingTradeNameStatus);
    this.createdTradeName$ = this.store.select(fromStore.getTradeNameCreatedTradeNameStatus);
    this.createTradeNameSuccessMessage$ = this.store.select(fromStore.getTradeNameCreateTradeNameSuccessMessage);
    this.createTradeNameFailureMessage$ = this.store.select(fromStore.getTradeNameCreateTradeNameFailureMessage);

    this.multiAllocTradeNames$ = this.store.select(fromStore.getTradeNameMultipleAllocTradeNames);
    this.multiAllocTradeNamesLoading$ = this.store.select(fromStore.getTradeNameMultipleAllocTradeNamesLoading);
    this.multiAllocTradeNamesLoaded$ = this.store.select(fromStore.getTradeNameMultipleAllocTradeNamesLoaded);
    this.multiAllocTradeNamesError$ = this.store.select(fromStore.getTradeNameMultipleAllocTradeNamesError);

    this.multiAllocationSplit$ = this.store.select(fromStore.getTradeNameMultipleAllocationSplit);
    this.multiAllocationSplitLoading$ = this.store.select(fromStore.getTradeNameMultipleAllocationSplitLoading);
    this.multiAllocationSplitLoaded$ = this.store.select(fromStore.getTradeNameMultipleAllocationSplitLoaded);
    this.multiAllocationSplitError$ = this.store.select(fromStore.getTradeNameMultipleAllocationSplitError);

    this.latestAvailableDate$ = this.store.select(fromStore.getLatestAvailableDate);
    this.dataRetrievalMethod$ = this.store.select(fromStore.getDataRetrievalMethod);

    this.socketChannelData$ = this.globalStore.select(fromSocketStore.getSocketChannelData);
    this.socketConnections$ = this.globalStore.select(fromSocketStore.getSocketConnections);

    this.positionUpdateTs$ = this.store.select(fromStore.getPositionTimeStamp);

    this.subscription.push(this.pmPodDetails$
      .subscribe((pmPodDetails) => {
        if (pmPodDetails && pmPodDetails.pms) {
          this.pms$.next(Object.keys(pmPodDetails.pms).map((key: string) => {
            return pmPodDetails.pms[key];
          }));
        }
    }));

    this.subscription.push(this.socketChannelData$
      .subscribe((data) => {
        const socket_timestamp = moment(data.timestamp);
        let position_timestamp;
        this.positionUpdateTs$.pipe(take(1)).subscribe( ts => {
          position_timestamp = moment(ts);
        });
        const diff = socket_timestamp.diff(position_timestamp, 'seconds');
        if (diff > 90) {
          // this.loadPositionsData(this.dataRetrievalMethod, this.getTargetDate());
          this.loadPositionsData('http', this.getTargetDate());
        }
      })
    );

  }

  ngOnInit() {
    const currentTime = this.currentDate &&  this.currentDate.split('/').join('-');

    // Data ---------------------------------------------------------------------

    // this.store.dispatch(new fromStore.LoadDataRetrievalMode);
    this.positionAndGroupingData$ = this.store.select(fromStore.getSelectedLayoutPositionsWithGroupings(), this.layout);
    this.positionloadingStatus$ = this.store.select(fromStore.getSelectedLayoutPositionLoading(), this.layout);
    this.subscription.push(this.store.select(fromStore.getSelectedLayoutPositionLoaded(), this.layout).subscribe(positionLoadedStatus => {
      if (positionLoadedStatus === true) {
        this.activateSpinning = false;
        this.store.dispatch(new fromStore.ActivateSpinning(false));
      }
    }));
    this.combineDataLoadedStatus$ = this.store.select(fromStore.getSelectedLayoutCombineLoadedStatus(), this.layout);

    this.nonlinearData$ = this.store.select(fromStore.getSelectedLayoutNonlinearAggData(), this.layout);
    this.nonlinearDataLoadingStatus$ = this.store.select(fromStore.getSelectedLayoutNonlinearAggDatasLoading(), this.layout);
    this.nonlinearDataLoadedStatus$ = this.store.select(fromStore.getSelectedLayoutNonlinearAggDatasLoaded(), this.layout);

    this.nonlinearPnlData$ = this.store.select(fromStore.getSelectedLayoutNonlinearPnlData(this.layout));
    this.nonlinearPnlDataLoadingStatus$ = this.store.select(fromStore.getSelectedLayoutNonlinearPnlDatasLoading(this.layout));
    this.nonlinearPnlDataLoadedStatus$ = this.store.select(fromStore.getSelectedLayoutNonlinearPnlDatasLoaded(this.layout));

    this.activateSpinning$ = this.store.select(fromStore.getSpinningActivate);

    this.primaryGroupingNameIdMaping$ = this.store.select(fromStore.getSelectedLayoutPrimaryGroupingNameIdMapping(), this.layout);

    this.positionInfo$ = this.store.select(fromStore.getSelectedLayoutPositionInfo(), this.layout);
    this.positionInfoLoadingStatus$ = this.store.select(fromStore.getSelectedLayoutPositionInfoLoading(), this.layout);
    this.positionInfoLoadedStatus$ = this.store.select(fromStore.getSelectedLayoutPositionInfo(), this.layout);
    this.positionInfo$ = this.store.select(fromStore.getSelectedLayoutPositionInfo(), this.layout);

    this.targetCommonGrouping$ = this.store.select(fromStore.getTargetLayoutUserSelectedCommonGrouping(), this.layout);

    // Layout Style, Config ---------------------------------------------------------------------------------------

    this.subscription.push(this.store.select(fromStore.getStaticLayouts).subscribe(layoutsEntity => {
      this.positionStaticLayouts = layoutsEntity;
    }));


    if (this.layout.includes('[static] ')) {
      const targetStaticNameRaw = this.layout.split('[static] ')[1];
      let targetStaticName;
      if (this.positionStaticLayouts && this.positionStaticLayouts[targetStaticNameRaw]) {
        targetStaticName = this.positionStaticLayouts[targetStaticNameRaw]['layoutName'];
      }
      this.layoutStyle$ = this.store.select(fromStore.getStaticLayoutConfigAndStyleByLayout(targetStaticName));

    } else {
      this.layoutStyle$ = this.store.select(fromStore.getUserLayoutStyleCloudByLayout(this.layout));
      this.subscription.push(this.layoutStyle$.subscribe(result => {
        this.layoutStyle = result;
      }));
    }

    this.userGridConfig$ = this.store.select(fromStore.getUserGridConfigCloud);
    this.userGroupingStyle$ = this.store.select(fromStore.getUserGroupingStyleCloud);
    this.systemStyle$ = this.store.select(fromStore.getSystemStyleCloud);
    this.userLayoutAndConfigLoading$ = this.store.select(fromStore.getUserLayoutAndConfigLoading);
    this.userLayoutAndConfigLoaded$ = this.store.select(fromStore.getUserLayoutAndConfigLoaded);

    // Regression ------------------------------------------------------------------------------------------------------
    this.regressionDynamicColumns$ = this.store.select(fromStore.getRegressionDynamicColumnsFromLayout(this.layout));
    this.regressionNonlinearData$ = this.store.select(fromStore.getRegressionNonlinearDataFromLayout(this.layout));
    this.regressionLoading$ = this.store.select(fromStore.getRegressionLoadingFromLayout(this.layout));
    this.gridClearingStatus$ = this.store.select(fromStore.getGridClearingStatusForLayout(this.layout));
    this.displayMode$ = this.store.select(fromStore.getDisplayModeForLayout(this.layout));

    this.store.dispatch(fromStore.loadClientServicesTradeThemes())

    this.subscription.push(this.dataRetrievalMethod$.subscribe(method => {
      clearInterval(this.refreshTimer);
      this.dataRetrievalMethod = method;
      // this.loadPositionsData(method, this.getTargetDate());
      this.loadPositionsData('http', this.getTargetDate());
    }));
  }


  ngOnDestroy() {
    this.clearTimer();
    if (this.subscription.length > 0) {
      this.subscription.forEach(sub => sub.unsubscribe());
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.isActive) {
      if (this.isActive === true) {
        this.dataLoadingDelayTimer = setTimeout(() => this.resetTimer(), 1500);
        this.firstDataFetchingFinished = true;
        this.sendResetTimerFunction.emit(this.resetTimer);
        this.store.dispatch(new fromStore.SetActiveLayout(this.layout));

      } else if (this.isActive === false) {
        this.clearTimer();
        this.clearDelayTimer();
      }
    }

    if (changes.currentDate && changes.currentDate.currentValue && this.isActive) {
      setTimeout(() => {
        this.asOfDateChange();
      }, 100);
    }

    if (changes.mode && changes.mode.currentValue && changes.mode.previousValue !== undefined && this.isActive) {
      if (changes.currentDate === undefined) {
        if (this._checkIsBiggerThanToday(this.currentDate)) {
          this.asOfDateChange();
        }
      }
    }

    if (changes.source && changes.source.currentValue && changes.source.previousValue !== undefined && this.isActive) {
      this.asOfDateChange();
    }
  }

  public getTargetDate(): string {
    return this.currentDate ? this.currentDate.split('/').join('-') : '';
  }

  asOfDateChange() {
    this.activateSpinning = true;
    this.store.dispatch(new fromStore.ActivateSpinning(true));
    clearInterval(this.refreshTimer);

    // this.loadPositionsData(this.dataRetrievalMethod, this.getTargetDate());
    this.loadPositionsData('http', this.getTargetDate());

    this.executionData$ = this.store.select(fromStore.getSelectedLayoutExecutions(this.layout));
    this.executionloadingStatus$ = this.store.select(fromStore.getSelectedLayoutExecutionsLoading(this.layout));
    this.traders$ = this.store.select(fromStore.getSelectedLayoutExecutionsTraders(this.layout));

    if (this.rowGroupings) {
      this.loadNonlinearData(this.rowGroupings);
      this.loadNonlinearPnlData(this.rowGroupings);
    }
  }

  updatefilters(filters) {
    this.filters = [];
  }

  loadPositionsData(method: string, targetDate: string): void {

    if (method === 'socket') {
      this.checkSocketFallback(targetDate, method);
    }

    this.store.dispatch(new fromStore.LoadPositions({asOfDate: targetDate, layout: this.layout, mode: this.mode, source: this.source, data_retrieval_method: method === 'socket' ? 'socket' : 'http'}));
    this.store.dispatch(new fromStore.LoadPositionGroupings({asOfDate: targetDate, layout: this.layout}));

    setTimeout( () => this.store.dispatch(new fromStore.LoadPositions({asOfDate: targetDate, layout: this.layout, mode: this.mode, source: this.source, data_retrieval_method: method === 'socket' ? 'socket' : 'http'})), 4000)

    if (method === 'http') {
      if ((this.mode === 'live' || this.mode === 'close') && this._checkIsBiggerThanToday(this.currentDate)) {
        this.refreshTimer = setInterval(() => {
            // this.checkSocketLiveness(method);
            if (method === 'http') {
              if (this.isLayoutManagementOpen === false && (this.currentDate === moment().format('MM/DD/YYYY'))) {
                this.store.dispatch(new fromStore.LoadPositions({asOfDate: targetDate, layout: this.layout, mode: this.mode, source: this.source, data_retrieval_method: 'http'}));
                this.store.dispatch(new fromStore.LoadPositionGroupings({asOfDate: targetDate, layout: this.layout}));
              }
            }
          }, this.updateCycle * 1000);
      }
    }
  }

  checkSocketFallback(targetDate, method) {

    // Fallback #1: If the SocketCluster broker gets disconnected (monitored by viewing the list of active socket connections)
    // Fallback #2: If the user wants to view data from a previous date
    // Fallback #3: If NodeJS publisher backend is not initialized
    // Fallback #4: If the NodeJS publisher backend stops sending data

    // #1
    this.socketConnections$.subscribe(arr => {
      if (arr.length === 0) {
        console.log('Socket Fallback #1: SocketCluster broker not connected.');
        this.store.dispatch(new fromStore.SetDataRetrievalMode('http'));
      }
    });

    // #2
    this.latestAvailableDate$.subscribe(date => {
      date = date.split('/').join('-');
      if (targetDate !== date) {
        console.log('Socket Fallback #2: User wants to view data from a previous date.');
        this.store.dispatch(new fromStore.SetDataRetrievalMode('http'));
      }
    });

    // #3
    const noSocketPublishedDataCheck = setInterval( () => {
      console.log('running noSocketPublishedData check');
      this.socketChannelData$.pipe(take(1)).subscribe(data => {
        if (data.length === 0 && this.dataRetrievalMethod === 'socket') {
          console.log('Socket Fallback #3: NodeJS publisher is not initialized');
          clearInterval(noSocketPublishedDataCheck);
          this.store.dispatch(new fromStore.SetDataRetrievalMode('http'));
        }
      });
    }, 15000);

    // #4
    const staleSocketDataCheck = setInterval( () => {
      this.socketChannelData$.pipe(take(1)).subscribe(data => {
        if (this.dataRetrievalMethod === 'socket') {
          const data_timestamp = moment(data.timestamp);
          const curr_timestamp = moment(Date.now());
          const diff = curr_timestamp.diff(data_timestamp, 'seconds');
          if (diff >= 15) {
            console.log('Socket Fallback #4: NodeJS backend has stopped sending fresh data.');
            clearInterval(staleSocketDataCheck);
            this.store.dispatch(new fromStore.SetDataRetrievalMode('http'));
          }
        }
      });
    }, 15000);
  }

  checkSocketLiveness(method) {
    if (method === 'http') {
      console.log('running socketLiveness check');
      this.socketChannelData$.pipe(take(1)).subscribe(data => {
        const data_timestmap = moment(data.timestamp);
        const curr_timestamp = moment(Date.now());
        const diff = curr_timestamp.diff(data_timestmap, 'seconds');
        if (diff <= this.socketLivenessCheckInterval && diff !== 0) {
          console.log('Socket Liveness Check Success: now switching from http to socket.');
          this.store.dispatch(new fromStore.SetDataRetrievalMode('socket'));
        }
      });
    }
  }

  onChangeSubscreen(screen: 'execution' | 'tax' | 'simulation' | 'profitLoss') {

    if (this.subScreenOpen === false) {
      this.subScreenOpen = true;
      this.activeSubScreen = screen;
    } else {
      if (this.activeSubScreen === screen) {
        this.activeSubScreen = undefined;
        this.subScreenOpen = false;
      } else {
        this.activeSubScreen = screen;
      }
    }

    if (screen === 'execution') {
      const targetDate = this.currentDate ? this.currentDate.split('/').join('-') : '';
      this.store.dispatch(new fromStore.SetExecutionDisplayMode({layoutName: this.layout, mode: this.subScreenOpen}));
      if (this.selectDataPath) {
        this._loadExecution(this.selectDataPath);
      }
    }
  }

  setTradersName(tradersName) {
    this.tradersName = tradersName;
  }

  public currentGrouping(grouping: string[]) {
    this.rowGroupings = grouping;

    // clean current layout nonlinear data cache when grouping change
    this.store.dispatch(new fromStore.ClearNonlinearCache(this.layout));
    this.store.dispatch(new fromStore.ClearNonlinearPnlCache(this.layout));
    if (this.isActive) {
      this.loadNonlinearData(this.rowGroupings);
      this.loadNonlinearPnlData(this.rowGroupings);
    }
  }

  onboardcastDisplayColumns(event) {
    this.boardcastDisplayColumns.emit(event);
  }

  private loadNonlinearData(grouping) {
    const groupingFormat = grouping.join('|');

    this.store.dispatch(new fromStore.LoadNonlinearAggData({
      asOfDate: this.currentDate.split('/').join('-'),
      grouping: groupingFormat,
      layout: this.layout
    }));
    clearInterval(this.refreshTimerForNonlinearData);

    if (this.mode === 'live' || this.mode === 'close') {
      this.refreshTimerForNonlinearData = this.setNonlinearDataPeriodicTimer(groupingFormat);
    }
  }

  private loadNonlinearPnlData(grouping) {
    const groupingFormat = grouping.join('|');
    this.store.dispatch(new fromStore.LoadNonlinearPnlData({
      asOfDate: this.currentDate.split('/').join('-'),
      grouping: groupingFormat,
      layout: this.layout,
      mode: this.mode,
      source: this.source
    }));
    clearInterval(this.refreshTimerForNonlinearPnlData);
    if (this.mode === 'live' || this.mode === 'close') {
      this.refreshTimerForNonlinearPnlData = this.setNonlinearPnlDataPeriodicTimer(groupingFormat);
    }
  }

  public onApplyLayout(event, targetLayout, newTab: boolean) {
    event.stopPropagation();
    this.updateLayout.emit({layout: targetLayout, newTab: newTab});
  }

  public onUpdateUserLayoutList(event: {action: string; layoutName: string, layout: any}) {
    if (event.action === 'update') {
      this.store.dispatch(new fromStore.SaveLayout(event.layout));
    } else if (event.action === 'save as') {
      this.store.dispatch(new fromStore.SaveLayout(event.layout));
      this.onUpdateUserLayoutStyle(this.layoutStyle, event.layoutName);
    } else if (event.action === 'delete') {
      this.store.dispatch(new fromStore.DeleteLayout(event.layout));
      if (event.layout.isShared && event.layout.createdBy) {
        this.store.dispatch(new fromStore.RemoveSelectedLayout(event.layout.createdBy + '-' + event.layoutName));
      } else {
        this.store.dispatch(new fromStore.RemoveSelectedLayout(event.layoutName));
      }
    }
  }

  public resetTimer() {
    this.asOfDateChange();
  }

  private setNonlinearDataPeriodicTimer(groupingFormat) {
    return setInterval(() => {
      if (this.isLayoutManagementOpen === false) {
        this.store.dispatch(new fromStore.LoadNonlinearAggData({
          asOfDate: this.currentDate.split('/').join('-'),
          grouping: groupingFormat,
          layout: this.layout
        }));
      }
    }, this.updateCycleNonlinear * 1000);
  }

  private setNonlinearPnlDataPeriodicTimer(groupingFormat) {
    return setInterval(() => {
      if (this.isLayoutManagementOpen === false && this._checkIsBiggerThanToday(this.currentDate)) {
        this.store.dispatch(new fromStore.LoadNonlinearPnlData({
          asOfDate: this.currentDate.split('/').join('-'),
          grouping: groupingFormat,
          layout: this.layout,
          source: this.source,
          mode: this.mode,
        }));
      }
    }, this.updateCycleNonlinearPnl * 1000);
  }

  private clearTimer() {
    clearInterval(this.refreshTimerForNonlinearData);
    clearInterval(this.refreshTimerForNonlinearPnlData);
    clearInterval(this.refreshTimer);
  }

  private clearDelayTimer() {
    clearTimeout(this.dataLoadingDelayTimer);
  }

  public onSelectLeafRow(row) {
    this.selectedRow = row;
    if (row) {
      this.store.dispatch(new fromStore.LoadPositionInfo({
        layout: this.layout,
        sid: row.sid,
        fundId: row.fundID,
        tid: row.tid,
        podId: row.podID,
        asOfDate: row.asOfDate,
        isLive: this.mode === 'live' || this.mode === 'close' ? true : false
      }));
    } else {
      this.store.dispatch(new fromStore.ResetPositionInfo(this.layout));
    }
  }

  public onSelectDataPath(e: fromModel.DataPath): void {
    if (e) {
      this.selectDataPath = e;
      this.selectedDataPath$.next(e);
      if (this.subScreenOpen && this.activeSubScreen === 'execution') {
        this._loadExecution(e);
      }
    }
  }

  public onChangeSideScreen(screenName: string)  {

    if (this.activeSideScreen === screenName) {
      this.activeSideScreen = undefined;
      this.isLayoutManagementOpen = false;
    } else {
      this.activeSideScreen = screenName;
      this.isLayoutManagementOpen = true;
      this.activeSideScreenCollection.push(screenName);
    }
  }

  public onTogglePeriodicPullingStatus(event: boolean) {
    this.isLayoutManagementOpen = event;
  }

  public showTradeNameCreation(e: any): void {
    this.store.dispatch(fromStore.loadPmPodDetails());
    this.onChangeSideScreen('tradeNameCreation');
  }

  public onBackupGridSetting(event) {
    this.store.dispatch(new fromStore.BackupAllConfigAndStyle());
  }

  public showDirectionality(e: any): void {
    this.onChangeSideScreen('directionality');
  }

  public onCreateTradeName(param: fromModel.INewTradeName): void {
    this.store.dispatch(fromStore.createTradeName(param));
  }

  public onUpdateUserGridConfig(newGridConfig: any) {
    this.store.dispatch(new fromStore.UpdateGridConfig(newGridConfig));
  }

  public onUpdateUserGroupingStyle(newGroupingStyle: any) {
    this.store.dispatch(new fromStore.UpdateGroupingStyle(newGroupingStyle));
  }

  public onUpdateUserLayoutStyle(newLayoutStyle: any, layoutName?: string) {
    this.store.dispatch(new fromStore.UpdateLayoutStyle({layout: layoutName || this.layout, style: newLayoutStyle}));
  }

  public onExecutionExpandChange() {
    this.excutionPanelFullyExpansionMode = !this.excutionPanelFullyExpansionMode;
  }

  /**
   * Directionality
   */
  public loadDirectionality(path: fromModel.DataPath): void {
    // this.store.dispatch(new fromStore.LoadDirectionality(path));
  }

  // Utility ---------------------------------

  private _checkIsBiggerThanToday(selectedDate) {
    const today = new Date((new Date()).toLocaleDateString()).getTime();
    const selectedDateNum = new Date(selectedDate).getTime();
    return selectedDateNum >= today;
  }

  private _loadExecution(payload: fromModel.DataPath) {
    const keys = payload.key.split('_').map(key => parseInt(key, 10));
    const keyLength = keys.length;
    const grouping = payload.grouping.split('|');
    const groupingString = grouping.slice(0, keyLength).join('|');
    const asOfDate = this.currentDate.split('/').join('-');
    this.store.dispatch(new fromStore.LoadExecutionsAdvance({
      layoutName: this.layout,
      req: {
        grouping: groupingString,
        asOfDate: asOfDate,
        keys: keys
      }
    }));
  }
}


// loop every 1minute
// every 30 seconds it will check time diff
