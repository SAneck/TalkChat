import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';
import { MessengerComponent } from "../messenger/messenger.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, RouterOutlet, MessengerComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
