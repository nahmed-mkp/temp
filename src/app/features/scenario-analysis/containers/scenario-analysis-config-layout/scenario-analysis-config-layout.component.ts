import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { Store } from "@ngrx/store";
import moment from "moment";
import { ScenarioAnalysisImportDialogViewerComponent, ScenarioAnalysisNewPortfolioDialogViewerComponent } from "../../components";
import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { Subscription } from "rxjs";
import { MatCalendar } from "@angular/material/datepicker";

@Component({
    selector: 'scenario-analysis-config-layout',
    templateUrl: './scenario-analysis-config-layout.component.html',
    styleUrls: ['./scenario-analysis-config-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ScenarioAnalysisConfigLayoutComponent implements OnChanges{

    @ViewChild(MatCalendar) matCalendar: MatCalendar<Date>;

    @Input() importableScenarios: fromModels.IScenarioData;
    @Input() tabs: fromModels.ITab[];
    @Input() metaData: fromModels.IMetaData;
    @Input() currTab: fromModels.ITab;
    @Input() sidPrompt: any;

    public tabIndex = 0;

    public generalShockData: fromModels.IGeneralShock[] = [];
    public customShockData: fromModels.ICustomShock[] = [];

    public selectedDates: any[] = [];
    public datesSubscription$: Subscription;

    public shockTypes = [];
    public clientServicesThemes = [];

    public constructedPortfolio: fromModels.IScenario = {
        Name: "",
        CreatedBy: "",
        GeneralShocks: [],
        CustomShocks: [],
        Dates: [],
        Shared: false
    };
    
    constructor(
        private store: Store<fromStore.ScenarioAnalysisState>, 
        private dialog: MatDialog) {}

    ngOnChanges(changes: SimpleChanges): void {
        if(changes && changes.currTab && changes.currTab.currentValue !== null){
            this.tabIndex = this.tabs.findIndex(x => x.scenario.guid == this.currTab.scenario.guid);
            this.generalShockData = this.currTab.scenario['GeneralShocks'];
            this.customShockData = this.currTab.scenario['CustomShocks'];
            this.selectedDates = this.currTab.scenario['Dates'];
            this.matCalendar.updateTodaysDate();
        }

        if(changes && changes.metaData && changes.metaData.currentValue !== null){
            this.shockTypes = this.metaData.shockTypes;
            this.metaData.clientServicesThemeBreakdown.map((theme) => {
                this.clientServicesThemes.push(theme['ClientServicesThemeBreakdown']);
            });
        }   
    }

    openUserConfig(){
        const importDialogRef = this.dialog.open(ScenarioAnalysisImportDialogViewerComponent, {
            data: {
                sharedConfigs: [...this.importableScenarios.shared],
                userConfigs: [...this.importableScenarios.userScenarios]
            }}
        )
    }

    createUserConfig(){
        const newPortfolioDialogRef = this.dialog.open(ScenarioAnalysisNewPortfolioDialogViewerComponent)
    }

    isSelected = (event: any) => {
        const date = moment(event).format('MM-DD-YYYY')
        return this.selectedDates.find(x => x == date) ? "selected" : null;
    };

    select(event: any, calendar: any) {
        const date = moment(event).format('MM-DD-YYYY')
        const index = this.selectedDates.findIndex(x => x == date);
        (index < 0) ? this.selectedDates.push(date) : this.selectedDates.splice(index, 1);
        this.store.dispatch(fromStore.updateDates(this.selectedDates));
        calendar.updateTodaysDate();
    }

    isActiveTab(name: string){
        return this.currTab.scenario.Name === name
    }   
    
    onSidInput(userInput: string){
      debugger;
        this.store.dispatch(fromStore.getSIDPrompt({sid: userInput}));
    }

    onUpdateCustomShocks(customShocks: fromModels.ICustomShock[]){
        this.store.dispatch(fromStore.updateCustomShocks(customShocks));
    }


}
