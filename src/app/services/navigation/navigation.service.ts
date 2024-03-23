import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private rootPath: string

  constructor(private router: Router) { }

  setRootPath(data: string) {
    data ? this.rootPath = 'home' : this.rootPath = ''
  };

  home(): void {
    this.router.navigateByUrl(this.rootPath)
  };
  isHomePage(): boolean {
    if(this.router.url.includes('user') || this.router.url.includes('item')) {
      return false
    } else { 
      return true 
    }
  };

  checkLocation(id: string): 'owner-board' | 'home-page' | 'any'  {
    if(this.router.url.includes(`user/${id}`)) {
      return 'owner-board'
    } 
    if(this.router.url.includes(`user`) || this.router.url.includes(`item`)) {
      return 'any'
    } 
    else {
      return 'home-page'
    }
  }
 

  profile(id: string): void {
    this.router.navigateByUrl(`home/user/${id}`)
  }

  auth():void {
    this.router.navigateByUrl(`${this.rootPath}/auth`)
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
