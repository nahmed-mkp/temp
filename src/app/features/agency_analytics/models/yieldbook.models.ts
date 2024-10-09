export interface IIdentifier {
    identifier: string;
    idType: string;
}

// export interface IResponseAsync {
//     requestId: string;
// }

export interface IResultMeta {
    status: string;
    requestID: string;
    timeStamp: string;
    responseType: 'BOND_INDIC' | 'PY_CALC' | 'SCENARIO_CALC' | 'BULK_ZIP';
    resultStatus: 'ALL' | 'PARTIAL' | 'NONE';
    correlationId?: string;
}

// /********* Search  *********/

export interface IQuickSearch {
    identifier: string;
}

// export interface ISearch {
//     searchCriteria: ISearchCriteria[];
// }

// export interface ISearchCriteria {
//     keyword: 'Ticker' | 'IssuerTicker' | 'ClassName' | 'CurrentCoupon' | 'DatedDate' | 'MaturityDate'
//     | 'Description' | 'SecurityType' | 'Currency' | 'Country' | 'Moody' | 'SP' | 'Fitch';
//     condition: '>=' | '=' | '<=';
//     value: string | number | Date;
// }


export interface ISearchData {
    ticker: string;
    currency: string;
    securityId: string;
    descriptino: string;
    maturityate: string;
    securityType: string;
    currentCoupon: number;
}

export interface ISearchResult extends IResultMeta {

    results: ISearchData[]

}

// /********* Indicative Data *********/

// export interface IIndicativeData {
//     cusip: string;
//     ticker: string;
//     country: string;
//     currency: string;
//     identifier: string;
//     description: string;
//     issuerTicker: string;
//     maturityDate: string;
//     securityType: string;
//     currentCoupon: number;
//     securitySubType: string;
//     indic: any;
// }

// export interface IResultIndicativeDataSingle extends IResultMeta {
//     data: IIndicativeData;
// }

// export interface IResultIndicativeDataBulk extends IResultMeta {
//     results: IIndicativeData[];
// }