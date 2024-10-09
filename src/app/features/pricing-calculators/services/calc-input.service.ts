import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models';

const swaptionDummyData = {
    input: [{
        "fieldName": "Exp Date",
        "fieldType": "string",
        "uiType": "date", 
        "sortOrder": 1,
        "tabName": "Main"
    },{
        "fieldName": "Strike Price",
        "fieldType": "number",
        "uiType": "number", 
        "sortOrder": 2,
        "tabName": "Main"
    },{
        "fieldName": "Pay/Rec",
        "fieldType": "string",
        "uiType": "dropdown",
        "lookupValues": "Pay/Rec",
        "sortOrder": 3,
        "tabName": "Main"
    },{
        "fieldName": "Swap Start Date",
        "fieldType": "string",
        "uiType": "date",
        "lookupValues": "Swap Start Date",
        "sortOrder": 4,
        "tabName": "Main"
    },{
        "fieldName": "Swap Maturity Date",
        "fieldType": "string",
        "uiType": "date", 
        "sortOrder": 5,
        "tabName": "Main"
    },{
        "fieldName": "Trade Price",
        "fieldType": "number",
        "uiType": "number", 
        "sortOrder": 6,
        "tabName": "Main"
    },{
        "fieldName": "Counterparty", 
        "fieldType": "string",
        "uiType": "dropdown", 
        "lookupValues": "counterparties",
        "sortOrder": 7,
        "tabName": "Main"
    },{
        "fieldName": "Issue Country",
        "fieldType": "string",
        "uiType": "dropdown",
        "lookupValues": "issueCountry",
        "sortOrder": 8,
        "tabName": "Main"
    },{
        "fieldName": "Local Currency",
        "fieldType": "string",
        "uiType": "dropdown",
        "lookupValues": "currency",
        "sortOrder": 9,
        "tabName": "Main"
    },{
        "fieldName": "Expiry Time",
        "fieldType": "string",
        "uiType": "string", 
        "sortOrder": 10,
        "tabName": "Main"
    },{
        "fieldName": "Exchange",
        "fieldType": "string",
        "uiType": "dropdown",
        "lookupValues": "exchange",
        "sortOrder": 11,
        "tabName": "Main"
    },{
        "fieldName": "Underlying Inst Exch",
        "fieldType": "string",
        "uiType": "dropdown",
        "lookupValues": "underlyingInstExch", 
        "sortOrder": 12,
        "tabName": "Main"
    },{
        "fieldName": "Ticker",
        "fieldType": "string",
        "uiType": "string", 
        "sortOrder": 13,
        "tabName": "Main"
    },{
        "fieldName": "Security Name",
        "fieldType": "string",
        "uiType": "string", 
        "sortOrder": 14,
        "tabName": "Main"
    },{
        "fieldName": "Issuer",
        "fieldType": "string",
        "uiType": "string", 
        "sortOrder": 15,
        "tabName": "Main"
    },{
        "fieldName": "Deriv Exch",
        "fieldType": "string",
        "uiType": "dropdown",
        "lookupValues": "derivExch",
        "sortOrder": 16,
        "tabName": "Main"
    },{
        "fieldName": "CFI CODE",
        "fieldType": "string",
        "uiType": "string", 
        "sortOrder": 17,
        "tabName": "Main"
    },{
        "fieldName": "IA Override",
        "fieldType": "number",
        "uiType": "number", 
        "sortOrder": 6,
        "tabName": "Main"
    }],
    lookups: {}
}


const fxOptionDummyData = {
    input: [{
        fieldName: 'CounterParty',
        fieldType: 'string',
        uiType: 'dropdown',
        lookupValues: null,
        sortOrder: 1,
        tabName: 'Main'
    },{
        fieldName: 'Underlying Pair',
        fieldType: 'string',
        uiType: 'string',
        sortOrder: 2,
        tabName: 'Main'
    },{
        fieldName: 'Local Crrncy (LEFT)',
        fieldType: 'string',
        uiType: 'dropdown',
        lookupValues: null,
        sortOrder: 3,
        tabName: 'Main'
    },{
        fieldName: 'Crncy for Compliance(RIGHT)',
        fieldType: 'string',
        uiType: 'dropdown',
        lookupValues: null,
        sortOrder: 4,
        tabName: 'Main'
    },{
        fieldName: 'Style',
        fieldType: 'string',
        uiType: 'dropdown',
        lookupValues: null,
        sortOrder: 5,
        tabName: 'Main'
    },{
        fieldName: 'Trade Price',
        fieldType: 'number',
        uiType: 'number',
        sortOrder: 6,
        tabName: 'Main'
    },{
        fieldName: 'Strike Price',
        fieldType: 'number',
        uiType: 'number',
        sortOrder: 7,
        tabName: 'Main'
    },{
        fieldName: 'Exp Date',
        fieldType: 'string',
        uiType: 'date',
        sortOrder: 8,
        tabName: 'Main'
    },{
        fieldName: 'Settle Date',
        fieldType: 'string',
        uiType: 'date',
        sortOrder: 9,
        tabName: 'Main'
    },{
        fieldName: 'Expiry Time',
        fieldType: 'string',
        uiType: 'dropdown',
        lookupValues: null,
        sortOrder: 10,
        tabName: 'Main'
    },{
        fieldName: 'Strike Price 2',
        fieldType: 'number',
        uiType: 'number',
        sortOrder: 11,
        tabName: 'Main'
    },{
        fieldName: 'Security Name',
        fieldType: 'string',
        uiType: 'string',
        sortOrder: 12,
        tabName: 'Main'
    },{
        fieldName: 'Ticker',
        fieldType: 'string',
        uiType: 'string',
        sortOrder: 13,
        tabName: 'Main'
    },{
        fieldName: 'List Exch',
        fieldType: 'string',
        uiType: 'dropdown',
        lookupValues: null,
        sortOrder: 14,
        tabName: 'Main'
    },{
        fieldName: 'Issuer',
        fieldType: 'string',
        uiType: 'dropdown',
        lookupValues: null,
        sortOrder: 15,
        tabName: 'Main'
    },{
        fieldName: 'Delivery Type',
        fieldType: 'string',
        uiType: 'dropdown',
        lookupValues: null,
        sortOrder: 16,
        tabName: 'Main'
    },{
        fieldName: 'Contract Size Metals Only 100',
        fieldType: 'number',
        uiType: 'number',
        sortOrder: 17,
        tabName: 'Main'
    }],
    lookups: {}
}


const optionDummyData = {
    input: [{
        fieldName: 'Delivery Type',
        fieldType: 'string',
        uiType: 'dropdown',
        lookupValues: null,
        sortOrder: 16,
        tabName: 'Main'
    }]
}


@Injectable()
export class CalculationInputService {

    constructor(private http: HttpClient) { }

    loadInputs(assetClass: string): Observable<any> {
        // return this.http
        //     .get<any>(`/pricing/api/v1/calculator/inputs/${assetClass}`)
        //     .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
        if (assetClass === 'fxOptions') {
            return of(fxOptionDummyData);
        } else if (assetClass === 'swaps' || assetClass === 'swaptions') {
            return of(swaptionDummyData);
        } else if (assetClass === "options") {
            return of(optionDummyData)
        }

    }
}
