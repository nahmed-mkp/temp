export interface HealthCheck {
    id: number;
    bbgs?: any;
}

export interface RunHistoryRequest {
    appName: string;
    machineName: string;
}

export interface AppRestartRequest {
    appName: string;
    machineName: string;
    userName?: string;
}

export interface ProcessKillRequest {
    appName: string;
    machineName: string;
    pid: number;
    userName?: string;
}

export interface BulkRequest { 
    machineName: string;
    userName: string;
    requestType: 'Restart All Calc Servers' | 'Login And Restart Bloomberg' | 'Login and Restart Tradeweb';
}

export interface ProcessMonitorUpdate {
    name: string;
    machine: string;
    status: string;
    time: string;
}
