import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // showButton$ = this.talkService.authStatus$


  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = authService._isLoggedIn$
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/signIn'])
  }

}
