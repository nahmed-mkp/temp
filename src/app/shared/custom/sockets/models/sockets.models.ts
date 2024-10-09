export interface AuthToken {
    username: string;
    token: string;
}

export interface SocketDashboardUpdate {
    id: string;
    state: string;
    channels: string[];
    channelSubCount: number;
    inboundReceived: number;
    inboundProcessed: number;
    outboundSent: number;
    remotePort: number;
    timestamp: number;
    username: string;
    authState: string;
    authToken: AuthToken;
}

export interface SocketConnected {
    authToken: AuthToken | null;
    id: string;
    isAuthenticated: boolean;
    pingTimeout: number;
}

export interface ProcessMonitorUpdate {
    name: string;
    machine: string;
    status: string;
    time: string;
}

export interface SocketEventMsg {
    event?: SocketEvent;
    data?: any;
    status?: any;
    channelName?: string;
}

export type SocketEvent =
      'SOCKET_CREATED'
    | 'SOCKET_CONNECTED'
    | 'SOCKET_DISCONNECTED'
    | 'SOCKET_SUBSCRIBED'
    | 'SOCKET_UNSUBSCRIBED'
    | 'SOCKET_AUTHENTICATED'
    | 'SOCKET_CHANNEL_DATA_ARRIVED';

