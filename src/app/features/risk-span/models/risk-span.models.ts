export interface ReportRecord {
    reportId: number;
    reportName: string;
    uploadDate: number;
    filePath: string;
}

export interface ReportPlotRequest {
    xAxis: string;
    yAxis: string[];
    series?: string;
    column?: string;
}

export interface ReportPlotResponse {
    column: string;
    columns: string[] | number[];
    plots: PlotObject[];
    rows: string[];
    series: any;
    xAxis: string;
    yAxis: string[];
}

export interface PlotObject {
    plot: SeriesData[];
    subTitle: string;
    title: string;
    xAxisVisiblity?: boolean;
}

export interface SeriesData {
    series: {
        data: [string, number][],
        name: string;
        xAxis: string;
        yAxis: string;
    };
}
