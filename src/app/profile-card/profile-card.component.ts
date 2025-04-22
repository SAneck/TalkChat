import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TalkService } from '../talk-service.service';


@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss'
})
export class ProfileCardComponent {

  baseUrl = 'https://icherniakov.ru/yt-course'

  @Input() username: string = '';
  @Input() photo: string = '';
  @Input() subscribers: number | null = null;
  @Input() firstName: string = '';
  @Input() secondName: string = '';
  @Input() isActive: boolean | null = null;
  @Input() stack: string[] = [];
  @Input() city: string = '';
}