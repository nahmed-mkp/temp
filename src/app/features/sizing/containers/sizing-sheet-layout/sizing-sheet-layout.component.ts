import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromModels from './../../models';
import * as fromStore from './../../store';

@Component({
  selector: 'app-sizing-sheet-layout',
  templateUrl: './sizing-sheet-layout.component.html',
  styleUrls: ['./sizing-sheet-layout.component.scss']
})
export class SizingSheetLayoutComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  public sizingCapitals$: Observable<fromModels.SizingCapital[]>;
  public sizingSheetItems$: Observable<fromModels.SizingItem[]>;
  public sizingSheetItemsLoading$: Observable<boolean>;

  public sizingSheetUpdatedTime$: Observable<string>;
  public sizingSheetDefaultColumns$: Observable<number[]>;
  public sizingSheetCapitalBase$: Observable<number>;

  public sizingSecurities$: Observable<fromModels.SizingSecurity[]>;
  public sizingSecuritiesLoading$: Observable<boolean>;
  public sizingSecuritiesLoaded$: Observable<boolean>;
  public sizingSecuritiesError$: Observable<string>;

  public defaultCapitals$: Observable<fromModels.DefaultSizingCapital[]>;
  public defaultCapitalsLoading$: Observable<boolean>;
  public defaultCapitalsLoaded$: Observable<boolean>;
  public defaultCapitalsError$: Observable<string>;

  public showConfiguration = false;

  constructor(private store: Store<fromStore.State>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadSizingCapitals());     // both action will be moved to route guard in the future
    this.store.dispatch(new fromStore.LoadSizingSheetItems());

    this.sizingCapitals$ = this.store.select(fromStore.getTradeSizingCapitalsFlat);
    this.sizingSheetItems$ = this.store.select(fromStore.getTradeSizingSheetItemsFlat);
    this.sizingSheetItemsLoading$ = this.store.select(fromStore.getTradeSizingSheetItemsLoadingStatus);

    this.sizingSheetUpdatedTime$ = this.store.select(fromStore.getTradeSizingSheetUpdatedTime);
    this.sizingSheetDefaultColumns$ = this.store.select(fromStore.getTradeSizingSheetDefaultColumns);
    this.sizingSheetCapitalBase$ = this.store.select(fromStore.getTradeSizingSheetCapitalBase);

    this.sizingSecurities$ = this.store.select(fromStore.getTradeSizingSecurities);
    this.sizingSecuritiesLoading$ = this.store.select(fromStore.getTradeSizingSecuritiesLoading);
    this.sizingSecuritiesLoaded$ = this.store.select(fromStore.getTradeSizingSecuritiesLoaded);
    this.sizingSecuritiesError$ = this.store.select(fromStore.getTradeSizingSecuritiesError);

    this.defaultCapitals$ = this.store.select(fromStore.getTradeSizingDefaultCapitals);
    this.defaultCapitalsLoading$ = this.store.select(fromStore.getTradeSizingDefaultCapitalsLoading);
    this.defaultCapitalsLoaded$ = this.store.select(fromStore.getTradeSizingDefaultCapitalsLoaded);
    this.defaultCapitalsError$ = this.store.select(fromStore.getTradeSizingDefaultCapitalsError);
  }

  toggleConfiguration(): void { 
    this.sidenav.open();
    this.store.dispatch(new fromStore.LoadSizingSecurities());
    this.store.dispatch(new fromStore.LoadDefaultCapitals());
  }




  addSizingSecurity(payload: fromModels.SizingSecurity): void {
    this.store.dispatch(new fromStore.AddSizingSecurity(payload));
  }

  updateSizingSecurity(payload: fromModels.SizingSecurity): void {
    this.store.dispatch(new fromStore.UpdateSizingSecurity(payload));
  }

  deleteSizingSecurity(payload: fromModels.SizingSecurity): void {
    this.store.dispatch(new fromStore.DeleteSizingSecurity(payload));
  }

  saveSecurities(payload: fromModels.SizingSecurity[]): void {
    this.store.dispatch(new fromStore.SaveSizingSecurities(payload));
    this.sidenav.close();
  }





  addDefaultCapital(payload: fromModels.DefaultSizingCapital): void {
    this.store.dispatch(new fromStore.AddDefaultCapital(payload));
  }

  updateDefaultCapital(payload: fromModels.DefaultSizingCapital): void {
    this.store.dispatch(new fromStore.UpdateDefaultCapital(payload));
  }

  deleteDefaultCapital(payload: fromModels.DefaultSizingCapital): void {
    this.store.dispatch(new fromStore.DeleteDefaultCapital(payload));
  }

}
