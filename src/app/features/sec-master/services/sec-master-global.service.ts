import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/sec-master-global.models';


@Injectable()
export class SecMasterGlobalService {

    private dummyUserActivity = {
        "bbg_global_id": "BBG00G4XJ578",
        "bbg_unique_id": null,
        "bbgkey": "COMDTY",
        "contractSize": 0.0,
        "counterparty": "",
        "crdSecID": null,
        "createdBy": "achand",
        "createdDate": "2021-08-31T11: 44: 29.440Z",
        "cusip": null,
        "description": null,
        "dwSecID": null,
        "forceRefresh": false,
        "identifierToUse": "BBG_Global_ID",
        "isBBGPullProcessDone": false,
        "isOTC": false,
        "isProcessed": false,
        "isRuleProcessDone": false,
        "isin": null,
        "processedTs": null,
        "pushedToCRD": false,
        "pushedToDW": false,
        "pushedToRCPM": false,
        "rcpmSID": null,
        // "requestId": "169fc8aa-2734-476d-ae0c-247dc5af5b1f",
        "requestId": "39a249bf-7411-4db4-b323-6b8e899460ea",
        "secType": "Commodity Future",
        "sedol": null,
        "ticker": null,
        "updateCRDTs": null,
        "updateDWTs": null,
        "updateRCPMTs": null
    }

    private dummySecurityDetail = {
        "request_id": "39a249bf-7411-4db4-b323-6b8e899460ea",
        "psm_rcpm_market_data_ticker": "3IU1C 123.5 Comdty",
        "security_id_number_description": "3IU1C 123.5",
        "psm_exchange_name": "CHICAGO BOARD OF TRADE",
        "rules": {
            "BloombergTickersRule": "Success",
            "FormPFRule": "Success",
            "RCPMMarketDataTickerRule": "Success",
            "IssueCountryRule": "Success",
            "MarketDataSetupRule": "Success",
            "DeliveryTypeRule": "Success",
            "TermMonthsRule": "Success",
            "PQRSubAssetClassRule": "Success",
            "AnnexIVPositionSubAssetTypeRule": "Success",
            "TickerAndSectorRule": "Success",
            "RiskCountryRule": "Success",
            "AnnexIVTransactionSubAssetClassRule": "Success",
            "AlwaysLoadRule": "Success",
            "CustomCusipRule": "Success",
            "CRDContractSizeRule": "Success",
            "FuturesTypeAttributesRule": "Success",
            "FuturesCategoryRule": "Success",
            "CustomDescriptionRule": "Success",
            "FuturesInfoRule": "Success",
            "IssuerRule": "Success",
            "ExchangeRule": "Success",
            "FuturesRootRule": "Success",
            "IssueRegionRule": "Success",
            "AssetCurrencyRule": "Success",
            "CRDSecurityTypeRule": "Success",
            "CalcTypeRule": "Success",
            "BloombergPricingFieldRule": "Success"
        },
        "open_int": "3333",
        "bloomberg_market_sector": "Comdty",
        "psm_crd_exchange_code": "",
        "strike_price": "123.5",
        "underlying_ticker": "3IZ1",
        "point_value": "1000.00",
        "psm_delivery_type": "",
        "isin": null,
        "risk_currency": "USD",
        "cfi_code": null,
        "psm_futures_root": "3I",
        "put_call_volume_ratio": null,
        "counterparty": null,
        "calendar_code": "CB",
        "psm_form_pf_sub_asset_class": "",
        "contract_size": null,
        "open_interest": "3333.0",
        "psm_is_rate_future": false,
        "bloomberg_security_type": "Financial commodity option.",
        "psm_market_data_setup": "Commodity Future Option",
        "psm_is_expired": false,
        "psm_issue_country_name": "United States",
        "psm_annexiv_position_subassettype": "",
        "option_type": "C",
        "psm_is_commodity_future": false,
        "psm_futures_category": null,
        "psm_risk_country_isocode": "USA",
        "psm_always_load": true,
        "20_day_average_volume": null,
        "expiration_date": "2021-09-17T00:00:00",
        "identifiers": {
            "crd_sec_id": 109793623,
            "rcpm_sid": null,
            "dw_sec_id": null
        },
        "psm_is_bond_future": true,
        "underlying_sec_id": "BBG00ZSDW267",
        "psm_crd_security_type": "FUTOPT",
        "psm_risk_currency": "USD",
        "psm_custom_description": "OCALL 3IU1 123.5 09/17/21",
        "exercise_type": "American",
        "psm_form_pf_region": "",
        "bloomberg_global_id": "BBG0128VP161",
        "psm_risk_country": "United States",
        "psm_form_pf_is_g10": "",
        "psm_bloomberg_ticker_and_yellow_key": "3IU1C 123.5 Comdty",
        "psm_ticker_and_sector": "",
        "bloomberg_unique_id": "IX53738118-0-8F70",
        "security_name": "US 5YR NOTE W3 OP Sep21C",
        "multiplier": null,
        "risk_country": null,
        "exchange": "XCBT",
        "psm_risk_region": "North America",
        "psm_issue_country": "USA",
        "is_otc": false,
        "psm_form_pf_country": "United States",
        "price": "0.2421875",
        "security_description": "3IU1C    123.5 COMB",
        "psm_crd_contract_size": 100000.0,
        "futures_category": "Weekly Bond Options",
        "psm_annexiv_transaction_sub_asset_class": "",
        "composite_exchange": "CBT",
        "strike_currency": "USD",
        "bloomberg_ticker": "3IU1C",
        "issue_country": null,
        "psm_pqr_sub_asset_class": "",
        "issue_currency": "USD",
        "psm_asset_currency": "USD",
        "security_type": "Commodity Future Option",
        "asset_currency": "USD",
        "is_cash_settled": "N",
        "psm_calc_type": 5,
        "underlying_bloomberg_global_id": "BBG00ZSDW267"
    }

