export interface IDataSetSchema {
    code: string;
    name: string;
}

export interface IFilterSchema {
    name: string;
    description: string;
    uiType: string;
    values: any;
}

export interface IBucketSchema {
    name: string;
    description: string;
    uiType: string;
    values: any;

    enabled?: boolean;
    selected?: boolean;

    value?: IInputBucket;
}

export interface IRequestSchema {
    name?: string;
    dataSets: IDataSetSchema[];
    filters: IFilterSchema[];
    buckets: IBucketSchema[];
}

export interface IRequest {
    id?: string;
    name?: string;
    dataSets?: string[];
    factorDates?: IFactorDatesBucket;
    buckets?: IInputBucket[];
    fieldList?: string[];

    saved?: boolean;
}

export interface IDetailRequest extends IRequest {
    detailFieldList?: string[];
    clusterKey?: string;
}


export interface IFactorDatesBucket {
    valuesMin: string;
    valuesMax: string;
    stepSize?: number;
}

export interface IInputBucket {
    inputName: string;
    inputType: string; // numeric or categorical
    valuesMin?: string;
    valuesMax?: string;
    stepSize?: string;

    values?: any; // will change to string[] for ajax requesting
    value?: string;
    flagFilter?: boolean;
}

export interface IQueryResult {
    query: string;
    errors: any;
}
