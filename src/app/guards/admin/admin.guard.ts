import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, pipe, map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router,
              private http: HttpClient,
              private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = localStorage.getItem('user')
      if(user) {
        const role = JSON.parse(user)['role']
        if(role === 'admin') {
          return true
        } else {
          return this.router.navigateByUrl('/')
        }
        // this.authService.checkRole(id).pipe(map((data) => data)).subscribe(data => {
        //   if(data === 'admin') {
        //     return true
        //   } else {
        //     
        //   }
        // })
      //   if(role === 'admin') {
      //     return true
      //   } else {
      //     
      //   }
      // } else {
      //   return this.router.navigateByUrl('/')
      } else {
        return this.router.navigateByUrl('/')
      }
      return this.router.navigateByUrl('/')
  }
}
