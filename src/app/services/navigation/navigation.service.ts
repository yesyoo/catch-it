import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  rootPath: string = this.authService.getRootPath()

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) { }

  home(): void {
    this.router.navigateByUrl(this.rootPath)
  };

  profile(): void {
    this.router.navigateByUrl(`home/user/${this.authService.getAuthUserID()}`)
  }

  auth():void {
    this.router.navigateByUrl(`/auth`)
  };

  user(user: string): void {
    this.router.navigateByUrl(`${this.rootPath}/user/${user}`)
  };

  item(item: string, user: string): void {
    if(this.router.url.includes('user')) {
      this.router.navigateByUrl(`${this.rootPath}/user/${user}/item/${item}`)
    } else {
      console.log('open card ?')
      this.router.navigateByUrl(`${this.rootPath}/item/${item}`)
    }
  };
  matchUsersId(): boolean {
    if(this.router.url.includes('user')) return true 
    else return false
  };
  admin() {
    this.router.navigateByUrl(`/admin`)

  }
}
