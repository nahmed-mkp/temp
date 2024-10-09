export interface JbotSummaryGridData {
    AsOfDate: string;
    Instrument: string;

    JBotSignal: string;
    JBotTechSignal: string;
    JDataMonitorSignal: string;
}

export interface JbotExplodedSummaryGridData  {
    AsOfDate: string;
    Instrument: string;

    JBot: number;
    JBotTech: number;
    JDataMonitor: number;

    JBotLowerBound: number;
    JBotUpperBound: string;
    JBotTechNegativeCount: number;
    JBotTechPositiveCount: number;
    JDataMonitorLowerBound: number;
    JDataMonitorUpperBound: number;

    JBotSignal: string;
    JBotTechSignal: string;
    JDataMonitorSignal: string;
}
