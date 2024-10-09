import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewEncapsulation } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import moment from "moment";
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { ScenarioAnalysisImportDialogViewerComponent, ScenarioAnalysisNewPortfolioDialogViewerComponent } from "../../components";
import { MatTabChangeEvent } from "@angular/material/tabs";

@Component({
    selector: 'scenario-analysis-config-footer-layout',
    templateUrl: './scenario-analysis-config-footer-layout.component.html',
    styleUrls: ['./scenario-analysis-config-footer-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ScenarioAnalysisConfigFooterLayoutComponent {

    @Input() importableScenarios: fromModels.IScenarioData;
    @Input() tabs: fromModels.ITab[];
    @Input() currTab: fromModels.ITab;

    public tabIndex = 0;
    
    constructor(
        private store: Store<fromStore.ScenarioAnalysisState>, 
        private dialog: MatDialog) {}

    openUserConfig(){
        const importDialogRef = this.dialog.open(ScenarioAnalysisImportDialogViewerComponent, {
            data: {
                sharedConfigs: [...this.importableScenarios.shared],
                userConfigs: [...this.importableScenarios.userScenarios]
            }}
        )
    }

    deleteTab($event){
        this.store.dispatch(fromStore.deleteTab(this.currTab))
    }

    onTabChange(event: MatTabChangeEvent){
      if(event.tab.textLabel === '+'){
        this.openUserConfig();
      } else {
        this.store.dispatch(fromStore.switchTab(event.tab.textLabel))
      }
    }
    
    isActiveTab(name: string){
      return this.currTab.scenario.Name === name
    }       


}
