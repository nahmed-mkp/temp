import { Component, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, Subject } from 'rxjs';
import { UntypedFormControl } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { AgencyPortfolioService } from '../../services';
import { startWith, map } from 'rxjs/operators';



@Component({
  selector: 'app-agency-portfolio-toolbar-layout',
  templateUrl: './agency-portfolio-toolbar-layout.component.html',
  styleUrls: ['./agency-portfolio-toolbar-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyPortfolioToolbarLayoutComponent implements OnInit, OnDestroy {

  public layoutNames$: Observable<string[]>;
  public activeLayoutName: string;
  // public activeLayout$: Observable<fromModels.Layout>;
  private activeTabSubscription: Subscription;
  public activeTab: string;
  private activeColumnsSearchDictSubscription: Subscription;
  public activeColumnsSearchDict: string[];

  private updateTimer: any;
  public updateCycle = 20;
  public time = new Date();
  public mode: 'live' | 'closing' = 'live';
  public showBarChart = false;
  public globalTextFilter: string;
  public toolbarExpandMode = true;
  public toolbarNoDrag = true;
  public slideStatus = 'up';

  private columnsFilter = new UntypedFormControl();
  public filteredColumns$ = new Subject<string[]>();
  private filteredColumnsSubscription: Subscription;

  constructor(private store: Store<fromStore.AgencyPortfolioState>, private service: AgencyPortfolioService,
    private dialogRef: MatDialogRef<AgencyPortfolioToolbarLayoutComponent>) {
    this.onGlobaTextFilterChange = this.onGlobaTextFilterChange.bind(this);
    this.onGlobaTextFilterChange = this.service.debounce(this.onGlobaTextFilterChange, 1000);
  }

  ngOnInit() {
    this.layoutNames$ = this.store.select(fromStore.getActiveTabLayoutsNames);
    // this.activeLayout$ = this.store.select(fromStore.getActiveLayout);
    this.activeTabSubscription = this.store.select(fromStore.getActiveTab).subscribe(activeTab => {
      this.activeTab = activeTab;
      setTimeout(() => this.onLoadData());
      this.onModeChange();
      this.columnsFilter.setValue(undefined);
    });
    this.activeColumnsSearchDictSubscription = this.store.select(fromStore.getActiveColumnsSearchDict).subscribe(columns => {
      this.activeColumnsSearchDict = columns;
      setTimeout(() => this.filteredColumns$.next(columns));
    });

    this.filteredColumnsSubscription = this.columnsFilter.valueChanges
      .pipe(
        startWith(''),
        map(name => name ? this.activeColumnsSearchDict.filter(columnName =>
          columnName.toLowerCase().includes(name.toLowerCase())) : this.activeColumnsSearchDict.slice())
      ).subscribe(result => this.filteredColumns$.next(result));

    this.store.dispatch(new fromStore.Loadlayout());
  }

  ngOnDestroy() {
    if (this.activeTabSubscription) { this.activeTabSubscription.unsubscribe(); }
    if (this.updateTimer) { clearInterval(this.updateTimer); }
    if (this.activeColumnsSearchDictSubscription) { this.activeColumnsSearchDictSubscription.unsubscribe(); }
    if (this.filteredColumnsSubscription) { this.filteredColumnsSubscription.unsubscribe(); }
  }

  onDateChanged() {
    const liveTime = (new Date()).toLocaleDateString().split('/').join('-');
    const selectedDateFormat = this.time.toLocaleDateString().split('/').join('-');
    if (liveTime === selectedDateFormat) { this.mode = 'live'; }
    else { this.mode = 'closing'; }
    this.onModeChange();
    this.onLoadData();
    this.store.dispatch(new fromStore.AllowLoadingDisplay(true));
  }

  onModeChange() {
    if (this.mode === 'live') {
        this.onSetTimeInterval(this.updateCycle);
    } else {
        if (this.updateTimer) { clearInterval(this.updateTimer); }
    }
  }

  onSetTimeInterval(timeLength: number) {
    if (this.updateTimer) { clearInterval(this.updateTimer); }
    this.updateCycle = timeLength;
    this.updateTimer = setInterval(() => {
        this.onLoadData();
    }, this.updateCycle * 1000);
  }

  onLoadData() {
    const selectedDateFormat = this.time.toLocaleDateString().split('/').join('-');
    const displayMode = this.activeTab.toLowerCase();
    const requestPayload: fromModels.AgencyPortfolioRequest = {
        asOfDate: selectedDateFormat, displayMode: (displayMode as 'position' | 'security' | 'benchmark'),
        pricingMode: this.mode
    };

    this.store.dispatch(new fromStore.LoadData(requestPayload));
  }

  onToggleBarChart() {
    this.showBarChart = !this.showBarChart;
    this.store.dispatch(new fromStore.ToogleBarChart(this.showBarChart));
  }

  onSelectColumnLayout(layoutName: string) {
    this.store.dispatch(new fromStore.SetActiveLayout({category: this.activeTab, name: layoutName}));
    this.activeLayoutName = layoutName;
  }

  onGlobaTextFilterChange(text: string) {
    this.store.dispatch(new fromStore.SetGlobalTextFilter(text));
  }

  onColumnFocus(columnName: string) {
    this.store.dispatch(new fromStore.SetTargetColumn(columnName));
  }

  onToogleToolbar(event) {
    this.toolbarExpandMode = event;
    if (this.toolbarExpandMode) { this.dialogRef.updateSize('50rem', '3.3rem'); }
    else { this.dialogRef.updateSize('18rem', '3rem'); }
  }

  onSlideUp() {
    this.dialogRef.updatePosition({
      top: '-2.7rem',
    });
  }

  onSlideDown() {
    this.dialogRef.updatePosition({
      top: '0',
    });
  }

}
