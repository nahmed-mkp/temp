export interface CorrelationRequest {
    sec_y: string;
    sec_y_method: string;
    sec_x: string;
    sec_x_method: string;
    start_date: string;
    end_date: string;
    window: number[];
}

export class CorrelationRequestWithID {
    id: string;
    sec_y: string;
    sec_y_method: string;
    sec_x: string;
    sec_x_method: string;
    start_date: string;
    end_date: string;
    window: number[];


    constructor(options: CorrelationRequest) {
        this.id = this.generate_key(options);
        this.sec_x = options.sec_x;
        this.sec_x_method = options.sec_x_method;
        this.sec_y = options.sec_y;
        this.sec_y_method = options.sec_y_method;
        this.start_date = options.start_date;
        this.end_date = options.end_date;
        this.window = options.window;
    }

    private generate_key(options: CorrelationRequest) {
        let id = '';
        Object.keys(options).forEach(key => {
            id += options[key].toString() + ';'
        })
        console.log('unique id is', id);
        return id;
    }
}


export interface CorrelationResponse {
    id: string;
    correlation: any[];
    timeseries: any[];
}