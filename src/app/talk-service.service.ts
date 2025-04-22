import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { CustomUser, UserProfile } from './interface';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TalkService {
  allUsers$!: Observable<UserProfile[]> 
  filteredUsers$!: Observable<UserProfile[]>
  userName$ = new BehaviorSubject<string>('')
  baseUrl = 'https://icherniakov.ru/yt-course'

  authStatus$ = new BehaviorSubject<boolean>(this.checkLocalStorage())

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

  }

  getProfiles(): Observable<UserProfile[]>{
    console.log(this.http.get<UserProfile[]>( this.baseUrl +  '/account/test_accounts'))
    return this.http.get<UserProfile[]>( this.baseUrl +  '/account/test_accounts')
  }

  searchUsers(name: string): void{
    console.log(name)
    return this.userName$.next(name || '')
  }

  addUsertoLocalStorage(userData: {username?: string | null; password?: string | null}){
    localStorage.setItem('user', JSON.stringify(userData))
    if(localStorage.setItem('user', JSON.stringify(userData)) !== null){
      this.router.navigate([''])
    }
    this.updateAuthStatus()
  }

  checkLocalStorage(): boolean{
   return !(localStorage.getItem('user') || localStorage.getItem('userData'))
  }

  updateAuthStatus(){
    this.authStatus$.next(this.checkLocalStorage())
  }

}