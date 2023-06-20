import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subject, first } from 'rxjs';
import { RoleService } from '../shared/services/role.service';
import { AuthService } from '../shared/services/auth.service';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor( private roleService: RoleService, private authService: AuthService, private router: Router ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const role = localStorage.getItem("role");
      if(role === 'customer'){
        return true;
      }
      else {
        this.router.navigate(["/"]);
        return false;
      }
    }
  }

  
 
  


