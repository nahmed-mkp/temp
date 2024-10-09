export interface IChartPack {
    name: string;
    description: string;
    updateTs: string;
    feature: string; 
}

export interface ISubChart {
    name: string;
    description: string;    
    images: IChartPackImage[];
}

export interface IChartPackImage {
    fileName: string;
    url: string;
    createdOn: string;
}

