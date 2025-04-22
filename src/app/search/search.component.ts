import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TalkService } from '../talk-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../interface';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  userName: FormControl<string | null> = new FormControl('')
  filteredUsers$: Observable<UserProfile[]> | undefined

  constructor(private talkService: TalkService){
  }

  searchUser(){
    return this.talkService.searchUsers(this.userName.value || ''),this.userName.reset()
  }

}
