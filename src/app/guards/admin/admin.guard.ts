import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, pipe, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router,
              private http: HttpClient,
              private authService: AuthService,
              private userService: UserService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = localStorage.getItem('user')
      console.log('guard')
      if(user) {
        const id = JSON.parse(user)['id']
        console.log('user id', id)
        if(user) {
          const check = this.authService.checkRole(id).then(res => {
            
            if(res === 'admin') {
              console.log('role', res)
              return true
            } else {
              return this.router.navigateByUrl('/')
            }
          })
        }
        // const role = JSON.parse(user)['role']
        // if(role === 'admin') {
        //   return true
        // } else {
        //   return this.router.navigateByUrl('/')
        // }
       
      } else {
        
      }
      return this.router.navigateByUrl('/')
  }
}
