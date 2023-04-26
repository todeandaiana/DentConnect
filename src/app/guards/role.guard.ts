import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from '../shared/services/role.service';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor( private roleService: RoleService, private authService: AuthService, private router: Router ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if((this.authService.currentUserState() == false || this.authService.currentUserState() == true ) && this.roleService.role ==="customer"){
        this.router.navigate(['/']);
        return false;
      } else{
        return true;
      }
    }
  }
  


