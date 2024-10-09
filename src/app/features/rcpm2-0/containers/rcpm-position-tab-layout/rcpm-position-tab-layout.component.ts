import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnDestroy, HostBinding, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GridApi, GridOptions, ColDef } from 'ag-grid-community';
import { Observable, Subscription, from } from 'rxjs';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacyTabGroup as MatTabGroup } from '@angular/material/legacy-tabs';

import * as fromStore from '../../store';
import * as fromModel from '../../models';
import { UntypedFormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { RcpmModeChangePromoteDialogComponent, RcpmMissingClosesDialogComponent } from '../../components';
import { NotificationService } from 'src/app/factories';
import { RCPM2PositionService } from '../../services';

@Component({
  selector: 'app-rcpm-position-tab-layout',
  templateUrl: './rcpm-position-tab-layout.component.html',
  styleUrls: ['./rcpm-position-tab-layout.component.scss'],
})
export class RcpmPositionTabLayoutComponent implements OnInit, OnDestroy {

  @ViewChild(MatTabGroup) tabsGroup: MatTabGroup;
  @HostBinding('class') classes = 'vertical-flex-full-height';

  // public positionPresetLayout: fromModel.PositionLayout;
  // public positionPresetLayoutLoading$: Observable<boolean>;
  // public positionPresetLayoutError$: Observable<string>;

  public positionStaticLayoutMainMenu$: Observable<string[]>;
  public positionStaticLayoutSubMenu$: Observable<any>;
  public positionStaticLayouts: any;

  public positionLookups$: Observable<any>;
  public positionLookupsLoading$: Observable<boolean>;
  public positionLookupsError$: Observable<string>;

  public dataSourcePermission$: Observable<string[]>;

  public nonlinearSupportGrouping$: Observable<any>;
  public nonlinearSupportGroupingLoading$: Observable<boolean>;
  public nonlinearSupportGroupingError$: Observable<string>;
  public nonlinearSupportGroupingOfActiveDay$: Observable<any>;

  public positionsDate$: Observable<string[]>;
  public positionsDateLoading$: Observable<boolean>;
  public positionsDateError$: Observable<string>;
  public currentSelectedDate: string;
  public latestAvaliableDate: string;
  public latestDate: string;
  public mode: 'live' | 'close';
  public source: 'RCPM' | 'PRIZM' = 'RCPM';
  public sourcePermission: boolean;

  private modeChangePromoteRef: MatDialogRef<RcpmModeChangePromoteDialogComponent>;
  private missingClosesRef: MatDialogRef<RcpmMissingClosesDialogComponent>;

  public managers$: Observable<string[]>;
  public timeStamp$: Observable<string>;
  public timeStampCollection$: Observable<any>
  public targetManager: string;

  public IsUnsettledClosingTradeStillAccruing: boolean = true;
  public IsExcludeTestFundEnabled: boolean = true;
  public IsUserHasPermissionOnExcludeTestFund: boolean = false;

  public selectedLayouts$: Observable<string[]>;
  public selectedLayouts: string[] = [];
  
  public activeLayout = 'Overview';
  public currentDate: Date;

  public userLayouts$: Observable<any[]>;
  public userLayouts: any[];
  public sharedUserLayouts: any[];
  public privateUserLayouts: any[];
  public selectedUserLayout: any;
  public userLayoutLoadingStatus$: Observable<Boolean>;

  public userCloudLayouts: any;
  public userCloudLayouts_shared: any[] = [];
  public userCloudLayouts_private: any[] = [];

  public targetColumnFormControl = new UntypedFormControl();
  public filteredColumnsWithGrouping$: Observable<any[]>;
  public targetColumn: any;
  public visiableColumns: {headerName: string, field: string, group: string}[] = [];

  public resetTimerFunc: any;

  public icons = ['account_box', 'analytics', 'article', 'assessment', 'assignment', 'assignment_return', 'assignment_returned', 'assignment_turned_in'];

  private subscriptions: Subscription[] = [];


  // public userLockStatus$: Observable<boolean>;
  // public userLockStatusLoading$: Observable<boolean>;


  constructor(private store: Store<fromStore.RCPM2State>, private ref: ChangeDetectorRef, 
    private dialog: MatDialog, private notificationService: NotificationService, private positionService: RCPM2PositionService) {}

  ngOnInit() {
    // this.store.dispatch(new fromStore.LoadPositionLookups());
    // this.store.dispatch(new fromStore.LoadPresetLayout);
    // this.store.dispatch(new fromStore.LoadUserCustomizedLayout);
    // this.store.dispatch(new fromStore.LoadLayout());
    // this.store.dispatch(new fromStore.LoadUserCustomizedLayoutStyle);
    // this.store.dispatch(new fromStore.LoadPositionDates);
    // this.store.dispatch(new fromStore.LoadLatestPositionDate);
    // this.store.dispatch(new fromStore.LoadConfigAndStyle());
    // this.store.dispatch(new fromStore.LoadDirectionalityInputs);
    // this.store.dispatch(new fromStore.LoadRegressionFactors);
    // this.store.dispatch(new fromStore.LoadNonlinearSupportGrouping);
    // this.store.dispatch(new fromStore.LoadStaticLayout);

    // this.store.select(fromStore.getPositionPresetLayout).subscribe(presetLayout => {
    //   this.positionPresetLayout = presetLayout;
    // });
    // this.positionPresetLayoutLoading$ = this.store.select(fromStore.getPositionPresetLayoutLoading);
    // this.positionPresetLayoutError$ = this.store.select(fromStore.getPositionPresetLayoutError);

    this.positionStaticLayoutMainMenu$ = this.store.select(fromStore.getStaticLayoutMainMenu);
    this.positionStaticLayoutSubMenu$ = this.store.select(fromStore.getStaticLayoutSubMenu);
    this.subscriptions.push(this.store.select(fromStore.getStaticLayouts).subscribe(layoutsEntity => {
      this.positionStaticLayouts = layoutsEntity;
    }));

    this.positionLookups$ = this.store.select(fromStore.getPositionLookups);
    this.positionLookupsLoading$ = this.store.select(fromStore.getPositionLookupsLoading);
    this.positionLookupsError$ = this.store.select(fromStore.getPositionLookupsError);

    this.nonlinearSupportGrouping$ = this.store.select(fromStore.getNonlinearSupportGrouping);
    this.nonlinearSupportGroupingLoading$ = this.store.select(fromStore.getNonlinearSupportGroupingLoading);
    this.nonlinearSupportGroupingError$ = this.store.select(fromStore.getNonlinearSupportGroupingError);
    this.nonlinearSupportGroupingOfActiveDay$ = this.store.select(fromStore.getNonlinearSupportedLayoutOfActiveDayDict);

    this.positionsDate$ = this.store.select(fromStore.getPositionDatesFormat);
    this.positionsDateLoading$ = this.store.select(fromStore.getPositionDatesLoading);
    this.positionsDateError$ = this.store.select(fromStore.getPositionDatesError);
    this.subscriptions.push(this.store.select(fromStore.getLatestAvailableDate).subscribe(date => {
      this.latestAvaliableDate = date;

      if (this.currentSelectedDate === undefined) {
        this.currentSelectedDate = this.latestAvaliableDate;
        this.mode = 'live';
        this.store.dispatch(new fromStore.SetActiveDate(this.currentSelectedDate));
      } else {
        if (this.currentSelectedDate !== this.latestAvaliableDate && this.mode === 'live') {
          this.modeChangePromote(this.latestAvaliableDate);
        }
      }



      // if (this.latestDate && this.latestAvaliableDate) {
      //   this.checkMode(this.latestAvaliableDate, this.latestDate);
      // } else {
      //   this.mode = 'live';
      // }
    }));
    // this.subscriptions.push(this.store.select(fromStore.getLatestPositionDate).subscribe(latestDate => {
    //   this.latestDate = latestDate;
    //   if (this.latestDate && this.latestAvaliableDate) {
    //     this.checkMode(this.latestAvaliableDate, latestDate);
    //   } 
    // }));

    this.managers$ = this.store.select(fromStore.getPositionManagerSorted);
    this.timeStamp$ = this.store.select(fromStore.getPositionTimeStamp);
    this.timeStampCollection$ = this.store.select(fromStore.getTimeStampCollection);

    this.userLayouts$ = this.store.select(fromStore.getUserLayouts);
    this.subscriptions.push(this.store.select(fromStore.getUserLayouts).subscribe(userLayouts => {
      this.userLayouts = userLayouts;
      this.sharedUserLayouts = userLayouts.filter(layout => layout.isShared === true);
      this.privateUserLayouts = userLayouts.filter(layout => layout.isShared === false);
    }));

    this.subscriptions.push(this.store.select(fromStore.getUserLayoutsCloud).subscribe(cloudLayouts => {
      this.userCloudLayouts = cloudLayouts;
      const layoutsFlat = Object.keys(cloudLayouts).map(key => cloudLayouts[key]);
      this.userCloudLayouts_shared = layoutsFlat.filter(layout => layout.isShared);
      this.userCloudLayouts_private = layoutsFlat.filter(layout => !layout.isShared);
    }));
    this.userLayoutLoadingStatus$ = this.store.select(fromStore.getUserLayoutsCloudLoading);


      
    this.selectedLayouts$ = this.store.select(fromStore.getSelectedLayoutsAdvance);
    this.subscriptions.push(this.selectedLayouts$.subscribe(layouts => {
      this.selectedLayouts = layouts;
    }));

    this.currentDate = new Date();

    this.filteredColumnsWithGrouping$ =  this.targetColumnFormControl.valueChanges.pipe(
      startWith(''),
      map(text => typeof text === 'string' ? text : text.headerName),
      map(text => {
        let filteredColumns;
        if (text) {
          filteredColumns = this.visiableColumns.filter(col => col.headerName.toLowerCase().includes(text.toLowerCase())); 
        } else {
          filteredColumns = this.visiableColumns;
        }
        const filteredColumnsGroups: any = {};
        filteredColumns.forEach(column => {
          if (filteredColumnsGroups[column.group] === undefined) {
            filteredColumnsGroups[column.group] = {label: column.group, columns: [column]};
          } else {
            filteredColumnsGroups[column.group].columns.push(column);
          }
        });
        // console.log('filteredColumnsGroups', filteredColumnsGroups)
        Object.keys(filteredColumnsGroups).forEach(key => filteredColumnsGroups[key].columns.sort((a, b) => {
          if (a.headerName[0].toLowerCase() > b.headerName[0].toLowerCase()) {
            return 1;
          } else if (a.headerName[0].toLowerCase() < b.headerName[0].toLowerCase()){
            return -1;
          } else {
            return 0;
          }
        }));
        return Object.keys(filteredColumnsGroups).map(key => filteredColumnsGroups[key]);
      })
    );

    this.subscriptions.push(this.store.select(fromStore.getDataSourcePermission).subscribe(result => {
      this.sourcePermission = this.positionService.checkDataSourcePermission(result);
    }));


    // this.userLockStatus$ = this.store.select(fromStore.getUserLockStatus);
    // this.userLockStatusLoading$ = this.store.select(fromStore.getUserLockStatusLoading);

    this.IsUserHasPermissionOnExcludeTestFund = this.positionService.checkExcludeTestFundPermission();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.store.dispatch(new fromStore.ToggleLoadLatestPositionDate(false));
  }

  public selectedIndexChange(event) {
    // console.log('tab change', event);
    this.activeLayout = this.selectedLayouts[event];
    this.targetColumn = undefined;
    this.targetColumnFormControl.setValue('');
  }

  // public onApplyLayout(event, targetLayout, newTab: boolean) {
  //   event.stopPropagation();
  //   // console.log('targetlayout', targetLayout, newTab);
  //   // this.targetLayout = targetLayout;

  //   if (newTab === true) {
  //     this.store.dispatch(new fromStore.AddSelectedLayout(targetLayout));
  //     this.switchActiveTabToLast();
  //   } else {
  //     // console.log('selectedLayouts', this.selectedLayouts);
  //     const targetIndex = this.selectedLayouts.indexOf(this.activeLayout);
  //     this.store.dispatch(new fromStore.ChangeSelectedLayout({targetLayout: targetLayout, targetIndex: targetIndex}));
  //     this.activeLayout = targetLayout;
  //   }
  // }

  public onApplyStaticLayout(event, targetLayout: string, newTab: boolean) {
    event.stopPropagation();
    console.log('targetLayout', targetLayout, newTab);
    const targetLayoutName = '[static] ' + targetLayout;
    if (newTab === true) {
      this.store.dispatch(new fromStore.AddSelectedLayout(targetLayoutName));
      this.switchActiveTabToLast();
    } else {
      const targetIndex = this.selectedLayouts.indexOf(this.activeLayout);
      this.store.dispatch(new fromStore.ChangeSelectedLayout({targetLayout: targetLayoutName, targetIndex: targetIndex}));
      this.activeLayout = targetLayoutName;
    }
  }

  public onApplyUserLayout(event, layout, newTab: boolean) {
    event.stopPropagation();
    // this.selectedUserLayout = layout;   // do not know this line usage, so it is commended out

    let targetLayoutName;
    if (layout.isShared && layout.createdBy) {
      targetLayoutName = layout.createdBy + '-' + layout.layoutName;
    } else {
      if (layout === 'Overview') {
        targetLayoutName = 'Overview';
      } else {
        targetLayoutName = layout.layoutName;
      }
    }

    if (newTab === true) {
      this.store.dispatch(new fromStore.AddSelectedLayout(targetLayoutName));
      this.switchActiveTabToLast();
    } else {
      const targetIndex = this.selectedLayouts.indexOf(this.activeLayout);
      this.store.dispatch(new fromStore.ChangeSelectedLayout({targetLayout: targetLayoutName, targetIndex: targetIndex}));
      this.activeLayout = targetLayoutName;
    }
  }

  public getLayoutIfExisted(layoutName) {

    // try to find the layout from the cloud copy
    if (this.userCloudLayouts && this.userCloudLayouts[layoutName]) {
      return this.userCloudLayouts[layoutName];
    }

    // try to find the layout from the localStorage
    const filteredResult = this.userLayouts.filter(userlayout => userlayout.layoutName === layoutName);
    if (filteredResult.length > 0) {
      return this.userLayouts.filter(userlayout => userlayout.layoutName === layoutName)[0];
    }

    // try to find the layout from the static collection
    if (layoutName.includes('[static] ')){
      const targetStaticLayoutName = layoutName.split('[static] ')[1];
      if (this.positionStaticLayouts && this.positionStaticLayouts[targetStaticLayoutName]) {
        return this.positionStaticLayouts[targetStaticLayoutName]
      }
    }

    // Could not find the layout
    return undefined
  }

  removeLayout(layout: string) {
    this.store.dispatch(new fromStore.RemoveSelectedLayout(layout));
    setTimeout(() => this.store.dispatch(new fromStore.RemoveSelectedLayoutMemory(layout)), 500);
  } 

  switchActiveTabToLast() {
    // console.log('tab group', this.tabsGroup);
    const lastIndex = this.tabsGroup._tabs.length;
    this.tabsGroup.selectedIndex = lastIndex;
  }

  // trackByFn(index, layout) {
  //   return layout;
  // }

  public receiveDisplayColumns(displayColumns: any, index: number) {
    // console.log('receiveDisplayColumns', displayColumns, index);
    this.visiableColumns = displayColumns;
  }

  public displayFn(column) {
    return column ? column.headerName : '';
  }
  public onTargetColumnChange(targetColumn) {
    this.targetColumn = targetColumn.field;
    this.ref.markForCheck();
  }

  public receiveResetTimerFunction(resetTimerFunc) {
    this.resetTimerFunc = resetTimerFunc;
  }

  public onForceResetTimer() {
    console.log('resetting timer');
    this.resetTimerFunc();
  }

  public onDateChange() {
    if (this.latestAvaliableDate !== this.currentSelectedDate) {
      this.mode = 'close';
      this.source = 'RCPM';
    } else {
      this.mode = 'live';
    }

    // When date change, clear the store data for safety concern
    this.store.dispatch(new fromStore.ClearCache('all'));
    this.store.dispatch(new fromStore.SetActiveDate(this.currentSelectedDate));
  }

  private modeChangePromote(latestAvailabelDate) {
    this.modeChangePromoteRef = this.dialog.open(RcpmModeChangePromoteDialogComponent, {
      hasBackdrop: false,
      panelClass: 'event-analysis-pop-up-panel',
      width: '30rem',
      height: '20rem',
      data: latestAvailabelDate,
    });
    this.subscriptions.push(this.modeChangePromoteRef.afterClosed().subscribe(response => {
      // console.log('user response', response);
      if (response === true) {
        this.currentSelectedDate = latestAvailabelDate;
        this.onDateChange();
      } else {
        this.mode = 'close';
        this.store.dispatch(new fromStore.ClearCache('position'));
      }
    }));
  }

  public onModeChange() {
    this.mode = this.mode === 'live' ? 'close' : 'live';
    if (this.currentSelectedDate !== this.latestAvaliableDate && this.mode === 'live') {
      this.modeChangePromote(this.latestAvaliableDate);
    }
    this.store.dispatch(new fromStore.ClearCache('position'));

    if (this.mode === 'close') {
      this.source = 'RCPM';
    }
  }

  public onSourceChange() {
    this.store.dispatch(new fromStore.ClearCache('position'));
  }

  public doNotCloseMenu(event) {
    event.stopPropagation();
  }

  public onBackupLayout(event, layout) {
    event.stopPropagation();
    // console.log('backup layout ', layout);
    this.store.dispatch(new fromStore.SaveLayout(layout));
  }

  public onBackupAllLayouts() {
    const layoutNeededBackup = [];
    const layoutNameAlreadyBackup = Object.keys(this.userCloudLayouts);
    this.userLayouts.forEach(layout => {
      if (layoutNameAlreadyBackup.indexOf(layout.layoutName) === -1) {
        layoutNeededBackup.push(layout);
      }
    });

    if (layoutNeededBackup.length > 0) {
      const backUpTimer = setInterval(() => {
        const targetLayout = layoutNeededBackup.shift();
        this.store.dispatch(new fromStore.SaveLayout(targetLayout));
        if (layoutNeededBackup.length === 0) {
          // finish backup all layout
          this.notificationService.openNotification('Layouts Backup complete');
          clearInterval(backUpTimer);
        }
      }, 2000);
    } else {
      this.notificationService.openNotification('All Layouts have already backed up');
    }

  }

  public onBackupConfigAndStyle() {
    this.store.dispatch(new fromStore.BackupAllConfigAndStyle());
  }

  public onApplyCommomGrouping(grouping: string) {
    const firmPrefixgrouping = 'Firm|' + grouping;
    this.store.dispatch(new fromStore.ApplyCommonGrouping(firmPrefixgrouping));
  }

  public showMissingCloses(){
    this.store.dispatch(new fromStore.LoadMissingCloses({
      asOfDate: this.currentSelectedDate, 
      showClosedPositions: 0
    }))
    this.missingClosesRef = this.dialog.open(RcpmMissingClosesDialogComponent, {
      width: '800px',
      height: '500px',
      data: {
        asOfDate: this.currentSelectedDate
      }
    });
  }

}

