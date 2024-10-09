import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef  } from '@angular/material/legacy-dialog';

@Component({
    selector: 'app-asset-target-editor',
    templateUrl: './asset-targets-editor-viewer.component.html',
    styleUrls: [ './asset-targets-editor-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AssetTargetEditorViewerComponent implements OnInit, OnDestroy{
  
  public selectedFilter = this.data.assetTargets.countries[0];
  public filteredTargetData: [];
  public filteredProbabilityData: [];
  public accessVal: any;

  public probabilityDashboardData$:Observable<any>;
  public probabilityDashboardData: any;

  public targetDashboardData$: Observable<any>;
  public targetDashboardData: any;

  public limitedAccessLevel$: Observable<boolean>;

  public assetTargets$: Subscription;
  public assetTargetsData: any;

  public editorAssetTargetType$: Subscription;
  public editorAssetTargetType: 'fv' | 'st';

  constructor(
    public dialogRef: MatDialogRef<AssetTargetEditorViewerComponent>,
    private store: Store<fromStore.AssetTargetsState>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
   
    this.limitedAccessLevel$ = this.store.select(fromStore.getUserLimitedAccessLevel);

      this.assetTargets$ = this.store.select(fromStore.getEditorAssetTargets)
      .subscribe( targets => {
        this.assetTargetsData = targets;
      });
      this.editorAssetTargetType$ = this.store.select(fromStore.getEditorAssetType)
      .subscribe( type => {
        this.editorAssetTargetType = type;
      });
  }

    ngOnInit(): void {
      this.probabilityDashboardData$ = this.store.select(fromStore.getScenarioProbabilityDashboardData);
      this.targetDashboardData$ = this.store.select(fromStore.getScenarioTargetDashboardData);
      this.limitedAccessLevel$.pipe(take(1)).subscribe( access => {
        this.accessVal = access;
      });
    }

    ngOnDestroy(): void {
      this.assetTargets$.unsubscribe();
      this.editorAssetTargetType$.unsubscribe();
  }

    public onSelectionChanged(e: MatSelectChange){
      this.selectedFilter = e.value
    }

    public onEditorAssetTargetTypeChanged(e: MatSelectChange){
      this.store.dispatch(fromStore.changeEditorAssetType(e.value));
      this.store.dispatch(fromStore.loadEditorAssetTargets(e.value));
    } 

    public handleTargetDashboardDataChange(event: fromModels.IScenarioTargetUpdate){
      this.store.dispatch(fromStore.updateScenarioTarget({assetType: this.editorAssetTargetType, data: event}));
    }

    public handleProbabilityDashboardDataChange(event: fromModels.IScenarioProbabilityUpdate){
       this.store.dispatch(fromStore.updateScenarioProbability({assetType: this.editorAssetTargetType, data: event}));
    }
}
