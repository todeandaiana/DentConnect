import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements OnInit {

  public role: string = '';

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if(user !== undefined)
        this.role = user.roleAs;
    })
  }

}
