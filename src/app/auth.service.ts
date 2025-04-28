import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { TalkService } from './talk.service';
import { TokenResponse } from './interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://icherniakov.ru/yt-course';

  constructor(
    private cookieService: CookieService,
    private talkService: TalkService,
    private http: HttpClient
  ) {}

  login(userData: { username?: string | null; password?: string | null }) {
    const fd = new FormData();
    fd.append('username', userData.username || '');
    fd.append('password', userData.password || '');

    this.http.post(this.baseUrl + '/auth/token', fd).subscribe((res: any) => {
      this.cookieService.set('access_token', res.access_token);
      this.cookieService.set('refresh_token', res.refresh_token);
    });
  }
}
