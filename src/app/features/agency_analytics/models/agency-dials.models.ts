export interface IDial {
    dialId: string;
    dialName: string;
}

export interface IDialDetail extends IDial { 
    dials: any;
}

export interface INewDialDetail extends IDial {
    newName: string;
}

export interface IClonedDialDetail extends IDialDetail {
    cloneName: string;
}