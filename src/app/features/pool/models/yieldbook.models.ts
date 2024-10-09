export interface IYieldbookRequestLog {
    yieldBookRequestID: number;
    requestType: string;
    requestingUser: string;
    requestTimestamp: number;
    success: boolean;
    processTime: number;
    environment: string;
    exceptionDetails: string;
    requestPath: string;
    responsePath: string;
}

export interface IYieldbookRequest {
    yieldBookRequestID: number;

    requestLoading?: boolean;
    requestLoaded?: boolean;
    requestError?: string;

    responseLoading?: boolean;
    responseLoaded?: boolean;
    responseError?: string;

    data: any;
}

export interface IYieldbookResponse {
    yieldBookRequestID: number;
    data: any;
}

export interface IYieldbookError {
    yieldBookRequestID: number;
    error: string;
}


