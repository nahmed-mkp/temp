export interface DateRange {
    startDate: string;
    endDate: string;
}

export interface CapitalFlow {
    TransactionId: number;
    EntryDate: string;
    EffectiveDate: string;
    IsProjection: string;
    FundName: string;
    MasterFundName: string;
    FundId: string;
    InvestorName: string;
    InvestorId: string;
    TransactionType: string;
    Full: string;
    TransactionAmountUSD: number;
    TransactionStatus: string;
    TransferDate: string;
    TransferStatus: string;
    Notes: string;
}

export interface CapitalFlowStats {
    dateRange: DateRange;
    fundList: string[];
    capitalDates: any[];
    masterFundList: string[];
    monthlyFlowByMasterFund?: any[];
    monthlyLeveredFlowByMasterFund?: any[];
    monthlyFlowPivotedByFund?: any[];
    upcomingFlows?: any[];
    monthlyFlowByFundRelationship?: any[];
    totalFlowByRelationship?: any[];
    monthlyFlowByFundInvestorType?: any[];
    totalFlowByInvestorType?: any[];
}

export interface ProjectedAUM {
    data: any[];
    cols: string[];
}

export interface CapitalFlowForm {
    investorTypes: string[];
    relationships: string[];
    regions: string[];
    consultants: string[];
}


export interface CapitalActivity {
    // Fund details
    masterFund: string;
    feederFund: string;
    isNewInvestment: boolean;

    // Investor detail
    investmentId?: number;
    investorName: string;
    fundId: string;
    investorId: string;
    investorType: string;
    relationship: string;
    region: string;
    consultant: string;
    managementFee: number;
    incentiveFee: number;
    feeNotes: string;

    // Investment detail
    transactionId?: number;
    effectiveDate: string;
    transactionType: string;
    isFullRedemption: boolean;
    transactionAmountUSD: number;
    notes: string;
}
