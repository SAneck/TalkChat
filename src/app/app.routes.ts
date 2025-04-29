import { Routes, CanActivateFn } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { LayoutComponent } from './layout/layout.component';
import { canActivateAuth } from './accsess.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: UserProfileComponent },
    ],
    canActivate: [canActivateAuth]
  },
  { path: 'signIn', component: RegistrationComponent },
];
