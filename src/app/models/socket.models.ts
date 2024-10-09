export interface IAuthError {
    name: string;
    message: string;
}

export interface ISocket {
    id: string;
    state: string;
    pendingReconnect: boolean;
    connectAttempts: number;
    authState: string;
    authToken: string;
    signedAuthToken: string;
    channels: any;
    isAuthenticated: boolean;

    authError?: IAuthError;
}

export class Socket implements ISocket {
    id: string;
    state: string;
    pendingReconnect: boolean;
    connectAttempts: number;
    authState: string;
    authToken: string;
    signedAuthToken: string;
    channels: any[];
    isAuthenticated: boolean;
    authError?: IAuthError;

    constructor(options: ISocket) {
        this.id = options && options.id;
        this.state = options && options.state;
        this.pendingReconnect = options && options.pendingReconnect;
        this.connectAttempts = options && options.connectAttempts;
        this.authState = options && options.authState;
        this.authToken = options && options.authToken;
        this.signedAuthToken = options && options.signedAuthToken;
        this.channels = (options && options.channels) || [];
        this.isAuthenticated = (options && options.isAuthenticated) || false;
        this.authError = (options && options.authError);
    }
}

export interface ISubscriptionOptions {
    waitForAuth?: boolean;
    data?: any;
    batch?: boolean;
}

export class SubscriptionOptions implements ISubscriptionOptions {
    waitForAuth?: boolean;
    data?: any;
    batch?: boolean;

    constructor(options?: ISubscriptionOptions) {
        this.waitForAuth = options && options.waitForAuth;
        this.data = options && options.data;
        this.batch = options && options.batch;
    }
}

export interface IChannelPayload {
    channel: string;
    data: any;
    callback?: any;
}

export class ChannelPayload implements IChannelPayload {
    channel: string;
    data: any;
    callback?: any;

    constructor(options: IChannelPayload) {
        this.channel = options && options.channel;
        this.data = options && options.data;
        this.callback = options && options.callback;
    }
}
