import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import * as fromModels from './../models/pool-viewer.models';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';

const dummyData = {
    defaultScenarios: [
        // {
        //     id: 1,
        //     name: 'Agency MBS Yield Book',
        //     category: 'Agency MBS',
        //     scenarioDescription: 'Agency MBS Yield Book',
        //     description: 'Default',
        //     scenName: 'LPS-BASE',
        //     HPI: undefined,
        //     HPIStar: undefined,
        //     givenCurve: 'YB-LIBOR',
        //     prepayRate: 100,
        //     prepayCurve: 'LPS MODEL',
        //     defaultCurve: 'LPS MODEL',
        //     defaultRate: 100,
        //     severityRate: 100,
        //     severityCurv: 'Percent',
        //     delinqRate: 100,
        //     DelinqCurve: 'LPS MODEL',
        //     wacDeter: undefined,
        //     delin: undefined,
        //     OptionRede: 'N',
        //     recoveryLa: undefined,
        //     extension: undefined,
        //     addOnScen: undefined,
        //     reinvestPric: undefined,
        //     stepAmount: undefined,
        //     stepSize: undefined,
        //     isStressSce: undefined,
        // },
        // {
        //     id: 2,
        //     name: 'Agency MBS',
        //     category: 'Agency MBS',
        //     scenarioDescription: 'Agency MBS',
        //     description: 'Default',
        //     scenName: 'LPS-BASE',
        //     HPI: undefined,
        //     HPIStar: undefined,
        //     givenCurve: 'Nominal - LIBOR_1MO',
        //     prepayRate: 100,
        //     prepayCurve: 'LPS MODEL',
        //     defaultCurve: 'LPS MODEL',
        //     defaultRate: 100,
        //     severityRate: 100,
        //     severityCurv: 'Percent',
        //     delinqRate: 100,
        //     DelinqCurve: 'LPS MODEL',
        //     wacDeter: undefined,
        //     delin: undefined,
        //     OptionRede: 'N',
        //     recoveryLa: undefined,
        //     extension: undefined,
        //     addOnScen: undefined,
        //     reinvestPric: undefined,
        //     stepAmount: undefined,
        //     stepSize: undefined,
        //     isStressSce: undefined,
        // },
        // {
        //     id: 3,
        //     name: 'Agency MBS-Pess',
        //     category: 'Agency MBS',
        //     scenarioDescription: 'Agency MBS',
        //     description: 'Default',
        //     scenName: 'LPS-PESSIMISTIC',
        //     HPI: undefined,
        //     HPIStar: undefined,
        //     givenCurve: 'Nominal - LIBOR_1MO',
        //     prepayRate: 100,
        //     prepayCurve: 'LPS MODEL',
        //     defaultCurve: 'LPS MODEL',
        //     defaultRate: 100,
        //     severityRate: 100,
        //     severityCurv: 'Percent',
        //     delinqRate: 100,
        //     DelinqCurve: 'LPS MODEL',
        //     wacDeter: undefined,
        //     delin: undefined,
        //     OptionRede: 'N',
        //     recoveryLa: undefined,
        //     extension: undefined,
        //     addOnScen: undefined,
        //     reinvestPric: undefined,
        //     stepAmount: undefined,
        //     stepSize: undefined,
        //     isStressSce: undefined,
        // },
        // {
        //     id: 4,
        //     name: 'Agency MBS-Opt',
        //     category: 'Agency MBS',
        //     scenarioDescription: 'Agency MBS',
        //     description: 'Default',
        //     scenName: 'LPS-OPTIMISTIC',
        //     HPI: undefined,
        //     HPIStar: undefined,
        //     givenCurve: 'Nominal - LIBOR_1MO',
        //     prepayRate: 100,
        //     prepayCurve: 'LPS MODEL',
        //     defaultCurve: 'LPS MODEL',
        //     defaultRate: 100,
        //     severityRate: 100,
        //     severityCurv: 'Percent',
        //     delinqRate: 100,
        //     DelinqCurve: 'LPS MODEL',
        //     wacDeter: undefined,
        //     delin: undefined,
        //     OptionRede: 'N',
        //     recoveryLa: undefined,
        //     extension: undefined,
        //     addOnScen: undefined,
        //     reinvestPric: undefined,
        //     stepAmount: undefined,
        //     stepSize: undefined,
        //     isStressSce: undefined,
        // },
    ],
    configurations: {
        globalSettings: [
            // {keyAsString: 'IntexCollatMode', value: 'Season All Assets', type: 'String'},
            // {keyAsString: 'IntexDirectory', value: 'Q:\\cmo_cdi Q:\\cmo_cdu', type: 'String'},
            // {keyAsString: 'IntexCdiDir', value: 'Q:\\cmo_cdi', type: 'String'},
            // {keyAsString: 'IntexCduDir', value: 'Q:\\cmo_cdu', type: 'String'},
            // {keyAsString: 'SssFile', value: '', type: 'String'},
            // {keyAsString: 'RatesFile', value: 'M:\Release\mkptemp\rates.ird', type: 'String'},
            // {keyAsString: 'OverrideDBName', value: '', type: 'String'},
            // {keyAsString: 'DisplayObjectPropertyGrids', value: 'False', type: 'Boolean'},
            // {keyAsString: 'SupressCurrencySwapCurveGeneration', value: 'False', type: 'Boolean'},
            // {keyAsString: 'UseAftModel', value: 'True', type: 'Boolean'},
            // {keyAsString: 'AftModelDir', value: '\\mkpcalcfarm01\AFTParams\ESPIEL_VER546G_with_LDAFiles_RRA', type: 'String'},
            // {keyAsString: 'AftModelAuxDir', value: '', type: 'String'},
            // {keyAsString: 'CapRateDateKey', value: '2013H2', type: 'String'},
            // {keyAsString: 'DefaultShockPct', value: '10', type: 'Double'},
            // {keyAsString: 'PrepayShockPct', value: '10', type: 'Double'},
            // {keyAsString: 'SeverityShockPct', value: '10', type: 'Double'},
            // {keyAsString: 'RateShockBps', value: '20', type: 'Double'},
            // {keyAsString: 'HPIShift', value: '5', type: 'Double'},
            // {keyAsString: 'NFPShift', value: '1', type: 'Double'},
            // {keyAsString: 'HPICliffVector', value: '-20,-21.61,0', type: 'String'},
            // {keyAsString: 'ServAdvancingShockPct', value: '10', type: 'Double'},
            // {keyAsString: 'ReinvestmentSpreadShockBps', value: '25', type: 'Double'},
            // {keyAsString: 'AdditionalLossType', value: 'Original Balance', type: 'String'},
            // {keyAsString: 'IgnoreCreditEnhancement', value: 'False', type: 'Boolean'},
            // {keyAsString: 'LossIsGroupBased', value: 'True', type: 'Boolean'},
            // {keyAsString: 'RunPartials', value: 'True', type: 'Boolean'},
            // {keyAsString: 'RunHorizonAnalysis', value: 'False', type: 'Boolean'},
            // {keyAsString: 'EnableAutoSave', value: 'True', type: 'Boolean'},
            // {keyAsString: 'EnableDealCashflows', value: 'False', type: 'Boolean'},
            // {keyAsString: 'LoadDealsWhenLoadingPortfolio', value: 'False', type: 'Boolean'},
            // {keyAsString: 'LoadDealsWhenRunningBonds', value: 'False', type: 'Boolean'},
            // {keyAsString: 'AutoOpenSBT', value: 'True', type: 'Boolean'},
        ],
        severitySettings: [
            // {keyAsString: 'ScalingType', value: '[none]', type: 'String'},
            // {keyAsString: 'ExtraliquidationTimeline', value: '0', type: 'Double'},
            // {keyAsString: 'UseServicerAdvMetrics', value: 'No', type: 'String'},
            // {keyAsString: 'SeverityOverride3Mo', value: '-1', type: 'Double'},
            // {keyAsString: 'ModelVersion', value: '2.5', type: 'String'},
            // {keyAsString: 'ExtLoansNonPerfAvgLiq', value: '0.3333', type: 'Double'},
            // {keyAsString: 'UseMeanErrorAdj', value: '1', type: 'Double'},
            // {keyAsString: 'UseStopAdvanceFeature', value: '0', type: 'Double'},
            // {keyAsString: 'CuringPercent', value: '2.5', type: 'Double'},
            // {keyAsString: 'UseSeverityCache', value: 'True', type: 'Boolean'},
        ],
        calibrationSettings: [
            // {keyAsString: 'CLOSystematicFactorCount', value: '101', type: 'Int32'},
            // {keyAsString: 'CLOIdiosyncraticFactorCount', value: '10', type: 'Int32'},
            // {keyAsString: 'CLOZStepSize', value: '0.25', type: 'Double'},
            // {keyAsString: 'CLOIncorporateCall', value: 'False', type: 'Boolean'},
            // {keyAsString: 'CLOIncludeReinvestment', value: 'True', type: 'Boolean'},
            // {keyAsString: 'CLOZOASAdjustmentMethod', value: 'Secant', type: 'String'},
            // {keyAsString: 'CLOStartingZOAS', value: '0', type: 'Double'},
            // {keyAsString: 'CLOMaxPrepay', value: '0.3', type: 'Double'},
            // {keyAsString: 'CLOPrepayDefaultPartial', value: '2', type: 'Double'},
            // {keyAsString: 'CLOMinBidAskSpread', value: '0', type: 'Double'},
            // {keyAsString: 'CLOBidAskSpreadIncrement', value: '1.5', type: 'Double'},
            // {keyAsString: 'CLOCalibrationID', value: '95', type: 'Int32'},
            // {keyAsString: 'CLOUseEndingProbZ', value: 'False', type: 'Boolean'},
            // {keyAsString: 'CLORunOnceAndEnd', value: 'False', type: 'Boolean'},
            // {keyAsString: 'UseLHS', value: 'True', type: 'Boolean'},
            // {keyAsString: 'CLOZeroLossOAS', value: '80', type: 'Double'},
            // {keyAsString: 'CLOModelAlpha', value: '1', type: 'Double'},
            // {keyAsString: 'CLOModelSigma', value: '0.8', type: 'Double'},
            // {keyAsString: 'CLOModelJumpProb', value: '0.01', type: 'Double'},
            // {keyAsString: 'CLOModelJumpSize', value: '2.5', type: 'Double'},
            // {keyAsString: 'CLOModelZInit', value: '0', type: 'Double'},
            // {keyAsString: 'CLOStartingZOAS', value: '0', type: 'Double'},
            // {keyAsString:'CLOModelAlphaSolverBound', value: '0.25', type: 'Double'},
            // {keyAsString: 'CLOModelSigmaSolverBound', value: '0.25', type: 'Double'},
            // {keyAsString: 'CLOModelJumpProbSolverBound', value: '0.25', type: 'Double'},
            // {keyAsString: 'CLOModelJumpSizeSolverBound', value: '0.25', type: 'Double'},
            // {keyAsString: 'CLOModelZInitSolverBound', value: '0.5', type: 'Double'},
            // {keyAsString: 'CLOModelZLOASSolverBound', value: '20', type: 'Double'},

        ]
    },
    layouts: [
        // {id: 'Standard - Pool Viewer', type: 'PoolViewer'},
        // {id: 'ARMSstandard', type: 'PoolViewer'},
        // {id: 'Performance', type: 'PoolViewer'},
        // {id: 'Quartiles', type: 'PoolViewer'},

        // {id: 'Standard - MAP Cal', type: 'MapCal'},
        // {id: 'Old Standard', type: 'MapCal'},
        // {id: 'Pricing - Agency MBS (CPR)', type: 'MapCal'},
        // {id: 'Pricing - Agency MBS (FwdCPR)', type: 'MapCal'},
        // {id: 'Horizon Analysis - Agency MBS (CPR)', type: 'MapCal'},
        // {id: 'Horizon Analysis - Agency MBS (FwdCPR)', type: 'MapCal'},
        // {id: 'Horizon Analysis - Agency MBS (Combined)', type: 'MapCal'},
        // {id: 'Europe', type: 'MapCal'},
        // {id: 'MKP Posistion', type: 'MapCal'},
        // {id: 'CMBS Sensitivities', type: 'MapCal'},
        // {id: 'CMBS Stats', type: 'MapCal'},
        // {id: 'RMBS Sensitivities', type: 'MapCal'},
        // {id: 'CLO Sensitivities', type: 'MapCal'},
        // {id: 'CLO Pricing', type: 'MapCal'},
        // {id: 'Shock Scenarios', type: 'MapCal'},
        // {id: 'CMBS Analysis', type: 'MapCal'},
        // {id: 'CMBS Yields', type: 'MapCal'},
        // {id: 'CRE Yields', type: 'MapCal'},
        // {id: 'ABX/PrimeX Sensitivities', type: 'MapCal'},
        // {id: 'ZOAS vs HPA Duration', type: 'MapCal'},
        // {id: 'OAS vs Price Vol', type: 'MapCal'},
    ],
    groupings: [
        // {id: 'agency', data: ['agency']},
        // {id: 'dealer', data: ['dealer']},
        // {id: 'marketTicker', data: ['marketTicker']},
        // {id: 'parentListName', data: ['parentListName']},
        // {id: 'podName', data: ['podName']},
        // {id: 'tradeName', data: ['tradeName']},
    ]
};

