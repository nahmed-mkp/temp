export interface PortfolioAnalysisSecurity {
    Name: string;
    sec_id: number;
}

export interface PortfolioAnalysisRequest {
    start_date: string;
    end_date: string;
    definition: {factor: number; sec_id: number, name?: string}[];
}

export class PortfolioAnalysisRequestWithID {
    id: string;
    start_date: string;
    end_date: string;
    definition: {factor: number; sec_id: number}[];

    constructor(option: PortfolioAnalysisRequest) {
        let optionCopy: any = Object.assign({}, option);
        optionCopy.start_date = optionCopy.start_date.toLocaleDateString().split('/').join('-');
        optionCopy.end_date = optionCopy.end_date.toLocaleDateString().split('/').join('-');
        this.id = this.generate_key(optionCopy);
        this.start_date = optionCopy.start_date;
        this.end_date = optionCopy.end_date;
        this.definition = optionCopy.definition;
    }

    private generate_key(options: PortfolioAnalysisRequest) {
        let id = '';
        Object.keys(options).forEach(key => {
            if(key === 'definition') id += `${JSON.stringify(options.definition)};`;
            else id += options[key] + ';'
        })
        console.log('unique id is', id);
        return id;
    }
}


export interface PortfolioAnalysisTimeseriesPlot {
    timeseries: {
        value: number[];
        name: string;
    }[];
    date: string[];
}

export interface PortfolioAnalysisStats {
    security: string;
    max_dd: number;
    ann_vol: number;
    ann_return: number;
}

export interface PortfolioAnalysisCorrMatrix {
    sec: string[];
    data: any[];
}

export interface PortfolioAnalysisResponse {
    id: string;
    payload: {
        plot: PortfolioAnalysisTimeseriesPlot;
        stats: PortfolioAnalysisStats[];
        corr_matrix: PortfolioAnalysisCorrMatrix;
    }

}



