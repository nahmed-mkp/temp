export interface EuroRateFile {
    asOfDate: string;
    errors: string;
    fileName: string;
    filePath: string;
    id: number;
    lastModifiedTime: number;
    processName: string;
    status: string;
    queueId: number;

    progress?: any
    downloadPriority?: number;
    
}

export interface requestFilesDownloadPayload {
    requestId: number;
    downloadPriority: number;
}

export interface fileDownFileProgress {
    errorCount: number;
    filePath: string;
    overallStatus: string;
    processingCount: number;
    queueId: number;
    queueStatus: string;
    queuedCount: number;
    requestId: number;
    successCount: number;
    totalCount: number;
}

export interface fileOrderChangeRecord {
    'avaliable-file': number[];
    'download-file': number[];
}