import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatSelectChange } from '@angular/material/select';
import { MatLegacyTabGroup as MatTabGroup, MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';

import * as fromModels from '../../models';
import * as fromStore from '../../store';
import { GridOptions, Column } from 'ag-grid-community';
import { AgencyPortfolioBarChartComponent } from '../../components';
import { AgencyPortfolioToolbarLayoutComponent } from '../agency-portfolio-toolbar-layout/agency-portfolio-toolbar-layout.component';
import { AgencyUtilityService } from '../../services';

@Component({
    selector: 'app-agency-portfolio-layout',
    templateUrl: './agency-portfolio-layout.component.html',
    styleUrls: ['./agency-portfolio-layout.component.scss']
})
export class AgencyPortfolioLayoutComponent implements OnInit, OnDestroy {

    @ViewChild('tabs') tabGroup: MatTabGroup;

    public activeTab = 'position';
    private dialogRef: MatDialogRef<AgencyPortfolioToolbarLayoutComponent>;
    private subscription: Subscription;

    public activePositionLayout$: Observable<fromModels.Layout>;
    public activeBenchMarkLayout$: Observable<fromModels.Layout>;
    public activeSecurityLayout$: Observable<fromModels.Layout>;
    public activeRollsLayout$: Observable<fromModels.Layout>;

    public showBarChart$: Observable<boolean>;
    public globalTextFilter$: Observable<string>;
    public targetColumn$: Observable<string>;

    public positionsData$: Observable<any[]>;
    public securitiesData$: Observable<any[]>;
    public benchmarksData$: Observable<any[]>;
    public rollsData: any[];

    public positionsDataLoadingStatus$: Observable<boolean>;
    public securitiesDataLoadingStatus$: Observable<boolean>;
    public benchmarksDataLoadingStatus$: Observable<boolean>;
    public rollsDataLoadingStatus$: Observable<boolean>;
    public allowLoadingDisplay$: Observable<boolean>;


    public positionsGridColumns: fromModels.BasicGridColumn[] = [
        {name: 'SecurityType', type: 'string', filter: 'agSetColumnFilter', sort: 'asc'},
        {name: 'Coupon', type: 'number', digit: 2},
        {name: 'UserSortTag', type: 'string'},
        {name: 'UserTagForAlloc', type: 'string'},
        {name: 'SecurityName', type: 'string', filter: 'agSetColumnFilter'},
        {name: 'TradeName', type: 'string', filter: 'agSetColumnFilter'},
        {name: 'CrossFund', type: 'string', filter: 'agSetColumnFilter'},
        {name: 'BenchMarkMissing', type: 'number', aggFunc: 'sum'},

        {name: 'CurFace', type: 'number', digit: 0, aggFunc: 'sum'},
        {name: 'CurFace_Actual_Factor', displayName: 'CurFace_ActFctr', type: 'number', digit: 0},
        {name: 'CurFaceLong', type: 'number', digit: 0, aggFunc: 'sum'},
        {name: 'CurFaceShort', type: 'number', digit: 0, aggFunc: 'sum'},
        {name: 'RiskFreeRate', type: 'number'},

        {name: 'CurrentPrice', type: 'number', digit: 2},
        {name: 'CurrentPriceTicks', type: 'string'},
        {name: 'PriceChange', type: 'number', digit: 2},
        {name: 'PriceChangeInTicks', type: 'string'},
        {name: 'LastPrice', type: 'number', digit: 2},
        {name: 'LastPriceTicks', type: 'string'},

        {name: 'Delta', type: 'number', digit: 2},
        {name: 'DeltaHedgeSize', type: 'number', digit: 2},
        {name: 'Gamma', type: 'number', digit: 2},
        {name: 'Gamma01', type: 'number', digit: 2},
        {name: 'Rho', type: 'number', digit: 2},
        {name: 'Theta', type: 'number', digit: 2},
        {name: 'Vega', type: 'number', digit: 2},


        {name: 'BenchmarkPriceTicks', type: 'string'},

        {name: 'BenchmarkName', type: 'string', filter: 'agSetColumnFilter'},
        {name: 'HedgeRatio1', type: 'number', digit: 2, format: 'percent'},
        {name: 'HedgeRatio2', type: 'number', digit: 2, format: 'percent'},
        {name: 'HedgeRatio3', type: 'number', digit: 2, format: 'percent'},
        {name: 'HedgeRatio4', type: 'number', digit: 2, format: 'percent'},
        {name: 'HedgeRatioOverride', type: 'number', digit: 4},

        {name: 'BM1', type: 'string'},
        {name: 'BM2', type: 'string'},
        {name: 'BM3', type: 'string'},
        {name: 'BM4', type: 'string'},
        {name: 'BenchmarkType', type: 'string', filter: 'agSetColumnFilter'},
        {name: 'BenchmarkPrice', type: 'number'},
        // {name:'BenchmarkSID', type:'number'},

        {name: 'BackfillFormula', type: 'string'},
        {name: 'MarketValue', type: 'number', digit: 2},
        {name: 'PnlToday', type: 'number', digit: 2},
        {name: 'DollarDuration', type: 'number', digit: 2},
        {name: 'SpreadDur', type: 'number', digit: 2},
        {name: 'Factor', type: 'number', digit: 2},


        {name: '$Duration', type: 'number', digit: 2},
        {name: '$SpreadDur', type: 'number', digit: 2},
        {name: '$DurationAdjusted', type: 'number', digit: 2},
        {name: '$PDur10Yr', type: 'number', digit: 2},
        {name: '$PDur1Yr', type: 'number', digit: 2},
        {name: '$PDur20Yr', type: 'number', digit: 2},
        {name: '$PDur2Yr', type: 'number', digit: 2},
        {name: '$PDur30Yr', type: 'number', digit: 2},
        {name: '$PDur3Yr', type: 'number', digit: 2},
        {name: '$PDur5Yr', type: 'number', digit: 2},
        {name: '$PDur6Mo', type: 'number', digit: 2},
        {name: '$PDur3Mo', type: 'number', digit: 2},

        {name: '$DurationOneBP', type: 'number', digit: 2},
        {name: '$SpreadDurOneBP', type: 'number', digit: 2},
        {name: '$DurationAdjustedOneBP', type: 'number', digit: 2},
        {name: '$PDur10YrOneBP', type: 'number', digit: 2},
        {name: '$PDur1YrOneBP', type: 'number', digit: 2},
        {name: '$PDur20YrOneBP', type: 'number', digit: 2},
        {name: '$PDur2YrOneBP', type: 'number', digit: 2},
        {name: '$PDur30YrOneBP', type: 'number', digit: 2},
        {name: '$PDur3YrOneBP', type: 'number', digit: 2},
        {name: '$PDur5YrOneBP', type: 'number', digit: 2},
        {name: '$PDur3MoOneBP', type: 'number', digit: 2},
        {name: '$PDur6MoOneBP', type: 'number', digit: 2},

        {name: 'Duration', type: 'number', digit: 2},
        {name: 'DurationAdjusted', type: 'number', digit: 2},
        {name: 'PDur10Yr', type: 'number', digit: 2},
        {name: 'PDur1Yr', type: 'number', digit: 2},
        {name: 'PDur20Yr', type: 'number', digit: 2},
        {name: 'PDur2Yr', type: 'number', digit: 2},
        {name: 'PDur30Yr', type: 'number', digit: 2},
        {name: 'PDur3Mo', type: 'number', digit: 2},
        {name: 'PDur3Yr', type: 'number', digit: 2},
        {name: 'PDur5Yr', type: 'number', digit: 2},
        {name: 'PDur6Mo', type: 'number', digit: 2},
        



        // {name:'FundId', type:'number'},
        {name: 'FundName', type: 'string', filter: 'agSetColumnFilter'},
        // {name:'FuturesId', type:'number'},
        {name: 'FuturesRoot', type: 'string'},

        {name: 'MaturityDate', type: 'date'},
        {name: 'OrigFace', type: 'number', aggFunc: 'sum'},
        {name: 'OrigFaceLong', type: 'number', aggFunc: 'sum'},
        {name: 'OrigFaceShort', type: 'number', aggFunc: 'sum'},
        // {name:'PodId', type:'number'},
        {name: 'PodGroup', type: 'string'},
        {name: 'PodName', type: 'string'},

        // {name:'SID', type:'number'},
        // {name:'TID', type:'number'},
        {name: 'Tenor', type: 'number'},
        {name: 'TenorBucket', type: 'string'},

        {name: 'KrDur3M', type: 'number', digit: 2},
        {name: 'KrDur6M', type: 'number', digit: 2},
        {name: 'KrDur1Y', type: 'number', digit: 2},
        {name: 'KrDur2Y', type: 'number', digit: 2},
        {name: 'KrDur3Y', type: 'number', digit: 2},
        {name: 'KrDur5Y', type: 'number', digit: 2},
        {name: 'KrDur10Y', type: 'number', digit: 2},
        {name: 'KrDur20Y', type: 'number', digit: 2},
        {name: 'KrDur30Y', type: 'number', digit: 2},

        {name: 'CurFaceLong_Actual_Factor', displayName: 'CurFaceLong_ActFctr', type: 'number', digit: 0},
        {name: 'CurFaceShort_Actual_Factor', displayName: 'CurFaceShort_ActFctr', type: 'number', digit: 0},
        {name: 'ActualFactor', displayName: 'ActFctr', type: 'number', digit: 2},

    ];
    public securitiesGridColumns: fromModels.BasicGridColumn[] = [

        {name: 'SecurityType', type: 'string', filter: 'agSetColumnFilter', sort: 'asc'},
        {name: 'Coupon', type: 'number', digit: 2},
        {name: 'UserSortTag', type: 'string'},
        {name: 'UserTagForAlloc', type: 'string'},
        {name: 'SecurityName', type: 'string', filter: 'agSetColumnFilter'},

        {name: 'CurFace', type: 'number', digit: 0, aggFunc: 'sum'},
        {name: 'CurFaceLong', type: 'number', digit: 0, aggFunc: 'sum'},
        {name: 'CurFaceShort', type: 'number', digit: 0, aggFunc: 'sum'},
        {name: 'FirmCurFace', type: 'number', digit: 0, aggFunc: 'sum'},
        {name: 'FirmCurFaceLong', type: 'number', digit: 0, aggFunc: 'sum'},
        {name: 'FirmCurFaceShort', type: 'number', digit: 0, aggFunc: 'sum'},
        {name: 'FirmOrigFace', type: 'number', digit: 0, aggFunc: 'sum'},
        {name: 'FirmOrigFaceLong', type: 'number', digit: 0, aggFunc: 'sum'},
        {name: 'FirmOrigFaceShort', type: 'number', digit: 0, aggFunc: 'sum'},
        {name: 'RiskFreeRate', type: 'number', digit: 2},

        {name: 'CurrentPrice', type: 'number', digit: 2},
        {name: 'CurrentPriceTicks', type: 'string'},
        {name: 'PriceChange', type: 'number', digit: 2},
        {name: 'PriceChangeInTicks', type: 'string'},
        {name: 'LastPrice', type: 'number', digit: 2},
        {name: 'LastPriceTicks', type: 'string'},

        {name: 'Delta', type: 'number', digit: 2},
        {name: 'DeltaHedgeSize', type: 'number', digit: 2},
        {name: 'BenchmarkPriceTicks', type: 'string'},

        {name: 'BenchmarkName', type: 'string', filter: 'agSetColumnFilter'},
        {name: 'HedgeRatio1', type: 'number', digit: 2},
        {name: 'HedgeRatio2', type: 'number', digit: 2},
        {name: 'HedgeRatio3', type: 'number', digit: 2},
        {name: 'HedgeRatio4', type: 'number', digit: 2},
        {name: 'HedgeRatioOverride', type: 'number', digit: 2},

        {name: 'BM1', type: 'string'},
        {name: 'BM2', type: 'string'},
        {name: 'BM3', type: 'string'},
        {name: 'BM4', type: 'string'},
        {name: 'BenchmarkType', type: 'string', filter: 'agSetColumnFilter'},
        {name: 'BenchmarkPrice', type: 'number', digit: 2},
        // {name:'BenchmarkSID', type:'number'},

        {name: 'BackfillFormula', type: 'string'},
        {name: 'MarketValue', type: 'number', digit: 2},
        {name: 'PnlToday', type: 'number', digit: 2},
        {name: 'Duration', type: 'number', digit: 2},
        {name: 'DurationAdjusted', type: 'number', digit: 2},
        {name: 'SpreadDur', type: 'number', digit: 2},
        {name: 'Gamma', type: 'number', digit: 2},
        {name: 'Gamma01', type: 'number', digit: 2},
        {name: 'Factor', type: 'number', digit: 2},
        {name: 'Rho', type: 'number', digit: 2},
        {name: 'Theta', type: 'number', digit: 2},
        {name: 'Vega', type: 'number', digit: 2},

        {name: '$Duration', type: 'number', digit: 2},
        {name: '$SpreadDur', type: 'number', digit: 2},
        {name: '$DurationAdjusted', type: 'number', digit: 2},
        {name: '$PDur10Yr', type: 'number', digit: 2},
        {name: '$PDur1Yr', type: 'number', digit: 2},
        {name: '$PDur20Yr', type: 'number', digit: 2},
        {name: '$PDur2Yr', type: 'number', digit: 2},
        {name: '$PDur30Yr', type: 'number', digit: 2},
        {name: '$PDur3Yr', type: 'number', digit: 2},
        {name: '$PDur5Yr', type: 'number', digit: 2},
        {name: '$PDur6Mo', type: 'number', digit: 2},
        {name: '$PDur3Mo', type: 'number', digit: 2},

        {name: '$DurationOneBP', type: 'number', digit: 2},
        {name: '$SpreadDurOneBP', type: 'number', digit: 2},
        {name: '$DurationAdjustedOneBP', type: 'number', digit: 2},
        {name: '$PDur10YrOneBP', type: 'number', digit: 2},
        {name: '$PDur1YrOneBP', type: 'number', digit: 2},
        {name: '$PDur20YrOneBP', type: 'number', digit: 2},
        {name: '$PDur2YrOneBP', type: 'number', digit: 2},
        {name: '$PDur30YrOneBP', type: 'number', digit: 2},
        {name: '$PDur3YrOneBP', type: 'number', digit: 2},
        {name: '$PDur5YrOneBP', type: 'number', digit: 2},
        {name: '$PDur3MoOneBP', type: 'number', digit: 2},
        {name: '$PDur6MoOneBP', type: 'number', digit: 2},

        {name: 'KrDur3M', type: 'number', digit: 2},
        {name: 'KrDur6M', type: 'number', digit: 2},
        {name: 'KrDur1Y', type: 'number', digit: 2},
        {name: 'KrDur2Y', type: 'number', digit: 2},
        {name: 'KrDur3Y', type: 'number', digit: 2},
        {name: 'KrDur5Y', type: 'number', digit: 2},
        {name: 'KrDur10Y', type: 'number', digit: 2},
        {name: 'KrDur20Y', type: 'number', digit: 2},
        {name: 'KrDur30Y', type: 'number', digit: 2},

        {name: 'PDur3Mo', type: 'number', digit: 2},
        {name: 'PDur6Mo', type: 'number', digit: 2},
        {name: 'PDur1Yr', type: 'number', digit: 2},
        {name: 'PDur2Yr', type: 'number', digit: 2},
        {name: 'PDur3Yr', type: 'number', digit: 2},
        {name: 'PDur5Yr', type: 'number', digit: 2},
        {name: 'PDur10Yr', type: 'number', digit: 2},
        {name: 'PDur20Yr', type: 'number', digit: 2},
        {name: 'PDur30Yr', type: 'number', digit: 2},



        // {name:'FuturesId', type:'number'},
        {name: 'FuturesRoot', type: 'string'},

        {name: 'MaturityDate', type: 'date'},
        {name: 'OrigFace', type: 'number', digit: 0, aggFunc: 'sum'},
        {name: 'OrigFaceLong', type: 'number', digit: 0, aggFunc: 'sum'},
        {name: 'OrigFaceShort', type: 'number', digit: 0, aggFunc: 'sum'},

        // {name:'SID', type:'number'},
        {name: 'Tenor', type: 'number', digit: 0},
        {name: 'TenorBucket', type: 'string'},




    ];
    public benchmarksGridColumns: fromModels.BasicGridColumn[] = [
        {name: 'CrossFund', type: 'string', filter: 'agSetColumnFilter', hide: true, pivot: false, enablePivot: true},
        {name: 'FundName', type: 'string', filter: 'agSetColumnFilter', hide: true, pivot: false, enablePivot: true},
        {name: 'TradeName', type: 'string', rowGroup: true, filter: 'agSetColumnFilter', hide: true, pivot: true, enablePivot: true},
        {name: 'Benchmark', type: 'string', rowGroup: true, pinned: 'left', filter: 'agSetColumnFilter', hide: true},
        {name: 'PodGroup', type: 'string', rowGroup: true, filter: 'agSetColumnFilter', hide: true, pivot: false, enablePivot: true},
        {name: 'PodName', type: 'string', hide: true, pivot: false, enablePivot: true},
        {name: 'SecurityName', type: 'string', filter: 'agSetColumnFilter', hide: true, pivot: false, enablePivot: true},
        {name: 'BenchMarkMissing', type: 'number', aggFunc: 'sum', filter: 'agSetColumnFilter', hide: true, pivot: false, enablePivot: true},

        {name: 'HedgeRatioOrDelta', type: 'number', digit: 2, hide: true},
        {name: 'SecOrigFace', type: 'number', digit: 0, aggFunc: 'sum', hide: true},
        {name: 'SecOrigFaceLong', type: 'number', digit: 0, aggFunc: 'sum', hide: true},
        {name: 'SecOrigFaceShort', type: 'number', digit: 0, aggFunc: 'sum', hide: true},
        {name: 'BMOrigFace', type: 'number', digit: 0, aggFunc: 'sum', hide: true},
        {name: 'BMOrigFaceLong', type: 'number', digit: 0, aggFunc: 'sum', hide: true},
        {name: 'BMOrigFaceShort', type: 'number', digit: 0, aggFunc: 'sum', hide: true},
        {name: 'Factor', type: 'number', digit: 2, hide: true},
        {name: 'SecCurFace', type: 'number', digit: 0, aggFunc: 'sum', hide: true},
        {name: 'SecCurFaceLong', type: 'number', digit: 0, aggFunc: 'sum', hide: true},
        {name: 'SecCurFaceShort', type: 'number', digit: 0, aggFunc: 'sum', hide: true},

        {name: 'UserSortTag', displayName: 'UserSortTag2', type: 'string', filter: 'agSetColumnFilter', hide: false, pivot: false, enablePivot: true},

        {name: 'BMCurFace', type: 'number', digit: 0, aggFunc: 'sum', hide: false},
        {name: 'BMCurFaceLong', type: 'number', digit: 0, aggFunc: 'sum', hide: true},
        {name: 'BMCurFaceShort', type: 'number', digit: 0, aggFunc: 'sum', hide: true},

        {name: '$Duration', type: 'number', digit: 2, hide: false},
        {name: '$SpreadDur', type: 'number', digit: 2, hide: false},
        {name: '$DurationAdjusted', type: 'number', digit: 2, hide: false},
        {name: '$PDur10Yr', type: 'number', digit: 2, hide: true},
        {name: '$PDur1Yr', type: 'number', digit: 2, hide: true},
        {name: '$PDur20Yr', type: 'number', digit: 2, hide: true},
        {name: '$PDur2Yr', type: 'number', digit: 2, hide: true},
        {name: '$PDur30Yr', type: 'number', digit: 2, hide: true},
        {name: '$PDur3Yr', type: 'number', digit: 2, hide: true},
        {name: '$PDur5Yr', type: 'number', digit: 2, hide: true},
        {name: '$PDur6Mo', type: 'number', digit: 2, hide: true},
        {name: '$PDur3Mo', type: 'number', digit: 2, hide: true},

        {name: '$DurationOneBP', type: 'number', digit: 2, hide: true},
        {name: '$SpreadDurOneBP', type: 'number', digit: 2, hide: true},
        {name: '$DurationAdjustedOneBP', type: 'number', digit: 2, hide: true},
        {name: '$PDur10YrOneBP', type: 'number', digit: 2, hide: true},
        {name: '$PDur1YrOneBP', type: 'number', digit: 2, hide: true},
        {name: '$PDur20YrOneBP', type: 'number', digit: 2, hide: true},
        {name: '$PDur2YrOneBP', type: 'number', digit: 2, hide: true},
        {name: '$PDur30YrOneBP', type: 'number', digit: 2, hide: true},
        {name: '$PDur3YrOneBP', type: 'number', digit: 2, hide: true},
        {name: '$PDur5YrOneBP', type: 'number', digit: 2, hide: true},
        {name: '$PDur3MoOneBP', type: 'number', digit: 2, hide: true},
        {name: '$PDur6MoOneBP', type: 'number', digit: 2, hide: true},

        {name: 'Delta', type: 'number', digit: 2, hide: true},
        {name: 'DeltaHedgeSize', type: 'number', digit: 2, hide: true},
        {name: 'DepositDaysMultiplier', type: 'number', digit: 2, hide: true},
        {name: 'Duration', type: 'number', digit: 2, hide: true},
        {name: 'DurationAdjusted', type: 'number', digit: 2, hide: true},
        {name: 'SpreadDur', type: 'number', digit: 2, hide: true},
        {name: 'Gamma', type: 'number', digit: 2, hide: true},
        {name: 'Gamma01', type: 'number', digit: 2, hide: true},
        {name: 'Rho', type: 'number', digit: 2, hide: true},
        {name: 'Theta', type: 'number', digit: 2, hide: true},
        {name: 'Vega', type: 'number', digit: 2, hide: true},

        {name: 'KrDur3M', type: 'number', digit: 2, hide: true},
        {name: 'KrDur6M', type: 'number', digit: 2, hide: true},
        {name: 'KrDur1Y', type: 'number', digit: 2, hide: true},
        {name: 'KrDur2Y', type: 'number', digit: 2, hide: true},
        {name: 'KrDur3Y', type: 'number', digit: 2, hide: true},
        {name: 'KrDur5Y', type: 'number', digit: 2, hide: true},
        {name: 'KrDur10Y', type: 'number', digit: 2, hide: true},
        {name: 'KrDur20Y', type: 'number', digit: 2, hide: true},
        {name: 'KrDur30Y', type: 'number', digit: 2, hide: true},

        {name: 'MarketValue', type: 'number', digit: 2, hide: true},
        {name: 'PnlToday', type: 'number', digit: 2, hide: false},
        {name: 'NotionalMultiplier', type: 'number', digit: 2, hide: true},

        {name: 'PDur3Mo', type: 'number', digit: 2, hide: true},
        {name: 'PDur6Mo', type: 'number', digit: 2, hide: true},
        {name: 'PDur1Yr', type: 'number', digit: 2, hide: true},
        {name: 'PDur2Yr', type: 'number', digit: 2, hide: true},
        {name: 'PDur3Yr', type: 'number', digit: 2, hide: true},
        {name: 'PDur5Yr', type: 'number', digit: 2, hide: true},
        {name: 'PDur10Yr', type: 'number', digit: 2, hide: true},
        {name: 'PDur20Yr', type: 'number', digit: 2, hide: true},
        {name: 'PDur30Yr', type: 'number', digit: 2, hide: true},









        // {name:'FundId', type:'number'},

        // {name:'PodId', type:'number'},

        // {name:'TID', type:'number'},

        // {name:'SID', type:'number'},
    ];

    public rollsGridColumns: fromModels.BasicGridColumn[] = [];

    public rangeSum: number | string = '-';
    public rangeMean: number | string = '-';
    public rangeMin: number | string = '-';
    public rangeMax: number | string = '-';

    constructor(private store: Store<fromStore.AgencyPortfolioState>,
        private dialog: MatDialog, private service: AgencyUtilityService) { }

    ngOnInit() {
        this.positionsData$ = this.store.select(fromStore.getActiveAsOfDatePositions);
        this.securitiesData$ = this.store.select(fromStore.getActiveAsOfDateSecurities);
        this.benchmarksData$ = this.store.select(fromStore.getActiveAsOfDateBenchmarks);
        this.subscription = this.store.select(fromStore.getActiveAsOfDateRolls).subscribe(rawData => {
            if (rawData && rawData.length > 0 ) {
                this.rollsData = this.service.formatRollsData(rawData);
                const newRollsGridColumns = this.service.getRollsDynamicColumnsDef(rawData);

                // Compare the old rolls grid column with the new, if no change, don't update it at all
                if (this.rollsGridColumns.length !== newRollsGridColumns.length) {
                    this.rollsGridColumns = newRollsGridColumns;
                } else {
                    // Compare column def inside TBA and Expiring ITM
                    let targetOldColDefStringArray = [...this.rollsGridColumns[2].children, ...this.rollsGridColumns[3].children];
                    targetOldColDefStringArray = targetOldColDefStringArray.map(element => element.headerName);
                    let targetNewColDefStringArray = [...newRollsGridColumns[2].children, ...newRollsGridColumns[3].children];
                    targetNewColDefStringArray = targetNewColDefStringArray.map(element => element.headerName);

                    if (JSON.stringify(targetOldColDefStringArray) !== JSON.stringify(targetNewColDefStringArray)) {
                        this.rollsGridColumns = newRollsGridColumns;
                    }
                }
            } else {
                this.rollsData = [];
                this.rollsGridColumns = [];
            }
        });

        // this.layoutNames$ = this.store.select(fromStore.getLayoutsNames);
        this.positionsDataLoadingStatus$ = this.store.select(fromStore.getPositionsLoadingStatus);
        this.securitiesDataLoadingStatus$ = this.store.select(fromStore.getSecuritiesLoadingStatus);
        this.benchmarksDataLoadingStatus$ = this.store.select(fromStore.getBenchmarksLoadingStatus);
        this.rollsDataLoadingStatus$ = this.store.select(fromStore.getRollsLoadingStatus);
        this.allowLoadingDisplay$ = this.store.select(fromStore.getAllowLoadingDisplay);

        // UI related
        this.activePositionLayout$ = this.store.select(fromStore.getActivePositionLayout);
        this.activeBenchMarkLayout$ = this.store.select(fromStore.getActiveBenchmarkLayout);
        this.activeSecurityLayout$ = this.store.select(fromStore.getActiveSecurityLayout);
        this.activeRollsLayout$ = this.store.select(fromStore.getActiveRollsLayout);

        this.showBarChart$ = this.store.select(fromStore.getBarChartShowStatus);
        this.globalTextFilter$ = this.store.select(fromStore.getGlobalTextFilter);
        this.targetColumn$ = this.store.select(fromStore.getTargetColumn);
        this.store.dispatch(new fromStore.SetColumnsSearchDict(
            {
                position: this.positionsGridColumns.map(column => column.name),
                benchmark: this.benchmarksGridColumns.map(column => column.name),
                security: this.securitiesGridColumns.map(column => column.name),
            }
        ));

        // this.onReloadData();
        // this.onModeChange();

        setTimeout(() => {
            this.dialogRef = this.dialog.open(AgencyPortfolioToolbarLayoutComponent, {
                panelClass: ['event-analysis-pop-up-panel', 'tool-bar-border-radius'],
                hasBackdrop: false,
                width: '50rem',
                height: '3.3rem',
                position: {top: '3px'}
            });
        }, 100);
    }

    ngOnDestroy() {
        // if(this.updateTimer) clearInterval(this.updateTimer);
        this.dialogRef.close();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    // onReloadData() {
    //     const liveTime = (new Date()).toLocaleDateString().split('/').join('-');
    //     const selectedDateFormat = this.time.toLocaleDateString().split('/').join('-');
    //     if(liveTime === selectedDateFormat) {
    //         this.mode = 'live';
    //         this.onModeChange();
    //     }
    //     else {
    //         this.mode = 'closing';
    //         if(this.updateTimer) clearInterval(this.updateTimer);
    //     }

    //     const displayMode = this.activeTab.toLowerCase();
    //     const requestPayload: fromModels.AgencyPortfolioRequest = {
    //         asOfDate: selectedDateFormat, displayMode: (displayMode as 'position' | 'security' | 'benchmark'),
    //         pricingMode: this.mode
    //     };

    //     this.store.dispatch(new fromStore.LoadData(requestPayload));
    // }

    onSelectedTabChange(event: MatTabChangeEvent) {
        this.activeTab = event.tab.textLabel.toLowerCase();
        this.store.dispatch(new fromStore.SetActiveTab(this.activeTab));
        // this.onReloadData();

        // Clearing State when switching tab
        this.rangeMean = '-';
        this.rangeSum = '-';
        this.rangeMin = '-';
        this.rangeMax = '-';
        this.store.dispatch(new fromStore.SetGlobalTextFilter(undefined));
        this.store.dispatch(new fromStore.SetTargetColumn(undefined));
        this.setAllowLoadingDisplay(true);
    }

    // onModeChange() {
    //     if(this.mode === 'live') {
    //         this.onSetTimeInterval(this.updateCycle);
    //     } else {
    //         if(this.updateTimer) clearInterval(this.updateTimer);
    //     }
    // }

    // onSetTimeInterval(timeLength: number) {
    //     if(this.updateTimer) clearInterval(this.updateTimer);
    //     this.updateCycle = timeLength;
    //     this.updateTimer = setInterval(() => {
    //         this.onReloadData()
    //     }, this.updateCycle*1000);
    // }

    // onOpenBarChart() {
    //     this.dialog.open(AgencyPortfolioBarChartComponent, {
    //         hasBackdrop: false,
    //         panelClass: 'event-analysis-pop-up-panel',
    //         width: '65rem',
    //         height: '40rem',
    //         data: this.
    //     })
    // }
    // onToggleBarChart() {
    //     this.showBarChart = !this.showBarChart;
    // }

    onRangesStatisticsUpdate({sum, mean, min, max}) {
        this.rangeSum = sum === undefined ? '-' : this.service.formatNumberWithCommas(sum.toFixed(2));
        this.rangeMean = mean === undefined ? '-' : this.service.formatNumberWithCommas(mean.toFixed(2));
        this.rangeMin = min === undefined ? '-' : this.service.formatNumberWithCommas(min.toFixed(2));
        this.rangeMax = max === undefined ? '-' : this.service.formatNumberWithCommas(max.toFixed(2));
    }

    // onSelectColumnLayout(layoutName: string) {
    //     this.store.dispatch(new fromStore.SetActiveLayout(layoutName));
    // }

    setAllowLoadingDisplay(event) {
        this.store.dispatch(new fromStore.AllowLoadingDisplay(event));
    }

}
