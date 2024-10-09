export interface ITradeAgreementType {
    id: number;
    code: string;
    description: string;
    name: string;
}

export interface ITradeAgreement {
    id: number;
    blotterType: string;
    tradeAgreement: string;
    dealer: string;
    entity: string;
    secType: string;
    invClass: string;
    underlyingSecType: string;
    excludedSecTypes: string;
    crdBroker: string;
    currency: string;
    execPlatform: string;
    custodian: string;
    alphaPort: boolean;
    opportunity: boolean;
    enhancedOpp: boolean;
    ma7: boolean;
    select: boolean;
    gmmk: boolean;
    bluePearl: boolean;
    aexeobrokercode: string;

    recordId?: string;
    _notSave?: boolean;

    secTypes?: string;
    underlyingSecTypes?: string;

    alphaPortCanTrade?: boolean;
    opportunityCanTrade?: boolean;
    enhancedOppCanTrade?: boolean;
    ma7CanTrade?: boolean;
    selectCanTrade?: boolean;
    gmmkCanTrade?: boolean;
    bluePearlCanTrade?: boolean;
}

export interface ITradeAgreementAllocationCache {
    allocationId: number;
    tradeAgreement: string;
    secType: string;
    entity: string;
    crdBroker: string;
    currency: string;
    custodian: string;
    alphaPort: string;
    opportunity: string;
    enhancedOpp: string;
    ma7: string;
    select: string;
    gmmk: string;
    bluePearl: string;
}

export interface ITradeAgreementSecType {
    tradeAgreement: string;
    secType: string;
    underlyingSecType: string;
}

export interface IFXGiveupAgreement {
    id: number;
    fund: string;
    allowedCustodians: string[];
}

export interface IParticipationResult {
    fund: string;
    canTrade: boolean;
    responseText: string;
    reason: string;
}
