export interface ICommission {
    id: number;
    fund: string;
    contract: string;
    currency: string;
    extension: string;
    trade_type: string;
    description: string;
    exchange: string;
    exch_fee: number;
    cs_clearing_fee: string;
    gs_clearing_fee: string;
    jp_clearing_fee: string;
    wf_clearing_fee: string;
    citi_clearing_fee: string;
    broker: string;
    broker_fee: number;
}
