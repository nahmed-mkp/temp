export interface IOrderBookParams {
    startDate: Date;
    endDate: Date;
}

export interface IOrder {
    buySell: string;
    contact: string;
    currentLevel: number;
    displayType: string;
    distancePct: number;
    distanceToLevel: number;
    expiry: string;
    inWith: string;
    lastUpdated: Date;
    locked: boolean;
    lockedBy: string;
    notes: string;
    orderDate: string;
    orderId: number;
    orderLevel: number;
    orderStatus: string;
    orderType: string;
    pod: string;
    quantity: number;
    security: string;
    securityType: string;
    sid?: number;
    type: string;
    updatedBy: string;
}

export interface IOrderHistory extends IOrder {
    auditAction: string;
    auditApp: string;
    auditDate: string;
    auditId: number;
    auditUser: string;
}

export interface ISecurityAssetType {
    sid: number;
    assetType: string;
}

export interface ILockOrderReq {
    locked: boolean;
    orderId: number;
}

export interface ISaveOrderReq {
    secName: string;
    podName: string;
    buySell: string;
    orderDate: string;
    displayType: string;
    expiry: string;
    orderType: string;
    orderStatus: string;
    inWithNotIn: string;
    orderId?: number;
    notes: string;
    qtyType: string;
    assetType: string;
    orderLevel: number;
    contact: string;
    qty: number;
}

export interface ISendEmailReq {
    to: string[] | string | any;
    subject: string;
    comment: string;
    orderIds: number[];
}
