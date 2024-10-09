import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models';


@Injectable()
export class PricingEngineService {

    constructor(private http: HttpClient) { }

    loadLatestPortfolioDate(): Observable<any>{
        return this.http
            .get<any>('api/v1/position/portfolios/latest')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    loadData(): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/pricing-engine/data`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updatePricingMethod(payload: fromModels.PricingMethodUpdateReq): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/pricing-engine/pricing-method/`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    // All Securities -----------------------------------------------------------------------------------

    loadSecurityOwnership(payload: fromModels.SecurityOwnershipReq): Observable<any[]> {

        const formatePayload: any = { ...payload };
        formatePayload['asOfDate'] = formatePayload['asOfDate'].toLocaleDateString().split('/').join('-');

        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/pricing/whoownswhat`, formatePayload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadSecurityDetail(payload: number): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/masterdata/securities/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    // Swap ---------------------------------------------------------------------------------------------

    loadSwaps(payload: fromModels.SwapsDataReq): Observable<any[]> {

        const formatePayload: any = {...payload};
        formatePayload['asOfDate'] = formatePayload['asOfDate'].toLocaleDateString().split('/').join('-');

        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/pricing`, formatePayload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateSwap(payload: fromModels.SwapUpdateReq): Observable<any> {
        const payloadWithAssetClass = Object.assign({}, payload, { 'assetClass': 'swap' });
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/pricing/savemarkatinfo`, payloadWithAssetClass)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    // Swaptions ----------------------------------------------------------------------------------------

    loadSwaptions(payload: fromModels.SwaptionsDataReq): Observable<any[]> {

        const formatePayload: any = {...payload};
        formatePayload['asOfDate'] = formatePayload['asOfDate'].toLocaleDateString().split('/').join('-');

        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/pricing`, formatePayload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateSwaption(payload: fromModels.SwaptionUpdateReq): Observable<any> {
        const payloadWithAssetClass = Object.assign({}, payload, {'assetClass': 'swaption'});
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/pricing/savemarkatinfo`, payloadWithAssetClass)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }


    // Fx Forwards ----------------------------------------------------------------------------------------

    loadFxForward(payload: fromModels.FxDataReq): Observable<any[]> {

        const formatePayload: any = {...payload};
        formatePayload['asOfDate'] = formatePayload['asOfDate'].toLocaleDateString().split('/').join('-');

        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/pricing`, formatePayload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateFxForward(payload: fromModels.FxForwardUpdateReq): Observable<any> {
        const payloadWithAssetClass = Object.assign({}, payload, { 'assetClass': 'fx' });
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/pricing/savemarkatinfo`, payloadWithAssetClass)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    // Equities -----------------------------------------------------------------------------------------

    loadEquities(payload: fromModels.EquitiesDataReq): Observable<any[]> {

        const formatePayload: any = {...payload};
        formatePayload['asOfDate'] = formatePayload['asOfDate'].toLocaleDateString().split('/').join('-');

        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/pricing`, formatePayload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    // Futures ------------------------------------------------------------------------------------------

    loadFutures(payload: fromModels.FuturesDataReq): Observable<any[]> {

        const formatePayload: any = {...payload};
        formatePayload['asOfDate'] = formatePayload['asOfDate'].toLocaleDateString().split('/').join('-');

        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/pricing`, formatePayload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateFutures(payload: fromModels.FutureUpdateReq): Observable<any> {
        const payloadWithAssetClass = Object.assign({}, payload, {'assetClass': 'futures'});
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/pricing/savemarkatinfo`, payloadWithAssetClass)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }


    // Treasuries  --------------------------------------------------------------------------------------

    loadTreasuries(payload: fromModels.TreasuriesDataReq): Observable<any[]> {

        const formatePayload: any = {...payload};
        formatePayload['asOfDate'] = formatePayload['asOfDate'].toLocaleDateString().split('/').join('-');

        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/pricing`, formatePayload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadAuctionDates(): Observable<any[]> {

        // const formatePayload: any = {...payload};
        // formatePayload['asOfDate'] = formatePayload['asOfDate'].toLocaleDateString().split('/').join('-');

        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/pricing/tsy_auctions_announcements`, null)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateTreasury(payload: fromModels.TreasuryUpdateReq): Observable<any> {
        const payloadWithAssetClass = Object.assign({}, payload, {'assetClass': 'govt'});
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/pricing/savemarkatinfo`, payloadWithAssetClass)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    // Options ------------------------------------------------------------------------------------------

    loadOptions(payload: fromModels.OptionsDataReq) {
        const formatePayload: any = {...payload};
        formatePayload['asOfDate'] = formatePayload['asOfDate'].toLocaleDateString().split('/').join('-');

        return this.http
            .post<any[]>(`http://prizm-map.mkpcap.com/api/v1/position/pricing`, formatePayload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateOption(payload: fromModels.OptionUpdateReq): Observable<any> {

        const payloadWithAssetClass = Object.assign({}, payload, {'assetClass': 'options'});
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/pricing/savemarkatinfo`, payloadWithAssetClass)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateOptionPriceMethod(payload: fromModels.OptionPriceMethodUpdateReq): Observable<any> {
        const payloadWithAssetClass = Object.assign({}, payload, {'assetClass': 'options'});
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/positions/savepricingmethod`, payloadWithAssetClass)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    // Multi Asset Options ------------------------------------------------------------------------------------------


    loadMultiAssetOptions(payload: fromModels.MultiAssetOptionsDataReq) {
        const formattedPayload: any = {...payload};
        formattedPayload['mode'] = formattedPayload['mode'] === 1 ? 'live' : 'close';
        formattedPayload['asOfDate'] = formattedPayload['asOfDate'].toLocaleDateString().split('/').join('-');
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/pricing`, formattedPayload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateMultiAssetOption(payload: fromModels.MultiAssetOptionUpdateReq) {
        return this.http
            .post<any>('http://prizm-map.mkpcap.com/api/v1/position/pricing/multi-asset-options/update', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)))
    }

    // RV Config ------------------------------------------------------------------------------------------

    loadRVConfigData(asOfDate: string): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/position/pricing/rv/${asOfDate}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadRvConfigSuggestionsData(userInput: string): Observable<any> {
        return this.http
            .post<any>('http://prizm-map.mkpcap.com/api/v1/position/pricing/rv/suggestions', {userInput: userInput})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getMdidEnrichedData(payload: fromModels.IMdidEnrichmentReq): Observable<any> {
        return this.http
            .post<any>('http://prizm-map.mkpcap.com/api/v1/position/pricing/rv', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getUserInputEnrichedData(payload: fromModels.IDataInputEnrichmentReq): Observable<any> {
      return this.http
          .post<any>('http://prizm-map.mkpcap.com/api/v1/position/pricing/rv/user-input', payload)
          .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
  }

  updateRvTrades(payload: fromModels.IRvDataUpdateReq): Observable<any> {
      return this.http
          .post<any>('http://prizm-map.mkpcap.com/api/v1/position/pricing/rv/update', payload)
          .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
  }

  insertIntoRvTrades(payload: fromModels.IRvDataInsertReq): Observable<any> {
    return this.http
        .post<any>('http://prizm-map.mkpcap.com/api/v1/position/pricing/rv/insert', payload)
        .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
  }

  deleteFromRvTrades(payload: number[]): Observable<any> {
    return this.http
        .post<any>('http://prizm-map.mkpcap.com/api/v1/position/pricing/rv/delete', {mdids: payload})
        .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
  }

  // =================== MANUAL MARKS ====================

  loadManualMarksData(asOfDate: string): Observable<any> {
    return this.http
        .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/pricing/manual-marks`, {asOfDate: asOfDate})
        .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
  }
  
  // ==================== BVAL Bond Prices ==================

  loadBVALBondPrices(asOfDate: string): Observable<fromModels.IBVALBondPriceRes[]> {
    return this.http
        .post<fromModels.IBVALBondPriceRes[]>(`http://prizm-map.mkpcap.com/api/v1/position/pricing/bval`, {asOfDate: asOfDate})
        .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
  }
  
  loadBVALSecSuggestionsData(userInput: string): Observable<fromModels.IBVALSuggestion[]> {
      return this.http
          .post<fromModels.IBVALSuggestion[]>('http://prizm-map.mkpcap.com/api/v1/position/pricing/bval/suggestions', {userInput: userInput})
          .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
  }

  loadBVALBondPriceHistory(userInput: fromModels.IBVALPriceHistoryReq): Observable<any> {
    return this.http
        .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/pricing/bval/history`, userInput)
        .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
  }

  saveBVALProxy(userInput: fromModels.IBVALProxyReq): Observable<any> {
    return this.http
        .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/pricing/bval/saveproxy`, userInput)
        .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
  }

}

