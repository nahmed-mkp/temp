export interface DrawDownSecurity {
    Name: string;
    sec_id: number;
}

export interface DrawDownAnalysisRequest {
    sec_id: number;
    securityName?: string;
    observe_window: number;
    start_date: string;
    end_date: string;
    report_num: number;
    calc_method: string | 'pct';
    direction: string | 'long'
}

export class DrawDownAnalysisRequestWithID {
    id: string;
    sec_id: number;
    observe_window: number;
    start_date: string;
    end_date: string;
    report_num: number;
    calc_method: string;
    direction: string;

    constructor(options: DrawDownAnalysisRequest ) { 
        this.id = this.generate_key(options);
        this.sec_id = options && options.sec_id;
        this.observe_window = options && options.observe_window || null;
        this.start_date = options && options.start_date || null;
        this.end_date = options && options.end_date || null;
        this.report_num = options && options.report_num || null;
        this.calc_method = options && options.calc_method || null;
        this.direction = options && options.direction || null;
    }

    private generate_key(options: DrawDownAnalysisRequest): string {
        return options.sec_id.toString() + ';'+ options.observe_window.toString() + ';' + options.start_date + ';' + options.end_date + ';' + options.report_num.toString() + ';' + options.calc_method + ';' + options.direction;
    }
}

export interface DrawDownAnalysisResponse {
    observe_period_end: string;
    drawdown_start: string;
    drawdown_value: number;
    observe_period_start: string;
    drawdown_end: string;
    drawdown_interval: string;
}

export interface DrawDownTimeSeriesResponse {
    Value: number;
    Date: string;
}
