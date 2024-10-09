import { Params, NavigationExtras } from '@angular/router';

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface NavigationPayload {
    path: any[];
    queryParams?: object;
    extras?: NavigationExtras;
}
