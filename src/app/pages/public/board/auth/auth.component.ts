import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUserReg } from '../../../../interfaces/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  formType: 'authorization' | 'registration' = 'authorization'
  formAuth: FormGroup;
  formReg: FormGroup;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.formAuth = new FormGroup({})
    this.formAuth = new FormGroup(
      {
        email: new FormControl('', {validators: Validators.required}),
        password: new FormControl('', {validators: Validators.required}),
      }
    );
    this.formReg = new FormGroup(
      {
        email: new FormControl('', {validators: Validators.required}),
        username: new FormControl('', {validators: Validators.required}),
        city: new FormControl(''),
        district: new FormControl(''),
        password: new FormControl('', {validators: Validators.required}),
        passwordRepeat: new FormControl('', {validators: Validators.required}),
      }
    );
  }

  changeFormType() {
    this.formType === 'authorization' ? this.formType = 'registration' : this.formType = 'authorization'
  };

  submit() {
    if(this.formType === 'authorization') {
      this.authService.login(this.formAuth.getRawValue()).subscribe(data => {
        this.authService.setToken(data.id, data.access_token)
        setTimeout(() => {this.router.navigateByUrl('/home')}, 100)
      })
    } else {
      const reg = this.formReg.getRawValue()
      if(reg.password === reg.passwordRepeat) {
        const postData: IUserReg = {
          email: reg.email,
          password: reg.password,
          userData: {
            username: reg.username,
            city: reg.city,
            district: reg.district
          }
        }
        this.authService.register(postData).subscribe(data => {
          this.formType = 'authorization'
        })
      } else { console.log('psw => |')}
    }
  }

}
