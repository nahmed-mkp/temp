export interface IAssetClass {
    assetClassId: number;
    assetClass: string;
}

export interface IAssetClassMapType {
    assetClassMapTypeId: number;
    assetClassMapType: string;
}

export interface IBBGField {
    bbgFieldId: number;
    bbgFieldName: string;
}

export interface IMKPField {
    mkpFieldId: number;
    mkpFieldName: string;
}

export interface IAssetClassFieldMap {
    mapId: number;  // Unique Id

    crdAssetClass: string;
    assetClass: string;
    assetClassMapType: string;
    mkpFieldName: string;
    bbgFieldName: String;
    mkpFieldId: number;
    bbgFieldId: number;
    priority: number;

    assetClassMapTypeId: number;
    assetClassId: number;
    crdAssetClassId: number;
}

export interface INewSecurity {
    identifierType: string;
    identifier: string;
    assetClass: string;

    isOTC?: boolean;
    counterparty?: string;
    contractSize?: number;

    requestId?: string;
}

export interface IUserActivity {
    requestId: string;
    bbg_global_id: string;
    bbg_unique_id: string;
    bbgkey: string;
    contractSize: number;
    counterparty: string;
    crdSecID?: number;
    createdBy: string;
    createdDate: string;
    cusip: string;
    description: string;
    dwSecID: string;
    forceRefresh: boolean;
    identifierToUse: string;
    isBBGPullProcessDone: boolean;
    isErrored: boolean;
    isOTC: boolean;
    isProcessed: boolean;
    isRuleProcessDone: boolean;
    isin: string;
    processedTs: string;
    pushedToCRD: boolean;
    pushedToDW: boolean;
    pushedToRCPM: boolean;
    rcpmSID: number;
    secType: string;
    sedol: string;
    ticker: string;
    updateCRDTs: string;
    updateDWTs: string;
    updateRCPMTs: string;
}

export interface IBbgDataMap {
    IsBBGField: boolean;
    PSM_DB_Field_Name: string;
    PSM_Display_Name: string;
    SecType: string;
    Source: string;
    Source_Field_Name: string;
}

export interface ISecuritySearchReq {
    secName: string;
    secType?: string;
}

export interface ISecuritySearchResult {
    BBGGlobalId: string;
    CRDSecId: number;
    CreatedBy: string;
    CreatedDate: string;
    Cusip: string;
    DWHSecId: number;
    Description: string;
    ISIN: string;
    IsOtc: boolean;
    RCPMName: string;
    RCPMSID: number;
    SecTypeId: number;
    SecurityType: string;
}

export interface ISecurityDetailReq {
    secType: string;
    bbgGlobalID: string;

    id?: string // this is mean for cache (bbgGlobalID | secType)
}

export interface ISecuritySearchForRenameOrDeleteReq {
    sec_id: string;
    sec_name: string;
}

export interface ISecurityForRenameOrDeleteReq {
    sec_id: string;
    sec_name: string;
    bbg_global_id: string;
    cusip: string;
    action: 'delete' | 'rename';
}

export interface ISecurityForDoNotUpdateFlag {
    BBGGlobalId: string;
    CRDSecId: number;
    CreatedBy: string;
    CreatedDate: string;
    DoNoUpdateFlag: boolean;
    SecName: string;
    UpdatedBy: string;
    UpdatedDate: string;
}

export interface ISetDoNotUpdateFlag {
    CRDSecId: number;
    action: 'Add' | 'Remove'
}