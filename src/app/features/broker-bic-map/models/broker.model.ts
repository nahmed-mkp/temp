export interface IBroker {
    BIC_Code: string;
    BrokerCode: string;
    BrokerName: string;
    id?: string;
}

export interface IBrokerReq {
    id?: string;
    BrokerCode: string;
    BICCode: string;
}