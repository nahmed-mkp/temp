import { ChangeDetectionStrategy, Component, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import * as fromModels from '../../models';

@Component({
  selector: 'app-timeseries-data-source-viewer',
  templateUrl: './timeseries-data-source-viewer.component.html',
  styleUrls: ['./timeseries-data-source-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesDataSourceViewerComponent implements OnChanges {

  
  public timeseriesHierarchyData$: Observable<any>;
  public timeseriesHierarchyDataLoading$: Observable<any>;
  public selectedTimeseries$ = new Observable<fromModels.ITimeseries[]>;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<TimeseriesDataSourceViewerComponent>,
    private store: Store<fromStore.State>
  ) {
    
    this.timeseriesHierarchyData$ = this.store.select(fromStore.getTimeseriesHierarchy);
    this.timeseriesHierarchyDataLoading$ = this.store.select(fromStore.getTimeseriesHierarchyLoading);
    this.selectedTimeseries$ = this.store.select(fromStore.getSelectedTimeseriesWithinTab);
  }

  ngOnChanges(changes: SimpleChanges){

  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  handleTimeseriesSelected(payload: fromModels.ITimeseries){
    if(payload.isSelected){
        this.store.dispatch(fromStore.selectTimeseriesfromNav(payload));
    } else {
        this.store.dispatch(fromStore.deleteTimeseriesFromNav(payload));
    }
}

}
