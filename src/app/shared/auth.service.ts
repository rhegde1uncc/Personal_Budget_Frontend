import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Subject } from 'rxjs';
import { ModalService } from '../modal/modal.service';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  endpoint = '/api'
  //endpoint = 'http://localhost:3000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept-Encoding', 'gzip');

  currentUser: any;
  isUserLoggedIn = new Subject<boolean>();
  isOpenModel = new Subject<boolean>();
  timerId: any;

  constructor(private http: HttpClient, public router: Router, public modalService: ModalService) {
    this.isUserLoggedIn.next(false);
    this.isOpenModel.next(false);
  }

  // Sign-up
  public signUp(user: User) {
    const api = `${this.endpoint}/signup`;
    return this.http.post(api, user).subscribe((res: any) => {
      this.router.navigate(['/login']);
    });
  }

  // login
  public signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/login`, user)
      .subscribe((res: any) => {
        this.router.navigate(['/dashboard/' + res.user.id]);
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('refresh_token', res.refreshToken);
        localStorage.setItem('exp', res.exp);
        user.id = res.user.id;
        this.currentUser = user;
        this.isUserLoggedIn.next(true);
        this.setTimer(true);   //uncomment to track session
      });
  }

  // Timer for frontend auth monitoring
  public setTimer(flag){
    if (flag){
      this.timerId = setInterval(() => {
        const exp = localStorage.getItem('exp');
        const expdate = new Date(0).setUTCSeconds(Number(exp));
        const TokenNotExpired = expdate.valueOf() > new Date().valueOf();
        const lessThanTwentySecRemaining = expdate.valueOf() - new Date().valueOf() <= 20000;
        if (TokenNotExpired && lessThanTwentySecRemaining) {
          this.isOpenModel.next(true);
        }
        if (new Date().valueOf() >= expdate.valueOf()){
          clearInterval(this.timerId);
          this.isOpenModel.next(false);
          this.router.navigate(['/login']);
          this.isUserLoggedIn.next(false);
          console.log('clear interval');
  }
      }, 20000);
    } else {
      clearInterval(this.timerId);
    }
  }

  // verify token
  public verifyTokenClient(exp, user) {
    const expdate = new Date(0).setUTCSeconds(exp);
    const TokenNotExpired = expdate.valueOf() > new Date().valueOf();
    const lessThanTwentySecRemaining =
      expdate.valueOf() - new Date().valueOf() <= 20000;
    if (TokenNotExpired && lessThanTwentySecRemaining) {
      const r = confirm(
        'Your session is going to expire in 20 seconds! click OK to extend the session!'
      );
      if (r) {
        console.log(user);
        this.refreshToken(user.id);
      }
    }
    if (new Date().valueOf() >= expdate.valueOf()){
      clearInterval(this.timerId);
      this.logout();
      console.log('clear interval verifytoken');
    }
  }

  // refresh
  public refreshToken(id: number) {
    const data = { uid: id, rToken: this.getRefreshToken() };
    return this.http
      .post<any>(`${this.endpoint}/refresh`, data)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('refresh_token', res.refreshToken);
        localStorage.setItem('exp', res.exp);
        this.currentUser = res.user;
        this.setTimer(false);
        this.setTimer(true);
      });
  }

  // logout
  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.currentUser = {};
    this.isUserLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public getRefreshToken(): string {
    return localStorage.getItem('refresh_token');
  }
  public isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  public getLoginStatus(): Observable<boolean> {
    return this.isUserLoggedIn;
  }

  public getAuthModalStatus(): Observable<boolean> {
    return this.isOpenModel;
  }
  public logoutUser(): void {
    const removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
