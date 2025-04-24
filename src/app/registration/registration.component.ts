import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TalkService } from '../talk-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomUser } from '../interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, NgIf],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {

  isReg: boolean = true

  regGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private talkService: TalkService, private router: Router){}

  onSubmit(){
    if(this.regGroup.invalid) return alert('Не все поля заполнены корректно!')
    this.talkService.login(this.regGroup.value).subscribe(res => {
      this.router.navigate(['/'])
      console.log(res)
    })
    console.log(this.regGroup.value)
    this.regGroup.reset()
  }

  toggle(){
    this.isReg = !this.isReg
  }

  registration(){
    this.talkService.login(this.regGroup.value)
  }

  authorisation(){
    return console.log(1111111)
  }

  ngOnInit(){
  }

}
