import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TalkService } from '../talk-service.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomUser } from '../interface';

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
    username: new FormControl('', [Validators.requiredTrue]),
    password: new FormControl('', [Validators.requiredTrue])
  })

  constructor(private talkService: TalkService){}

  onSubmit(){
    if(this.regGroup.get('username')?.value === '' || this.regGroup.get('password')?.value === '') return alert('Не все поля заполнены корректно!')
    this.regGroup.reset()
    console.log(this.regGroup.value)
  }

  toggle(){
    this.isReg = !this.isReg
  }

  registration(){
    this.talkService.addUsertoLocalStorage(this.regGroup.value)
  }

  authorisation(){
    return console.log(1111111)
  }

  ngOnInit(){
  }

}
