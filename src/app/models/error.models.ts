export interface HttpError {
    type?: string;
    statusCode?: any;
    message?: string;
    method?: string;
    reqPayload?: any;
    timeStamp?: string;
    error?: any;
}