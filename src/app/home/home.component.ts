import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { SearchComponent } from "../search/search.component";
import { CardListComponent } from "../card-list/card-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SearchComponent, CardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