    constructor(private http: HttpClient) { }

    loadAssetClassFieldMap(): Observable<fromModels.IAssetClassFieldMap[]> {
        return this.http
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/secmaster`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadSecMasterLookups(): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/secmaster/lookups`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadUserActivity(): Observable<fromModels.IUserActivity[]> {

        // return of([this.dummyUserActivity]);

        return this.http
            .get<fromModels.IUserActivity[]>(`http://prizm-map.mkpcap.com/api/v1/secmaster/activity`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadUserActivityProgress(payload: any): Observable<fromModels.IUserActivity> {

        const newDummy = this._dummyProgressCalculator(payload);

        return of(newDummy);

        // return this.http
        //     .get<fromModels.IUserActivity[]>(`http://prizm-map.mkpcap.com/api/v1/secmaster/activity`)
        //     .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    createNewSecurity(payload: fromModels.INewSecurity): Observable<fromModels.IUserActivity> {

        if (payload['isOTC'] === null) {
            payload['isOTC'] = false;
        }
        return this.http
            .post<fromModels.IUserActivity>(`http://prizm-map.mkpcap.com/api/v1/secmaster/create`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    retryCreateNewSecurity(payload: string): Observable<fromModels.IUserActivity> {
        return this.http
            .post<fromModels.IUserActivity>(`http://prizm-map.mkpcap.com/api/v1/secmaster/retry`, {'requestId': payload})
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadMarketDataMap(): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/secmaster/market_data_map`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadSecurityViewerDynamicTabDict(): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/secmaster/layouts`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadSecurityDetail(payload: any): Observable<any> {
        return of(this.dummySecurityDetail);
    }

    loadSecuritySearchResult(payload: fromModels.ISecuritySearchReq): Observable<fromModels.ISecuritySearchResult[]> {

        const formatRequest = {...payload};
        if (formatRequest.secType === null || formatRequest.secType === '' || formatRequest.secType === undefined) {
            delete formatRequest['secType'];
        }
        
        return this.http
            .post<fromModels.ISecuritySearchResult[]>(`http://prizm-map.mkpcap.com/api/v1/secmaster/search`, formatRequest)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadSecurityDetailFromSearch(payload: fromModels.ISecurityDetailReq): Observable<any> {
        // return of(this.dummySecurityDetail);
        payload.bbgGlobalID = payload.bbgGlobalID.toLowerCase();

        const formatPayload = {...payload};
        delete formatPayload['id'];
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/secmaster/load`, formatPayload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }


    UpdateSecurityDetail(payload: any): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/secmaster/update`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadSecurityForDelete(payload: number): Observable<any> {
        return this.http
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/secmaster/delete_security/secinfo_to_delete/${payload}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    deleteSecurity(payload: number): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/secmaster/delete_security/delete_security_sec/${payload}`, null)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadDoNotUpdateFlagSecurity(): Observable<fromModels.ISecurityForDoNotUpdateFlag[]> {
        return this.http
            .get<fromModels.ISecurityForDoNotUpdateFlag[]>(`http://prizm-map.mkpcap.com/api/v1/secmaster/do_not_update_flag/do_no_update_sec_list`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    setDoNotUpdateFlag(payload: fromModels.ISetDoNotUpdateFlag): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/secmaster/do_not_update_flag/add_remove_do_not_update_flag/${payload.CRDSecId}/${payload.action}`, null)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    manualSetDoNotUpdateFlag(payload: any): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/secmaster/do_not_update_flag/add_remove_do_not_update_flag/${payload}/Add`, null)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }







    private _dummyProgressCalculator(dummyUserActivity) {
        const newDummy = {...dummyUserActivity};


        if (newDummy['isBBGPullProcessDone'] === false) {
            newDummy['isBBGPullProcessDone'] = true;
            return newDummy;
        } 

        if (newDummy['isRuleProcessDone'] === false) {
            newDummy['isRuleProcessDone'] = true;
            return newDummy;
        }

        if (newDummy['pushedToCRD'] === false) {
            newDummy['pushedToCRD'] = true;
            return newDummy;
        }

        if (newDummy['pushedToRCPM'] === false) {
            newDummy['pushedToRCPM'] = true;
            return newDummy;
        }

        if (newDummy['pushedToDW'] === false) {
            newDummy['pushedToDW'] = true;
            return newDummy;
        }

        if (newDummy['isProcessed'] === false) {
            newDummy['isProcessed'] = true;
            return newDummy;
        }

        return newDummy
    }
}
