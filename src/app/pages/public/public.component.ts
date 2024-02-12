import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  isAuthUser: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const id = this.authService.getUserIdFromLocalStorage()
    if(id) {
      this.authService.setAuthUserID(id)
      this.authService.setRootPath('home')
    }
    else {
      this.authService.setRootPath('')
    }
  };
}
