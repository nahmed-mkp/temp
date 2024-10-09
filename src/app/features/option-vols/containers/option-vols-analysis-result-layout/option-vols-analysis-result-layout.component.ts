import { Component, OnInit, Input, Output, EventEmitter, HostBinding, OnDestroy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import { Observable, Subscription, combineLatest } from 'rxjs';

@Component({
  selector: 'app-option-vols-analysis-result-layout',
  templateUrl: './option-vols-analysis-result-layout.component.html',
  styleUrls: ['./option-vols-analysis-result-layout.component.scss']
})
export class OptionVolsAnalysisResultLayoutComponent implements OnInit, OnDestroy, OnChanges {

  @Input() guid: string;
  @Input() onFocus: boolean;
  @Output() removeSelectedRequestId = new EventEmitter<string>();

  @HostBinding('style.height') height;
  @HostBinding('style.max-width') maxWidth = '20rem';
  @HostBinding('style.min-width') minWidth = '20rem';
  @HostBinding('style.min-height') minHeight = '11rem';
  @HostBinding('style.max-height') maxHeight = '35rem';
  @HostBinding('style.background') background;

  public result$: Observable<any>;
  public logMessage$: Observable<string>;
  public requestParam$: Observable<any>;
  public loadingStatus: boolean;
  public loadedStatus: boolean;
  private subscription: Subscription;

  // public surfaceMode: boolean = false;
  // public forwardMode: boolean = false;
  public displayMode = 'delta';

  constructor(private store: Store<fromStore.OptionVolsState>,  private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.result$ = this.store.select(fromStore.getOptionVolsResultEntitiesByGuid, this.guid);
    this.logMessage$ = this.store.select(fromStore.getOptionVolLogEntitiesByGuid, this.guid);
    this.requestParam$ = this.store.select(fromStore.getOptionVolRequestEntitiesByGuid, this.guid);
    // this.subscription = this.store.select(fromStore.getOptionVolAnalysisLoadingEntityByGuid, this.guid).subscribe(status => {
    //   this.loadingStatus = status;
    //   this.ref.markForCheck();
    // });
    this.subscription = combineLatest([
      this.store.select(fromStore.getOptionVolAnalysisLoadingEntityByGuid, this.guid),
      this.store.select(fromStore.getOptionVolAnalysisLoadedEntityByGuid, this.guid)
    ]).subscribe(([loadingStatus, loadedStatus]) => {
      this.loadingStatus = loadingStatus;
      this.loadedStatus = loadedStatus;
      this.ref.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.onFocus) {
      this.background = changes.onFocus.currentValue === true ? '#0000ff17' : 'white';
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  adjustSize(event, type) {
    this.height = event + 'px';
    if (type === 'Equity') {
      this.maxWidth = '33%';
      this.minWidth = '30rem';
    } else if (type === 'FixedIncome') {
      this.maxWidth = '40%';
      this.minWidth = '43rem';
    } else if (type === 'FX') {

      if (this.displayMode === 'surface') {
        this.maxWidth = '40%';
        this.minWidth = '43rem';
      } else if (this.displayMode === 'delta') {
        this.maxWidth = '50%';
        this.minWidth = '76rem';
      } else if (this.displayMode === 'forward') {
        this.maxWidth = '40%';
        this.minWidth = '40rem';
        this.height = '25rem';
      }
    }
  }

  onRemove() {
    this.removeSelectedRequestId.emit(this.guid);
  }

  onReload() {
    this.store.dispatch(new fromStore.ReloadRequest(this.guid));
  }

  onNotify() {
    this.store.dispatch(new fromStore.NotifySupport(this.guid));
  }

  // onToggleSurface() {
  //   this.surfaceMode = !this.surfaceMode;
  // }

  onToggleDisplayMode(type: string) {
    this.displayMode = type;

    if (this.displayMode === 'forward') {
      this.adjustSize(null, 'FX');
    }
  }

}

