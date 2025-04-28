import { Component } from '@angular/core';
import { TalkService } from '../talk.service';
import { Observable } from 'rxjs';
import { UserProfile } from '../interface';
import { NgFor, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [NgFor, CommonModule, HttpClientModule, ProfileCardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent {
  allUsers$!: Observable<UserProfile[]>;

  constructor(private talkService: TalkService) {
    this.allUsers$ = talkService.allUsers$;
  }
}
