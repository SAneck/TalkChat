import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { UserProfile } from './interface';

@Injectable({
  providedIn: 'root',
})
export class TalkService {
  allUsers$!: Observable<UserProfile[]>;
  userName$ = new BehaviorSubject<string>('');
  baseUrl = 'https://icherniakov.ru/yt-course';

  constructor(private http: HttpClient, private router: Router) {
    this.allUsers$ = combineLatest([this.getProfiles(), this.userName$]).pipe(
      map(([allUsers, searchTerm]) => {
        if (!searchTerm) return allUsers;
        return allUsers.filter((el) =>
          el.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
    );
  }

  getProfiles(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(
      this.baseUrl + '/account/test_accounts'
    );
  }

  searchUsers(name: string): void {
    console.log(name);
    return this.userName$.next(name || '');
  }
}
