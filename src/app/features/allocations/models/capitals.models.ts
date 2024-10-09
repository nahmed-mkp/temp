export interface ICapitalInput {
    guid?: string;
    asOfDate: string;
    fundComplex: string;
}

export interface ICapitalSaveInput {
    guid?: string;
    asOfDate: string;
    saveForDate: string;
    fundComplex: string;
    commentary?: string;
}

export interface ISaveCapitalResult {
    guid?: string;
    asOfDate: string;
    fundComplex: string;
    isError: boolean;
    message: string;
}

export interface ICapitalMatrix {
    guid: string;
    asOfDate: string;
    fundComplex: string;
    fund: any[];
    crossPod: any[];
}

export interface IFundCapitalChange {
    guid: string;
    fundId: number;
    // fundName: string;
    oldCapital: number;
    oldLeverage: number;
    newLeverage?: number;
    newCapital?: number;
    changeType: 'ChangeTo' | 'ChangeBy';
    change: number;
}

export interface ICrossPodCapitalChange {
    guid: string;
    crossPodID: number;
    // crossPodName: string;
    oldOverage: number;
    oldCapital: number;
    changeType: 'ChangeTo' | 'ChangeBy';
    change?: number;
    newCapital: number;
}

// export interface ICapitalInput {
//     asOfDate: string;
//     useLeverage?: boolean;
//     fundComplex?: string;
// }

export interface ICapitalFlowInput {
    startDate: string;
    endDate: string;
}

export interface ICapitalHistoryInput {
    startDate: string;
    endDate: string;
    activeOnly: boolean;
    fundId?: number;
}

// export interface IPodCapitalHistoryInput extends IFundCapitalHistoryInput {
//     fundId: number;
// }

// export interface ICapitalMatrixChange {
//     fundName: string;
//     crossPodName: string;
//     oldValue: number;
//     newValue: number;
//     matrix: any[];
// }

// export interface ICapitalMatrix {
//     crossPodCapital: any[];
//     fundCapitals: any[];
// }

