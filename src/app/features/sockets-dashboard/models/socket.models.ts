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
