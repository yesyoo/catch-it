import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUserReg } from '../../../../interfaces/user';
import { BoardService } from '../../../../services/board/board.service';

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
              private boardService: BoardService) { }

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

  submit(type: string) {
    if(type === 'authorization') {
      this.authService.login(this.formAuth.getRawValue()).subscribe(data => {
        this.authService.setToken(data.id, data.access_token, data.role);
        setTimeout(() => {
          this.router.navigateByUrl('/home');
          this.boardService.show('main-storage')
        }, 100)
      });

    } else {
      const value = this.formReg.getRawValue()
      if(value.password === value.passwordRepeat) {
        const postData: IUserReg = {
          email: value.email,
          password: value.password,
          userData: {
            username: value.username,
            city: value.city,
            district: value.district
          }
        }
        this.authService.register(postData).subscribe(() => {
          this.type = 'authorization'
        })
       
      } else { 
        console.log('psw => | toast error')
      }
    }
  };

  onHide() {
    this.boardService.showAuthModal(false)
  };
}
