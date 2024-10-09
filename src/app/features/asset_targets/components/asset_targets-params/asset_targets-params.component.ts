import { ChangeDetectionStrategy, Component, Input, OnInit, EventEmitter, Output, Inject, OnChanges } from '@angular/core';;
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSelectChange } from '@angular/material/select';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import * as fromModels from './../../models/asset_targets.models';
import { AssetTargetEditorViewerComponent } from '../asset-targets-editor-viewer/asset-targets-editor-viewer.component';
import { ScenarioManagementLayoutComponent } from 'src/app/features/scenario-management/containers';

@Component({
    selector: 'app-asset-targets-params',
    templateUrl: './asset_targets-params.component.html',
    styleUrls: ['./asset_targets-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetTargetsParamsComponent implements OnInit, OnChanges {

    @Input() params: fromModels.IAssetTargetsParam;
    @Input() assetType: 'fv' | 'st' = 'fv';
    @Input() editorAssetTargetType: 'fv' | 'st';
    @Input() assetTargets: any;
    @Input() editorAssetTargets: any;

    @Input() privilegedAccess: boolean;
    @Input() privilegedLimitedAccess: boolean;

    @Input() scenarioTargetDashboardData: any;
    @Input() scenarioTargetDashboardDataLoading: any;
    @Input() scenarioTargetDashboardDataLoaded: any;
    @Input() scenarioTargetDashboardDataError: any;
    
    @Input() scenarioProbabilityDashboardData: any;
    @Input() scenarioProbabilityDashboardDataLoading: any;
    @Input() scenarioProbabilityDashboardDataLoaded: any;
    @Input() scenarioProbabilityDashboardDataError: any;

    @Output() changeShowLevels: EventEmitter<fromModels.IAssetTargetsParam> = new EventEmitter<fromModels.IAssetTargetsParam>();
    @Output() changeType: EventEmitter<fromModels.IAssetTargetsParam> = new EventEmitter<fromModels.IAssetTargetsParam>();
    @Output() changeDate: EventEmitter<fromModels.IAssetTargetsParam> = new EventEmitter<fromModels.IAssetTargetsParam>();
    @Output() changeAssetType: EventEmitter<'fv' | 'st'> = new EventEmitter<'fv' | 'st'>();

    private dialogRef: MatDialogRef<AssetTargetEditorViewerComponent>;
    private scenarioDialogRef: MatDialogRef<ScenarioManagementLayoutComponent>;
    constructor(private dialog: MatDialog) { }

    ngOnInit(): void {}

    ngOnChanges(changes): void {

        if(changes && changes.editorAssetTargetType && changes.editorAssetTargetType.currentValue && changes.editorAssetTargetType.previousValue !== undefined){
            this.dialogRef.close();
            setTimeout(() => {
                this.dialogRef = this.dialog.open(AssetTargetEditorViewerComponent, {
                    width: '80vw',
                    data: {'assetTargets': this.editorAssetTargets }
                });
            }, 500);
        }; 
    }

    onDateChanged(e: MatDatepickerInputEvent<Date>): void {
        const newDate = e.value;
        newDate.setHours(0, 0, 0);
        if (this.params && (this.params.asOfDate.getFullYear() !== newDate.getFullYear() 
            || this.params.asOfDate.getMonth() !== newDate.getMonth()
            || this.params.asOfDate.getDate() !== newDate.getDate())) {
            const newParams = Object.assign({}, this.params, { asOfDate: newDate });
            this.changeDate.emit(newParams);
        }
    }

    onTypeChanged(e: MatSelectChange): void {
        if (this.params && e.value !== this.params.type) {
            const newParams = Object.assign({}, this.params, { type: e.value });
            this.changeType.emit(newParams);
        }
    }

    onAssetTypeChanged(e: MatSelectChange): void {
        if(this.assetType !== e.value){
            this.assetType = e.value;
            this.changeAssetType.emit(e.value);
        }
    }

    onShowLevelsChanged(e: MatSlideToggleChange): void {
        if (this.params && e.checked !== this.params.showLevels) {
            const newParams = Object.assign({}, this.params, { showLevels: e.checked });
            this.changeShowLevels.emit(newParams);
        }
    }

    toggleEditorView(event): void {
        this.dialogRef = this.dialog.open(AssetTargetEditorViewerComponent, {
            width: '80vw',
            data: {'assetTargets': this.editorAssetTargets}
        });
    }

    handleScenarioManagementClick(mode: 'Edit' | 'Create'){
        this.scenarioDialogRef = this.dialog.open(ScenarioManagementLayoutComponent, {
            width: '80vw',
            height: '60vh',
            data: {'assetTargets': this.editorAssetTargets, displayMode: mode }
        });
    }

}

