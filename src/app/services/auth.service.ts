
import * as fromRoot from '../store';

import { IAuthenticatedUser } from '../models/login.models';
// import { Headers, Http, RequestOptions } from '@angular/http';

import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {

  redirectUrl: string;
  helper: JwtHelperService;

  constructor(private store: Store<fromRoot.RootState>, private client: HttpClient) {
      this.helper = new JwtHelperService();
  }

  public isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();
    return accessToken !== null && !this.helper.isTokenExpired(accessToken);
  }

  public isExpired(): boolean {
    const accessToken = this.getAccessToken();
    return accessToken !== null && this.helper.isTokenExpired(accessToken);
  }

  public getAccessToken(): string {
    const currentUser = this.getCurrentUserFromLS();
    return currentUser && currentUser.accessToken;
  }

  public getSubscriptionToken(): string {
    const currentUser = this.getCurrentUserFromLS();
    return currentUser && currentUser.subscriptionToken;
  }

  public getUser(): string {
    const currentUser = this.getCurrentUserFromLS();
    return currentUser && currentUser.ntName;
  }

  public getName(): string {
    const currentUser = this.getCurrentUserFromLS();
    return currentUser && `${currentUser.name}` || '';
  }

  public getUserPicture(): string {
    return 'https://via.placeholder.com/128x128.png';
  }

  public setToken(user: IAuthenticatedUser): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public removeToken(): void {
    localStorage.removeItem('currentUser');
  }

  public getCurrentUserFromLS(): IAuthenticatedUser {
    const result = JSON.parse(localStorage.getItem('currentUser'));
    return result;
  }

  public checkUserLockStatus(): Observable<any> {
    return this.client
      .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/isuserlocked`, {})
      .pipe(catchError((err: HttpErrorResponse) => throwError((err.error.message))
    ));
  }

  public loadUnconfirmedTransactions(): Observable<any[]> {
    return this.client
      .post<any>(`http://prizm-map.mkpcap.com/api/v1/position/isuserlocked/details`, {})
      .pipe(catchError((err: HttpErrorResponse) => throwError((err.error.message))
      ));
  }

}