import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { Observable } from 'rxjs';
import { UserProfile } from '../interface';
import { TalkService } from '../talk.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [HeaderComponent, NgIf, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  myAcc$: Observable<UserProfile>

  constructor(private talkService: TalkService){
    this.myAcc$ = this.talkService.getMe()
  }

}
