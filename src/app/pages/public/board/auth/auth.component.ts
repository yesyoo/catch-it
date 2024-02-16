import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUserReg } from '../../../../interfaces/user';
import { BoardService } from '../../../../services/board/board.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  type: 'authorization' | 'registration' = 'authorization'
  formAuth: FormGroup;
  formReg: FormGroup;
  display: boolean = true

  constructor(private authService: AuthService,
              private router: Router,
              private boardService: BoardService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.boardService.authModal$.subscribe(data => this.display = data)
    this.formAuth = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
      }
    );
    this.formReg = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [Validators.required]),
        city: new FormControl(''),
        district: new FormControl(''),
        password: new FormControl('', [Validators.required]),
        passwordRepeat: new FormControl('', [Validators.required]),
      }
    );

  };
  
  changeFormType(type: 'authorization' | 'registration') {
    if(this.type !== type) {
      this.type = type
    }
  };
submitAuthorization() {
  this.authService.login(this.formAuth.getRawValue()).subscribe(data => {
    if(data) {
      this.authService.setToken(data.id, data.access_token, data.role);
      setTimeout(() => {
        this.router.navigateByUrl('/home');
        this.boardService.render('main-storage')
      }, 100)
    } 
    
  },
  (err: HttpErrorResponse) => {
    console.log('err', err);
    const serverError = <any>err.error
    this.messageService.add({severity:'warn', summary: serverError.errorText})
  });
 };

submitRegistration() {
  const value = this.formReg.getRawValue()
  if(value.password !== value.passwordRepeat) {
    this.messageService.add({severity:'warn', summary: 'Passowrds do not match'})
  } else {
    let username = value.username.toLowerCase();
    let city = value.city.toLowerCase();
    let district = value.district.toLowerCase()
    const postData: IUserReg = {
      email: value.email,
      password: value.password,
      userData: {
        username: username.charAt(0).toUpperCase() + username.slice(1),
        city: city.charAt(0).toUpperCase() + city.slice(1),
        district: district.charAt(0).toUpperCase() + district.slice(1)
      }
    };
    this.authService.register(postData).subscribe((res) => {
      if(res) {
        this.type = 'authorization'
      }
    }, 
    (err: HttpErrorResponse) => {
      console.log('err', err);
      const serverError = <any>err.error
      this.messageService.add({severity:'warn', summary: serverError.errorText})
     });
    }
  };
   
  submit(type: string) {
    type === 'authorization' ? this.submitAuthorization() : this.submitRegistration()
  };
  
  

  onHide() {
    this.boardService.showAuthModal(false)
  };
}
