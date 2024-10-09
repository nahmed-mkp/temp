export interface ICreditIndex {
    name: string;
    description: string;
}

export interface ICreditIndexConstituent {
    AsOfDate: string;
    Currency: string;
    GenericTicker: string;
    Index: string;
    Name: string;
    SeriesNum: number;
    TickerId: number;
    Type: string;
    Weight: number;
    id1: string;
    id2: string;
    industry: string;
}

export interface ICreditSectorWeight {
    Index: string;
    Industry: string;
    Weight: number;
}