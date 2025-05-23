import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TalkService } from './talk.service';
import { TokenResponse } from './interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://icherniakov.ru/yt-course';
  token: string | null = null;
  refresh_token: string | null = null;
  _isLoggedIn$ = new BehaviorSubject<boolean>(false)

  constructor(
    private cookieService: CookieService,
    private talkService: TalkService,
    private http: HttpClient,
    private router: Router
  ) {
  }

  get isLoggedIn(): boolean{
    return this._isLoggedIn$.value
  }

  login(userData: {
    username?: string | null;
    password?: string | null;
  }): Observable<TokenResponse> {
    const fd = new FormData();
    fd.append('username', userData.username || '');
    fd.append('password', userData.password || '');

    return this.http.post<TokenResponse>(this.baseUrl + '/auth/token', fd).pipe(
      tap((val) => {
        this.saveTokens(val)
        this._isLoggedIn$.next(true);
      })
    );
  }

  logout(){
    this.token = null;
    this.refresh_token = null;
    this._isLoggedIn$.next(false);
    this.cookieService.deleteAll()
    this.http.post(this.baseUrl + '/auth/logout', {}).subscribe(() => {
      this.router.navigate(['/signIn']);
    }
    )
  }


  refreshAuthtoken(){
    return this.http.post<TokenResponse>(this.baseUrl + '/auth/token', {
      refresh_token: this.refresh_token
    }).pipe(
      tap((val) => {
        this.saveTokens(val)
        this._isLoggedIn$.next(true);
      }),
      catchError(error => {
        this.logout()
        return throwError(error)
      })
    )
  }

  saveTokens(res: TokenResponse){
    this.token = res.access_token;
    this.refresh_token = res.refresh_token;
    this.cookieService.set('token', this.token);
    this.cookieService.set('refresh_token', this.refresh_token);
  }

}
