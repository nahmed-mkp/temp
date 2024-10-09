import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromServices from '../../services';
import * as fromActions from '../../store/actions';
import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { Store } from "@ngrx/store";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import { of } from "rxjs";
import * as fromSelectors from '../selectors';
import { HighchartsDataService } from 'src/app/shared/custom/utilities/highcharts-data.service';

@Injectable()
export class ScenarioAnalysisEffects {

    /* =================== SCENARIO DATA ============= */

    loadImportableScenarios$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadImportableScenarios),
        switchMap( () => {
            return this.scenarioManagementService$.loadImportableScenarios()
            .pipe(
                map( (res) => fromActions.loadImportableScenariosComplete(res)),
                catchError( (err: string) => of(fromActions.loadImportableScenariosFailed(err)))
            )
        })
    ))

    loadScenarioByGuid$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadScenarioByGuid),
        switchMap( ({guid}) => {
            return this.scenarioManagementService$.loadScenarioByConfigGuid(guid)
            .pipe(
                map((res: fromModels.IScenario) =>fromActions.loadScenarioByGuidComplete(res)),
                catchError( (err: string) => of(fromActions.loadScenarioByGuidFailed(err)))
            )
        })
    ))

    createScenario$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.saveScenario),
        switchMap( ({scenario}) => {
            return this.scenarioManagementService$.saveScenario(scenario)
            .pipe(
                map( (res) => fromActions.saveScenarioComplete(res)),
                catchError( (err: string) => of(fromActions.saveScenarioFailed(err)))
            )
        })
    ))

    /* ======================= UPDATE SCENARIO ==================== */

    updateScenario = createEffect( () => this.actions$.pipe(
        ofType(
            fromActions.updateGeneralShocks, 
            fromActions.updateCustomShocks, 
            fromActions.updateDates
        ),
        withLatestFrom(this.store.select(fromSelectors.getCurrTab)),
        switchMap( ([action, currTab]) => {
            return this.scenarioManagementService$.saveScenario(currTab.scenario)
            .pipe(
                map( (res) => fromActions.saveScenarioComplete(res)),
                catchError( (err: string) => of(fromActions.saveScenarioFailed(err)))
            )
        })
    ))

    /* ================== POSITIONS DATA ============= */

    loadPositionsLite$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadImportableScenariosComplete),
        switchMap( ({res}) => {
            return this.scenarioManagementService$.loadPositionsLiteData(res.metaData.portfolioDate)
            .pipe(
                map( (positionData) => {
                    return fromActions.loadPositionsLiteDataComplete(positionData)
                }),
                catchError( (err: string) => of(fromActions.loadPositionsLiteDataFailed(err)))
            )
        })
    ))

    /* ============ POSITIONS GROUPING DATA ============= */

    loadPositionsGroupingData$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadImportableScenariosComplete),
        switchMap( ({res}) => {
            return this.scenarioManagementService$.loadPositionGrouping(res.metaData.portfolioDate)
            .pipe(
                map( (positionData) => {
                    const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(positionData.data, 'data');
                    return fromActions.loadPositionsGroupingDataComplete(parseResult)
                }),
                catchError( (err: string) => of(fromActions.loadPositionsGroupingDataFailed(err)))
            )
        })
    ))

    /* ============ SID PROMPT ============= */

    getSIDSuggestions$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.getSIDSuggestions),
        switchMap( ({sid}) => {
            return this.scenarioManagementService$.getSIDSuggestions(sid)
            .pipe(
                map( (res) => fromActions.getSIDSuggestionsComplete(res)),
                catchError( (err: string) => of(fromActions.getSIDSuggestionsFailed(err)))
            )
        })
    ))


    constructor(
        private actions$: Actions,
        private scenarioManagementService$: fromServices.ScenarioAnalysisService,
        private store: Store<fromStore.ScenarioAnalysisState>,
        private dataService: HighchartsDataService
    ) { }
}

