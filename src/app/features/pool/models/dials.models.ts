export class DialsSet {
    yieldbookDialsSetId: number;
    yieldbookDialsName: string;
    isDeleted: boolean;
    copyDialsFromId?: number;
}

export class NewDialsSet {
    yieldbookDialsName: string;
    copyDialsFromId?: number;
}

export class Dial {
    yieldbookDialsSetId: number;
    yieldBookDialsName: string;
    dialAttributeName: string;
    "alt-A": number;
    arms: number;
    conventional: number;
    ghlc: number;
    gnma: number;
    hels: number;
    manhousing: number;
    wholeLoans: number;
}

export class DialUpdate {
    yieldbookDialsSetId: number;
    dialName: string;
    dialAttributeName: string;
    dialValue: number;
}
