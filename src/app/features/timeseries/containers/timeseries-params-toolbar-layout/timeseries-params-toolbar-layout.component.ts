import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { On, Store } from '@ngrx/store';
import { TimeseriesNewPortfolioDialogViewerComponent, TimeseriesImportPortfolioDialogViewerComponent } from '../../components';
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-timeseries-params-toolbar-layout',
  templateUrl: './timeseries-params-toolbar-layout.component.html',
  styleUrls: ['./timeseries-params-toolbar-layout.component.scss']
})
export class TimeseriesParamsToolbarLayoutComponent implements OnChanges, OnDestroy {

  @Input() tabs: fromModels.ITab[];

  @Input() sourceMapVisibility: boolean;
  @Input() selectionGridVisibility: boolean;

  @Input() importablePortfolios: any;
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() mode: fromModels.Mode;

  @Output() modeChanged = new EventEmitter<fromModels.Mode>();
  @Output() showDataSourceVisibilityHandler = new EventEmitter<boolean>();
  @Output() clearScratchpad = new EventEmitter<void>();

  public currTab$ = new Observable<fromModels.ITab>();
  public subscriptions$: Subscription[] = [];

  public currTab: fromModels.ITab;

  constructor(private store: Store<fromStore.State>, private dialog: MatDialog){

    this.currTab$ = this.store.select(fromStore.getCurrTab);

    this.subscriptions$.push(this.currTab$.subscribe((currTab: fromModels.ITab) => {
      this.currTab = currTab
    }));

  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  importPortfolio(){ 
    // below line updates the visible options when viewing import portfolio dialog
    this.store.dispatch(fromStore.loadImportablePortfolios()); 
    this.modeChanged.emit('import')
    const importDialogRef = this.dialog.open(TimeseriesImportPortfolioDialogViewerComponent, {
        data: this.importablePortfolios
      }
    )
  }

  createPortfolioAlt(){
    const importDialogRef = this.dialog.open(TimeseriesNewPortfolioDialogViewerComponent, {
      data: {
        tabs: this.tabs,
      }
    })
  }

  createPortfolio(){
    this.modeChanged.emit('create')
  }

  onStartDateChange(){
    this.store.dispatch(fromStore.updateStartDate(this.startDate))
  }

  onEndDateChange(){
    this.store.dispatch(fromStore.updateEndDate(this.endDate))
  }

  showDataSource(e){
    this.showDataSourceVisibilityHandler.emit(true)
  }

  onClearScratchpad(e) { 
    this.clearScratchpad.emit();
  }

  public isScratchpad(): boolean { 
    if (this.currTab) { 
      return this.currTab && this.currTab.portfolio && this.currTab.portfolio.guid === 'scratchpad';
    }
    return false;
  }

  // deriveSeries(){
  //   this.store.dispatch(fromStore.selectTimeseries({
  //     label: '<Derived Timeseries>',
  //     expression: '<Enter Derived Timeseries Expression Here>',
  //     axis: 'auto',
  //     alias: '<Enter Derived Timeseries Alias Here>', 
  //     isChecked: true
  //   }))
  // }
}
