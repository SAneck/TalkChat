import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TalkService } from './talk.service';
import { TokenResponse } from './interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
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
    this.updateLoginState()
  }

  get isLoggedIn(): boolean{
    return this._isLoggedIn$.value
  }

  updateLoginState(): void {
    this.token = this.cookieService.get('token') || null;
    this.refresh_token = this.cookieService.get('refresh_token') || null;
    this._isLoggedIn$.next(!!this.token);
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
        this.token = val.access_token;
        this.refresh_token = val.refresh_token;
        this.updateLoginState()
        this.cookieService.set('token', this.token);
        this.cookieService.set('refresh_token', this.refresh_token);
        this._isLoggedIn$.next(true);
      })
    );
  }

  logout(){
    this.cookieService.deleteAll()
    this.token = null
    this.refresh_token = null
    this._isLoggedIn$.next(false)
    this.updateLoginState()
    this.http.post(this.baseUrl + '/auth/logout', {}).subscribe(() => {
      this.token = null
      this.router.navigate(['/signIn']);
    }
    )
  }

}
