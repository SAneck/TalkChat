import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CardListComponent } from "./card-list/card-list.component";
import { SearchComponent } from "./search/search.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { MessengerComponent } from "./messenger/messenger.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CardListComponent, SearchComponent, HeaderComponent, RouterModule, HomeComponent, MessengerComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'talkChat';
}
