export interface Portfolio {
    // id?: string;
    portfolioId?: number;
    portfolioGuid?: string;
    name: string;
    alias?: string;
    createdBy?: string;
    createdOn?: string;

    cloneFromPortfolioId?: number;
    owner?: string;
    visibility?: string;
    portfolioDate?: string;
    buckets?: any[];
    source?: string;
    cusips?: string[];
    portfolioType?: string;
    sortId?: number;
}

export interface PoolViewerInfo {
    poolId: string;
    portfolioId: string;
}

export interface PoolItem {
    poolItemId: string;
    poolId: string;
    portfolioId: string;

    agency: string;
    cusip: string;
}

export interface PoolItemsGridColumnLayout {
    id: string;
    data?: any[];
    type?: string;
}

export interface PoolItemGridRowGrouping {
    id: string;
    data: string[];
}



export interface NewPortfolio {
    portfolio: Portfolio;
    poolViewerInfo: PoolViewerInfo;
    poolItems: PoolItem[];
}


export interface Security {
    portfolioId: number;
    currLTV: number;
    coupon: number;
    cusip: string;
    psa1Yr: number;
    currentFace: number;
    cpr3Mo: number;
    id: number;
    minLTV: number;
    waOLS: number;
    collateral: string;
    wac: number;
    wam: number;
    psaLife: number;
    poolAllocCurrentBalance: number;
    waOLTV: number;
    pctPool: number;
    originalBalance: number;
    ownerOcc: number;
    bucket: string;
    psa6Mo: number;
    va: number;
    maxOLS: number;
    poolNumber: string;
    psa2Yr: number;
    loanCount: number;
    dealFactor: number;
    poolAllocOriginalBalance: number;
    cpr1Mo: number;
    originalFace: number;
    investor: number;
    currentBalance: string;
    fico: number;
    wala: number;
    delinq60Days: number;
    secondHome: number;
    cpr6Mo: number;
    refi: number;
    purchase: number;
    waOCLTV: number;
    cmoCUSIP: string;
    tranchType: string;
    fha: number;
    cpr1Yr: number;
    maxLTV: number;
    isMega: string;
    psa3Mo: number;
    rhs: number;
    pih: number;
    psa1Mo: number;
    cpr2Yr: number;
    fctr: number;
    maxFICO: number;
    minFICO: number;
    delinq90Days: number;
    delinq120Days: number;
    minOLS: number;
    delinq30Days: number;
    agency: string;
    cprLife: number;
    marketTicker: string;
}

export interface cusipsAddOrRemove {
    cusips: string[];
    action?: string;
    portfolioId?: number; 
}

export interface cusipsAddOrRemoveResponse {
    cusips: string[],
    id: number
}

export interface defaultScenario {
    id: number;
    name: string;
    category: string;
    scenarioDescription: string;
    description: string;
    scenName: string;
    HPI: string;
    HPIStar: string;
    givenCurve: string;
    prepayRate: number;
    prepayCurve: string;
    defaultCurve: string;
    defaultRate: number;
    severityRate: number;
    severityCurv: string;
    delinqRate: number;
    DelinqCurve: string;
    wacDeter: string;
    delin: boolean;
    OptionRede: string;
    recoveryLa: string;
    extension: string;
    addOnScen: string;
    reinvestPric: string;
    stepAmount: string;
    stepSize: string;
    isStressSce: boolean;
}

export interface setting {
    keyAsString: string;
    value: any;
    type: string;
}

export interface configurations {
    globalSettings: setting[];
    severitySettings: setting[];
    calibrationSettings: setting[];
}


export interface PortfolioYieldbookResultRequest {
    batchIds?: string[];
    portfolioId?: number;
}

export interface PortfolioModelValidationRequest {
    cusip: string;
    detail_summary: 1 | 2;
}

export interface BidlistsRequest {
    end_date: Date;
    start_date: Date;
    request_type: number;
}