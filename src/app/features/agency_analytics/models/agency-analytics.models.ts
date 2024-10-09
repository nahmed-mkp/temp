export interface INewPortfolio {
    name: string;    
    securities: ISecurity[];

    portfolioType: 'Cash' | 'TBA' | 'TBA Deliverable' | 'Custom';
}

export interface IPortfolio extends INewPortfolio {
    guid: string;
    createdBy: string;
    createdAt: string;
    path: string; 

    // Can user edit inputs
    editable: boolean;

    // Deletion fields
    canDelete: boolean;

    // Sorting fields
    sortOrder1: string;
    sortOrder2: string;

    // UI state fields
    expanded?: boolean;
}

export interface TreeNode {
    //UI Only model
    name: string;
    children?: TreeNode[];
    treePath: string;
    level: number;
    expanded: boolean;
}

export interface ISecurity {

    // Required fields
    identifier: string;
    idType: 'CUSIP' | 'ISIN' | 'SEDOL' | 'Pool';

    // Friendly Name, Proxy and other identifiers
    refIdentifier?: string; // Proxy Identifier given by the user
    name?: string; // SECURITY_DES from Bloomberg    
    inputName?: string; // Input name given by the user
    securityType?: string;   // SECURITY_TYP (SECURITY_TYP2) from Bloomberg

    // Input Parameters for analytics
    inputType?: string;
    inputValue?: number;

    priceDate?: string;
    settleDate?: string;
    modelCode?: string;
    includePartialDurations?: boolean;
    otherDurations?: boolean;
    dialName?: string;
}

export interface IValidSecurity {
    userTerm: string;
    idType: 'CUSIP' | 'ISIN' | 'SEDOL' | 'Pool';
    identifier: string;
    name: string;
    securityType: string;
}

export interface IPortfolioDetail {
    portfolio: IPortfolio;
    indic?: any;
    py_calc?: any;
    scenario_calc?: any;
    act_vs_prj?: any;

    indicLoading?: boolean;
    indicLoaded?: boolean;
    indicError?: string;

    pyCalcLoading?: boolean;
    pyCalcLoaded?: boolean;
    pyCalcError?: string;

    rorLoading?: boolean;
    rorLoaded?: boolean;
    rorError?: string;

    actVsProjLoading?: boolean;
    actVsProjLoaded?: boolean;
    actVsProj?: string;
}

export interface ISecurityDetail {
    security: ISecurity;

    editable: boolean;

    indic?: any;
    hasIndic: boolean;

    pyCalc?: any;
    hasPYCalc: boolean;

    ror?: any;
    hasROR: boolean;

    actVsProj?: any;
    hasActVsProj: boolean;

    inputType: string;
    inputValue: number;
}


export interface ISecurityInput {
    security: ISecurity;

    editable: boolean;

    indic?: any;
    hasIndic: boolean;

    pyCalc?: any;
    hasPYCalc: boolean;

    ror?: any;
    hasROR: boolean;

    actVsProj?: any;
    hasActVsProj: boolean;

    inputType: string;
    inputValue: number;
}

export interface ISecurityInput { 

}

export interface IPortfolioSelection { 
    guid: string;
    items: ISecurityDetail[];
}

export interface IGridViews {
    selectedViews: ('inputs' | 'indicative' | 'py' | 'ror' | 'actvsproj')[];
}