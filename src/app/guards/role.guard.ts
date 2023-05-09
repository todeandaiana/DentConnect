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

      // const result = new Subject<boolean>();
      // this.authService.currentUser$.pipe(
      //   first()).subscribe(user => {
      //   if(user === undefined){
      //     return;
      //   }
      //   if(user.roleAs === 'customer'){
      //     result.next(true);
      //   }else{
      //     result.next(false);
      //     this.authService.logout();
      //     this.router.navigate(["/"]);
      //   }
      //   result.complete();
      // })
      // console.log(result);
      // return result.asObservable();


      const role = localStorage.getItem("role");
      if(role === 'customer'){
        // this.router.navigate(["/dashborad"]);
        return true;
      }
      else {
        this.router.navigate(["/"]);
        return false;
      }

    console.log(this.authService.currentUser$.value);
    }
  }
    // if(this.authService.currentUser$.value && this.authService.currentUser$.value.roleAs === 'customer'){
      
    //   return true;
    // }
    // else {
    //   this.router.navigate(["/login"]);
    //   return false;
      
    // }
  //   if((this.authService.currentUserState() == false || this.authService.currentUserState() == true ) && this.roleService.role === "admin"){
  //       return true;
  //     } else{
  //       this.router.navigate(['/login']);
  //       return false;
  //     }
  
 
  


