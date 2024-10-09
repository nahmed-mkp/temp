export interface MissingDate {
    Date: Date;
    BCIDate: Date;
    GSDate: Date;
    JPMDate: Date;
    CSDate: Date;
    CIDate: Date;
}

export interface ParserRequest {
    dealer: string;
    asOfDate: Date;
}

export interface Step {
    name: string;
    isActive: boolean;
}

export interface ParserResult {
    data: string;
    date: string;
    dealer: string;
    status?: string;
}

export interface FileItemStatus {
    file: string;
    status: string;
    data?: any;
}