import { Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { AppComponent } from './app.component';
import { CardListComponent } from './card-list/card-list.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'signIn', component: RegistrationComponent}
];