@Injectable()
export class PoolViewerService {

    constructor(private client: HttpClient) { }

    getPortfolios(): Observable<fromModels.Portfolio[]> {
        return this.client
            .get<fromModels.Portfolio[]>(`http://prizm-map.mkpcap.com/api/v1/portfolios`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    getPoolViewerInfo(payload: fromModels.Portfolio): Observable<fromModels.PoolViewerInfo> {
        return this.client
            .get<fromModels.PoolViewerInfo>(`http://prizm-map.mkpcap.com/api/v1/portfolios/${payload.portfolioId}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    getPoolInfoItems(payload: fromModels.PoolViewerInfo): Observable<fromModels.Security[]> {
        return this.client
            .get<fromModels.Security[]>(`http://prizm-map.mkpcap.com/api/v1/portfolios/${payload.portfolioId}/analytics`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    getPoolInfoItemsGridColumnsLayout(): Observable<fromModels.PoolItemsGridColumnLayout[]> {
        // return this.client
        //     .get<fromModels.PoolItemsGridColumnLayout[]>('http://prizm-map.mkpcap.com/api/v1/columnConfigurations')
        //     .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
        return of(dummyData.layouts).pipe(delay(10000));
    }

    savePoolInfoItemsGridColumnsLayout(payload: fromModels.PoolItemsGridColumnLayout): Observable<fromModels.PoolItemsGridColumnLayout> {
        // return this.client
        //     .post<fromModels.PoolItemsGridColumnLayout>('http://prizm-map.mkpcap.com/api/v1/columnConfigurations', payload)
        //     .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
        const requestPayload = JSON.stringify(payload);
        const response: fromModels.PoolItemsGridColumnLayout = JSON.parse(requestPayload);
        return of(response).pipe(delay(1000));
    }

    getPoolItemsGroupings(): Observable<fromModels.PoolItemGridRowGrouping[]> {
        return of(dummyData.groupings).pipe(delay(10000));
    }

    savePoolItemsGrouping(payload: fromModels.PoolItemGridRowGrouping): Observable<fromModels.PoolItemGridRowGrouping> {
        return of(payload).pipe(delay(1000));
    }

    createPortfolio(payload: fromModels.Portfolio): Observable<fromModels.Portfolio> {
        // return of(payload);
        // return of({id: Date.now().toString(), name: 'max return', createdBy: 'Tony', createdOn: Date.now().toString(), alias: 'Tony'});
        return this.client
            .post<fromModels.Portfolio>('http://prizm-map.mkpcap.com/api/v1/portfolios', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    clonePortfolio(payload: fromModels.Portfolio): Observable<fromModels.NewPortfolio> {
        return empty();
    }

    addCusipsToPortfolio(payload: fromModels.cusipsAddOrRemove): Observable<fromModels.cusipsAddOrRemoveResponse> {
        return this.client
            .put<fromModels.cusipsAddOrRemoveResponse>(`http://prizm-map.mkpcap.com/api/v1/portfolios/${payload.portfolioId}/cusips`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    getDefaultScenarios(): Observable<fromModels.defaultScenario[]> {
        // return this.client
        //     .get<fromModels.defaultScenario[]>('http://prizm-map.mkpcap.com/api/v1/default-scenarios')
        //     .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
        return of(dummyData.defaultScenarios as fromModels.defaultScenario[]);
    }

    getPortfolioYieldbookResult(payload: fromModels.PortfolioYieldbookResultRequest): Observable<any> {
        return this.client
            .post<any>('http://prizm-map.mkpcap.com/api/v1/portfolios/results/db', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    getPortfolioModelValidation(payload: fromModels.PortfolioModelValidationRequest): Observable<any> {
        return this.client
            .post<any>('http://prizm-map.mkpcap.com/api/v1/portfolios/results/model_validation/yieldbook', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    // Bidlist ----------------------------------------------------------------------------------------
    getBidlists(payload: fromModels.BidlistsRequest | any):  Observable<any> {
        payload.start_date = payload.start_date.toLocaleDateString();
        payload.end_date = payload.end_date.toLocaleDateString();
        return this.client
        .post<any>('http://prizm-map.mkpcap.com/api/v1/portfolios/bidlists', payload)
        .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }














    // --------------------------------------------------------------------------------------------------------------------

    getConfigurations(): Observable<fromModels.configurations> {
        return of(dummyData.configurations);
    }

    getRiskFreeRate(): Observable<any> {
        return this.client
            .get<any>('http://prizm-map.mkpcap.com/api/v1/agency/riskfreerate')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }

    updateRiskFreeRate(payload: number): Observable<any> {
        return this.client
            .put<any>('http://prizm-map.mkpcap.com/api/v1/agency/riskfreerate', {'riskFreeRate': payload})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.message)));
    }
}
