import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { TalkService } from '../talk.service';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, NgIf, FooterComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit {
  isReg: boolean = true;
  isPasswordVisible = signal<boolean>(false);

  regGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private talkService: TalkService,
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.authService.login(this.regGroup.value);
  }

  toggle() {
    this.isReg = !this.isReg;
  }

  ngOnInit() {}
}
