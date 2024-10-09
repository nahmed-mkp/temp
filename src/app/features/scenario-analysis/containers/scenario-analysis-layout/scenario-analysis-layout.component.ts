import { ChangeDetectionStrategy, Component, Inject, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromStore from '../../store';
import * as fromSelectors from '../../store/selectors';
import * as fromModels from '../../models';
import { MatLegacyDialog as MatDialog, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
    selector: 'scenario-analysis-layout',
    templateUrl: './scenario-analysis-layout.component.html',
    styleUrls: ['./scenario-analysis-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenarioAnalysisLayoutComponent implements OnInit {

    public linearData$: Observable<any>;
    public importableScenarios$: Observable<fromModels.IScenarioData>;
    public metaData$: Observable<fromModels.IMetaData>;
    public tabs$: Observable<fromModels.ITab[]>;   
    public currTab$: Observable<fromModels.ITab>;
    public sidPrompt$: Observable<any>;

    public showScenarioFlyout = true;

    constructor(private store: Store<fromStore.ScenarioAnalysisState>) {
        this.store.dispatch(fromStore.loadImportableScenarios());
    }

    ngOnInit(): void {
        this.linearData$ = this.store.select(fromSelectors.getPositionsAndGroupingData);
        this.importableScenarios$ = this.store.select(fromSelectors.getImportableScenarios);
        this.tabs$ = this.store.select(fromSelectors.getTabs);
        this.metaData$ = this.store.select(fromSelectors.getMetaData);
        this.currTab$ = this.store.select(fromSelectors.getCurrTab);
        this.sidPrompt$ = this.store.select(fromSelectors.getSIDPrompt);
    }

    changeFlyoutVisibility(){
        this.showScenarioFlyout = !this.showScenarioFlyout;
    }

    clientThemeSelectionChanged(event){

    }
}
