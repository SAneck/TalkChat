import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, tap } from 'rxjs';
import { CustomUser, TokenResponse, UserProfile } from './interface';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TalkService {

  cookieService = inject(CookieService)

  allUsers$!: Observable<UserProfile[]> 
  filteredUsers$!: Observable<UserProfile[]>
  userName$ = new BehaviorSubject<string>('')
  baseUrl = 'https://icherniakov.ru/yt-course'


  _token: string | null = null
  refreshToken: string | null = null

  _isAuth$ = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient, private router: Router) {

    this.allUsers$ = combineLatest([
      this.getProfiles(),
      this.userName$
    ]).pipe(
      map(([allUsers, searchTerm]) => {
        if(!searchTerm) return allUsers
        return allUsers.filter(el => 
          el.username.toLowerCase().
          includes(searchTerm.toLowerCase())
        )
      })
    )

    this.heckAuthOnStartup()
  }

  checkInitialAuthState(): boolean {
    return this.cookieService.check('token');
  }

  heckAuthOnStartup(): void {
    const token = this.cookieService.get('authToken');
    if (token) {
      this._isAuth$.next(true);
    }
  }

  get token(): string | null {
  return this._token;
  }

  get isAuth(){
    return this._isAuth$.asObservable()
  }

  get isAuthValue(): boolean {
    return this._isAuth$.value;
  }

  updateAuthStatus(): void {
    this._isAuth$.next(this.cookieService.check('token'));
  }

  getProfiles(): Observable<UserProfile[]>{
    console.log(this.http.get<UserProfile[]>( this.baseUrl +  '/account/test_accounts'))
    return this.http.get<UserProfile[]>( this.baseUrl +  '/account/test_accounts')
  }

  searchUsers(name: string): void{
    console.log(name)
    return this.userName$.next(name || '')
  }

  login(userData: {username?: string | null; password?: string | null}){
    const fd = new FormData()
    fd.append('username', userData.username || '')
    fd.append('password', userData.password || '')

    return this.http.post<TokenResponse>(this.baseUrl + '/auth/token', fd, {withCredentials: true}).pipe(
      tap(response => {
        this.handleLoginResponse(response);
      })
    )
  }

  handleLoginResponse(response: TokenResponse): void {
    this._isAuth$.next(true);
    this.router.navigate(['/profile']);
  }


 // addUsertoLocalStorage(userData: {username?: string | null; password?: string | null}){
  //   localStorage.setItem('user', JSON.stringify(userData))
  //   if(localStorage.setItem('user', JSON.stringify(userData)) !== null){
  //     this.router.navigate([''])
  //   }
  //   this.updateAuthStatus()
  // }

  // checkLocalStorage(): boolean{
  //  return !(localStorage.getItem('user') || localStorage.getItem('userData'))
  // }

  // updateAuthStatus(){
  //   this.authStatus$.next(this.checkLocalStorage())
  // }

  // ДАННЫЕ ДЛЯ ВХОДА  username - BhadBabyBitch, password - NzFEpPzKvG

}