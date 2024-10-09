export interface TimeseriesAnalysis {
    id?: number;
    name: string;
    description: string;
    createdBy?: string;
    createdOn?: string;
    guid: string;
}

export interface Configuration {
    guid: string;
    startDate: string | Date;
    endDate: string | Date;

    timeseriesAndFormulas: TimeseriesExpression[];
    variables?: {
        name: string;
        value: string;
    }[];
    // preprocessing?: string;

    // Event Analysis
    preprocessing?: string;
    eventCalender?: string;
    daysBefore?: number;
    daysAfter?: number;

    // Multifactor Regression Analysis
    regressionConfiguration?: MultiFactorRegression[];
}

export interface MultiFactorRegression {
    independentVariable: string;
    dependentVariables: string[];
}

export interface PreprocessOption {
    name: string;
    displayName: string;
}

export interface TimeseriesExpression {
    label: string;
    source: string;
    expression: string;
    displayName: string;
    alias: string;
    transformation: string; // 'Original' | 'Difference' | 'Absolute Diff' | 'Pct Change';
    customAxis: boolean;
    exclude: boolean;
    symbol?: string;
}

export interface MarketDataProvider {
    id: string;
    name: string;
    baseUrl: string;
}

export interface EventCalendar {
    key: string;
    value: string;
}


export interface EventAnalysisResultData {
    calendarDates: string[];
    gridData: any[];
    name: string;
    plotData: any[];
    summaryStats: any[];
    tabData: any;
    styleMetadata: {
        lineColors: {[date: string]: string},
        lineDashStyles: {[asset: string]: string},
    };
}


// Calendar
export interface ICalendar {
    id?: number;
    name: string;
    owner?: string;
    type: string;

    groupId: number;
    groupName?: string;
    groupDescription?: string;
    level?: number;
    folderPath?: string;

    region?: string;
    subType?: string;
    person?: string;
    orgHierarchy?: string[];
}

export interface ICalendarDate {
    calendarId: number;
    date: string;
}

export interface AddNewCalenderDate extends ICalendarDate {
    action: string;
}

export interface customFunctionSet {
    [key: string]: {
        description: string;
        name: string;
        params: string;
    }
}

export const legendStyleCollection: any = {
    Solid: {
        'stroke-dasharray': 'none',
        'stroke-width': 2,
        'stroke': 'rgb(119, 136, 153)',
    },
    Dash: {
        'stroke-width': 2,
        'stroke-dasharray': '8, 6',
        'stroke': 'rgb(119, 136, 153)',
    },
    ShortDashDot: {
        'stroke': 'rgb(119, 136, 153)',
        'stroke-width': 2,
        'stroke-dasharray': '6, 2, 2, 2',
    },
    LongDash: {
        'stroke':' rgb(119, 136, 153)',
        'stroke-width': 2,
        'stroke-dasharray': '16, 6',
    },
    DashDot: {
        'stroke': 'rgb(119, 136, 153)',
        'stroke-width': 2,
        'stroke-dasharray': '8, 6, 2, 6',
    },
    ShortDash: {
        'stroke': 'rgb(119, 136, 153)',
        'stroke-width': 2,
        'stroke-dasharray': '6, 2',
    },
    LongDashDot: {
        'stroke': 'rgb(119, 136, 153)',
        'stroke-width': 2,
        'stroke-dasharray': '16, 6, 2, 6',
    }
};

export const highchartdefaultSymbols = [
    '&#9632;',     // BLACK SQUARE
    '&#9633;',     // WHITE SQUARE
    '&#9635;',     // WHITE SQUARE CONTAINING BLACK SMALL SQUARE
    '&#9706;',     // SQUARE WITH LOWER RIGHT DIAGONAL HALF BLACK
    '&#9650;',     // BLACK UP-POINTING TRIANGLE
    '&#9651;',     // WHITE UP-POINTING TRIANGLE
    '&#9670;',     // BLACK DIAMOND
    '&#9671;',     // WHITE DIAMOND
    '&#9672;',     // WHITE DIAMOND CONTAINING BLACK SMALL DIAMOND
    '&#9956;',     // PENTAGRAM
    '&#10033;',    // HEAVY ASTERISK
];


export const uniquePlotSymbols = [
    '&#9930;',     // TURNED BLACK SHOGI PIECE
    '&#9929;',     // TURNED WHITE SHOGI PIECE

    '&#9816;',     // WHITE CHESS KNIGHT

    '&#9828;',     // WHITE SPADE SUIT
    '&#9824;',     // BLACK SPADE SUIT

    '&#9734;',     // WHITE STAR
    '&#9733;',     // BLACK STAR

    '&#9678;',     // BULLSEYE

    '&#9671;',     // WHITE DIAMOND
    '&#9670;',     // BLACK DIAMOND

    '&#9651;',     // WHITE UP-POINTING TRIANGLE
    '&#9650;',     // BLACK UP-POINTING TRIANGLE

    '&#9633;',     // WHITE SQUARE
    '&#9632;',     // BLACK SQUARE
];


export const uniquePlotSymbolsSVG = [
    '/assets/marker/square-solid.svg',    // highchart default
    '/assets/marker/square-regular.svg',
    // '/assets/marker/bookmark-solid.svg',
    // '/assets/marker/bookmark-solid.svg',
    '/assets/marker/triangle-solid.svg',    // highchart default
    '/assets/marker/triangle-regular.svg',

    '/assets/marker/circle-solid.svg',      // highchart default
    '/assets/marker/circle-regular.svg',

    '/assets/marker/diamond-solid.svg',    // highchart default
    '/assets/marker/diamond-regular.svg',

    '/assets/marker/star-solid.svg',
    '/assets/marker/star-regular.svg',

    '/assets/marker/spade-solid.svg',
    '/assets/marker/spade-regular.svg',

    '/assets/marker/shield-solid.svg',
    '/assets/marker/shield-regular.svg',

    '/assets/marker/chess-solid.svg',
    '/assets/marker/chess-regular.svg',
];

export const uniqueHighchartSymbols = [
    'circle',
    'square',
    'diamond',
    'triangle',
    'star',
    'spade',
    'shield',

    'circle-regular',
    'square-regular',
    'diamond-regular',
    'triangle-regular',
    'star-regular',
    'spade-regular',
    'shield-regular',
];

export const uniqueHighchartSymbolsHexCode = {
    'circle': '&#9679',
    'circle-regular': '&#9675',
    'square': '&#9632',
    'square-regular': '&#9633',
    'diamond': '&#9670',
    'diamond-regular': '&#9671',
    'triangle': '&#9650',
    'triangle-regular': '&#9651',
    'star': '&#9733',
    'star-regular': '&#9734',
    'spade': '&#9824',
    'spade-regular': '&#9828',
    'shield': '&#9930',
    'shield-regular': '&#9929'
};
